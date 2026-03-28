import React, { useRef, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS  (a=3, b=4, c=5 right triangle, scale=36px per unit)
// ─────────────────────────────────────────────────────────────────────────────
const A_S = 108; // a * 36 = 3 * 36
const B_S = 144; // b * 36 = 4 * 36
const C_S = 180; // c * 36 = 5 * 36
const S   = 252; // (a+b)*36 = 7*36  — side of big outer square
const OX  = 65;  // x offset of big square's top-left corner
const OY  = 30;  // y offset of big square's top-left corner

// ─────────────────────────────────────────────────────────────────────────────
// VERTEX COORDINATES FOR EACH POSITION
// Each triangle is defined by [v0, v1, v2] where each vi = [x, y]
// ─────────────────────────────────────────────────────────────────────────────

// Position A: 4 triangles in the CORNERS of the big square.
// The middle is a tilted square with side c  →  area = c²
const POS_A: [[number,number],[number,number],[number,number]][] = [
  // T1 — top-left corner: right-angle at (OX, OY)
  //   leg b along top edge, leg a along left edge
  [[OX,      OY],      [OX+B_S, OY],      [OX,      OY+A_S]],
  // T2 — top-right corner: right-angle at (OX+S, OY)
  //   leg a along top edge (going left), leg b along right edge
  [[OX+S,    OY],      [OX+S,   OY+B_S],  [OX+B_S, OY]],
  // T3 — bottom-right corner: right-angle at (OX+S, OY+S)
  //   leg b along bottom edge (going left), leg a along right edge (going up)
  [[OX+S,    OY+S],    [OX+A_S, OY+S],    [OX+S,   OY+B_S]],
  // T4 — bottom-left corner: right-angle at (OX, OY+S)
  //   leg a along bottom edge, leg b along left edge (going up)
  [[OX,      OY+S],    [OX,     OY+A_S],  [OX+A_S, OY+S]],
];

// Position B: 4 triangles grouped into TWO RECTANGLES (each a×b).
// Leaves TWO EMPTY SQUARES:
//   • a² at top-left:    (OX, OY)      →  (OX+A_S, OY+A_S)
//   • b² at bottom-right:(OX+A_S, OY+A_S) → (OX+S, OY+S)
const POS_B: [[number,number],[number,number],[number,number]][] = [
  // T1 — top-right rectangle (b_s wide × a_s tall), upper triangle
  //   right-angle at (OX+A_S, OY)
  [[OX+A_S,  OY],      [OX+S,   OY],      [OX+A_S, OY+A_S]],
  // T2 — top-right rectangle, lower triangle
  //   right-angle at (OX+S, OY+A_S)
  [[OX+S,    OY+A_S],  [OX+A_S, OY+A_S],  [OX+S,   OY]],
  // T3 — bottom-left rectangle (a_s wide × b_s tall), lower triangle
  //   right-angle at (OX+A_S, OY+S)
  [[OX+A_S,  OY+S],    [OX,     OY+S],    [OX+A_S, OY+A_S]],
  // T4 — bottom-left rectangle, upper triangle
  //   right-angle at (OX, OY+A_S)
  [[OX,      OY+A_S],  [OX+A_S, OY+A_S],  [OX,     OY+S]],
];

// Bright, contrasting fill colors for the 4 triangles
const TRI_COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];
const TRI_STROKES = ["#93c5fd", "#86efac", "#fdba74", "#d8b4fe"];

// ─────────────────────────────────────────────────────────────────────────────
// LERP + EASING HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Linear interpolation: moves value `a` toward `b` by factor t ∈ [0,1] */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smooth cubic easing: slow start → fast middle → slow end */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Interpolate an entire triangle's 3 vertices between two positions */
function lerpTriangle(
  from: [[number,number],[number,number],[number,number]],
  to:   [[number,number],[number,number],[number,number]],
  t: number
): [number,number][] {
  return from.map((v, i) => [lerp(v[0], to[i][0], t), lerp(v[1], to[i][1], t)]);
}

