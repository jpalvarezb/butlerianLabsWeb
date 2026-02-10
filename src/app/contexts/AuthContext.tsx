/* @refresh reset */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/app/lib/supabase';

/* ── Types ── */

export interface ProductAccess {
  id: string;
  product: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  approved_at: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  access: ProductAccess[];
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signUp: (
    email: string,
    password: string,
    fullName: string,
    occupation?: string,
  ) => Promise<{ error: string | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  requestAccess: (product: string) => Promise<{ error: string | null }>;
  refreshAccess: () => Promise<void>;
  hasAccess: (product: string) => boolean;
  accessStatus: (product: string) => ProductAccess['status'] | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Provider ── */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    access: [],
    loading: true,
  });

  /* Fetch product_access rows for current user via raw fetch.
     This bypasses the Supabase client's internal AbortController
     which can kill requests made during onAuthStateChange. */
  const fetchAccess = useCallback(async (userId: string, accessToken: string) => {
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/product_access?select=*&user_id=eq.${userId}`;
      const res = await fetch(url, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return (Array.isArray(data) ? data : []) as ProductAccess[];
    } catch {
      return [];
    }
  }, []);

  /* Listen for auth changes */
  useEffect(() => {
    // Get initial session — validate server-side to catch stale/deleted sessions
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        // Verify the session is still valid on the server
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          // Session is stale (e.g. user was deleted) — clear it
          await supabase.auth.signOut().catch(() => {});
          setState({ user: null, session: null, access: [], loading: false });
          return;
        }
        const access = await fetchAccess(user.id, session.access_token);
        setState({ user, session, access, loading: false });
      } else {
        setState({ user: null, session: null, access: [], loading: false });
      }
    });

    // Subscribe to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const access = session
          ? await fetchAccess(session.user.id, session.access_token)
          : [];
        setState({ user: session?.user ?? null, session, access, loading: false });
      } catch {
        // Gracefully handle aborted requests during rapid auth state changes
        setState((prev) => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchAccess]);

  /* ── Actions ── */

  const signUp = async (email: string, password: string, fullName: string, occupation?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, occupation } },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({ user: null, session: null, access: [], loading: false });
  };

  const requestAccess = async (product: string) => {
    if (!state.user || !state.session) return { error: 'Not authenticated' };

    const { error } = await supabase.from('product_access').insert({
      user_id: state.user.id,
      product,
      status: 'pending',
    });

    if (!error) {
      const access = await fetchAccess(state.user.id, state.session.access_token);
      setState((prev) => ({ ...prev, access }));
    }

    return { error: error?.message ?? null };
  };

  const refreshAccess = async () => {
    if (!state.user || !state.session) return;
    const access = await fetchAccess(state.user.id, state.session.access_token);
    setState((prev) => ({ ...prev, access }));
  };

  const hasAccess = (product: string) =>
    state.access.some((a) => a.product === product && a.status === 'approved');

  const accessStatus = (product: string) =>
    state.access.find((a) => a.product === product)?.status ?? null;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        requestAccess,
        refreshAccess,
        hasAccess,
        accessStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ── */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
