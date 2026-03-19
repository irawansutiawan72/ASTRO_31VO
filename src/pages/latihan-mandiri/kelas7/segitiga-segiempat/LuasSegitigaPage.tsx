import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";

/* ─────────────── SVG DIAGRAMS ─────────────── */

const DiagramQ1 = () => (
  <svg viewBox="0 0 340 200" className="w-full max-w-sm mx-auto my-3" aria-label="Segitiga alas 12 tinggi 9">
    <polygon points="40,170 280,170 140,30" fill="rgba(59,130,246,0.12)" stroke="#60a5fa" strokeWidth="2" />
    <line x1="140" y1="30" x2="140" y2="170" stroke="#facc15" strokeWidth="1.5" strokeDasharray="5,4" />
    <polyline points="140,158 152,158 152,170" fill="none" stroke="#facc15" strokeWidth="1.5" />
    <text x="145" y="105" fill="#facc15" fontSize="12" fontFamily="monospace">9 cm</text>
    <text x="140" y="190" fill="#22d3ee" fontSize="13" fontFamily="monospace" textAnchor="middle">12 cm</text>
    <text x="35"  y="188" fill="#e2e8f0" fontSize="12" fontFamily="monospace">A</text>
    <text x="283" y="188" fill="#e2e8f0" fontSize="12" fontFamily="monospace">B</text>
    <text x="133" y="25"  fill="#e2e8f0" fontSize="12" fontFamily="monospace">C</text>
  </svg>
);

const DiagramQ3 = () => (
  <svg viewBox="0 0 300 220" className="w-full max-w-xs mx-auto my-3" aria-label="Segitiga siku-siku PQR">
    <polygon points="40,180 40,40 240,180" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="2" />
    <polyline points="40,168 52,168 52,180" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
    <text x="27"  y="38"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">P</text>
    <text x="27"  y="196" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">Q</text>
    <text x="246" y="196" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">R</text>
    <text x="10"  y="115" fill="#facc15" fontSize="12" fontFamily="monospace">16 cm</text>
    <text x="130" y="198" fill="#22d3ee" fontSize="12" fontFamily="monospace">12 cm</text>
    <text x="152" y="105" fill="#4ade80" fontSize="12" fontFamily="monospace" transform="rotate(53 160 108)">20 cm</text>
  </svg>
);

const DiagramQ6 = () => (
  <svg viewBox="0 0 320 230" className="w-full max-w-sm mx-auto my-3" aria-label="Segitiga sama kaki">
    <polygon points="160,20 40,200 280,200" fill="rgba(74,222,128,0.12)" stroke="#4ade80" strokeWidth="2" />
    <line x1="160" y1="20" x2="160" y2="200" stroke="#facc15" strokeWidth="1.5" strokeDasharray="5,4" />
    <polyline points="160,188 172,188 172,200" fill="none" stroke="#facc15" strokeWidth="1.5" />
    <line x1="95" y1="112"  x2="105" y2="100"  stroke="#4ade80" strokeWidth="2" />
    <line x1="215" y1="100" x2="225" y2="112"  stroke="#4ade80" strokeWidth="2" />
    <text x="147" y="14"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="27"  y="218" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="284" y="218" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="166" y="115" fill="#facc15" fontSize="12" fontFamily="monospace">t = ?</text>
    <text x="120" y="216" fill="#22d3ee" fontSize="12" fontFamily="monospace">30 cm</text>
    <text x="66"  y="112" fill="#e2e8f0" fontSize="11" fontFamily="monospace" transform="rotate(-62 80 110)">17 cm</text>
  </svg>
);

const DiagramQ10 = () => (
  <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto my-3" aria-label="Segitiga dalam persegi panjang">
    <rect x="20" y="30" width="340" height="160" fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeWidth="1.5" strokeDasharray="6,4" />
    <polygon points="20,190 360,190 20,30" fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth="2" />
    <polyline points="20,42 32,42 32,30" fill="none" stroke="#f87171" strokeWidth="1.5" />
    <text x="152" y="24"  fill="#f87171" fontSize="12" fontFamily="monospace">24 cm</text>
    <text x="368" y="115" fill="#f87171" fontSize="12" fontFamily="monospace">14 cm</text>
    <text x="10"  y="24"  fill="#e2e8f0" fontSize="12" fontFamily="monospace">D</text>
    <text x="362" y="24"  fill="#e2e8f0" fontSize="12" fontFamily="monospace">C</text>
    <text x="362" y="206" fill="#e2e8f0" fontSize="12" fontFamily="monospace">B</text>
    <text x="4"   y="206" fill="#e2e8f0" fontSize="12" fontFamily="monospace">A</text>
    <text x="130" y="150" fill="#fb923c" fontSize="13" fontFamily="monospace">△ABD</text>
  </svg>
);

