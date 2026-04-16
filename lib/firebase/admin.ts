// Firebase Admin SDK (server only — API routes + Server Components)
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let _app: App | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getAdminApp(): App {
  if (_app) return _app;
  if (getApps().length > 0) { _app = getApps()[0]; return _app; }

  _app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  return _app;
}

// Lazy singleton getters — safe to export as module-level values
// because they defer initialization until first property access
export function getAdminAuth(): Auth {
  _auth ??= getAuth(getAdminApp());
  return _auth;
}

export function getAdminDb(): Firestore {
  _db ??= getFirestore(getAdminApp());
  return _db;
}

// Re-exported as property objects using Proxy so callers can use
// `adminAuth.verifySessionCookie(...)` without calling parentheses
export const adminAuth = new Proxy({} as Auth, {
  get(_t, prop: string) { return (getAdminAuth() as any)[prop]; },
  apply(_t, _ctx, args) { return (getAdminAuth() as any)(...args); },
}) as Auth;

export const adminDb = new Proxy({} as Firestore, {
  get(_t, prop: string) { return (getAdminDb() as any)[prop]; },
}) as Firestore;
