'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactForm from '@/app/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Have questions? Get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
              <p className="text-gray-300">(555) 123-4567</p>
              <p className="text-gray-400 text-sm">Mon - Fri: 8AM - 6PM</p>
            </div>

            {/* Email */}
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-white font-bold text-lg mb-2">Email Us</h3>
              <p className="text-gray-300">info@m7tirshop.com</p>
              <p className="text-gray-400 text-sm">We reply within 24 hours</p>
            </div>

            {/* Location */}
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-white font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Main Street</p>
              <p className="text-gray-400 text-sm">City, State 12345</p>
            </div>
          </div>

          {/* Google Maps - Placeholder */}
          <div className="mb-16">
            <iframe
              className="w-full h-96 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMrCsDAwJzIxLjYiVw!5e0!3m2!1sen!2sus!4v1234567890"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
