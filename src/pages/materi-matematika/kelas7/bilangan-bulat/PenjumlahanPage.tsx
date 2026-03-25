import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

/* ── Garis Bilangan SVG (-5 sampai 5) ──────────────────────── */
const NumberLineSVG = () => {
  const nums = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const cx = (n: number) => 300 + n * 50; // 0 berada di tengah x=300

  return (
    <svg viewBox="0 0 620 88" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-r" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill="#FFD700" />
        </marker>
        <marker id="arr-l" markerWidth="9" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse">
          <polygon points="0 0, 9 3.5, 0 7" fill="#FFD700" />
        </marker>
      </defs>

      {/* Sumbu utama */}
      <line x1="14" y1="38" x2="606" y2="38"
        stroke="#FFD700" strokeWidth="2.5"
        markerEnd="url(#arr-r)" markerStart="url(#arr-l)" />

      {/* Elipsis */}
      <text x="7"   y="43" fill="#FFD700" fontSize="15" fontFamily="monospace" textAnchor="middle">…</text>
      <text x="613" y="43" fill="#FFD700" fontSize="15" fontFamily="monospace" textAnchor="middle">…</text>

      {/* Tick + label per angka */}
      {nums.map(n => {
        const x = cx(n);
        const isZero = n === 0;
        return (
          <g key={n}>
            {/* Tick mark */}
            <line
              x1={x} y1={isZero ? 26 : 30}
              x2={x} y2={isZero ? 50 : 46}
              stroke={isZero ? "#FFFFFF" : "#FFD700"}
              strokeWidth={isZero ? 2.5 : 1.8}
            />
            {/* Angka */}
            <text
              x={x} y={66}
              textAnchor="middle"
              fill={isZero ? "#FFFFFF" : "#FFE57F"}
              fontSize={isZero ? "14" : "12"}
              fontWeight={isZero ? "bold" : "normal"}
              fontFamily="monospace"
            >{n}</text>
          </g>
        );
      })}

      {/* Label negatif / positif */}
      <text x="58"  y="83" fill="#FFD700" fontSize="10" fontFamily="sans-serif" opacity="0.65">← negatif</text>
      <text x="475" y="83" fill="#FFD700" fontSize="10" fontFamily="sans-serif" opacity="0.65">positif →</text>
    </svg>
  );
};

