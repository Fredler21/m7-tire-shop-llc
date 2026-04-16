'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const snap = await getDoc(doc(db, 'profiles', user.uid));
        setRole(snap.data()?.role ?? null);
      } else {
        setRole(null);
      }
    });
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    await auth.signOut();
    setIsLoggedIn(false);
    setRole(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#171f33]/80 backdrop-blur-3xl border-b border-[#44474e]/20">
      <nav className="flex justify-between items-center w-full px-8 py-5 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00daf8] text-3xl">tire_repair</span>
          <span className="text-xl font-black text-slate-100 tracking-tighter uppercase font-headline">
            M7 Tire Shop
          </span>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          <Link href="/" className="text-[#00daf8] font-bold border-b-2 border-[#00daf8] pb-1 text-sm tracking-wide uppercase">Home</Link>
          <Link href="/services" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Services</Link>
          <Link href="/booking" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Booking</Link>
          <Link href="/estimates" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Estimates</Link>
          <Link href="/contact" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Contact</Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {(role === 'admin' || role === 'mechanic') && (
                <Link href="/admin" className="text-yellow-400 font-medium hover:text-yellow-300 transition-all duration-300 text-sm tracking-wide uppercase">
                  {role === 'admin' ? 'Admin' : 'Workshop'}
                </Link>
              )}
              <Link href="/dashboard" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Dashboard</Link>
              <button onClick={handleSignOut} className="text-slate-400 hover:text-red-400 transition-all text-sm uppercase tracking-wide">Sign Out</button>
            </div>
          ) : (
            <Link href="/auth/login" className="text-slate-300 font-medium hover:text-[#00daf8] transition-all duration-300 text-sm tracking-wide uppercase">Sign In</Link>
          )}
          <Link href="/booking" className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg">
            BOOK SERVICE
          </Link>
        </div>

        <button className="md:hidden text-[#dae2fd]" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-[#171f33] px-8 py-6 space-y-4 border-t border-[#44474e]/30">
          {[['/', 'Home'], ['/services', 'Services'], ['/booking', 'Booking'], ['/estimates', 'Estimates'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide font-medium" onClick={() => setIsOpen(false)}>{label}</Link>
          ))}
          {isLoggedIn ? (
            <>
              {(role === 'admin' || role === 'mechanic') && (
                <Link href="/admin" className="block text-yellow-400 py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>
                  {role === 'admin' ? 'Admin Dashboard' : 'Workshop'}
                </Link>
              )}
              <Link href="/dashboard" className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>My Dashboard</Link>
              <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="block text-slate-400 hover:text-red-400 py-2 text-sm uppercase tracking-wide w-full text-left">Sign Out</button>
            </>
          ) : (
            <Link href="/auth/login" className="block text-slate-300 hover:text-[#00daf8] py-2 text-sm uppercase tracking-wide" onClick={() => setIsOpen(false)}>Sign In</Link>
          )}
          <Link href="/booking" className="block w-full text-center bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide mt-4" onClick={() => setIsOpen(false)}>
            BOOK SERVICE
          </Link>
        </div>
      )}
    </header>
  );
}
