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

const GrafikTitikPotong = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 280 220"
    width="280"
    height="220"
    className="my-3"
    style={{ display: "block" }}
  >
    {/* X axis */}
    <line x1="20" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
    <polygon points="260,120 253,116 253,124" fill="rgba(255,255,255,0.85)" />
    {/* Y axis */}
    <line x1="100" y1="210" x2="100" y2="10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
    <polygon points="100,10 96,17 104,17" fill="rgba(255,255,255,0.85)" />
    {/* The line through (0,b)=(100,65) and (a,0)=(185,120), extended */}
    <line x1="22" y1="14" x2="238" y2="173" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
    {/* Arrow at lower-right end */}
    <polygon
      points="238,173 228,163 235,160"
      fill="rgba(255,255,255,0.85)"
    />
    {/* Arrow at upper-left end */}
    <polygon
      points="22,14 32,24 25,27"
      fill="rgba(255,255,255,0.85)"
    />
    {/* Dot at b point (0, b) = (100, 65) */}
    <circle cx="100" cy="65" r="2.5" fill="rgba(255,255,255,0.9)" />
    {/* Dot at a point (a, 0) = (185, 120) */}
    <circle cx="185" cy="120" r="2.5" fill="rgba(255,255,255,0.9)" />
    {/* Label b */}
    <text x="112" y="70" fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily="serif" fontStyle="italic">b</text>
    {/* Label a */}
    <text x="188" y="137" fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily="serif" fontStyle="italic">a</text>
  </svg>
);

const TabelTitikGrafik = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 160"
    width="200"
    height="160"
    className="my-3"
    style={{ display: "block" }}
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

const materiSection = {
  title: "MATERI - PERSAMAAN GARIS",
  sections: [
    {
      heading: "A. Bentuk Umum Persamaan Garis Lurus",
      content: `Eksplisit : $y = mx + c$
Implisit : $ax + by + c = 0$

1. Menggambar Grafik
Gunakan minimal 2 titik koordinat diantaranya kita bisa menggunakan titik ketika nilai $x = 0$ atau titik ketika nilai $y = 0$
[TABLE_TITIK]
Misalkan didapat titik potong sumbu x adalah (a, 0) dan titik potong sumbu y (0, b) maka gambar grafiknya adalah
[GRAFIK_TITIK]

2. Menentukan gradien/kemiringan garis lurus
a. Diketahui panjang sisi tegak dan sisi datar
$m = + \\frac{\\text{Panjang sisi tegak}}{\\text{Panjang sisi datar}}$ (naik ke kanan)
$m = - \\frac{\\text{Panjang sisi tegak}}{\\text{Panjang sisi datar}}$ (turun ke kanan)

b. Diketahui 2 titik yang dilalui
Garis melalui titik $A(x_1, y_1)$ dan $B(x_2, y_2)$
$m = \\frac{y_2 - y_1}{x_2 - x_1}$

c. Diketahui nama persamaan garis
$ax + by = c$ maka $m = -\\frac{a}{b}$
$y = mx + c$ maka gradien adalah $m$ (koefisien $x$)`
    },
    {
      heading: "B. Menyusun Persamaan Garis Lurus",
      content: `a. Melalui titik $(x_1, y_1)$ dan bergradien $m$
$y - y_1 = m(x - x_1)$

b. Melalui 2 titik yaitu $A(x_1, y_1)$ dan $B(x_2, y_2)$
$\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}$`
    },
    {
      heading: "C. Hubungan Dua Garis Lurus",
      content: `a. Hubungan 2 garis yang saling sejajar
Jika $g \\parallel h$ maka gradiennya sama, $m_g = m_h$
Jika $g : ax + by + c = 0$ dan $g \\parallel h$ serta melalui $A(x_1, y_1)$, maka $h : ax + by = ax_1 + by_1$

b. Hubungan dua garis saling tegak lurus
$g \\perp h$ maka $m_g \\cdot m_h = -1$
Jika $g : ax + by + c = 0$ dan tegak lurus $h$ serta melalui $A(x_1, y_1)$, maka $h : ax + by = bx_1 - ay_1$

c. Berpotongan
Titik potong garis $g$ dan $h$ adalah $A(x_1, y_1)$ (diperoleh substitusi - eliminasi)

d. Berimpit
$g = A \\cdot h$ dengan A : Koefisien`
    },
  ]
};

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
            {materiSection.sections.map((section, idx) => (
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
                  <div className="px-5 pb-4">
                    <div className="font-body text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                      {section.content.split('\n').map((line, i) => {
                        if (line === '[TABLE_TITIK]') {
                          return <TabelTitikGrafik key={i} />;
                        }
                        if (line === '[GRAFIK_TITIK]') {
                          return <GrafikTitikPotong key={i} />;
                        }
                        return <div key={i} className="mb-1">{renderWithLatex(line)}</div>;
                      })}
                    </div>
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
