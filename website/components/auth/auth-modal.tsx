"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  emailLogin, phoneLogin, verifyOTP,
  registerEmail, registerPhone,
} from '@/lib/api/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { z } from 'zod';

type AuthMethod = 'email' | 'phone';
type Step = 'input' | 'otp' | 'register';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const otpSchema = z.string().length(6, 'OTP must be 6 digits');

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { login } = useAuth();
  const [method, setMethod] = useState<AuthMethod>('email');
  const [step, setStep] = useState<Step>('input');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (open) {
      setStep('input');
      setEmail('');
      setPhone('');
      setPassword('');
      setOtp('');
      setUserExists(null);
    }
  }, [open]);

  const handleSendCode = async () => {
    const identifier = method === 'email' ? email : phone;
    try {
      if (method === 'email') {
        emailSchema.parse(identifier);
      } else {
        phoneSchema.parse(identifier);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      let res;
      if (method === 'email') {
        res = await emailLogin(email);
      } else {
        res = await phoneLogin(phone);
      }
      setUserExists(res.user_exists);
      setStep('otp');
      toast.success(`Code sent to ${method === 'email' ? email : phone}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
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
      const identifier = method === 'email' ? email : phone;
      const res = await verifyOTP(identifier, otp);
      login(res);
      onOpenChange(false);
      toast.success('Logged in successfully');
    } catch (err: any) {
      toast.error(err.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      let res;
      if (method === 'email') {
        res = await registerEmail(email, password);
      } else {
        res = await registerPhone(phone, password);
      }
      login(res);
      onOpenChange(false);
      toast.success('Account created and logged in');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>

        <Tabs value={method} onValueChange={(v) => setMethod(v as AuthMethod)} className="flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">SMS</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            {step === 'input' && (
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
                <Button onClick={handleSendCode} disabled={loading} className="w-full">
                  {loading ? <Spinner /> : 'Send code'}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('register')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp-email">Verification code</Label>
                  <Input
                    id="otp-email"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Code sent to {email}
                  </p>
                </div>
                <Button onClick={handleVerifyOTP} disabled={loading || otp.length < 6} className="w-full">
                  {loading ? <Spinner /> : 'Verify'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('input')}
                  disabled={loading}
                  className="w-full text-xs"
                >
                  Resend code
                </Button>
              </div>
            )}

            {step === 'register' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleRegister} disabled={loading || !password} className="w-full">
                  {loading ? <Spinner /> : 'Create account'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('input')}
                  disabled={loading}
                  className="w-full text-xs"
                >
                  Back to login
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            {step === 'input' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendCode} disabled={loading} className="w-full">
                  {loading ? <Spinner /> : 'Send code'}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('register')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp-phone">Verification code</Label>
                  <Input
                    id="otp-phone"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Code sent to {phone}
                  </p>
                </div>
                <Button onClick={handleVerifyOTP} disabled={loading || otp.length < 6} className="w-full">
                  {loading ? <Spinner /> : 'Verify'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('input')}
                  disabled={loading}
                  className="w-full text-xs"
                >
                  Resend code
                </Button>
              </div>
            )}

            {step === 'register' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone number</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password-phone">Password</Label>
                  <Input
                    id="register-password-phone"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleRegister} disabled={loading || !password} className="w-full">
                  {loading ? <Spinner /> : 'Create account'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('input')}
                  disabled={loading}
                  className="w-full text-xs"
                >
                  Back to login
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
