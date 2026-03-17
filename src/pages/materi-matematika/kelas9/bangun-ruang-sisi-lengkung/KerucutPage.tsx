import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Triangle, ChevronDown, ChevronUp } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { playPopSound } from "@/hooks/useAudio";

/* ─────────────────────────────────────────────────────────────
   3D CONE SVG RENDERER — manual projection, painter's algorithm
───────────────────────────────────────────────────────────── */
const SEGS = 28;
const CR = 58;
const CH = 115;
const PD = 480;
const SVG_W = 320;
const SVG_H = 290;
const CX = SVG_W / 2;
const CY = SVG_H / 2 + 10;

function rotPt(x: number, y: number, z: number, rx: number, ry: number) {
  const rxa = (rx * Math.PI) / 180;
  const rya = (ry * Math.PI) / 180;
  const x1 = x * Math.cos(rya) + z * Math.sin(rya);
  const z1 = -x * Math.sin(rya) + z * Math.cos(rya);
  const y2 = y * Math.cos(rxa) - z1 * Math.sin(rxa);
  const z2 = y * Math.sin(rxa) + z1 * Math.cos(rxa);
  return { x: x1, y: y2, z: z2 };
}

function proj(p: { x: number; y: number; z: number }) {
  const s = PD / (PD + p.z + 80);
  return { x: CX + p.x * s, y: CY + p.y * s };
}

