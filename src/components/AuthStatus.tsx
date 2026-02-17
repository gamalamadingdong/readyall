'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

export function AuthStatus() {
  const [hasSupabaseUser, setHasSupabaseUser] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const { data } = await supabase.auth.getUser();
      const nextHasSupabaseUser = Boolean(data.user);

      if (!isMounted) return;
      setHasSupabaseUser(nextHasSupabaseUser);
    };

    void initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSupabaseUser(Boolean(session?.user));
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (hasSupabaseUser) {
    return (
      <span className="text-xs text-emerald-700 dark:text-emerald-400">
        Signed In
      </span>
    );
  }

  return (
    <a href="/auth" className="hover:text-neutral-950 dark:hover:text-white">
      Sign In
    </a>
  );
}
