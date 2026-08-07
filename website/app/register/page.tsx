import { Metadata } from 'next';
import { RegisterWidget } from '@/widgets/register-widget/register-widget';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join Unidoka UI to start shopping and manage your wishlist.',
};

export default function RegisterPage() {
  return <RegisterWidget />;
}
