'use client';

import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  icon: string;
}

export default function ServiceCard({
  id,
  name,
  description,
  startingPrice,
  icon,
}: ServiceCardProps) {
  return (
    <div className="group bg-surface-container-low p-10 rounded-2xl hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden border border-outline-variant/10 hover:border-tertiary/20">
      {/* Ghost icon background */}
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-[120px] text-on-surface">{icon}</span>
      </div>

      <span className="material-symbols-outlined text-tertiary text-4xl mb-8 block">{icon}</span>
      <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{name}</h3>
      <p className="text-on-secondary-container mb-2 leading-relaxed text-sm">{description}</p>
      <p className="text-tertiary font-bold text-lg mb-8">From ${startingPrice}</p>
      <Link
        href={`/booking?service=${encodeURIComponent(name)}`}
        className="text-tertiary font-bold tracking-wider uppercase text-sm flex items-center gap-2 hover:translate-x-2 transition-transform"
      >
        Book Now <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </Link>
    </div>
  );
}
