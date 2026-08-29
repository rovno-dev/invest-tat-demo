"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLanguage } from "@/providers/language-provider";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t } = useLanguage();

  const navItems = useMemo(() => [
    { label: t("nav.investment_standard"), href: "/investment-standard" },
    { label: t("nav.business_guide"), href: "/business-guide" },
    { label: t("nav.investment_map"), href: "/investment-map" },
    { label: t("nav.advantages"), href: "/advantages" },
    { label: t("nav.tatarstan"), href: "/tatarstan" },
  ], [lang, t]);

  const secondaryNavItems = useMemo(() => [
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.strategy_2030"), href: "/strategy-2030" },
  ], [lang, t]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add('scrollbar-gutter-stable');
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('scrollbar-gutter-stable');
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.classList.remove('scrollbar-gutter-stable');
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      window.dispatchEvent(new Event("mobileMenuOpen"));
    } else {
      window.dispatchEvent(new Event("mobileMenuClose"));
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        isMobileMenuOpen ? "fixed inset-0 z-[100] h-screen overflow-y-auto" : "",
        "-mt-[64px] lg:-mt-[98px] transition-height duration-200 sticky top-0 z-50 bg-bg/40 backdrop-blur-lg"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="h-auto w-[8rem]! md:w-[10rem]! xl:w-[12rem]!" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
          <RequestDialog>
            <Button
              size="small"
              shape="round"
              className="hidden sm:flex bg-primary text-primary-foreground"
            >
              {t("nav.make_request")}
            </Button>
          </RequestDialog>
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
      <div className="hidden lg:flex ">
        <Container className="flex items-center justify-end gap-6 py-2">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs text-foreground/60 hover:text-foreground transition-colors",
                isActive(item.href) && "text-primary font-medium"
              )}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background h-[calc(100vh-4rem)] overflow-y-auto">
          <Container className="py-6">
            <div className="w-full">
              <nav className="flex flex-col">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex w-full items-center justify-end px-4 py-4 border-b border-border/50 transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:bg-muted/50"
                    )}
                    style={{
                      animation: "menu-item-in 0.3s ease forwards",
                      animationDelay: `${index * 40}ms`,
                      opacity: 0,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                {secondaryNavItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex w-full items-center justify-end px-4 py-3 border-b border-border/50 transition-colors text-sm text-foreground/60",
                      isActive(item.href)
                        ? "text-primary bg-primary/5 font-medium"
                        : "hover:bg-muted/50 hover:text-foreground"
                    )}
                    style={{
                      animation: "menu-item-in 0.3s ease forwards",
                      animationDelay: `${(navItems.length + index) * 40}ms`,
                      opacity: 0,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex justify-end p-4 mt-4">
                <RequestDialog>
                  <Button
                    size="large"
                    shape="round"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.make_request")}
                  </Button>
                </RequestDialog>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
