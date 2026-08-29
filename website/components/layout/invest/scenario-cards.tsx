"use client";
import { useState, useEffect, useRef } from "react";
import { Factory, Briefcase, Globe, ArrowRight, FireSimpleIcon } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/providers/language-provider";

interface Scenario {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: string;
  cta: string;
}

export function ScenarioCards() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<string | null>(null);

  const scenarios: Scenario[] = [
    {
      id: "industrialists",
      icon: <Factory size={32} color="white" />,
      title: lang === "ru" ? "Промышленники" : "Industrialists",
      description: lang === "ru"
        ? "Масштабируйте производство с готовыми индустриальными парками и налоговыми льготами."
        : "Scale your manufacturing with ready-made industrial parks and tax incentives.",
      metrics: lang === "ru" ? "0% налог на прибыль 7 лет" : "0% profit tax for 7 years",
      cta: lang === "ru" ? "Смотреть земельные участки" : "View Free Land Plots",
    },
    {
      id: "smes",
      icon: <Briefcase size={32} color="white" />,
      title: lang === "ru" ? "Малый и средний бизнес" : "SMEs",
      description: lang === "ru"
        ? "Доступ к микрокредитным программам и коворкинг-инфраструктуре по всему региону."
        : "Access micro-credit programs and co-working infrastructure across the region.",
      metrics: lang === "ru" ? "Гранты до ₽5 млн" : "Up to ₽5M grant support",
      cta: lang === "ru" ? "Изучить программы для МСП" : "Explore SME Programs",
    },
    {
      id: "international",
      icon: <Globe size={32} color="white" />,
      title: lang === "ru" ? "Международные партнеры" : "International Partners",
      description: lang === "ru"
        ? "Войдите на российский рынок через полностью лицензированную инфраструктуру ОЭЗ и таможню."
        : "Enter the Russian market through fully-licenced SEZ infrastructure and customs.",
      metrics: lang === "ru" ? "0% таможенных пошлин" : "0% customs duties on imports",
      cta: lang === "ru" ? "Связаться с поддержкой" : "Contact Invest Support",
    },
    {
      id: "startups",
      icon: <FireSimpleIcon size={32} color="white" />,
      title: lang === "ru" ? "Стартапы" : "Startups",
      description: lang === "ru"
        ? "Поймай своего единорога. Отличные возможности, проверенные и результативные стартапы с энергичными основателями."
        : "Grab your unicorn. Great opportunities, verified and resulting startups with energized founders.",
      metrics: lang === "ru" ? "До 10 млн на старт" : "Up to 10m on start",
      cta: lang === "ru" ? "Связаться со стартап-поддержкой" : "Contact Startup Support",
    },
  ];

  return (
    <section
      id="scenarios"
      className={`z-20 pb-[15vh] pt-12 transition-opacity duration-1000`}
    >
      <Container>
        <h2 className="text-display-3 font-semibold text-white">
          {lang === "ru" ? "Ваш инвестиционный путь" : "Your Investment Path"}
        </h2>
        <p className="mt-3 max-w-2xl text-body-3 text-white/80">
          {lang === "ru"
            ? "Выберите свой профиль, чтобы увидеть, как льготы Татарстана применяются к вам."
            : "Choose your profile to see how Tatarstan's incentives apply to you."}
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
              <div className="">{scenario.icon}</div>
              <h3 className="mt-4 text-heading-3 font-semibold text-white">
                {scenario.title}
              </h3>
              <p className="mt-2 text-body-4 text-white/80">
                {scenario.description}
              </p>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-white/70">
                  {lang === "ru" ? "Ключевой показатель" : "Key Metric"}
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