/* ─────────────── SECTION HEADER ─────────────── */
type SectionProps = { title: string; color: string; children: React.ReactNode };
const Section = ({ title, color, children }: SectionProps) => (
  <div className={`rounded-xl border p-5 space-y-6`} style={{ borderColor: color + "55", background: color + "0a" }}>
    <h3 className="font-display font-bold text-sm uppercase tracking-widest" style={{ color }}>{title}</h3>
    {children}
  </div>
);

/* ─────────────── QUESTION CARD ─────────────── */
type QProps = { no: number; children: React.ReactNode; diagram?: React.ReactNode; badge?: string; badgeColor?: string };
const Q = ({ no, children, diagram, badge, badgeColor = "#60a5fa" }: QProps) => (
  <div className="flex gap-3">
    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-black" style={{ background: badgeColor }}>
      {no}
    </div>
    <div className="flex-1 space-y-2">
      {badge && (
        <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1" style={{ background: badgeColor + "33", color: badgeColor }}>
          {badge}
        </span>
      )}
      {diagram && <div>{diagram}</div>}
      <div className="text-white/90 text-sm leading-relaxed font-body">{children}</div>
    </div>
  </div>
);

/* ─────────────── PAGE ─────────────── */
const LuasSegitigaLatihanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.4)" }}>
            <BookOpen className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-1">
            LUAS SEGITIGA
          </h1>
          <p className="text-white/50 text-xs font-body">Kelas 7 · Latihan Mandiri · Segitiga dan Segiempat</p>
          <div className="mt-3 flex justify-center gap-2 flex-wrap">
            {["UN", "TKA", "ANBK"].map(tag => (
              <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">{tag}</span>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 px-5 py-4 mb-6 text-sm text-white/80 font-body leading-relaxed">
          <span className="font-bold text-blue-300">Ingat! </span>
          Rumus luas segitiga:{" "}
          <InlineMath math="L = \dfrac{1}{2} \times alas \times tinggi" />
        </div>

        <div className="space-y-5 animate-slide-up">

          {/* ── BAGIAN A: Menghitung Luas ── */}
          <Section title="Bagian A · Menghitung Luas Segitiga" color="#60a5fa">

            <Q no={1} badge="Soal Gambar" badgeColor="#60a5fa" diagram={<DiagramQ1 />}>
              <p>Hitunglah luas segitiga <InlineMath math="ABC" /> pada gambar di atas.</p>
            </Q>

            <Q no={2} badge="Langsung" badgeColor="#60a5fa">
              <p>
                Sebuah segitiga memiliki alas <InlineMath math="18 \text{ cm}" /> dan tinggi <InlineMath math="10 \text{ cm}" />.
                Tentukan luas segitiga tersebut!
              </p>
            </Q>

            <Q no={3} badge="Segitiga Siku-siku" badgeColor="#60a5fa" diagram={<DiagramQ3 />}>
              <p>
                Segitiga siku-siku <InlineMath math="PQR" /> siku-siku di <InlineMath math="Q" />.
                Tentukan luas segitiga <InlineMath math="PQR" />!
              </p>
            </Q>

            <Q no={4} badge="Satuan" badgeColor="#60a5fa">
              <p>
                Luas sebuah segitiga adalah <InlineMath math="240 \text{ cm}^2" />. Jika alasnya <InlineMath math="20 \text{ cm}" />,
                berapakah tinggi segitiga tersebut?
              </p>
            </Q>

            <Q no={5} badge="Pecahan" badgeColor="#60a5fa">
              <p>
                Sebuah segitiga mempunyai alas <InlineMath math="2{,}4 \text{ m}" /> dan tinggi <InlineMath math="0{,}5 \text{ m}" />.
                Nyatakan luasnya dalam <InlineMath math="\text{cm}^2" />!
              </p>
            </Q>
          </Section>

          {/* ── BAGIAN B: Mencari Alas / Tinggi ── */}
          <Section title="Bagian B · Mencari Alas atau Tinggi" color="#a78bfa">

            <Q no={6} badge="Sama Kaki" badgeColor="#a78bfa" diagram={<DiagramQ6 />}>
              <p>
                Segitiga sama kaki <InlineMath math="ABC" /> memiliki alas <InlineMath math="BC = 30 \text{ cm}" /> dan
                panjang kaki <InlineMath math="AB = AC = 17 \text{ cm}" />. Tentukan luas segitiga tersebut!
              </p>
            </Q>

            <Q no={7} badge="Perbandingan" badgeColor="#a78bfa">
              <p>
                Luas segitiga <InlineMath math="= 126 \text{ cm}^2" />. Perbandingan alas dan tingginya adalah{" "}
                <InlineMath math="7 : 4" />. Tentukan panjang alas dan tinggi segitiga tersebut!
              </p>
            </Q>

            <Q no={8} badge="Persamaan" badgeColor="#a78bfa">
              <p>
                Alas sebuah segitiga adalah <InlineMath math="(2x + 3) \text{ cm}" /> dan tingginya{" "}
                <InlineMath math="8 \text{ cm}" />. Jika luasnya <InlineMath math="52 \text{ cm}^2" />,
                tentukan nilai <InlineMath math="x" />!
              </p>
            </Q>

            <Q no={9} badge="UN Style" badgeColor="#a78bfa">
              <p>
                Sebuah segitiga memiliki tinggi yang <InlineMath math="3 \text{ cm}" /> lebih panjang dari alasnya.
                Jika luasnya <InlineMath math="54 \text{ cm}^2" />, tentukan panjang alas dan tingginya!
              </p>
            </Q>

            <Q no={10} badge="Dalam Persegi Panjang" badgeColor="#a78bfa" diagram={<DiagramQ10 />}>
              <p>
                Persegi panjang <InlineMath math="ABCD" /> memiliki panjang <InlineMath math="24 \text{ cm}" /> dan
                lebar <InlineMath math="14 \text{ cm}" />. Segitiga <InlineMath math="ABD" /> dibentuk dari diagonal{" "}
                <InlineMath math="BD" />. Tentukan luas segitiga <InlineMath math="ABD" />!
              </p>
            </Q>
          </Section>

          {/* ── BAGIAN C: Aplikasi & Pemecahan Masalah ── */}
          <Section title="Bagian C · Aplikasi & Pemecahan Masalah" color="#4ade80">

            <Q no={11} badge="Kontekstual" badgeColor="#4ade80">
              <p>
                Sebuah taman kota berbentuk segitiga siku-siku dengan dua sisi siku-sikunya{" "}
                <InlineMath math="30 \text{ m}" /> dan <InlineMath math="40 \text{ m}" />.
                Di taman tersebut akan dipasang lampu taman setiap <InlineMath math="15 \text{ m}^2" />.
                Berapa banyak lampu yang diperlukan?
              </p>
            </Q>

            <Q no={12} badge="ANBK" badgeColor="#4ade80">
              <p>
                Dua segitiga masing-masing memiliki luas yang sama. Segitiga pertama beralas{" "}
                <InlineMath math="16 \text{ cm}" /> dengan tinggi <InlineMath math="9 \text{ cm}" />.
                Segitiga kedua mempunyai alas <InlineMath math="12 \text{ cm}" />.
                Berapa tinggi segitiga kedua?
              </p>
            </Q>

            <Q no={13} badge="TKA" badgeColor="#4ade80">
              <p>
                Sebuah papan kayu berbentuk segitiga dengan alas <InlineMath math="50 \text{ cm}" /> dan
                tinggi <InlineMath math="36 \text{ cm}" />. Papan tersebut akan dicat dengan biaya{" "}
                <InlineMath math="Rp\,3.000" /> per <InlineMath math="\text{dm}^2" />.
                Berapa biaya cat yang diperlukan?
              </p>
            </Q>

            <Q no={14} badge="Gabungan" badgeColor="#4ade80">
              <p>
                Sebuah bangun datar terdiri dari dua segitiga yang saling berhadapan membentuk jajargenjang.
                Jika alas jajargenjang <InlineMath math="20 \text{ cm}" /> dan tingginya{" "}
                <InlineMath math="13 \text{ cm}" />, tentukan luas masing-masing segitiga!
              </p>
            </Q>

            <Q no={15} badge="UN 2019" badgeColor="#4ade80">
              <p>
                Perhatikan pernyataan berikut.
              </p>
              <BlockMath math={`\\begin{array}{l}
(1)\\ \\text{Segitiga dengan } a = 10\\text{ cm, }t = 6\\text{ cm} \\Rightarrow L = 30\\text{ cm}^2\\\\
(2)\\ \\text{Segitiga dengan } a = 14\\text{ cm, }t = 9\\text{ cm} \\Rightarrow L = 63\\text{ cm}^2\\\\
(3)\\ \\text{Segitiga dengan } a = 8\\text{ cm, }t = 7\\text{ cm}\\Rightarrow L = 56\\text{ cm}^2\\\\
(4)\\ \\text{Segitiga dengan } a = 20\\text{ cm, }t = 11\\text{ cm}\\Rightarrow L = 110\\text{ cm}^2
\\end{array}`} />
              <p className="mt-2">
                Dari pernyataan di atas, manakah yang <span className="text-green-400 font-bold">BENAR</span>?
                Sebutkan nomor pernyataan yang benar!
              </p>
            </Q>
          </Section>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/segitiga-dan-segiempat"); }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Segitiga dan Segiempat
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuasSegitigaLatihanPage;
