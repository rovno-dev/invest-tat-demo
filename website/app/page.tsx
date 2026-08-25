"use client";

import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { InfrastructureGrid } from "@/components/layout/invest/infrastructure-grid";
import { VideoScrollHero } from "@/components/layout/invest/video-scroll-hero";
import { ZoneSections } from "@/components/layout/invest/zone-sections";
import { OpportunitiesBlock } from "@/components/layout/invest/opportunities-block";

export default function Home() {
  return (
    <>
      <ScrollReveal>
        <VideoScrollHero />
      </ScrollReveal>

      <ScrollReveal>
        <InfrastructureGrid />
      </ScrollReveal>

      <ScrollReveal>
        <OpportunitiesBlock />
      </ScrollReveal>

      <ScrollReveal>
        <ZoneSections />
      </ScrollReveal>
    </>
  )
}
