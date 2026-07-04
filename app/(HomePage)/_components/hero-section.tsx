"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GithubLogotypeMonoIcon } from "@/components/icons/logotypes/github-logotype-mono-icon";
import LogotypeIcon from "@/components/layout/logotype/logotype-icon";
import Link from "next/link";

function HeroFancy() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/niyazgim/unideka-ui-template"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch {
        setStars(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStars();
  }, []);

  const starsDisplay = loading ? "…" : stars !== null ? stars.toLocaleString() : "—";

  return (
    <Card className="relative overflow-hidden p-8 border-(--outline) bg-(--card) shadow-xl group">
      {/* Logotype background – peeking from the right edge, half hidden */}
      <div className="absolute inset-0 pointer-events-none">
        <LogotypeIcon
          width={400}
          height={400}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 animate-[breathe_8s_ease-in-out_infinite]"
          style={{ opacity: 0.05 }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div>
          <p className="text-body-2 text-(--on-bg-low)">
            *For designers
          </p>
          <p className="text-body-3 text-(--on-bg-low)">
            It has Figma Community file too. Just copy AI-optimized components and add your beautiful design!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            variant="outlined"
            size="large"
            className="w-full gap-2 group/btn relative overflow-hidden border-primary/30 hover:border-primary"
          >
            <Link
              href="https://www.figma.com/community/file/1622312904371459207"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Figma Community file</p>
            </Link>
          </Button>

          {/* <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg border border-(--outline) p-3">
              <p className="text-display-4 text-(--on-bg-high)">{starsDisplay}</p>
              <p className="text-body-6 text-(--on-bg-low)">Stars</p>
            </div>
            <div className="rounded-lg border border-(--outline) p-3">
              <p className="text-display-4 text-(--on-bg-high)">Apache 2.0</p>
              <p className="text-body-6 text-(--on-bg-low)">License</p>
            </div>
          </div> */}
        </div>

        <div className="border-t border-(--outline) pt-4">
          <p className="text-body-4 text-(--on-bg-low) text-center">
            Built with ❤️ by Niyaz Gimadiev
          </p>
        </div>
      </div>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="relative py-8 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left column */}
          <div className="flex-1 text-center md:text-left animate-reveal [animation-delay:0ms]">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-(--on-bg-high) mb-4">
              Unideka UI
            </h1>
            <p className="text-body-2 md:text-body-1 text-(--on-bg-medium) mb-8 animate-reveal [animation-delay:100ms]">
              A modern, accessible component library built with React, Tailwind CSS, and Radix UI primitives.
            </p>
            <Button
              asChild
              variant="filled"
              size="large"
              className="text-lg px-8 py-4 animate-reveal [animation-delay:200ms]"
            >
              <Link
                href="https://github.com/niyazgim/unideka-ui-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogotypeMonoIcon className="size-5" />
                GitHub Repository
              </Link>
            </Button>
          </div>

          {/* Right column */}
          <div className="flex-1 animate-reveal [animation-delay:300ms]">
            <HeroFancy />
          </div>
        </div>
      </Container>
    </section>
  );
}