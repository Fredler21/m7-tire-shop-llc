import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">M7 Tire Shop LLC</h3>
            <p className="text-sm">
              Professional automotive services for all your car maintenance and repair needs.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-500 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-orange-500 transition">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 (555) 123-4567</li>
              <li>📧 info@m7tirshop.com</li>
              <li>📍 123 Main Street, City, State</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li>Mon - Fri: 8AM - 6PM</li>
              <li>Sat: 9AM - 4PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            © 2024 M7 Tire Shop LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
