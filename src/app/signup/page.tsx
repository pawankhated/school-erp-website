import type { Metadata } from 'next';
import { SignupPage } from '@/components/pages/signup';

export const metadata: Metadata = {
  title: 'Start your free trial',
  description: 'Sign up your school. After a quick approval, every feature of your plan is free during the trial.',
};

export default function Page() {
  return <SignupPage />;
}
