import type { Metadata } from 'next';
import { RefundPage } from '@/components/pages/policies';

export const metadata: Metadata = { title: 'Refund & cancellation' };

export default function Page() {
  return <RefundPage />;
}
