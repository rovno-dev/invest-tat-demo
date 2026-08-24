"use client";
import { useEffect, useRef } from "react";
import { ScenarioCards } from "./scenario-cards";
import { InfrastructureGrid } from "./infrastructure-grid";
import { ZoneSections } from "./zone-sections";

export function VideoScrollHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = 10;

    const handleLoadedMetadata = () => {
      duration = video.duration || 10;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleScroll = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        video.currentTime = progress * duration;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

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
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content layers */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Section 1: Hero Block */}
        <section className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              Invest Tatarstan
            </p>
            <h1 className="mt-4 text-display-1 font-bold text-white">
              Tatarstan: Where Heritage Meets Innovation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-2 text-white/85">
              The Republic of Tatarstan is a top-tier investment destination in Russia, blending centuries of history with cutting-edge industrial infrastructure. The Kazan Kremlin stands as our symbol — a fortress of reliability and progress.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#scenarios"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Explore Scenarios
              </a>
              <a
                href="#infrastructure"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                View Infrastructure
              </a>
            </div>
          </div>
        </section>
        <ScenarioCards />
      </div>
    </main>
  );
}