import type { Metadata } from 'next';
import { TermsPage } from '@/components/pages/policies';

export const metadata: Metadata = { title: 'Terms & conditions' };

export default function Page() {
  return <TermsPage />;
}
