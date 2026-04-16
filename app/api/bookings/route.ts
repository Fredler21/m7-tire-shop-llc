import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import { sendBookingConfirmation } from '@/lib/email';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, car_model, service, date, time, notes, vehicleId } = body;

    if (!name || !email || !phone || !car_model || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slotId = `${date}_${time.replace(/\s/g, '_').replace(':', '-')}`;
    const slotRef = adminDb.collection('slots').doc(slotId);

    const bookingData: Record<string, unknown> = {
      name, email, phone, car_model, service, date, time,
      notes: notes ?? null,
      vehicleId: vehicleId ?? null,
      userId: null,
      status: 'pending',
      assignedTo: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const sessionCookie = request.cookies.get('session')?.value;
    if (sessionCookie) {
      try {
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        bookingData.userId = decoded.uid;
      } catch { /* guest */ }
    }

    let bookingId = '';
    await adminDb.runTransaction(async (tx) => {
      const slotSnap = await tx.get(slotRef);
      if (slotSnap.exists && slotSnap.data()?.isBooked) throw new Error('SLOT_TAKEN');
      const bookingRef = adminDb.collection('bookings').doc();
      bookingId = bookingRef.id;
      tx.set(bookingRef, bookingData);
      tx.set(slotRef, { date, time, isBooked: true });
    });

    sendBookingConfirmation({ name, email, service, date, time, bookingId }).catch(
      (err) => console.error('Email send failed:', err)
    );

    return NextResponse.json({ id: bookingId }, { status: 201 });
  } catch (error: any) {
    if (error?.message === 'SLOT_TAKEN') {
      return NextResponse.json({ error: 'This time slot is no longer available.' }, { status: 409 });
    }
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const profileSnap = await adminDb.collection('profiles').doc(decoded.uid).get();
    if (profileSnap.data()?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const snap = await adminDb.collection('bookings').orderBy('createdAt', 'desc').get();
    return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (error) {
    console.error('Bookings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
