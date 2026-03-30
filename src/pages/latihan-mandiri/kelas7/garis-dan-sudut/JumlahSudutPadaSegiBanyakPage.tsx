import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const SoalASVG = () => (
  <svg viewBox="0 0 240 205" className="w-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Equilateral-like triangle: Apex(148,18), BL(38,190), BR(228,190) */}
    <polygon points="148,18 38,190 228,190" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Arc at Apex */}
    <path d="M 137,43 Q 148,30 159,43" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BL */}
    <path d="M 56,170 Q 54,183 72,190" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BR (y) */}
    <path d="M 206,190 Q 220,183 218,169" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="148" y="70" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">60°</text>
    <text x="82" y="195" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">60°</text>
    <text x="223" y="196" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">y</text>
  </svg>
);

const SoalBSVG = () => (
  <svg viewBox="0 0 250 195" className="w-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Right triangle: TL(95,25), BL(95,165), BR(240,165) */}
    <polygon points="95,25 95,165 240,165" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Right angle square at BL */}
    <polyline points="95,147 113,147 113,165" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TL (z) */}
    <path d="M 95,47 Q 108,40 114,51" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BR (20°) */}
    <path d="M 216,165 Q 225,156 221,145" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="118" y="57" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">z</text>
    <text x="207" y="148" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">20°</text>
  </svg>
);

/* Soal C: Triangle with tilted base + extended lines
   BL=(88,210), BR=(228,168), Apex=(198,75)
   Line through BL & Apex extends both below BL and above Apex */
const SoalCSVG = () => (
  <svg viewBox="0 0 280 255" className="w-full max-w-[270px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Extended line: (53,253) → BL(88,210) → Apex(198,75) → (220,48) */}
    <line x1="53" y1="253" x2="220" y2="48" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round"/>
    {/* Base line: BL(88,210) → BR(228,168) → extension(266,157) */}
    <line x1="88" y1="210" x2="266" y2="157" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round"/>
    {/* Right side: Apex(198,75) → BR(228,168) */}
    <line x1="198" y1="75" x2="228" y2="168" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round"/>
    {/* Interior 30° arc at BL(88,210) */}
    <path d="M 101,193 Q 105,198 109,204" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Exterior z arc at BL - curves outward/downward */}
    <path d="M 70,232 Q 100,234 114,203" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Interior 40° arc at BR(228,168) */}
    <path d="M 207,174 Q 214,162 220,148" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Exterior y arc at BR - curves outward */}
    <path d="M 220,148 Q 244,152 250,162" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* x arc at Apex(198,75) */}
    <path d="M 185,91 Q 197,84 204,93" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="56" y="248" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">z</text>
    <text x="105" y="218" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">30°</text>
    <text x="202" y="68" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">x</text>
    <text x="214" y="185" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">40°</text>
    <text x="260" y="163" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">y</text>
  </svg>
);

const SoalDSVG = () => (
  <svg viewBox="0 0 285 195" className="w-full max-w-[275px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Quadrilateral: BL(80,148), TL(80,48), TR(208,48), BR(238,148) */}
    <polygon points="80,148 80,48 208,48 238,148" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Right angle square at BL */}
    <polyline points="80,130 98,130 98,148" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TL (110°) */}
    <path d="M 80,70 Q 90,57 104,48" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TR (130°) */}
    <path d="M 188,48 Q 202,58 214,70" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BR (x) */}
    <path d="M 218,148 Q 228,140 232,128" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="100" y="74" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">110°</text>
    <text x="152" y="74" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">130°</text>
    <text x="100" y="145" fill="white" fontSize="13" fontWeight="bold" textAnchor="start">90°</text>
    <text x="232" y="146" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">x</text>
  </svg>
);

/* Soal E: Isosceles trapezoid with double tick marks on legs
   BL(52,148), TL(88,48), TR(200,48), BR(238,148) */
