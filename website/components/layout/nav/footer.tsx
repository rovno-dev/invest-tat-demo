"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { NavLink } from "@/components/layout/nav/nav-link";
import { cn } from "@/lib/utils";

const footerNavItems = [
  { label: "Investment standard", href: "/investment-standard" },
  { label: "Business Guide", href: "/business-guide" },
  { label: "Investment map", href: "/investment-map" },
  { label: "Our advantages", href: "/advantages" },
  { label: "Tatarstan", href: "/tatarstan" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Strategy 2030", href: "/strategy-2030" },
  // Additional items
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contacts" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-lg">
      <Container className="py-12">
        {/* Top row: Logo + ThemeSwitcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-auto text-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Navigation grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {footerNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © {year} Rovno.dev's Invest Tatarstan site demo. Just enjoy.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-primary">♥</span> in{" "}
            <a
              href="https://rovno.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Rovno.dev
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
