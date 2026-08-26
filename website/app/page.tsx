"use client";

import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { InvestorPath } from "@/components/layout/invest/investor-path";
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
        <ZoneSections />
      </ScrollReveal>

      <ScrollReveal>
        <OpportunitiesBlock />
      </ScrollReveal>

      <ScrollReveal>
        <InvestorPath />
      </ScrollReveal>
    </>
  )
}
