import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { InlineMath } from "react-katex";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";

/* ─────────────────────────────────────────────
   SVG DIAGRAMS
───────────────────────────────────────────── */

/* Q1: Two triangles — a. scalene (5,7,10) and b. right-angle triangle (10,8,4) */
const DiagramQ1 = () => (
  <svg viewBox="0 0 480 210" className="w-full max-w-lg mx-auto my-4" aria-label="Dua segitiga soal 1">
    {/* === Triangle a: scalene, flat — BL(20,165) top(100,55) BR(230,165) === */}
    <polygon points="20,165 100,55 230,165" fill="rgba(59,130,246,0.10)" stroke="#60a5fa" strokeWidth="2" />
    <text x="40"  y="115" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">5</text>
    <text x="162" y="110" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">7</text>
    <text x="112" y="185" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">10</text>
    <text x="16"  y="198" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">a.</text>

    {/* === Triangle b: tall narrow, right angle at BL ===
        BL(330,165) — right angle (vertical left meets horizontal bottom)
        T (345,20)  — apex, slightly right of BL so left side is steep
        BR(400,165) — bottom-right, short base                         */}
    <polygon points="330,165 345,20 400,165" fill="rgba(59,130,246,0.10)" stroke="#60a5fa" strokeWidth="2" />
    {/* Right-angle mark at BL: square between bottom (→) and left side (↑) */}
    <polyline points="330,148 347,148 347,165" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
    {/* "10" to the left of the steep left side */}
    <text x="295" y="98"  fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">10</text>
    {/* "8"  to the right of the hypotenuse */}
    <text x="378" y="98"  fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">8</text>
    {/* "4" below the short base */}
    <text x="354" y="185" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">4</text>
    <text x="326" y="198" fill="#e2e8f0" fontSize="13" fontFamily="sans-serif">b.</text>
  </svg>
);

/* Q2: Isosceles triangle KLM */
const DiagramQ2 = () => (
  <svg viewBox="0 0 300 210" className="w-full max-w-xs mx-auto my-4" aria-label="Segitiga sama kaki KLM">
    <polygon points="150,20 30,185 270,185" fill="rgba(167,139,250,0.10)" stroke="#a78bfa" strokeWidth="2" />
    <line x1="84"  y1="110" x2="94"  y2="98"  stroke="#a78bfa" strokeWidth="2" />
    <line x1="90"  y1="116" x2="100" y2="104" stroke="#a78bfa" strokeWidth="2" />
    <line x1="206" y1="98"  x2="216" y2="110" stroke="#a78bfa" strokeWidth="2" />
    <line x1="200" y1="104" x2="210" y2="116" stroke="#a78bfa" strokeWidth="2" />
    <text x="141" y="14"  fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">K</text>
    <text x="12"  y="200" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">L</text>
    <text x="276" y="200" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">M</text>
    <text x="60"  y="90" fill="#facc15" fontSize="12" fontFamily="monospace" transform="rotate(-57 90 105)">27 cm</text>
    <text x="198" y="90" fill="#facc15" fontSize="12" fontFamily="monospace" transform="rotate(57 210 105)">27 cm</text>
    <text x="118" y="202" fill="#22d3ee" fontSize="13" fontFamily="monospace">LM = ?</text>
  </svg>
);

/* Q3: Equilateral triangle ABC */
const DiagramQ3 = () => (
  <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto my-4" aria-label="Segitiga sama sisi ABC">
    <polygon points="140,20 20,200 260,200" fill="rgba(74,222,128,0.10)" stroke="#4ade80" strokeWidth="2" />
    <line x1="74"  y1="115" x2="86"  y2="103" stroke="#4ade80" strokeWidth="2" />
    <line x1="194" y1="103" x2="206" y2="115" stroke="#4ade80" strokeWidth="2" />
    <line x1="133" y1="202" x2="147" y2="202" stroke="#4ade80" strokeWidth="2" />
    <text x="131" y="14"  fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="4"   y="214" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="263" y="214" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="92" y="82" fill="#facc15" fontSize="12" fontFamily="monospace">K = 18 cm</text>
  </svg>
);

