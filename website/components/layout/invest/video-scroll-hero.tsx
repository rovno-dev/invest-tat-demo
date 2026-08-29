"use client";
import { useEffect, useRef } from "react";
import { ScenarioCards } from "./scenario-cards";
import { TatarstanFlagText } from "../pixel-animations/tatarstan/tatarstan-flag-text";
import { CpuIcon, BookOpenIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/providers/language-provider";

interface VideoScrollHeroProps {
  /** If true, scrolling down moves the video backwards */
  backward?: boolean;
}

export function VideoScrollHero({ backward = false }: VideoScrollHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();

  // Original, stable scrubbing logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.preload = "auto";
    video.defaultMuted = true;
    let duration = 0;
    let targetTime = 0;
    let videoReady = false;
    let animationId: number | null = null;
    const handleLoadedMetadata = () => {
      duration = video.duration || 10;
      videoReady = true;
    };
    const animate = () => {
      if (!videoReady) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      const diff = targetTime - video.currentTime;
      if (Math.abs(diff) > 0.02) {
        video.currentTime = targetTime;
      }
      animationId = requestAnimationFrame(animate);
    };
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      targetTime = (backward ? 1 - progress : progress) * duration;
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationId = requestAnimationFrame(animate);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [backward]);

  // Translated content
  const heroTitle = lang === "ru" ? (
    <>
      <div className="mb-2 sm:mb-4">
        <span className="mr-0 sm:mr-3">Где</span><br className="sm:hidden" />
        <span className="inline-flex items-center gap-2 vertical-middle">
          <BookOpenIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
          <span>наследие</span>
        </span>
      </div>
      <div>
        <span className="mr-0 sm:mr-3">Встречает</span>
        <span className="inline-flex items-center gap-2 vertical-middle">
          <CpuIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
          <span>инновации</span>
        </span>
      </div>
    </>
  ) : (
    <>
      <div className="mb-2 sm:mb-4">
        <span className="mr-0 sm:mr-3">Where</span>
        <span className="inline-flex items-center gap-2 vertical-middle">
          <BookOpenIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
          <span>heritage</span>
        </span>
      </div>
      <div>
        <span className="mr-0 sm:mr-3">Meets</span>
        <span className="inline-flex items-center gap-2 vertical-middle">
          <CpuIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
          <span>innovation</span>
        </span>
      </div>
    </>
  );

  const exploreText = lang === "ru" ? "Сценарии инвестирования" : "Explore Scenarios";

  return (
    <main className="relative">
      {/* Sticky video background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>
      {/* Content layers */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="-mt-[100vh] pt-[15vh] lg:pt-[18vh] pb-[5vh] flex items-center justify-center">
          <Container className="relative z-20 max-w-4xl text-center">
            {/* Flag container – now referenced via ref */}
            <div className="relative mt-4 flex flex-col items-center justify-center sm:max-w-[600px] md:max-w-[800px] ">
              {/* <TatarstanFlagText text="Tatarstan" className="w-full sm:w-[120%] h-auto" /> */}
              <h1 className="text-white text-display-2 sm:text-display-1 lg:text-[5rem] font-bold mt-2 max-w-2xl leading-tight">
                {heroTitle}
              </h1>
            </div>
            {/* TODO: add 4 infographic cards */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                variant={'tonal-card'}
                asChild
                className="w-full sm:w-fit"
              >
                <Link
                  href="#scenarios"
                >
                  {exploreText}
                </Link>
              </Button>
            </div>
          </Container>
        </section>
        <ScenarioCards />
      </div>
    </main >
  );
}
