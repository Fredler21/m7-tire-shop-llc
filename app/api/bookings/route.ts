import { NextRequest, NextResponse } from 'next/server';

let bookings: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const booking = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    // In production, send email confirmation here
    console.log('New booking:', booking);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(bookings);
}
