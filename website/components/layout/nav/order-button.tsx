// OrderButton.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path based on your setup
import { cn } from '@/lib/utils';
import { RequestDialog } from '../request/request-dialog';

export default function OrderButton() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Listen to custom events fired by the Header component
    const handleMenuOpen = () => setIsMobileMenuOpen(true);
    const handleMenuClose = () => setIsMobileMenuOpen(false);

    window.addEventListener('mobileMenuOpen', handleMenuOpen);
    window.addEventListener('mobileMenuClose', handleMenuClose);

    return () => {
      window.removeEventListener('mobileMenuOpen', handleMenuOpen);
      window.removeEventListener('mobileMenuClose', handleMenuClose);
    };
  }, []);

  return (
    <div
      className={cn(
        "sm:hidden z-50 sticky flex justify-end bottom-4 right-0 px-4 transition-opacity duration-200",
        isMobileMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <RequestDialog>
        <Button
          size="large"
          shape="round"
          className="w-full max-w-sm shadow-lg"
        >
          Make a Request
        </Button>
      </RequestDialog>
    </div>
  );
}
