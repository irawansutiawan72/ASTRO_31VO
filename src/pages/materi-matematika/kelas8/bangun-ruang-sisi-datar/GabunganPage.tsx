import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Layers, ChevronDown, ChevronUp } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { playPopSound } from "@/hooks/useAudio";

/* ─────────────────────────────────────────────────────────────
   SVGs — BANGUN RUANG GABUNGAN
───────────────────────────────────────────────────────────── */
const BalokLimasSVG = () => (
  <svg width="210" height="185" viewBox="0 0 210 185" className="mx-auto">
    <defs>
      <linearGradient id="gbBalok" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="gbLimas" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <polygon points="30,150 130,150 130,95 30,95" fill="url(#gbBalok)" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="130,150 155,125 155,70 130,95" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="30,95 130,95 155,70 55,70" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" />
    <line x1="30" y1="150" x2="55" y2="125" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="55" y1="125" x2="155" y2="125" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="55" y1="125" x2="55" y2="70" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <text x="75" y="165" fill="#818cf8" fontSize="9" textAnchor="middle">p</text>
    <text x="155" y="112" fill="#818cf8" fontSize="9" textAnchor="middle">l</text>
    <text x="12" y="125" fill="#818cf8" fontSize="9" textAnchor="middle">t₁</text>
    <line x1="92" y1="22" x2="30" y2="95" stroke="#f43f5e" strokeWidth="1.8" />
    <line x1="92" y1="22" x2="130" y2="95" stroke="#f43f5e" strokeWidth="1.8" />
    <line x1="92" y1="22" x2="155" y2="70" stroke="#f43f5e" strokeWidth="1.8" />
    <line x1="92" y1="22" x2="55" y2="70" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.7" />
    <polygon points="30,95 130,95 92,22" fill="url(#gbLimas)" stroke="#f43f5e" strokeWidth="1.5" />
    <polygon points="130,95 155,70 92,22" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.5" />
    <circle cx="92" cy="22" r="3" fill="#fb7185" />
    <text x="88" y="16" fill="#fb7185" fontSize="9" fontFamily="monospace">T</text>
    <text x="168" y="45" fill="#fb7185" fontSize="9">t₂</text>
    <text x="105" y="180" fill="#818cf8" fontSize="8" textAnchor="middle">Balok + Limas Segiempat</text>
  </svg>
);

const KubusPrismaSVG = () => (
  <svg width="210" height="185" viewBox="0 0 210 185" className="mx-auto">
    <polygon points="30,155 110,155 110,95 30,95" fill="#6366f1" fillOpacity="0.35" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="110,155 135,130 135,70 110,95" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="30,95 110,95 135,70 55,70" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" />
    <line x1="30" y1="155" x2="55" y2="130" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="55" y1="130" x2="135" y2="130" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="55" y1="130" x2="55" y2="70" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="70" y1="45" x2="158" y2="45" stroke="#f59e0b" strokeWidth="1.8" />
    <polygon points="30,95 110,95 158,45 70,45" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
    <polygon points="110,95 135,70 158,45" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
    <polygon points="30,95 55,70 70,45" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.7" />
    <polygon points="30,95 110,95 70,45" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
    {[[70,45],[158,45]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="2" fill="#fcd34d" />
    ))}
    <text x="62" y="42" fill="#fcd34d" fontSize="9" fontFamily="monospace">P</text>
    <text x="160" y="42" fill="#fcd34d" fontSize="9" fontFamily="monospace">Q</text>
    <text x="105" y="177" fill="#818cf8" fontSize="8" textAnchor="middle">Kubus + Prisma Segitiga (Rumah)</text>
  </svg>
);

