'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSlider from '@/app/components/HeroSlider';
import ServiceCard from '@/app/components/ServiceCard';
import ReviewsSection from '@/app/components/ReviewsSection';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FEATURED_SERVICES = [
  { id: '1', name: 'Oil Change', description: 'Synthetic and specialized oil services using premium filters for engine longevity.', startingPrice: 45, icon: 'oil_barrel', image: '/images/hero-oil-change.png' },
  { id: '2', name: 'Tire Services', description: 'Precision balancing, rotation, and high-performance tire fitment for ultimate grip.', startingPrice: 60, icon: 'tire_repair', image: '/images/hero-tire-services.png' },
  { id: '3', name: 'Brake Repair', description: 'Ceramic and composite pad replacement with full rotor resurfacing available.', startingPrice: 150, icon: 'car_repair', image: '/images/hero-car-repair.png' },
  { id: '4', name: 'Engine Diagnostics', description: 'Advanced electronic scans and full system telemetry for modern engine modules.', startingPrice: 85, icon: 'settings_suggest', image: '/images/hero-engine-diagnostics.png' },
  { id: '5', name: 'Battery Replacement', description: 'Load testing, terminal cleaning, and replacement of OEM grade electrical units.', startingPrice: 50, icon: 'battery_charging_full', image: '/images/hero-battery-replacement.png' },
  { id: '6', name: 'Body Shop', description: 'Precision panel work and factory-spec paint matching for structural integrity.', startingPrice: 200, icon: 'build', image: '/images/hero-body-shop.png' },
];

function QuickBookForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [service, setService] = useState('Oil Change');
  const [date, setDate] = useState('');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ service, name, date });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          required
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Select Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-[#0b1326] border-0 border-b border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all"
          >
            {FEATURED_SERVICES.map((s) => (
              <option key={s.id} value={s.name} className="bg-[#0b1326]">{s.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Preferred Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-5 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all"
      >
        Book Appointment
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero */}
      <HeroSlider />

      {/* Services Grid */}
      <section className="py-16 sm:py-32 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-20 gap-4 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">SPECIALIZED CARE</h2>
            <p className="text-on-secondary-container max-w-md text-base sm:text-lg">Comprehensive automotive solutions for all your vehicle needs.</p>
          </div>
          <div className="h-1 w-24 bg-tertiary mb-4 hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12">
          {FEATURED_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              startingPrice={service.startingPrice}
              icon={service.icon}
              image={service.image}
            />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-tertiary/40 hover:border-tertiary text-tertiary font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full tracking-widest uppercase text-sm transition-all hover:bg-tertiary/5"
          >
            View All Services <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Why Choose Us + How It Works */}
      <section className="py-16 sm:py-32 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24">
          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 tracking-tight">ENGINEERED TRUST</h2>
            <div className="space-y-8 sm:space-y-12">
              {[
                { icon: 'verified', title: 'Certified Mechanics', desc: 'ASE-Master technicians with decades of collective automotive experience.' },
                { icon: 'speed', title: 'Fast Service', desc: 'Optimized workflow to ensure your vehicle is back on the road swiftly.' },
                { icon: 'monetization_on', title: 'Transparent Pricing', desc: 'Detailed estimates with itemized labor and parts breakdown — no hidden fees.' },
                { icon: 'security', title: 'Warranty Guaranteed', desc: '12-month / 12,000-mile warranty on all parts and labor performed.' },
              ].map((item) => (
                <div key={item.icon} className="flex gap-4 sm:gap-6 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-card flex items-center justify-center text-tertiary shrink-0 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-on-secondary-container text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-surface-container p-8 sm:p-12 rounded-2xl relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 tracking-tight">PROCESS FLOW</h2>
            <div className="relative space-y-12 sm:space-y-16">
              <div className="absolute left-7 top-4 bottom-4 w-[2px] bg-gradient-to-b from-tertiary to-transparent opacity-20"></div>
              {[
                { step: 1, title: 'Choose Service', desc: 'Select from our maintenance or repair packages online or over the phone.', icon: 'list_alt' },
                { step: 2, title: 'Book Appointment', desc: 'Secure your slot in our calendar with a seamless digital booking process.', icon: 'event_available' },
                { step: 3, title: 'Get Your Car Fixed', desc: 'Experience professional execution and drive away with total confidence.', icon: 'car_repair' },
              ].map((item) => (
                <div key={item.step} className="relative flex gap-6 sm:gap-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-container-highest border border-tertiary/30 flex items-center justify-center text-tertiary font-bold text-lg sm:text-xl z-10 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2 uppercase">{item.title}</h4>
                    <p className="text-on-secondary-container text-sm sm:text-base">{item.desc}</p>
                    <span className="material-symbols-outlined text-3xl sm:text-4xl text-on-primary-container mt-4 opacity-50 block">{item.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container p-6 sm:p-12 md:p-20 border border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">Book your service in minutes.</h2>
              <p className="text-on-secondary-container text-base sm:text-xl max-w-md">
                Our team is ready to get your vehicle back in top shape. Schedule your appointment today.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-10 rounded-2xl">
              <QuickBookForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ReviewsSection />

      <Footer />
    </div>
  );
}
