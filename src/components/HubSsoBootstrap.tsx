'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type HubSsoBootstrapProps = {
  ssoToken?: string;
  returnTo?: string;
};

function normalizeInternalReturnTo(raw: string | null | undefined): string {
  if (!raw) return '/';

  if (raw.startsWith('/')) {
    if (raw.startsWith('/auth') || raw.startsWith('/login')) return '/';
    return raw;
  }

  try {
    const target = new URL(raw);
    if (typeof window !== 'undefined' && target.origin === window.location.origin) {
      if (target.pathname.startsWith('/auth') || target.pathname.startsWith('/login')) return '/';
      return `${target.pathname}${target.search}${target.hash}`;
    }
  } catch {
    return '/';
  }

  return '/';
}

function parseHashTokens(): { accessToken: string | null; refreshToken: string | null } {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };

  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
  const params = new URLSearchParams(hash);
  return {
    accessToken: params.get('access_token'),
    refreshToken: params.get('refresh_token'),
  };
}

function clearHashFromUrl() {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  window.history.replaceState({}, '', `${url.pathname}${url.search}`);
}

export function HubSsoBootstrap({ ssoToken, returnTo }: HubSsoBootstrapProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Bootstrapping session…');

  const fallbackReturnTo = useMemo(() => normalizeInternalReturnTo(returnTo), [returnTo]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!ssoToken) {
        setErrorMessage('Missing SSO token.');
        return;
      }

      const { accessToken, refreshToken } = parseHashTokens();

      if (!accessToken || !refreshToken) {
        setErrorMessage('Missing session tokens from source app. Please sign in again.');
        return;
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      clearHashFromUrl();

      if (sessionError) {
        if (!isMounted) return;
        setErrorMessage('Unable to establish Hub session from SSO handoff.');
        return;
      }

      if (!isMounted) return;
      setStatusMessage('Validating handoff…');

      const { data, error: consumeError } = await supabase.rpc('consume_sso_handoff', {
        p_token: ssoToken,
        p_expected_target: 'hub',
      });

      if (consumeError) {
        if (!isMounted) return;
        setErrorMessage('Handoff token could not be consumed. It may be expired or already used.');
        return;
      }

      const consumedRows = (data as Array<{ requested_return_to: string | null }> | null) ?? [];
      const row = consumedRows[0] ?? null;
      const requestedReturnTo = normalizeInternalReturnTo(row?.requested_return_to);
      const target = requestedReturnTo !== '/' ? requestedReturnTo : fallbackReturnTo;

      window.location.assign(target);
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, [fallbackReturnTo, ssoToken]);

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <h1 className="text-2xl font-semibold">Single Sign-On</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{statusMessage}</p>

      {errorMessage ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
          {errorMessage}
          <a href="/auth" className="ml-2 font-medium underline">
            Sign in manually
          </a>
        </div>
      ) : null}
    </section>
  );
}
