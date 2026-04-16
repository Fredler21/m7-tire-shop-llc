'use client';

import { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import type { Booking, Profile, Vehicle } from '@/lib/types';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

interface Props {
  profile: Profile | null;
  bookings: Booking[];
  vehicles: Vehicle[];
  userEmail: string;
  userId: string;
}

type Tab = 'bookings' | 'vehicles' | 'profile';

export default function DashboardClient({ profile, bookings, vehicles: initialVehicles, userEmail, userId }: Props) {
  const [tab, setTab] = useState<Tab>('bookings');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({ make: '', model: '', year: '', license_plate: '', vin: '' });
  const [savingVehicle, setSavingVehicle] = useState(false);

  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const historyBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingVehicle(true);
    try {
      const docRef = await addDoc(collection(db, 'vehicles'), {
        user_id: userId,
        make: vehicleForm.make,
        model: vehicleForm.model,
        year: parseInt(vehicleForm.year),
        license_plate: vehicleForm.license_plate || null,
        vin: vehicleForm.vin || null,
        createdAt: serverTimestamp(),
      });
      const newVehicle: Vehicle = {
        id: docRef.id,
        user_id: userId,
        make: vehicleForm.make,
        model: vehicleForm.model,
        year: parseInt(vehicleForm.year),
        license_plate: vehicleForm.license_plate || undefined,
        vin: vehicleForm.vin || undefined,
        created_at: new Date().toISOString(),
      };
      setVehicles([newVehicle, ...vehicles]);
      setVehicleForm({ make: '', model: '', year: '', license_plate: '', vin: '' });
      setShowAddVehicle(false);
      toast.success('Vehicle added!');
    } catch {
      toast.error('Failed to add vehicle');
    } finally {
      setSavingVehicle(false);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vehicles', id));
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success('Vehicle removed');
    } catch {
      toast.error('Failed to remove vehicle');
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status: 'cancelled', updatedAt: serverTimestamp() });
      toast.success('Booking cancelled');
      window.location.reload();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="mb-10">
        <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-tertiary inline-block"></span>
          My Account
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-on-surface mb-2">
          Welcome back, <span className="text-tertiary">{profile?.name?.split(' ')[0] ?? 'Customer'}</span>
        </h1>
        <p className="text-on-surface-variant">{userEmail}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: 'calendar_today' },
          { label: 'Active', value: activeBookings.length, icon: 'pending_actions' },
          { label: 'Completed', value: historyBookings.filter(b => b.status === 'completed').length, icon: 'check_circle' },
          { label: 'Vehicles Saved', value: vehicles.length, icon: 'directions_car' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 rounded-2xl">
            <span className="material-symbols-outlined text-tertiary text-2xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
            <div className="text-3xl font-bold text-on-surface mb-1">{stat.value}</div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <Link href="/booking" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:scale-105 transition-all">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Book Appointment
        </Link>
        <Link href="/estimates" className="flex items-center gap-2 border border-tertiary/30 text-tertiary px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-tertiary/10 transition-all">
          <span className="material-symbols-outlined text-lg">calculate</span>
          Get Estimate
        </Link>
      </div>

      <div className="flex gap-1 bg-surface-container rounded-2xl p-1 mb-8 w-fit">
        {(['bookings', 'vehicles', 'profile'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${tab === t ? 'bg-tertiary text-on-tertiary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'bookings' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-on-surface uppercase tracking-wide mb-4">Active Bookings</h2>
            {activeBookings.length === 0 ? (
              <div className="glass-card p-10 rounded-2xl text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl text-tertiary/40 mb-3 block">event_busy</span>
                No active bookings. <Link href="/booking" className="text-tertiary hover:underline">Book a service</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activeBookings.map((b) => <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking} />)}
              </div>
            )}
          </div>
          {historyBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-on-surface uppercase tracking-wide mb-4">Service History</h2>
              <div className="space-y-4">
                {historyBookings.map((b) => <BookingCard key={b.id} booking={b} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'vehicles' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-on-surface uppercase tracking-wide">My Vehicles</h2>
            <button onClick={() => setShowAddVehicle(!showAddVehicle)} className="flex items-center gap-2 bg-tertiary/10 border border-tertiary/20 text-tertiary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-tertiary/20 transition-all">
              <span className="material-symbols-outlined text-base">add</span>
              Add Vehicle
            </button>
          </div>

          {showAddVehicle && (
            <form onSubmit={handleAddVehicle} className="glass-card p-6 rounded-2xl mb-6 space-y-4">
              <h3 className="font-bold text-on-surface mb-2">Add New Vehicle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Make *', key: 'make', placeholder: 'Toyota', required: true },
                  { label: 'Model *', key: 'model', placeholder: 'Camry', required: true },
                  { label: 'Year *', key: 'year', placeholder: '2022', required: true, type: 'number' },
                  { label: 'License Plate', key: 'license_plate', placeholder: 'ABC-1234' },
                  { label: 'VIN', key: 'vin', placeholder: '1HGBH41J...' },
                ].map(({ label, key, placeholder, required, type }) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-tertiary">{label}</label>
                    <input
                      type={type ?? 'text'}
                      required={required}
                      value={(vehicleForm as any)[key]}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-on-surface text-sm focus:outline-none focus:border-tertiary transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={savingVehicle} className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide disabled:opacity-50">
                  {savingVehicle ? 'Saving...' : 'Save Vehicle'}
                </button>
                <button type="button" onClick={() => setShowAddVehicle(false)} className="border border-outline-variant/30 text-on-surface-variant px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide hover:border-outline-variant/60 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {vehicles.length === 0 ? (
            <div className="glass-card p-10 rounded-2xl text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl text-tertiary/40 mb-3 block">directions_car</span>
              No vehicles saved yet. Add your car for faster booking.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map((v) => (
                <div key={v.id} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                    <button onClick={() => handleDeleteVehicle(v.id)} className="text-on-surface-variant hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                  <div className="text-on-surface font-bold text-lg">{v.year} {v.make} {v.model}</div>
                  {v.license_plate && <div className="text-on-surface-variant text-sm mt-1">Plate: {v.license_plate}</div>}
                  {v.vin && <div className="text-on-surface-variant text-xs mt-1 font-mono truncate">VIN: {v.vin}</div>}
                  <Link href={`/booking?car=${encodeURIComponent(`${v.year} ${v.make} ${v.model}`)}`} className="mt-4 inline-flex items-center gap-1.5 text-tertiary text-sm font-semibold hover:underline">
                    <span className="material-symbols-outlined text-base">calendar_add_on</span>
                    Book with this car
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'profile' && (
        <div className="max-w-lg">
          <div className="glass-card p-8 rounded-2xl space-y-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tertiary to-primary flex items-center justify-center text-2xl font-bold text-on-tertiary">
                {profile?.name?.charAt(0)?.toUpperCase() ?? '?'}
              </div>
              <div>
                <div className="font-bold text-on-surface text-xl">{profile?.name}</div>
                <div className="text-on-surface-variant text-sm">{userEmail}</div>
                <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mt-1 inline-block ${profile?.role === 'admin' ? 'text-yellow-400 bg-yellow-400/10' : 'text-tertiary bg-tertiary/10'}`}>
                  {profile?.role ?? 'Customer'}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: 'person', label: 'Name', value: profile?.name ?? '—' },
                { icon: 'mail', label: 'Email', value: userEmail },
                { icon: 'call', label: 'Phone', value: profile?.phone ?? '—' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-3 border-b border-outline-variant/10 last:border-0">
                  <span className="material-symbols-outlined text-tertiary text-xl">{icon}</span>
                  <div>
                    <div className="text-xs text-on-surface-variant uppercase tracking-wide">{label}</div>
                    <div className="text-on-surface">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel?: (id: string) => void }) {
  const canCancel = onCancel && (booking.status === 'pending' || booking.status === 'confirmed');
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${STATUS_COLORS[booking.status]}`}>
              {STATUS_LABELS[booking.status]}
            </span>
            <span className="text-on-surface-variant text-xs">
              {new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="text-on-surface font-bold text-lg mb-1">{booking.service}</div>
          <div className="text-on-surface-variant text-sm mb-3">{booking.car_model}</div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-tertiary text-base">calendar_today</span>
              {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-tertiary text-base">schedule</span>
              {booking.time}
            </div>
          </div>
          <StatusProgress status={booking.status} />
        </div>
        {canCancel && (
          <button onClick={() => onCancel(booking.id)} className="text-red-400 border border-red-400/20 hover:bg-red-400/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all shrink-0">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function StatusProgress({ status }: { status: Booking['status'] }) {
  if (status === 'cancelled') return null;
  const steps: Booking['status'][] = ['pending', 'confirmed', 'in_progress', 'completed'];
  const currentIndex = steps.indexOf(status);
  return (
    <div className="mt-4 flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div className={`h-1.5 rounded-full transition-all ${i <= currentIndex ? 'bg-tertiary' : 'bg-outline-variant/30'} ${i === 0 ? 'w-8' : 'w-12'}`} />
          {i < steps.length - 1 && <div className={`w-1.5 h-1.5 rounded-full ${i < currentIndex ? 'bg-tertiary' : 'bg-outline-variant/30'}`} />}
        </div>
      ))}
      <span className="text-xs text-on-surface-variant ml-2">{STATUS_LABELS[status]}</span>
    </div>
  );
}
