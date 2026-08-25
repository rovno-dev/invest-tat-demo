"use client";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@phosphor-icons/react";
import TatarstanFlag from "../tatarstan/tatarstan-flag";

const opportunities = [
  {
    number: "1",
    title: "Best investment climate in Russia",
    description: "The highest rate and quality of investment projects implementation",
  },
  {
    number: "2",
    title: "Extensive resource potential",
    description: "Natural, water, land and transport resources",
  },
  {
    number: "3",
    title: 'The "Strategy 2030" program',
    description: "Extensive investor support",
  },
  {
    number: "4",
    title: "Investor's club",
    description: "Join a community of successful investors",
  },
];

export function OpportunitiesBlock() {
  return (
    <section id="opportunities" className="py-12">
      <Container>
        <h2 className="text-display-2 font-semibold">Our Advantages</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((item) => (
            <Link
              key={item.number}
              href="/order"
              className="group relative flex flex-col border border-border rounded-lg p-6 bg-card transition-all hover:shadow-md hover:-translate-y-1"
            >
              {/* Small animated flag in top-right corner */}
              <div className="absolute top-4 right-4 w-10 h-7 overflow-hidden rounded-sm opacity-80 group-hover:opacity-100">
                <TatarstanFlag
                  numOfColumns={20}
                  staggeredDelay={20}
                  className="w-full h-full"
                />
              </div>

              <span className="text-6xl font-bold text-muted-foreground/40 leading-none select-none">
                {item.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                {item.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                Explore
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
