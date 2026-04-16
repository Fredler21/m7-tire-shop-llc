'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';

const services = [
  { id: '1', name: 'Oil Change', description: 'Synthetic and specialized oil services using premium filters for engine longevity. Includes fluid level check.', startingPrice: 45, icon: 'oil_barrel', image: '/images/hero-oil-change.png', category: 'maintenance' },
  { id: '2', name: 'Tire Services', description: 'Precision balancing, rotation, patching, and high-performance tire fitment for ultimate grip and safety.', startingPrice: 60, icon: 'tire_repair', image: '/images/hero-tire-services.png', category: 'tires' },
  { id: '3', name: 'Brake Repair', description: 'Ceramic and composite pad replacement with full rotor resurfacing and brake fluid flush available.', startingPrice: 150, icon: 'car_repair', image: '/images/hero-car-repair.png', category: 'repair' },
  { id: '4', name: 'Engine Diagnostics', description: 'Advanced electronic scans and full system telemetry for modern engine modules and fault code analysis.', startingPrice: 85, icon: 'settings_suggest', image: '/images/hero-engine-diagnostics.png', category: 'diagnostics' },
  { id: '5', name: 'Battery Replacement', description: 'Load testing, terminal cleaning, and replacement of OEM grade electrical units with warranty included.', startingPrice: 50, icon: 'battery_charging_full', image: '/images/hero-battery-replacement.png', category: 'parts' },
  { id: '6', name: 'Body Shop', description: 'Precision panel work and factory-spec paint matching for structural integrity and showroom finish.', startingPrice: 200, icon: 'build', image: '/images/hero-body-shop.png', category: 'body' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Page Header */}
      <div className="pt-40 pb-20 px-8 max-w-[1440px] mx-auto">
        <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-3 mb-8">
          <span className="w-12 h-[2px] bg-tertiary inline-block"></span>
          What We Offer
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          SPECIALIZED CARE
        </h1>
        <p className="text-on-secondary-container text-xl max-w-2xl">
          Comprehensive automotive solutions for all makes and models, executed by expert technicians using modern equipment.
        </p>
      </div>

      {/* Services Grid */}
      <section className="pb-32 px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
      </section>

      {/* Info strip */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: 'schedule', title: 'Mon – Fri', desc: '8:00 AM – 6:00 PM' },
            { icon: 'schedule', title: 'Saturday', desc: '9:00 AM – 4:00 PM' },
            { icon: 'block', title: 'Sunday', desc: 'Closed' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-3xl">{item.icon}</span>
              <h4 className="font-bold uppercase tracking-wide">{item.title}</h4>
              <p className="text-on-secondary-container">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
