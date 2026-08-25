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
    logo: "/images/logos/alabuga.svg",
    description:
      "One of Russia's largest industrial zones with turnkey factories, zero import duties, and direct access to international logistics corridors. Ideal for manufacturing, automotive, and chemical companies. Enjoy a 0% profit tax for 7 years, no customs duties on imports, and fully subsidized infrastructure.",
    video: "/videos/alabuga.webm",
    href: "/alabuga",
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
    logo: "/images/logos/innopolis.png",
    description:
      "Russia's premier IT city, home to 1,500+ resident companies and top universities. Tax-free IT licences, innovation infrastructure, and a thriving startup ecosystem await. Benefit from reduced insurance premiums, preferential rent, and up to ₽5M grants for SMEs.",
    video: "/videos/innopolis.webm",
    href: "/innopolis",
    stats: [
      { label: "Residents", value: "1,500+" },
      { label: "Companies", value: "350+" },
      { label: "Specialists", value: "12,000+" },
    ],
  },
];

export function ZoneSections() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="zones-detail"
      ref={sectionRef}
      className={`py-12 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"
        }`}
    >
      <Container>
        <h2 className="text-display-2 font-semibold text-white">Explore Leading Zones</h2>
        <p className="mt-3 max-w-2xl text-body-3 text-white/75">
          Get detailed insights into Tatarstan's flagship industrial and innovation hubs.
        </p>

        <div className="mt-12 space-y-16">
          {zonesData.map((zone) => (
            <div
              key={zone.id}
              className="group grid gap-8 lg:grid-cols-2 items-center"
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
                <div className="absolute bottom-4 left-4 right-4">
                  <Image src={zone.logo} width={200} height={100} alt={"logo"} />
                  {/* <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-sm">
                    {zone.subtitle}
                  </span> */}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-display-3 font-semibold text-white">{zone.title}</h3>
                <p className="text-body-3 text-white/75 leading-relaxed">{zone.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {zone.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-display-3 font-bold text-white">{stat.value}</p>
                      <p className="text-body-4 text-white/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  size="medium"
                  shape="round"
                  variant="outlined"
                  className="w-full sm:w-fit border-white/40 text-white hover:bg-white/10"
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