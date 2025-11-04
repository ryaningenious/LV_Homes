export function GrainyBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <svg className="hidden">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="5"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
      0.33 0.33 0.33 0 0
      0.33 0.33 0.33 0 0
      0.33 0.33 0.33 0 0
      0    0    0    1 0"
          />
        </filter>
      </svg>
      <div className="absolute inset-0 z-0 bg-black/50">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-deep-teal"></div>
        <div
          className="absolute inset-0 opacity-50"
          style={{ filter: "url(#noise)", mixBlendMode: "soft-light" }}
        ></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
