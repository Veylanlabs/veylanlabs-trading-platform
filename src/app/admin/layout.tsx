import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { AdminClientLayout } from './client-layout';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
  
  if (!userEmail || !adminEmails.includes(userEmail.toLowerCase())) {
    redirect('/dashboard'); // Kick non-admins back to the regular dashboard
  }

  return <AdminClientLayout userEmail={userEmail}>{children}</AdminClientLayout>;
}
