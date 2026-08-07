import { Metadata } from 'next';
import { RegisterWidget } from '@/components/ui/register-widget';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join Unidoka UI to start shopping and manage your wishlist.',
};

export default function RegisterPage() {
  return <RegisterWidget />;
}