const DuaBalokSVG = () => (
  <svg width="215" height="175" viewBox="0 0 215 175" className="mx-auto">
    <polygon points="10,155 90,155 90,100 10,100" fill="#6366f1" fillOpacity="0.35" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="90,155 110,138 110,83 90,100" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="1.5" />
    <polygon points="10,100 90,100 110,83 30,83" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" />
    <line x1="10" y1="155" x2="30" y2="138" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="30" y1="138" x2="110" y2="138" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="30" y1="138" x2="30" y2="83" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <polygon points="90,100 165,100 165,55 90,55" fill="#f43f5e" fillOpacity="0.35" stroke="#fb7185" strokeWidth="1.5" />
    <polygon points="165,100 185,83 185,38 165,55" fill="#f43f5e" fillOpacity="0.2" stroke="#fb7185" strokeWidth="1.5" />
    <polygon points="90,55 165,55 185,38 110,38" fill="#f43f5e" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1.5" />
    <line x1="90" y1="100" x2="110" y2="83" stroke="#fb7185" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="110" y1="83" x2="185" y2="83" stroke="#fb7185" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <line x1="110" y1="83" x2="110" y2="38" stroke="#fb7185" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5" />
    <text x="105" y="168" fill="#818cf8" fontSize="8" textAnchor="middle">Gabungan 2 Balok (Undakan)</text>
  </svg>
);

