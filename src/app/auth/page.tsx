import { redirect } from 'next/navigation';

type AuthPageProps = {
  searchParams: Promise<{
    returnTo?: string;
    authFlowId?: string;
    authHop?: string;
  }>;
};

function normalizeReturnTo(raw: string | undefined): string {
  const hubBase = process.env.NEXT_PUBLIC_HUB_URL || 'https://train-better.app';

  if (!raw) {
    return `${hubBase}/`;
  }

  if (raw.startsWith('/')) {
    if (raw.startsWith('/auth') || raw.startsWith('/login')) {
      return `${hubBase}/`;
    }
    return `${hubBase}${raw}`;
  }

  try {
    const target = new URL(raw);
    const allowedOrigins = new Set<string>([
      new URL(hubBase).origin,
      'https://train-better.app',
      'https://logbook.train-better.app',
      'https://logbook-companion.vercel.app',
    ]);

    const lcUrl = process.env.NEXT_PUBLIC_LC_URL;
    if (lcUrl) {
      allowedOrigins.add(new URL(lcUrl).origin);
    }

    if (allowedOrigins.has(target.origin)) {
      if (target.pathname.startsWith('/auth') || target.pathname.startsWith('/login')) {
        return `${hubBase}/`;
      }
      return target.toString();
    }
  } catch {
    return `${hubBase}/`;
  }

  return `${hubBase}/`;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const currentHop = Number.parseInt(params.authHop ?? '0', 10);

  if (Number.isFinite(currentHop) && currentHop >= 3) {
    redirect((process.env.NEXT_PUBLIC_HUB_URL || 'https://train-better.app') + '/?authError=loop');
  }

  const returnTo = normalizeReturnTo(params.returnTo);
  const lcBase = process.env.NEXT_PUBLIC_LC_URL || 'https://logbook.train-better.app';
  const loginUrl = new URL('/login', lcBase);
  const authFlowId = params.authFlowId ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  loginUrl.searchParams.set('returnTo', returnTo);
  loginUrl.searchParams.set('authSource', 'hub');
  loginUrl.searchParams.set('authFlowId', authFlowId);
  loginUrl.searchParams.set('authHop', String((Number.isFinite(currentHop) ? currentHop : 0) + 1));

  redirect(loginUrl.toString());
}
