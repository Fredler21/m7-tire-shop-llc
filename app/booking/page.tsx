'use client';

import { Suspense } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BookingForm from '@/app/components/BookingForm';
import { useSearchParams } from 'next/navigation';

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Book an Appointment</h1>
          <p className="text-xl text-gray-300">
            Select your service and preferred time to schedule your appointment
          </p>
        </div>

        <BookingForm initialService={serviceParam || ''} />

        <div className="mt-12 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-4">Booking Information</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Appointments are confirmed within 24 hours</li>
            <li>✓ You will receive an email and SMS confirmation</li>
            <li>✓ Please arrive 10 minutes early</li>
            <li>✓ Cancellations must be made 24 hours in advance</li>
            <li>✓ For emergency services, please call us directly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Suspense fallback={<div className="pt-32 text-center text-white">Loading...</div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
