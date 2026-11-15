import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/content';

export const metadata: Metadata = { title: 'Contact', description: 'Talk to us about your school, a demo or support.' };

export default function Page() {
  return <ContactPage />;
}
