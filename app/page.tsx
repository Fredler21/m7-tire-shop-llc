'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ServiceCard from '@/app/components/ServiceCard';
import ReviewsSection from '@/app/components/ReviewsSection';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FEATURED_SERVICES = [
  {
    id: '1',
    name: 'Oil Change',
    description: 'Professional oil change with filter replacement',
    startingPrice: 45,
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=3840&q=95',
  },
  {
    id: '2',
    name: 'Tire Services',
    description: 'Tire rotation, balancing, and replacement',
    startingPrice: 60,
    image: 'https://images.unsplash.com/photo-1486521328584-c6fbb4f3b501?w=3840&q=95',
  },
  {
    id: '3',
    name: 'Brake Repair',
    description: 'Complete brake system inspection and repair',
    startingPrice: 150,
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=3840&q=95',
  },
];

export default function Home() {
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    // Set hero image
    setHeroImage('https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=3840&q=95');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-screen pt-20">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            M7 Tire Shop <span className="text-orange-500">LLC</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-8">
            Professional Automotive Services You Can Trust
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-xl">
            Expert mechanics. Fair prices. Quality workmanship. Your car deserves the best.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/booking"
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Book Now
            </Link>
            <Link
              href="/services"
              className="border-2 border-white hover:bg-white hover:text-black text-white text-lg font-bold px-8 py-4 rounded-lg transition duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We provide comprehensive automotive services for all your vehicle needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {FEATURED_SERVICES.map((service) => (
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

          <div className="text-center">
            <Link
              href="/services"
              className="inline-block border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white text-lg font-bold px-8 py-3 rounded-lg transition duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Mechanics</h3>
              <p className="text-gray-300">
                Certified professionals with 20+ years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Fair Pricing</h3>
              <p className="text-gray-300">
                Transparent pricing with no hidden fees
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Service</h3>
              <p className="text-gray-300">
                Quick turnaround times without compromising quality
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-white mb-2">Warranty</h3>
              <p className="text-gray-300">
                Warranty on all parts and labor performed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Service Your Car?</h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Book your appointment today and experience professional automotive care
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Book Appointment Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
