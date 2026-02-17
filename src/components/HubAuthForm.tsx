'use client';

import { FormEvent, useMemo, useState } from 'react';
import { supabase } from '@/lib/types/supabase';

type HubAuthFormProps = {
  returnTo?: string;
};

function normalizeReturnToPath(raw: string | undefined): string {
  if (!raw) return '/';

  if (raw.startsWith('/')) {
    if (raw.startsWith('/auth') || raw.startsWith('/login')) return '/';
    return raw;
  }

  try {
    const target = new URL(raw);
    if (typeof window !== 'undefined') {
      if (target.origin === window.location.origin) {
        if (target.pathname.startsWith('/auth') || target.pathname.startsWith('/login')) return '/';
        return `${target.pathname}${target.search}${target.hash}`;
      }
    }
  } catch {
    return '/';
  }

  return '/';
}

export function HubAuthForm({ returnTo }: HubAuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const safeReturnTo = useMemo(() => normalizeReturnToPath(returnTo), [returnTo]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message || 'Unable to sign in. Please try again.');
      setIsSubmitting(false);
      return;
    }

    window.location.assign(safeReturnTo);
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Sign in on ReadyAll to submit and vote on community priorities.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      ) : null}

      <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
        Need a new account? Create one in Logbook Companion, then sign in here with the same credentials.
      </p>
    </section>
  );
}
