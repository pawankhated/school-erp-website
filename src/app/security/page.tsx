import type { Metadata } from 'next';
import { SecurityPage } from '@/components/pages/content';

export const metadata: Metadata = { title: 'Security & privacy', description: 'How we keep school data safe: isolation, encryption, audit logs and consent-based support.' };

export default function Page() {
  return <SecurityPage />;
}
