import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/content';

export const metadata: Metadata = { title: 'About us', description: 'Calm, simple school management built with schools.' };

export default function Page() {
  return <AboutPage />;
}
