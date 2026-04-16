import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
            </div>
            <span className="font-black text-xl tracking-tight text-on-surface">M7 <span className="text-tertiary">TIRE SHOP</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Sign In</h1>
          <p className="text-on-surface-variant text-sm">Access your bookings and dashboard</p>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <Suspense fallback={<div className="text-center text-on-surface-variant py-4">Loading...</div>}>
            <LoginForm />
          </Suspense>
          <p className="text-center text-on-surface-variant text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-tertiary font-semibold hover:underline">Create one</Link>
          </p>
        </div>
        <p className="text-center mt-6">
          <Link href="/" className="text-on-surface-variant text-sm hover:text-tertiary transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
