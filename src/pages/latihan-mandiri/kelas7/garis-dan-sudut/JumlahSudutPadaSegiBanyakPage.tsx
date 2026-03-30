import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const SoalASVG = () => (
  <svg viewBox="0 0 260 215" className="w-full max-w-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="155,18 58,192 252,192" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="M 143,43 Q 155,32 168,43" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 74,170 Q 72,183 88,192" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 227,192 Q 240,183 237,169" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="155" y="68" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">60°</text>
    <text x="93" y="200" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">60°</text>
    <text x="248" y="201" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">y</text>
  </svg>
);

const SoalBSVG = () => (
  <svg viewBox="0 0 265 200" className="w-full max-w-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,28 100,168 248,168" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <polyline points="100,148 120,148 120,168" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <path d="M 100,50 Q 112,43 118,53" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 222,168 Q 231,159 227,149" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="124" y="58" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">z</text>
    <text x="212" y="152" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">20°</text>
  </svg>
);

const SoalCSVG = () => (
  <svg viewBox="0 0 310 255" className="w-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="75" y1="237" x2="215" y2="55" stroke="#FACC15" strokeWidth="3" strokeLinecap="round"/>
    <line x1="115" y1="185" x2="293" y2="185" stroke="#FACC15" strokeWidth="3" strokeLinecap="round"/>
    <line x1="215" y1="55" x2="258" y2="185" stroke="#FACC15" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 129,168 Q 123,178 138,185" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 97,210 Q 107,201 145,185" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 236,185 Q 247,176 252,165" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 249,159 Q 273,162 288,185" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 202,72 Q 215,64 223,76" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="80" y="228" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">z</text>
    <text x="136" y="210" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">30°</text>
    <text x="217" y="52" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">x</text>
    <text x="237" y="212" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">40°</text>
    <text x="283" y="200" fill="white" fontSize="15" fontWeight="bold" textAnchor="middle">y</text>
  </svg>
);

const SoalDSVG = () => (
  <svg viewBox="0 0 290 200" className="w-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="80,150 80,50 210,50 235,150" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <polyline points="80,130 100,130 100,150" stroke="#FACC15" strokeWidth="2.5" fill="none"/>
    <path d="M 80,72 Q 88,58 102,50" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 190,50 Q 204,60 215,70" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 215,150 Q 224,143 229,131" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="100" y="76" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">110°</text>
    <text x="160" y="76" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">130°</text>
    <text x="104" y="148" fill="white" fontSize="13" fontWeight="bold" textAnchor="start">90°</text>
    <text x="228" y="148" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">x</text>
  </svg>
);

const SoalESVG = () => (
  <svg viewBox="0 0 295 200" className="w-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="65,150 95,50 200,50 230,150" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="74" y1="103" x2="84" y2="105" stroke="#FACC15" strokeWidth="2"/>
    <line x1="76" y1="95" x2="86" y2="97" stroke="#FACC15" strokeWidth="2"/>
    <line x1="209" y1="95" x2="219" y2="97" stroke="#FACC15" strokeWidth="2"/>
    <line x1="211" y1="103" x2="221" y2="105" stroke="#FACC15" strokeWidth="2"/>
    <path d="M 89,70 Q 98,60 115,50" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 180,50 Q 198,60 206,70" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 72,132 Q 72,143 87,150" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 208,150 Q 222,143 222,130" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="100" y="78" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">120°</text>
    <text x="168" y="78" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">a</text>
    <text x="78" y="148" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">60°</text>
    <text x="206" y="148" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">b</text>
  </svg>
);

const SoalFSVG = () => (
  <svg viewBox="0 0 290 268" className="w-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="25,132 158,25 255,132 158,240" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="158" y1="8" x2="158" y2="258" stroke="white" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.7"/>
    <line x1="8" y1="132" x2="278" y2="132" stroke="white" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.7"/>
    <line x1="85" y1="78" x2="91" y2="86" stroke="#FACC15" strokeWidth="2"/>
    <line x1="93" y1="72" x2="99" y2="80" stroke="#FACC15" strokeWidth="2"/>
    <line x1="85" y1="186" x2="91" y2="178" stroke="#FACC15" strokeWidth="2"/>
    <line x1="93" y1="192" x2="99" y2="184" stroke="#FACC15" strokeWidth="2"/>
    <line x1="203" y1="76" x2="211" y2="82" stroke="#FACC15" strokeWidth="2"/>
    <line x1="203" y1="182" x2="211" y2="188" stroke="#FACC15" strokeWidth="2"/>
    <path d="M 43,119 Q 46,132 43,145" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 237,121 Q 241,132 237,143" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 142,43 Q 158,48 174,43" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 142,222 Q 158,217 174,222" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="52" y="136" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">10°</text>
    <text x="218" y="136" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">30°</text>
    <text x="164" y="65" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">f</text>
    <text x="164" y="218" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">c</text>
  </svg>
);

