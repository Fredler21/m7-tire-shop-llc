'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Invalid email or password.';
    case 'auth/user-disabled': return 'This account has been disabled.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed': return 'Network error. Please check your connection.';
    default: return 'Sign in failed. Please try again.';
  }
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) throw new Error('session');
      toast.success('Welcome back!');
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message === 'session' ? 'Session error. Please try again.' : mapAuthError(err?.code ?? ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-tertiary">
          Email
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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-tertiary">
            Password
          </label>
          <Link
            href="/auth/reset-password"
            className="text-xs text-on-surface-variant hover:text-tertiary transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/40"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-tertiary/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
