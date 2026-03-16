import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";

/* ─────────────────────────────────────────────
   SVG DIAGRAMS
───────────────────────────────────────────── */

/* Q1: Scalene triangle with labeled side lengths */
const DiagramQ1 = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-xs mx-auto my-3" aria-label="Segitiga dengan sisi 13 cm, 5 cm, 12 cm">
    <polygon points="60,170 60,50 210,170" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="2" />
    {/* Right angle mark at A */}
    <rect x="60" y="150" width="15" height="15" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
    {/* Vertex labels */}
    <text x="38" y="46" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="38" y="185" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="214" y="185" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    {/* Side labels */}
    <text x="22" y="115" fill="#facc15" fontSize="12" fontFamily="monospace">12 cm</text>
    <text x="108" y="188" fill="#facc15" fontSize="12" fontFamily="monospace">5 cm</text>
    <text x="118" y="103" fill="#facc15" fontSize="12" fontFamily="monospace" transform="rotate(33,140,110)">13 cm</text>
  </svg>
);

/* Q2: Isosceles triangle KLM */
const DiagramQ2 = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-xs mx-auto my-3" aria-label="Segitiga sama kaki KLM">
    <polygon points="150,20 30,175 270,175" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="2" />
    {/* Equal side marks */}
    <line x1="78" y1="104" x2="88" y2="92" stroke="#a78bfa" strokeWidth="2" />
    <line x1="83" y1="109" x2="93" y2="97" stroke="#a78bfa" strokeWidth="2" />
    <line x1="212" y1="92" x2="222" y2="104" stroke="#a78bfa" strokeWidth="2" />
    <line x1="207" y1="97" x2="217" y2="109" stroke="#a78bfa" strokeWidth="2" />
    {/* Vertex labels */}
    <text x="143" y="14" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">K</text>
    <text x="14" y="188" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">L</text>
    <text x="274" y="188" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">M</text>
    {/* Side labels */}
    <text x="64" y="96" fill="#facc15" fontSize="11" fontFamily="monospace" transform="rotate(-55,90,105)">27 cm</text>
    <text x="210" y="96" fill="#facc15" fontSize="11" fontFamily="monospace" transform="rotate(55,218,105)">27 cm</text>
    <text x="125" y="192" fill="#22d3ee" fontSize="12" fontFamily="monospace">LM = ?</text>
  </svg>
);

/* Q3: Equilateral triangle ABC */
const DiagramQ3 = () => (
  <svg viewBox="0 0 260 210" className="w-full max-w-xs mx-auto my-3" aria-label="Segitiga sama sisi ABC">
    <polygon points="130,20 20,190 240,190" fill="rgba(74,222,128,0.08)" stroke="#4ade80" strokeWidth="2" />
    {/* Equal side marks - one on each side */}
    <line x1="68" y1="112" x2="80" y2="100" stroke="#4ade80" strokeWidth="2" />
    <line x1="180" y1="100" x2="192" y2="112" stroke="#4ade80" strokeWidth="2" />
    <line x1="123" y1="192" x2="137" y2="192" stroke="#4ade80" strokeWidth="2" />
    {/* Vertex labels */}
    <text x="122" y="14" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="4" y="205" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="243" y="205" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    {/* K label */}
    <text x="85" y="80" fill="#facc15" fontSize="11" fontFamily="monospace">K = 18 cm</text>
  </svg>
);

/* Q4: Rectangle with labeled dimensions */
const DiagramQ4 = () => (
  <svg viewBox="0 0 300 190" className="w-full max-w-xs mx-auto my-3" aria-label="Persegi panjang dengan panjang 14 cm dan lebar 8 cm">
    <rect x="30" y="40" width="240" height="120" fill="rgba(251,146,60,0.08)" stroke="#fb923c" strokeWidth="2" />
    {/* Right angle marks */}
    <rect x="30" y="148" width="12" height="12" fill="none" stroke="#fb923c" strokeWidth="1.5" />
    <rect x="258" y="148" width="12" height="12" fill="none" stroke="#fb923c" strokeWidth="1.5" />
    {/* Vertex labels */}
    <text x="14" y="36" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">D</text>
    <text x="275" y="36" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="14" y="178" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="275" y="178" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">B</text>
    {/* Side labels */}
    <text x="120" y="32" fill="#facc15" fontSize="12" fontFamily="monospace">14 cm</text>
    <text x="120" y="178" fill="#facc15" fontSize="12" fontFamily="monospace">14 cm</text>
    <text x="2" y="108" fill="#facc15" fontSize="11" fontFamily="monospace">8 cm</text>
    <text x="283" y="108" fill="#facc15" fontSize="11" fontFamily="monospace">8 cm</text>
  </svg>
);

