'use client';

import { useEffect, useState } from 'react';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');
export const APP_URL_FALLBACK = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export interface Plan {
  code: string;
  name: string;
  tagline: string | null;
  highlights: string[];
  featured: boolean;
  pricePerStudentMonth: number;
  pricePerStudentYear: number;
  minAnnual: number;
  maxStudents: number | null;
  maxBranches: number | null;
  smartLearning: boolean;
  modules: string[];
}

export interface Site {
  brandName: string;
  tagline: string | null;
  contact: {
    supportEmail: string | null;
    supportPhone: string | null;
    whatsapp: string | null;
    salesEmail: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
  };
  company: {
    legalName: string;
    gstin: string | null;
    cin: string | null;
    grievanceName: string | null;
    grievanceEmail: string | null;
    jurisdiction: string | null;
  };
  refundDays: number;
  trialDays: number;
  signupOpen: boolean;
  appUrl: string | null;
  playStoreUrl: string | null;
  appStoreUrl: string | null;
  social: Partial<Record<'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'x', string>>;
  announcement: string | null;
  policies: { privacyExtra: string | null; termsExtra: string | null; refundExtra: string | null; updatedOn: string };
  plans: Plan[];
  modules: Record<string, { label: string; description: string }>;
  boards: string[];
}

/** Shown until the API answers (and if it is unreachable). */
export const FALLBACK: Site = {
  brandName: 'School ERP',
  tagline: null,
  contact: { supportEmail: null, supportPhone: null, whatsapp: null, salesEmail: null, address: null, city: null, state: null },
  company: { legalName: 'School ERP', gstin: null, cin: null, grievanceName: null, grievanceEmail: null, jurisdiction: null },
  refundDays: 7,
  trialDays: 30,
  signupOpen: true,
  appUrl: null,
  playStoreUrl: null,
  appStoreUrl: null,
  social: {},
  announcement: null,
  policies: { privacyExtra: null, termsExtra: null, refundExtra: null, updatedOn: new Date().toISOString().slice(0, 10) },
  plans: [
    { code: 'basic', name: 'Starter', tagline: 'Everything a school needs every day', highlights: [], featured: false, pricePerStudentMonth: 10, pricePerStudentYear: 120, minAnnual: 0, maxStudents: 1000, maxBranches: 1, smartLearning: false, modules: [] },
    { code: 'standard', name: 'Growth', tagline: 'Run the whole school office', highlights: [], featured: false, pricePerStudentMonth: 15, pricePerStudentYear: 180, minAnnual: 0, maxStudents: 3000, maxBranches: 2, smartLearning: false, modules: [] },
    { code: 'premium', name: 'Premium', tagline: 'The complete smart campus', highlights: [], featured: true, pricePerStudentMonth: 20, pricePerStudentYear: 240, minAnnual: 0, maxStudents: 10000, maxBranches: 5, smartLearning: true, modules: [] },
  ],
  modules: {},
  boards: ['CBSE', 'ICSE', 'STATE', 'NIOS', 'IB', 'IGCSE', 'CAMBRIDGE', 'US', 'UK', 'AUSTRALIA', 'OTHER'],
};

let cache: Promise<Site> | null = null;

export function loadSite(): Promise<Site> {
  cache ??= fetch(`${API_URL}/public/website`)
    .then((r) => (r.ok ? (r.json() as Promise<Site>) : FALLBACK))
    .catch(() => FALLBACK);
  return cache;
}

/** The company details and plans (Super Admin › Website). */
export function useSite(): { site: Site; loaded: boolean } {
  const [site, setSite] = useState<Site>(FALLBACK);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let alive = true;
    loadSite().then((s) => {
      if (alive) {
        setSite(s);
        setLoaded(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  return { site, loaded };
}

export const appUrl = (s: Site) => (s.appUrl ?? APP_URL_FALLBACK).replace(/\/$/, '');

export async function post<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const m = (data as { message?: string | string[] }).message;
    throw new Error(Array.isArray(m) ? m.join('\n') : (m ?? 'Something went wrong. Please try again.'));
  }
  return data as T;
}

export async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${API_URL}${path}`);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const m = (data as { message?: string }).message;
    throw new Error(m ?? 'Something went wrong. Please try again.');
  }
  return data as T;
}

export const rupees = (n: number) =>
  `₹${n.toLocaleString('en-IN', { maximumFractionDigits: n % 1 ? 2 : 0 })}`;
