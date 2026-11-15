import type { Metadata } from 'next';
import { PricingPage } from '@/components/pages/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple per-student pricing: Starter, Growth and Premium plans with a free trial. Parent, teacher and student apps included.',
};

export default function Page() {
  return <PricingPage />;
}
