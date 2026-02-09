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

  /* Fetch product_access rows for current user */
  const fetchAccess = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('product_access')
      .select('*')
      .eq('user_id', userId);
    return (data ?? []) as ProductAccess[];
  }, []);

  /* Listen for auth changes */
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const access = session ? await fetchAccess(session.user.id) : [];
      setState({ user: session?.user ?? null, session, access, loading: false });
    });

    // Subscribe to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const access = session ? await fetchAccess(session.user.id) : [];
      setState({ user: session?.user ?? null, session, access, loading: false });
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
    if (!state.user) return { error: 'Not authenticated' };

    const { error } = await supabase.from('product_access').insert({
      user_id: state.user.id,
      product,
      status: 'pending',
    });

    if (!error) {
      const access = await fetchAccess(state.user.id);
      setState((prev) => ({ ...prev, access }));
    }

    return { error: error?.message ?? null };
  };

  const refreshAccess = async () => {
    if (!state.user) return;
    const access = await fetchAccess(state.user.id);
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
