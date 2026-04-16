import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { sendStatusUpdate } from '@/lib/email';
import { sendStatusSms } from '@/lib/sms';

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const { adminDb } = await import('@/lib/firebase/admin');
    const profileSnap = await adminDb.collection('profiles').doc(decoded.uid).get();
    const role = profileSnap.data()?.role;
    if (!role || !['admin', 'mechanic'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, email, phone, service, status } = await request.json();

    // Email update (fire-and-forget)
    sendStatusUpdate({ name, email, service, status }).catch(
      (err) => console.error('Status email failed:', err)
    );

    // SMS update if phone provided (fire-and-forget)
    if (phone) {
      sendStatusSms({ name, phone, service, status }).catch(
        (err) => console.error('Status SMS failed:', err)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
