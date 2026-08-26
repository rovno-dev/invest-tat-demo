"use client";
import { useEffect, useRef, useState } from "react";
import {
  Building,
  GearSix,
  Flask,
  Cpu,
  ArrowRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

const zones = [
  {
    name: "Innopolis",
    type: "Robotics, IT & AI",
    icon: <Building size={40} />,
    description:
      "Russia's largest tech hub, with tax-free IT licences and university partnerships.",
    stat: "1,500+ resident companies",
  },
  {
    name: "SEZ Alabuga",
    type: "Tech industrial",
    icon: <GearSix size={40} />,
    description:
      "High-scale industrial production with turnkey factories and zero import duties.",
    stat: "₽250B+ attracted investments",
  },
  {
    name: "Khimgrad",
    type: "Chemical industrial",
    icon: <Flask size={40} />,
    description:
      "Advanced materials and polymer production with R&D support and pilot plants.",
    stat: "60+ chemical enterprises",
  },
  {
    name: "Kazan Technopark",
    type: "IT & Innovation Hub",
    icon: <Cpu size={40} />,
    description:
      "A modern innovation hub with prototyping labs, accelerators, and venture funding access.",
    stat: "200+ resident startups",
  },
];

export function InfrastructureGrid() {
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
      id="infrastructure"
      ref={sectionRef}
      className={`py-12 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"
        }`}
    >
      <Container>
        <h2 className="text-display-3 font-semibold ">
          Key Investment Zones
        </h2>
        <p className="mt-3 max-w-2xl text-body-3 ">
          Explore the Republic's flagship industrial and innovation hubs.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zones.map((zone, index) => (
            <div
              key={zone.name}
              className="group min-w-0 rounded-2xl border dark:border-white/15 border-outline bg-(--card-glass) p-6 backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/10 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="">{zone.icon}</div>
                <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider ">
                  {zone.type}
                </span>
              </div>
              <h3 className="mt-4 text-heading-3 font-semibold ">
                {zone.name}
              </h3>
              <p className="mt-4 text-body-3  leading-relaxed">
                {zone.description}
              </p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-body-2 font-semibold ">{zone.stat}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm  underline-offset-4 hover:underline">
                  Explore {zone.name}{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}