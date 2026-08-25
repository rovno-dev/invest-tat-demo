"use client";
import { useEffect, useRef } from "react";
import { ScenarioCards } from "./scenario-cards";
import { TatarstanFlag } from "@/components/layout/fancy/tatarstan-flag";

export function VideoScrollHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause initially — we'll scrub manually, not play
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

    // Single persistent RAF loop — never cancelled by scroll events
    const animate = () => {
      if (!videoReady) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const diff = targetTime - video.currentTime;

      // Only seek when the difference is significant (avoids excessive seeks)
      if (Math.abs(diff) > 0.02) {
        video.currentTime = targetTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      targetTime = progress * duration;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start the persistent animation loop
    animationId = requestAnimationFrame(animate);

    // Initial scroll call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
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
      <div className="relative z-10">
        {/* Section 1: Hero Block */}
        <section className="-mt-[100vh] pt-[15vh] lg:pt-[18vh] pb-[5vh] flex items-center justify-center px-4">
          <div className="relative z-20 max-w-4xl text-center">
            <h1 className="mt-4 text-display-1 font-bold text-white">
              Tatarstan
            </h1>
            <h1 className="mt-2 text-display-2 sm:text-display-1 font-bold text-white">
              Where Heritage{" "}<br />
              Meets Innovation
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
