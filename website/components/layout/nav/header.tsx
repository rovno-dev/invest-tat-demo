"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Request button - desktop/tablet */}
          <Button
            size="medium"
            shape="round"
            className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/order">Make a Request</Link>
          </Button>

          {/* Burger menu - mobile only */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="text"
                size="icon-medium"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6!" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full p-0 backdrop-blur-lg"
              style={{ height: '100dvh', borderBottom: 'none' }}
              showCloseButton={false}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col px-6 pt-4 pb-6">
                {/* Top bar with logo and close */}
                <div className="flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo className="h-8 w-auto text-white" />
                  </Link>
                  <Button
                    variant="text"
                    size="icon-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="size-6!" />
                  </Button>
                </div>
                {/* Nav links */}
                <nav className="flex flex-col gap-1 mt-8 overflow-y-auto">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-(--on-bg-high)"
                      // className={cn(
                      //   "flex items-center justify-between py-4 text-heading-3 font-medium border-b border-border/50 transition-all duration-300",
                      //   isActive(item.href)
                      //     ? ""
                      //     : ""
                      // )}
                      style={{
                        animation: "menu-item-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                        animationDelay: `${index * 60}ms`,
                        opacity: 0,
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                {/* Request button - aligned to the right side */}
                <div className="mt-auto flex justify-end pt-8">
                  <Button
                    size="large"
                    shape="round"
                    className="bg-primary text-primary-foreground hover:bg-primary/80"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/order">Make a Request</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
