'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { auth, db } from '@/lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { Vehicle } from '@/lib/types';

const SERVICES = [
  'Oil Change',
  'Tire Services',
  'Brake Repair',
  'Engine Diagnostics',
  'Battery Replacement',
  'Body Shop',
];

interface BookingFormProps {
  initialService?: string;
  initialCarModel?: string;
}

export default function BookingForm({ initialService = '', initialCarModel = '' }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<{ time: string; is_booked: boolean }[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    car_model: initialCarModel || '',
    service: initialService || SERVICES[0],
    date: '',
    time: '',
    notes: '',
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Load user profile + vehicles if logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const [profileSnap, vehiclesSnap] = await Promise.all([
        getDoc(doc(db, 'profiles', user.uid)),
        getDocs(query(collection(db, 'vehicles'), where('user_id', '==', user.uid))),
      ]);
      const profile = profileSnap.data();
      if (profile) {
        setFormData((prev) => ({
          ...prev,
          name: prev.name || profile.name || '',
          email: prev.email || user.email || '',
          phone: prev.phone || profile.phone || '',
        }));
      }
      setVehicles(vehiclesSnap.docs.map((d) => ({ id: d.id, ...d.data() } as any)));
    });
    return () => unsub();
  }, []);

  const fetchSlots = useCallback(async (date: string) => {
    if (!date) { setSlots([]); return; }
    setSlotsLoading(true);
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      if (res.ok) setSlots(await res.json());
    } catch { setSlots([]); }
    finally { setSlotsLoading(false); }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'date') {
      setFormData((prev) => ({ ...prev, time: '' }));
      fetchSlots(value);
    }
  };

  const handleVehicleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedVehicleId(id);
    if (id) {
      const v = vehicles.find((v) => v.id === id);
      if (v) setFormData((prev) => ({ ...prev, car_model: `${v.year} ${v.make} ${v.model}` }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time) { toast.error('Please select a time slot'); return; }
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, vehicle_id: selectedVehicleId || null }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Booking confirmed! Check your email for confirmation.');
        setFormData({ name: '', email: '', phone: '', car_model: '', service: SERVICES[0], date: '', time: '', notes: '' });
        setSlots([]);
        setSelectedVehicleId('');
      } else {
        toast.error(result.error ?? 'Failed to create booking');
      }
    } catch { toast.error('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const availableSlots = slots.filter((s) => !s.is_booked);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Full Name *</label>
          <input type="text" name="name" placeholder="John Smith" value={formData.name} onChange={handleChange} required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Email Address *</label>
          <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Phone Number *</label>
          <input type="tel" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Vehicle *</label>
          {vehicles.length > 0 && (
            <select value={selectedVehicleId} onChange={handleVehicleSelect}
              className="w-full bg-surface-container border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all mb-2">
              <option value="" className="bg-surface-container">Type manually below</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id} className="bg-surface-container">{v.year} {v.make} {v.model}</option>
              ))}
            </select>
          )}
          <input type="text" name="car_model" placeholder="e.g., Honda Civic 2020" value={formData.car_model} onChange={handleChange} required
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all placeholder:text-on-secondary-container/50" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Select Service *</label>
        <select name="service" value={formData.service} onChange={handleChange}
          className="w-full bg-surface-container border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all">
          {SERVICES.map((service) => (
            <option key={service} value={service} className="bg-surface-container">{service}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Select Date *</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} min={minDate} required
          className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-tertiary focus:outline-none text-on-surface pb-2 transition-all" />
      </div>

      {/* Live Time Slot Picker */}
      {formData.date && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-tertiary">
            Available Times *
            {slotsLoading && <span className="text-on-surface-variant ml-2 normal-case font-normal tracking-normal"> Loading slots...</span>}
          </label>
          {!slotsLoading && slots.length === 0 ? (
            <p className="text-on-surface-variant text-sm py-2">No slots available for this date. Please choose another day.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button key={slot.time} type="button" disabled={slot.is_booked}
                  onClick={() => setFormData((prev) => ({ ...prev, time: slot.time }))}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border ${
                    slot.is_booked
                      ? 'border-outline-variant/10 text-on-surface-variant/30 cursor-not-allowed line-through'
                      : formData.time === slot.time
                      ? 'border-tertiary bg-tertiary/20 text-tertiary'
                      : 'border-outline-variant/20 text-on-surface hover:border-tertiary/50 hover:text-tertiary'
                  }`}>
                  {slot.time}
                </button>
              ))}
            </div>
          )}
          {availableSlots.length > 0 && availableSlots.length <= 3 && (
            <p className="text-yellow-400 text-xs">Only {availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} left today!</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-tertiary">Additional Notes</label>
        <textarea name="notes" placeholder="Describe the issue or any special requests..." value={formData.notes} onChange={handleChange} rows={4}
          className="w-full bg-transparent border border-outline-variant/30 focus:border-tertiary focus:outline-none text-on-surface p-3 rounded-xl transition-all resize-none placeholder:text-on-secondary-container/50 mt-2" />
      </div>

      <button type="submit" disabled={loading || !formData.time}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-5 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50">
        {loading ? 'Processing...' : 'Confirm Appointment'}
      </button>
    </form>
  );
}
