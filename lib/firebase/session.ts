// Server-side: verify the Firebase ID token from the session cookie
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from './admin';
import type { Profile } from '@/lib/types';

export async function getSessionUser(): Promise<{ uid: string; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    return { uid: decoded.uid, email: decoded.email ?? '' };
  } catch {
    return null;
  }
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const snap = await adminDb.collection('profiles').doc(uid).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Profile;
}
