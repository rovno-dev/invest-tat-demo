"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  BuildingIcon,
  MapPin,
  Users,
  TrendUp,
  Shield,
  Cpu,
  GasCanIcon,
  Truck,
  Globe,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";

const features = [
  {
    icon: Factory,
    title: "Turnkey Factories",
    description:
      "Pre-built production facilities ready for installation. Just plug in and start manufacturing. All engineering infrastructure is already connected.",
    points: [
      "Areas from 5,000 to 50,000 m²",
      "Electricity, water, gas — already connected",
      "Office and warehouse spaces on-site",
    ],
  },
  {
    icon: Shield,
    title: "Zero Import Duties",
    description:
      "Import raw materials and equipment without customs duties. Save up to 20% on operational costs.",
  },
  {
    icon: TrendUp,
    title: "0% Profit Tax",
    description:
      "Enjoy a 0% profit tax for 7 years, then reduced rates for the next 3 years.",
  },
];

const infrastructure = [
  {
    icon: Cpu,
    title: "Power Supply",
    desc: "40 MW capacity, redundant lines",
  },
  {
    icon: GasCanIcon,
    title: "Gas Supply",
    desc: "Direct connections to trunk networks",
  },
  {
    icon: Truck,
    title: "Logistics",
    desc: "Railway branches and international highways",
  },
  {
    icon: Globe,
    title: "Connectivity",
    desc: "Fiber optic internet, 5G coverage",
  },
  {
    icon: MapPin,
    title: "Customs",
    desc: "Customs terminal on-site",
  },
  {
    icon: BuildingIcon,
    title: "Administrative",
    desc: "One-stop shop for permits",
  },
];

