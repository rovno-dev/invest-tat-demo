"use client";

export function ResourceIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} fill="none" aria-hidden="true">
      {/* Central hub */}
      <circle cx="200" cy="125" r="30" fill="#E03131" fillOpacity="0.8" />
      <circle cx="200" cy="125" r="10" fill="white" />

      {/* Satellite nodes */}
      <circle cx="100" cy="50" r="10" fill="#60A5FA" fillOpacity="0.8" />
      <circle cx="300" cy="50" r="10" fill="#60A5FA" fillOpacity="0.8" />
      <circle cx="100" cy="200" r="10" fill="#60A5FA" fillOpacity="0.8" />
      <circle cx="300" cy="200" r="10" fill="#60A5FA" fillOpacity="0.8" />

      {/* Connecting lines */}
      <line x1="200" y1="125" x2="100" y2="50" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="200" y1="125" x2="300" y2="50" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="200" y1="125" x2="100" y2="200" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="200" y1="125" x2="300" y2="200" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.5" />

      {/* Rotating ring around hub */}
      <g className="rotate-ring" style={{ transformOrigin: "200px 125px", animation: "rotate-ring 8s linear infinite" }}>
        <circle cx="200" cy="125" r="60" stroke="#E03131" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
      </g>

      {/* Fading pulses on satellite nodes */}
      <circle cx="100" cy="50" r="10" fill="#60A5FA" className="fade-in-out" style={{ animation: "fade-in-out 3s ease-in-out infinite" }} />
      <circle cx="300" cy="50" r="10" fill="#60A5FA" className="fade-in-out" style={{ animation: "fade-in-out 3s ease-in-out infinite 1s" }} />
      <circle cx="100" cy="200" r="10" fill="#60A5FA" className="fade-in-out" style={{ animation: "fade-in-out 3s ease-in-out infinite 2s" }} />
      <circle cx="300" cy="200" r="10" fill="#60A5FA" className="fade-in-out" style={{ animation: "fade-in-out 3s ease-in-out infinite 3s" }} />
    </svg>
  );
}
