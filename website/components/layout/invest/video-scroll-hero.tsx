"use client";
import { useEffect, useRef } from "react";
import { ScenarioCards } from "./scenario-cards";
import TatarstanFlag from "../pixel-animations/tatarstan/tatarstan-flag";
import { TatarstanFlagText } from "../pixel-animations/tatarstan/tatarstan-flag-text";
import { CpuIcon, BookOpenIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface VideoScrollHeroProps {
  /** If true, scrolling down moves the video backwards */
  backward?: boolean;
}

export function VideoScrollHero({ backward = false }: VideoScrollHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      // Invert progress if backward is enabled
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
      console.log(duration);
    };
  }, [backward]); // Re‑initialize when backward changes

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
                {/* Line 1 */}
                <div className="mb-2 sm:mb-4">
                  <span className="mr-0 sm:mr-3">Where</span>
                  <span className="inline-flex items-center gap-2 vertical-middle">
                    <BookOpenIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
                    <span>heritage</span>
                  </span>
                </div>

                {/* Line 2 */}
                <div>
                  <span className="mr-0 sm:mr-3">Meets</span>
                  <span className="inline-flex items-center gap-2 vertical-middle">
                    <CpuIcon className="w-[1em] h-[1em] text-display-3 sm:text-display-2 lg:text-[4rem]" weight="bold" />
                    <span>innovation</span>
                  </span>
                </div>
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
                  Explore Scenarios
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