/* Q5: Rhombus ABCD with AB = 8 cm */
const DiagramQ5 = () => (
  <svg viewBox="0 0 240 220" className="w-full max-w-xs mx-auto my-3" aria-label="Belah ketupat ABCD dengan AB = 8 cm">
    <polygon points="120,20 210,110 120,200 30,110" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="2" />
    {/* Equal side marks */}
    <line x1="156" y1="57" x2="168" y2="70" stroke="#22d3ee" strokeWidth="2" />
    <line x1="163" y1="152" x2="151" y2="165" stroke="#22d3ee" strokeWidth="2" />
    <line x1="72" y1="152" x2="84" y2="165" stroke="#22d3ee" strokeWidth="2" />
    <line x1="77" y1="57" x2="65" y2="70" stroke="#22d3ee" strokeWidth="2" />
    {/* Vertex labels */}
    <text x="112" y="14" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="214" y="115" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">B</text>
    <text x="112" y="215" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="10" y="115" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">D</text>
    {/* Side label */}
    <text x="155" y="68" fill="#facc15" fontSize="11" fontFamily="monospace">8 cm</text>
  </svg>
);

/* Q6: Trapezoid with labeled sides */
const DiagramQ6 = () => (
  <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" aria-label="Trapesium dengan sisi-sisi berlabel">
    <polygon points="80,30 220,30 280,160 20,160" fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeWidth="2" />
    {/* Vertex labels */}
    <text x="66" y="24" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">D</text>
    <text x="222" y="24" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">C</text>
    <text x="4" y="175" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">A</text>
    <text x="284" y="175" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="bold">B</text>
    {/* Side labels */}
    <text x="128" y="22" fill="#facc15" fontSize="12" fontFamily="monospace">10 cm</text>
    <text x="110" y="175" fill="#facc15" fontSize="12" fontFamily="monospace">16 cm</text>
    <text x="22" y="103" fill="#22d3ee" fontSize="11" fontFamily="monospace" transform="rotate(-75,38,103)">8 cm</text>
    <text x="264" y="103" fill="#22d3ee" fontSize="11" fontFamily="monospace" transform="rotate(65,272,103)">6 cm</text>
  </svg>
);

/* ─────────────────────────────────────────────
   QUESTION CARD COMPONENT
───────────────────────────────────────────── */
type QuestionCardProps = {
  no: number;
  question: React.ReactNode;
  answer: React.ReactNode;
  diagram?: React.ReactNode;
};