const LuasGabunganSVG = () => (
  <svg width="240" height="170" viewBox="0 0 240 170" className="mx-auto my-2">
    <defs>
      <style>{`
        @keyframes lgPulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .lg-b{animation:lgPulse 2s ease-in-out infinite;}
        .lg-l{animation:lgPulse 2s ease-in-out infinite 0.5s;}
        .lg-x{animation:lgPulse 2s ease-in-out infinite 1s;}
      `}</style>
    </defs>
    <polygon points="30,135 120,135 120,85 30,85" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" className="lg-b"/>
    <polygon points="120,135 140,118 140,68 120,85" fill="#6366f1" fillOpacity="0.18" stroke="#818cf8" strokeWidth="1.5" className="lg-b"/>
    <polygon points="30,85 120,85 140,68 50,68" fill="#6366f1" fillOpacity="0.25" stroke="#818cf8" strokeWidth="1.5" className="lg-b"/>
    <line x1="30" y1="135" x2="50" y2="118" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.4"/>
    <line x1="50" y1="118" x2="140" y2="118" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.4"/>
    <line x1="50" y1="118" x2="50" y2="68" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.4"/>
    <line x1="85" y1="38" x2="30" y2="85" stroke="#f43f5e" strokeWidth="1.8" className="lg-l"/>
    <line x1="85" y1="38" x2="120" y2="85" stroke="#f43f5e" strokeWidth="1.8" className="lg-l"/>
    <line x1="85" y1="38" x2="140" y2="68" stroke="#f43f5e" strokeWidth="1.8" className="lg-l"/>
    <line x1="85" y1="38" x2="50" y2="68" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.6" className="lg-l"/>
    <circle cx="85" cy="38" r="3" fill="#fb7185"/>
    <text x="200" y="55" fill="#94a3b8" fontSize="9" fontFamily="monospace">Bidang</text>
    <text x="200" y="68" fill="#22c55e" fontSize="9" fontFamily="monospace" className="lg-x">✓ terlihat</text>
    <text x="200" y="85" fill="#f43f5e" fontSize="9" fontFamily="monospace" className="lg-x">✗ tersembunyi</text>
    <line x1="30" y1="135" x2="120" y2="135" stroke="#22c55e" strokeWidth="2.5"/>
    <line x1="30" y1="135" x2="30" y2="85" stroke="#22c55e" strokeWidth="2.5"/>
    <line x1="120" y1="135" x2="140" y2="118" stroke="#22c55e" strokeWidth="2.5"/>
    <line x1="30" y1="85" x2="120" y2="85" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="120" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle">Alas limas = Atap balok (tidak dihitung 2x)</text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   EXAMPLE CARD
───────────────────────────────────────────────────────────── */
type Ex = { level: string; color: string; bg: string; border: string; badgeBg: string; question: React.ReactNode; answer: React.ReactNode };

const ExampleCard = ({ ex, idx }: { ex: Ex; idx: number }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`border ${ex.border} rounded-xl overflow-hidden`}>
      <div className={`${ex.bg} px-5 py-4`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold font-display px-2 py-0.5 rounded ${ex.badgeBg} ${ex.color} border ${ex.border}`}>
            Soal {idx + 1} — {ex.level}
          </span>
        </div>
        {ex.question}
      </div>
      <button onClick={() => { playPopSound(); setShow(v => !v); }}
        className="w-full flex items-center justify-between px-5 py-3 bg-slate-800/60 hover:bg-slate-800/90 transition-colors cursor-pointer border-t border-slate-700/50">
        <span className={`text-xs font-semibold font-body ${ex.color}`}>{show ? "Sembunyikan" : "Lihat Pembahasan"}</span>
        {show ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {show && <div className="px-5 py-4 bg-slate-900/60 border-t border-slate-700/30">{ex.answer}</div>}
    </div>
  );
};

const examples: Ex[] = [
  {
    level: "MUDAH", color: "text-green-400", bg: "bg-green-950/30", border: "border-green-700/50", badgeBg: "bg-green-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah tugu berbentuk balok berukuran <InlineMath math="5 \times 5 \times 8" /> m dengan limas segiempat beraturan di atasnya (alas sama, tinggi limas 3 m).</p>
        <p>Hitunglah <strong>volume total</strong> tugu tersebut!</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 space-y-2 text-xs">
          <BlockMath math="V_{\text{balok}} = 5 \times 5 \times 8 = 200\text{ m}^3" />
          <BlockMath math="V_{\text{limas}} = \tfrac{1}{3} \times 25 \times 3 = 25\text{ m}^3" />
          <BlockMath math="V_{\text{total}} = 200 + 25 = 225\text{ m}^3" />
        </div>
        <div className="bg-green-950/60 border border-green-700/40 rounded p-2">
          <p className="text-green-300 font-semibold text-xs">✅ Volume total = <InlineMath math="225\text{ m}^3" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SEDANG", color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-700/50", badgeBg: "bg-yellow-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Sebuah miniatur rumah berbentuk kubus (s = 6 cm) sebagai badan dan prisma segitiga sama kaki sebagai atap (alas 6 cm, tinggi segitiga 4 cm, panjang atap 6 cm).</p>
        <p>Tentukan <strong>volume total</strong> miniatur rumah tersebut!</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 space-y-2 text-xs">
          <BlockMath math="V_{\text{kubus}} = 6^3 = 216\text{ cm}^3" />
          <BlockMath math="L_{\triangle} = \tfrac{1}{2} \times 6 \times 4 = 12\text{ cm}^2" />
          <BlockMath math="V_{\text{prisma}} = 12 \times 6 = 72\text{ cm}^3" />
          <BlockMath math="V_{\text{total}} = 216 + 72 = 288\text{ cm}^3" />
        </div>
        <div className="bg-yellow-950/60 border border-yellow-700/40 rounded p-2">
          <p className="text-yellow-300 font-semibold text-xs">✅ Volume total = <InlineMath math="288\text{ cm}^3" /></p>
        </div>
      </div>
    ),
  },
  {
    level: "SULIT", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-700/50", badgeBg: "bg-red-900/60",
    question: (
      <div className="text-sm text-white/85 font-body space-y-1">
        <p>Rumah miniatur terdiri dari balok (<InlineMath math="10 \times 8 \times 6" /> cm) dan atap prisma segitiga sama kaki (alas 10 cm, tinggi segitiga 4 cm, panjang 8 cm).</p>
        <p>Hitung <strong>luas permukaan yang terlihat dari luar</strong> (alas balok, 4 sisi balok, 2 segitiga atap, 2 sisi miring atap).</p>
        <p className="text-xs text-white/60">Sisi atas balok tertutup atap, tidak dihitung.</p>
      </div>
    ),
    answer: (
      <div className="space-y-3 text-sm font-body">
        <p className="text-red-400 font-semibold text-xs">Langkah 1 — Sisi balok yang terlihat (tanpa tutup atas):</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="L_{\text{alas}} = 10 \times 8 = 80\text{ cm}^2" />
          <BlockMath math="L_{\text{4 sisi}} = 2(10\times6) + 2(8\times6) = 120 + 96 = 216\text{ cm}^2" />
        </div>
        <p className="text-red-400 font-semibold text-xs">Langkah 2 — Atap prisma:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs space-y-1">
          <BlockMath math="L_{\triangle} = 2 \times \tfrac{1}{2} \times 10 \times 4 = 40\text{ cm}^2" />
          <p className="text-white/60">Apotema sisi miring atap = √(4²+5²) = √41 ≈ 6,4 cm</p>
          <BlockMath math="L_{\text{miring}} = 2 \times (6{,}4 \times 8) = 102{,}4\text{ cm}^2" />
        </div>
        <p className="text-red-400 font-semibold text-xs">Langkah 3 — Total:</p>
        <div className="bg-slate-800/60 border border-slate-600 rounded p-3 text-xs">
          <BlockMath math="L_{\text{total}} = 80 + 216 + 40 + 102{,}4 = 438{,}4\text{ cm}^2" />
        </div>
        <div className="bg-red-950/60 border border-red-700/40 rounded p-2 text-xs">
          <p className="text-red-300 font-semibold">✅ Luas permukaan ≈ <InlineMath math="438{,}4\text{ cm}^2" /></p>
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   SLIDES DATA
───────────────────────────────────────────────────────────── */
type Slide = { icon: string; title: string; content: React.ReactNode };

const slides: Slide[] = [
  {
    icon: "🏗️",
    title: "Pengantar",
    content: (
      <div className="space-y-3 text-sm font-body text-white/75 leading-relaxed">
        <p>
          <strong className="text-cyan-300">Bangun ruang gabungan</strong> adalah bangun ruang yang terbentuk dari
          dua atau lebih bangun ruang dasar yang digabungkan. Contoh nyata: rumah (kubus + prisma atap),
          tugu (balok + limas), gedung bertingkat (beberapa balok), dan lain-lain.
        </p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { svg: <BalokLimasSVG />, label: "Balok + Limas" },
            { svg: <KubusPrismaSVG />, label: "Kubus + Prisma" },
            { svg: <DuaBalokSVG />, label: "2 Balok" },
          ].map(({ svg, label }, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-lg p-2 flex flex-col items-center gap-1">
              <div className="w-full">{svg}</div>
              <span className="text-[9px] text-white/50 font-body text-center">{label}</span>
            </div>
          ))}
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs text-white/60 space-y-1">
          <p className="text-cyan-300 font-semibold mb-1">📋 Materi dalam bab ini:</p>
          <p>• Konsep volume bangun gabungan</p>
          <p>• Konsep luas permukaan bangun gabungan</p>
          <p>• Contoh: Balok + Limas</p>
          <p>• Contoh: Kubus/Balok + Prisma (Rumah)</p>
          <p>• Contoh: Gabungan dua balok</p>
          <p>• Contoh soal bertingkat</p>
        </div>
      </div>
    ),
  },
  {
    icon: "📦",
    title: "Konsep Volume Gabungan",
    content: (
      <div className="space-y-3 text-sm font-body text-white/85">
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3">
          <p className="text-cyan-300 font-semibold mb-1">💡 Prinsip Utama:</p>
          <p className="text-sm text-white/75">Volume bangun gabungan = <strong className="text-yellow-300">jumlah volume semua bagian</strong>.</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 space-y-2">
          <p className="text-cyan-300 font-semibold text-xs">Rumus Umum:</p>
          <BlockMath math="V_{\text{gabungan}} = V_1 + V_2 + V_3 + \ldots" />
        </div>
        <div className="space-y-2 text-xs text-white/70">
          <p className="text-white/85 font-semibold">Contoh kombinasi populer:</p>
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 space-y-1">
            <p>• <strong className="text-blue-300">Balok + Limas:</strong> <InlineMath math="V = p \cdot l \cdot t_1 + \tfrac{1}{3} \cdot p \cdot l \cdot t_2" /></p>
            <p>• <strong className="text-yellow-300">Kubus + Prisma △:</strong> <InlineMath math="V = s^3 + L_{\triangle} \cdot t" /></p>
            <p>• <strong className="text-orange-300">Dua Balok:</strong> <InlineMath math="V = V_{balok1} + V_{balok2}" /></p>
          </div>
        </div>
        <div className="bg-yellow-950/40 border border-yellow-700/30 rounded-lg p-3 text-xs text-yellow-200 space-y-1">
          <p className="font-semibold">⚠️ Perhatian!</p>
          <p>Pastikan kamu mengidentifikasi <strong className="text-yellow-300">batas antara dua bangun</strong> dengan benar agar tidak salah menentukan dimensinya.</p>
        </div>
      </div>
    ),
  },
  {
    icon: "🎨",
    title: "Konsep Luas Permukaan Gabungan",
    content: (
      <div className="space-y-3 text-sm font-body text-white/85">
        <div className="bg-violet-950/50 border border-violet-700/40 rounded-lg p-3">
          <p className="text-violet-300 font-semibold mb-1">⚠️ Kunci Penting:</p>
          <p className="text-sm text-white/75">Luas permukaan gabungan <strong className="text-red-300">BUKAN</strong> jumlah semua luas permukaan bagiannya. Bidang yang <strong className="text-yellow-300">saling menempel tidak dihitung</strong>!</p>
        </div>
        <LuasGabunganSVG />
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 space-y-2 text-xs">
          <p className="text-cyan-300 font-semibold">Langkah-langkah:</p>
          <p>1. Identifikasi <strong className="text-green-300">bidang yang terlihat dari luar</strong></p>
          <p>2. Identifikasi <strong className="text-red-300">bidang yang tersembunyi</strong> (saling menempel antar bangun)</p>
          <p>3. Hitung luas semua bidang yang terlihat saja</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
          <p className="text-orange-300 font-semibold">Contoh Balok + Limas:</p>
          <BlockMath math="L = L_{\text{balok tanpa tutup}} + L_{\text{selimut limas}}" />
          <p className="text-white/50">Alas limas = tutup balok → bidang ini tidak dihitung!</p>
        </div>
      </div>
    ),
  },
  {
    icon: "🏢",
    title: "Contoh: Balok + Limas",
    content: (
      <div className="space-y-3 text-sm font-body text-white/85">
        <BalokLimasSVG />
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs space-y-2">
          <p className="text-cyan-300 font-semibold">Diketahui: Balok (p × l × t₁) + Limas segiempat (alas sama, tinggi t₂)</p>
          <div className="space-y-2">
            <p className="text-blue-300 font-semibold">Volume:</p>
            <BlockMath math="V = p \cdot l \cdot t_1 + \frac{1}{3} \cdot p \cdot l \cdot t_2" />
            <p className="text-orange-300 font-semibold">Luas Permukaan:</p>
            <BlockMath math="L = L_{\text{alas balok}} + 4 \cdot L_{\text{sisi balok}} + 4 \cdot L_{\triangle}" />
            <p className="text-white/50">Tutup balok (= alas limas) tidak dihitung!</p>
          </div>
        </div>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-xs text-cyan-200">
          <p>🌍 <strong>Contoh nyata:</strong> Tugu kota, monumen, piramida dengan alas berbentuk gedung</p>
        </div>
      </div>
    ),
  },
  {
    icon: "🏠",
    title: "Contoh: Kubus/Balok + Prisma (Rumah)",
    content: (
      <div className="space-y-3 text-sm font-body text-white/85">
        <KubusPrismaSVG />
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs space-y-2">
          <p className="text-cyan-300 font-semibold">Diketahui: Kubus (s) + Atap Prisma Segitiga</p>
          <div className="space-y-2">
            <p className="text-blue-300 font-semibold">Volume:</p>
            <BlockMath math="V = s^3 + L_{\triangle} \times t_{\text{prisma}}" />
            <p className="text-orange-300 font-semibold">Luas Permukaan:</p>
            <BlockMath math="L = L_{\text{alas}} + 4 \cdot L_{\text{sisi kubus}} + 2 \cdot L_{\triangle} + 2 \cdot L_{\text{sisi miring}}" />
            <p className="text-white/50">Tutup kubus (= alas prisma) tidak dihitung!</p>
          </div>
        </div>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-xs text-cyan-200">
          <p>🏠 <strong>Contoh nyata:</strong> Rumah, gazebo, tenda, miniatur bangunan</p>
        </div>
      </div>
    ),
  },
  {
    icon: "🏗️",
    title: "Contoh: Dua Balok Gabungan",
    content: (
      <div className="space-y-3 text-sm font-body text-white/85">
        <DuaBalokSVG />
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs space-y-2">
          <p className="text-cyan-300 font-semibold">Dua balok yang disambung (undakan / L-shape):</p>
          <p className="text-blue-300 font-semibold">Volume:</p>
          <BlockMath math="V = V_{\text{balok 1}} + V_{\text{balok 2}}" />
          <p className="text-orange-300 font-semibold">Luas Permukaan:</p>
          <p className="text-white/70">Jumlahkan luas semua bidang yang terlihat dari luar. Bidang sambungan antar balok tidak dihitung.</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs space-y-1">
          <p className="text-yellow-300 font-semibold">💡 Tips untuk bangun L-shape:</p>
          <p className="text-white/70">Bisa juga dihitung sebagai <strong className="text-cyan-300">satu balok besar dikurangi satu balok kecil</strong> (selisih volume).</p>
          <BlockMath math="V = V_{\text{besar}} - V_{\text{yang dipotong}}" />
        </div>
      </div>
    ),
  },
  {
    icon: "📊",
    title: "Kesimpulan & Strategi",
    content: (
      <div className="space-y-3 font-body text-sm">
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs text-center">
            <thead><tr className="bg-slate-800">
              <th className="px-2 py-2 text-cyan-300 border-r border-slate-700 text-left">Bangun</th>
              <th className="px-2 py-2 text-cyan-300 border-r border-slate-700">Volume</th>
              <th className="px-2 py-2 text-cyan-300">L. Permukaan</th>
            </tr></thead>
            <tbody>
              {[
                ["Balok + Limas", "V_B + V_L", "L_alas + 4L_sisi + 4L△"],
                ["Kubus + Prisma △", "V_K + V_P", "4L_sisi + 2L△ + 2L_miring + L_alas"],
                ["Dua Balok", "V₁ + V₂", "Semua sisi terlihat"],
                ["Balok − Limas", "V_B − V_L", "Permukaan luar + lubang"],
              ].map(([b, v, l], i) => (
                <tr key={i} className={`border-t border-slate-700 ${i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-800/30"}`}>
                  <td className="px-2 py-2 text-white/85 font-semibold border-r border-slate-700 text-left text-[10px]">{b}</td>
                  <td className="px-2 py-2 text-yellow-300 font-mono border-r border-slate-700 text-[10px]">{v}</td>
                  <td className="px-2 py-2 text-blue-300 text-left text-[10px]">{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-cyan-950/50 border border-cyan-700/40 rounded-lg p-3 text-xs text-cyan-200 space-y-1">
          <p className="text-cyan-300 font-semibold">🎯 Strategi 3 Langkah:</p>
          <p>1. <strong className="text-yellow-300">Identifikasi</strong> semua bangun penyusun dan dimensinya</p>
          <p>2. <strong className="text-yellow-300">Hitung</strong> volume/luas masing-masing bagian</p>
          <p>3. <strong className="text-yellow-300">Gabungkan</strong> dengan benar (ingat bidang yang tidak dihitung!)</p>
        </div>
      </div>
    ),
  },
  {
    icon: "📝",
    title: "Contoh Soal Bertingkat",
    content: (
      <div className="flex flex-col gap-3">
        {examples.map((ex, i) => <ExampleCard key={i} ex={ex} idx={i} />)}
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const GabunganPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = slides.length;

  const goNext = () => { playPopSound(); setCurrentSlide(s => Math.min(s + 1, total - 1)); };
  const goPrev = () => { playPopSound(); setCurrentSlide(s => Math.max(s - 1, 0)); };

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        <Layers className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-2xl font-bold text-primary text-glow-cyan mb-1 text-center">
          BANGUN RUANG GABUNGAN
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 8 · Bangun Ruang Sisi Datar</p>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mb-6 flex-wrap">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { playPopSound(); setCurrentSlide(i); }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === currentSlide
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Slide card */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden mb-4">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-white/5">
            <span className="flex items-center gap-2">
              <span className="text-lg">{slide.icon}</span>
              <span className="font-display text-sm font-semibold text-white">{slide.title}</span>
            </span>
            <span className="text-xs text-muted-foreground font-body">{currentSlide + 1} / {total}</span>
          </div>
          <div className="px-5 py-5">{slide.content}</div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display
              text-white/70 hover:text-white hover:border-primary/60 hover:bg-primary/10
              disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={goNext}
            disabled={currentSlide === total - 1}
            className="flex-1 py-2.5 rounded-lg border border-primary/60 bg-primary/15 text-sm font-semibold font-display
              text-primary hover:bg-primary/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Selanjutnya →
          </button>
        </div>

        <div className="mt-2 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-8/bangun-ruang-sisi-datar"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Bangun Ruang Sisi Datar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GabunganPage;
