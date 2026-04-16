#!/usr/bin/env node
/**
 * Seed Firestore with available time slots for the next N days.
 * Run once after Firebase project setup:
 *   node scripts/seed-slots.mjs
 *
 * Requires: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in env
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

const DAYS_AHEAD = 60; // seed 60 days of slots

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);

async function seedSlots() {
  const batch = db.batch();
  const today = new Date();
  let count = 0;

  for (let i = 1; i <= DAYS_AHEAD; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays (0)
    if (date.getUTCDay() === 0) continue;

    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

    for (const time of TIMES) {
      const slotId = `${dateStr}_${time.replace(/\s/g, '_').replace(':', '-')}`;
      const ref = db.collection('slots').doc(slotId);
      batch.set(ref, { date: dateStr, time, isBooked: false }, { merge: true });
      count++;
    }
  }

  await batch.commit();
  console.log(`✓ Seeded ${count} slots for the next ${DAYS_AHEAD} days.`);
  process.exit(0);
}

seedSlots().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
