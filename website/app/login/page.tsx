"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  emailPasswordLogin,
  phoneLogin,
  verifyOTP,
} from '@/lib/api/auth';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { z } from 'zod';
import Link from 'next/link';

type AuthMethod = 'email' | 'phone';

const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const otpSchema = z.string().length(6, 'OTP must be 6 digits');

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // Initialize method from URL or default to 'email'
  const [method, setMethod] = useState<AuthMethod>(
    (searchParams.get('method') as AuthMethod) || 'email'
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = email.trim() !== '' && password.trim() !== '';
  const isPhoneValid = phone.trim() !== '' && (!otpSent || otp.trim() !== '');
  const isValid = method === 'email' ? isEmailValid : isPhoneValid;

  // Sync URL with method state, but only when method changes and the URL doesn't match
  useEffect(() => {
    const currentMethod = searchParams.get('method') || 'email';
    if (currentMethod !== method) {
      const params = new URLSearchParams(searchParams);
      params.set('method', method);
      router.replace(`/login?${params.toString()}`, { scroll: false });
    }
  }, [method, searchParams, router]);

  const handleEmailLogin = async () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await emailPasswordLogin(email, password);
      login(res);
      router.push('/');
      toast.success('Logged in successfully');
    } catch (err: any) {
      let message = err.message || 'Login failed';
      try {
        const data = JSON.parse(err.message);
        if (data.detail) message = data.detail;
        else if (data.msg) message = data.msg;
      } catch {}
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLoginSendOTP = async () => {
    try {
      phoneSchema.parse(phone);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      await phoneLogin(phone);
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    } catch (err: any) {
      let message = err.message || 'Failed to send OTP';
      try {
        const data = JSON.parse(err.message);
        if (data.detail) message = data.detail;
      } catch {}
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLoginVerify = async () => {
    try {
      otpSchema.parse(otp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await verifyOTP(phone, otp);
      login(res);
      router.push('/');
      toast.success('Logged in successfully');
    } catch (err: any) {
      let message = err.message || 'OTP verification failed';
      try {
        const data = JSON.parse(err.message);
        if (data.detail) message = data.detail;
      } catch {}
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (method === 'email') {
      handleEmailLogin();
    } else {
      if (!otpSent) {
        handlePhoneLoginSendOTP();
      } else {
        handlePhoneLoginVerify();
      }
    }
  };

  const buttonLabel = () => {
    if (loading) return <Spinner />;
    if (method === 'email') return 'Sign in';
    return otpSent ? 'Verify OTP' : 'Send OTP';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Container className="max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="text-display-3 font-heading mb-6">Sign in</h1>

          <div className="flex border-b border-border mb-6">
            <button
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                method === 'email'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMethod('email')}
            >
              Email
            </button>
            <button
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                method === 'phone'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMethod('phone')}
            >
              SMS
            </button>
          </div>

          {method === 'email' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {method === 'phone' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  country="RU"
                  className="w-full"
                />
              </div>
              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full mt-6"
            size="large"
          >
            {buttonLabel()}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
