"use client"

import { Footer } from "@/components/layout/nav/footer";
import "./globals.css";
import Header from "@/components/layout/nav/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderButton from "@/components/layout/nav/order-button";

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      <div className="relative">
        <main className={cn(pathname == '/' ? "mt-0" : "mt-0", "mb-0")}>
          {children}
        </main>
        <Toaster
          position="bottom-right"
          closeButton
          gap={8}
          visibleToasts={3}
        />
        <OrderButton />
      </div>
      <Footer />
    </>
  );
}
