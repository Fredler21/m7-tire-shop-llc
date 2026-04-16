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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Vehicle Model *</label>
          <input
            type="text"
            name="carModel"
            placeholder="e.g., Honda Civic 2020"
            value={formData.carModel}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Select Service *</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full bg-surface-container border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all"
        >
          {SERVICES.map((service) => (
            <option key={service} value={service} className="bg-surface-container">
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Preferred Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Preferred Time *</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full bg-surface-container border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all"
          >
            <option value="" className="bg-surface-container">Select Time</option>
            {AVAILABLE_TIMES.map((time) => (
              <option key={time} value={time} className="bg-surface-container">
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Additional Notes</label>
        <textarea
          name="notes"
          placeholder="Describe the issue or any special requests..."
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full bg-transparent border border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface p-3 rounded-xl transition-all resize-none placeholder:text-on-secondary-container/50 mt-2"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-5 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Confirm Appointment'}
      </button>
    </form>
  );
}
