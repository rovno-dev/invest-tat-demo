"use client"

import { Footer } from "@/components/layout/nav/footer";
import "./globals.css";
import Header from "@/components/layout/nav/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <div className="z-50 sticky flex justify-end bottom-4 right-0 px-4">
          <Button
            size="large"
            shape="round"
            className="w-full"
            asChild
          >
            <Link href="/order">Make a Request</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
