"use client";
import { useMemo } from "react";

interface GrowingGraphProps {
  className?: string;
}

export function GrowingGraph({ className = "" }: GrowingGraphProps) {
  // Reduce number of bars for better visibility in small containers
  const numOfBars = 7;
  const staggeredDelay = 50;

  const barHeights = useMemo(() => {
    const heights: number[] = [];
    for (let i = 0; i < numOfBars; i++) {
      const ratio = i / numOfBars;
      const wave1 = 30 + 55 * Math.abs(Math.sin(ratio * Math.PI * 3.2));
      const wave2 = 15 * Math.sin(ratio * Math.PI * 8 + 1);
      const noise = 5 * Math.sin(ratio * Math.PI * 17);
      heights.push(Math.max(20, Math.min(95, wave1 + wave2 + noise)));
    }
    return heights;
  }, []);

  const firstBarDelay = numOfBars * staggeredDelay * -1;

  return (
    <div className={`growing-graph ${className}`}>
      <style jsx>{`
        .growing-graph {
          display: flex;
          align-items: flex-end;
          width: 100%;
          height: 100%;
          gap: 4px;
          position: relative;
          overflow: hidden;
        }
        
        .growing-graph-bar {
          flex: 1;
          background: linear-gradient(to top,
            #008040 0% 45.4%,
            #FFFFFF 45.4% 54.6%,
            #E62515 54.6% 100%);
          border-radius: 1px 1px 0 0;
          transform-origin: bottom;
          height: var(--bar-height);
          animation: growing-graph-grow 1.1s ease-in-out infinite alternate;
          animation-fill-mode: backwards;
          animation-delay: calc(var(--delay) * 1ms);
          position: relative;
          z-index: 1;
          min-width: 0;
        }
        @keyframes growing-graph-grow {
          from { transform: scaleY(0.04); }
          to { transform: scaleY(1); }
        }
      `}</style>

      {barHeights.map((height, i) => (
        <div
          key={i}
          className="growing-graph-bar"
          style={
            {
              "--delay": firstBarDelay + i * staggeredDelay,
              "--bar-height": `${height}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
