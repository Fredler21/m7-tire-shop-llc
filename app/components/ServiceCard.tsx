'use client';

import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
}

export default function ServiceCard({
  id,
  name,
  description,
  startingPrice,
  image,
}: ServiceCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-orange-500">
            From ${startingPrice}
          </span>
          <Link
            href={`/booking?service=${name}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
