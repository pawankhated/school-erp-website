import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/pages/policies';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function Page() {
  return <PrivacyPage />;
}
