'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase/client';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface Issue {
  id: string;
  label: string;
  icon: string;
  description: string;
  service: string;
  priceMin: number;
  priceMax: number;
  note: string;
}

const ISSUES: Issue[] = [
  {
    id: 'car_noise',
    label: 'Car making noise',
    icon: 'volume_up',
    description: 'Grinding, squealing, knocking, or rattling sounds',
    service: 'Brake Repair / Engine Diagnostics',
    priceMin: 80,
    priceMax: 450,
    note: 'Noise type and location greatly affects cost. Could be brakes, exhaust, suspension, or engine.',
  },
  {
    id: 'engine_light',
    label: 'Engine light on',
    icon: 'warning',
    description: 'Check engine or warning light illuminated on dashboard',
    service: 'Engine Diagnostics',
    priceMin: 75,
    priceMax: 600,
    note: 'Diagnostic scan required first ($75-$150). Final cost depends on root cause.',
  },
  {
    id: 'tire_issue',
    label: 'Tire problem',
    icon: 'tire_repair',
    description: 'Flat tire, worn tires, vibration, or pulling to one side',
    service: 'Tire Services',
    priceMin: 25,
    priceMax: 800,
    note: 'Simple repair starts at $25. Full set of 4 tires ranges $300-$800 depending on size.',
  },
  {
    id: 'brakes',
    label: 'Brake issues',
    icon: 'speed',
    description: 'Soft pedal, slow stopping, brake noise, or pulling',
    service: 'Brake Repair',
    priceMin: 120,
    priceMax: 600,
    note: 'Brake pads start at $120/axle. Rotors add $80-$200. Full brake job up to $600.',
  },
  {
    id: 'battery',
    label: 'Battery / won\'t start',
    icon: 'battery_alert',
    description: 'Car won\'t start, slow crank, or electrical issues',
    service: 'Battery Replacement',
    priceMin: 90,
    priceMax: 300,
    note: 'New battery $90-$200. If alternator or starter issue, add $150-$300.',
  },
  {
    id: 'oil_service',
    label: 'Oil change / overdue service',
    icon: 'oil_barrel',
    description: 'Regular maintenance, oil change, or overdue service',
    service: 'Oil Change',
    priceMin: 45,
    priceMax: 150,
    note: 'Conventional oil starts at $45. Synthetic $85-$150. Includes basic inspection.',
  },
  {
    id: 'body_damage',
    label: 'Body / paint damage',
    icon: 'car_crash',
    description: 'Dents, scratches, rust, or collision damage',
    service: 'Body Shop',
    priceMin: 150,
    priceMax: 5000,
    note: 'Minor touch-up $150-$500. Panel replacement $500-$2,000. Major collision work $2,000+.',
  },
  {
    id: 'ac_heat',
    label: 'A/C or heat not working',
    icon: 'thermostat',
    description: 'Air conditioning weak, no cold/heat, or strange smells',
    service: 'Engine Diagnostics',
    priceMin: 100,
    priceMax: 900,
    note: 'Recharge starts at $100. Compressor replacement $400-$900.',
  },
];