const InteractiveCone3D = () => {
  const [rotX, setRotX] = useState(-22);
  const [rotY, setRotY] = useState(28);
  const [isDragging, setIsDragging] = useState(false);
  const [showNet, setShowNet] = useState(false);
  const dragRef = useRef({ sx: 0, sy: 0, brx: -22, bry: 28 });

  const onMD = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { sx: e.clientX, sy: e.clientY, brx: rotX, bry: rotY };
  };
  const onMM = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setRotY(dragRef.current.bry + (e.clientX - dragRef.current.sx) * 0.55);
    setRotX(dragRef.current.brx - (e.clientY - dragRef.current.sy) * 0.55);
  }, [isDragging]);
  const onMU = useCallback(() => setIsDragging(false), []);
  const onTS = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setIsDragging(true);
    dragRef.current = { sx: t.clientX, sy: t.clientY, brx: rotX, bry: rotY };
  };
  const onTM = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    setRotY(dragRef.current.bry + (t.clientX - dragRef.current.sx) * 0.55);
    setRotX(dragRef.current.brx - (t.clientY - dragRef.current.sy) * 0.55);
  }, [isDragging]);
  const onTE = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMM);
    window.addEventListener("mouseup", onMU);
    window.addEventListener("touchmove", onTM, { passive: true });
    window.addEventListener("touchend", onTE);
    return () => {
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("mouseup", onMU);
      window.removeEventListener("touchmove", onTM);
      window.removeEventListener("touchend", onTE);
    };
  }, [onMM, onMU, onTM, onTE]);

  const apex3D = rotPt(0, -CH / 2, 0, rotX, rotY);
  const apex2D = proj(apex3D);

  const baseVerts = Array.from({ length: SEGS }, (_, i) => {
    const a = (2 * Math.PI * i) / SEGS;
    return rotPt(Math.cos(a) * CR, CH / 2, Math.sin(a) * CR, rotX, rotY);
  });
  const baseVerts2D = baseVerts.map(proj);

  type Panel = {
    avgZ: number;
    visible: boolean;
    fill: string;
    stroke: string;
    points: string;
  };

  const panels: Panel[] = Array.from({ length: SEGS }, (_, i) => {
    const ni = (i + 1) % SEGS;
    const v0 = baseVerts[i];
    const v1 = baseVerts[ni];
    const p0 = baseVerts2D[i];
    const p1 = baseVerts2D[ni];
    const dx0 = v1.x - v0.x;
    const dy0 = v1.y - v0.y;
    const dz0 = v1.z - v0.z;
    const dx1 = apex3D.x - v0.x;
    const dy1 = apex3D.y - v0.y;
    const dz1 = apex3D.z - v0.z;
    const nz = dx0 * dy1 - dy0 * dx1;
    const visible = nz < 0;
    const avgZ = (v0.z + v1.z + apex3D.z) / 3;
    const t = (i / SEGS);
    const hue = Math.floor(t * 60) + 180;
    return {
      avgZ,
      visible,
      fill: `hsla(${hue},80%,55%,${visible ? 0.88 : 0})`,
      stroke: visible ? "#ffffff55" : "none",
      points: `${p0.x},${p0.y} ${p1.x},${p1.y} ${apex2D.x},${apex2D.y}`,
    };
  });

  const sortedPanels = [...panels].sort((a, b) => b.avgZ - a.avgZ);

  const basePolyPoints = baseVerts2D.map(p => `${p.x},${p.y}`).join(" ");
  const baseAvgZ = baseVerts.reduce((s, v) => s + v.z, 0) / SEGS;

  const slantR = Math.sqrt(CR * CR + (CH / 2) * (CH / 2));
  const baseVisible = rotX < 10;

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 space-y-4">
      <p className="text-white/60 text-xs text-center font-body">
        Drag untuk memutar · Klik tombol untuk melihat jaring-jaring
      </p>

      {!showNet ? (
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: SVG_W, display: "block", margin: "0 auto", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={onMD}
          onTouchStart={onTS}
        >
          {sortedPanels.map((p, i) =>
            p.visible && (
              <polygon key={i} points={p.points} fill={p.fill} stroke={p.stroke} strokeWidth="0.8" />
            )
          )}
          {baseAvgZ > apex3D.z || baseVisible ? (
            <polygon points={basePolyPoints} fill="rgba(99,102,241,0.75)" stroke="#a5b4fc" strokeWidth="1.2" />
          ) : null}
          {sortedPanels.map((p, i) =>
            !p.visible && (
              <polygon key={`b${i}`} points={p.points} fill="rgba(100,150,200,0.06)" stroke="#ffffff15" strokeWidth="0.5" />
            )
          )}
          <circle cx={apex2D.x} cy={apex2D.y} r="5" fill="#facc15" opacity="0.9" />
          <text x={apex2D.x + 8} y={apex2D.y + 4} fill="#facc15" fontSize="10" fontFamily="monospace" fontWeight="bold">T (puncak)</text>
          <text x="10" y={SVG_H - 12} fill="#94a3b8" fontSize="9" fontFamily="monospace">r={CR}px  t={CH}px</text>
          <text x={SVG_W - 80} y={SVG_H - 12} fill="#22d3ee" fontSize="9" fontFamily="monospace">s=√(r²+t²)</text>
        </svg>
      ) : (
        <svg viewBox="0 0 340 300" width="100%" style={{ maxWidth: 340, display: "block", margin: "0 auto" }}>
          <defs>
            <style>{`
              @keyframes netGlow{0%,100%{opacity:1;}50%{opacity:0.65;}}
              .ng{animation:netGlow 2s ease-in-out infinite;}
            `}</style>
          </defs>
          <g transform="translate(180,150)">
            {/* Sector (selimut kerucut) */}
            {(() => {
              const sR = 115;
              const theta = (CR / sR) * 2 * Math.PI;
              const tDeg = (CR / sR) * 360;
              const x1 = sR * Math.sin(-theta / 2);
              const y1 = -sR * Math.cos(-theta / 2);
              const x2 = sR * Math.sin(theta / 2);
              const y2 = -sR * Math.cos(theta / 2);
              const lg = theta > Math.PI ? 1 : 0;
              return (
                <g>
                  <path
                    d={`M 0,0 L ${x1},${y1} A ${sR},${sR} 0 ${lg},1 ${x2},${y2} Z`}
                    fill="rgba(6,182,212,0.35)" stroke="#22d3ee" strokeWidth="2" className="ng"
                  />
                  <text x="0" y="-60" fill="#22d3ee" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SELIMUT</text>
                  <text x="0" y="-46" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">(juring lingkaran, r=s)</text>
                  <line x1="0" y1="0" x2={x1} y2={y1} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="5,3"/>
                  <text x={x1 / 2 - 18} y={y1 / 2} fill="#facc15" fontSize="9" fontFamily="monospace">s</text>
                </g>
              );
            })()}
          </g>
          {/* Base circle */}
          <circle cx="64" cy="245" r="42" fill="rgba(99,102,241,0.35)" stroke="#a5b4fc" strokeWidth="2" className="ng"/>
          <text x="64" y="248" fill="#a5b4fc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ALAS</text>
          <text x="64" y="260" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">(lingkaran, r=r)</text>
          <text x="64" y="272" fill="#facc15" fontSize="9" fontFamily="monospace" textAnchor="middle">r</text>
          <text x="170" y="295" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Jaring-jaring Kerucut: Alas (lingkaran) + Selimut (juring)</text>
        </svg>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { playPopSound(); setShowNet(false); }}
          className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors cursor-pointer font-body ${!showNet ? "bg-cyan-700/60 border-cyan-500 text-cyan-200" : "bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700/60"}`}
        >
          🔺 Kerucut 3D
        </button>
        <button
          onClick={() => { playPopSound(); setShowNet(true); setRotX(-22); setRotY(28); }}
          className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors cursor-pointer font-body ${showNet ? "bg-indigo-700/60 border-indigo-500 text-indigo-200" : "bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700/60"}`}
        >
          📋 Jaring-jaring
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center text-[10px] font-body">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(180,80%,55%)" }}/><span className="text-white/50">Selimut</span></span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-indigo-400"/><span className="text-white/50">Alas</span></span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block bg-yellow-400"/><span className="text-white/50">Puncak (T)</span></span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ANIMATED SVGs — UNSUR-UNSUR KERUCUT
───────────────────────────────────────────────────────────── */
const UnsurSVG = () => (
  <svg viewBox="0 0 300 240" className="w-full max-w-sm mx-auto my-2" aria-label="Unsur-unsur kerucut">
    <defs>
      <style>{`
        @keyframes kerGlow{0%,100%{stroke-opacity:1;filter:drop-shadow(0 0 5px currentColor);}50%{stroke-opacity:0.3;}}
        @keyframes kerPulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .kr{animation:kerGlow 1.5s ease-in-out infinite;}
        .kp{animation:kerPulse 1.6s ease-in-out infinite;}
      `}</style>
      <radialGradient id="coneGrad" cx="40%" cy="30%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#0e7490" stopOpacity="0.2"/>
      </radialGradient>
    </defs>
    {/* Cone body */}
    <polygon points="150,20 60,200 240,200" fill="url(#coneGrad)" stroke="#22d3ee" strokeWidth="2"/>
    {/* Base ellipse */}
    <ellipse cx="150" cy="200" rx="90" ry="20" fill="rgba(99,102,241,0.35)" stroke="#a5b4fc" strokeWidth="1.8"/>
    {/* Apex dot */}
    <circle cx="150" cy="20" r="5" fill="#facc15" className="kp"/>
    {/* Height (tinggi) */}
    <line x1="150" y1="20" x2="150" y2="200" stroke="#f97316" strokeWidth="2.5" strokeDasharray="7,4" className="kr" style={{color:"#f97316"}}/>
    <text x="156" y="115" fill="#f97316" fontSize="11" fontFamily="monospace" fontWeight="bold">t</text>
    {/* Radius (jari-jari) */}
    <line x1="150" y1="200" x2="240" y2="200" stroke="#4ade80" strokeWidth="2.5" className="kr" style={{color:"#4ade80"}}/>
    <text x="190" y="195" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold">r</text>
    {/* Slant height (garis pelukis) */}
    <line x1="150" y1="20" x2="240" y2="200" stroke="#f87171" strokeWidth="2.5" strokeDasharray="6,3" className="kr" style={{color:"#f87171"}}/>
    <text x="204" y="105" fill="#f87171" fontSize="11" fontFamily="monospace" fontWeight="bold">s</text>
    {/* Labels */}
    <text x="8" y="30" fill="#facc15" fontSize="10" fontFamily="monospace">T = puncak</text>
    <text x="8" y="48" fill="#f97316" fontSize="10" fontFamily="monospace">t = tinggi</text>
    <text x="8" y="64" fill="#4ade80" fontSize="10" fontFamily="monospace">r = jari-jari</text>
    <text x="8" y="80" fill="#f87171" fontSize="10" fontFamily="monospace">s = garis pelukis</text>
    <text x="8" y="96" fill="#a5b4fc" fontSize="10" fontFamily="monospace">O = pusat alas</text>
    <circle cx="150" cy="200" r="4" fill="#a5b4fc" className="kp"/>
    <text x="155" y="215" fill="#a5b4fc" fontSize="9" fontFamily="monospace">O</text>
    <text x="148" y="15" fill="#facc15" fontSize="9" fontFamily="monospace">T</text>
  </svg>
);

