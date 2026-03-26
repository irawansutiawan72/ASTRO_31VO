import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const renderWithLatex = (text: string) => {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      return <InlineMath key={index} math={latex} />;
    }
    return <span key={index}>{part}</span>;
  });
};

const GrafikTitikPotong = () => {
  // Origin at SVG coord (100, 120)
  // b on y-axis: (100, 60) — 60px above origin
  // a on x-axis: (190, 120) — 90px right of origin
  // Line direction unit vector: (90,60)/108.2 ≈ (0.832, 0.555)
  // Line extended: (46, 24) → (232, 148)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 220"
      width="280"
      height="220"
      className="my-3"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* X axis */}
      <line x1="20" y1="120" x2="258" y2="120" stroke="#FF8C00" strokeWidth="1.5" />
      <polygon points="260,120 252,116 252,124" fill="#FF8C00" />
      {/* Y axis */}
      <line x1="100" y1="208" x2="100" y2="12" stroke="#FF8C00" strokeWidth="1.5" />
      <polygon points="100,10 96,18 104,18" fill="#FF8C00" />

      {/* Line through b=(100,60) and a=(190,120), extended to (46,24)→(232,148) */}
      <line x1="46" y1="24" x2="232" y2="148" stroke="#FF8C00" strokeWidth="1.5" />
      {/* Upper-left arrowhead at (46,24) pointing toward upper-left */}
      <polygon points="46,24 51,33 56,26" fill="#FF8C00" />
      {/* Lower-right arrowhead at (232,148) pointing toward lower-right */}
      <polygon points="232,148 222,146 227,139" fill="#FF8C00" />

      {/* Dot exactly on y-axis at b: (100, 60) */}
      <circle cx="100" cy="60" r="2.5" fill="#FF8C00" />
      {/* Dot exactly on x-axis at a: (190, 120) */}
      <circle cx="190" cy="120" r="2.5" fill="#FF8C00" />

      {/* Label b — right of y-axis, at the b intersection */}
      <text x="108" y="65" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">b</text>
      {/* Label a — below x-axis, at the a intersection */}
      <text x="186" y="138" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">a</text>
    </svg>
  );
};

// Graph 2: passes through (-a,0) on x-axis [left of origin] and (0,b) on y-axis [above origin]
// Origin SVG: (100,120). -a at (40,120). b at (100,60).
// Line: (12,148) → (142,18). Slope check: (18-148)/(142-12)=-130/130=-1 ✓
const GrafikTitikPotong2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 220" width="280" height="220" className="my-3" style={{ display: "block", margin: "0 auto" }}>
    <line x1="20" y1="120" x2="258" y2="120" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="260,120 252,116 252,124" fill="#FF8C00" />
    <line x1="100" y1="208" x2="100" y2="12" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="100,10 96,18 104,18" fill="#FF8C00" />
    {/* Line through -a=(40,120) and b=(100,60), extended */}
    <line x1="12" y1="148" x2="142" y2="18" stroke="#FF8C00" strokeWidth="1.5" />
    {/* Arrow upper-right at (142,18) */}
    <polygon points="142,18 133,22 138,27" fill="#FF8C00" />
    {/* Arrow lower-left at (12,148) */}
    <polygon points="12,148 21,144 16,139" fill="#FF8C00" />
    {/* Dots */}
    <circle cx="40" cy="120" r="2.5" fill="#FF8C00" />
    <circle cx="100" cy="60" r="2.5" fill="#FF8C00" />
    {/* Labels */}
    <text x="108" y="65" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">b</text>
    <text x="28" y="138" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">-a</text>
  </svg>
);

