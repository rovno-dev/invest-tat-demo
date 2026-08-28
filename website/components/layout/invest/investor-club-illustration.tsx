"use client";

export function InvestorClubIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} fill="none" aria-hidden="true">
      {/* Three people circles */}
      <circle cx="120" cy="125" r="20" fill="#93C5FD" fillOpacity="0.7" />
      <circle cx="200" cy="100" r="20" fill="#E03131" fillOpacity="0.8" />
      <circle cx="280" cy="125" r="20" fill="#93C5FD" fillOpacity="0.7" />

      {/* Handshake line between centers */}
      <path d="M140,125 L180,105 L220,105 L260,125" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <path d="M180,105 L220,105" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

      {/* Pulsing rings around the central figure */}
      <circle cx="200" cy="100" r="35" stroke="#E03131" strokeWidth="2" fill="none" className="fade-in-out" style={{ animation: "fade-in-out 2s ease-in-out infinite" }} />
      <circle cx="200" cy="100" r="50" stroke="#E03131" strokeWidth="1" fill="none" className="fade-in-out" style={{ animation: "fade-in-out 2s ease-in-out infinite 1s" }} />

      {/* Three small dots representing members */}
      <circle cx="200" cy="60" r="3" fill="#E03131" />
      <circle cx="170" cy="70" r="3" fill="#E03131" />
      <circle cx="230" cy="70" r="3" fill="#E03131" />
    </svg>
  );
}