export default function AlabugaPage() {
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
          <source src="/videos/alabuga.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        {/* Decorative grid overlay */}
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:60px_60px]" />
        <Container className="relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <Badge variant="default" className="text-sm tracking-wider uppercase">
              Industrial Resident
            </Badge>
          </div>
          <h1 className="text-display-1 text-white font-bold leading-[1.05] max-w-3xl mx-auto">
            SEZ Alabuga
          </h1>
          <p className="mt-4 text-body-2 text-white/80 max-w-xl mx-auto">
            A territory of advanced development for industrial enterprises.
            Tax incentives, ready-made infrastructure, and access to international
            logistics corridors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="tonal-card" size="large" shape="round" asChild>
              <Link href="#features">
                Explore Benefits
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
            <Button
              variant="text"
              size="large"
              shape="round"
              asChild
              className="text-white border border-white/30 hover:bg-white/10"
            >
              <Link href="/order">Request Info</Link>
            </Button>
          </div>
        </Container>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* ── STATS — ASYMMETRIC BENTO GRID ─────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12">
            <h2 className="text-display-2 font-semibold">Key Indicators</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">
              Numbers that speak for themselves
            </p>
          </div>
          {/* 12-col grid with varied spans */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large card - Residents (col-span-7) */}
            <div className="md:col-span-7 relative overflow-hidden rounded-2xl bg-gradient-to-br from-(--primary) to-(--primary)/60 p-8 text-(--on-primary)">
              <div className="absolute -top-8 -right-8 size-40 rounded-full bg-white/10 blur-2xl" />
              <BuildingIcon className="size-14 opacity-80" weight="duotone" />
              <p className="mt-8 text-5xl font-bold leading-none">120+</p>
              <p className="mt-3 text-sm opacity-80">Residents</p>
            </div>
            {/* Investments (col-span-5) */}
            <div className="md:col-span-5 rounded-2xl bg-(--card) p-8 border border-(--outline) flex flex-col justify-between">
              <TrendUp className="size-10 text-(--primary)" weight="duotone" />
              <div>
                <p className="text-4xl font-bold mt-4">₽250B+</p>
                <p className="text-sm text-(--on-bg-low) mt-1">Investments</p>
              </div>
            </div>
            {/* Jobs (col-span-4) */}
            <div className="md:col-span-4 rounded-2xl bg-(--card) p-8 border border-(--outline) flex flex-col justify-between">
              <Users className="size-10 text-(--primary)" weight="duotone" />
              <div>
                <p className="text-4xl font-bold mt-4">45,000+</p>
                <p className="text-sm text-(--on-bg-low) mt-1">Jobs</p>
              </div>
            </div>
            {/* Description (col-span-8) */}
            <div className="md:col-span-8 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <h3 className="text-heading-3 font-medium">Why Alabuga?</h3>
              <p className="mt-3 text-body-3 text-(--on-bg-medium) leading-relaxed">
                One of Russia's largest industrial zones with turnkey factories,
                zero import duties, and direct access to international logistics
                corridors. Ideal for manufacturing, automotive, and chemical
                companies.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FEATURES — ZIGZAG ASYMMETRIC ─────── */}
      <section id="features" className="py-20 bg-(--card)">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-display-2 font-semibold">Key Benefits</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">
              Everything you need to scale your production
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1 - Large (col-span-7) */}
            <div className="md:col-span-7 rounded-2xl bg-(--bg) p-8 border border-(--outline)">
              <Factory className="size-12 text-(--primary)" weight="duotone" />
              <h3 className="mt-6 text-heading-2 font-semibold">Turnkey Factories</h3>
              <p className="mt-3 text-body-3 text-(--on-bg-medium) leading-relaxed">
                Modern production facilities ready for installation — just set up
                your equipment and start manufacturing. All engineering
                infrastructure is already connected.
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
            {/* Feature 2 (col-span-5) */}
            <div className="md:col-span-5 rounded-2xl bg-(--bg) p-8 border border-(--outline) flex flex-col justify-between">
              <Shield className="size-12 text-(--primary)" weight="duotone" />
              <div>
                <h3 className="mt-6 text-heading-3 font-semibold">Zero Import Duties</h3>
                <p className="mt-3 text-body-4 text-(--on-bg-medium) leading-relaxed">
                  Import raw materials and equipment without customs duties.
                  Save up to 20% on operational costs.
                </p>
              </div>
            </div>
            {/* Feature 3 (col-span-5) */}
            <div className="md:col-span-5 rounded-2xl bg-(--bg) p-8 border border-(--outline) flex flex-col justify-between">
              <TrendUp className="size-12 text-(--primary)" weight="duotone" />
              <div>
                <h3 className="mt-6 text-heading-3 font-semibold">0% Profit Tax</h3>
                <p className="mt-3 text-body-4 text-(--on-bg-medium) leading-relaxed">
                  Enjoy a 0% profit tax for 7 years, then reduced rates for the
                  next 3 years.
                </p>
              </div>
            </div>
            {/* Feature 4 - Large (col-span-7) */}
            <div className="md:col-span-7 rounded-2xl bg-(--primary) p-8 text-(--on-primary)">
              <MapPin className="size-12 opacity-80" weight="duotone" />
              <h3 className="mt-6 text-heading-2 font-semibold">Strategic Location</h3>
              <p className="mt-3 text-body-3 opacity-90 leading-relaxed">
                Direct access to major highways, railways, and international
                logistics corridors. Your goods reach any market in Europe or
                Asia in days, not weeks.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── INFRASTRUCTURE — CARD GRID ───────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-display-2 font-semibold">Infrastructure</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">
              Everything needed for a fast launch
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infrastructure.map((item, index) => (
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
                {/* Decorative accent */}
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
      <section className="py-20 bg-gradient-to-br from-(--primary) to-(--primary)/80">
        <Container>
          <div className="text-center text-(--on-primary)">
            <h2 className="text-display-2 font-semibold">Ready to Start?</h2>
            <p className="mt-2 text-body-3 opacity-80">
              Get a consultation on locating your production in SEZ Alabuga
            </p>
            <Button
              variant="tonal-card"
              size="large"
              shape="round"
              asChild
              className="mt-8"
            >
              <Link href="/order">
                Submit Request
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
