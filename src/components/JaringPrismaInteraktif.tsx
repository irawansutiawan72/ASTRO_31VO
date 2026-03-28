import React, { useState, useEffect, useRef, useCallback } from "react";

type V3 = [number, number, number];
type V2 = [number, number];

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
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp2 = (a: V2, b: V2, t: number): V2 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const smoothstep = (lo: number, hi: number, x: number) => easeInOut(clamp01((x - lo) / (hi - lo)));

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

// 2-D "hinge fold" projection:
// Simulates a face rotating around its hinge edge by scaling the perpendicular dimension.
// foldAngle 0 = flat, PI = folded back 180°.
// For a vertical hinge at x=hx: compress x-offsets by cos(angle)
function foldAroundX(v: V2, hx: number, angle: number): V2 {
  const dx = v[0] - hx;
  return [hx + dx * Math.cos(angle), v[1]];
}
// For a horizontal hinge at y=hy: compress y-offsets by cos(angle)
function foldAroundY(v: V2, hy: number, angle: number): V2 {
  const dy = v[1] - hy;
  return [v[0], hy + dy * Math.cos(angle)];
}

const RECT_COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f97316", "#ec4899"];
const R3D = 38;
const H3D = 70;
const SVG_CX = 170;
const SVG_CY = 118;

function makeConfig(n: number) {
  const a    = 2 * R3D * Math.sin(Math.PI / n);
  const inR  = a / (2 * Math.tan(Math.PI / n));
  const capH = inR + R3D;
  const netCY = 22 + capH + H3D / 2;
  const label = n === 3 ? "Segitiga" : n === 4 ? "Segiempat" : "Segilima";
  // dihedral angle between adjacent lateral faces = 360°/n
  const dihedralRad = (2 * Math.PI) / n;
  return { a, h: H3D, netCY, label, dihedralRad };
}

// Per-face unfolding schedule: [delayStart, delayEnd] in global progress [0..1]
// Center rect first, then neighbours in order, then caps last
function getFaceSchedule(n: number, k: number, midK: number): [number, number] {
  const isRect = k < n;
  if (!isRect) {
    // Bottom cap = k===n, Top cap = k===n+1
    return k === n ? [0.50, 0.78] : [0.60, 0.88];
  }
  const dist = Math.abs(k - midK);
  const s = 0.08 + dist * 0.18;
  return [s, s + 0.38];
}

