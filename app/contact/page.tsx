'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactForm from '@/app/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Page Header */}
      <div className="pt-40 pb-20 px-8 max-w-[1440px] mx-auto">
        <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-3 mb-8">
          <span className="w-12 h-[2px] bg-tertiary inline-block"></span>
          Get In Touch
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">CONTACT US</h1>
        <p className="text-on-secondary-container text-xl max-w-2xl">
          Have questions or need assistance? Our team is here to help.
        </p>
      </div>

      <div className="pb-32 px-8 max-w-[1440px] mx-auto">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: 'call', title: 'Call Us', info: '(555) 123-4567', sub: 'Mon – Fri: 8AM – 6PM' },
            { icon: 'mail', title: 'Email Us', info: 'info@m7tireshop.com', sub: 'We reply within 24 hours' },
            { icon: 'location_on', title: 'Visit Us', info: '123 Main Street', sub: 'City, State 12345' },
          ].map((item) => (
            <div key={item.icon} className="bg-surface-container-low p-10 rounded-2xl text-center border border-outline-variant/10 group hover:border-tertiary/20 transition-all">
              <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-tertiary mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">{item.title}</h3>
              <p className="text-on-surface font-medium">{item.info}</p>
              <p className="text-on-secondary-container text-sm mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Map */}
          <div>
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Find Us</h2>
            <div className="rounded-2xl overflow-hidden border border-outline-variant/20">
              <iframe
                className="w-full h-96"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'Mon – Fri', hours: '8:00 AM – 6:00 PM' },
                { label: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                { label: 'Sunday', hours: 'Closed' },
              ].map((h) => (
                <div key={h.label} className="bg-surface-container p-4 rounded-xl border border-outline-variant/10">
                  <p className="text-tertiary text-xs font-bold uppercase tracking-widest mb-1">{h.label}</p>
                  <p className="text-on-surface text-sm font-medium">{h.hours}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Send a Message</h2>
            <div className="glass-card p-10 rounded-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
