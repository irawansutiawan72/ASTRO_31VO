import React, { useState, useEffect, useRef, useCallback } from "react";

type V3 = [number, number, number];
type V2 = [number, number];

/* ── 3-D math ── */
const rotXv = (v: V3, a: number): V3 => [
  v[0],
  v[1] * Math.cos(a) - v[2] * Math.sin(a),
  v[1] * Math.sin(a) + v[2] * Math.cos(a),
];
const rotYv = (v: V3, a: number): V3 => [
  v[0] * Math.cos(a) + v[2] * Math.sin(a),
  v[1],
  -v[0] * Math.sin(a) + v[2] * Math.cos(a),
];
const project = (v: V3, fov = 500, scale = 1.7): V2 => {
  const tz = v[2] + fov;
  return [(v[0] * fov * scale) / tz, (v[1] * fov * scale) / tz];
};
const lerp2 = (a: V2, b: V2, t: number): V2 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/* ── Build regular n-gon from one base edge ── */
function ngonFromEdge(n: number, a: number, x0: number, y0: number, upward: boolean): V2[] {
  const inR = a / (2 * Math.tan(Math.PI / n));
  const R   = a / (2 * Math.sin(Math.PI / n));
  const cx  = x0 + a / 2;
  const cyC = upward ? y0 - inR : y0 + inR;
  const angle0 = Math.atan2(y0 - cyC, x0 - cx);
  const step   = upward ? -2 * Math.PI / n : 2 * Math.PI / n;
  return Array.from({ length: n }, (_, k) => [
    cx  + R * Math.cos(angle0 + k * step),
    cyC + R * Math.sin(angle0 + k * step),
  ] as V2);
}

/* ── Face data ── */
interface FaceData {
  v3d: V3[];
  vnet: V2[];
  fill: string;
  label: string;
}

const RECT_COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f97316", "#ec4899"];

function buildFaces(n: number, R3d: number, H: number, a: number, h: number, svgCX: number, netCY: number): FaceData[] {
  /* 3-D vertex ring */
  const bot3D: V3[] = Array.from({ length: n }, (_, k) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * k) / n;
    return [R3d * Math.cos(ang), H / 2, R3d * Math.sin(ang)];
  });
  const top3D: V3[] = bot3D.map(([x, , z]) => [x, -H / 2, z] as V3);

  /* Net strip geometry */
  const stripLeft = svgCX - (n * a) / 2;
  const y0 = netCY - h / 2; // top of rect strip
  const y1 = netCY + h / 2; // bottom of rect strip
  const midK = Math.floor(n / 2);

  const faces: FaceData[] = [];

  /* Rectangular side faces */
  for (let k = 0; k < n; k++) {
    const x0 = stripLeft + k * a;
    const x1 = x0 + a;
    faces.push({
      v3d:  [bot3D[k], bot3D[(k + 1) % n], top3D[(k + 1) % n], top3D[k]],
      vnet: [[x0, y1], [x1, y1], [x1, y0], [x0, y0]],
      fill:  RECT_COLORS[k % RECT_COLORS.length],
      label: `Sisi ${k + 1}`,
    });
  }

  /* Bottom polygon face (attached to midK rect bottom edge) */
  const botNgon  = ngonFromEdge(n, a, stripLeft + midK * a, y1, false);
  const botVnet: V2[] = new Array(n);
  for (let i = 0; i < n; i++) botVnet[(midK + i) % n] = botNgon[i];
  faces.push({ v3d: bot3D, vnet: botVnet, fill: "#ef4444", label: "Alas" });

  /* Top polygon face (attached to midK rect top edge) */
  const topNgon  = ngonFromEdge(n, a, stripLeft + midK * a, y0, true);
  const topVnet: V2[] = new Array(n);
  for (let i = 0; i < n; i++) topVnet[(midK + i) % n] = topNgon[i];
  faces.push({ v3d: top3D, vnet: topVnet, fill: "#eab308", label: "Tutup" });

  return faces;
}

/* ── Config per prism ── */
const R3D = 38;
const H3D = 70;