export default function JaringPrismaInteraktif() {
  const [activeN,     setActiveN]     = useState(3);
  const [rotX,        setRotX]        = useState(-22);
  const [rotY,        setRotY]        = useState(32);
  const [progress,    setProgress]    = useState(0); // 0=assembled, 1=net
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging,  setIsDragging]  = useState(false);

  const dragRef     = useRef({ sx: 0, sy: 0, bx: -22, by: 32 });
  const animRef     = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  const cfg     = makeConfig(activeN);
  const { a, h, netCY, dihedralRad } = cfg;
  const stripLeft = SVG_CX - (activeN * a) / 2;
  const y0 = netCY - h / 2;
  const y1 = netCY + h / 2;
  const midK = Math.floor(activeN / 2);

  /* 3-D prism vertices */
  const bot3D: V3[] = Array.from({ length: activeN }, (_, k) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * k) / activeN;
    return [R3D * Math.cos(ang), H3D / 2, R3D * Math.sin(ang)];
  });
  const top3D: V3[] = bot3D.map(([x, , z]) => [x, -H3D / 2, z] as V3);

  const rx = (rotX * Math.PI) / 180;
  const ry = (rotY * Math.PI) / 180;

  const proj3D = (v: V3): V2 => {
    const rv = rotXv(rotYv(v, ry), rx);
    const [px, py] = project(rv);
    return [SVG_CX + px, SVG_CY + py];
  };

  /* ── Compute vertices for each face at current progress ── */
  const getFacePoly = (k: number): V2[] => {
    const isRect = k < activeN;
    const [schedStart, schedEnd] = getFaceSchedule(activeN, k, midK);

    /* ── RECTANGULAR LATERAL FACES ── */
    if (isRect) {
      const kx0   = stripLeft + k * a;
      const kx1   = kx0 + a;
      const netVerts: V2[] = [[kx0, y1], [kx1, y1], [kx1, y0], [kx0, y0]];
      const v3d: V3[]      = [bot3D[k], bot3D[(k + 1) % activeN], top3D[(k + 1) % activeN], top3D[k]];
      const assembled      = v3d.map(proj3D);

      if (progress <= 0) return assembled;

      const isCenter = k === midK;

      if (isCenter) {
        // Centre rect: lerp from 3D directly to flat net position
        const t = smoothstep(schedStart, schedEnd, progress);
        return assembled.map((p, i) => lerp2(p, netVerts[i], t));
      }

      // Side rects: hinge animation
      const isRight = k > midK;
      const hingeX  = isRight ? kx0 : kx1;

      // Phase 1 [0, schedStart]: lerp from assembled-3D to fully-folded hinge position
      const fullyFolded = netVerts.map(v => foldAroundX(v, hingeX, dihedralRad));
      const phase1T = smoothstep(0, Math.max(schedStart, 0.01), progress);
      const lerpedStart = assembled.map((p, i) => lerp2(p, fullyFolded[i], phase1T));

      // Phase 2 [schedStart, schedEnd]: unfold hinge from dihedralRad → 0
      const phase2T  = smoothstep(schedStart, schedEnd, progress);
      const easedT   = easeOut(phase2T);
      const angle    = dihedralRad * (1 - easedT);
      const unfolded = netVerts.map(v => foldAroundX(v, hingeX, angle));

      // Blend between phase1 result and phase2 result
      const blend = smoothstep(schedStart * 0.6, schedStart, progress);
      return lerpedStart.map((p, i) => lerp2(p, unfolded[i], blend));
    }

    /* ── CAP FACES (bottom = k===n, top = k===n+1) ── */
    const isBottom = k === activeN;
    const ngon     = isBottom
      ? ngonFromEdge(activeN, a, stripLeft + midK * a, y1, false)
      : ngonFromEdge(activeN, a, stripLeft + midK * a, y0, true);
    const capNet: V2[] = new Array(activeN);
    for (let i = 0; i < activeN; i++) capNet[(midK + i) % activeN] = ngon[i];
    const cap3D    = isBottom ? bot3D : top3D;
    const assembled = cap3D.map(proj3D);

    if (progress <= 0) return assembled;

    const hingeY  = isBottom ? y1 : y0;
    const CAP_ANGLE = Math.PI / 2;

    // Phase 1: lerp assembled → fully-folded hinge position
    const fullyFolded = capNet.map(v => foldAroundY(v, hingeY, CAP_ANGLE));
    const phase1T = smoothstep(0, Math.max(schedStart, 0.01), progress);
    const lerpedStart = assembled.map((p, i) => lerp2(p, fullyFolded[i], phase1T));

    // Phase 2: unfold hinge 90° → 0°
    const phase2T = smoothstep(schedStart, schedEnd, progress);
    const easedT  = easeOut(phase2T);
    const angle   = CAP_ANGLE * (1 - easedT);
    const unfolded = capNet.map(v => foldAroundY(v, hingeY, angle));

    const blend = smoothstep(schedStart * 0.6, schedStart, progress);
    return lerpedStart.map((p, i) => lerp2(p, unfolded[i], blend));
  };

  /* ── Build all face objects ── */
  const allFaces = Array.from({ length: activeN + 2 }, (_, k) => ({
    k,
    fill:  k < activeN ? RECT_COLORS[k % RECT_COLORS.length] : k === activeN ? "#ef4444" : "#eab308",
    label: k < activeN ? `Sisi ${k + 1}` : k === activeN ? "Alas" : "Tutup",
    v3d:   k < activeN
      ? [bot3D[k], bot3D[(k + 1) % activeN], top3D[(k + 1) % activeN], top3D[k]]
      : k === activeN ? bot3D : top3D,
  }));

  const sorted = allFaces
    .map(f => {
      const poly = getFacePoly(f.k);
      const avgZ = f.v3d.reduce((s, v) => s + rotXv(rotYv(v, ry), rx)[2], 0) / f.v3d.length;
      return { ...f, poly, avgZ };
    })
    .sort((a, b) => b.avgZ - a.avgZ);

  /* ── Animate to target ── */
  const animateTo = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startP = progressRef.current;
    const startT = performance.now();
    const dur    = 1500; // smooth slow animation
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

  /* ── Drag (rotation) handlers ── */
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

  // Subtle shade per face while folding (darker when mid-fold)
  const getFaceOpacity = (k: number): number => {
    if (isAssembled || isFlatNet) return 0.86;
    const [s, e] = getFaceSchedule(activeN, k, midK);
    const lt = smoothstep(s, e, progress);
    // darkest at mid-fold (lt≈0.5), bright at both ends
    return lerp(0.55, 0.86, Math.abs(lt * 2 - 1));
  };

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
            const pts = f.poly.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
            const mx  = f.poly.reduce((s, p) => s + p[0], 0) / f.poly.length;
            const my  = f.poly.reduce((s, p) => s + p[1], 0) / f.poly.length;
            const labelOpacity = Math.max(0, (progress - 0.7) / 0.3);
            const faceOpacity  = getFaceOpacity(f.k);

            return (
              <g key={fi}>
                <polygon
                  points={pts}
                  fill={f.fill}
                  fillOpacity={faceOpacity}
                  stroke="rgba(255,255,255,0.80)"
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  style={{ transition: "fill-opacity 0.05s" }}
                />
                {progress > 0.7 && (
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

          {/* Hinge indicator lines: visible during mid-animation */}
          {progress > 0.05 && progress < 0.95 && (
            <g opacity={Math.min(1, progress * 6, (1 - progress) * 6)}>
              {Array.from({ length: activeN }, (_, k) => {
                const kx = stripLeft + k * a;
                return (
                  <line key={k}
                    x1={kx.toFixed(1)} y1={y0.toFixed(1)}
                    x2={kx.toFixed(1)} y2={y1.toFixed(1)}
                    stroke="rgba(255,255,255,0.22)" strokeWidth={1}
                    strokeDasharray="3,3"
                  />
                );
              })}
              <line
                x1={(stripLeft + midK * a).toFixed(1)} y1={y1.toFixed(1)}
                x2={(stripLeft + (midK + 1) * a).toFixed(1)} y2={y1.toFixed(1)}
                stroke="rgba(255,255,255,0.22)" strokeWidth={1}
                strokeDasharray="3,3"
              />
              <line
                x1={(stripLeft + midK * a).toFixed(1)} y1={y0.toFixed(1)}
                x2={(stripLeft + (midK + 1) * a).toFixed(1)} y2={y0.toFixed(1)}
                stroke="rgba(255,255,255,0.22)" strokeWidth={1}
                strokeDasharray="3,3"
              />
            </g>
          )}

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
