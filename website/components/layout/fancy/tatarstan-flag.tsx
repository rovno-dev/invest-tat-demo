"use client";

/**
 * TatarstanFlag - Animated waving Tatarstan flag
 * Green (top), White (middle), Red (bottom)
 * The flag sits above the dark overlay but below content.
 */
export function TatarstanFlag({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flag-wave-container pointer-events-none absolute inset-0 overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="flag-wave">
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="flag-shade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="75%" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="133" fill="#009B3A" />
          <rect x="0" y="133" width="1200" height="133" fill="#FFFFFF" />
          <rect x="0" y="266" width="1200" height="134" fill="#FF0000" />
          <rect x="0" y="0" width="1200" height="400" fill="url(#flag-shade)" />
        </svg>
      </div>
    </div>
  );
}
