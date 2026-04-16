'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase/client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use': return 'An account with this email already exists.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/weak-password': return 'Password must be at least 6 characters.';
    case 'auth/network-request-failed': return 'Network error. Please check your connection.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    default: return 'Sign up failed. Please try again.';
  }
}

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      // 1. Create Firebase Auth user
      const credential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // 2. Write profile to Firestore
      await setDoc(doc(db, 'profiles', credential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        role: 'customer',
        createdAt: serverTimestamp(),
      });

      // 3. Get ID token and create server session cookie (auto sign-in)
      const idToken = await credential.user.getIdToken();
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        // Session creation failed — fall back to login page
        toast.success('Account created! Please sign in.');
        router.push('/auth/login');
        return;
      }

      toast.success('Welcome to M7 Tire Shop!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(mapAuthError(err?.code ?? ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-tertiary">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="John Smith"
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-tertiary">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-tertiary">
          Phone <span className="normal-case font-normal text-on-surface-variant">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="(555) 123-4567"
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-tertiary">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-tertiary">
            Confirm
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}
