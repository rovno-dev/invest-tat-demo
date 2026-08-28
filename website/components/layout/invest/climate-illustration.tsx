"use client";

export function ClimateIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} fill="none" aria-hidden="true">
      {/* Grid lines */}
      <line x1="40" y1="200" x2="360" y2="200" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="40" y1="150" x2="360" y2="150" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="40" y1="100" x2="360" y2="100" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="40" y1="50" x2="360" y2="50" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />

      {/* Trend line */}
      <path
        d="M50,190 C120,160 180,100 250,80 C300,65 340,40 360,30"
        stroke="#E03131"
        strokeWidth="3"
        strokeLinecap="round"
        className="trend-line"
        style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: "trend-line 2s ease-out forwards" }}
      />

      {/* Dot at end of line */}
      <circle cx="360" cy="30" r="6" fill="#E03131" className="pulse-dot" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />

      {/* Bar chart accent */}
      <rect x="60" y="170" width="30" height="30" fill="#E03131" opacity="0.2" />
      <rect x="100" y="140" width="30" height="60" fill="#E03131" opacity="0.3" />
      <rect x="140" y="110" width="30" height="90" fill="#E03131" opacity="0.4" />
      <rect x="180" y="80" width="30" height="120" fill="#E03131" opacity="0.5" />
    </svg>
  );
}
