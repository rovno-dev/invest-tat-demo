"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyboardArrowRightIcon } from "@/components/icons";
import { GithubLogotypeMonoIcon } from "@/components/icons/logotypes/github-logotype-mono-icon";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left column */}
          <div className="space-y-6 animate-reveal [animation-delay:0ms]">
            <Badge
              variant="glass-static"
              size="chip-small"
              className="uppercase tracking-[0.2em] text-[10px] px-4 py-1.5 rounded-full w-fit"
            >
              New Collection
            </Badge>

            <h1 className="text-display-1 md:text-display-0 font-heading font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-(--primary) to-(--brand-4) bg-clip-text text-transparent">
                Unidoka
              </span>
              <span className="text-(--on-bg-high)"> Merch</span>
            </h1>

            <p className="text-body-2 md:text-body-1 text-(--on-bg-medium) max-w-lg leading-relaxed">
              Premium gear for builders, thinkers, and creators. Hoodies, mugs, notebooks - designed for the AI era.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                asChild
                variant="filled"
                size="large"
                shape={'round'}
              >
                <Link
                  href="#"
                  className="flex items-center gap-2"
                >
                  <span>Shop now</span>
                  <KeyboardArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="text"
                size="large"
                shape={'round'}
              >
                <Link
                  href="https://github.com/niyazgim/unidoka-ui-ui-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <GithubLogotypeMonoIcon className="size-4" />
                  <span className="text-xs">GitHub</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2 text-body-5 text-(--on-bg-low)">
              <span>✦ Free shipping</span>
              <span className="w-px h-4 bg-(--outline)" />
              <span>✦ 100% organic cotton</span>
              <span className="w-px h-4 bg-(--outline)" />
              <span>✦ AI‑designed</span>
            </div>
          </div>

          {/* Right column - floating product image */}
          <div className="animate-reveal [animation-delay:200ms]">
            <div className="relative w-full aspect-[4/3] animate-float">
              <Image
                src="/_static/products/hoodie.png"
                alt="Unidoka hoodie"
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
