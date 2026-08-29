"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Users,
  BuildingIcon,
  Rocket,
  TrendUp,
  Globe,
  WifiHighIcon,
  Code,
  GraduationCap,
  CheckCircle,
  Lightning,
} from "@phosphor-icons/react";
import { RequestDialog } from "@/components/layout/request/request-dialog";

const features = [
  {
    icon: Code,
    title: "IT Company Paradise",
    description:
      "Tax-free IT licenses, innovation infrastructure, and a thriving startup ecosystem. Reduced insurance premiums and preferential rent for residents.",
    points: [
      "0% income tax for IT companies",
      "Reduced insurance premiums (7.6%)",
      "Preferential rent for office space",
    ],
  },
  {
    icon: GraduationCap,
    title: "Top Universities",
    description:
      "Home to Innopolis University — one of Russia's leading IT universities, with a steady stream of talented graduates.",
  },
  {
    icon: Rocket,
    title: "Startup Ecosystem",
    description:
      "Access to venture capital, incubators, and grants. Up to ₽5M for SMEs to accelerate your growth.",
  },
];

const facilities = [
  {
    icon: BuildingIcon,
    title: "Technopark",
    desc: "Modern office spaces with fiber internet and meeting rooms",
  },
  {
    icon: WifiHighIcon,
    title: "Smart City",
    desc: "Fully digital city infrastructure, IoT-enabled",
  },
  {
    icon: Users,
    title: "Community",
    desc: "12,000+ IT specialists living and working here",
  },
  {
    icon: Globe,
    title: "Global Connections",
    desc: "International partnerships and events",
  },
  {
    icon: Lightning,
    title: "Grants",
    desc: "Up to ₽5M grants for SMEs",
  },
  {
    icon: Cpu,
    title: "Tech Parks",
    desc: "R&D facilities and prototyping labs",
  },
];

export default function InnopolisPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/innopolis.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <Container className="relative z-10 text-center">
          <Badge variant="glass-static" className="mb-6 text-sm tracking-wider uppercase">

            IT Special Economic Zone
          </Badge>
          <h1 className="text-display-1 text-white font-bold leading-[1.05] max-w-3xl mx-auto">
            Innopolis
          </h1>
          <p className="mt-4 text-body-2 text-white/80 max-w-xl mx-auto">
            Russia's premier IT city — home to 1,500+ resident companies,
            top universities, and a thriving startup ecosystem.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="tonal-card" size="large" shape="round" asChild>
              <Link href="#features">
                Explore Benefits
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
            <RequestDialog>
              <Button
                variant="text"
                size="large"
                shape="round"
                className="text-white border border-white/30 hover:bg-white/10"
              >
                Request Info
              </Button>
            </RequestDialog>
          </div>
        </Container>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* ── STATS — BENTO ─────────────────────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12">
            <h2 className="text-display-2 font-semibold">Key Indicators</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">The numbers behind the success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <BuildingIcon className="size-14 opacity-80" weight="duotone" />
              <p className="mt-8 text-5xl font-bold leading-none">1,500+</p>
              <p className="mt-3 text-sm opacity-80">Residents</p>
            </div>
            <div className="md:col-span-7 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <Users className="size-12 text-(--primary)" weight="duotone" />
              <p className="text-5xl font-bold mt-6">350+</p>
              <p className="text-sm text-(--on-bg-low) mt-1">Companies</p>
            </div>
            <div className="md:col-span-4 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <GraduationCap className="size-10 text-(--primary)" weight="duotone" />
              <p className="text-4xl font-bold mt-4">12,000+</p>
              <p className="text-sm text-(--on-bg-low) mt-1">Specialists</p>
            </div>
            <div className="md:col-span-8 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <Rocket className="size-10 text-(--primary)" weight="duotone" />
              <p className="text-4xl font-bold mt-4">₽5M</p>
              <p className="text-sm text-(--on-bg-low) mt-1">Max Grant for SMEs</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FEATURES — ZIGZAG ─────────────────── */}
      <section id="features" className="py-20 bg-(--card)">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-display-2 font-semibold">Why Innopolis?</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">Built for the future</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 rounded-2xl bg-(--bg) p-8 border border-(--outline)">
              <Code className="size-12 text-(--primary)" weight="duotone" />
              <h3 className="mt-6 text-heading-2 font-semibold">IT Company Paradise</h3>
              <p className="mt-3 text-body-3 text-(--on-bg-medium)">
                Tax-free IT licenses, innovation infrastructure, and a thriving
                startup ecosystem. Reduced insurance premiums and preferential
                rent for residents.
              </p>
              <ul className="mt-6 space-y-3">
                {(features && features[0] && features[0].points) && (
                  <ul className="mt-6 space-y-3">
                    {features[0].points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle className="size-5 text-(--primary) shrink-0" />
                        <span className="text-body-4 text-(--on-bg-medium)">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
            <div className="md:col-span-5 rounded-2xl bg-(--bg) p-8 border border-(--outline) flex flex-col justify-between">
              <GraduationCap className="size-12 text-(--primary)" weight="duotone" />
              <div>
                <h3 className="mt-6 text-heading-3 font-semibold">Top Universities</h3>
                <p className="mt-3 text-body-4 text-(--on-bg-medium)">
                  Home to Innopolis University — one of Russia's leading IT
                  universities, with a steady stream of talented graduates.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FACILITIES — CARD GRID ────────────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-display-2 font-semibold">Facilities</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">World-class infrastructure</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((item, index) => (
              <Card
                key={item.title}
                className="group p-6 hover:border-(--primary)/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl  text-(--primary)">
                    <item.icon className="size-6" weight="duotone" />
                  </div>
                  <h4 className="text-heading-5 font-medium">{item.title}</h4>
                </div>
                <p className="mt-4 text-body-4 text-(--on-bg-medium)">{item.desc}</p>
                <div className="mt-4 h-1 w-full bg-(--outline) rounded-full overflow-hidden">
                  <div
                    className="h-full bg-(--primary) transition-all duration-500 group-hover:w-full"
                    style={{ width: `${(index + 1) * 15}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-display-2 font-semibold">Join Innopolis</h2>
            <p className="mt-2 text-body-3 opacity-80">Build your IT company in Russia's tech capital</p>
            <RequestDialog>
              <Button variant="tonal-card" size="large" shape="round" className="mt-8">
                Submit Request
                <ArrowRight size={16} weight="bold" />
              </Button>
            </RequestDialog>
          </div>
        </Container>
      </section>
    </main>
  );
}
