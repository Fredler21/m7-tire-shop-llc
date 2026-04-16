'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';
import { SERVICES } from '@/lib/services-data';

const services = SERVICES;

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Page Header */}
      <div className="pt-28 sm:pt-40 pb-10 sm:pb-20 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 sm:w-12 h-[2px] bg-tertiary inline-block"></span>
          What We Offer
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
          SPECIALIZED CARE
        </h1>
        <p className="text-on-secondary-container text-base sm:text-xl max-w-2xl">
          Comprehensive automotive solutions for all makes and models, executed by expert technicians using modern equipment.
        </p>
      </div>

      {/* Services Grid */}
      <section className="pb-16 sm:pb-32 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
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
      <section className="py-12 sm:py-16 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-3 gap-4 sm:gap-12 text-center">
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