const SoalGSVG = () => (
  <svg viewBox="0 0 310 200" className="w-full max-w-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="65,150 105,50 255,50 215,150" stroke="#FACC15" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="80" y1="98" x2="90" y2="102" stroke="#FACC15" strokeWidth="2"/>
    <line x1="230" y1="98" x2="240" y2="102" stroke="#FACC15" strokeWidth="2"/>
    <line x1="136" y1="143" x2="136" y2="157" stroke="#FACC15" strokeWidth="2"/>
    <line x1="143" y1="143" x2="143" y2="157" stroke="#FACC15" strokeWidth="2"/>
    <line x1="176" y1="43" x2="176" y2="57" stroke="#FACC15" strokeWidth="2"/>
    <line x1="183" y1="43" x2="183" y2="57" stroke="#FACC15" strokeWidth="2"/>
    <path d="M 172,48 L 179,50 L 172,52" stroke="#FACC15" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <path d="M 179,48 L 186,50 L 179,52" stroke="#FACC15" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <path d="M 73,130 Q 74,142 87,150" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 97,70 Q 108,62 128,50" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <path d="M 233,50 Q 244,60 247,70" stroke="#FACC15" strokeWidth="2" fill="none"/>
    <text x="80" y="149" fill="white" fontSize="14" fontWeight="bold" textAnchor="start">30°</text>
    <text x="125" y="71" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">d</text>
    <text x="236" y="72" fill="white" fontSize="15" fontWeight="bold" textAnchor="start">e</text>
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

          <div className="space-y-6 text-white/90 font-body text-sm leading-relaxed">
            {isianPendek.map((soal) => (
              <div key={soal.label} className="border-l-2 border-accent/50 pl-4 flex gap-3 items-start">
                <span className="font-semibold text-accent shrink-0 mt-2">{soal.label})</span>
                <div className="py-2">{soal.svg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian II */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-accent text-sm font-bold mb-2 font-display">Bagian II — Pilihan Ganda</p>
          <p className="text-yellow-400 text-sm mb-6 font-body">Kerjakan soal-soal berikut lengkap dengan caranya</p>

          <div className="space-y-6 text-white/90 font-body text-sm leading-relaxed">

            {/* Soal 1 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">1.</span>
              <div>
                <p className="mb-2">Perhatikan gambar. Besar sudut yang ditanyakan adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 15°</p>
                  <p>B. 30°</p>
                  <p>C. 42°</p>
                  <p>D. 60°</p>
                </div>
              </div>
            </div>

            {/* Soal 2 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">2.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Dari gambar di atas besar ∠QPR adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 18°</p>
                  <p>B. 36°</p>
                  <p>C. 45°</p>
                  <p>D. 54°</p>
                </div>
              </div>
            </div>

            {/* Soal 3 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">3.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Besar ∠BAC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 80°</p>
                  <p>B. 70°</p>
                  <p>C. 60°</p>
                  <p>D. 50°</p>
                </div>
              </div>
            </div>

            {/* Soal 4 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">4.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Besar sudut ∠ACB adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 55°</p>
                  <p>B. 85°</p>
                  <p>C. 95°</p>
                  <p>D. 125°</p>
                </div>
              </div>
            </div>

            {/* Soal 5 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">5.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Jika besar a = 95° dan b = 70°, maka selisih besar sudut x dan y adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 25°</p>
                  <p>B. 45°</p>
                  <p>C. 65°</p>
                  <p>D. 85°</p>
                </div>
              </div>
            </div>

            {/* Soal 6 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">6.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Jika besar ∠a = 35° dan ∠b = 45°, maka jumlah besar sudut x dan y adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 285°</p>
                  <p>B. 300°</p>
                  <p>C. 315°</p>
                  <p>D. 330°</p>
                </div>
              </div>
            </div>

            {/* Soal 7 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">7.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Jika diketahui AB sejajar CD, maka nilai x adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 15°</p>
                  <p>B. 30°</p>
                  <p>C. 40°</p>
                  <p>D. 45°</p>
                </div>
              </div>
            </div>

            {/* Soal 8 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">8.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut! Besar sudut nomor 1 adalah 95°, dan sudut nomor 2 adalah 110°. Besar sudut nomor 3 adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 5°</p>
                  <p>B. 15°</p>
                  <p>C. 25°</p>
                  <p>D. 35°</p>
                </div>
              </div>
            </div>

            {/* Soal 9 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">9.</span>
              <div>
                <p className="mb-2">Perhatikan gambar berikut. Besar ∠BAC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 24°</p>
                  <p>B. 48°</p>
                  <p>C. 72°</p>
                  <p>D. 98°</p>
                </div>
              </div>
            </div>

            {/* Soal 10 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">10.</span>
              <div>
                <p className="mb-2">Perhatikan gambar di bawah ini. Diketahui sudut ∠SPT = 83° dan sudut ∠PQT = 41°. Garis PQ dan RS sejajar, demikian juga garis PS dan QT sejajar. Maka besar x = …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 41°</p>
                  <p>B. 82°</p>
                  <p>C. 124°</p>
                  <p>D. 139°</p>
                </div>
              </div>
            </div>

            {/* Soal 11 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">11.</span>
              <div>
                <p className="mb-2">Perhatikan gambar. Jika ∠EFB = 65° dan ∠FCD = 120°, maka besar ∠BFC adalah …</p>
                <p className="text-white/40 text-xs italic mb-2">(Perhatikan gambar pada lembar soal)</p>
                <div className="ml-4 space-y-1">
                  <p>A. 55°</p>
                  <p>B. 45°</p>
                  <p>C. 50°</p>
                  <p>D. 35°</p>
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
