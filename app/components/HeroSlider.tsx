'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SlideImage {
  url: string;
  alt: string;
  label: string;
}

const HERO_IMAGES: SlideImage[] = [
  { url: '/images/hero-car-repair.png', alt: 'Professional mechanic at work', label: 'Expert Mechanics' },
  { url: '/images/hero-oil-change.png', alt: 'Oil change service', label: 'Oil Change' },
  { url: '/images/hero-tire-services.png', alt: 'Tire installation service', label: 'Tire Services' },
  { url: '/images/hero-engine-diagnostics.png', alt: 'Engine diagnostics', label: 'Advanced Diagnostics' },
  { url: '/images/hero-battery-replacement.png', alt: 'Battery replacement service', label: 'Battery Service' },
  { url: '/images/hero-body-shop.png', alt: 'Body shop repairs', label: 'Body Shop' },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlay(true), 6000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 6000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 6000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Slides */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" loading="eager" />
          </div>
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1326] via-[#0b1326]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] px-8 mx-auto pt-24 flex flex-col items-start gap-8">
        <span className="text-[#00daf8] font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-3">
          <span className="w-12 h-[2px] bg-[#00daf8] inline-block"></span>
          Professional Auto Care
        </span>
        <h1 className="text-6xl md:text-8xl font-bold max-w-4xl tracking-tight leading-[0.95]">
          Reliable Auto Repair.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
            Done Right.
          </span>
        </h1>
        <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
          Oil change, tire services, diagnostics, and body work — all executed by our expert technicians at fair prices.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Link
            href="/booking"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-10 py-5 rounded-full font-extrabold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center"
          >
            BOOK APPOINTMENT
          </Link>
          <Link
            href="/services"
            className="glass-card text-on-surface px-10 py-5 rounded-full font-bold text-lg hover:bg-[#2d3449]/60 transition-all text-center"
          >
            VIEW SERVICES
          </Link>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#00daf8] w-8' : 'bg-white/30 hover:bg-white/50 w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide label */}
      <div className="absolute bottom-10 right-8 z-20 text-xs text-on-surface-variant uppercase tracking-widest">
        {HERO_IMAGES[currentSlide].label}
      </div>
    </section>
  );
}
