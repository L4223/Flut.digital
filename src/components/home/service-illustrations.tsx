/**
 * Small animated SVG scenes for the "Kernkompetenzen" cards. Animations are
 * defined in globals.css (.illu-*) and only run while an ancestor carries
 * data-play="true" and the visitor hasn't asked for reduced motion.
 */
import type { CSSProperties } from "react";

const P = "hsl(var(--primary))";
const A = "hsl(var(--accent))";
const LINE = "hsl(var(--foreground) / 0.18)";
const FILL = "hsl(var(--foreground) / 0.06)";

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function WebIllustration() {
  return (
    <svg viewBox="0 0 320 180" className="illu h-full w-full" aria-hidden="true">
      <rect x="40" y="18" width="240" height="150" rx="10" fill="hsl(var(--background) / 0.6)" stroke={LINE} />
      <line x1="40" y1="40" x2="280" y2="40" stroke={LINE} />
      {[56, 68, 80].map((cx) => <circle key={cx} cx={cx} cy="29" r="3.5" fill={LINE} />)}
      <rect x="100" y="23" width="120" height="11" rx="5.5" fill={FILL} />
      {/* page blocks building up */}
      <g className="illu-build" style={delay(0)}>
        <rect x="56" y="52" width="110" height="10" rx="3" fill={P} />
        <rect x="56" y="68" width="80" height="6" rx="3" fill={LINE} />
      </g>
      <g className="illu-build" style={delay(0.35)}>
        <rect x="56" y="82" width="46" height="12" rx="6" fill={A} />
      </g>
      <g className="illu-build" style={delay(0.7)}>
        <rect x="186" y="52" width="78" height="48" rx="6" fill="hsl(var(--primary) / 0.25)" stroke={P} strokeOpacity="0.6" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="illu-build" style={delay(1.05 + i * 0.25)}>
          <rect x={56 + i * 72} y="112" width="64" height="42" rx="6" fill={FILL} stroke={LINE} />
          <rect x={64 + i * 72} y="122" width="30" height="5" rx="2.5" fill={i === 1 ? A : LINE} />
          <rect x={64 + i * 72} y="133" width="44" height="4" rx="2" fill={LINE} />
        </g>
      ))}
      {/* cursor */}
      <g className="illu-cursor">
        <path d="M232 92 l0 20 l5 -5 l4 9 l4 -2 l-4 -9 l7 0 z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function AiIllustration() {
  const layers = [
    [45, 90, 135],
    [30, 70, 110, 150],
    [60, 120],
  ];
  const xs = [80, 160, 240];
  const edges: { x1: number; y1: number; x2: number; y2: number; i: number }[] = [];
  let i = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l]) for (const y2 of layers[l + 1]) edges.push({ x1: xs[l], y1, x2: xs[l + 1], y2, i: i++ });
  }
  return (
    <svg viewBox="0 0 320 180" className="illu h-full w-full" aria-hidden="true">
      {edges.map((e) => (
        <line key={`b${e.i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={LINE} />
      ))}
      {edges.filter((e) => e.i % 3 !== 1).map((e) => (
        <line
          key={`s${e.i}`}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke={e.i % 2 ? A : P}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="illu-signal"
          style={delay((e.i * 0.37) % 2.4)}
        />
      ))}
      {layers.map((ys, l) =>
        ys.map((y, j) => (
          <g key={`${l}-${j}`}>
            <circle cx={xs[l]} cy={y} r="11" fill="hsl(var(--background))" stroke={l === 1 ? P : A} strokeWidth="2" />
            <circle cx={xs[l]} cy={y} r="5" fill={l === 1 ? P : A} className="illu-node" style={delay(l * 0.6 + j * 0.3)} />
          </g>
        )),
      )}
      <text x="22" y="94" fill={A} fontSize="11" fontFamily="inherit" fontWeight="600">in</text>
      <text x="268" y="94" fill={A} fontSize="11" fontFamily="inherit" fontWeight="600">out</text>
    </svg>
  );
}

function ThreeDIllustration() {
  const face = "absolute inset-0 rounded-md border-2 border-primary/80 bg-primary/10";
  const s = 64; // cube size in px
  const half = s / 2;
  return (
    <div className="illu relative flex h-full w-full items-center justify-center" aria-hidden="true">
      {/* AR viewfinder corners */}
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full">
        {[
          "M90 30 h-20 v20",
          "M230 30 h20 v20",
          "M90 150 h-20 v-20",
          "M230 150 h20 v-20",
        ].map((d) => <path key={d} d={d} fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />)}
        <ellipse cx="160" cy="138" rx="42" ry="7" fill="hsl(var(--primary) / 0.25)" />
      </svg>
      <div className="illu-float" style={{ perspective: 600 }}>
        <div className="illu-cube relative" style={{ width: s, height: s }}>
          <div className={face} style={{ transform: `translateZ(${half}px)` }} />
          <div className={face} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
          <div className={face} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
          <div className={face} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
          <div className={`${face} bg-accent/20 border-accent/80`} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
          <div className={face} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </div>
      </div>
    </div>
  );
}

function BrandingIllustration() {
  const swatches = [P, A, "hsl(var(--foreground) / 0.85)", "hsl(var(--muted))"];
  return (
    <svg viewBox="0 0 320 180" className="illu h-full w-full" aria-hidden="true">
      <rect x="36" y="28" width="124" height="124" rx="16" fill={FILL} stroke={LINE} />
      {/* a logo mark being drawn */}
      <path
        d="M62 112 C 72 60, 102 60, 98 90 S 128 122, 136 70"
        fill="none"
        stroke={P}
        strokeWidth="7"
        strokeLinecap="round"
        className="illu-draw"
      />
      <circle cx="136" cy="62" r="6" fill={A} className="illu-pop" />
      <text x="186" y="76" fill="hsl(var(--foreground))" fontSize="40" fontWeight="800" fontFamily="inherit">Aa</text>
      <rect x="186" y="88" width="96" height="5" rx="2.5" fill={LINE} />
      <rect x="186" y="98" width="70" height="5" rx="2.5" fill={LINE} />
      {swatches.map((c, i) => (
        <circle key={i} cx={198 + i * 26} cy="132" r="10" fill={c} className="illu-pop" style={delay(i * 0.4)} />
      ))}
    </svg>
  );
}

function SocialIllustration() {
  return (
    <svg viewBox="0 0 320 180" className="illu h-full w-full" aria-hidden="true">
      {/* phone with a post */}
      <rect x="60" y="14" width="88" height="158" rx="14" fill="hsl(var(--background) / 0.6)" stroke={LINE} />
      <rect x="70" y="32" width="68" height="56" rx="6" fill="hsl(var(--primary) / 0.25)" />
      <circle cx="90" cy="54" r="9" fill={A} />
      <path d="M72 86 l22 -18 l14 12 l12 -8 l16 14 z" fill={P} opacity="0.8" />
      <rect x="70" y="96" width="50" height="5" rx="2.5" fill={LINE} />
      <rect x="70" y="106" width="36" height="5" rx="2.5" fill={LINE} />
      <path d="M76 132 c-4 -6 -12 -2 -8 4 l8 7 l8 -7 c4 -6 -4 -10 -8 -4z" fill={A} />
      {/* rising reactions */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${136 + i * 8} 140 c-3 -4 -9 -1 -6 3 l6 5 l6 -5 c3 -4 -3 -7 -6 -3z`}
          fill={i === 1 ? P : A}
          className="illu-rise"
          style={delay(i * 0.9)}
        />
      ))}
      {/* growth chart */}
      <line x1="184" y1="150" x2="290" y2="150" stroke={LINE} />
      {[34, 52, 44, 72, 96].map((h, i) => (
        <rect
          key={i}
          x={190 + i * 20}
          y={150 - h}
          width="12"
          height={h}
          rx="3"
          fill={i === 4 ? A : P}
          opacity={0.45 + i * 0.12}
          className="illu-grow"
          style={delay(i * 0.15)}
        />
      ))}
    </svg>
  );
}

export const serviceIllustrations: Record<string, () => JSX.Element> = {
  web: WebIllustration,
  ki: AiIllustration,
  "3d-ar": ThreeDIllustration,
  branding: BrandingIllustration,
  social: SocialIllustration,
};