const SoalESVG = () => (
  <svg viewBox="0 0 292 198" className="w-full max-w-[282px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="52,148 88,48 200,48 238,148" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Left leg BL(52,148)→TL(88,48): midpoint(70,98), dir(0.337,-0.942), perp(0.942,0.337) */}
    <line x1="64" y1="95" x2="76" y2="101" stroke="#FACC15" strokeWidth="2.5"/>
    <line x1="67" y1="89" x2="79" y2="95" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Right leg TR(200,48)→BR(238,148): midpoint(219,98), dir(0.361,0.932), perp(-0.932,0.361) */}
    <line x1="225" y1="95" x2="213" y2="101" stroke="#FACC15" strokeWidth="2.5"/>
    <line x1="228" y1="89" x2="216" y2="95" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Arc at TL(88,48) - 120° */}
    <path d="M 82,68 Q 91,58 108,48" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TR(200,48) - a */}
    <path d="M 180,48 Q 196,58 204,68" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BL(52,148) - 60° */}
    <path d="M 60,130 Q 60,141 76,148" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at BR(238,148) - b */}
    <path d="M 214,148 Q 226,141 226,128" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="100" y="76" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">120°</text>
    <text x="163" y="76" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">a</text>
    <text x="65" y="147" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">60°</text>
    <text x="208" y="147" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">b</text>
  </svg>
);

/* Soal F: Kite with dashed axes
   From original image proportions:
   L(40,145), T(188,18), R(265,145), B(188,212) */
const SoalFSVG = () => (
  <svg viewBox="0 0 288 228" className="w-full max-w-[278px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="40,145 188,18 265,145 188,212" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Dashed vertical axis through T(188,18) and B(188,212) */}
    <line x1="188" y1="3" x2="188" y2="225" stroke="white" strokeWidth="1.5" strokeDasharray="7,5" opacity="0.8"/>
    {/* Dashed horizontal axis through L(40,145) and R(265,145) */}
    <line x1="5" y1="145" x2="280" y2="145" stroke="white" strokeWidth="1.5" strokeDasharray="7,5" opacity="0.8"/>
    {/* Double ticks on L-T side, midpoint≈(114,82), dir(0.763,-0.647) */}
    <line x1="106" y1="86" x2="112" y2="79" stroke="#FACC15" strokeWidth="2.5"/>
    <line x1="112" y1="92" x2="118" y2="85" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Double ticks on L-B side, midpoint≈(114,179), dir(0.763,0.646) */}
    <line x1="106" y1="175" x2="112" y2="182" stroke="#FACC15" strokeWidth="2.5"/>
    <line x1="112" y1="169" x2="118" y2="176" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Single tick on T-R side, midpoint≈(227,82), dir(0.509,0.861) */}
    <line x1="232" y1="78" x2="222" y2="86" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Single tick on B-R side, midpoint≈(227,179), dir(0.509,-0.861) */}
    <line x1="222" y1="175" x2="232" y2="183" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Arc at L(40,145) - 10° narrow */}
    <path d="M 62,131 Q 66,145 62,159" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at R(265,145) - 30° */}
    <path d="M 248,130 Q 252,145 248,160" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at T(188,18) */}
    <path d="M 174,36 Q 188,44 202,36" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at B(188,212) */}
    <path d="M 175,199 Q 188,194 201,199" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="68" y="149" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">10°</text>
    <text x="230" y="149" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">30°</text>
    <text x="194" y="115" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">f</text>
    <text x="194" y="205" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">c</text>
  </svg>
);

/* Soal G: Parallelogram
   From original image: steep left side, wide shape
   BL(28,178), TL(65,32), TR(260,32), BR(223,178) */
const SoalGSVG = () => (
  <svg viewBox="0 0 295 205" className="w-full max-w-[285px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="28,178 65,32 260,32 223,178" stroke="#FACC15" strokeWidth="3.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Single tick on left leg BL(28,178)→TL(65,32): midpoint(46.5,105) */}
    <line x1="40" y1="103" x2="53" y2="107" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Single tick on right leg TR(260,32)→BR(223,178): midpoint(241.5,105) */}
    <line x1="235" y1="103" x2="248" y2="107" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Double ticks on bottom BL→BR: midpoint(125.5,178) */}
    <line x1="121" y1="170" x2="121" y2="186" stroke="#FACC15" strokeWidth="2.5"/>
    <line x1="130" y1="170" x2="130" y2="186" stroke="#FACC15" strokeWidth="2.5"/>
    {/* Double arrow on top TL→TR at midpoint(162.5,32), pointing right */}
    <path d="M 158,27 L 165,32 L 158,37" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    <path d="M 165,27 L 172,32 L 165,37" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    {/* Arc at BL(28,178) - 30° small */}
    <path d="M 40,162 Q 41,172 55,178" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TL(65,32) - d large */}
    <path d="M 60,52 Q 70,42 90,32" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    {/* Arc at TR(260,32) - e small */}
    <path d="M 236,32 Q 248,40 253,53" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <text x="54" y="176" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">30°</text>
    <text x="80" y="60" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">d</text>
    <text x="242" y="62" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">e</text>
  </svg>
);

