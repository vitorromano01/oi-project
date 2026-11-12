import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type AuthState =
  { status: "loading" } | { status: "signed_out" } | { status: "signed_in"; session: Session };

// Single session subscriber for the app. Starts as "loading" on the server and on
// the first client render (the session lives in browser storage), then follows
// sign-in, sign-out and token refreshes.
export function useAuthSession(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const apply = (session: Session | null) =>
      setState((current) => {
        if (!session) return { status: "signed_out" };
        // Keep the same object on token refresh so the trip data is not reloaded.
        if (current.status === "signed_in" && current.session.user.id === session.user.id)
          return current;
        return { status: "signed_in", session };
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => apply(session));
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => apply(session))
      .catch(() => apply(null));
    return () => data.subscription.unsubscribe();
  }, []);

  return state;
}