export default function EstimatesPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [vehicleDesc, setVehicleDesc] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;
    setLoading(true);

    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'estimates'), {
        userId: user?.uid ?? null,
        issue: selectedIssue.label,
        vehicle_description: vehicleDesc || null,
        price_min: selectedIssue.priceMin,
        price_max: selectedIssue.priceMax,
        notes: additionalNotes || null,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      toast.success('Estimate saved!');
    } catch {
      toast.error('Failed to save estimate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-tertiary inline-block"></span>
            Instant Estimates
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">
            GET AN<br /><span className="text-tertiary">ESTIMATE</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Select your issue below to get an instant price range. No surprises — just honest estimates.
          </p>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Issue Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Select Your Issue</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ISSUES.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setSelectedIssue(issue)}
                    className={`p-5 rounded-2xl text-left transition-all border flex items-start gap-4 ${
                      selectedIssue?.id === issue.id
                        ? 'border-tertiary bg-tertiary/10'
                        : 'border-outline-variant/10 bg-surface-container hover:border-tertiary/30 hover:bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl shrink-0 mt-0.5 ${
                        selectedIssue?.id === issue.id ? 'text-tertiary' : 'text-on-surface-variant'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {issue.icon}
                    </span>
                    <div>
                      <div className={`font-bold text-sm mb-0.5 ${selectedIssue?.id === issue.id ? 'text-tertiary' : 'text-on-surface'}`}>
                        {issue.label}
                      </div>
                      <div className="text-on-surface-variant text-xs">{issue.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate Panel */}
            <div className="lg:col-span-2 sticky top-28">
              {selectedIssue ? (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
                  <div>
                    <div className="text-xs text-tertiary font-bold uppercase tracking-widest mb-2">Estimate for</div>
                    <div className="text-xl font-bold text-on-surface mb-1">{selectedIssue.label}</div>
                    <div className="text-on-surface-variant text-sm">{selectedIssue.service}</div>
                  </div>

                  {/* Price Range */}
                  <div className="bg-surface-container-high rounded-2xl p-6 text-center">
                    <div className="text-xs text-on-surface-variant uppercase tracking-widest mb-2">Estimated Range</div>
                    <div className="text-4xl font-black text-tertiary mb-1">
                      ${selectedIssue.priceMin} – ${selectedIssue.priceMax.toLocaleString()}
                    </div>
                    <div className="text-xs text-on-surface-variant">Starting price. Final cost after inspection.</div>
                  </div>

                  {/* Note */}
                  <div className="flex gap-3 bg-tertiary/5 border border-tertiary/15 rounded-xl p-4">
                    <span className="material-symbols-outlined text-tertiary text-lg shrink-0 mt-0.5">info</span>
                    <p className="text-on-surface-variant text-sm">{selectedIssue.note}</p>
                  </div>

                  {/* Vehicle */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Your Vehicle</label>
                    <input
                      type="text"
                      value={vehicleDesc}
                      onChange={(e) => setVehicleDesc(e.target.value)}
                      placeholder="e.g., 2019 Toyota Camry"
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all text-sm placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Additional Details</label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Describe when the issue started, frequency, etc."
                      rows={3}
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all text-sm placeholder:text-on-surface-variant/40 resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50 text-sm"
                    >
                      {loading ? 'Saving...' : 'Save Estimate'}
                    </button>
                    <Link
                      href={`/booking?service=${encodeURIComponent(selectedIssue.service)}`}
                      className="flex-1 border border-tertiary text-tertiary py-4 rounded-full font-bold uppercase tracking-widest text-center text-sm hover:bg-tertiary/10 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="glass-card p-10 rounded-2xl text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl text-tertiary/30 mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                    calculate
                  </span>
                  <p className="font-semibold text-on-surface mb-2">Select an issue</p>
                  <p className="text-sm">Choose from the list to see an instant price estimate.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="max-w-lg mx-auto glass-card p-12 rounded-2xl text-center">
            <span className="material-symbols-outlined text-6xl text-tertiary mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <h2 className="text-2xl font-bold text-on-surface mb-3">Estimate Saved!</h2>
            <p className="text-on-surface-variant mb-8">
              Your estimate for <strong className="text-on-surface">{selectedIssue?.label}</strong> has been saved.{' '}
              Ready to book your appointment?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/booking?service=${encodeURIComponent(selectedIssue?.service ?? '')}`}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 px-8 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all"
              >
                Book Appointment
              </Link>
              <button
                onClick={() => { setSubmitted(false); setSelectedIssue(null); setVehicleDesc(''); setAdditionalNotes(''); }}
                className="border border-outline-variant/30 text-on-surface-variant py-4 px-8 rounded-full font-bold text-sm uppercase tracking-wide hover:border-outline-variant/60 transition-all"
              >
                Get Another Estimate
              </button>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-16 bg-surface-container rounded-2xl p-8 border border-outline-variant/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: 'verified', title: 'Honest Pricing', desc: 'No hidden fees. We tell you the range upfront.' },
              { icon: 'local_offer', title: 'Free Inspection', desc: 'Every service includes a free 20-point inspection.' },
              { icon: 'support_agent', title: 'Expert Advice', desc: 'Our ASE-certified mechanics walk you through every repair.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                <div className="font-bold text-on-surface">{item.title}</div>
                <div className="text-on-surface-variant text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