const GarisPelukisSVG = () => (
  <svg viewBox="0 0 300 240" className="w-full max-w-sm mx-auto my-2" aria-label="Garis pelukis kerucut">
    <defs>
      <style>{`
        @keyframes gpAnim{0%,100%{stroke-opacity:1;filter:drop-shadow(0 0 7px #f87171);}50%{stroke-opacity:0.2;}}
        .gp{animation:gpAnim 1.5s ease-in-out infinite;}
      `}</style>
    </defs>
    {/* Cone outline */}
    <polygon points="150,25 65,200 235,200" fill="rgba(6,182,212,0.1)" stroke="#334155" strokeWidth="1.5"/>
    <ellipse cx="150" cy="200" rx="85" ry="18" fill="rgba(99,102,241,0.18)" stroke="#475569" strokeWidth="1.2"/>
    {/* Right triangle formed by t, r, s */}
    <line x1="150" y1="25" x2="150" y2="200" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3"/>
    <line x1="150" y1="200" x2="235" y2="200" stroke="#4ade80" strokeWidth="2"/>
    <line x1="150" y1="25" x2="235" y2="200" stroke="#f87171" strokeWidth="3" className="gp"/>
    {/* Right angle mark */}
    <polyline points="150,185 165,185 165,200" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
    {/* Labels */}
    <text x="156" y="115" fill="#f97316" fontSize="12" fontFamily="monospace" fontWeight="bold">t</text>
    <text x="188" y="196" fill="#4ade80" fontSize="12" fontFamily="monospace" fontWeight="bold">r</text>
    <text x="202" y="105" fill="#f87171" fontSize="12" fontFamily="monospace" fontWeight="bold">s</text>
    <text x="60" y="155" fill="#facc15" fontSize="11" fontFamily="monospace">s² = r² + t²</text>
    <text x="60" y="170" fill="#facc15" fontSize="11" fontFamily="monospace">s = √(r² + t²)</text>
  </svg>
);

const LuasKerucutSVG = () => (
  <svg viewBox="0 0 340 210" className="w-full max-w-sm mx-auto my-2" aria-label="Luas permukaan kerucut">
    <defs>
      <style>{`
        @keyframes lkAnim{0%,100%{fill-opacity:0.75;}50%{fill-opacity:0.2;}}
        .lk1{animation:lkAnim 2s ease-in-out infinite;}
        .lk2{animation:lkAnim 2s ease-in-out infinite 0.7s;}
      `}</style>
    </defs>
    {/* Selimut (sector) */}
    <path d="M 100,90 L 15,200 A 105,105 0 0,1 185,200 Z" fill="#06b6d4" className="lk1" stroke="#22d3ee" strokeWidth="1.5"/>
    <text x="97" y="165" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SELIMUT</text>
    <text x="97" y="178" fill="#e0f2fe" fontSize="9" fontFamily="monospace" textAnchor="middle">πrs</text>
    {/* Alas (circle) */}
    <circle cx="265" cy="155" r="48" fill="#6366f1" className="lk2" stroke="#a5b4fc" strokeWidth="1.5"/>
    <text x="265" y="158" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ALAS</text>
    <text x="265" y="171" fill="#e0e7ff" fontSize="9" fontFamily="monospace" textAnchor="middle">πr²</text>
    {/* Formula */}
    <text x="170" y="28" fill="#facc15" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">L = πr² + πrs</text>
    <text x="170" y="46" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">= πr(r + s)</text>
  </svg>
);

