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
    <div className="pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left: info */}
          <div>
            <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-tertiary inline-block"></span>
              Schedule Your Visit
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              BOOK AN<br />APPOINTMENT
            </h1>
            <p className="text-on-secondary-container text-lg mb-12 max-w-md">
              Select your service and preferred time. Our team will confirm your booking within 24 hours.
            </p>

            <div className="space-y-8">
              {[
                { icon: 'check_circle', text: 'Appointments confirmed within 24 hours' },
                { icon: 'check_circle', text: 'Email and SMS confirmation sent' },
                { icon: 'check_circle', text: 'Please arrive 10 minutes early' },
                { icon: 'check_circle', text: 'Cancellations must be made 24 hours in advance' },
                { icon: 'check_circle', text: 'For emergencies, call us directly' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <p className="text-on-surface-variant">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-surface-container rounded-2xl border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-tertiary">call</span>
                <span className="font-bold uppercase tracking-wide text-sm">Need immediate help?</span>
              </div>
              <p className="text-on-secondary-container text-sm">Call us directly at <span className="text-tertiary font-bold">(555) 123-4567</span></p>
            </div>
          </div>

          {/* Right: form */}
          <div className="glass-card p-10 rounded-2xl">
            <BookingForm initialService={serviceParam || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <Suspense fallback={
        <div className="pt-40 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl text-tertiary animate-spin">autorenew</span>
        </div>
      }>
        <BookingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
