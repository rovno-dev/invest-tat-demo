// website/components/layout/fancy/tatarstan-flag-text.tsx
"use client";
import { useMemo } from "react";

interface TatarstanFlagTextProps {
  text: string;
  className?: string;
}

export function TatarstanFlagText({ text, className = "" }: TatarstanFlagTextProps) {
  const columns = useMemo(() => {
    const numOfColumns = 60;
    const staggeredDelay = 30;
    const billowAmount = 30;
    const firstColumnDelay = numOfColumns * staggeredDelay * -1;

    return Array.from({ length: numOfColumns }, (_, i) => {
      const delay = firstColumnDelay + i * staggeredDelay;
      const billow = (i / numOfColumns) * billowAmount;
      return { delay, billow };
    });
  }, []);

  return (
    <svg viewBox="0 0 600 120" className={className} aria-hidden="true">
      <defs>
        <mask id="tatarstan-text-mask">
          <text
            x="300"
            y="90"
            textAnchor="middle"
            fill="white"
            fontSize="100"
            fontWeight="900"
            fontFamily="inherit"
            style={{ letterSpacing: "-0.02em" }}
          >
            {text}
          </text>
        </mask>
        <linearGradient id="flag-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#008040" />
          <stop offset="45.4%" stopColor="#008040" />
          <stop offset="45.4%" stopColor="#ffffff" />
          <stop offset="54.6%" stopColor="#ffffff" />
          <stop offset="54.6%" stopColor="#e62515" />
          <stop offset="100%" stopColor="#e62515" />
        </linearGradient>
      </defs>
      <g mask="url(#tatarstan-text-mask)">
        {columns.map((col, i) => (
          <rect
            key={i}
            x={(i / columns.length) * 600}
            y={0}
            width={600 / columns.length + 1}
            height={120}
            fill="url(#flag-grad)"
            style={{
              animation: "oscillate 600ms infinite alternate ease-in-out",
              animationDelay: `${col.delay}ms`,
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              willChange: "transform",
            }}
          />
        ))}
      </g>
    </svg>
  );
}