/* ── Animasi bertahap: 8 + (−3) = 5 ────────────────────────────
   step 0       : jeda awal
   step 1–8     : busur hijau satu-satu (0→1, 1→2, … 7→8)
   step 9       : jeda sejenak
   step 10–12   : busur merah satu-satu (8→7, 7→6, 6→5)
   step 13      : tampilkan hasil, lalu mulai ulang
──────────────────────────────────────────────────────────────── */
const NumberLineContoh1SVG = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delay =
      step === 0  ? 800  :
      step === 9  ? 1100 :   // jeda setelah semua hijau
      step === 13 ? 2800 :   // tampilkan hasil sebelum reset
      750;
    const t = setTimeout(() => setStep(s => (s >= 13 ? 0 : s + 1)), delay);
    return () => clearTimeout(t);
  }, [step]);

  const sp   = 50;
  const cx   = (n: number) => 90 + n * sp;  // cx(0)=90, cx(8)=490, cx(5)=340
  const yA   = 68;                            // y sumbu
  const nums = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const numGreen   = Math.min(step, 8);
  const numRed     = Math.min(step >= 10 ? step - 9 : 0, 3);  // max 3 busur
  const showResult = step >= 12;

  const statusText =
    step === 0  ? "Siap..." :
    step <= 8   ? `Langkah +${step} · dari ${step - 1} ke ${step}` :
    step === 9  ? "Sudah di 8 · sekarang mundur −3..." :
    step <= 12  ? `Langkah −${step - 9} · dari ${8 - (step - 10)} ke ${7 - (step - 10)}` :
                  "Hasil: 8 + (−3) = 5  ✓";

  const statusColor =
    step >= 13 ? "#67e8f9" :
    step >= 10 ? "#f87171" :
    "#4ade80";

  return (
    <svg viewBox="0 0 640 136" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="nl2-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#FFD700"/>
        </marker>
        <marker id="nl2-al" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
          <polygon points="0 0,8 3,0 6" fill="#FFD700"/>
        </marker>
        <marker id="nl2-g" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0,7 2.5,0 5" fill="#4ade80"/>
        </marker>
        <marker id="nl2-r" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0,7 2.5,0 5" fill="#f87171"/>
        </marker>
      </defs>

      {/* ── Sumbu kuning ── */}
      <line x1="12" y1={yA} x2="628" y2={yA}
        stroke="#FFD700" strokeWidth="2.5"
        markerEnd="url(#nl2-ar)" markerStart="url(#nl2-al)"/>

      {/* ── Tick + angka ── */}
      {nums.map(n => {
        const x       = cx(n);
        const isZero  = n === 0;
        const isKey   = n === 5 || n === 8;
        const tickClr = n === 5 && showResult ? "#67e8f9"
                       : n === 8 && step >= 9  ? "#86efac"
                       : isZero               ? "#ffffff"
                       :                        "#FFD700";
        const txtClr  = n === 5 && showResult ? "#67e8f9"
                       : n === 8 && step >= 9  ? "#86efac"
                       : isZero               ? "#ffffff"
                       :                        "#FFE57F";
        return (
          <g key={n}>
            <line
              x1={x} y1={isZero || isKey ? 57 : 62}
              x2={x} y2={isZero || isKey ? 79 : 74}
              stroke={tickClr} strokeWidth={isZero || isKey ? 2.5 : 1.8}
            />
            <text x={x} y={93} textAnchor="middle" fontFamily="monospace"
              fill={txtClr}
              fontSize={isZero || isKey ? "13" : "11"}
              fontWeight={isZero || isKey ? "bold" : "normal"}
            >{n}</text>
          </g>
        );
      })}

      {/* ── Busur HIJAU: tiap langkah +1 ke kanan ── */}
      {Array.from({length: numGreen}, (_, i) => {
        const x1 = cx(i), x2 = cx(i + 1), mx = (x1 + x2) / 2;
        return (
          <path key={`g${i}`}
            d={`M ${x1},${yA} Q ${mx},${yA - 26} ${x2},${yA}`}
            fill="none" stroke="#4ade80" strokeWidth="2.2"
            markerEnd="url(#nl2-g)"
          />
        );
      })}

      {/* ── Busur MERAH: tiap langkah −1 ke kiri ── */}
      {Array.from({length: numRed}, (_, i) => {
        const x1 = cx(8 - i), x2 = cx(7 - i), mx = (x1 + x2) / 2;
        return (
          <path key={`r${i}`}
            d={`M ${x1},${yA} Q ${mx},${yA + 26} ${x2},${yA}`}
            fill="none" stroke="#f87171" strokeWidth="2.2"
            markerEnd="url(#nl2-r)"
          />
        );
      })}

      {/* ── Lingkaran hasil di angka 5 ── */}
      {showResult && (
        <circle cx={cx(5)} cy={yA} r="8"
          fill="none" stroke="#67e8f9" strokeWidth="2.5"/>
      )}

      {/* ── Titik posisi saat ini ── */}
      {step >= 1 && step <= 8 && (
        <circle cx={cx(step)} cy={yA} r="4" fill="#4ade80"/>
      )}
      {step >= 10 && step <= 12 && (
        <circle cx={cx(7 - (step - 10))} cy={yA} r="4" fill="#f87171"/>
      )}

      {/* ── Label status di bawah ── */}
      <text x="320" y="122" textAnchor="middle" fontFamily="sans-serif"
        fontSize="11.5" fontWeight="bold" fill={statusColor}>
        {statusText}
      </text>
    </svg>
  );
};

const PenjumlahanBilanganBulatPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(["intro", "konsep", "contoh"]);

  const toggleSection = (section: string) => {
    playPopSound();
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          PENJUMLAHAN BILANGAN BULAT
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          Kelas 7 - Bilangan Bulat - Materi Matematika
        </p>

        <div className="flex flex-col gap-4 animate-slide-up">
          {/* Section: Pengantar */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("intro")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-body font-semibold text-white">Mengapa Kita Butuh Bilangan Negatif?</span>
              </div>
              {expandedSections.includes("intro") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("intro") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Dulu di Sekolah Dasar, kita sudah kenal dengan <strong className="text-primary">bilangan asli</strong> (1, 2, 3, 4, ...) dan <strong className="text-primary">bilangan cacah</strong> (0, 1, 2, 3, ...). Tapi ternyata, kedua jenis bilangan ini belum cukup untuk menggambarkan semua situasi di dunia nyata.
                </p>
                
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    <strong>Contoh nyata:</strong> Bayangkan kamu sedang melihat prakiraan cuaca di Jepang saat musim dingin. Suhunya tertulis <InlineMath math="-5°C" />. Bagaimana cara menuliskan suhu yang berada di bawah titik beku (0°C) kalau kita hanya punya bilangan positif?
                  </p>
                </div>

                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Inilah alasan diciptakannya <strong className="text-primary">bilangan negatif</strong>. Bilangan negatif digunakan untuk menyatakan nilai yang berada di bawah nol, seperti:
                </p>

                <ul className="font-body text-sm text-white/70 space-y-2 ml-4">
                  <li>Suhu di bawah <InlineMath math="0°C" /> (misalnya <InlineMath math="-10°C" /> di puncak Himalaya)</li>
                  <li>Ketinggian di bawah permukaan laut (misalnya <InlineMath math="-80" /> meter untuk palung laut)</li>
                  <li>Hutang atau kerugian dalam keuangan</li>
                </ul>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm text-accent leading-relaxed">
                    <strong>Definisi:</strong> <strong className="text-white">Bilangan bulat</strong> adalah kumpulan bilangan yang terdiri dari bilangan bulat negatif (..., -3, -2, -1), nol (0), dan bilangan bulat positif (1, 2, 3, ...).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Konsep Penjumlahan dengan Garis Bilangan */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("konsep")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="font-body font-semibold text-white">Ringkasan Intisari: Konsep Penjumlahan</span>
              </div>
              {expandedSections.includes("konsep") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("konsep") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Cara paling mudah memahami penjumlahan bilangan bulat adalah dengan membayangkan <strong className="text-primary">garis bilangan</strong>. Bayangkan kamu berdiri di titik nol dan berjalan sesuai instruksi.
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2">Aturan Jalan di Garis Bilangan:</p>
                  <ul className="font-body text-sm text-green-200 space-y-1">
                    <li><strong>Bilangan positif (+)</strong> = bergerak ke <strong>kanan</strong></li>
                    <li><strong>Bilangan negatif (-)</strong> = bergerak ke <strong>kiri</strong></li>
                  </ul>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-4 border border-yellow-500/20">
                  <p className="text-yellow-300/70 text-xs text-center mb-2 font-body">Garis Bilangan</p>
                  <NumberLineSVG />
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-3">Rumus Penjumlahan Bilangan Bulat:</p>
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Jika <InlineMath math="a > b" /> :</p>
                      <BlockMath math="-a + b = -(a - b)" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Jika <InlineMath math="b > a" /> :</p>
                      <BlockMath math="-a + b = b - a" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Kedua bilangan negatif:</p>
                      <BlockMath math="-a + (-b) = -(a + b)" />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200 leading-relaxed">
                    <strong>Tips Mudah:</strong> Saat menjumlahkan dua bilangan dengan tanda berbeda, kurangkan nilai absolutnya, lalu gunakan tanda bilangan yang nilainya lebih besar.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Contoh Soal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("contoh")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-blue-400" />
                <span className="font-body font-semibold text-white">Contoh Soal dan Pembahasan</span>
              </div>
              {expandedSections.includes("contoh") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("contoh") && (
              <div className="px-5 pb-5 space-y-6">
                {/* Contoh 1 - Mudah */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Hitunglah hasil dari <InlineMath math="8 + (-3)" /> menggunakan garis bilangan!
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Mulai dari titik 0, bergerak 8 satuan ke <strong className="text-green-400">kanan</strong> (karena 8 positif).</p>
                      <p><strong>Langkah 2:</strong> Dari titik 8, bergerak 3 satuan ke <strong className="text-red-400">kiri</strong> (karena -3 negatif).</p>
                      <p><strong>Langkah 3:</strong> Titik akhir berada di angka <strong className="text-cyan-300">5</strong>.</p>

                      {/* Visualisasi garis bilangan */}
                      <div className="bg-slate-900/60 rounded-xl p-3 border border-yellow-500/20 mt-2">
                        <p className="text-yellow-300/70 text-xs text-center mb-1 font-body">Visualisasi di Garis Bilangan</p>
                        <NumberLineContoh1SVG />
                        <div className="flex flex-wrap gap-3 justify-center mt-1 text-xs font-body">
                          <span className="flex items-center gap-1"><span className="inline-block w-6 h-0.5 bg-green-400"></span> +8 ke kanan</span>
                          <span className="flex items-center gap-1"><span className="inline-block w-6 h-0.5 bg-red-400"></span> −3 ke kiri</span>
                          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full border-2 border-cyan-300"></span> hasil = 5</span>
                        </div>
                      </div>

                      <div className="bg-slate-900/50 rounded p-3 mt-2">
                        <BlockMath math="8 + (-3) = 8 - 3 = 5" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, <InlineMath math="8 + (-3) = 5" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - Sedang */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Hitunglah hasil penjumlahan berikut:
                    </p>
                    <div className="space-y-1 ml-4">
                      <p className="text-white/80">a. <InlineMath math="-27 + 12" /></p>
                      <p className="text-white/80">b. <InlineMath math="-14 + 29" /></p>
                      <p className="text-white/80">c. <InlineMath math="-36 + (-58)" /></p>
                    </div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-4 font-body text-sm text-white/80">
                      {/* Soal a */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">a. <InlineMath math="-27 + 12" /></p>
                        <p className="mb-1">Karena 27 {">"} 12 dan 27 bertanda negatif, maka:</p>
                        <BlockMath math="-27 + 12 = -(27 - 12) = -15" />
                        <p className="text-primary">Jawaban: <InlineMath math="-15" /></p>
                      </div>
                      {/* Soal b */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">b. <InlineMath math="-14 + 29" /></p>
                        <p className="mb-1">Karena 29 {">"} 14 dan 29 bertanda positif, maka:</p>
                        <BlockMath math="-14 + 29 = 29 - 14 = 15" />
                        <p className="text-primary">Jawaban: <InlineMath math="15" /></p>
                      </div>
                      {/* Soal c */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">c. <InlineMath math="-36 + (-58)" /></p>
                        <p className="mb-1">Kedua bilangan sama-sama negatif, maka jumlahkan nilainya dan beri tanda negatif:</p>
                        <BlockMath math="-36 + (-58) = -(36 + 58) = -94" />
                        <p className="text-primary">Jawaban: <InlineMath math="-94" /></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contoh 3 - Sulit */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Di sebuah pabrik es krim, suhu ruang penyimpanan adalah <InlineMath math="-17°C" />. Suhu di ruang administrasi tercatat <InlineMath math="41°" /> lebih tinggi dari suhu gudang. Berapa suhu di ruang administrasi?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Identifikasi informasi yang diketahui:</p>
                      <ul className="ml-4 space-y-1">
                        <li>Suhu gudang = <InlineMath math="-17°C" /></li>
                        <li>Selisih suhu = <InlineMath math="41°" /> lebih tinggi</li>
                      </ul>
                      <p><strong>Langkah 2:</strong> Susun model matematika:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\text{Suhu administrasi} = -17 + 41" />
                      </div>
                      <p><strong>Langkah 3:</strong> Hitung hasil:</p>
                      <p className="ml-4">Karena 41 {">"} 17 dan 41 bertanda positif:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="-17 + 41 = 41 - 17 = 24" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, suhu di ruang administrasi adalah <InlineMath math="24°C" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh Bonus - Mencari Nilai n */}
                <div className="border-l-4 border-purple-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded">BONUS</span>
                    <span className="font-body font-semibold text-white">Contoh 4: Mencari Nilai yang Belum Diketahui</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Tentukan nilai <InlineMath math="n" /> pada persamaan berikut:
                    </p>
                    <div className="space-y-1 ml-4">
                      <p className="text-white/80">a. <InlineMath math="n + (-8) = -14" /></p>
                      <p className="text-white/80">b. <InlineMath math="10 + n = -5" /></p>
                    </div>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-purple-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-4 font-body text-sm text-white/80">
                      {/* Soal a */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">a. <InlineMath math="n + (-8) = -14" /></p>
                        <p className="mb-1">Pikirkan: bilangan berapa yang jika dikurangi 8 hasilnya -14?</p>
                        <p className="mb-1">Gunakan garis bilangan: dari titik <InlineMath math="n" />, bergerak 8 langkah ke kiri sampai di -14.</p>
                        <p className="mb-1">Berarti <InlineMath math="n" /> berada 8 langkah di sebelah kanan -14:</p>
                        <BlockMath math="n = -14 + 8 = -6" />
                        <p className="text-primary">Jawaban: <InlineMath math="n = -6" /></p>
                      </div>
                      {/* Soal b */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">b. <InlineMath math="10 + n = -5" /></p>
                        <p className="mb-1">Pikirkan: dari 10, harus bergerak sejauh berapa agar sampai di -5?</p>
                        <p className="mb-1">Jarak dari 10 ke -5 adalah 15 langkah ke kiri (arah negatif):</p>
                        <BlockMath math="n = -5 - 10 = -15" />
                        <p className="text-primary">Jawaban: <InlineMath math="n = -15" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tips Penggunaan Kalkulator */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-5">
            <p className="font-body text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Tips Menggunakan Kalkulator
            </p>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              Pada kalkulator ilmiah, untuk menghitung <InlineMath math="-14 + 29" />, tekan tombol: 
              <code className="bg-slate-800 px-2 py-1 rounded mx-1 text-cyan-300">(-)</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">1</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">4</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">+</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">2</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">9</code>
              <code className="bg-slate-800 px-2 py-1 rounded mx-1">=</code>
              dan hasilnya akan muncul <strong className="text-primary">15</strong>.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              playPopSound();
              navigate("/materi-matematika/kelas-7/bilangan-bulat");
            }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Bilangan Bulat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenjumlahanBilanganBulatPage;
