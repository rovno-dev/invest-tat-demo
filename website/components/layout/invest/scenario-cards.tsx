"use client";

import { useState, useEffect, useRef } from "react";
import { Factory, Briefcase, Globe, ArrowRight, FireSimpleIcon } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

interface Scenario {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: string;
  cta: string;
}

const scenarios: Scenario[] = [
  {
    id: "industrialists",
    icon: <Factory size={32} />,
    title: "Industrialists",
    description: "Scale your manufacturing with ready-made industrial parks and tax incentives.",
    metrics: "0% profit tax for 7 years",
    cta: "View Free Land Plots",
  },
  {
    id: "smes",
    icon: <Briefcase size={32} />,
    title: "SMEs",
    description: "Access micro-credit programs and co-working infrastructure across the region.",
    metrics: "Up to ₽5M grant support",
    cta: "Explore SME Programs",
  },
  {
    id: "international",
    icon: <Globe size={32} />,
    title: "International Partners",
    description: "Enter the Russian market through fully-licenced SEZ infrastructure and customs.",
    metrics: "0% customs duties on imports",
    cta: "Contact Invest Support",
  },
  {
    id: "startups",
    icon: <FireSimpleIcon size={32} />,
    title: "Startups",
    description: "Start your business in our business incubator. Show your ideas.",
    metrics: "Up to 10m on start",
    cta: "Contact Startup Support",
  },
];

export function ScenarioCards() {
  const [active, setActive] = useState<string | null>(null);
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
      id="scenarios"
      ref={sectionRef}
      className={`z-20 pb-[15vh] pt-12 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"
        }`}
    >
      <Container>
        <h2 className="text-display-3 font-semibold text-white">
          Your Investment Path
        </h2>
        <p className="mt-3 max-w-2xl text-body-3 text-white/75">
          Choose your profile to see how Tatarstan's incentives apply to you.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario, index) => (
            <div
              key={scenario.id}
              onMouseEnter={() => setActive(scenario.id)}
              onMouseLeave={() => setActive(null)}
              className={`group rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md ${active === scenario.id
                ? "border-white/40 bg-white/15 shadow-2xl translate-y-[-4px]"
                : "border-white/15 bg-white/5"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-white">{scenario.icon}</div>
              <h3 className="mt-4 text-heading-3 font-semibold text-white">
                {scenario.title}
              </h3>
              <p className="mt-2 text-body-4 text-white/70">
                {scenario.description}
              </p>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-white/60">
                  Key Metric
                </p>
                <p className="mt-1 text-body-3 font-medium text-white">
                  {scenario.metrics}
                </p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sm text-white underline-offset-4 hover:underline">
                {scenario.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
