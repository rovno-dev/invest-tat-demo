"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const navItems = [
  { label: "Investment standard", href: "/investment-standard" },
  { label: "Business Guide", href: "/business-guide" },
  { label: "Investment map", href: "/investment-map" },
  { label: "Our advantages", href: "/advantages" },
  { label: "Tatarstan", href: "/tatarstan" },
];
const secondaryNavItems = [
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
    <header
      className={cn(isMobileMenuOpen ? "h-screen" : "", "transition-height duration-200 sticky top-0 z-50 bg-bg/10 backdrop-blur-lg")}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-auto w-[8rem]! xl:w-[12rem]!" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop navigation */}
          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
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
            size="small"
            shape="round"
            className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/order">Make a Request</Link>
          </Button>

          {/* Burger menu - mobile only (toggle, no slide) */}
          <Button
            variant="text"
            size="icon-medium"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-6!" /> : <Menu className="size-6!" />}
          </Button>
        </div>
      </Container>

      {/* Mobile dropdown - simple conditional render (no slide / no fixed header bug) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background shadow-lg h-full">
          <Container className="py-4 h-full w-full">
            <div className="overflow-hidden sm:max-w-md">
              <nav className="flex flex-col">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-end px-4 py-4 border-b border-border/50 transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:bg-muted/50"
                    )}
                    style={{ animation: "menu-item-in 0.3s ease forwards", animationDelay: `${index * 40}ms`, opacity: 0 }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex justify-end p-4 mt-4">
                <Button
                  size="large"
                  shape="round"
                  className="w-full"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/order">Make a Request</Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
