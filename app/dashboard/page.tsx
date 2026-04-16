import { redirect } from 'next/navigation';
import { getSessionUser, getProfile } from '@/lib/firebase/session';
import { adminDb } from '@/lib/firebase/admin';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/auth/login?redirectTo=/dashboard');

  const [profile, bookingsSnap, vehiclesSnap] = await Promise.all([
    getProfile(user.uid),
    adminDb.collection('bookings').where('userId', '==', user.uid).orderBy('createdAt', 'desc').get(),
    adminDb.collection('vehicles').where('user_id', '==', user.uid).orderBy('createdAt', 'desc').get(),
  ]);

  const toDate = (ts: any) => ts?.toDate?.()?.toISOString() ?? ts ?? new Date().toISOString();

  const bookings = bookingsSnap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, created_at: toDate(data.createdAt), updated_at: toDate(data.updatedAt) };
  }) as any[];
  const vehicles = vehiclesSnap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, created_at: toDate(data.createdAt) };
  }) as any[];

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <DashboardClient
        profile={profile ?? null}
        bookings={bookings}
        vehicles={vehicles}
        userEmail={user.email ?? ''}
        userId={user.uid}
      />
      <Footer />
    </div>
  );
}
