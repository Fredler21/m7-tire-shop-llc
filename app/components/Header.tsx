'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
            M7
          </div>
          <span className="text-xl font-bold hidden sm:inline">M7 Tire Shop LLC</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="hover:text-orange-500 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="hover:text-orange-500 transition duration-200"
          >
            Services
          </Link>
          <Link
            href="/booking"
            className="hover:text-orange-500 transition duration-200"
          >
            Booking
          </Link>
          <Link
            href="/contact"
            className="hover:text-orange-500 transition duration-200"
          >
            Contact
          </Link>
        </div>

        <Link
          href="/booking"
          className="hidden md:inline bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition duration-200"
        >
          Book Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-2">
          <Link href="/" className="block hover:text-orange-500 py-2">
            Home
          </Link>
          <Link href="/services" className="block hover:text-orange-500 py-2">
            Services
          </Link>
          <Link href="/booking" className="block hover:text-orange-500 py-2">
            Booking
          </Link>
          <Link href="/contact" className="block hover:text-orange-500 py-2">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
