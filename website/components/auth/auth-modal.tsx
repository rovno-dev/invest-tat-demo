"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  emailPasswordLogin,
  phoneLogin,
  verifyOTP,
  registerEmail,
  registerPhone,
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
import { PhoneInput } from '@/components/ui/phone-input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { z } from 'zod';

type AuthMethod = 'email' | 'phone';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const isEmailValid = email.trim() !== '' && password.trim() !== '';
  const isPhoneValid = phone.trim() !== '' && (!otpSent || otp.trim() !== '');
  const isValid = method === 'email' ? isEmailValid : isPhoneValid;

  useEffect(() => {
    if (open) {
      setEmail('');
      setPhone('');
      setPassword('');
      setOtp('');
      setOtpSent(false);
      setIsRegistering(false);
      setLoading(false);
    }
  }, [open]);

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
      onOpenChange(false);
      toast.success('Logged in successfully');
    } catch (err: any) {
      // Parse error response
      let message = err.message || 'Login failed';
      try {
        const data = JSON.parse(err.message);
        if (data.detail) message = data.detail;
        else if (data.msg) message = data.msg;
      } catch {
        // if not JSON, use as is
      }
      if (message.includes('User not found') || message.includes('404')) {
        toast.error('User not found. Please register.');
        setIsRegistering(true);
      } else {
        toast.error(message);
      }
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
      if (message.includes('429')) {
        message = 'Too many requests. Please wait a moment.';
      }
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
      onOpenChange(false);
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

  const handleRegister = async () => {
    try {
      if (method === 'email') {
        emailSchema.parse(email);
        passwordSchema.parse(password);
      } else {
        phoneSchema.parse(phone);
        passwordSchema.parse(password);
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
        res = await registerEmail(email, password);
      } else {
        res = await registerPhone(phone, password);
      }
      login(res);
      onOpenChange(false);
      toast.success('Account created and logged in');
    } catch (err: any) {
      let message = err.message || 'Registration failed';
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

  const handleSubmit = () => {
    if (isRegistering) {
      handleRegister();
    } else if (method === 'email') {
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
    if (isRegistering) return 'Create account';
    if (method === 'email') return 'Sign in';
    return otpSent ? 'Verify OTP' : 'Send OTP';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>{isRegistering ? 'Create account' : 'Sign in'}</DialogTitle>
        </DialogHeader>

        <Tabs value={method} onValueChange={(v) => setMethod(v as AuthMethod)} className="flex flex-col">
          <TabsList variant={'line'} className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">SMS</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
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
            <Button onClick={handleSubmit} disabled={!isValid || loading} className="w-full">
              {buttonLabel()}
            </Button>
            {!isRegistering && (
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Register
                </button>
              </div>
            )}
            {isRegistering && (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
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
            <Button onClick={handleSubmit} disabled={!isValid || loading} className="w-full">
              {buttonLabel()}
            </Button>
            {!isRegistering && (
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(true)}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Register
                </button>
              </div>
            )}
            {isRegistering && (
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
