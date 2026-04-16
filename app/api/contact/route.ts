import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, send email via Nodemailer or SendGrid
    console.log('Contact message:', body);

    // Mock response
    return NextResponse.json(
      { message: 'Message received. We will contact you soon.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
