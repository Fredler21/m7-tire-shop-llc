'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';
import { Service } from '@/lib/types';
import { useEffect, useState } from 'react';

const services: Service[] = [
  {
    id: '1',
    name: 'Oil Change',
    description: 'Professional oil change with filter replacement and fluid check',
    startingPrice: 45,
    image: '/images/hero-oil-change.png',
    category: 'maintenance',
  },
  {
    id: '2',
    name: 'Tire Services',
    description: 'Tire rotation, balancing, patching, and replacement services',
    startingPrice: 60,
    image: '/images/hero-tire-services.png',
    category: 'tires',
  },
  {
    id: '3',
    name: 'Brake Repair',
    description: 'Complete brake system inspection and repair services',
    startingPrice: 150,
    image: '/images/hero-car-repair.png',
    category: 'repair',
  },
  {
    id: '4',
    name: 'Engine Diagnostics',
    description: 'Advanced computer diagnostics for engine issues',
    startingPrice: 85,
    image: '/images/hero-engine-diagnostics.png',
    category: 'diagnostics',
  },
  {
    id: '5',
    name: 'Battery Replacement',
    description: 'Battery testing and replacement with warranty',
    startingPrice: 50,
    image: '/images/hero-battery-replacement.png',
    category: 'parts',
  },
  {
    id: '6',
    name: 'Body Shop',
    description: 'Dent removal, painting, and body panel replacement',
    startingPrice: 200,
    image: '/images/hero-body-shop.png',
    category: 'body',
  },
];

export default function ServicesPage() {
  const [pageServices, setPageServices] = useState<Service[]>(services);

  useEffect(() => {
    // Simulate loading services from API
    setPageServices(services);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We offer comprehensive automotive services using modern equipment and expert mechanics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                description={service.description}
                startingPrice={service.startingPrice}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
