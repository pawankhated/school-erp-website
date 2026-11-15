import type { Metadata } from 'next';
import { SmartLearningPage } from '@/components/pages/content';

export const metadata: Metadata = { title: 'Smart Learning', description: 'AI chapter explanations in 22 Indian languages, approved by teachers, with doubts, quick checks and online tests.' };

export default function Page() {
  return <SmartLearningPage />;
}