function makeConfig(n: number) {
  const a    = 2 * R3D * Math.sin(Math.PI / n);
  const inR  = a / (2 * Math.tan(Math.PI / n));
  const capH = inR + R3D; // height of n-gon cap above/below strip
  const netCY = 22 + capH + H3D / 2;
  const label = n === 3 ? "Segitiga" : n === 4 ? "Segiempat" : "Segilima";
  return { a, h: H3D, netCY, label };
}

const SVG_CX = 170;
const SVG_CY = 118;

/* ─────────────────────────────────────────────────────── */
export default function JaringPrismaInteraktif() {
  const [activeN,     setActiveN]     = useState(3);
  const [rotX,        setRotX]        = useState(-22);
  const [rotY,        setRotY]        = useState(32);
  const [progress,    setProgress]    = useState(0); // 0=assembled, 1=net
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging,  setIsDragging]  = useState(false);

  const dragRef = useRef({ sx: 0, sy: 0, bx: -22, by: 32 });
  const animRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  /* Keep ref in sync */
  useEffect(() => { progressRef.current = progress; }, [progress]);

  /* Build geometry */
  const cfg   = makeConfig(activeN);
  const faces = buildFaces(activeN, R3D, H3D, cfg.a, cfg.h, SVG_CX, cfg.netCY);

  const rx = (rotX * Math.PI) / 180;
  const ry = (rotY * Math.PI) / 180;

  /* Project one 3-D vertex → SVG coords */
  const proj = (v: V3): V2 => {
    const rv = rotXv(rotYv(v, ry), rx);
    const [px, py] = project(rv);
    return [SVG_CX + px, SVG_CY + py];
  };

  /* Polygon vertices for a face at current progress */
  const getFacePoly = (face: FaceData): V2[] => {
    const assembled = face.v3d.map(proj);
    if (progress <= 0) return assembled;
    if (progress >= 1) return face.vnet;
    return assembled.map((p, i) => lerp2(p, face.vnet[i], progress));
  };

  /* Depth-sorted faces */
  const sorted = faces
    .map(f => {
      const poly = getFacePoly(f);
      const avgZ = f.v3d.reduce((s, v) => s + rotXv(rotYv(v, ry), rx)[2], 0) / f.v3d.length;
      return { ...f, poly, avgZ };
    })
    .sort((a, b) => b.avgZ - a.avgZ);

  /* Animate to target progress */
  const animateTo = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startP = progressRef.current;
    const startT = performance.now();
    const dur    = 950;
    setIsAnimating(true);

    const tick = (now: number) => {
      const raw   = Math.min((now - startT) / dur, 1);
      const eased = easeInOut(raw);
      const newP  = startP + (target - startP) * eased;
      setProgress(newP);
      progressRef.current = newP;
      if (raw < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(target);
        progressRef.current = target;
        setIsAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  /* Drag handlers (rotation only when assembled) */
  const onMouseDown = (e: React.MouseEvent) => {
    if (progress > 0.05 || isAnimating) return;
    setIsDragging(true);
    dragRef.current = { sx: e.clientX, sy: e.clientY, bx: rotX, by: rotY };
  };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setRotY(dragRef.current.by + (e.clientX - dragRef.current.sx) * 0.55);
    setRotX(dragRef.current.bx - (e.clientY - dragRef.current.sy) * 0.55);
  }, [isDragging]);
  const onMouseUp = useCallback(() => setIsDragging(false), []);

  const onTouchStart = (e: React.TouchEvent) => {
    if (progress > 0.05 || isAnimating) return;
    const t = e.touches[0];
    setIsDragging(true);
    dragRef.current = { sx: t.clientX, sy: t.clientY, bx: rotX, by: rotY };
  };
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    setRotY(dragRef.current.by + (t.clientX - dragRef.current.sx) * 0.55);
    setRotX(dragRef.current.bx - (t.clientY - dragRef.current.sy) * 0.55);
  }, [isDragging]);
  const onTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend",  onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  /* Reset when switching prism type */
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setProgress(0);
    progressRef.current = 0;
    setRotX(-22);
    setRotY(32);
    setIsAnimating(false);
  }, [activeN]);

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const isAssembled = progress < 0.05;
  const isFlatNet   = progress > 0.95;

  return (
    <div className="space-y-3">
      {/* Prism type selector */}
      <div className="flex gap-2 justify-center">
        {[3, 4, 5].map(n => {
          const c = makeConfig(n);
          return (
            <button key={n}
              onClick={() => setActiveN(n)}
              disabled={isAnimating}
              className="text-xs font-bold py-1.5 px-3 rounded-lg border transition-all duration-200 font-body"
              style={{
                borderColor: "#6366f1",
                color: activeN === n ? "#0f172a" : "#818cf8",
                backgroundColor: activeN === n ? "#6366f1" : "transparent",
                opacity: isAnimating ? 0.45 : activeN === n ? 1 : 0.65,
              }}>
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Main SVG canvas */}
      <div
        className="bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden select-none"
        style={{ cursor: isAssembled && !isAnimating ? (isDragging ? "grabbing" : "grab") : "default" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <svg viewBox="0 0 340 245" className="w-full" style={{ maxHeight: 265 }}>

          {sorted.map((f, fi) => {
            const pts = f.poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
            const mx  = f.poly.reduce((s, p) => s + p[0], 0) / f.poly.length;
            const my  = f.poly.reduce((s, p) => s + p[1], 0) / f.poly.length;
            const labelOpacity = Math.max(0, (progress - 0.55) / 0.45);
            return (
              <g key={fi}>
                <polygon
                  points={pts}
                  fill={f.fill} fillOpacity={0.86}
                  stroke="rgba(255,255,255,0.75)" strokeWidth={1.5}
                  strokeLinejoin="round"
                />
                {progress > 0.55 && (
                  <text
                    x={mx.toFixed(1)} y={my.toFixed(1)}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold"
                    style={{ pointerEvents: "none", opacity: labelOpacity }}
                  >
                    {f.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Status hint */}
          {isAssembled && (
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">
              Drag untuk memutar · tekan Bongkar untuk melihat jaring-jaring
            </text>
          )}
          {isFlatNet && (
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#facc15" fontFamily="monospace">
              Jaring-jaring Prisma {cfg.label.toLowerCase()} — {activeN + 2} bidang
            </text>
          )}
          {!isAssembled && !isFlatNet && (
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace">
              {progress < 0.5 ? "Membongkar…" : "Menyatukan…"}
            </text>
          )}
        </svg>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => animateTo(1)}
          disabled={isFlatNet || isAnimating}
          className="text-xs font-bold py-1.5 px-4 rounded-lg border transition-all duration-200 font-body"
          style={{
            borderColor: "#f97316", color: "#f97316", backgroundColor: "transparent",
            opacity: (isFlatNet || isAnimating) ? 0.35 : 1,
          }}>
          📤 Bongkar
        </button>

        <button
          onClick={() => { setRotX(-22); setRotY(32); }}
          disabled={!isAssembled || isAnimating}
          className="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-600 text-slate-400 transition-all duration-200 font-body"
          style={{ opacity: (!isAssembled || isAnimating) ? 0.35 : 1 }}>
          ↺ Reset Rotasi
        </button>

        <button
          onClick={() => animateTo(0)}
          disabled={isAssembled || isAnimating}
          className="text-xs font-bold py-1.5 px-4 rounded-lg border transition-all duration-200 font-body"
          style={{
            borderColor: "#22d3ee", color: "#22d3ee", backgroundColor: "transparent",
            opacity: (isAssembled || isAnimating) ? 0.35 : 1,
          }}>
          📥 Satukan
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[
          { c: "#ef4444", l: "Alas" },
          { c: "#eab308", l: "Tutup" },
          ...RECT_COLORS.slice(0, activeN).map((c, i) => ({ c, l: `Sisi ${i + 1}` })),
        ].map(x => (
          <div key={x.l} className="flex items-center gap-1 text-xs font-body">
            <div className="w-3 h-3 rounded-sm opacity-85" style={{ backgroundColor: x.c }} />
            <span style={{ color: x.c }}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
