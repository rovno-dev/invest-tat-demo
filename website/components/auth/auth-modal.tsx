"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  emailPasswordLogin,
  phonePasswordLogin,
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

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { login } = useAuth();
  const [method, setMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setPhone('');
      setPassword('');
      setIsRegistering(false);
    }
  }, [open]);

  const handleLogin = async () => {
    try {
      if (method === 'email') {
        emailSchema.parse(email);
      } else {
        phoneSchema.parse(phone);
      }
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
        res = await emailPasswordLogin(email, password);
      } else {
        res = await phonePasswordLogin(phone, password);
      }
      login(res);
      onOpenChange(false);
      toast.success('Logged in successfully');
    } catch (err: any) {
      if (err.message?.includes('User not found') || err.status === 404) {
        toast.error('User not found. Please register.');
        setIsRegistering(true);
      } else {
        toast.error(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      if (method === 'email') {
        emailSchema.parse(email);
      } else {
        phoneSchema.parse(phone);
      }
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
            <Button onClick={isRegistering ? handleRegister : handleLogin} disabled={loading} className="w-full">
              {loading ? <Spinner /> : isRegistering ? 'Create account' : 'Sign in'}
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
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button onClick={isRegistering ? handleRegister : handleLogin} disabled={loading} className="w-full">
              {loading ? <Spinner /> : isRegistering ? 'Create account' : 'Sign in'}
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
