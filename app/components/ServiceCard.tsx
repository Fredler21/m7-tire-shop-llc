'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  icon: string;
  image: string;
}

export default function ServiceCard({
  id,
  name,
  description,
  startingPrice,
  icon,
  image,
}: ServiceCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
        isActive ? 'border-tertiary/30' : 'border-outline-variant/10'
      }`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
    >

      {/* ── IMAGE LAYER ── */}
      <div className="relative h-56 overflow-hidden">
        {/* Grayscale dark image — default state */}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isActive
              ? 'scale-110 [filter:grayscale(0%)_brightness(1)_contrast(1)]'
              : 'scale-100 [filter:grayscale(100%)_brightness(0.35)_contrast(1.1)]'
          }`}
        />

        {/* Dark-to-transparent gradient over image */}
        <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
          isActive
            ? 'from-surface-container-low/80 via-transparent to-transparent'
            : 'from-surface-container-low via-surface-container-low/60 to-transparent'
        }`} />

        {/* Icon badge — top left */}
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl glass-card flex items-center justify-center border transition-all duration-300 ${
          isActive ? 'border-tertiary/40' : 'border-outline-variant/20'
        }`}>
          <span className={`material-symbols-outlined text-2xl transition-colors duration-300 ${
            isActive ? 'text-tertiary' : 'text-on-secondary-container'
          }`}>{icon}</span>
        </div>

        {/* Price badge — top right */}
        <div className={`absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-sm
                        text-tertiary font-bold text-sm px-3 py-1.5 rounded-full border border-tertiary/20
                        transition-all duration-300 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}>
          From ${startingPrice}
        </div>

        {/* Cyan glow line at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tertiary to-transparent
                        transition-transform duration-500 origin-center ${
          isActive ? 'scale-x-100' : 'scale-x-0'
        }`} />
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className={`transition-colors duration-500 p-7 ${
        isActive ? 'bg-surface-container' : 'bg-surface-container-low'
      }`}>
        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{name}</h3>
        <p className="text-on-secondary-container text-sm leading-relaxed mb-6">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-on-surface-variant text-sm font-medium">From
            <span className="text-tertiary font-bold ml-1">${startingPrice}</span>
          </span>
          <Link
            href={`/booking?service=${encodeURIComponent(name)}`}
            className="flex items-center gap-1 text-tertiary font-bold tracking-wider uppercase text-xs
                       hover:translate-x-1 transition-transform duration-300"
          >
            Book Now
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
