-- Sample menu so the app has something to show before you run the RapidAPI import.
-- Local dev: applied automatically by `supabase db reset`.
-- Hosted project: paste into the dashboard SQL Editor and run once.
-- Safe to re-run: rows are matched on external_id.

insert into public.pizzas (external_id, name, description, price, image_url, is_veg) values
  ('seed-margherita', 'Margherita',        'Tomato sauce, fresh mozzarella and basil on a thin crust.', 6500, null, true),
  ('seed-pepperoni',  'Pepperoni Feast',   'Double pepperoni, mozzarella and oregano.',                  8500, null, false),
  ('seed-bbq-chicken','BBQ Chicken',       'Smoky BBQ sauce, grilled chicken, red onion and peppers.',  9000, null, false),
  ('seed-veggie',     'Garden Veggie',     'Mushrooms, sweet corn, green peppers, onions and olives.',  7000, null, true),
  ('seed-suya',       'Suya Special',      'Spicy suya beef, onions and yaji spice with mozzarella.',   9500, null, false),
  ('seed-hawaiian',   'Hawaiian',          'Ham, pineapple and mozzarella.',                             8000, null, false)
on conflict (external_id) do update
  set name        = excluded.name,
      description = excluded.description,
      price       = excluded.price,
      is_veg      = excluded.is_veg;
