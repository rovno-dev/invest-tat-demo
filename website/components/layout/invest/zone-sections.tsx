"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const zonesData = [
  {
    id: "alabuga",
    title: "SEZ Alabuga",
    subtitle: "Industrial Special Economic Zone",
    logo: (
      <Image src={'/images/logos/alabuga-logo.svg'} width={200} height={100} alt={"logo"} />
    ),
    description:
      "One of Russia's largest industrial zones with turnkey factories, zero import duties, and direct access to international logistics corridors. Ideal for manufacturing, automotive, and chemical companies. Enjoy a 0% profit tax for 7 years, no customs duties on imports, and fully subsidized infrastructure.",
    video: "/videos/alabuga.webm",
    href: "/zones/alabuga",
    stats: [
      { label: "Residents", value: "120+" },
      { label: "Investments", value: "₽250B+" },
      { label: "Jobs", value: "45,000+" },
    ],
  },
  {
    id: "innopolis",
    title: "Innopolis",
    subtitle: "IT Special Economic Zone",
    logo: (
      <Image src={'/images/logos/innopolis-logo.png'} width={200} height={100} alt={"logo"} />
    ),
    description:
      "Russia's premier IT city, home to 1,500+ resident companies and top universities. Tax-free IT licences, innovation infrastructure, and a thriving startup ecosystem await. Benefit from reduced insurance premiums, preferential rent, and up to ₽5M grants for SMEs.",
    video: "/videos/innopolis.webm",
    href: "/zones/innopolis",
    stats: [
      { label: "Residents", value: "1,500+" },
      { label: "Companies", value: "350+" },
      { label: "Specialists", value: "12,000+" },
    ],
  },
  {
    id: "himgrad",
    title: "Himgrad",
    subtitle: "Chemical Industrial Park",
    logo: (
      <Image src={'/images/logos/himgrad-logo.png'} width={200} height={100} alt={"logo"} />
    ),
    description: "Russia's first certified non-state industrial park, specializing in chemistry, polymer processing, and biotechnology. It functions as a turnkey ecosystem for small and medium-sized high-tech enterprises. Residents enjoy pre-built production facilities, a centralized raw material supply chain, and streamlined regulatory approvals.",
    video: "/videos/himgrad.webm",
    href: "/zones/himgrad",
    stats: [
      { label: "Residents", value: "300+" },
      { label: "Private Investments", value: "₽21B+" },
      { label: "Employees", value: "9,000+" },
    ],
  },
  {
    id: "Kazan It Park",
    title: "Kazan Technoparks",
    subtitle: "IT & Innovation Hub",
    logo: (
      <Image src={'/images/logos/it-park-logo.png'} width={125} height={75} alt={"logo"} />
    ),
    description: "A network of high-tech incubators, featuring the iconic Bashir Rameev IT Park, built to scale digital startups and global software enterprises. It offers state-of-the-art co-working spaces, digital sandboxes, and advanced infrastructure. Enjoy preferred corporate tax rates, direct VC pipeline access, and the collaborative energy of a top-tier tech ecosystem.",
    video: "/videos/it-park.webm",
    href: "/zones/it-park",
    stats: [
      { label: "Total Area", value: "49,300 m²" },
      { label: "Tech Workspaces", value: "3,000+" },
      { label: "Digital Startups", value: "150+" },
    ],
  },
];

export function ZoneSections() {

  return (
    <section
      id="zones-detail"
      className={`pt-24 pb-12 transition-opacity duration-1000
        }`}
    >
      <Container>
        <h2 className="text-display-2 font-semibold ">
          Key Investment Zones
        </h2>
        <p className="mt-3 max-w-2xl text-body-3 ">
          Get detailed insights into Tatarstan's flagship industrial and innovation hubs.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10">
          {zonesData.map((zone) => (
            <div
              key={zone.id}
              className="grid gap-8 lg:grid-cols-2 items-center"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                <video
                  // ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                >
                  <source src={zone.video} type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {zone.logo && (
                  <div className="absolute bottom-4 left-4 right-4">
                    {zone.logo}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-display-3 font-semibold ">{zone.title}</h3>
                <p className="text-body-3  leading-relaxed">{zone.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {zone.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-display-3 font-bold ">{stat.value}</p>
                      <p className="text-body-4  mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  size="medium"
                  shape="round"
                  variant="outlined"
                  className="w-full sm:w-fit border-white/40  hover:bg-white/10"
                  asChild
                >
                  <Link href={zone.href}>
                    Explore {zone.title}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}