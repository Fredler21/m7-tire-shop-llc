'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase/client';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/invalid-email': return 'No account found with that email address.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed': return 'Network error. Please check your connection.';
    default: return 'Failed to send reset email. Please try again.';
  }
}

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success('Reset link sent — check your inbox.');
    } catch (err: any) {
      toast.error(mapAuthError(err?.code ?? ''));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto">
          <span
            className="material-symbols-outlined text-tertiary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            mark_email_read
          </span>
        </div>
        <p className="text-on-surface font-semibold">Check your email</p>
        <p className="text-on-surface-variant text-sm">
          We sent a password reset link to <span className="text-on-surface font-medium">{email}</span>.
          It may take a few minutes to arrive.
        </p>
        <button
          onClick={() => { setSent(false); setEmail(''); }}
          className="text-tertiary text-sm font-semibold hover:underline"
        >
          Send to a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-tertiary">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send Reset Link'}
      </button>
    </form>
  );
}
