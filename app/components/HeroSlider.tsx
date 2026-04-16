'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SlideImage {
  url: string;
  alt: string;
  title: string;
}

// High-quality 4K automotive images - all verified as relevant to car repair, tires, and body shop
const HERO_IMAGES: SlideImage[] = [
  {
    url: '/images/hero-car-repair.png',
    alt: 'Professional mechanic with wrench',
    title: 'Expert Mechanics',
  },
  {
    url: '/images/hero-oil-change.png',
    alt: 'Mechanic performing oil change service',
    title: 'Oil Change Service',
  },
  {
    url: '/images/hero-tire-services.png',
    alt: 'Tire change and installation service',
    title: 'Tire Services',
  },
  {
    url: '/images/hero-engine-diagnostics.png',
    alt: 'Engine diagnostics using digital scanner',
    title: 'Engine Diagnostics',
  },
  {
    url: '/images/hero-body-shop.png',
    alt: 'Professional body shop repairs',
    title: 'Body Shop Excellence',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <div className="relative w-full h-screen pt-20 overflow-hidden">
      {/* Image Slides */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto z-20">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          M7 Tire Shop <span className="text-orange-500">LLC</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 mb-8 drop-shadow-md">
          Professional Automotive Services You Can Trust
        </p>
        <p className="text-lg text-gray-300 mb-12 max-w-xl drop-shadow-md">
          Expert mechanics. Fair prices. Quality workmanship. Your car deserves the best.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/booking"
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105 drop-shadow-lg"
          >
            Book Now
          </Link>
          <Link
            href="/services"
            className="border-2 border-white hover:bg-white hover:text-black text-white text-lg font-bold px-8 py-4 rounded-lg transition duration-300 drop-shadow-lg"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition duration-200"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-32 right-6 z-30 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
        {currentSlide + 1} / {HERO_IMAGES.length}
      </div>
    </div>
  );
}
