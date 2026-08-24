"use client";

import { InfrastructureGrid } from "@/components/layout/invest/infrastructure-grid";
import { VideoScrollHero } from "@/components/layout/invest/video-scroll-hero";
import { ZoneSections } from "@/components/layout/invest/zone-sections";

export default function Home() {
  return (
    <>
      <VideoScrollHero />

      <InfrastructureGrid />

      <ZoneSections />
    </>
  )
}
