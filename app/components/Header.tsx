'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#171f33]/80 backdrop-blur-3xl border-b border-[#44474e]/20">
      <nav className="flex justify-between items-center w-full px-8 py-5 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00daf8] text-3xl">tire_repair</span>
          <span className="text-xl font-black text-slate-100 tracking-tighter uppercase font-headline">
            M7 Tire Shop
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          <Link href="/" className="text-[#00daf8] font-bold border-b-2 border-[#00daf8] pb-1 text-sm tracking-wide uppercase">
            Home
          </Link>
          <Link href="/services" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">
            Services
          </Link>
          <Link href="/booking" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">
            Booking
          </Link>
          <Link href="/contact" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">
            Contact
          </Link>
          <Link
            href="/booking"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            BOOK SERVICE
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#dae2fd]" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#171f33] px-8 py-6 space-y-4 border-t border-[#44474e]/30">
          <Link href="/" className="block text-[#00daf8] py-2 text-sm uppercase tracking-wide font-bold" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/services" className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href="/booking" className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>
            Booking
          </Link>
          <Link href="/contact" className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link
            href="/booking"
            className="block w-full text-center bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide mt-4"
            onClick={() => setIsOpen(false)}
          >
            BOOK SERVICE
          </Link>
        </div>
      )}
    </header>
  );
}
