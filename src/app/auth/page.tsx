import type { Metadata } from 'next';
import { HubAuthForm } from '@/components/HubAuthForm';

type AuthPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Sign In — ReadyAll',
  description: 'Sign in to participate in ReadyAll community workflows.',
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <HubAuthForm returnTo={params.returnTo} />
    </div>
  );
}
