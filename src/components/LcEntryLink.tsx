'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type LcEntryLinkProps = {
  className?: string;
  children: React.ReactNode;
};

const DEFAULT_LC_BASE = 'https://logbook.train-better.app';

function normalizeLcBase(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function LcEntryLink({ className, children }: LcEntryLinkProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const lcBase = useMemo(() => {
    const envBase = process.env.NEXT_PUBLIC_LC_URL || DEFAULT_LC_BASE;
    return normalizeLcBase(envBase);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const { data } = await supabase.auth.getUser();
      const hasUser = Boolean(data.user);

      if (!isMounted) return;
      setIsSignedIn(hasUser);
    };

    void initialize();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasUser = Boolean(session?.user);
      setIsSignedIn(hasUser);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const href = isSignedIn ? `${lcBase}/` : `${lcBase}/about`;

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