const QuestionCard = ({ no, question, answer, diagram }: QuestionCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-l-2 border-accent/50 pl-4 space-y-3">
      <p className="font-semibold text-accent">{no}.</p>
      {diagram && <div>{diagram}</div>}
      <div className="text-white/90 text-sm leading-relaxed">{question}</div>
      <button
        onClick={() => { playPopSound(); setOpen(v => !v); }}
        className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
      >
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {open ? "Sembunyikan Jawaban" : "Lihat Jawaban"}
      </button>
      {open && (
        <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4 text-sm font-body space-y-2 animate-slide-up">
          {answer}
        </div>
      )}
    </div>
  );
};

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

            {/* Q1 */}
            <QuestionCard
              no={1}
              diagram={<DiagramQ1 />}
              question={<p>Tentukan keliling bangun segitiga berikut.</p>}
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui: <InlineMath math="AB = 12 \text{ cm},\ BC = 5 \text{ cm},\ AC = 13 \text{ cm}" /></p>
                  <BlockMath math="K = AB + BC + AC" />
                  <BlockMath math="K = 12 + 5 + 13 = 30 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Keliling segitiga = <InlineMath math="30 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q2 */}
            <QuestionCard
              no={2}
              diagram={<DiagramQ2 />}
              question={
                <p>
                  Jika diketahui keliling segitiga sama kaki berikut masing-masing adalah <InlineMath math="70 \text{ cm}" />, berapakah panjang sisi <InlineMath math="LM" />?
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui:</p>
                  <ul className="text-white/70 text-xs space-y-1 ml-3">
                    <li>• Keliling <InlineMath math="= 70 \text{ cm}" /></li>
                    <li>• <InlineMath math="KL = KM = 27 \text{ cm}" /> (sisi kaki, sama panjang)</li>
                    <li>• <InlineMath math="LM = ?" /></li>
                  </ul>
                  <BlockMath math="K = KL + KM + LM" />
                  <BlockMath math="70 = 27 + 27 + LM" />
                  <BlockMath math="LM = 70 - 54 = 16 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Panjang sisi <InlineMath math="LM = 16 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q3 */}
            <QuestionCard
              no={3}
              diagram={<DiagramQ3 />}
              question={
                <p>
                  Jika diketahui keliling segitiga sama sisi berikut adalah <InlineMath math="18 \text{ cm}" />, tentukan panjang sisi <InlineMath math="AB" />, <InlineMath math="AC" />, dan <InlineMath math="BC" />.
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Pada segitiga sama sisi, semua sisi sama panjang.</p>
                  <BlockMath math="K = 3 \times s" />
                  <BlockMath math="18 = 3 \times s" />
                  <BlockMath math="s = \frac{18}{3} = 6 \text{ cm}" />
                  <p className="text-green-300 font-semibold"><InlineMath math="AB = AC = BC = 6 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q4 */}
            <QuestionCard
              no={4}
              diagram={<DiagramQ4 />}
              question={<p>Tentukan keliling bangun segiempat berikut.</p>}
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui persegi panjang dengan <InlineMath math="p = 14 \text{ cm}" />, <InlineMath math="l = 8 \text{ cm}" /></p>
                  <BlockMath math="K = 2 \times (p + l)" />
                  <BlockMath math="K = 2 \times (14 + 8)" />
                  <BlockMath math="K = 2 \times 22 = 44 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Keliling segiempat = <InlineMath math="44 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q5 */}
            <QuestionCard
              no={5}
              diagram={<DiagramQ5 />}
              question={
                <p>
                  Tentukan keliling bangun belah ketupat berikut jika diketahui panjang <InlineMath math="AB = 8 \text{ cm}" />.
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Pada belah ketupat, semua sisi sama panjang.</p>
                  <BlockMath math="K = 4 \times AB" />
                  <BlockMath math="K = 4 \times 8 = 32 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Keliling belah ketupat = <InlineMath math="32 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q6 */}
            <QuestionCard
              no={6}
              diagram={<DiagramQ6 />}
              question={<p>Tentukan keliling trapesium berikut.</p>}
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui: <InlineMath math="DC = 10 \text{ cm},\ AB = 16 \text{ cm},\ AD = 8 \text{ cm},\ BC = 6 \text{ cm}" /></p>
                  <BlockMath math="K = AB + BC + CD + DA" />
                  <BlockMath math="K = 16 + 6 + 10 + 8 = 40 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Keliling trapesium = <InlineMath math="40 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q7 */}
            <QuestionCard
              no={7}
              question={
                <p>
                  Sebuah taman rekreasi berbentuk persegi. Jika kelilingnya <InlineMath math="100" /> meter, berapakah ukuran sisi taman tersebut?
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui: Keliling persegi <InlineMath math="K = 100 \text{ m}" /></p>
                  <BlockMath math="K = 4 \times s" />
                  <BlockMath math="100 = 4 \times s" />
                  <BlockMath math="s = \frac{100}{4} = 25 \text{ m}" />
                  <p className="text-green-300 font-semibold">Ukuran sisi taman = <InlineMath math="25 \text{ m}" /></p>
                </div>
              }
            />

            {/* Q8 */}
            <QuestionCard
              no={8}
              question={
                <p>
                  Sepetak sawah berbentuk persegi panjang. Perbandingan ukuran panjang dan lebarnya adalah <InlineMath math="2 : 1" />. Jika lebarnya <InlineMath math="15" /> meter, berapakah kelilingnya?
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui:</p>
                  <ul className="text-white/70 text-xs space-y-1 ml-3">
                    <li>• Perbandingan <InlineMath math="p : l = 2 : 1" /></li>
                    <li>• Lebar <InlineMath math="l = 15 \text{ m}" /></li>
                  </ul>
                  <p className="text-white/80">Mencari panjang:</p>
                  <BlockMath math="\frac{p}{l} = \frac{2}{1} \Rightarrow p = 2 \times l = 2 \times 15 = 30 \text{ m}" />
                  <p className="text-white/80">Mencari keliling:</p>
                  <BlockMath math="K = 2 \times (p + l) = 2 \times (30 + 15) = 2 \times 45 = 90 \text{ m}" />
                  <p className="text-green-300 font-semibold">Keliling sawah = <InlineMath math="90 \text{ m}" /></p>
                </div>
              }
            />

            {/* Q9 */}
            <QuestionCard
              no={9}
              question={
                <p>
                  Sebuah layang-layang memiliki perbandingan ukuran antara sisi yang panjang dengan sisi yang pendek sebesar <InlineMath math="3 : 2" />. Jika ukuran sisi yang pendek <InlineMath math="24 \text{ cm}" />, tentukan ukuran sisi yang panjang dan keliling layang-layang itu.
                </p>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Diketahui:</p>
                  <ul className="text-white/70 text-xs space-y-1 ml-3">
                    <li>• Perbandingan sisi panjang : sisi pendek <InlineMath math="= 3 : 2" /></li>
                    <li>• Sisi pendek <InlineMath math="= 24 \text{ cm}" /></li>
                  </ul>
                  <p className="text-white/80">Mencari sisi panjang:</p>
                  <BlockMath math="\frac{\text{sisi panjang}}{\text{sisi pendek}} = \frac{3}{2}" />
                  <BlockMath math="\text{sisi panjang} = \frac{3}{2} \times 24 = 36 \text{ cm}" />
                  <p className="text-white/80">Mencari keliling (layang-layang punya 2 pasang sisi):</p>
                  <BlockMath math="K = 2 \times (\text{sisi panjang} + \text{sisi pendek})" />
                  <BlockMath math="K = 2 \times (36 + 24) = 2 \times 60 = 120 \text{ cm}" />
                  <p className="text-green-300 font-semibold">Sisi panjang = <InlineMath math="36 \text{ cm}" />, Keliling = <InlineMath math="120 \text{ cm}" /></p>
                </div>
              }
            />

            {/* Q10 */}
            <QuestionCard
              no={10}
              question={
                <div className="space-y-2">
                  <p>
                    Sebuah trapesium siku-siku perbandingan panjang dari sisi-sisi sejajarnya <InlineMath math="2 : 1" />, sedangkan perbandingan panjang sisi tegak dan sisi miringnya <InlineMath math="2 : 3" />. Jika panjang sisi sejajarnya yang pendek sama panjang dengan panjang sisi tegaknya dan kelilingnya <InlineMath math="55 \text{ cm}" />, tentukan panjang masing-masing dari keempat sisinya.
                  </p>
                </div>
              }
              answer={
                <div className="space-y-2">
                  <p className="text-white/80">Misalkan:</p>
                  <ul className="text-white/70 text-xs space-y-1 ml-3">
                    <li>• Sisi sejajar panjang <InlineMath math="= a" />, sisi sejajar pendek <InlineMath math="= b" /></li>
                    <li>• Sisi tegak <InlineMath math="= c" />, sisi miring <InlineMath math="= d" /></li>
                  </ul>
                  <p className="text-white/80">Dari perbandingan:</p>
                  <BlockMath math="a : b = 2 : 1 \Rightarrow a = 2b" />
                  <BlockMath math="c : d = 2 : 3 \Rightarrow d = \frac{3}{2}c" />
                  <p className="text-white/80">Syarat: sisi sejajar pendek = sisi tegak, yaitu <InlineMath math="b = c" /></p>
                  <p className="text-white/80">Misalkan <InlineMath math="b = c = k" />, maka <InlineMath math="a = 2k" /> dan <InlineMath math="d = \frac{3}{2}k" /></p>
                  <p className="text-white/80">Gunakan keliling:</p>
                  <BlockMath math="K = a + b + c + d = 55" />
                  <BlockMath math="2k + k + k + \frac{3}{2}k = 55" />
                  <BlockMath math="\frac{11}{2}k = 55 \Rightarrow k = 10" />
                  <p className="text-white/80">Panjang sisi-sisi:</p>
                  <BlockMath math="a = 2k = 20 \text{ cm}" />
                  <BlockMath math="b = k = 10 \text{ cm}" />
                  <BlockMath math="c = k = 10 \text{ cm}" />
                  <BlockMath math="d = \frac{3}{2}k = 15 \text{ cm}" />
                  <p className="text-white/70 text-xs">Cek: <InlineMath math="20 + 10 + 10 + 15 = 55 \text{ cm}" /> ✓</p>
                  <div className="bg-green-950/40 border border-green-700/30 rounded p-3 text-xs text-green-300 space-y-1">
                    <p className="font-semibold">Keempat sisi trapesium siku-siku:</p>
                    <p>• Sisi sejajar panjang <InlineMath math="= 20 \text{ cm}" /></p>
                    <p>• Sisi sejajar pendek <InlineMath math="= 10 \text{ cm}" /></p>
                    <p>• Sisi tegak <InlineMath math="= 10 \text{ cm}" /></p>
                    <p>• Sisi miring <InlineMath math="= 15 \text{ cm}" /></p>
                  </div>
                </div>
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