/* Q4: Rectangle ABCD — panjang 14 cm, lebar 8 cm */
const DiagramQ4 = () => (
  <svg viewBox="0 0 340 200" className="w-full max-w-sm mx-auto my-4" aria-label="Persegi panjang ABCD">
    <rect x="30" y="30" width="270" height="120" fill="rgba(251,146,60,0.10)" stroke="#fb923c" strokeWidth="2" />
    <polyline points="30,148 44,148 44,160"   fill="none" stroke="#fb923c" strokeWidth="1.5" />
    <polyline points="286,148 286,160 300,160" fill="none" stroke="#fb923c" strokeWidth="1.5" />
    <polyline points="30,42 44,42 44,30"       fill="none" stroke="#fb923c" strokeWidth="1.5" />
    <polyline points="286,42 286,30 300,30"    fill="none" stroke="#fb923c" strokeWidth="1.5" />
    <text x="12"  y="26"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">D</text>
    <text x="306" y="26"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="306" y="175" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="12"  y="175" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="142" y="22"  fill="#facc15" fontSize="13" fontFamily="monospace">14 cm</text>
    <text x="142" y="190" fill="#facc15" fontSize="13" fontFamily="monospace">14 cm</text>
    <text x="-8"  y="100" fill="#facc15" fontSize="12" fontFamily="monospace" transform="rotate(-90 2 100)">8 cm</text>
    <text x="330" y="100" fill="#facc15" fontSize="12" fontFamily="monospace" transform="rotate(90 322 100)">8 cm</text>
  </svg>
);

/* Q5: Rhombus ABCD */
const DiagramQ5 = () => (
  <svg viewBox="0 0 260 240" className="w-full max-w-xs mx-auto my-4" aria-label="Belah ketupat ABCD dengan AB = 8 cm">
    <polygon points="130,20 220,120 130,220 40,120" fill="rgba(34,211,238,0.10)" stroke="#22d3ee" strokeWidth="2" />
    <line x1="170" y1="63"  x2="182" y2="75"  stroke="#22d3ee" strokeWidth="2" />
    <line x1="175" y1="163" x2="163" y2="175" stroke="#22d3ee" strokeWidth="2" />
    <line x1="90"  y1="163" x2="78"  y2="175" stroke="#22d3ee" strokeWidth="2" />
    <line x1="78"  y1="63"  x2="90"  y2="75"  stroke="#22d3ee" strokeWidth="2" />
    <text x="122" y="14"  fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="226" y="125" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="122" y="238" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="18"  y="125" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">D</text>
    <text x="172" y="62" fill="#facc15" fontSize="12" fontFamily="monospace">8 cm</text>
  </svg>
);

/* Q6: Trapezoid ABCD — DC=10 cm (top), AB=16 cm (bottom), AD=8 cm, BC=6 cm */
const DiagramQ6 = () => (
  <svg viewBox="0 0 340 210" className="w-full max-w-sm mx-auto my-4" aria-label="Trapesium ABCD">
    <polygon points="20,175 300,175 250,35 90,35" fill="rgba(248,113,113,0.10)" stroke="#f87171" strokeWidth="2" />
    <text x="4"   y="192" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="304" y="192" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="255" y="28"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="72"  y="28"  fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">D</text>
    <text x="150" y="28"  fill="#facc15" fontSize="13" fontFamily="monospace">10 cm</text>
    <text x="145" y="195" fill="#facc15" fontSize="13" fontFamily="monospace">16 cm</text>
    <text x="18"  y="115" fill="#22d3ee" fontSize="12" fontFamily="monospace" transform="rotate(-75 35 115)">8 cm</text>
    <text x="292" y="115" fill="#22d3ee" fontSize="12" fontFamily="monospace" transform="rotate(65 292 115)">6 cm</text>
  </svg>
);

/* ─────────────────────────────────────────────
   QUESTION CARD COMPONENT
───────────────────────────────────────────── */
type QuestionCardProps = {
  no: number;
  question: React.ReactNode;
  diagram?: React.ReactNode;
};

