'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import type { Booking } from '@/lib/types';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

interface StaffMember {
  id: string;
  name: string;
  role: string;
}

interface Props {
  bookings: Booking[];
  staff: StaffMember[];
  currentUserId: string;
  currentRole: string;
}

type FilterStatus = 'all' | Booking['status'];

export default function AdminClient({ bookings: initialBookings, staff, currentRole }: Props) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const matchStatus = filter === 'all' || b.status === filter;
    const matchSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.car_model.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    in_progress: bookings.filter(b => b.status === 'in_progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, 'bookings', id), { status, updatedAt: serverTimestamp() });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      toast.success(`Status updated to "${STATUS_LABELS[status]}"`);

      const booking = bookings.find((b) => b.id === id);
      if (booking && ['confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: booking.name, email: booking.email, service: booking.service, status }),
        }).catch(() => {});
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const assignStaff = async (id: string, staffId: string) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, 'bookings', id), { assignedTo: staffId || null, updatedAt: serverTimestamp() });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, assigned_to: staffId || null } : b)));
      toast.success('Staff assigned');
    } catch {
      toast.error('Failed to assign staff');
    } finally {
      setUpdating(null);
    }
  };

  const statCards = [
    { label: 'Total', value: stats.total, color: 'text-on-surface', icon: 'list_alt' },
    { label: 'Pending', value: stats.pending, color: 'text-yellow-400', icon: 'pending_actions' },
    { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-400', icon: 'event_available' },
    { label: 'In Progress', value: stats.in_progress, color: 'text-orange-400', icon: 'build_circle' },
    { label: 'Completed', value: stats.completed, color: 'text-green-400', icon: 'check_circle' },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="mb-10">
        <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-yellow-400 inline-block"></span>
          {currentRole === 'admin' ? 'Admin' : 'Mechanic'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-on-surface">
          Bookings <span className="text-yellow-400">Dashboard</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card p-5 rounded-2xl">
            <span className={`material-symbols-outlined text-2xl mb-2 block ${s.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-on-surface-variant uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, service, car, email..."
            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all text-sm placeholder:text-on-surface-variant/40" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as FilterStatus[]).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${filter === s ? 'bg-tertiary border-tertiary text-on-tertiary' : 'border-outline-variant/20 text-on-surface-variant hover:border-tertiary/50'}`}>
              {s === 'all' ? 'All' : s === 'in_progress' ? 'In Progress' : STATUS_LABELS[s as Booking['status']]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-tertiary/30 mb-3 block">inbox</span>
            No bookings match your filter.
          </div>
        ) : filtered.map((b) => (
          <div key={b.id} className="glass-card p-6 rounded-2xl">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${STATUS_COLORS[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                  <span className="text-on-surface-variant text-xs font-mono">#{b.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-on-surface-variant text-xs">
                    {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Customer</span><div className="text-on-surface font-semibold">{b.name}</div></div>
                  <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Service</span><div className="text-on-surface font-semibold">{b.service}</div></div>
                  <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Vehicle</span><div className="text-on-surface">{b.car_model}</div></div>
                  <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Appointment</span><div className="text-on-surface">{new Date(b.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {b.time}</div></div>
                  <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Contact</span><div className="text-on-surface text-xs">{b.email} · {b.phone}</div></div>
                  {b.notes && <div><span className="text-on-surface-variant text-xs uppercase tracking-wide">Notes</span><div className="text-on-surface-variant text-xs">{b.notes}</div></div>}
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 min-w-[200px]">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-tertiary mb-1 block">Update Status</label>
                  <select value={b.status} disabled={updating === b.id} onChange={(e) => updateStatus(b.id, e.target.value as Booking['status'])}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-tertiary transition-all disabled:opacity-50">
                    {(['pending','confirmed','in_progress','completed','cancelled'] as Booking['status'][]).map(s => (
                      <option key={s} value={s} className="bg-surface-container">{s === 'in_progress' ? 'In Progress' : STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                {staff.length > 0 && currentRole === 'admin' && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-tertiary mb-1 block">Assign To</label>
                    <select value={b.assigned_to ?? ''} disabled={updating === b.id} onChange={(e) => assignStaff(b.id, e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-tertiary transition-all disabled:opacity-50">
                      <option value="" className="bg-surface-container">Unassigned</option>
                      {staff.map((m) => (
                        <option key={m.id} value={m.id} className="bg-surface-container">{m.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                {updating === b.id && <p className="text-tertiary text-xs">Saving...</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
