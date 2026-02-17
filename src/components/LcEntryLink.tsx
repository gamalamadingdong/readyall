'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type LcEntryLinkProps = {
  className?: string;
  children: React.ReactNode;
  returnTo?: string;
};

const DEFAULT_LC_BASE = 'https://logbook.train-better.app';

function normalizeLcBase(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function normalizeReturnToPath(returnTo?: string): string {
  if (!returnTo) return '/';
  if (returnTo.startsWith('/')) {
    if (returnTo.startsWith('/login') || returnTo.startsWith('/auth')) return '/';
    return returnTo;
  }

  try {
    const parsed = new URL(returnTo);
    if (parsed.pathname.startsWith('/login') || parsed.pathname.startsWith('/auth')) return '/';
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || '/';
  } catch {
    return '/';
  }
}

export function LcEntryLink({ className, children, returnTo = '/' }: LcEntryLinkProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const lcBase = useMemo(() => {
    const envBase = process.env.NEXT_PUBLIC_LC_URL || DEFAULT_LC_BASE;
    return normalizeLcBase(envBase);
  }, []);

  const lcReturnTo = useMemo(() => normalizeReturnToPath(returnTo), [returnTo]);

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

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = async (event) => {
    if (!isSignedIn || isRedirecting) {
      return;
    }

    event.preventDefault();
    setIsRedirecting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const refreshToken = sessionData.session?.refresh_token;

      if (!accessToken || !refreshToken) {
        window.location.assign(href);
        return;
      }

      const { data: ssoToken, error } = await supabase.rpc('create_sso_handoff', {
        p_source_app: 'hub',
        p_target_app: 'lc',
        p_return_to: lcReturnTo,
        p_ttl_seconds: 120,
      });

      if (error || !ssoToken) {
        window.location.assign(href);
        return;
      }

      const bootstrapUrl = new URL('/auth/bootstrap', lcBase);
      bootstrapUrl.searchParams.set('ssoToken', ssoToken);
      bootstrapUrl.searchParams.set('returnTo', lcReturnTo);
      bootstrapUrl.hash = new URLSearchParams({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).toString();

      window.location.assign(bootstrapUrl.toString());
    } catch {
      window.location.assign(href);
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
