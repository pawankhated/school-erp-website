import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer, Navbar } from '@/components/chrome';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', weight: ['500', '600'] });

export const metadata: Metadata = {
  title: { default: 'School ERP: calm, simple school management', template: '%s · School ERP' },
  description:
    'Admissions, attendance, fees, exams, transport, HR and AI Smart Learning in one app for principals, teachers, parents and students. Works offline. Free trial.',
  openGraph: { type: 'website', title: 'School ERP', description: 'Calm, simple school management. One app for the whole school.' },
};

export const viewport: Viewport = { themeColor: '#fbfcf9' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
