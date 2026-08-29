"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { NavLink } from "@/components/layout/nav/nav-link";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const footerNavItems = [
    { label: t("footer.investment"), href: "/investment-standard" },
    { label: t("footer.business"), href: "/business-guide" },
    { label: t("footer.map"), href: "/investment-map" },
    { label: t("footer.advantages"), href: "/advantages" },
    { label: t("footer.tatarstan"), href: "/tatarstan" },
    { label: t("footer.events"), href: "/events" },
    { label: t("footer.news"), href: "/news" },
    { label: t("footer.strategy"), href: "/strategy-2030" },
    { label: t("footer.about"), href: "/about" },
    { label: t("footer.contact"), href: "/contacts" },
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
  ];

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-lg">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-auto text-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>
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
