import { redirect } from 'next/navigation';
import { getSessionUser, getProfile } from '@/lib/firebase/session';
import { adminDb } from '@/lib/firebase/admin';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect('/auth/login?redirectTo=/admin');

  const profile = await getProfile(user.uid);
  if (!profile || !['admin', 'mechanic'].includes(profile.role)) {
    redirect('/dashboard');
  }

  const [bookingsSnap, profilesSnap] = await Promise.all([
    adminDb.collection('bookings').orderBy('createdAt', 'desc').get(),
    adminDb.collection('profiles').get(),
  ]);

  const toDate = (ts: any) => ts?.toDate?.()?.toISOString() ?? ts ?? new Date().toISOString();

  const bookings = bookingsSnap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, created_at: toDate(data.createdAt), updated_at: toDate(data.updatedAt) };
  });
  const staffProfiles = profilesSnap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((p: any) => ['admin', 'mechanic'].includes(p.role));

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <AdminClient
        bookings={bookings as any}
        staff={staffProfiles as any}
        currentUserId={user.uid}
        currentRole={profile.role}
      />
      <Footer />
    </div>
  );
}
