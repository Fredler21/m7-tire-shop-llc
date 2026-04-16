import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full rounded-t-[3rem] mt-20 bg-[#020617]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start px-12 py-24 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00daf8] text-3xl">tire_repair</span>
            <span className="font-headline text-xl font-bold text-slate-100">M7 TIRE SHOP LLC</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Professional automotive services for all your vehicle needs. Expert mechanics, fair pricing, fast service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h6 className="text-[#00daf8] text-sm tracking-wide uppercase font-bold">Quick Links</h6>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-sm uppercase tracking-wide">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-sm uppercase tracking-wide">
                Services
              </Link>
            </li>
            <li>
              <Link href="/booking" className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-sm uppercase tracking-wide">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block text-sm uppercase tracking-wide">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h6 className="text-[#00daf8] text-sm tracking-wide uppercase font-bold">Contact</h6>
          <p className="text-slate-400 text-sm leading-relaxed">
            123 Main Street<br />
            City, State 12345<br /><br />
            info@m7tireshop.com<br />
            (555) 123-4567
          </p>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Hours</p>
            <p className="text-slate-400 text-sm">Mon – Fri: 8AM – 6PM</p>
            <p className="text-slate-400 text-sm">Sat: 9AM – 4PM</p>
            <p className="text-slate-400 text-sm">Sun: Closed</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-8 px-12 text-center">
        <p className="text-xs tracking-wide uppercase text-slate-500">
          © 2025 M7 TIRE SHOP LLC. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
