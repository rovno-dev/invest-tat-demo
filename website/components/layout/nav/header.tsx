"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const navItems = [
  { label: "Investment standard", href: "/investment-standard" },
  { label: "Business Guide", href: "/business-guide" },
  { label: "Investment map", href: "/investment-map" },
  { label: "Our advantages", href: "/advantages" },
  { label: "Tatarstan", href: "/tatarstan" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Strategy 2030", href: "/strategy-2030" },
];

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto text-white" />
        </Link>

        <div className="flex gap-3 items-center justify-between">
          {/* Desktop navigation */}
          <nav className="hidden items-center gap-3 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md text-body-5 transition-colors",
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            size="medium"
            shape="round"
            className="bg-primary text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/order">Make a Request</Link>
          </Button>


          {/* Mobile burger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="text"
                  size="icon-small"
                  className="text-foreground hover:bg-muted/50"
                  aria-label="Open menu"
                >
                  <Menu strokeWidth={1.5} className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full! max-w-none! bg-background text-foreground border-border/10">
                <SheetHeader className="border-b border-border/10 pb-4">
                  <SheetTitle className="text-foreground">
                    <Logo className="h-6 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4 animate-in fade-in duration-300">
                  {navItems.map((item, index) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
                          "opacity-0 translate-y-2 animate-in slide-in-from-bottom-2 fade-in"
                        )}
                        style={{ animationDelay: `${index * 60 + 150}ms`, animationFillMode: "both" }}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="px-4 pb-4 mt-auto">
                  <Button
                    size="medium"
                    shape="round"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
                    asChild
                  >
                    <a href="/order">Make a Request</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
