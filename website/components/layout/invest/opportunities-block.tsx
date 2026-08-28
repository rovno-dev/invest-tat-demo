"use client";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@phosphor-icons/react";
import TatarstanFlag from "../tatarstan/tatarstan-flag";
import { ClimateIllustration } from "./climate-illustration";
import { ResourceIllustration } from "./resource-illustration";
import { InvestorClubIllustration } from "./investor-club-illustration";

const opportunities = [
  {
    number: "1",
    title: "Best investment climate in Russia",
    description: "The highest rate and quality of investment projects implementation",
    illustration: <ClimateIllustration className="w-full h-full" />,
  },
  {
    number: "2",
    title: "Extensive resource potential",
    description: "Natural, water, land and transport resources",
    illustration: <ResourceIllustration className="w-full h-full" />,
  },
  {
    number: "3",
    title: 'The "Strategy 2030" program',
    description: "Extensive investor support",
    illustration: <TatarstanFlag numOfColumns={10} staggeredDelay={80} className="w-full h-full" />,
  },
  {
    number: "4",
    title: "Investor's club",
    description: "Join a community of successful investors",
    illustration: <InvestorClubIllustration className="w-full h-full" />,
  },
];

export function OpportunitiesBlock() {
  return (
    <section id="opportunities" className="py-12">
      <Container>
        <h2 className="text-display-2 font-semibold">Our Advantages</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((item) => (
            <Link
              key={item.number}
              href="/order"
              className="group relative flex flex-col border border-border rounded-lg bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
            >
              {/* Illustration - flush top-right, no padding */}
              <div className="absolute top-0 right-0 aspect-[16/10] w-18 overflow-hidden opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300">
                {item.illustration}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-6xl font-bold text-muted-foreground/30 leading-none select-none group-hover:text-primary/50 transition-colors">
                  {item.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-heading-5 text-primary">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
