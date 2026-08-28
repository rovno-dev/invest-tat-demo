"use client";

/* Shared pixel-art style – bright colors, blocky shapes, subtle animations */

export function ClimatePixel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" aria-hidden="true">
      {/* Background grid */}
      <g opacity="0.2">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 12} x2="320" y2={i * 12} stroke="#ffffff" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 27 }, (_, i) => (
          <line key={`v${i}`} x1={i * 12} y1="0" x2={i * 12} y2="200" stroke="#ffffff" strokeWidth="0.5" />
        ))}
      </g>
      {/* Pixel arrow going up */}
      <g className="pixel-arrow" style={{ animation: "pixel-bounce 2s ease-in-out infinite" }}>
        <rect x="140" y="140" width="40" height="40" fill="#00FF00" />
        <rect x="140" y="100" width="40" height="40" fill="#00FF00" />
        <rect x="140" y="60" width="40" height="40" fill="#00FF00" />
        <rect x="160" y="20" width="20" height="40" fill="#00FF00" />
      </g>
      {/* Pixel bars on the left */}
      <g className="pixel-bars" style={{ animation: "pixel-grow 1.5s ease-in-out infinite alternate" }}>
        <rect x="20" y="160" width="20" height="20" fill="#FFD700" />
        <rect x="50" y="140" width="20" height="40" fill="#FFD700" />
        <rect x="80" y="120" width="20" height="60" fill="#FFD700" />
        <rect x="110" y="100" width="20" height="80" fill="#FFD700" />
      </g>
      {/* Scanned line */}
      <rect x="0" y="180" width="320" height="4" fill="#FF0000" className="scan-line" style={{ animation: "pixel-scan 3s linear infinite" }} />
    </svg>
  );
}

export function ResourcePixel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" aria-hidden="true">
      {/* Pixel nodes */}
      <g className="pixel-nodes">
        <rect x="120" y="80" width="40" height="40" fill="#00FF00" className="blink" style={{ animation: "pixel-blink 1s infinite" }} />
        <rect x="40" y="40" width="20" height="20" fill="#00FF00" className="blink" style={{ animation: "pixel-blink 1s infinite 0.3s" }} />
        <rect x="240" y="40" width="20" height="20" fill="#00FF00" className="blink" style={{ animation: "pixel-blink 1s infinite 0.6s" }} />
        <rect x="40" y="140" width="20" height="20" fill="#00FF00" className="blink" style={{ animation: "pixel-blink 1s infinite 0.9s" }} />
        <rect x="240" y="140" width="20" height="20" fill="#00FF00" className="blink" style={{ animation: "pixel-blink 1s infinite 1.2s" }} />
      </g>
      {/* Connecting pixel lines */}
      <rect x="130" y="90" width="20" height="4" fill="#00FF00" opacity="0.6" />
      <rect x="130" y="90" width="4" height="20" fill="#00FF00" opacity="0.6" />
      <rect x="130" y="90" width="20" height="4" fill="#00FF00" opacity="0.6" transform="rotate(45 140 100)" />
      <rect x="130" y="90" width="20" height="4" fill="#00FF00" opacity="0.6" transform="rotate(-45 140 100)" />
      {/* Resource boxes */}
      <rect x="20" y="20" width="12" height="12" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1.5s infinite 0.5s" }} />
      <rect x="280" y="20" width="12" height="12" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1.5s infinite 1s" }} />
      <rect x="20" y="160" width="12" height="12" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1.5s infinite 1.5s" }} />
      <rect x="280" y="160" width="12" height="12" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1.5s infinite 2s" }} />
    </svg>
  );
}

export function InvestorClubPixel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" aria-hidden="true">

      {/* Pixel people */}
      <g className="pixel-people" style={{ animation: "pixel-bounce 2s ease-in-out infinite" }}>
        {/* Left person */}
        <rect x="80" y="60" width="20" height="20" fill="#FF00FF" />
        <rect x="70" y="80" width="40" height="60" fill="#FF00FF" />
        <rect x="70" y="140" width="20" height="40" fill="#00FF00" />
        <rect x="90" y="140" width="20" height="40" fill="#00FF00" />
        {/* Right person */}
        <rect x="200" y="60" width="20" height="20" fill="#FF00FF" />
        <rect x="190" y="80" width="40" height="60" fill="#FF00FF" />
        <rect x="190" y="140" width="20" height="40" fill="#00FF00" />
        <rect x="210" y="140" width="20" height="40" fill="#00FF00" />
        {/* Handshake connection */}
        <rect x="120" y="100" width="20" height="10" fill="#FFD700" />
        <rect x="170" y="100" width="20" height="10" fill="#FFD700" />
        <rect x="140" y="95" width="30" height="4" fill="#FFD700" />
      </g>
      {/* Bouncing sparkle */}
      <rect x="160" y="40" width="8" height="8" fill="#00FFFF" className="blink" style={{ animation: "pixel-blink 1s infinite" }} />
      <rect x="40" y="40" width="8" height="8" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1s infinite 0.2s" }} />
      <rect x="280" y="40" width="8" height="8" fill="#FFD700" className="blink" style={{ animation: "pixel-blink 1s infinite 0.4s" }} />
    </svg>
  );
}
