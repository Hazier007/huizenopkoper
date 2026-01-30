import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getBuyerProfile } from '@/lib/auth/buyer-auth';
import BuyerNav from '@/app/inkoper/_components/BuyerNav';

export default async function BuyerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const isPublicRoute = pathname === '/inkoper/login';

  const profile = await getBuyerProfile();

  if (!profile && !isPublicRoute) {
    redirect('/inkoper/login');
  }

  if (!profile || isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerNav buyer={profile.buyer} />
      <main>{children}</main>
    </div>
  );
}