// Graph 3: passes through (-a,0) on x-axis [left] and (0,-b) on y-axis [below origin]
// Origin SVG: (100,120). -a at (40,120). -b at (100,180).
// Line: (12,92) → (121,201). Slope check: (180-120)/(100-40)=60/60=1 ✓
const GrafikTitikPotong3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 220" width="280" height="220" className="my-3" style={{ display: "block", margin: "0 auto" }}>
    <line x1="20" y1="120" x2="258" y2="120" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="260,120 252,116 252,124" fill="#FF8C00" />
    <line x1="100" y1="208" x2="100" y2="12" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="100,10 96,18 104,18" fill="#FF8C00" />
    {/* Line through -a=(40,120) and -b=(100,180), extended */}
    <line x1="12" y1="92" x2="121" y2="201" stroke="#FF8C00" strokeWidth="1.5" />
    {/* Arrow upper-left at (12,92) */}
    <polygon points="12,92 21,96 16,101" fill="#FF8C00" />
    {/* Arrow lower-right at (121,201) */}
    <polygon points="121,201 112,197 117,192" fill="#FF8C00" />
    {/* Dots */}
    <circle cx="40" cy="120" r="2.5" fill="#FF8C00" />
    <circle cx="100" cy="180" r="2.5" fill="#FF8C00" />
    {/* Labels */}
    <text x="28" y="115" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">-a</text>
    <text x="108" y="185" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">-b</text>
  </svg>
);

// Graph 4: passes through (a,0) on x-axis [right] and (0,-b) on y-axis [below origin]
// Origin SVG: (100,120). a at (190,120). -b at (100,180).
// Line: (63,205) → (232,92). Slope check: (120-180)/(190-100)=-60/90=-0.667 ✓
const GrafikTitikPotong4 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 220" width="280" height="220" className="my-3" style={{ display: "block", margin: "0 auto" }}>
    <line x1="20" y1="120" x2="258" y2="120" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="260,120 252,116 252,124" fill="#FF8C00" />
    <line x1="100" y1="208" x2="100" y2="12" stroke="#FF8C00" strokeWidth="1.5" />
    <polygon points="100,10 96,18 104,18" fill="#FF8C00" />
    {/* Line through -b=(100,180) and a=(190,120), extended */}
    <line x1="63" y1="205" x2="232" y2="92" stroke="#FF8C00" strokeWidth="1.5" />
    {/* Arrow lower-left at (63,205) */}
    <polygon points="63,205 72,203 68,197" fill="#FF8C00" />
    {/* Arrow upper-right at (232,92) */}
    <polygon points="232,92 222,94 227,100" fill="#FF8C00" />
    {/* Dots */}
    <circle cx="190" cy="120" r="2.5" fill="#FF8C00" />
    <circle cx="100" cy="180" r="2.5" fill="#FF8C00" />
    {/* Labels */}
    <text x="186" y="138" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">a</text>
    <text x="108" y="185" fill="#FF8C00" fontSize="14" fontFamily="serif" fontStyle="italic">-b</text>
  </svg>
);

const TabelTitikGrafik = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 160"
    width="200"
    height="160"
    className="my-3"
    style={{ display: "block", margin: "0 auto" }}
  >
    <rect x="1" y="1" width="198" height="158" rx="4" ry="4"
      fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="100" y1="1" x2="100" y2="159" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="1" y1="54" x2="199" y2="54" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="1" y1="107" x2="199" y2="107" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <text x="50" y="33" textAnchor="middle" fill="rgba(255,255,255,0.9)"
      fontSize="18" fontFamily="serif" fontWeight="bold">x</text>
    <text x="150" y="33" textAnchor="middle" fill="rgba(255,255,255,0.9)"
      fontSize="18" fontFamily="serif" fontWeight="bold">y</text>
    <text x="50" y="88" textAnchor="middle" fill="rgba(255,255,255,0.7)"
      fontSize="22" fontFamily="serif">?</text>
    <text x="150" y="88" textAnchor="middle" fill="rgba(255,255,255,0.9)"
      fontSize="18" fontFamily="serif" fontWeight="bold">0</text>
    <text x="50" y="141" textAnchor="middle" fill="rgba(255,255,255,0.9)"
      fontSize="18" fontFamily="serif" fontWeight="bold">0</text>
    <text x="150" y="141" textAnchor="middle" fill="rgba(255,255,255,0.7)"
      fontSize="22" fontFamily="serif">?</text>
  </svg>
);

// Gradien Positif (m = +): line rises left-to-right
// Main line: (20,182)→(248,32). Triangle: P1=(65,152), P2=(210,57), corner=(210,152)
const GarisGradienPositif = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" width="280" height="200"
    className="my-2" style={{ display: "block", margin: "0 auto" }}>
    {/* Main line */}
    <line x1="20" y1="182" x2="248" y2="32" stroke="white" strokeWidth="2" />
    {/* Arrow lower-left */}
    <polygon points="20,182 30,181 25,174" fill="white" />
    {/* Arrow upper-right */}
    <polygon points="248,32 242,40 238,34" fill="white" />
    {/* Vertical dashed (sisi tegak): from P2=(210,57) down to corner=(210,152) */}
    <line x1="210" y1="57" x2="210" y2="152" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5,4" />
    {/* Horizontal dashed (sisi datar): from P1=(65,152) to corner=(210,152) */}
    <line x1="65" y1="152" x2="210" y2="152" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5,4" />
    {/* Right-angle square at corner (210,152) — inner toward upper-left */}
    <polyline points="202,152 202,144 210,144" fill="none" stroke="#4ADE80" strokeWidth="1.5" />
    {/* Label m = + */}
    <text x="218" y="29" fill="#34D399" fontSize="13" fontFamily="sans-serif" fontWeight="bold">m = +</text>
    {/* Label Panjang sisi tegak — right of vertical dashed */}
    <text x="216" y="112" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">Panjang sisi</text>
    <text x="216" y="126" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">tegak</text>
    {/* Label Panjang sisi datar — below horizontal dashed */}
    <text x="108" y="168" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">Panjang sisi datar</text>
  </svg>
);

// Gradien Negatif (m = -): line falls left-to-right
// Main line: (20,18)→(252,178). Triangle: P_upper=(70,53), P_lower=(210,153), corner=(70,153)
const GarisGradienNegatif = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" width="280" height="200"
    className="my-2" style={{ display: "block", margin: "0 auto" }}>
    {/* Main line */}
    <line x1="20" y1="18" x2="252" y2="178" stroke="white" strokeWidth="2" />
    {/* Arrow upper-left */}
    <polygon points="20,18 30,19 25,26" fill="white" />
    {/* Arrow lower-right */}
    <polygon points="252,178 241,176 247,169" fill="white" />
    {/* Vertical dashed (sisi tegak): from P_upper=(70,53) down to corner=(70,153) */}
    <line x1="70" y1="53" x2="70" y2="153" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5,4" />
    {/* Horizontal dashed (sisi datar): from corner=(70,153) to P_lower=(210,153) */}
    <line x1="70" y1="153" x2="210" y2="153" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5,4" />
    {/* Right-angle square at corner (70,153) — inner toward upper-right */}
    <polyline points="78,153 78,145 70,145" fill="none" stroke="#4ADE80" strokeWidth="1.5" />
    {/* Label m = - */}
    <text x="55" y="13" fill="#F472B6" fontSize="13" fontFamily="sans-serif" fontWeight="bold">m = -</text>
    {/* Label Panjang sisi tegak — left of vertical dashed */}
    <text x="2" y="100" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">Panjang sisi</text>
    <text x="2" y="114" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">tegak</text>
    {/* Label Panjang sisi datar — below horizontal dashed */}
    <text x="108" y="169" fill="#93C5FD" fontSize="11" fontFamily="sans-serif">Panjang sisi datar</text>
  </svg>
);

type SectionItem =
  | { t: 'heading'; text: string; color: string }
  | { t: 'text'; text: string; color?: string }
  | { t: 'formula'; headline: string; lines: string[]; color: string }
  | { t: 'svg'; name: string };

const colorMap: Record<string, { text: string; border: string; bg: string; dot: string }> = {
  cyan:   { text: 'text-cyan-300',   border: 'border-cyan-500/60',   bg: 'bg-cyan-950/40',   dot: 'bg-cyan-400' },
  green:  { text: 'text-green-300',  border: 'border-green-500/60',  bg: 'bg-green-950/40',  dot: 'bg-green-400' },
  purple: { text: 'text-purple-300', border: 'border-purple-500/60', bg: 'bg-purple-950/40', dot: 'bg-purple-400' },
  pink:   { text: 'text-pink-300',   border: 'border-pink-500/60',   bg: 'bg-pink-950/40',   dot: 'bg-pink-400' },
  blue:   { text: 'text-blue-300',   border: 'border-blue-500/60',   bg: 'bg-blue-950/40',   dot: 'bg-blue-400' },
  orange: { text: 'text-orange-300', border: 'border-orange-500/60', bg: 'bg-orange-950/40', dot: 'bg-orange-400' },
  teal:   { text: 'text-teal-300',   border: 'border-teal-500/60',   bg: 'bg-teal-950/40',   dot: 'bg-teal-400' },
};

