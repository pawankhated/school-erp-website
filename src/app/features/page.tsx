import type { Metadata } from 'next';
import { FeaturesPage } from '@/components/pages/content';

export const metadata: Metadata = { title: 'Features', description: 'Admissions, attendance, fees, exams, transport, HR, payroll, library, canteen, hostel and health in one school app.' };

export default function Page() {
  return <FeaturesPage />;
}
