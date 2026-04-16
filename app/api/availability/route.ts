import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

const DEFAULT_TIMES = [
  '09:00 AM','10:00 AM','11:00 AM',
  '01:00 PM','02:00 PM','03:00 PM','04:00 PM',
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  if (!date) return NextResponse.json({ error: 'date param required' }, { status: 400 });

  // Check which slots are already booked for this date
  const snap = await adminDb.collection('slots')
    .where('date', '==', date)
    .get();

  const bookedTimes = new Set(snap.docs.filter(d => d.data().isBooked).map(d => d.data().time));

  // Day of week check — 0 = Sunday (closed)
  const dayOfWeek = new Date(date).getUTCDay();
  if (dayOfWeek === 0) return NextResponse.json([]);

  const slots = DEFAULT_TIMES.map((time) => ({
    time,
    is_booked: bookedTimes.has(time),
  }));

  return NextResponse.json(slots);
}