const isianPendek = [
  { label: "a", svg: <SoalASVG /> },
  { label: "b", svg: <SoalBSVG /> },
  { label: "c", svg: <SoalCSVG /> },
  { label: "d", svg: <SoalDSVG /> },
  { label: "e", svg: <SoalESVG /> },
  { label: "f", svg: <SoalFSVG /> },
  { label: "g", svg: <SoalGSVG /> },
];

const JumlahSudutPadaSegiBanyakPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-xl font-bold text-primary text-glow-cyan mb-2 text-center">
          JUMLAH SUDUT PADA SEGI BANYAK
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 7 - Latihan Mandiri - Garis dan Sudut</p>

        {/* Bagian I */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up">
          <p className="text-accent text-sm font-bold mb-2 font-display">Bagian I — Isian Pendek</p>
          <p className="text-yellow-400 text-sm mb-6 font-body">Tentukan nilai sudut yang belum diketahui pada bangun datar berikut.</p>

          <div className="space-y-8 text-white/90 font-body text-sm leading-relaxed">
            {isianPendek.map((soal) => (
              <div key={soal.label} className="border-l-2 border-accent/50 pl-4 flex gap-3 items-start">
                <span className="font-semibold text-accent shrink-0 mt-2">{soal.label})</span>
                <div className="py-1">{soal.svg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian II */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-accent text-sm font-bold mb-2 font-display">Bagian II — Pilihan Ganda</p>
          <p className="text-yellow-400 text-sm mb-6 font-body">Kerjakan soal-soal berikut lengkap dengan caranya</p>

          <div className="space-y-6 text-white/90 font-body text-sm leading-relaxed">

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">1.</span>
              <div>
                <p className="mb-2">Perhatikan gambar. Besar sudut yang ditanyakan adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 15°</p><p>B. 30°</p><p>C. 42°</p><p>D. 60°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">2.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Dari gambar di atas besar ∠QPR adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 18°</p><p>B. 36°</p><p>C. 45°</p><p>D. 54°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">3.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Besar ∠BAC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 80°</p><p>B. 70°</p><p>C. 60°</p><p>D. 50°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">4.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Besar sudut ∠ACB adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 55°</p><p>B. 85°</p><p>C. 95°</p><p>D. 125°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">5.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Jika besar a = 95° dan b = 70°, maka selisih besar sudut x dan y adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 25°</p><p>B. 45°</p><p>C. 65°</p><p>D. 85°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">6.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Jika besar ∠a = 35° dan ∠b = 45°, maka jumlah besar sudut x dan y adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 285°</p><p>B. 300°</p><p>C. 315°</p><p>D. 330°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">7.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Jika diketahui AB sejajar CD, maka nilai x adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 15°</p><p>B. 30°</p><p>C. 40°</p><p>D. 45°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">8.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Besar sudut nomor 1 adalah 95°, dan sudut nomor 2 adalah 110°. Besar sudut nomor 3 adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 5°</p><p>B. 15°</p><p>C. 25°</p><p>D. 35°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">9.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Besar ∠BAC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 24°</p><p>B. 48°</p><p>C. 72°</p><p>D. 98°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">10.</span>
              <div>
                <p className="mb-2">Perhatikan gambar di bawah ini. Diketahui sudut ∠SPT = 83° dan sudut ∠PQT = 41°. Garis PQ dan RS sejajar, demikian juga garis PS dan QT sejajar. Maka besar x = …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 41°</p><p>B. 82°</p><p>C. 124°</p><p>D. 139°</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">11.</span>
              <div>
                <p className="mb-2">Perhatikan gambar. Jika ∠EFB = 65° dan ∠FCD = 120°, maka besar ∠BFC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 55°</p><p>B. 45°</p><p>C. 50°</p><p>D. 35°</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/garis-dan-sudut"); }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Garis dan Sudut
          </button>
        </div>
      </div>
    </div>
  );
};

export default JumlahSudutPadaSegiBanyakPage;
