"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logotype from "./logotype/logotype";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Header() {
  const router = useRouter();
  const [signInOpen, setSignInOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="w-full h-[56px] flex items-center border-b border-black/[0.06] bg-white/[0.65] px-4 md:px-6 shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-[32px] dark:border-white/[0.08] dark:bg-black/[0.65] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0px_rgba(255,255,255,0.15)]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Left: Unideka Logotype */}
          <Link href="/" className="flex items-center gap-2">
            <Logotype className="h-8 w-auto" />
          </Link>

          {/* Right: Navigation & Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="text"
              size="small"
              className="rounded-full px-4 text-sm font-medium text-neutral-700 hover:bg-white/20 dark:text-neutral-300 dark:hover:bg-white/10"
              onClick={() => router.push("/products")}
            >
              Products
            </Button>

            <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="filled"
                  size="small"
                  className="rounded-full px-5"
                >
                  Sign in
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign in</DialogTitle>
                  <DialogDescription>
                    Enter your email and password to access your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outlined" onClick={() => setSignInOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="filled" onClick={() => setSignInOpen(false)}>
                    Sign in
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
