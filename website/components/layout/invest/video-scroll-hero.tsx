"use client";
import { useEffect, useRef, useState } from "react";
import { ScenarioCards } from "./scenario-cards";
import TatarstanFlag from "../tatarstan/tatarstan-flag";
import { TatarstanFlagText } from "../tatarstan/tatarstan-flag-text";
import { BookOpenIcon, CpuIcon } from "@phosphor-icons/react";

interface VideoScrollHeroProps {
  /** If true, scroll down moves the video backwards */
  backward?: boolean;
}

export function VideoScrollHero({ backward = true }: VideoScrollHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detect when the hero is actually on screen to avoid unnecessary scrubbing
  useEffect(() => {
    const hero = videoRef.current?.parentElement;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
    let isSeeking = false;
    let pendingTarget: number | null = null;

    const handleLoadedMetadata = () => {
      duration = video.duration || 10;
      videoReady = true;
    };

    // When a seek finishes, apply any pending target immediately
    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTarget !== null) {
        video.currentTime = pendingTarget;
        pendingTarget = null;
        isSeeking = true;
      }
    };

    const animate = () => {
      if (!videoReady || !isHeroVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      const diff = targetTime - video.currentTime;
      // Only seek if the difference is meaningful and we're not already seeking
      if (Math.abs(diff) > 0.2 && !isSeeking) {
        isSeeking = true;
        // Set the target directly; if a seek is already in progress, store as pending
        if (video.seeking) {
          pendingTarget = targetTime;
        } else {
          video.currentTime = targetTime;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      // If backward is true, invert progress so scrolling down goes backwards
      targetTime = (backward ? 1 - progress : progress) * duration;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    animationId = requestAnimationFrame(animate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHeroVisible, backward]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>
      {/* Content layers */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="-mt-[100vh] pt-[15vh] lg:pt-[18vh] pb-[5vh] flex items-center justify-center px-4">
          <div className="relative z-20 max-w-4xl text-center">
            <div className="relative mt-4 flex flex-col items-center justify-center sm:max-w-[600px] md:max-w-[800px] ">
              <TatarstanFlagText text="Tatarstan" className="w-full sm:w-[120%] h-auto" />
              <h1 className="flex items-center flex-col mt-2 text-display-2 sm:text-display-1 font-bold text-white">
                <span className="flex items-center gap-4">
                  Where<span className="flex items-center gap-2"><BookOpenIcon size={40} weight="bold" />heritage</span>{" "}
                </span>
                <span className="flex items-center gap-4">
                  Meets <span className="flex items-center gap-2"><CpuIcon size={40} weight="bold" />innovation</span>
                </span>
              </h1>
            </div>
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