const VolumeKerucutSVG = () => (
  <svg viewBox="0 0 300 260" className="w-full max-w-sm mx-auto my-2" aria-label="Volume kerucut">
    <defs>
      <style>{`
        @keyframes vkGlow{0%,100%{fill-opacity:0.85;filter:drop-shadow(0 0 12px #7c3aed);}50%{fill-opacity:0.5;filter:drop-shadow(0 0 3px #4c1d95);}}
        @keyframes vkPulse{0%,100%{opacity:1;}50%{opacity:0.55;}}
        .vk{animation:vkGlow 2.2s ease-in-out infinite;}
        .vkp{animation:vkPulse 2.2s ease-in-out infinite;}
      `}</style>
      <radialGradient id="volConeGrad" cx="35%" cy="25%">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.7"/>
      </radialGradient>
    </defs>
    {/* Cone */}
    <polygon points="150,30 55,210 245,210" fill="url(#volConeGrad)" className="vk" stroke="#c4b5fd" strokeWidth="2"/>
    <ellipse cx="150" cy="210" rx="95" ry="21" fill="rgba(99,102,241,0.6)" stroke="#a5b4fc" strokeWidth="1.8" className="vk"/>
    {/* Height arrow */}
    <line x1="150" y1="30" x2="150" y2="210" stroke="#f97316" strokeWidth="2" strokeDasharray="7,4" opacity="0.8"/>
    <text x="158" y="128" fill="#f97316" fontSize="11" fontFamily="monospace" fontWeight="bold" className="vkp">t</text>
    {/* r arrow */}
    <line x1="150" y1="210" x2="245" y2="210" stroke="#4ade80" strokeWidth="2" opacity="0.8"/>
    <text x="193" y="205" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold" className="vkp">r</text>
    {/* Formula */}
    <text x="150" y="250" fill="#e0e7ff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle" className="vkp">
      V = ⅓πr²t
    </text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────────────────────── */
type Sec = { title: string; icon: string; content: React.ReactNode };

const sections: Sec[] = [
  {
    title: "Definisi Kerucut",
    icon: "🔺",
    content: (
      <div className="space-y-3 text-sm text-white/85 font-body leading-relaxed">
        <p>
          <strong className="text-cyan-300">Kerucut</strong> adalah bangun ruang sisi lengkung yang terbentuk dari
          sebuah <strong className="text-yellow-300">alas berbentuk lingkaran</strong> dan sebuah{" "}
          <strong className="text-yellow-300">selimut melengkung</strong> yang semakin mengecil hingga bertemu di satu titik
          yang disebut <strong className="text-yellow-300">puncak (titik apex)</strong>. Bayangkan topi ulang tahun, wafer es krim,
          atau tanda lalu lintas berbentuk kerucut!
        </p>
        <div className="bg-cyan-950/60 border border-cyan-700/50 rounded-lg p-4 space-y-2">
          <p className="text-cyan-300 font-semibold">📌 Sifat-sifat Kerucut:</p>
          <ul className="space-y-1 text-xs text-white/75">
            <li>• Memiliki <strong className="text-yellow-300">1 sisi lengkung</strong> (selimut) dan <strong className="text-yellow-300">1 sisi datar</strong> (alas lingkaran)</li>
            <li>• Memiliki <strong className="text-yellow-300">1 titik puncak (apex)</strong> dan <strong className="text-yellow-300">1 rusuk lengkung</strong> (keliling alas)</li>
            <li>• Jari-jari alas dilambangkan <InlineMath math="r" /></li>
            <li>• Tinggi kerucut (jarak puncak ke pusat alas) dilambangkan <InlineMath math="t" /></li>
            <li>• Garis pelukis (jarak puncak ke titik tepi alas) dilambangkan <InlineMath math="s" /></li>
          </ul>
        </div>
        <blockquote className="border-l-4 border-cyan-500 pl-3 text-cyan-200 text-xs italic">
          💡 <strong>Kerucut vs Tabung:</strong> Keduanya punya alas lingkaran, tapi tabung punya dua alas dan tinggi seragam,
          sedangkan kerucut hanya punya satu alas dan meruncing ke atas!
        </blockquote>
      </div>
    ),
  },
  {
    title: "Unsur-unsur Kerucut (Interaktif)",
    icon: "🔍",
    content: (
      <div className="space-y-5 text-sm text-white/85 font-body leading-relaxed">
        <UnsurSVG />
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-yellow-950/40 border border-yellow-700/40 rounded-lg p-3 space-y-1">
            <p className="text-yellow-300 font-semibold">① Puncak / Apex (T)</p>
            <p className="text-xs text-white/70">Titik ujung runcing kerucut tempat semua garis pelukis bertemu. Hanya ada <strong>1 puncak</strong>.</p>
          </div>
          <div className="bg-orange-950/40 border border-orange-700/40 rounded-lg p-3 space-y-1">
            <p className="text-orange-300 font-semibold">② Tinggi (<InlineMath math="t" />)</p>
            <p className="text-xs text-white/70">Jarak tegak lurus dari puncak ke pusat alas lingkaran. Merupakan <strong>sumbu kerucut</strong>.</p>
          </div>
          <div className="bg-green-950/40 border border-green-700/40 rounded-lg p-3 space-y-1">
            <p className="text-green-300 font-semibold">③ Jari-jari Alas (<InlineMath math="r" />)</p>
            <p className="text-xs text-white/70">Jari-jari lingkaran alas kerucut. Juga merupakan kaki segitiga siku-siku bersama tinggi dan garis pelukis.</p>
          </div>
          <div className="bg-red-950/40 border border-red-700/40 rounded-lg p-3 space-y-1">
            <p className="text-red-300 font-semibold">④ Garis Pelukis / Apotema (<InlineMath math="s" />)</p>
            <p className="text-xs text-white/70">Garis dari puncak ke titik mana saja di tepi lingkaran alas. Semua garis pelukis sama panjang.</p>
            <div className="bg-slate-800/60 rounded p-2 text-center">
              <BlockMath math="s = \sqrt{r^2 + t^2}" />
            </div>
          </div>
          <div className="bg-indigo-950/40 border border-indigo-700/40 rounded-lg p-3 space-y-1">
            <p className="text-indigo-300 font-semibold">⑤ Alas (Lingkaran)</p>
            <p className="text-xs text-white/70">Satu-satunya sisi datar kerucut berbentuk lingkaran dengan jari-jari <InlineMath math="r" />. Luas alas = <InlineMath math="\pi r^2" />.</p>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-700/40 rounded-lg p-3 space-y-1">
            <p className="text-cyan-300 font-semibold">⑥ Selimut (Sisi Lengkung)</p>
            <p className="text-xs text-white/70">Bidang lengkung yang menghubungkan tepi alas ke puncak. Jika dibuka, berbentuk <strong>juring (sektor) lingkaran</strong> dengan jari-jari = <InlineMath math="s" />.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs text-center">
            <thead><tr className="bg-slate-800">
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700 text-left">Unsur</th>
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700">Simbol</th>
              <th className="px-3 py-2 text-cyan-300">Keterangan</th>
            </tr></thead>
            <tbody>
              {[
                ["Puncak","T","1 buah titik"],
                ["Tinggi","t","puncak → pusat alas"],
                ["Jari-jari alas","r","lingkaran alas"],
                ["Garis pelukis","s","puncak → tepi alas"],
                ["Alas","—","lingkaran, luas = πr²"],
                ["Selimut","—","juring lingkaran, r = s"],
              ].map(([u,s,k],i)=>(
                <tr key={i} className={`border-t border-slate-700 ${i%2===0?"bg-slate-900/40":"bg-slate-800/30"}`}>
                  <td className="px-3 py-2 text-white/90 font-semibold border-r border-slate-700 text-left">{u}</td>
                  <td className="px-3 py-2 text-yellow-300 border-r border-slate-700 font-mono">{s}</td>
                  <td className="px-3 py-2 text-white/60 text-left">{k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "Jaring-jaring Kerucut",
    icon: "📋",
    content: (
      <div className="space-y-4 text-sm text-white/85 font-body leading-relaxed">
        <p>
          Kalau kerucut "dikupas" dan dibentangkan di permukaan datar, akan terbentuk{" "}
          <strong className="text-cyan-300">jaring-jaring kerucut</strong> yang terdiri dari <strong>2 bagian</strong>:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-center space-y-1">
            <p className="text-cyan-300 font-semibold text-xs">① Selimut</p>
            <p className="text-white/60 text-xs">Juring lingkaran dengan jari-jari = <InlineMath math="s" /></p>
            <p className="text-cyan-200 text-xs">Sudut juring = <InlineMath math="\frac{r}{s} \times 360°" /></p>
          </div>
          <div className="bg-indigo-950/50 border border-indigo-700/40 rounded-lg p-3 text-center space-y-1">
            <p className="text-indigo-300 font-semibold text-xs">② Alas</p>
            <p className="text-white/60 text-xs">Lingkaran dengan jari-jari = <InlineMath math="r" /></p>
            <p className="text-indigo-200 text-xs">Keliling = <InlineMath math="2\pi r" /></p>
          </div>
        </div>
        <InteractiveCone3D />
        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-3 text-xs text-slate-300 space-y-1">
          <p>🔑 <strong className="text-white">Hubungan penting:</strong> Arc selimut = Keliling alas</p>
          <p>Arc juring = <InlineMath math="2\pi r" /> → Sudut juring = <InlineMath math="\dfrac{r}{s} \times 360°" /></p>
        </div>
        <blockquote className="border-l-4 border-yellow-500 pl-3 text-yellow-200 text-xs italic">
          💡 Cek: Keliling alas lingkaran harus sama dengan panjang busur juring selimut!
        </blockquote>
      </div>
    ),
  },
  {
    title: "Rumus Garis Pelukis (Apotema)",
    icon: "📐",
    content: (
      <div className="space-y-4 text-sm text-white/85 font-body leading-relaxed">
        <p>
          Garis pelukis, tinggi, dan jari-jari alas membentuk <strong className="text-cyan-300">segitiga siku-siku</strong> di pusat alas.
          Dengan Teorema Pythagoras, kita dapat mencari salah satu unsur jika dua lainnya diketahui.
        </p>
        <GarisPelukisSVG />
        <div className="bg-red-950/50 border border-red-700/40 rounded-lg p-4 space-y-3">
          <p className="text-red-300 font-semibold">📌 Penurunan Rumus Garis Pelukis:</p>
          <p className="text-xs text-white/70">Karena OT (tinggi) tegak lurus OA (jari-jari), maka segitiga TOA siku-siku di O:</p>
          <div className="bg-slate-800/60 rounded p-3">
            <BlockMath math="s^2 = r^2 + t^2" />
            <BlockMath math="\boxed{s = \sqrt{r^2 + t^2}}" />
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-3 text-xs text-slate-300 space-y-1">
          <p>🎯 <strong className="text-white">Dari rumus ini kita bisa cari:</strong></p>
          <p>• Jika tahu <InlineMath math="r" /> dan <InlineMath math="t" /> → cari <InlineMath math="s = \sqrt{r^2+t^2}" /></p>
          <p>• Jika tahu <InlineMath math="s" /> dan <InlineMath math="t" /> → cari <InlineMath math="r = \sqrt{s^2-t^2}" /></p>
          <p>• Jika tahu <InlineMath math="s" /> dan <InlineMath math="r" /> → cari <InlineMath math="t = \sqrt{s^2-r^2}" /></p>
        </div>
      </div>
    ),
  },
  {
    title: "Luas Permukaan Kerucut",
    icon: "🎨",
    content: (
      <div className="space-y-3 text-sm text-white/85 font-body leading-relaxed">
        <p>
          <strong className="text-orange-300">Luas permukaan kerucut</strong> adalah jumlah total luas selimut dan luas alas.
          Bayangkan kamu ingin melapis seluruh permukaan topi ulang tahun — berapa luas kertas yang dibutuhkan?
        </p>
        <LuasKerucutSVG />
        <div className="bg-orange-950/60 border border-orange-700/50 rounded-lg p-4 space-y-3">
          <p className="text-orange-300 font-semibold">📌 Penurunan Rumus:</p>
          <div className="text-xs text-white/70 space-y-1">
            <p>• <strong>Luas selimut</strong> = luas juring dengan jari-jari <InlineMath math="s" /> dan busur <InlineMath math="2\pi r" /></p>
            <p>• <strong>Luas juring</strong> = <InlineMath math="\frac{\text{busur}}{\text{keliling}} \times \pi s^2 = \frac{2\pi r}{2\pi s} \times \pi s^2 = \pi r s" /></p>
            <p>• <strong>Luas alas</strong> = <InlineMath math="\pi r^2" /></p>
          </div>
          <div className="bg-slate-800/60 rounded p-3">
            <BlockMath math="L = \pi r s + \pi r^2" />
            <BlockMath math="\boxed{L = \pi r(r + s)}" />
          </div>
          <p className="text-white/60 text-xs">Di mana <InlineMath math="s = \sqrt{r^2 + t^2}" /> adalah garis pelukis.</p>
        </div>
        <blockquote className="border-l-4 border-orange-500 pl-3 text-orange-200 text-xs italic">
          💡 <strong>Ingat:</strong> Jika soal hanya menanyakan luas selimut saja (tanpa alas), gunakan <InlineMath math="L_{\text{selimut}} = \pi r s" />.
        </blockquote>
      </div>
    ),
  },
  {
    title: "Volume Kerucut",
    icon: "📦",
    content: (
      <div className="space-y-3 text-sm text-white/85 font-body leading-relaxed">
        <p>
          <strong className="text-blue-300">Volume kerucut</strong> adalah besar ruang yang ditempati kerucut.
          Fakta menarik: volume kerucut tepat <strong className="text-yellow-300">⅓ dari volume tabung</strong> yang memiliki alas dan tinggi yang sama!
        </p>
        <VolumeKerucutSVG />
        <div className="bg-blue-950/60 border border-blue-700/50 rounded-lg p-4 space-y-3">
          <p className="text-blue-300 font-semibold">📌 Penurunan Rumus:</p>
          <div className="text-xs text-white/70 space-y-1">
            <p>• Volume tabung (alas & tinggi sama) = <InlineMath math="\pi r^2 t" /></p>
            <p>• Secara eksperimen & integral, kerucut = <InlineMath math="\frac{1}{3}" /> × volume tabung</p>
          </div>
          <div className="bg-slate-800/60 rounded p-3">
            <BlockMath math="\boxed{V = \frac{1}{3} \pi r^2 t}" />
          </div>
          <p className="text-white/60 text-xs"><InlineMath math="r" /> = jari-jari alas, <InlineMath math="t" /> = tinggi kerucut</p>
        </div>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-xs space-y-1">
          <p className="text-cyan-300 font-semibold">🚀 Hubungan Volume:</p>
          <p className="text-white/70"><InlineMath math="V_{\text{kerucut}} = \frac{1}{3} \times V_{\text{tabung}}" /></p>
          <p className="text-white/70">Artinya, 3 kerucut = 1 tabung (dengan r dan t yang sama)!</p>
        </div>
      </div>
    ),
  },
  {
    title: "Kesimpulan — Rumus Lengkap Kerucut",
    icon: "📊",
    content: (
      <div className="space-y-3 font-body">
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs text-center">
            <thead><tr className="bg-slate-800">
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700 text-left">Besaran</th>
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700">Rumus</th>
              <th className="px-3 py-2 text-cyan-300">Catatan</th>
            </tr></thead>
            <tbody>
              {[
                ["Garis pelukis","s = √(r² + t²)","Pythagoras"],
                ["Keliling alas","K = 2πr","lingkaran"],
                ["Luas alas","L_alas = πr²","lingkaran"],
                ["Luas selimut","L_selimut = πrs","juring"],
                ["Luas permukaan","L = πr(r + s)","alas + selimut"],
                ["Volume","V = ⅓πr²t","1/3 tabung"],
              ].map(([b,r,c],i)=>(
                <tr key={i} className={`border-t border-slate-700 ${i%2===0?"bg-slate-900/40":"bg-slate-800/30"}`}>
                  <td className="px-3 py-2 text-white/90 font-semibold border-r border-slate-700 text-left">{b}</td>
                  <td className="px-3 py-2 text-yellow-300 font-mono border-r border-slate-700">{r}</td>
                  <td className="px-3 py-2 text-white/55 text-left">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-xs text-cyan-200 space-y-1">
          <p>🚀 <strong>Kunci utama:</strong> Tiga variabel yang saling berkaitan: <strong className="text-yellow-300">r, t, dan s</strong>.</p>
          <p>Selalu cari dulu <InlineMath math="s = \sqrt{r^2+t^2}" /> sebelum menghitung luas permukaan!</p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   EXAMPLE PROBLEMS
───────────────────────────────────────────────────────────── */
type Ex = { level: string; color: string; bg: string; border: string; badgeBg: string; question: React.ReactNode; answer: React.ReactNode };

const gpExamples: Ex[] = [
  {
    level: "MUDAH", color: "text-green-400", bg: "bg-green-950/30", border: "border-green-700/50", badgeBg: "bg-green-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah kerucut memiliki jari-jari alas <InlineMath math="6 \text{ cm}" /> dan tinggi <InlineMath math="8 \text{ cm}" />.</p>
        <p>Tentukan panjang garis pelukisnya!</p>
      </div>
    ),
    answer: (
      <div className="space-y-2 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3">
          <BlockMath math="s = \sqrt{r^2 + t^2} = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10 \text{ cm}" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-2">
          <p className="text-green-300 font-semibold text-xs">✅ Garis pelukis = <InlineMath math="10 \text{ cm}" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah kerucut memiliki garis pelukis <InlineMath math="13 \text{ cm}" /> dan jari-jari alas <InlineMath math="5 \text{ cm}" />.</p>
        <p>Tentukan: (a) tinggi kerucut, (b) luas selimut. (Gunakan <InlineMath math="\pi = 3{,}14" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-yellow-400 font-semibold">(a) Tinggi kerucut:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3">
          <BlockMath math="t = \sqrt{s^2 - r^2} = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = \sqrt{144} = 12 \text{ cm}" />
        </div>
        <p className="text-yellow-400 font-semibold">(b) Luas selimut:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3">
          <BlockMath math="L_{\text{selimut}} = \pi r s = 3{,}14 \times 5 \times 13 = 204{,}1 \text{ cm}^2" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-2 text-xs">
          <p className="text-yellow-300 font-semibold">✅ Tinggi = 12 cm, Luas selimut = 204,1 cm²</p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah topi ulang tahun berbentuk kerucut memiliki keliling alas <InlineMath math="44 \text{ cm}" /> dan garis pelukis <InlineMath math="25 \text{ cm}" />.</p>
        <p>Tentukan: (a) jari-jari alas, (b) tinggi topi, (c) volume topi. (Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold">Langkah 1 — Cari jari-jari dari keliling:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="K = 2\pi r \Rightarrow 44 = 2 \times \frac{22}{7} \times r" />
          <BlockMath math="r = \frac{44 \times 7}{2 \times 22} = \frac{308}{44} = 7 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 2 — Cari tinggi:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 3 — Volume topi:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 7^2 \times 24" />
          <BlockMath math="= \frac{1}{3} \times \frac{22}{7} \times 49 \times 24 = \frac{1}{3} \times 22 \times 7 \times 24 = \frac{3.696}{3} = 1.232 \text{ cm}^3" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-3 text-xs space-y-0.5">
          <p className="text-red-300 font-semibold">✅ Jawaban:</p>
          <p className="text-white/80">• Jari-jari = <strong className="text-yellow-300">7 cm</strong></p>
          <p className="text-white/80">• Tinggi topi = <strong className="text-yellow-300">24 cm</strong></p>
          <p className="text-white/80">• Volume = <strong className="text-yellow-300">1.232 cm³</strong></p>
        </div>
      </div>
    ),
  },
];

const luasExamples: Ex[] = [
  {
    level: "MUDAH", color: "text-green-400", bg: "bg-green-950/30", border: "border-green-700/50", badgeBg: "bg-green-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah kerucut memiliki jari-jari <InlineMath math="7 \text{ cm}" /> dan garis pelukis <InlineMath math="25 \text{ cm}" />.</p>
        <p>Hitung luas permukaan kerucut tersebut! (Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-2 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 space-y-2">
          <BlockMath math="L = \pi r (r + s) = \frac{22}{7} \times 7 \times (7 + 25)" />
          <BlockMath math="= 22 \times 32 = 704 \text{ cm}^2" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-2">
          <p className="text-green-300 font-semibold text-xs">✅ Luas permukaan = <InlineMath math="704 \text{ cm}^2" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah corong berbentuk kerucut (tanpa alas) memiliki diameter <InlineMath math="20 \text{ cm}" /> dan tinggi <InlineMath math="24 \text{ cm}" />.</p>
        <p>Berapa luas selimut corong tersebut? (Gunakan <InlineMath math="\pi = 3{,}14" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-yellow-400 font-semibold">Langkah 1 — Tentukan r dan cari s:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <p className="text-white/70"><InlineMath math="r = \frac{d}{2} = \frac{20}{2} = 10 \text{ cm}" /></p>
          <BlockMath math="s = \sqrt{r^2+t^2} = \sqrt{10^2+24^2} = \sqrt{100+576} = \sqrt{676} = 26 \text{ cm}" />
        </div>
        <p className="text-yellow-400 font-semibold">Langkah 2 — Hitung luas selimut:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="L_{\text{selimut}} = \pi r s = 3{,}14 \times 10 \times 26 = 816{,}4 \text{ cm}^2" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-2">
          <p className="text-yellow-300 font-semibold text-xs">✅ Luas selimut corong = <strong>816,4 cm²</strong></p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah pabrik membuat wadah es krim berbentuk kerucut dari kertas karton. Luas selimut kerucut adalah <InlineMath math="550 \text{ cm}^2" /> dan jari-jari alas <InlineMath math="7 \text{ cm}" />.</p>
        <p>Tentukan: (a) garis pelukis, (b) tinggi kerucut, (c) luas permukaan total. (Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold">(a) Cari garis pelukis dari luas selimut:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="\pi r s = 550 \Rightarrow \frac{22}{7} \times 7 \times s = 550" />
          <BlockMath math="22s = 550 \Rightarrow s = 25 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">(b) Cari tinggi kerucut:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625-49} = \sqrt{576} = 24 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">(c) Luas permukaan total:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="L = \pi r s + \pi r^2 = 550 + \frac{22}{7} \times 49 = 550 + 154 = 704 \text{ cm}^2" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-3 text-xs space-y-0.5">
          <p className="text-red-300 font-semibold">✅ Jawaban:</p>
          <p className="text-white/80">• Garis pelukis = <strong className="text-yellow-300">25 cm</strong></p>
          <p className="text-white/80">• Tinggi = <strong className="text-yellow-300">24 cm</strong></p>
          <p className="text-white/80">• Luas permukaan = <strong className="text-yellow-300">704 cm²</strong></p>
        </div>
      </div>
    ),
  },
];

const volExamples: Ex[] = [
  {
    level: "MUDAH", color: "text-green-400", bg: "bg-green-950/30", border: "border-green-700/50", badgeBg: "bg-green-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah kerucut memiliki jari-jari <InlineMath math="9 \text{ cm}" /> dan tinggi <InlineMath math="14 \text{ cm}" />.</p>
        <p>Hitung volume kerucut tersebut! (Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-2 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3">
          <BlockMath math="V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 9^2 \times 14" />
          <BlockMath math="= \frac{1}{3} \times \frac{22}{7} \times 81 \times 14 = \frac{1}{3} \times 22 \times 81 \times 2 = \frac{3.564}{3} = 1.188 \text{ cm}^3" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-2">
          <p className="text-green-300 font-semibold text-xs">✅ Volume = <InlineMath math="1.188 \text{ cm}^3" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Volume sebuah kerucut adalah <InlineMath math="1.540 \text{ cm}^3" />. Jika tingginya <InlineMath math="30 \text{ cm}" />,</p>
        <p>tentukan jari-jari dan keliling alasnya! (Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-yellow-400 font-semibold">Langkah 1 — Cari jari-jari:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="V = \frac{1}{3}\pi r^2 t \Rightarrow 1.540 = \frac{1}{3} \times \frac{22}{7} \times r^2 \times 30" />
          <BlockMath math="1.540 = \frac{22 \times 30}{21} \times r^2 = \frac{660}{21} \times r^2" />
          <BlockMath math="r^2 = \frac{1.540 \times 21}{660} = \frac{32.340}{660} = 49 \Rightarrow r = 7 \text{ cm}" />
        </div>
        <p className="text-yellow-400 font-semibold">Langkah 2 — Keliling alas:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="K = 2\pi r = 2 \times \frac{22}{7} \times 7 = 44 \text{ cm}" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-2">
          <p className="text-yellow-300 font-semibold text-xs">✅ Jari-jari = 7 cm, Keliling alas = 44 cm</p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah ember berbentuk kerucut terbalik memiliki diameter atas <InlineMath math="28 \text{ cm}" /> dan kedalaman (tinggi) <InlineMath math="30 \text{ cm}" />.</p>
        <p>Ember diisi pasir setinggi <InlineMath math="20 \text{ cm}" /> dari bawah (puncak kerucut). Berapa volume pasir di dalam ember?</p>
        <p className="text-xs text-white/50">(Ingat: jika kerucut terbalik dengan tinggi total T, air setinggi h dari puncak membentuk kerucut kecil yang sebangun. Gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold">Langkah 1 — Jari-jari kerucut penuh:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="r_{\text{penuh}} = \frac{28}{2} = 14 \text{ cm}, \quad t_{\text{penuh}} = 30 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 2 — Jari-jari kerucut pasir (sebangun):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <p className="text-white/70">Pasir setinggi 20 cm dari puncak membentuk kerucut kecil sebangun:</p>
          <BlockMath math="\frac{r_{\text{pasir}}}{r_{\text{penuh}}} = \frac{t_{\text{pasir}}}{t_{\text{penuh}}} = \frac{20}{30} = \frac{2}{3}" />
          <BlockMath math="r_{\text{pasir}} = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 3 — Volume pasir:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="V_{\text{pasir}} = \frac{1}{3}\pi r_{\text{pasir}}^2 \times t_{\text{pasir}} = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20" />
          <BlockMath math="= \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9}" />
          <BlockMath math="= \frac{344.960}{189} \approx 1.825{,}7 \text{ cm}^3" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-3 text-xs space-y-0.5">
          <p className="text-red-300 font-semibold">✅ Jawaban:</p>
          <p className="text-white/80">• Jari-jari pasir = <strong className="text-yellow-300">28/3 ≈ 9,33 cm</strong></p>
          <p className="text-white/80">• Volume pasir ≈ <strong className="text-yellow-300">1.825,7 cm³</strong></p>
          <p className="text-cyan-300 mt-1">💡 Kunci: gunakan sifat kesebangunan kerucut!</p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   ACCORDION + EXAMPLE CARD COMPONENTS
───────────────────────────────────────────────────────────── */
const AccordionSection = ({ sec, idx }: { sec: Sec; idx: number }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
      <button onClick={() => { playPopSound(); setOpen(v => !v); }}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors cursor-pointer">
        <span className="flex items-center gap-3">
          <span className="text-xl">{sec.icon}</span>
          <span className="font-display text-sm font-semibold text-white">{sec.title}</span>
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-primary shrink-0"/> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0"/>}
      </button>
      {open && <div className="px-5 pb-5 border-t border-border/50"><div className="pt-4">{sec.content}</div></div>}
    </div>
  );
};

const ExampleCard = ({ ex, idx, prefix }: { ex: Ex; idx: number; prefix: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`border ${ex.border} rounded-xl overflow-hidden`}>
      <div className={`${ex.bg} px-5 py-4`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold font-display px-2 py-0.5 rounded ${ex.badgeBg} ${ex.color} border ${ex.border}`}>
            {prefix} {idx + 1} — {ex.level}
          </span>
        </div>
        {ex.question}
      </div>
      <button onClick={() => { playPopSound(); setShow(v => !v); }}
        className="w-full flex items-center justify-between px-5 py-3 bg-slate-800/60 hover:bg-slate-800/90 transition-colors cursor-pointer border-t border-slate-700/50">
        <span className={`text-xs font-semibold font-body ${ex.color}`}>{show ? "Sembunyikan" : "Lihat Pembahasan"}</span>
        {show ? <ChevronUp className="w-4 h-4 text-muted-foreground"/> : <ChevronDown className="w-4 h-4 text-muted-foreground"/>}
      </button>
      {show && <div className="px-5 py-4 bg-slate-900/60 border-t border-slate-700/30">{ex.answer}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const KerucutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Triangle className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-2xl font-bold text-primary text-glow-cyan mb-1 text-center">
          KERUCUT
        </h1>
        <p className="text-white/50 text-xs text-center mb-8 font-body">Kelas 9 · Bangun Ruang Sisi Lengkung</p>

        <div className="bg-card/60 border border-border rounded-xl p-4 mb-6 text-sm font-body text-white/75 leading-relaxed">
          <p>
            Dari topi ulang tahun yang meriah hingga corong di dapur, kerucut ada di sekeliling kita!
            Pelajari semua tentang <strong className="text-cyan-300">kerucut</strong> — unsur-unsurnya, cara menghitung{" "}
            <strong className="text-yellow-300">garis pelukis</strong>, <strong className="text-orange-300">luas permukaan</strong>,
            hingga <strong className="text-blue-300">volume</strong>-nya dengan metode yang mudah dan menyenangkan.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {sections.map((sec, i) => <AccordionSection key={sec.title} sec={sec} idx={i} />)}
        </div>

        <div className="mb-6">
          <h3 className="font-display text-sm font-bold text-red-300 text-center mb-1">📐 Contoh Soal — GARIS PELUKIS</h3>
          <p className="text-white/40 text-xs text-center mb-4 font-body">Latihan bertingkat dari mudah hingga sulit</p>
          <div className="flex flex-col gap-4">
            {gpExamples.map((ex, i) => <ExampleCard key={`g${i}`} ex={ex} idx={i} prefix="GP"/>)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-display text-sm font-bold text-orange-300 text-center mb-1">🎨 Contoh Soal — LUAS PERMUKAAN</h3>
          <p className="text-white/40 text-xs text-center mb-4 font-body">Latihan bertingkat dari mudah hingga sulit</p>
          <div className="flex flex-col gap-4">
            {luasExamples.map((ex, i) => <ExampleCard key={`l${i}`} ex={ex} idx={i} prefix="LUAS"/>)}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-display text-sm font-bold text-blue-300 text-center mb-1">📦 Contoh Soal — VOLUME</h3>
          <p className="text-white/40 text-xs text-center mb-4 font-body">Latihan bertingkat dari mudah hingga sulit</p>
          <div className="flex flex-col gap-4">
            {volExamples.map((ex, i) => <ExampleCard key={`v${i}`} ex={ex} idx={i} prefix="VOLUME"/>)}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Bangun Ruang Sisi Lengkung
          </button>
        </div>
      </div>
    </div>
  );
};

export default KerucutPage;