const QuestionCard = ({ no, question, diagram }: QuestionCardProps) => (
  <div className="border-l-2 border-accent/50 pl-4 space-y-3">
    <p className="font-semibold text-accent">{no}.</p>
    {diagram && <div>{diagram}</div>}
    <div className="text-white/90 text-sm leading-relaxed">{question}</div>
  </div>
);

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const KelilingSegitigaSegiempatLatihanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-xl font-bold text-primary text-glow-cyan mb-2 text-center">
          KELILING SEGITIGA DAN SEGIEMPAT
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          Kelas 7 – Latihan Mandiri – Segitiga dan Segiempat
        </p>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up">
          <h2 className="text-lg font-bold text-accent mb-4 font-display">Latihan Mandiri</h2>
          <p className="text-white/70 text-sm mb-6 font-body">
            Kerjakan soal-soal berikut dengan teliti.
          </p>

          <div className="space-y-8 font-body">

            <QuestionCard
              no={1}
              diagram={<DiagramQ1 />}
              question={<p>Tentukan keliling bangun segitiga berikut.</p>}
            />

            <QuestionCard
              no={2}
              diagram={<DiagramQ2 />}
              question={
                <p>
                  Jika diketahui keliling segitiga sama kaki berikut masing-masing adalah{" "}
                  <InlineMath math="70 \text{ cm}" />, berapakah panjang sisi <InlineMath math="LM" />?
                </p>
              }
            />

            <QuestionCard
              no={3}
              diagram={<DiagramQ3 />}
              question={
                <p>
                  Jika diketahui keliling segitiga sama sisi berikut adalah{" "}
                  <InlineMath math="18 \text{ cm}" />, tentukan panjang sisi{" "}
                  <InlineMath math="AB" />, <InlineMath math="AC" />, dan <InlineMath math="BC" />.
                </p>
              }
            />

            <QuestionCard
              no={4}
              diagram={<DiagramQ4 />}
              question={<p>Tentukan keliling bangun segiempat berikut.</p>}
            />

            <QuestionCard
              no={5}
              diagram={<DiagramQ5 />}
              question={
                <p>
                  Tentukan keliling bangun belah ketupat berikut jika diketahui panjang{" "}
                  <InlineMath math="AB = 8 \text{ cm}" />.
                </p>
              }
            />

            <QuestionCard
              no={6}
              diagram={<DiagramQ6 />}
              question={<p>Tentukan keliling trapesium berikut.</p>}
            />

            <QuestionCard
              no={7}
              question={
                <p>
                  Sebuah taman rekreasi berbentuk persegi. Jika kelilingnya <InlineMath math="100" /> meter,
                  berapakah ukuran sisinya taman tersebut?
                </p>
              }
            />

            <QuestionCard
              no={8}
              question={
                <p>
                  Sepetak sawah berbentuk persegi panjang. Perbandingan ukuran panjang dan lebarnya
                  adalah <InlineMath math="2 : 1" />. Jika lebarnya <InlineMath math="15" /> meter,
                  berapakah kelilingnya?
                </p>
              }
            />

            <QuestionCard
              no={9}
              question={
                <p>
                  Sebuah layang-layang memiliki perbandingan ukuran antara sisi yang panjang dengan
                  sisi yang pendek sebesar <InlineMath math="3 : 2" />. Jika ukuran sisi yang pendek{" "}
                  <InlineMath math="24 \text{ cm}" />, tentukan ukuran sisi yang panjang dan keliling
                  layang-layang itu.
                </p>
              }
            />

            <QuestionCard
              no={10}
              question={
                <p>
                  Sebuah trapesium siku-siku perbandingan panjang dari sisi-sisi sejajarnya{" "}
                  <InlineMath math="2 : 1" />, sedangkan perbandingan panjang sisi tegak dan sisi
                  miringnya <InlineMath math="2 : 3" />. Jika panjang sisi sejajarnya yang pendek sama
                  panjang dengan panjang sisi tegaknya dan kelilingnya <InlineMath math="55 \text{ cm}" />,
                  tentukan panjang masing-masing dari keempat sisinya.
                </p>
              }
            />

          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              playPopSound();
              navigate("/latihan-mandiri/kelas-7/segitiga-dan-segiempat");
            }}
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

export default KelilingSegitigaSegiempatLatihanPage;
