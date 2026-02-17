import type { Metadata } from 'next';
import { HubSsoBootstrap } from '@/components/HubSsoBootstrap';

type AuthBootstrapPageProps = {
  searchParams: Promise<{
    ssoToken?: string;
    returnTo?: string;
  }>;
};

export const metadata: Metadata = {
  title: 'SSO Bootstrap — ReadyAll',
  description: 'Establish a Hub session from a trusted cross-app handoff.',
};

export default async function AuthBootstrapPage({ searchParams }: AuthBootstrapPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <HubSsoBootstrap ssoToken={params.ssoToken} returnTo={params.returnTo} />
    </div>
  );
}
