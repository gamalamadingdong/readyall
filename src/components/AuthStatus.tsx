'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type AuthStatusState = {
  hasSupabaseUser: boolean;
  hasAuthHint: boolean;
};

const AUTH_HINT_STORAGE_KEY = 'readyall_auth_hint';

function readAuthHintFromStorage(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(AUTH_HINT_STORAGE_KEY) === 'true';
}

function writeAuthHintToStorage(value: boolean) {
  if (typeof window === 'undefined') return;
  if (value) {
    window.localStorage.setItem(AUTH_HINT_STORAGE_KEY, 'true');
  } else {
    window.localStorage.removeItem(AUTH_HINT_STORAGE_KEY);
  }
}

function consumeAuthHintFromQuery(): boolean {
  if (typeof window === 'undefined') return false;

  const url = new URL(window.location.href);
  const authState = url.searchParams.get('authState');
  if (authState !== 'signedIn') return false;

  url.searchParams.delete('authState');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  return true;
}

export function AuthStatus() {
  const [state, setState] = useState<AuthStatusState>({
    hasSupabaseUser: false,
    hasAuthHint: false,
  });

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const queryHint = consumeAuthHintFromQuery();
      const storedHint = readAuthHintFromStorage();

      const { data } = await supabase.auth.getUser();
      const hasSupabaseUser = Boolean(data.user);

      const hasAuthHint = hasSupabaseUser ? false : queryHint || storedHint;
      writeAuthHintToStorage(hasAuthHint);

      if (!isMounted) return;
      setState({ hasSupabaseUser, hasAuthHint });
    };

    void initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasSupabaseUser = Boolean(session?.user);
      const nextHint = hasSupabaseUser ? false : readAuthHintFromStorage();
      writeAuthHintToStorage(nextHint);
      setState({ hasSupabaseUser, hasAuthHint: nextHint });
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isSignedIn = useMemo(() => state.hasSupabaseUser || state.hasAuthHint, [state.hasSupabaseUser, state.hasAuthHint]);

  if (isSignedIn) {
    return (
      <span className="text-xs text-emerald-700 dark:text-emerald-400">
        {state.hasSupabaseUser ? 'Signed In' : 'Signed In (via App)'}
      </span>
    );
  }

  return (
    <a href="/auth" className="hover:text-neutral-950 dark:hover:text-white">
      Sign In
    </a>
  );
}