interface FormulaCardProps { headline: string; lines: string[]; color: string; }
const FormulaCard = ({ headline, lines, color }: FormulaCardProps) => {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden my-3`}>
      <div className={`px-4 py-2 flex items-center gap-2 border-b ${c.border}`}>
        <span className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
        <span className={`font-display text-xs font-bold ${c.text} uppercase tracking-wide`}>{headline}</span>
      </div>
      <div className="px-4 py-3 space-y-1.5">
        {lines.map((line, i) => (
          <div key={i} className="font-body text-sm text-white/90 text-center">
            {renderWithLatex(line)}
          </div>
        ))}
      </div>
    </div>
  );
};

const materiSections: { heading: string; items: SectionItem[] }[] = [
  {
    heading: "A. Bentuk Umum Persamaan Garis Lurus",
    items: [
      { t: 'formula', headline: 'Bentuk Persamaan Garis Lurus', color: 'cyan', lines: [
        'Eksplisit : $y = mx + c$',
        'Implisit : $ax + by + c = 0$',
      ]},
      { t: 'heading', text: '1. Menggambar Grafik', color: 'cyan' },
      { t: 'text', text: 'Gunakan minimal 2 titik koordinat, yaitu ketika $x = 0$ atau ketika $y = 0$.' },
      { t: 'svg', name: 'TABLE_TITIK' },
      { t: 'text', text: 'Misalkan titik potong sumbu x adalah (a, 0) dan titik potong sumbu y adalah (0, b):', color: 'text-white/70' },
      { t: 'svg', name: 'GRAFIK_TITIK' },
      { t: 'text', text: 'Misalkan titik potong sumbu x adalah (-a, 0) dan titik potong sumbu y adalah (0, b):', color: 'text-white/70' },
      { t: 'svg', name: 'GRAFIK2' },
      { t: 'text', text: 'Misalkan titik potong sumbu x adalah (-a, 0) dan titik potong sumbu y adalah (0, -b):', color: 'text-white/70' },
      { t: 'svg', name: 'GRAFIK3' },
      { t: 'text', text: 'Misalkan titik potong sumbu x adalah (a, 0) dan titik potong sumbu y adalah (0, -b):', color: 'text-white/70' },
      { t: 'svg', name: 'GRAFIK4' },
      { t: 'heading', text: '2. Menentukan Gradien / Kemiringan Garis Lurus', color: 'green' },
      { t: 'formula', headline: 'a. Diketahui Panjang Sisi Tegak dan Sisi Datar', color: 'green', lines: [
        '$m = +\\dfrac{\\text{Panjang sisi tegak}}{\\text{Panjang sisi datar}}$ (naik ke kanan)',
        '$m = -\\dfrac{\\text{Panjang sisi tegak}}{\\text{Panjang sisi datar}}$ (turun ke kanan)',
      ]},
      { t: 'svg', name: 'GRADIEN_POSITIF' },
      { t: 'svg', name: 'GRADIEN_NEGATIF' },
      { t: 'formula', headline: 'b. Diketahui 2 Titik yang Dilalui', color: 'blue', lines: [
        'Garis melalui titik $A(x_1, y_1)$ dan $B(x_2, y_2)$',
        '$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$',
      ]},
      { t: 'formula', headline: 'c. Diketahui Persamaan Garis', color: 'pink', lines: [
        '$ax + by = c \\Rightarrow m = -\\dfrac{a}{b}$',
        '$y = mx + c \\Rightarrow$ gradien adalah $m$ (koefisien $x$)',
      ]},
    ],
  },
  {
    heading: "B. Menyusun Persamaan Garis Lurus",
    items: [
      { t: 'formula', headline: 'a. Melalui Titik (x₁, y₁) dan Bergradien m', color: 'teal', lines: [
        '$y - y_1 = m(x - x_1)$',
      ]},
      { t: 'formula', headline: 'b. Melalui 2 Titik: A(x₁, y₁) dan B(x₂, y₂)', color: 'orange', lines: [
        '$\\dfrac{y - y_1}{y_2 - y_1} = \\dfrac{x - x_1}{x_2 - x_1}$',
      ]},
    ],
  },
  {
    heading: "C. Hubungan Dua Garis Lurus",
    items: [
      { t: 'formula', headline: 'a. Garis Sejajar (g ∥ h)', color: 'cyan', lines: [
        'Jika $g \\parallel h$ maka gradiennya sama: $m_g = m_h$',
        'Jika $g : ax + by + c = 0$ dan $g \\parallel h$ melalui $A(x_1, y_1)$:',
        '$h : ax + by = ax_1 + by_1$',
      ]},
      { t: 'formula', headline: 'b. Garis Tegak Lurus (g ⊥ h)', color: 'pink', lines: [
        '$g \\perp h \\Rightarrow m_g \\cdot m_h = -1$',
        'Jika $g : ax + by + c = 0$ dan tegak lurus $h$ melalui $A(x_1, y_1)$:',
        '$h : bx - ay = bx_1 - ay_1$',
      ]},
      { t: 'formula', headline: 'c. Berpotongan', color: 'green', lines: [
        'Titik potong garis $g$ dan $h$ adalah $A(x_1, y_1)$',
        '(diperoleh dengan substitusi - eliminasi)',
      ]},
      { t: 'formula', headline: 'd. Berimpit', color: 'purple', lines: [
        '$g = A \\cdot h$ dengan $A$ adalah koefisien',
      ]},
    ],
  },
];

const latihanDasar = [
  { no: 1, soal: "Grafik garis dengan persamaan $2x - y = 3$, x dan y $\\in$ R adalah ...", options: ["A. (Gambar grafik)", "B. (Gambar grafik)", "C. (Gambar grafik)", "D. (Gambar grafik)"] },
  { no: 2, soal: "Grafik garis dengan persamaan $2x - y = 3$, x dan y $\\in$ R adalah ...", options: ["A. (Gambar grafik)", "B. (Gambar grafik)", "C. (Gambar grafik)", "D. (Gambar grafik)"] },
  { no: 3, soal: "Gradien garis h pada gambar di bawah adalah ...", options: ["A. $-\\frac{3}{2}$", "B. $-\\frac{2}{3}$", "C. $\\frac{2}{3}$", "D. $\\frac{3}{2}$"] },
  { no: 4, soal: "Perhatikan gambar! Gradien garis g adalah ...", options: ["A. $\\frac{3}{2}$", "B. $\\frac{2}{3}$", "C. $-\\frac{2}{3}$", "D. $-\\frac{3}{2}$"] },
  { no: 5, soal: "Gradien garis yang melalui titik $(2, 1)$ dan $(4, 7)$ adalah ...", options: ["A. 0,2", "B. 0,5", "C. 2", "D. 3"] },
  { no: 6, soal: "Gradien garis dengan persamaan $3x + 8y = 9$ adalah ...", options: ["A. $\\frac{8}{3}$", "B. $\\frac{3}{8}$", "C. $-\\frac{3}{8}$", "D. $-\\frac{8}{3}$"] },
  { no: 7, soal: "Gradien garis yang mempunyai persamaan $3y = 4x + 5$ adalah ...", options: ["A. $-\\frac{4}{5}$", "B. $\\frac{4}{3}$", "C. $\\frac{3}{4}$", "D. $\\frac{3}{5}$"] },
  { no: 8, soal: "Garis lurus p dan q saling tegak lurus. Jika persamaan garis $p: 6x - 3y - 28 = 0$, maka gradien garis q adalah ...", options: ["A. -2", "B. $-\\frac{1}{2}$", "C. $\\frac{1}{2}$", "D. 2"] },
  { no: 9, soal: "Sebuah titik $P(3, d)$ terletak pada garis yang melalui titik $Q(-2, 10)$ dan $R(1, 1)$, jika nilai d adalah ...", options: ["A. 13", "B. 7", "C. -5", "D. -13"] },
  { no: 10, soal: "Jika garis yang menghubungkan titik $(2a, 3)$ dan $(4, 9)$ mempunyai gradien 3, maka nilai a adalah ...", options: ["A. 1", "B. -1", "C. 2", "D. -2"] },
  { no: 11, soal: "Diantara persamaan garis berikut:\n(I). $2y = 8x + 20$\n(II). $6y = 12x + 18$\n(III). $3y = 12x + 15$\n(IV). $3y = -6x + 15$\nyang grafiknya saling sejajar adalah ...", options: ["A. (I) dan (II)", "B. (I) dan (III)", "C. (III) dan (IV)", "D. (II) dan (IV)"] },
  { no: 12, soal: "Di antara persamaan garis berikut:\n(I) $x + 2y = 8$\n(II) $x - 2y = 10$\n(III) $-2x + y - 9 = 0$\n(IV) $2x - y - 6 = 0$\nYang grafiknya saling tegak lurus adalah ...", options: ["A. (I) dan (II)", "B. (I) dan (III)", "C. (III) dan (IV)", "D. (II) dan (IV)"] },
  { no: 13, soal: "Persamaan garis yang melalui titik $(0, 3)$ dan gradien $\\frac{1}{2}$ adalah ...", options: ["A. $2x - 4y - 6 = 0$", "B. $2y - x = 6$", "C. $y - 4x - 6 = 0$", "D. $2y - 3x - 3 = 0$"] },
  { no: 14, soal: "Sebuah garis melalui titik $(8, 9)$ dan memiliki gradien $-\\frac{3}{4}$. Persamaan garis tersebut adalah ...", options: ["A. $4y - 3x - 60 = 0$", "B. $4y + 3x - 60 = 0$", "C. $4y - 3x + 60 = 0$", "D. $4y + 3x + 60 = 0$"] },
  { no: 15, soal: "Persamaan garis yang melalui titik $(2, -5)$ dan $(-3, 6)$ adalah ...", options: ["A. $11x - 5y = -3$", "B. $11x + 5y = -3$", "C. $11x + 5y = 3$", "D. $11x - 5y = 3$"] },
  { no: 16, soal: "Perhatikan gambar! Persamaan garis m adalah ...", options: ["A. $4y - 3x - 12 = 0$", "B. $4x - 3y - 12 = 0$", "C. $4y - 3x + 12 = 0$", "D. $4x - 3y + 12 = 0$"] },
  { no: 17, soal: "Perhatikan gambar berikut! Persamaan garis k adalah ...", options: ["A. $2x + 2y = 2$", "B. $2x - 2y = 2$", "C. $2x + 2y = -2$", "D. $2x - 2y = -2$"] },
  { no: 18, soal: "Garis g mempunyai persamaan $8x + 4y - 16 = 0$. Garis h sejajar dengan garis g dan melalui titik $(5, -3)$. Persamaan garis h adalah ...", options: ["A. $2x - y - 13 = 0$", "B. $2x + y - 7 = 0$", "C. $x - 2y - 7 = 0$", "D. $-x + 2y + 11 = 0$"] },
  { no: 19, soal: "Persamaan garis melalui $(-1, 2)$ dan tegak lurus terhadap garis $4y = -3x + 5$ adalah ...", options: ["A. $4x - 3y + 10 = 0$", "B. $4x - 3y - 10 = 0$", "C. $3x + 4y - 5 = 0$", "D. $3x + 4y + 5 = 0$"] },
  { no: 20, soal: "Perhatikan gambar berikut! Persamaan garis h adalah ...", options: ["A. $3x + y = 4$", "B. $3x - y = 4$", "C. $x + 3y = 4$", "D. $x - 3y = 4$"] },
  { no: 21, soal: "Perhatikan gambar berikut! Persamaan garis b adalah ...", options: ["A. $y = \\frac{3}{4}x - \\frac{16}{3}$", "B. $y = \\frac{4}{3}x - \\frac{16}{3}$", "C. $y = \\frac{3}{4}x + \\frac{16}{3}$", "D. $y = \\frac{4}{3}x + \\frac{16}{3}$"] },
  { no: 22, soal: "Perhatikan gambar berikut! Persamaan garis lurus b adalah ...", options: ["A. $2y - 3x = -5$", "B. $2y - 3x = 0$", "C. $3y - 2x = 5$", "D. $3y - 2x = 0$"] },
  { no: 23, soal: "Perhatikan gambar! Persamaan garis h adalah ...", options: ["A. $3y + 2x = 3$", "B. $3y - 2x = 3$", "C. $2x + 3y = 1$", "D. $3x - 2y = 3$"] },
  { no: 24, soal: "Perhatikan gambar di bawah ini! Persamaan garis adalah ...", options: ["A. $2x + 3y - 27 = 0$", "B. $2x + 3y + 27 = 0$", "C. $2x - 3y - 27 = 0$", "D. $3x + 2y - 27 = 0$"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2008 Tingkat Kota\nGaris g melalui titik $(-2, 3)$, memotong sumbu-x di titik A dan memotong sumbu-y di titik B. Jika jarak titik O dengan titik A sama dengan jarak titik O dengan titik B, maka persamaan garis g adalah ...", options: [] },
  { no: 2, soal: "OSN Matematika 2010 Tingkat Kota\nGaris l melalui titik $(-4, -3)$ dan $(3, 4)$. Jika garis l juga melalui titik $(a, b)$, maka nilai $\\frac{a^3 - b^3}{a^2 - b^2} + \\frac{2}{a^3 - b^3} = ...$", options: ["A. 23", "B. 1", "C. -1", "D. -28", "E. -31"] },
  { no: 3, soal: "OSN Matematika 2016 Tingkat Kota\nDiketahui dua titik $A(1, 1)$ dan $B(12, -1)$. Garis l dengan gradien $-\\frac{3}{4}$ melalui titik B. Jarak antara titik A dan garis l adalah ... satuan panjang", options: ["A. 4", "B. 5", "C. 6", "D. 7"] },
];

const OlimpiadePersamaanGarisPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade">("materi");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          OLIMPIADE - PERSAMAAN GARIS
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Irawan Sutiawan, M.Pd</p>

        <div className="flex gap-2 justify-center mb-6">
          {[
            { key: "materi" as const, label: "Materi" },
            { key: "dasar" as const, label: "Latihan Dasar" },
            { key: "olimpiade" as const, label: "Latihan Olimpiade" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { playPopSound(); setActiveTab(tab.key); }}
              className={`font-display text-xs px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                activeTab === tab.key
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card/80 text-white/70 border-border hover:border-accent/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "materi" && (
          <div className="space-y-3 animate-slide-up">
            {materiSections.map((section, idx) => (
              <div key={idx} className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                >
                  <span className="font-display text-sm text-accent font-bold">{section.heading}</span>
                  {expandedSections.includes(idx) ? (
                    <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                  )}
                </button>
                {expandedSections.includes(idx) && (
                  <div className="px-4 pb-5 pt-1 space-y-1">
                    {section.items.map((item, i) => {
                      if (item.t === 'formula') {
                        return <FormulaCard key={i} headline={item.headline} lines={item.lines} color={item.color} />;
                      }
                      if (item.t === 'heading') {
                        const c = colorMap[item.color] || colorMap.cyan;
                        return (
                          <div key={i} className={`font-display text-sm font-bold ${c.text} pt-3 pb-1`}>
                            {item.text}
                          </div>
                        );
                      }
                      if (item.t === 'text') {
                        return (
                          <div key={i} className={`font-body text-sm ${item.color || 'text-white/80'} leading-relaxed py-0.5`}>
                            {renderWithLatex(item.text)}
                          </div>
                        );
                      }
                      if (item.t === 'svg') {
                        const svgMap: Record<string, JSX.Element> = {
                          TABLE_TITIK: <TabelTitikGrafik />,
                          GRAFIK_TITIK: <GrafikTitikPotong />,
                          GRAFIK2: <GrafikTitikPotong2 />,
                          GRAFIK3: <GrafikTitikPotong3 />,
                          GRAFIK4: <GrafikTitikPotong4 />,
                          GRADIEN_POSITIF: <GarisGradienPositif />,
                          GRADIEN_NEGATIF: <GarisGradienNegatif />,
                        };
                        return <div key={i}>{svgMap[item.name]}</div>;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "dasar" && (
          <div className="space-y-4 animate-slide-up">
            {latihanDasar.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {renderWithLatex(soal.soal)}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "olimpiade" && (
          <div className="space-y-4 animate-slide-up">
            {latihanOlimpiade.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {lineIdx === 0 && line.startsWith('OSN') ? <span className="text-yellow-400 font-semibold">{line}</span> : renderWithLatex(line)}
                    </span>
                  ))}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/olimpiade"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadePersamaanGarisPage;
