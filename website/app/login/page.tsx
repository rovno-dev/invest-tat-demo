import { Metadata } from 'next';
import {LoginWidget} from "@/widgets/login-widget/loginWidget"

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Unidoka UI account to manage orders and wishlist.',
};

export default function LoginPage() {
  return <LoginWidget />;
}
