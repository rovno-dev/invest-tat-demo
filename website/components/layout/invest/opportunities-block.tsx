"use client";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@phosphor-icons/react";
import TatarstanFlag from "../pixel-animations/tatarstan/tatarstan-flag";
import { useLanguage } from "@/providers/language-provider";

export function OpportunitiesBlock() {
  const { lang } = useLanguage();

  const opportunities = [
    {
      number: "1",
      title: lang === "ru" ? "Лучший инвестиционный климат в России" : "Best investment climate in Russia",
      description: lang === "ru" ? "Самый высокий уровень и качество реализации инвестиционных проектов" : "The highest rate and quality of investment projects implementation",
      illustration: <TatarstanFlag numOfColumns={10} staggeredDelay={80} className="w-full h-full" />,
    },
    {
      number: "2",
      title: lang === "ru" ? "Обширный ресурсный потенциал" : "Extensive resource potential",
      description: lang === "ru" ? "Природные, водные, земельные и транспортные ресурсы" : "Natural, water, land and transport resources",
      illustration: <TatarstanFlag numOfColumns={10} staggeredDelay={80} className="w-full h-full" />,
    },
    {
      number: "3",
      title: lang === "ru" ? "Программа «Стратегия 2030»" : 'The "Strategy 2030" program',
      description: lang === "ru" ? "Обширная поддержка инвесторов" : "Extensive investor support",
      illustration: <TatarstanFlag numOfColumns={10} staggeredDelay={80} className="w-full h-full" />,
    },
    {
      number: "4",
      title: lang === "ru" ? "Инвестиционный клуб" : "Investor's club",
      description: lang === "ru" ? "Присоединяйтесь к сообществу успешных инвесторов" : "Join a community of successful investors",
      illustration: <TatarstanFlag numOfColumns={10} staggeredDelay={80} className="w-full h-full" />,
    },
  ];

  return (
    <section id="opportunities" className="py-12">
      <Container>
        <h2 className="text-display-2 font-semibold">
          {lang === "ru" ? "Наши преимущества" : "Our Advantages"}
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((item) => (
            <Link
              key={item.number}
              href="/order"
              className="group relative flex flex-col border border-border rounded-lg bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 aspect-[16/10] w-28 overflow-hidden opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300">
                {item.illustration}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-6xl font-bold text-muted-foreground/30 leading-none select-none group-hover:text-primary/50 transition-colors">
                  {item.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{item.description}</p>
                <div className="mt-6 flex items-center gap-2 text-heading-5 text-primary">
                  {lang === "ru" ? "Изучить" : "Explore"}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