/** Convert vertex array to SVG polygon "points" string */
function toPoints(verts: [number,number][]): string {
  return verts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// LABEL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Centroid of a triangle (for placing color labels) */
function centroid(verts: [number,number][]): [number,number] {
  const x = verts.reduce((s, v) => s + v[0], 0) / verts.length;
  const y = verts.reduce((s, v) => s + v[1], 0) / verts.length;
  return [x, y];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const PythagorasRearrangementAnimation: React.FC = () => {
  // t = 0 → Position A (c² in middle)
  // t = 1 → Position B (a² + b² visible)
  const tRef       = useRef<number>(0);
  const dirRef     = useRef<1 | -1>(1);  // +1 = animate toward B, -1 = toward A
  const rafRef     = useRef<number | null>(null);
  const isAnimRef  = useRef<boolean>(false);

  const [t, setT]          = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // ── Core animation loop ──────────────────────────────────────────────────
  const DURATION_MS = 1200; // total transition duration
  let startTime: number | null = null;
  let startT: number = 0;
  let targetT: number = 0;

  const animate = useCallback((timestamp: number) => {
    if (!isAnimRef.current) return;

    if (startTime === null) {
      // First frame — capture reference time & start value
      startTime  = timestamp;
      startT     = tRef.current;
      targetT    = dirRef.current === 1 ? 1 : 0;
    }

    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    const eased    = easeInOutCubic(progress);

    // Interpolate from startT toward targetT
    const newT = lerp(startT, targetT, eased);
    tRef.current = newT;
    setT(newT);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Animation complete — snap to exact target
      tRef.current = targetT;
      setT(targetT);
      isAnimRef.current = false;
      setIsAnimating(false);
      // Flip direction for next press
      dirRef.current = dirRef.current === 1 ? -1 : 1;
      startTime = null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Start or toggle the animation */
  const handleAnimate = useCallback(() => {
    if (isAnimRef.current) {
      // Cancel mid-animation → reverse immediately
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      isAnimRef.current = false;
      dirRef.current = dirRef.current === 1 ? -1 : 1;
      startTime = null;
    }
    isAnimRef.current = true;
    setIsAnimating(true);
    startTime = null;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Compute current triangle vertices via lerp ───────────────────────────
  const currentTris = POS_A.map((posA, i) =>
    lerpTriangle(posA, POS_B[i], t) as [number,number][]
  );

  // ── Opacity for overlay regions ──────────────────────────────────────────
  // The tilted c² square fades out as t → 1; a²,b² squares fade in as t → 1
  const opacityC  = 1 - t;
  const opacityAB = t;

  // ── Inner tilted square (c²) vertices — always fixed (Position A geometry) ──
  const innerC2 = [
    [OX+B_S, OY],        // P1 — top
    [OX+S,   OY+B_S],   // P2 — right
    [OX+A_S, OY+S],     // P3 — bottom
    [OX,     OY+A_S],   // P4 — left
  ] as [number,number][];

  // ── Label for a,b on triangle sides ─────────────────────────────────────
  // Show side labels on T1 in Position A (t≈0)
  const showSideLabels = t < 0.15;
  const t1A = POS_A[0];
  const midLegA: [number,number] = [(t1A[0][0]+t1A[2][0])/2, (t1A[0][1]+t1A[2][1])/2]; // vertical leg 'a'
  const midLegB: [number,number] = [(t1A[0][0]+t1A[1][0])/2, (t1A[0][1]+t1A[1][1])/2]; // horizontal leg 'b'
  const midHyp: [number,number]  = [(t1A[1][0]+t1A[2][0])/2, (t1A[1][1]+t1A[2][1])/2]; // hypotenuse 'c'

  // ── Dynamic explanation text ─────────────────────────────────────────────
  const isAtA   = t < 0.05;
  const isAtB   = t > 0.95;
  const btnLabel = isAtA
    ? "▶ Animate → a² + b²"
    : isAtB
    ? "◀ Kembali → c²"
    : isAnimating
    ? "⏸ Jeda"
    : "▶ Lanjutkan";

  const explanationText = isAtA
    ? "Posisi A: Ruang kosong di tengah berbentuk persegi miring → Luas = c²"
    : isAtB
    ? "Posisi B: Dua ruang kosong terbentuk → Luas = a² + b²  →  a² + b² = c²  ✓"
    : t < 0.5
    ? "Menggeser segitiga… perhatikan ruang kosong berubah bentuk!"
    : "Hampir sampai… dua persegi mulai terbentuk!";

  return (
    <div className="w-full flex flex-col items-center gap-3">

      {/* ── SVG Canvas ── */}
      <div
        className="w-full overflow-hidden rounded-xl border bg-slate-900/70"
        style={{ maxWidth: 420, borderColor: "rgba(168,85,247,0.35)" }}
      >
        <svg
          viewBox="0 0 380 340"
          className="w-full"
          aria-label="Animasi Rearrangement Teorema Pythagoras"
        >
          <defs>
            <filter id="ra-glow">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── 1. Outer big square — always visible ── */}
          <rect
            x={OX} y={OY} width={S} height={S}
            fill="none"
            stroke="rgba(148,163,184,0.6)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          {/* Big square side label (a+b) */}
          <text x={OX + S/2} y={OY - 8} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">(a + b)</text>
          <text x={OX - 22} y={OY + S/2 + 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">(a+b)</text>

          {/* ── 2. Tilted c² square (Position A ghost) — fades as t increases ── */}
          <polygon
            points={toPoints(innerC2)}
            fill={`rgba(251,191,36,${0.12 * opacityC})`}
            stroke={`rgba(251,191,36,${opacityC})`}
            strokeWidth="2"
            style={{ transition: "none" }}
          />
          {/* c² label inside inner square */}
          {opacityC > 0.1 && (
            <text
              x={(innerC2[0][0]+innerC2[1][0]+innerC2[2][0]+innerC2[3][0])/4}
              y={(innerC2[0][1]+innerC2[1][1]+innerC2[2][1]+innerC2[3][1])/4 + 5}
              textAnchor="middle"
              fill={`rgba(251,191,36,${opacityC})`}
              fontSize="16"
              fontWeight="bold"
              fontFamily="monospace"
              filter="url(#ra-glow)"
            >
              c²
            </text>
          )}
          {/* c side label on inner square */}
          {opacityC > 0.1 && (
            <text
              x={(innerC2[0][0]+innerC2[1][0])/2 + 14}
              y={(innerC2[0][1]+innerC2[1][1])/2}
              textAnchor="middle"
              fill={`rgba(251,191,36,${opacityC * 0.85})`}
              fontSize="12"
              fontWeight="bold"
              fontFamily="monospace"
            >
              c
            </text>
          )}

          {/* ── 3. a² empty square (Position B ghost) — fades in as t increases ── */}
          <rect
            x={OX} y={OY} width={A_S} height={A_S}
            fill={`rgba(59,130,246,${0.18 * opacityAB})`}
            stroke={`rgba(59,130,246,${opacityAB * 0.9})`}
            strokeWidth="2"
            style={{ transition: "none" }}
          />
          {opacityAB > 0.1 && (
            <>
              <text
                x={OX + A_S/2} y={OY + A_S/2 + 6}
                textAnchor="middle"
                fill={`rgba(147,197,253,${opacityAB})`}
                fontSize="18" fontWeight="bold" fontFamily="monospace"
                filter="url(#ra-glow)"
              >a²</text>
              <text
                x={OX + A_S/2} y={OY + A_S/2 + 22}
                textAnchor="middle"
                fill={`rgba(147,197,253,${opacityAB * 0.75})`}
                fontSize="11" fontFamily="monospace"
              >= 9</text>
            </>
          )}

          {/* ── 4. b² empty square (Position B ghost) — fades in as t increases ── */}
          <rect
            x={OX + A_S} y={OY + A_S} width={B_S} height={B_S}
            fill={`rgba(34,197,94,${0.18 * opacityAB})`}
            stroke={`rgba(34,197,94,${opacityAB * 0.9})`}
            strokeWidth="2"
            style={{ transition: "none" }}
          />
          {opacityAB > 0.1 && (
            <>
              <text
                x={OX + A_S + B_S/2} y={OY + A_S + B_S/2 + 6}
                textAnchor="middle"
                fill={`rgba(134,239,172,${opacityAB})`}
                fontSize="18" fontWeight="bold" fontFamily="monospace"
                filter="url(#ra-glow)"
              >b²</text>
              <text
                x={OX + A_S + B_S/2} y={OY + A_S + B_S/2 + 22}
                textAnchor="middle"
                fill={`rgba(134,239,172,${opacityAB * 0.75})`}
                fontSize="11" fontFamily="monospace"
              >= 16</text>
            </>
          )}

          {/* ── 5. The 4 animated triangles (rendered on top) ── */}
          {currentTris.map((verts, i) => {
            const [cx, cy] = centroid(verts);
            return (
              <g key={i}>
                <polygon
                  points={toPoints(verts as [number,number][])}
                  fill={TRI_COLORS[i]}
                  fillOpacity="0.75"
                  stroke={TRI_STROKES[i]}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Triangle index label */}
                <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace" opacity="0.9">
                  {["T₁","T₂","T₃","T₄"][i]}
                </text>
              </g>
            );
          })}

          {/* ── 6. Side labels a, b, c on Triangle T1 — only shown in Position A ── */}
          {showSideLabels && (
            <g opacity={1 - t / 0.15}>
              {/* label 'a' on vertical leg */}
              <text x={midLegA[0] - 14} y={midLegA[1] + 4} textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold" fontFamily="monospace">a</text>
              {/* label 'b' on horizontal leg */}
              <text x={midLegB[0]} y={midLegB[1] - 8} textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="bold" fontFamily="monospace">b</text>
              {/* label 'c' on hypotenuse */}
              <text x={midHyp[0] - 12} y={midHyp[1] + 5} textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold" fontFamily="monospace">c</text>
            </g>
          )}

          {/* ── 7. Equation banner — shown at Position B ── */}
          {opacityAB > 0.5 && (
            <g opacity={(opacityAB - 0.5) * 2}>
              <rect x={60} y={295} width={258} height={34} rx="8"
                fill="rgba(15,23,42,0.92)" stroke="rgba(234,179,8,0.8)" strokeWidth="1.8"
                filter="url(#ra-glow)"
              />
              <text x={189} y={310} textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold" fontFamily="monospace">
                a² + b² = c²
              </text>
              <text x={189} y={323} textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                9 + 16 = 25  ✓  Teorema Pythagoras Terbukti!
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* ── Dynamic explanation text ── */}
      <div
        className="w-full max-w-sm rounded-lg px-4 py-3 text-center border transition-all duration-500"
        style={{
          background: "rgba(15,23,42,0.85)",
          borderColor: isAtB
            ? "rgba(234,179,8,0.6)"
            : isAtA
            ? "rgba(168,85,247,0.4)"
            : "rgba(148,163,184,0.3)",
        }}
      >
        <p
          className="text-sm font-body leading-relaxed transition-all duration-300"
          style={{ color: isAtB ? "#fde68a" : "#e2e8f0" }}
        >
          {explanationText}
        </p>
      </div>

      {/* ── Control Button ── */}
      <button
        onClick={handleAnimate}
        className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
        style={{
          background: isAnimating
            ? "rgba(239,68,68,0.2)"
            : isAtB
            ? "rgba(34,197,94,0.2)"
            : "rgba(168,85,247,0.2)",
          border: `1.5px solid ${
            isAnimating
              ? "rgba(239,68,68,0.6)"
              : isAtB
              ? "rgba(34,197,94,0.6)"
              : "rgba(168,85,247,0.6)"
          }`,
          color: isAnimating ? "#fca5a5" : isAtB ? "#86efac" : "#d8b4fe",
        }}
      >
        {btnLabel}
      </button>

      {/* ── Legend ── */}
      <div className="flex flex-wrap justify-center gap-3 text-xs font-body">
        {["T₁","T₂","T₃","T₄"].map((label, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: TRI_COLORS[i], opacity: 0.85 }}/>
            <span style={{ color: TRI_STROKES[i] }}>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(251,191,36,0.4)", border: "1px solid rgba(251,191,36,0.8)" }}/>
          <span className="text-yellow-300">c²</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(59,130,246,0.3)", border: "1px solid rgba(59,130,246,0.8)" }}/>
          <span className="text-blue-300">a²</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(34,197,94,0.3)", border: "1px solid rgba(34,197,94,0.8)" }}/>
          <span className="text-green-300">b²</span>
        </div>
      </div>
    </div>
  );
};

export default PythagorasRearrangementAnimation;
