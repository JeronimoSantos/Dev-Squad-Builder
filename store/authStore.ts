import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

interface AuthStore {
  user: User | null;
  session: Session | null;
  loading: boolean;
  init: () => () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,

  init: () => {
    const { data } = createClient().auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });
    return () => data.subscription.unsubscribe();
  },

  signOut: async () => {
    await createClient().auth.signOut();
    set({ user: null, session: null });
  },
}));
