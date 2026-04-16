import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { SERVICES } from '@/lib/services-data';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) notFound();

  const others = SERVICES.filter((s) => s.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* ── HERO IMAGE ── */}
      <div className="relative h-[55vh] sm:h-[65vh] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/60 to-transparent" />

        {/* Content anchored to bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 sm:pb-12 max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 sm:w-12 h-[2px] bg-tertiary inline-block"></span>
                {service.category}
              </span>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass-card flex items-center justify-center border border-tertiary/30">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl text-tertiary">{service.icon}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  {service.name.toUpperCase()}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-on-secondary-container text-sm font-medium">Starting from</span>
              <span className="text-3xl sm:text-4xl font-bold text-tertiary">${service.startingPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-16 items-start">

          {/* ── LEFT: Details (2 cols wide) ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 uppercase">About This Service</h2>
              <div className="h-[2px] w-16 bg-tertiary mb-6"></div>
              <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 uppercase">What&apos;s Included</h2>
              <div className="h-[2px] w-16 bg-tertiary mb-6"></div>
              <ul className="space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-on-surface-variant text-sm sm:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration + Warranty badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="glass-card p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl text-tertiary">schedule</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-secondary-container mb-1">Est. Duration</p>
                  <p className="font-bold text-on-surface">{service.duration}</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl text-tertiary">verified_user</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-secondary-container mb-1">Warranty</p>
                  <p className="font-bold text-on-surface">{service.warranty}</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 uppercase">Common Questions</h2>
              <div className="h-[2px] w-16 bg-tertiary mb-6"></div>
              <div className="space-y-5">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="bg-surface-container-low rounded-2xl p-6 sm:p-7 border border-outline-variant/10">
                    <p className="font-bold text-on-surface mb-3 flex items-start gap-3">
                      <span className="material-symbols-outlined text-tertiary text-xl shrink-0 mt-0.5">help</span>
                      {faq.question}
                    </p>
                    <p className="text-on-surface-variant text-sm leading-relaxed pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking CTA (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-28">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-outline-variant/10">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Book This Service</h3>
              <p className="text-on-secondary-container text-sm mb-6">Confirmed within 24 hours.</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
                  <span className="text-on-secondary-container text-sm">Service</span>
                  <span className="font-bold text-on-surface text-sm">{service.name}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
                  <span className="text-on-secondary-container text-sm">Starting Price</span>
                  <span className="font-bold text-tertiary">${service.startingPrice}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-outline-variant/10">
                  <span className="text-on-secondary-container text-sm">Duration</span>
                  <span className="font-bold text-on-surface text-sm">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-on-secondary-container text-sm">Warranty</span>
                  <span className="font-bold text-on-surface text-sm">{service.warranty}</span>
                </div>
              </div>

              <Link
                href={`/booking?service=${encodeURIComponent(service.name)}`}
                className="w-full block text-center bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                Book Appointment
              </Link>

              <div className="mt-6 pt-6 border-t border-outline-variant/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">call</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-secondary-container">Call us directly</p>
                  <p className="font-bold text-on-surface">(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTHER SERVICES ── */}
      <section className="py-12 sm:py-20 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group relative rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-tertiary/30 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover [filter:grayscale(100%)_brightness(0.35)] group-hover:[filter:grayscale(0%)_brightness(1)] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-tertiary">{s.icon}</span>
                    <span className="font-bold text-sm uppercase tracking-wide">{s.name}</span>
                  </div>
                </div>
                <div className="p-5 bg-surface-container-low group-hover:bg-surface-container transition-colors duration-300">
                  <p className="text-on-secondary-container text-xs leading-relaxed mb-3">{s.description}</p>
                  <span className="text-tertiary text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    From ${s.startingPrice}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
