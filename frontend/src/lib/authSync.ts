import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { AppDispatch } from "../redux/store/store";
import { logUserOut, setUser } from "../redux/slice/UserSlice";

function userFromSession(session: Session) {
  const meta = session.user.user_metadata ?? {};
  return {
    loggedIn: true,
    accessToken: session.access_token,
    email: session.user.email ?? "",
    firstname: typeof meta.first_name === "string" ? meta.first_name : "",
    lastname: typeof meta.last_name === "string" ? meta.last_name : "",
    uuid: session.user.id,
  };
}

async function loadProfile(dispatch: AppDispatch, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, email")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return;
  dispatch(
    setUser({
      firstname: data.first_name,
      lastname: data.last_name,
      ...(data.email ? { email: data.email } : {}),
    })
  );
}

/**
 * Keeps the Redux user slice in sync with the Supabase session:
 * restores the saved login on app start, follows token refreshes,
 * and logs the app out when the session ends.
 * Returns an unsubscribe function.
 */
export function startAuthSync(dispatch: AppDispatch): () => void {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      dispatch(logUserOut());
      return;
    }
    dispatch(setUser(userFromSession(session)));

    if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "USER_UPDATED") {
      // Don't await Supabase calls inside this callback (it can deadlock the client);
      // run the profile fetch on the next tick instead.
      setTimeout(() => void loadProfile(dispatch, session.user.id), 0);
    }
  });

  return () => data.subscription.unsubscribe();
}
