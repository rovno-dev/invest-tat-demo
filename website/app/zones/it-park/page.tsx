"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { useLanguage } from "@/providers/language-provider";
import {
  ArrowRight,
  Building,
  Users,
  Globe,
  Rocket,
  Code,
  WifiHighIcon,
  TrendUp,
  CheckCircle,
  Briefcase,
  Lightbulb,
} from "@phosphor-icons/react";

const features = [
  {
    icon: Rocket,
    title: "Startup Incubator",
    description:
      "A network of high-tech incubators, featuring the iconic Bashir Rameev IT Park, built to scale digital startups and global software enterprises.",
    points: [
      "State-of-the-art co-working spaces",
      "Digital sandboxes for prototyping",
      "Advanced infrastructure and VC pipeline",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Support",
    description:
      "Preferred corporate tax rates, direct VC pipeline access, and the collaborative energy of a top-tier tech ecosystem.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Lab",
    description:
      "Access to cutting-edge R&D labs, testing environments, and industry partnerships.",
  },
];

const stats = [
  { icon: Building, value: "49,300 m²", label: "Total Area" },
  { icon: Users, value: "3,000+", label: "Tech Workspaces" },
  { icon: Rocket, value: "150+", label: "Digital Startups" },
];

const facilities = [
  { icon: Code, title: "Co-Working", desc: "Modern flexible workspaces with fiber internet" },
  { icon: WifiHighIcon, title: "Digital Sandbox", desc: "Testing environments for software products" },
  { icon: Globe, title: "Global Network", desc: "International partnerships and events" },
  { icon: TrendUp, title: "VC Access", desc: "Direct connection to venture capital funds" },
  { icon: Building, title: "Office Spaces", desc: "Equipped offices from 20 to 500 m²" },
  { icon: Users, title: "Community", desc: "150+ startups and tech enthusiasts" },
];

export default function ItParkPage() {
  const { lang } = useLanguage();
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
          <source src="/videos/it-park.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <Container className="relative z-10 text-center">
          <Badge variant="glass-static" className="mb-6 text-sm tracking-wider uppercase">
            IT & Innovation Hub
          </Badge>
          <h1 className="text-display-1 text-white font-bold leading-[1.05] max-w-3xl mx-auto">
            Kazan Technoparks
          </h1>
          <p className="mt-4 text-body-2 text-white/80 max-w-xl mx-auto">
            A network of high-tech incubators designed to scale digital startups
            and global software enterprises. The iconic Bashir Rameev IT Park.
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

      {/* ── STATS — ASYMMETRIC ────────────────── */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12">
            <h2 className="text-display-2 font-semibold">Key Indicators</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">Where tech talent meets opportunity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 p-8 text-white">
              <Building className="size-14 opacity-80" weight="duotone" />
              <p className="mt-8 text-5xl font-bold leading-none">49,300 m²</p>
              <p className="mt-3 text-sm opacity-80">Total Area</p>
            </div>
            <div className="md:col-span-4 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <Users className="size-10 text-(--primary)" weight="duotone" />
              <p className="text-4xl font-bold mt-4">3,000+</p>
              <p className="text-sm text-(--on-bg-low) mt-1">Tech Workspaces</p>
            </div>
            <div className="md:col-span-12 rounded-2xl bg-(--card) p-8 border border-(--outline)">
              <Rocket className="size-10 text-(--primary)" weight="duotone" />
              <p className="text-4xl font-bold mt-4">150+</p>
              <p className="text-sm text-(--on-bg-low) mt-1">Digital Startups</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FEATURES — ZIGZAG ─────────────────── */}
      <section id="features" className="py-20 bg-(--card)">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-display-2 font-semibold">Why Kazan Technoparks?</h2>
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">Scale your digital business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 rounded-2xl bg-(--bg) p-8 border border-(--outline)">
              <Rocket className="size-12 text-(--primary)" weight="duotone" />
              <h3 className="mt-6 text-heading-2 font-semibold">Startup Incubator</h3>
              <p className="mt-3 text-body-3 text-(--on-bg-medium) leading-relaxed">
                A network of high-tech incubators, featuring the iconic Bashir
                Rameev IT Park, built to scale digital startups and global
                software enterprises.
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
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl bg-(--bg) p-6 border border-(--outline)">
                <Briefcase className="size-8 text-(--primary)" weight="duotone" />
                <h4 className="mt-4 text-heading-4 font-medium">Business Support</h4>
                <p className="mt-2 text-body-4 text-(--on-bg-medium)">Preferred corporate tax rates, direct VC pipeline access</p>
              </div>
              <div className="rounded-2xl bg-(--bg) p-6 border border-(--outline)">
                <Lightbulb className="size-8 text-(--primary)" weight="duotone" />
                <h4 className="mt-4 text-heading-4 font-medium">Innovation Lab</h4>
                <p className="mt-2 text-body-4 text-(--on-bg-medium)">Cutting-edge R&D labs and testing environments</p>
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
            <p className="mt-2 text-body-3 text-(--on-bg-medium)">State-of-the-art technology infrastructure</p>
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
      <section className="py-20 bg-gradient-to-br from-violet-600 to-violet-800">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-display-2 font-semibold">Start Your Journey</h2>
            <p className="mt-2 text-body-3 opacity-80">Launch your startup from Kazan's tech hub</p>
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
