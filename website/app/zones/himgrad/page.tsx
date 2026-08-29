"use client";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Flask, Factory, Building, TrendUp, Users, Shield, Atom, Truck, CheckCircle, Microscope, Recycle } from "@phosphor-icons/react";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { useLanguage } from "@/providers/language-provider";
import { zoneTranslations } from "@/utils/constants/zone-translations";

export default function HimgradPage() {
  const { lang } = useLanguage();
  const t = zoneTranslations["himgrad"]?.[lang] ?? zoneTranslations["himgrad"]?.en ?? {};
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/videos/himgrad.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <Container className="relative z-10 text-center">
          <Badge variant="glass-static" className="mb-6 text-sm tracking-wider uppercase">
            {t.heroSubtitle}
          </Badge>
          <h1 className="text-display-1 text-white font-bold leading-[1.05] max-w-3xl mx-auto">{t.heroTitle}</h1>
          <p className="mt-4 text-body-2 text-white/80 max-w-xl mx-auto">{t.heroDescription}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="tonal-card" size="large" shape="round" asChild>
              <Link href="#features">
                {t.heroButton}
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
            <RequestDialog>
              <Button variant="text" size="large" shape="round" className="text-white border border-white/30 hover:bg-white/10">
                {t.heroRequest}
              </Button>
            </RequestDialog>
          </div>
        </Container>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase">{t.scroll}</div>
      </section>

      {/* ── STATS — GRID ──────────────────────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12">
            <h2 className="text-display-2 font-semibold">{t.statsTitle}</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">{t.statsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-(--card) p-6 border border-(--outline)">
              <div className="flex size-10 items-center justify-center rounded-xl">
                <Building className="size-5 text-(--primary)" weight="duotone" />
              </div>
              <p className="mt-6 text-4xl font-bold">300+</p>
              <p className="mt-1 text-sm text-(--on-bg-low)">{lang === "ru" ? "Резиденты" : "Residents"}</p>
            </div>
            <div className="rounded-2xl bg-(--card) p-6 border border-(--outline)">
              <div className="flex size-10 items-center justify-center rounded-xl">
                <TrendUp className="size-5 text-(--primary)" weight="duotone" />
              </div>
              <p className="mt-6 text-4xl font-bold">₽21B+</p>
              <p className="mt-1 text-sm text-(--on-bg-low)">{lang === "ru" ? "Частные инвестиции" : "Private Investments"}</p>
            </div>
            <div className="rounded-2xl bg-(--card) p-6 border border-(--outline)">
              <div className="flex size-10 items-center justify-center rounded-xl">
                <Users className="size-5 text-(--primary)" weight="duotone" />
              </div>
              <p className="mt-6 text-4xl font-bold">9,000+</p>
              <p className="mt-1 text-sm text-(--on-bg-low)">{lang === "ru" ? "Сотрудники" : "Employees"}</p>
            </div>
            <div className="rounded-2xl bg-(--card) p-6 border border-(--outline)">
              <div className="flex size-10 items-center justify-center rounded-xl">
                <Recycle className="size-5 text-(--primary)" weight="duotone" />
              </div>
              <p className="mt-6 text-4xl font-bold">120+</p>
              <p className="mt-1 text-sm text-(--on-bg-low)">{lang === "ru" ? "Технологии" : "Technologies"}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FEATURES — ASYMMETRIC ─────────────── */}
      <section id="features" className="py-20 bg-(--card)">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-display-2 font-semibold">{t.featuresTitle}</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">{t.featuresSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 rounded-2xl bg-(--bg) p-8 border border-(--outline)">
              <Flask className="size-12 text-(--primary)" weight="duotone" />
              <h3 className="mt-6 text-heading-2 font-semibold">{t.feature1Title}</h3>
              <p className="mt-3 text-body-3 text-(--on-bg-medium) leading-relaxed">{t.feature1Description}</p>
              <ul className="mt-6 space-y-3">
                {t.feature1Points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-(--primary) shrink-0" />
                    <span className="text-body-4 text-(--on-bg-medium)">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="rounded-2xl bg-(--bg) p-6 border border-(--outline)">
                <Shield className="size-8 text-(--primary)" weight="duotone" />
                <h4 className="mt-4 text-heading-4 font-medium">{t.feature2Title}</h4>
                <p className="mt-2 text-body-4 text-(--on-bg-medium)">{t.feature2Description}</p>
              </div>
              <div className="rounded-2xl bg-(--bg) p-6 border border-(--outline)">
                <Atom className="size-8 text-(--primary)" weight="duotone" />
                <h4 className="mt-4 text-heading-4 font-medium">{t.feature3Title}</h4>
                <p className="mt-2 text-body-4 text-(--on-bg-medium)">{t.feature3Description}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FACILITIES — CARD GRID ────────────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-display-2 font-semibold">{t.infraTitle}</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">{t.infraSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.infraItems.map((item, index) => (
              <Card key={item.title} className="group p-6 hover:border-(--primary)/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl text-(--primary)">
                    {index === 0 && <Microscope className="size-6" weight="duotone" />}
                    {index === 1 && <Truck className="size-6" weight="duotone" />}
                    {index === 2 && <Factory className="size-6" weight="duotone" />}
                    {index === 3 && <Shield className="size-6" weight="duotone" />}
                    {index === 4 && <Atom className="size-6" weight="duotone" />}
                    {index === 5 && <Users className="size-6" weight="duotone" />}
                  </div>
                  <h4 className="text-heading-5 font-medium">{item.title}</h4>
                </div>
                <p className="mt-4 text-body-4 text-(--on-bg-medium)">{item.desc}</p>
                <div className="mt-4 h-1 w-full bg-(--outline) rounded-full overflow-hidden">
                  <div className="h-full bg-(--primary) transition-all duration-500 group-hover:w-full" style={{ width: `${(index + 1) * 15}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-display-2 font-semibold">{t.ctaTitle}</h2>
            <p className="mt-2 text-body-3 opacity-80">{t.ctaSubtitle}</p>
            <RequestDialog>
              <Button variant="tonal-card" size="large" shape="round" className="mt-8">
                {t.ctaButton}
                <ArrowRight size={16} weight="bold" />
              </Button>
            </RequestDialog>
          </div>
        </Container>
      </section>
    </main>
  );
}
