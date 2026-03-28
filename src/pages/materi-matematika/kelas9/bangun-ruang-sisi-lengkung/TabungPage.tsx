import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Database, ChevronDown, ChevronUp } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { playPopSound } from "@/hooks/useAudio";

/* ─────────────────────────────────────────────────────────────
   INTERACTIVE 3D CYLINDER — CSS 3D transform with drag rotation
───────────────────────────────────────────────────────────── */
const SEGMENTS = 24;
const R = 60;
const H_CYL = 100;

const InteractiveCylinder3D = () => {
  const [rotX, setRotX] = useState(-25);
  const [rotY, setRotY] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [showNet, setShowNet] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, baseRotX: -25, baseRotY: 30 });

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, baseRotX: rotX, baseRotY: rotY };
  };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setRotY(dragRef.current.baseRotY + (e.clientX - dragRef.current.startX) * 0.5);
    setRotX(dragRef.current.baseRotX - (e.clientY - dragRef.current.startY) * 0.5);
  }, [isDragging]);
  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setIsDragging(true);
    dragRef.current = { startX: t.clientX, startY: t.clientY, baseRotX: rotX, baseRotY: rotY };
  };
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    setRotY(dragRef.current.baseRotY + (t.clientX - dragRef.current.startX) * 0.5);
    setRotX(dragRef.current.baseRotX - (t.clientY - dragRef.current.startY) * 0.5);
  }, [isDragging]);
  const onTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  useEffect(() => {
    if (isDragging || showNet) return;
    let frameId: number;
    let lastTs = 0;
    const animate = (ts: number) => {
      if (lastTs) setRotY(prev => prev + (ts - lastTs) * 0.025);
      lastTs = ts;
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, showNet]);

  const segAngle = (2 * Math.PI) / SEGMENTS;
  const segments = Array.from({ length: SEGMENTS }, (_, i) => i);

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 space-y-4">
      <p className="text-white/60 text-xs text-center font-body">
        Drag untuk memutar · Klik tombol untuk melihat jaring-jaring tabung
      </p>

      {!showNet ? (
        <div
          className="relative mx-auto flex items-center justify-center select-none overflow-visible"
          style={{ width: "100%", height: 320, cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div
            style={{
              position: "relative",
              width: R * 2,
              height: H_CYL,
              transformStyle: "preserve-3d",
              transform: `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: isDragging ? "none" : "transform 0.4s ease",
            }}
          >
            {/* Side panels */}
            {segments.map(i => {
              const angle = i * segAngle;
              const x = Math.cos(angle) * R;
              const z = Math.sin(angle) * R;
              const w = 2 * Math.PI * R / SEGMENTS;
              const hue = Math.floor((i / SEGMENTS) * 40) + 190;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: 0, left: "50%",
                    width: w + 1,
                    height: H_CYL,
                    background: `hsla(${hue}, 70%, 55%, 0.88)`,
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    transform: `translateX(-50%) translateX(${x}px) translateZ(${z}px) rotateY(${(angle * 180 / Math.PI) + 90}deg)`,
                    transformOrigin: "center center",
                    backfaceVisibility: "hidden",
                  }}
                />
              );
            })}

            {/* Top cap */}
            <div
              style={{
                position: "absolute",
                top: 0, left: "50%",
                width: R * 2,
                height: R * 2,
                borderRadius: "50%",
                background: "radial-gradient(circle, #67e8f9 0%, #0891b2 70%, #164e63 100%)",
                transform: `translateX(-50%) translateY(-${R}px) rotateX(90deg)`,
                boxShadow: "0 0 20px rgba(103,232,249,0.5)",
                border: "2px solid rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, fontFamily: "monospace", transform: "rotateX(-90deg)" }}>
                TUTUP ATAS (r)
              </span>
            </div>

            {/* Bottom cap */}
            <div
              style={{
                position: "absolute",
                bottom: 0, left: "50%",
                width: R * 2,
                height: R * 2,
                borderRadius: "50%",
                background: "radial-gradient(circle, #86efac 0%, #16a34a 70%, #14532d 100%)",
                transform: `translateX(-50%) translateY(${R}px) rotateX(-90deg)`,
                boxShadow: "0 0 15px rgba(134,239,172,0.4)",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, fontFamily: "monospace", transform: "rotateX(90deg)" }}>
                TUTUP BAWAH (r)
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Jaring-jaring tabung */
        <div className="flex items-center justify-center py-4">
          <svg viewBox="0 0 340 240" width={340} height={240} className="max-w-full">
            {/* Tutup atas (lingkaran) */}
            <ellipse cx="60" cy="60" rx="50" ry="50"
              fill="rgba(103,232,249,0.25)" stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="6,3"/>
            <text x="60" y="55" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace" fontWeight="700">Tutup Atas</text>
            <text x="60" y="70" textAnchor="middle" fill="#a5f3fc" fontSize="9" fontFamily="monospace">⌀ = 2r</text>

            {/* Selimut (persegi panjang) */}
            <rect x="120" y="10" width="200" height="100"
              fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2.5"/>
            <text x="220" y="58" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontFamily="monospace" fontWeight="700">SELIMUT</text>
            <text x="220" y="75" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="monospace">p = 2πr</text>
            {/* width arrow */}
            <line x1="120" y1="5" x2="320" y2="5" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)"/>
            <text x="220" y="3" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace">keliling alas = 2πr</text>
            {/* height arrow */}
            <line x1="325" y1="10" x2="325" y2="110" stroke="#a855f7" strokeWidth="1.5"/>
            <text x="334" y="60" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" transform="rotate(90, 334, 60)">t</text>

            {/* Tutup bawah (lingkaran) */}
            <ellipse cx="60" cy="170" rx="50" ry="50"
              fill="rgba(134,239,172,0.25)" stroke="#86efac" strokeWidth="2.5" strokeDasharray="6,3"/>
            <text x="60" y="165" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="monospace" fontWeight="700">Tutup Bawah</text>
            <text x="60" y="180" textAnchor="middle" fill="#bbf7d0" fontSize="9" fontFamily="monospace">⌀ = 2r</text>

            {/* Labels */}
            <text x="170" y="155" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">Jaring-jaring Tabung</text>
            <text x="170" y="170" textAnchor="middle" fill="#fde68a" fontSize="9" fontFamily="monospace">= 2 Lingkaran + 1 Persegi Panjang</text>

            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#a855f7"/>
              </marker>
            </defs>
          </svg>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { playPopSound(); setShowNet(false); }}
          className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors cursor-pointer font-body ${!showNet ? "bg-cyan-800/80 border-cyan-500 text-cyan-200" : "bg-slate-900/60 border-slate-600 text-slate-300 hover:bg-slate-800/60"}`}
        >
          🔵 Tabung 3D
        </button>
        <button
          onClick={() => { playPopSound(); setShowNet(true); }}
          className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors cursor-pointer font-body ${showNet ? "bg-purple-800/80 border-purple-500 text-purple-200" : "bg-slate-900/60 border-slate-600 text-slate-300 hover:bg-slate-800/60"}`}
        >
          📐 Jaring-jaring
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center text-[10px] font-body">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{background:"#67e8f9"}}/><span className="text-white/50">Tutup Atas</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{background:"#a855f7"}}/><span className="text-white/50">Selimut</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{background:"#86efac"}}/><span className="text-white/50">Tutup Bawah</span></div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ANIMATED SVGs — UNSUR TABUNG
───────────────────────────────────────────────────────────── */
const JariJariAnimSVG = () => (
  <svg viewBox="0 0 280 160" className="w-full max-w-xs mx-auto my-2" aria-label="Jari-jari tabung">
    <defs>
      <style>{`
        @keyframes jjGlow{0%,100%{stroke-opacity:1;filter:drop-shadow(0 0 6px #f59e0b);}50%{stroke-opacity:0.2;filter:drop-shadow(0 0 0 #f59e0b);}}
        .jj-a{animation:jjGlow 1.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .pls{animation:pulse 1.5s ease-in-out infinite;}
      `}</style>
    </defs>
    {/* Cylinder body */}
    <ellipse cx="140" cy="50" rx="80" ry="20" fill="rgba(14,116,144,0.3)" stroke="#0891b2" strokeWidth="1.5"/>
    <rect x="60" y="50" width="160" height="80" fill="rgba(8,145,178,0.15)" stroke="none"/>
    <line x1="60" y1="50" x2="60" y2="130" stroke="#0891b2" strokeWidth="1.5"/>
    <line x1="220" y1="50" x2="220" y2="130" stroke="#0891b2" strokeWidth="1.5"/>
    <ellipse cx="140" cy="130" rx="80" ry="20" fill="rgba(14,116,144,0.3)" stroke="#0891b2" strokeWidth="1.5"/>
    {/* Animated radius */}
    <line x1="140" y1="130" x2="220" y2="130" stroke="#f59e0b" strokeWidth="3" className="jj-a"/>
    <circle cx="140" cy="130" r="4" fill="#f59e0b" className="pls"/>
    <circle cx="220" cy="130" r="4" fill="#f59e0b" className="pls"/>
    <text x="174" y="150" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="700" textAnchor="middle">r (jari-jari)</text>
    {/* Diameter arrow hint */}
    <line x1="60" y1="130" x2="220" y2="130" stroke="#fde68a" strokeWidth="1" strokeDasharray="4,3" className="pls"/>
    <text x="140" y="145" fill="#fde68a" fontSize="9" fontFamily="monospace" textAnchor="middle">d = 2r</text>
  </svg>
);

const TinggiAnimSVG = () => (
  <svg viewBox="0 0 280 180" className="w-full max-w-xs mx-auto my-2" aria-label="Tinggi tabung">
    <defs>
      <style>{`
        @keyframes tGlow{0%,100%{stroke-opacity:1;filter:drop-shadow(0 0 6px #22c55e);}50%{stroke-opacity:0.2;}}
        .t-a{animation:tGlow 1.4s ease-in-out infinite;}
      `}</style>
    </defs>
    <ellipse cx="140" cy="40" rx="80" ry="20" fill="rgba(34,197,94,0.15)" stroke="#4ade80" strokeWidth="1.5"/>
    <rect x="60" y="40" width="160" height="100" fill="rgba(8,145,178,0.1)" stroke="none"/>
    <line x1="60" y1="40" x2="60" y2="140" stroke="#0891b2" strokeWidth="1.5"/>
    <line x1="220" y1="40" x2="220" y2="140" stroke="#0891b2" strokeWidth="1.5"/>
    <ellipse cx="140" cy="140" rx="80" ry="20" fill="rgba(34,197,94,0.15)" stroke="#4ade80" strokeWidth="1.5"/>
    {/* Animated height */}
    <line x1="35" y1="40" x2="35" y2="140" stroke="#22c55e" strokeWidth="3" className="t-a"/>
    <line x1="28" y1="40" x2="42" y2="40" stroke="#22c55e" strokeWidth="2"/>
    <line x1="28" y1="140" x2="42" y2="140" stroke="#22c55e" strokeWidth="2"/>
    <text x="22" y="92" fill="#22c55e" fontSize="13" fontFamily="monospace" fontWeight="700" textAnchor="middle">t</text>
    <text x="60" y="168" fill="#86efac" fontSize="10" fontFamily="monospace" textAnchor="start">t = tinggi tabung</text>
  </svg>
);

const SelimutAnimSVG = () => (
  <svg viewBox="0 0 280 180" className="w-full max-w-xs mx-auto my-2" aria-label="Selimut tabung">
    <defs>
      <style>{`
        @keyframes selGlow{0%,100%{fill-opacity:0.55;}50%{fill-opacity:0.05;}}
        .sel-a{animation:selGlow 1.6s ease-in-out infinite;}
      `}</style>
    </defs>
    <ellipse cx="140" cy="40" rx="80" ry="20" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1.5"/>
    <rect x="60" y="40" width="160" height="100" fill="#a855f7" className="sel-a"/>
    <line x1="60" y1="40" x2="60" y2="140" stroke="#a855f7" strokeWidth="2"/>
    <line x1="220" y1="40" x2="220" y2="140" stroke="#a855f7" strokeWidth="2"/>
    <ellipse cx="140" cy="140" rx="80" ry="20" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1.5"/>
    <text x="140" y="92" fill="#e9d5ff" fontSize="11" fontFamily="monospace" fontWeight="700" textAnchor="middle">SELIMUT</text>
    <text x="140" y="108" fill="#c4b5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">L = 2πr × t</text>
    <text x="140" y="165" fill="#a78bfa" fontSize="10" fontFamily="monospace" textAnchor="middle">Selimut = "kulit" tabung tanpa tutup</text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   SECTIONS DATA
───────────────────────────────────────────────────────────── */
type Sec = { title: string; icon: string; content: React.ReactNode };

const sections: Sec[] = [
  {
    title: "Pengertian Tabung",
    icon: "🔵",
    content: (
      <div className="space-y-4 font-body">
        <p className="text-white/80 text-sm leading-relaxed">
          Bayangkan kaleng minuman, drum musik, atau pipa air — semuanya punya bentuk yang sama: dua lingkaran
          di atas dan bawah, dihubungkan oleh satu permukaan melengkung. Itulah yang disebut <strong className="text-cyan-300">tabung</strong>
          (atau silinder)!
        </p>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-4 text-sm text-cyan-100 space-y-2">
          <p className="font-semibold text-cyan-300">📌 Definisi Tabung:</p>
          <p>
            Tabung adalah bangun ruang tiga dimensi yang dibentuk oleh <strong>dua lingkaran sejajar dan kongruen</strong> (sama
            besar) sebagai alas dan tutup, yang dihubungkan oleh sebuah permukaan melengkung yang disebut <strong className="text-purple-300">selimut tabung</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-3 text-xs text-slate-300 space-y-1">
            <p className="text-yellow-400 font-bold text-sm">🏷️ Istilah Kunci:</p>
            <p>• <strong className="text-amber-300">r</strong> = jari-jari alas/tutup</p>
            <p>• <strong className="text-green-300">t</strong> = tinggi tabung</p>
            <p>• <strong className="text-purple-300">d</strong> = diameter = 2r</p>
            <p>• <strong className="text-pink-300">π</strong> ≈ 3,14 atau 22/7</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-3 text-xs text-slate-300 space-y-1">
            <p className="text-cyan-400 font-bold text-sm">🌍 Contoh di Kehidupan:</p>
            <p>• Kaleng susu / minuman</p>
            <p>• Tangki air silindris</p>
            <p>• Pipa besi / PVC</p>
            <p>• Drum / Tabung gas</p>
          </div>
        </div>
        <InteractiveCylinder3D />
      </div>
    ),
  },
  {
    title: "Unsur-unsur Tabung",
    icon: "🔍",
    content: (
      <div className="space-y-5 font-body">
        <p className="text-white/70 text-sm">
          Tabung punya 3 bagian utama yang wajib kamu kuasai. Mari kita bedah satu per satu!
        </p>

        {/* Jari-jari */}
        <div className="bg-amber-950/40 border border-amber-700/40 rounded-xl p-4 space-y-2">
          <p className="text-amber-300 font-bold text-sm">1. Jari-jari (r) & Diameter (d)</p>
          <p className="text-white/75 text-sm">
            Jari-jari adalah jarak dari <strong>titik pusat</strong> ke <strong>tepi lingkaran</strong> alas/tutup.
            Diameter adalah garis lurus yang melewati pusat dan menghubungkan dua titik tepi — nilainya <strong className="text-amber-300">dua kali jari-jari</strong>.
          </p>
          <JariJariAnimSVG />
          <div className="bg-amber-950/60 border border-amber-700/30 rounded p-2 text-xs text-amber-200">
            <InlineMath math="d = 2r \quad \text{atau} \quad r = \frac{d}{2}" />
          </div>
        </div>

        {/* Tinggi */}
        <div className="bg-green-950/40 border border-green-700/40 rounded-xl p-4 space-y-2">
          <p className="text-green-300 font-bold text-sm">2. Tinggi Tabung (t)</p>
          <p className="text-white/75 text-sm">
            Tinggi tabung adalah jarak <strong>tegak lurus</strong> antara alas dan tutup tabung. Bayangkan seperti
            mengukur tinggi sebuah kaleng dari dasar hingga ujung atasnya.
          </p>
          <TinggiAnimSVG />
        </div>

        {/* Selimut */}
        <div className="bg-purple-950/40 border border-purple-700/40 rounded-xl p-4 space-y-2">
          <p className="text-purple-300 font-bold text-sm">3. Selimut Tabung</p>
          <p className="text-white/75 text-sm">
            Selimut adalah <strong>permukaan melengkung</strong> yang membungkus sisi tabung (bukan bagian atas atau bawahnya).
            Kalau kamu "buka gulungan" selimut tabung, kamu akan mendapatkan sebuah <strong className="text-purple-300">persegi panjang</strong>!
          </p>
          <SelimutAnimSVG />
          <blockquote className="border-l-4 border-purple-500 pl-3 text-xs text-purple-200 italic">
            Panjang persegi panjang = keliling lingkaran = 2πr, Lebarnya = tinggi tabung (t)
          </blockquote>
        </div>

        {/* Ringkasan unsur */}
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs text-center">
            <thead><tr className="bg-slate-800">
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700 text-left">Unsur</th>
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700">Simbol</th>
              <th className="px-3 py-2 text-cyan-300">Keterangan</th>
            </tr></thead>
            <tbody>
              {[
                ["Jari-jari","r","Pusat ke tepi lingkaran alas/tutup"],
                ["Diameter","d = 2r","Garis melalui pusat lingkaran"],
                ["Tinggi","t","Jarak tegak lurus alas ke tutup"],
                ["Selimut","Permukaan lengkung","Seperti persegi panjang yang digulung"],
                ["Alas & Tutup","2 lingkaran","Kongruen (sama besar & bentuk)"],
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
      </div>
    ),
  },
  {
    title: "Jaring-jaring Tabung",
    icon: "📐",
    content: (
      <div className="space-y-4 font-body">
        <p className="text-white/80 text-sm leading-relaxed">
          Kalau kita "bongkar" dan bentangkan semua permukaan tabung menjadi datar, itulah yang disebut <strong className="text-purple-300">jaring-jaring tabung</strong>.
        </p>
        <div className="bg-purple-950/40 border border-purple-700/40 rounded-xl p-4">
          <p className="text-purple-200 text-sm font-bold mb-3">🗺️ Komponen Jaring-jaring Tabung:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-cyan-950/60 border border-cyan-700/40 rounded-lg p-3">
              <p className="text-2xl mb-1">⭕</p>
              <p className="text-cyan-300 text-xs font-bold">Tutup ATAS</p>
              <p className="text-white/60 text-xs">Lingkaran jari-jari r</p>
            </div>
            <div className="bg-purple-950/60 border border-purple-700/40 rounded-lg p-3">
              <p className="text-2xl mb-1">▭</p>
              <p className="text-purple-300 text-xs font-bold">SELIMUT</p>
              <p className="text-white/60 text-xs">Persegi panjang<br/>p = 2πr, l = t</p>
            </div>
            <div className="bg-green-950/60 border border-green-700/40 rounded-lg p-3">
              <p className="text-2xl mb-1">⭕</p>
              <p className="text-green-300 text-xs font-bold">Tutup BAWAH</p>
              <p className="text-white/60 text-xs">Lingkaran jari-jari r</p>
            </div>
          </div>
        </div>
        <blockquote className="border-l-4 border-yellow-500 pl-3 text-sm text-yellow-200">
          <strong>💡 Tips Penting:</strong> Perhatikan bahwa panjang sisi persegi panjang (selimut)
          harus sama persis dengan keliling lingkaran alas/tutup (<InlineMath math="2\pi r" />).
          Inilah kunci kenapa jaring-jaring bisa "menyambung" sempurna!
        </blockquote>
        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4 space-y-2 text-sm text-white/80">
          <p className="font-bold text-white">📏 Ukuran Masing-masing Bagian:</p>
          <div className="bg-slate-900/60 rounded p-3 space-y-1 text-xs font-mono">
            <p>• Luas tutup atas = Luas tutup bawah = <InlineMath math="\pi r^2" /></p>
            <p>• Panjang selimut (dibuka) = <InlineMath math="2\pi r" /></p>
            <p>• Tinggi selimut (dibuka) = <InlineMath math="t" /></p>
            <p>• Luas selimut = <InlineMath math="2\pi r \times t" /></p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Luas Permukaan Tabung",
    icon: "🎨",
    content: (
      <div className="space-y-4 font-body">
        <p className="text-white/80 text-sm">
          Luas permukaan tabung adalah <strong>total seluruh luas</strong> semua bagian yang membungkus tabung —
          termasuk dua tutup lingkaran dan selimutnya.
        </p>

        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4 space-y-3">
          <p className="text-orange-300 font-bold text-sm">🧮 Penurunan Rumus:</p>
          <div className="space-y-2 text-sm text-white/80">
            <div className="bg-slate-900/60 rounded p-2 text-xs">
              <p className="text-white/60 mb-1">Tutup Atas + Tutup Bawah + Selimut</p>
              <BlockMath math="L = \pi r^2 + \pi r^2 + 2\pi r \cdot t" />
            </div>
            <div className="bg-orange-950/50 border border-orange-700/40 rounded p-3">
              <p className="text-orange-300 font-bold text-center text-xs mb-2">✨ Rumus Luas Permukaan Tabung:</p>
              <BlockMath math="L = 2\pi r^2 + 2\pi r \cdot t" />
            </div>
            <div className="bg-slate-900/60 rounded p-2 text-xs text-white/60">
              <p>Atau bisa juga ditulis:</p>
              <BlockMath math="L = 2\pi r \left( r + t \right)" />
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-orange-500 pl-3 text-sm text-orange-200">
          <strong>🚀 Catatan:</strong> Kalau tabung tidak punya tutup (seperti pipa atau ember tanpa dasar),
          kamu hanya menghitung selimut ditambah satu lingkaran. Sesuaikan rumus dengan kebutuhan soal!
        </blockquote>

        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs text-center">
            <thead><tr className="bg-slate-800">
              <th className="px-3 py-2 text-cyan-300 border-r border-slate-700 text-left">Jenis Tabung</th>
              <th className="px-3 py-2 text-cyan-300">Rumus Luas</th>
            </tr></thead>
            <tbody>
              {[
                ["Tabung tertutup (ada alas & tutup)","L = 2\\pi r^2 + 2\\pi r t"],
                ["Tabung terbuka (tanpa tutup atas)","L = \\pi r^2 + 2\\pi r t"],
                ["Selimut saja","L_{selimut} = 2\\pi r t"],
              ].map(([b,r],i)=>(
                <tr key={i} className={`border-t border-slate-700 ${i%2===0?"bg-slate-900/40":"bg-slate-800/30"}`}>
                  <td className="px-3 py-2 text-white/90 font-semibold border-r border-slate-700 text-left">{b}</td>
                  <td className="px-3 py-2 text-yellow-300 font-mono"><InlineMath math={r}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: "Volume Tabung",
    icon: "📦",
    content: (
      <div className="space-y-4 font-body">
        <p className="text-white/80 text-sm leading-relaxed">
          Volume tabung adalah <strong>seberapa banyak isi</strong> yang bisa ditampung di dalamnya —
          bayangkan berapa liter air yang masuk ke dalam kaleng!
        </p>

        <div className="bg-blue-950/50 border border-blue-700/40 rounded-lg p-4 space-y-3">
          <p className="text-blue-300 font-bold text-sm">💡 Ide Dasar:</p>
          <p className="text-white/75 text-sm">Volume = Luas alas × Tinggi. Karena alas tabung adalah lingkaran:</p>
          <div className="bg-slate-900/60 rounded p-3 space-y-2">
            <BlockMath math="V = \text{Luas Alas} \times t = \pi r^2 \times t" />
          </div>
          <div className="bg-blue-950/70 border border-blue-600/40 rounded p-3 text-center">
            <p className="text-blue-200 font-bold text-xs mb-1">✨ Rumus Volume Tabung:</p>
            <BlockMath math="V = \pi r^2 \cdot t" />
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-3 text-xs text-slate-300 space-y-1">
          <p>🎯 <strong className="text-white">Satuan volume:</strong></p>
          <p>• Jika <InlineMath math="r" /> dan <InlineMath math="t" /> dalam cm → Volume dalam <InlineMath math="\text{cm}^3" /></p>
          <p>• Jika <InlineMath math="r" /> dan <InlineMath math="t" /> dalam m → Volume dalam <InlineMath math="\text{m}^3" /></p>
          <p>• <InlineMath math="1 \text{ m}^3 = 1.000.000 \text{ cm}^3" /></p>
          <p>• <InlineMath math="1 \text{ liter} = 1.000 \text{ cm}^3" /></p>
        </div>
      </div>
    ),
  },
  {
    title: "Kesimpulan — Rumus Lengkap Tabung",
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
                ["Keliling alas / tutup","K = 2πr","Lingkaran"],
                ["Luas alas / tutup","L₀ = πr²","Lingkaran"],
                ["Luas selimut","Ls = 2πrt","Persegi panjang yang digulung"],
                ["Luas permukaan (tertutup)","L = 2πr² + 2πrt","Semua sisi"],
                ["Luas permukaan (terbuka)","L = πr² + 2πrt","Tanpa tutup atas"],
                ["Volume","V = πr²t","Luas alas × tinggi"],
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
          <p>🚀 <strong>Kunci utama tabung:</strong> Semua rumus bergantung pada <strong className="text-yellow-300">r (jari-jari)</strong> dan <strong className="text-green-300">t (tinggi)</strong>.</p>
          <p>Ingat: <InlineMath math="\pi \approx 3{,}14" /> atau <InlineMath math="\frac{22}{7}" /> (gunakan sesuai petunjuk soal!)</p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   EXAMPLE PROBLEMS
───────────────────────────────────────────────────────────── */
type Ex = { level: string; color: string; bg: string; border: string; badgeBg: string; question: React.ReactNode; answer: React.ReactNode };

const luasExamples: Ex[] = [
  {
    level: "MUDAH", color: "text-green-400", bg: "bg-green-950/30", border: "border-green-700/50", badgeBg: "bg-green-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah kaleng susu berbentuk tabung dengan jari-jari alas <InlineMath math="7 \text{ cm}" /> dan tinggi <InlineMath math="20 \text{ cm}" />.</p>
        <p>Hitunglah luas permukaan kaleng tersebut! (gunakan <InlineMath math="\pi = \frac{22}{7}" />)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-green-400 font-semibold">Diketahui: <InlineMath math="r = 7 \text{ cm}, \; t = 20 \text{ cm}" /></p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 space-y-2 text-xs">
          <BlockMath math="L = 2\pi r^2 + 2\pi r \cdot t" />
          <BlockMath math="L = 2 \times \frac{22}{7} \times 7^2 + 2 \times \frac{22}{7} \times 7 \times 20" />
          <BlockMath math="L = 2 \times \frac{22}{7} \times 49 + 2 \times 22 \times 20" />
          <BlockMath math="L = 2 \times 154 + 880 = 308 + 880" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-3">
          <p className="text-green-300 font-semibold">✅ Luas permukaan = <InlineMath math="1.188 \text{ cm}^2" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah tong air berbentuk tabung terbuka (tanpa tutup atas) dengan diameter <InlineMath math="60 \text{ cm}" /> dan tinggi <InlineMath math="80 \text{ cm}" />.</p>
        <p>Tong ini akan dicat di seluruh permukaan luarnya (alas + selimut). Jika 1 kaleng cat cukup untuk <InlineMath math="5.000 \text{ cm}^2" />, berapa kaleng cat yang diperlukan?</p>
        <p className="text-xs text-white/50">(π = 3,14)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-yellow-400 font-semibold">Langkah 1 — Cari jari-jari:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-2 text-xs">
          <BlockMath math="r = \frac{d}{2} = \frac{60}{2} = 30 \text{ cm}" />
        </div>
        <p className="text-yellow-400 font-semibold">Langkah 2 — Luas permukaan terbuka (alas + selimut):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-2 text-xs">
          <BlockMath math="L = \pi r^2 + 2\pi r \cdot t" />
          <BlockMath math="L = 3{,}14 \times 30^2 + 2 \times 3{,}14 \times 30 \times 80" />
          <BlockMath math="L = 3{,}14 \times 900 + 2 \times 3{,}14 \times 2.400" />
          <BlockMath math="L = 2.826 + 15.072 = 17.898 \text{ cm}^2" />
        </div>
        <p className="text-yellow-400 font-semibold">Langkah 3 — Hitung kebutuhan cat:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-2 text-xs">
          <BlockMath math="\text{Kaleng cat} = \frac{17.898}{5.000} = 3{,}58 \approx 4 \text{ kaleng}" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-3 text-xs">
          <p className="text-yellow-300 font-semibold">✅ Jawaban: Dibutuhkan <strong>4 kaleng cat</strong> (dibulatkan ke atas)</p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah pabrik membuat label kertas yang menempel persis di selimut tabung kaleng.</p>
        <p>Kaleng tersebut memiliki luas permukaan total <InlineMath math="1.507{,}2 \text{ cm}^2" /> dan tinggi <InlineMath math="15 \text{ cm}" />.</p>
        <p>Tentukan: (a) jari-jari kaleng, (b) luas label kertas yang dibutuhkan untuk satu kaleng.</p>
        <p className="text-xs text-white/50">(π = 3,14)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold">Langkah 1 — Bentuk persamaan dari luas permukaan:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="L = 2\pi r^2 + 2\pi r t" />
          <BlockMath math="1.507{,}2 = 2 \times 3{,}14 \times r^2 + 2 \times 3{,}14 \times r \times 15" />
          <BlockMath math="1.507{,}2 = 6{,}28 r^2 + 94{,}2 r" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 2 — Coba nilai r yang masuk akal (r = 10):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="6{,}28 \times 100 + 94{,}2 \times 10 = 628 + 942 = 1.570 \neq 1.507{,}2" />
          <p className="text-white/60">Coba r = 9:</p>
          <BlockMath math="6{,}28 \times 81 + 94{,}2 \times 9 = 508{,}68 + 847{,}8 = 1.356{,}48 \neq 1.507{,}2" />
          <p className="text-white/60">Coba r = 10 dan sederhanakan dengan faktorisasi:</p>
          <BlockMath math="1.507{,}2 \div 6{,}28 = 240 \Rightarrow r^2 + 15r = 240" />
          <BlockMath math="r^2 + 15r - 240 = 0 \Rightarrow (r-10)(r+24)=0 \Rightarrow r = 10 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 3 — Hitung luas label (selimut saja):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="L_{\text{selimut}} = 2\pi r \cdot t = 2 \times 3{,}14 \times 10 \times 15 = 942 \text{ cm}^2" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-3 text-xs space-y-1">
          <p className="text-red-300 font-semibold">✅ Jawaban:</p>
          <p className="text-white/80">• Jari-jari kaleng = <strong className="text-yellow-300">10 cm</strong></p>
          <p className="text-white/80">• Luas label kertas = <strong className="text-yellow-300">942 cm²</strong></p>
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
        <p>Sebuah gelas silindris memiliki jari-jari <InlineMath math="5 \text{ cm}" /> dan tinggi <InlineMath math="12 \text{ cm}" />.</p>
        <p>Berapa volume gelas tersebut? (π = 3,14)</p>
      </div>
    ),
    answer: (
      <div className="space-y-2 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="V = \pi r^2 \cdot t = 3{,}14 \times 5^2 \times 12" />
          <BlockMath math="V = 3{,}14 \times 25 \times 12 = 3{,}14 \times 300 = 942 \text{ cm}^3" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-2">
          <p className="text-green-300 font-semibold text-xs">✅ Volume gelas = <InlineMath math="942 \text{ cm}^3" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah tangki air berbentuk tabung memiliki diameter <InlineMath math="1{,}4 \text{ m}" /> dan tinggi <InlineMath math="2 \text{ m}" />.</p>
        <p>Jika tangki terisi penuh, berapa liter air yang tersimpan?</p>
        <p className="text-xs text-white/50">(π = 22/7, dan 1 m³ = 1.000 liter)</p>
      </div>
    ),
    answer: (
      <div className="space-y-2 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 space-y-2 text-xs">
          <p className="text-white/70">Cari jari-jari: <InlineMath math="r = \frac{1{,}4}{2} = 0{,}7 \text{ m}" /></p>
          <BlockMath math="V = \pi r^2 \cdot t = \frac{22}{7} \times (0{,}7)^2 \times 2" />
          <BlockMath math="V = \frac{22}{7} \times 0{,}49 \times 2 = \frac{22}{7} \times 0{,}98" />
          <BlockMath math="V = \frac{22 \times 0{,}98}{7} = \frac{21{,}56}{7} = 3{,}08 \text{ m}^3" />
          <BlockMath math="V = 3{,}08 \times 1.000 = 3.080 \text{ liter}" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-2">
          <p className="text-yellow-300 font-semibold text-xs">✅ Tangki menampung <strong>3.080 liter</strong> air</p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah pabrik minuman memproduksi kaleng silindris berisi <InlineMath math="330 \text{ mL}" /> (<InlineMath math="330 \text{ cm}^3" />) minuman.</p>
        <p>Tinggi kaleng adalah <InlineMath math="11 \text{ cm}" />. Pabrik ingin membuat versi baru dengan <strong>diameter diperbesar 40%</strong> namun <strong>volume tetap 330 cm³</strong>.</p>
        <p>Berapa tinggi kaleng baru yang harus dibuat? (π = 3,14, jawaban dalam 2 desimal)</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold">Langkah 1 — Cari jari-jari kaleng lama:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="V = \pi r^2 t \Rightarrow 330 = 3{,}14 \times r^2 \times 11" />
          <BlockMath math="r^2 = \frac{330}{3{,}14 \times 11} = \frac{330}{34{,}54} \approx 9{,}554" />
          <BlockMath math="r_{\text{lama}} \approx \sqrt{9{,}554} \approx 3{,}09 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 2 — Hitung jari-jari baru (diameter naik 40%):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="d_{\text{baru}} = d_{\text{lama}} \times 1{,}4 \Rightarrow r_{\text{baru}} = r_{\text{lama}} \times 1{,}4" />
          <BlockMath math="r_{\text{baru}} = 3{,}09 \times 1{,}4 \approx 4{,}326 \text{ cm}" />
        </div>
        <p className="text-red-400 font-semibold">Langkah 3 — Hitung tinggi baru dengan volume sama:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="V = \pi r_{\text{baru}}^2 \times t_{\text{baru}}" />
          <BlockMath math="330 = 3{,}14 \times (4{,}326)^2 \times t_{\text{baru}}" />
          <BlockMath math="330 = 3{,}14 \times 18{,}714 \times t_{\text{baru}}" />
          <BlockMath math="330 = 58{,}76 \times t_{\text{baru}}" />
          <BlockMath math="t_{\text{baru}} = \frac{330}{58{,}76} \approx 5{,}62 \text{ cm}" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-3 text-xs space-y-1">
          <p className="text-red-300 font-semibold">✅ Jawaban:</p>
          <p className="text-white/80">• Jari-jari baru ≈ <strong className="text-yellow-300">4,33 cm</strong></p>
          <p className="text-white/80">• Tinggi kaleng baru ≈ <strong className="text-yellow-300">5,62 cm</strong></p>
          <p className="text-cyan-300 mt-1">💡 Logis! Kaleng lebih lebar tapi lebih pendek, volume tetap sama.</p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   EXAMPLE CARD COMPONENT
───────────────────────────────────────────────────────────── */
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
   MAIN PAGE — SLIDE LAYOUT
───────────────────────────────────────────────────────────── */
const TabungPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Pengantar",
      icon: "🎯",
      content: (
        <div className="space-y-4 font-body">
          <div className="bg-card/60 border border-border rounded-xl p-4 text-sm text-white/75 leading-relaxed">
            <p>
              Dari kaleng minuman di kulkas hingga tangki air di atap rumah — semua itu berbentuk{" "}
              <strong className="text-cyan-300">tabung</strong>! Di sini kamu akan mempelajari semua
              tentang tabung: unsur-unsurnya, cara membuka jaring-jaringnya, serta menghitung{" "}
              <strong className="text-orange-300">luas permukaan</strong> dan{" "}
              <strong className="text-blue-300">volume</strong>-nya secara lengkap.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "⭕", label: "2 Sisi Lingkaran", color: "text-cyan-300" },
              { icon: "🌀", label: "1 Selimut Lengkung", color: "text-orange-300" },
              { icon: "📏", label: "Jari-jari (r)", color: "text-yellow-300" },
              { icon: "📐", label: "Tinggi (t)", color: "text-green-300" },
              { icon: "🎨", label: "L = 2πr² + 2πrt", color: "text-blue-300" },
              { icon: "📦", label: "V = πr²t", color: "text-violet-300" },
            ].map(({ icon, label, color }) => (
              <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 flex flex-col items-center gap-1">
                <span className="text-2xl">{icon}</span>
                <span className={`text-xs font-semibold font-body text-center ${color}`}>{label}</span>
              </div>
            ))}
          </div>
          <InteractiveCylinder3D />
        </div>
      ),
    },
    ...sections.map(sec => ({ title: sec.title, icon: sec.icon, content: sec.content })),
    {
      title: "Contoh Soal — Luas Permukaan",
      icon: "🎨",
      content: (
        <div className="space-y-4">
          <p className="text-white/40 text-xs text-center font-body">Latihan bertingkat dari mudah hingga sulit</p>
          {luasExamples.map((ex, i) => <ExampleCard key={`l${i}`} ex={ex} idx={i} prefix="LUAS"/>)}
        </div>
      ),
    },
    {
      title: "Contoh Soal — Volume",
      icon: "📦",
      content: (
        <div className="space-y-4">
          <p className="text-white/40 text-xs text-center font-body">Latihan bertingkat dari mudah hingga sulit</p>
          {volExamples.map((ex, i) => <ExampleCard key={`v${i}`} ex={ex} idx={i} prefix="VOLUME"/>)}
        </div>
      ),
    },
  ];

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  const goNext = () => { playPopSound(); setCurrentSlide(v => Math.min(v + 1, totalSlides - 1)); };
  const goPrev = () => { playPopSound(); setCurrentSlide(v => Math.max(v - 1, 0)); };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        <Database className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-2xl font-bold text-primary text-glow-cyan mb-1 text-center">
          TABUNG
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 9 · Bangun Ruang Sisi Lengkung</p>

        <div className="flex items-center justify-center gap-1.5 mb-5 flex-wrap">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { playPopSound(); setCurrentSlide(i); }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <div className="bg-card/80 backdrop-blur border border-border rounded-2xl overflow-hidden mb-5">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-slate-800/40">
            <span className="text-2xl">{slide.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-[10px] font-body uppercase tracking-widest">
                Slide {currentSlide + 1} / {totalSlides}
              </p>
              <h2 className="font-display text-sm font-bold text-white">{slide.title}</h2>
            </div>
          </div>
          <div className="px-5 py-5">
            {slide.content}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-8">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold font-body bg-slate-800/60 border border-slate-600 text-white/70 rounded-xl hover:bg-slate-700/60 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Sebelumnya
          </button>
          <span className="text-white/30 text-xs font-body">{currentSlide + 1} / {totalSlides}</span>
          <button
            onClick={goNext}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold font-body bg-primary/20 border border-primary/50 text-primary rounded-xl hover:bg-primary/30 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Selanjutnya →
          </button>
        </div>

        <div className="text-center">
          <button onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Bangun Ruang Sisi Lengkung
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabungPage;
