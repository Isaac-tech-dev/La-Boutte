-- =============================================================================
-- La-Boutte: initial schema
-- Replaces the old MongoDB models (User, Pizza, Cart) with Postgres tables.
-- Security is enforced in the database with Row Level Security (RLS), so the
-- app can talk to Supabase directly with only the public (anon) key.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Shared helper: keep updated_at current
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- profiles: one row per auth user (replaces the Mongo "User" model).
-- Passwords live in Supabase Auth, never in this table.
-- -----------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  first_name  text not null default '',
  last_name   text not null default '',
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create the profile automatically when someone signs up.
-- first_name / last_name come from the metadata passed to supabase.auth.signUp().
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- pizzas: the menu (replaces the Mongo "Pizza" model).
-- external_id holds the RapidAPI id so re-running the import updates instead of
-- duplicating. image_url is optional; the app shows a placeholder when null.
-- -----------------------------------------------------------------------------
create table public.pizzas (
  id           uuid primary key default gen_random_uuid(),
  external_id  text unique,
  name         text not null check (length(trim(name)) > 0),
  description  text not null default '',
  price        numeric(10, 2) not null check (price >= 0),
  image_url    text,
  is_veg       boolean,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger pizzas_set_updated_at
  before update on public.pizzas
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- cart_items: one row per (user, pizza) (replaces the Mongo "Cart" model).
-- A user's cart is simply all their rows, so there is no separate carts table.
-- -----------------------------------------------------------------------------
create table public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  pizza_id    uuid not null references public.pizzas (id) on delete cascade,
  quantity    integer not null check (quantity > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, pizza_id)
);

create index cart_items_pizza_id_idx on public.cart_items (pizza_id);

create trigger cart_items_set_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

-- Add (positive delta) or remove (negative delta) quantity of a pizza in the
-- caller's cart in one atomic step. Reaching 0 removes the line.
-- Returns the new quantity (0 when the line was removed or never existed).
-- Runs as the caller (security invoker), so RLS still applies.
create or replace function public.adjust_cart_item(p_pizza_id uuid, p_delta integer default 1)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_qty  integer;
begin
  if v_user is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  if p_delta is null or p_delta = 0 then
    select quantity into v_qty
      from public.cart_items
     where user_id = v_user and pizza_id = p_pizza_id;
    return coalesce(v_qty, 0);
  end if;

  if p_delta > 0 then
    insert into public.cart_items (user_id, pizza_id, quantity)
    values (v_user, p_pizza_id, p_delta)
    on conflict (user_id, pizza_id)
      do update set quantity = public.cart_items.quantity + excluded.quantity
    returning quantity into v_qty;
    return v_qty;
  end if;

  -- Negative delta: remove the line if it would drop to zero or below...
  delete from public.cart_items
   where user_id = v_user
     and pizza_id = p_pizza_id
     and quantity + p_delta <= 0;
  if found then
    return 0;
  end if;

  -- ...otherwise decrement it.
  update public.cart_items
     set quantity = quantity + p_delta
   where user_id = v_user and pizza_id = p_pizza_id
  returning quantity into v_qty;
  return coalesce(v_qty, 0);
end;
$$;

-- =============================================================================
-- Privileges (explicit, rather than relying on project defaults)
-- =============================================================================
revoke all on public.profiles   from anon, authenticated;
revoke all on public.pizzas     from anon, authenticated;
revoke all on public.cart_items from anon, authenticated;

grant select on public.pizzas to anon, authenticated;

grant select on public.profiles to authenticated;
grant update (first_name, last_name) on public.profiles to authenticated;

grant select, insert, update, delete on public.cart_items to authenticated;

revoke execute on function public.adjust_cart_item(uuid, integer) from public, anon;
grant  execute on function public.adjust_cart_item(uuid, integer) to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at()  from public, anon, authenticated;

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.profiles   enable row level security;
alter table public.pizzas     enable row level security;
alter table public.cart_items enable row level security;

-- profiles: you can only see and edit your own
create policy "Profiles are viewable by their owner"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Profiles are editable by their owner"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- pizzas: anyone can read the menu; only the service role (Edge Function,
-- dashboard) can write, because no insert/update/delete policies exist.
create policy "Menu is public"
  on public.pizzas for select to anon, authenticated
  using (true);

-- cart_items: every operation is limited to your own rows
create policy "Users can view their own cart"
  on public.cart_items for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add to their own cart"
  on public.cart_items for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own cart"
  on public.cart_items for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can remove from their own cart"
  on public.cart_items for delete to authenticated
  using ((select auth.uid()) = user_id);
