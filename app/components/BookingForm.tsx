'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const SERVICES = [
  'Oil Change',
  'Tire Services',
  'Brake Repair',
  'Engine Diagnostics',
  'Battery Replacement',
  'Body Shop',
];

const AVAILABLE_TIMES = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

interface BookingFormProps {
  initialService?: string;
}

export default function BookingForm({ initialService = '' }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    service: initialService || SERVICES[0],
    date: '',
    time: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Booking confirmed! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          carModel: '',
          service: SERVICES[0],
          date: '',
          time: '',
          notes: '',
        });
      } else {
        toast.error('Failed to create booking');
      }
    } catch (error) {
      toast.error('Error creating booking');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
        <input
          type="text"
          name="carModel"
          placeholder="Car Model (e.g., Honda Civic) *"
          value={formData.carModel}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
      >
        {SERVICES.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        >
          <option value="">Select Time</option>
          {AVAILABLE_TIMES.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="notes"
        placeholder="Additional Notes (Optional)"
        value={formData.notes}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none resize-none"
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition duration-200"
      >
        {loading ? 'Processing...' : 'Book Appointment'}
      </button>
    </form>
  );
}
