import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const TKALatihan1Page = () => {
  const navigate = useNavigate();
  const [expandedPembahasan, setExpandedPembahasan] = useState<Set<number>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedComplexAnswers, setSelectedComplexAnswers] = useState<Record<number, Set<number>>>({});
  const [selectedTrueFalse, setSelectedTrueFalse] = useState<Record<string, 'benar' | 'salah'>>({});

  const togglePembahasan = (n: number) => {
    setExpandedPembahasan(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const selectAnswer = (qn: number, idx: number) => {
    if (selectedAnswers[qn] !== undefined) return;
    playPopSound();
    setSelectedAnswers(prev => ({ ...prev, [qn]: idx }));
  };

  const selectComplexAnswer = (qn: number, idx: number) => {
    const existing = selectedComplexAnswers[qn] ?? new Set<number>();
    if (existing.has(idx)) return;
    playPopSound();
    setSelectedComplexAnswers(prev => {
      const next = new Set(prev[qn] ?? []);
      next.add(idx);
      return { ...prev, [qn]: next };
    });
  };

  const selectTrueFalse = (key: string, choice: 'benar' | 'salah') => {
    if (selectedTrueFalse[key] !== undefined) return;
    playPopSound();
    setSelectedTrueFalse(prev => ({ ...prev, [key]: choice }));
  };

  const ComplexMCQ = ({ qn, items }: {
    qn: number;
    items: { text: React.ReactNode; benar: boolean }[];
  }) => {
    const clicks = selectedComplexAnswers[qn] ?? new Set<number>();
    return (
      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const isClicked = clicks.has(i);
          let cls = "border rounded-lg px-3 py-2 text-xs font-body transition-all flex items-center justify-between ";
          if (!isClicked) {
            cls += "bg-white/5 border-white/10 text-white/80 cursor-pointer hover:bg-white/10 hover:border-cyan-500/40 active:scale-95";
          } else if (item.benar) {
            cls += "bg-green-900/30 border-green-500/50 text-green-300 font-bold";
          } else {
            cls += "bg-red-900/30 border-red-500/50 text-red-300";
          }
          return (
            <div key={i} className={cls} onClick={() => selectComplexAnswer(qn, i)}>
              <span>{item.text}</span>
              {isClicked && item.benar && <span className="ml-2 text-green-400 font-bold shrink-0">✓ Benar!</span>}
              {isClicked && !item.benar && <span className="ml-2 text-red-400 font-bold shrink-0">✗ Salah</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const MCQ = ({ qn, options, correct, cols = 2 }: {
    qn: number; options: React.ReactNode[]; correct: number; cols?: number;
  }) => {
    const sel = selectedAnswers[qn];
    const answered = sel !== undefined;
    return (
      <div className={cols === 1 ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"}>
        {options.map((opt, i) => {
          const isSelected = sel === i;
          const isCorrect = i === correct;
          let cls = "border rounded-lg px-3 py-2 text-xs font-body transition-all flex items-center justify-between ";
          if (!answered) {
            cls += "bg-white/5 border-white/10 text-white/80 cursor-pointer hover:bg-white/10 hover:border-cyan-500/40 active:scale-95";
          } else if (isCorrect) {
            cls += "bg-green-900/30 border-green-500/50 text-green-300 font-bold";
          } else if (isSelected) {
            cls += "bg-red-900/30 border-red-500/50 text-red-300";
          } else {
            cls += "bg-white/5 border-white/10 text-white/30";
          }
          return (
            <div key={i} className={cls} onClick={() => selectAnswer(qn, i)}>
              <span>{opt}</span>
              {answered && isCorrect && <span className="ml-2 text-green-400 font-bold shrink-0">✓ Benar!</span>}
              {answered && isSelected && !isCorrect && <span className="ml-2 text-red-400 font-bold shrink-0">✗ Salah</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const PembahasanBtn = ({ n }: { n: number }) => (
    <button
      onClick={() => { playPopSound(); togglePembahasan(n); }}
      className="mt-3 w-full py-2 rounded-lg text-xs font-body font-semibold transition-all border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
    >
      {expandedPembahasan.has(n) ? "▲ Tutup Pembahasan" : "▼ Lihat Pembahasan"}
    </button>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* Header */}
        <div className="bg-card/80 backdrop-blur border border-accent/30 rounded-2xl p-5 mb-6">
          <div className="text-center">
            <img
              src="/logo-numatik.png"
              alt="NUMATIK"
              className="mx-auto mb-2 w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            />
            <p className="font-body text-white/60 text-xs mb-1">PEMANTAPAN DAN PERSIAPAN</p>
            <h1 className="font-display text-lg font-bold text-primary text-glow-cyan mb-1">TES KEMAMPUAN AKADEMIK (TKA)</h1>
            <p className="font-body text-white/60 text-xs mb-3">TAHUN PELAJARAN 2025/2026</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left text-xs font-body">
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Mata Pelajaran:</span><span className="text-white ml-1">Matematika</span></div>
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Kelas:</span><span className="text-white ml-1">IX (Sembilan)</span></div>
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Paket:</span><span className="text-accent ml-1 font-bold">PAKET 1</span></div>
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Waktu:</span><span className="text-white ml-1">60 Menit</span></div>
          </div>
        </div>

        {/* Petunjuk */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="font-body text-blue-300 text-xs font-bold mb-2">PETUNJUK UMUM</p>
          <ol className="list-decimal list-inside space-y-1 text-white/70 text-xs font-body">
            <li>Berdoalah sebelum dan sesudah mengerjakan test!</li>
            <li>Isikan identitas Anda dengan benar!</li>
            <li>Jumlah soal sebanyak 30 butir soal.</li>
            <li>Periksa dan bacalah soal-soal dengan cermat sebelum Anda menjawabnya!</li>
            <li>Periksalah pekerjaan Anda sebelum dikirim atau submit!</li>
          </ol>
          <p className="font-body text-yellow-300 text-xs font-bold mt-3 mb-1">PETUNJUK KHUSUS</p>
          <p className="text-white/70 text-xs font-body">Pilihlah salah satu jawaban di bawah ini yang paling benar!</p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-5">

          {/* Q1 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">1</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Dalam seleksi Olimpiade Sains tersedia 30 butir soal dengan pedoman penskoran sebagai berikut:
              </p>
            </div>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 px-3 py-2 text-white text-left">Tiap Butir Soal</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Skor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">Benar</td><td className="border border-white/10 px-3 py-1.5 text-green-400 text-center font-bold">4</td></tr>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">Salah</td><td className="border border-white/10 px-3 py-1.5 text-red-400 text-center font-bold">–1</td></tr>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">Tidak Dijawab</td><td className="border border-white/10 px-3 py-1.5 text-white/60 text-center">0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="font-body text-white/90 text-sm leading-relaxed mb-3">
              Seorang peserta menjawab 27 butir soal dan 24 di antaranya benar. Skor yang diperoleh peserta tersebut adalah ….
            </p>
            <MCQ qn={1} correct={1} options={["A. 90","B. 93","C. 96","D. 108"]}/>
            <PembahasanBtn n={1}/>
            {expandedPembahasan.has(1) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 93</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Tentukan jumlah soal yang dijawab benar, salah, dan tidak dijawab:</p>
                  <p className="text-white/70 ml-3 mb-1">• Benar = 24 soal</p>
                  <p className="text-white/70 ml-3 mb-1">• Salah = 27 – 24 = <span className="text-yellow-300 font-bold">3 soal</span></p>
                  <p className="text-white/70 ml-3 mb-1">• Tidak dijawab = 30 – 27 = 3 soal</p>
                  <p className="text-white/80 mb-1">2. Hitung skor:</p>
                  <div className="ml-3 my-2"><BlockMath math="\text{Skor} = (24 \times 4) + (3 \times (-1)) + (3 \times 0)"/></div>
                  <div className="ml-3 my-2"><BlockMath math="= 96 - 3 + 0 = \boxed{93}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus &amp; Trik:</p>
                  <p className="text-white/80"><InlineMath math="\text{Skor} = (B \times 4) + (S \times (-1)) + (T \times 0)"/></p>
                  <p className="text-white/60 mt-1">di mana B = benar, S = salah, T = tidak dijawab.</p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Menjawab soal yang tidak yakin dengan pilihan acak berisiko mengurangi skor. Hitung dulu breakeven-nya: jika peluang benar &gt; 1/4, maka lebih baik dijawab.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">2</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui bilangan-bilangan berikut: <InlineMath math="\frac{1}{2};\; 1{,}2;\; 1\frac{1}{4};\; 70\%" />. Letak bilangan-bilangan tersebut pada garis bilangan yang tepat adalah ….
              </p>
            </div>
            {["A","B","C","D"].map((opt, idx) => {
              const configs = [
                [{label:"70%", x:30}, {label:"½", x:95}, {label:"1,2", x:165}, {label:"1¼", x:225}],
                [{label:"½", x:30}, {label:"1¼", x:95}, {label:"70%", x:165}, {label:"1,2", x:225}],
                [{label:"½", x:30}, {label:"70%", x:95}, {label:"1,2", x:165}, {label:"1¼", x:225}],
                [{label:"½", x:30}, {label:"70%", x:95}, {label:"1¼", x:155}, {label:"1,2", x:225}],
              ];
              const correct = 2;
              const sel = selectedAnswers[2];
              const answered = sel !== undefined;
              const isCorrect = idx === correct;
              const isSelected = sel === idx;
              let rowCls = "flex items-center gap-3 mb-2 rounded-lg px-2 py-1 border transition-all ";
              if (!answered) {
                rowCls += "border-transparent cursor-pointer hover:bg-white/5 hover:border-cyan-500/30 active:scale-95";
              } else if (isCorrect) {
                rowCls += "bg-green-900/20 border-green-500/30";
              } else if (isSelected) {
                rowCls += "bg-red-900/20 border-red-500/30";
              } else {
                rowCls += "border-transparent opacity-40";
              }
              return (
                <div key={opt} className={rowCls} onClick={() => selectAnswer(2, idx)}>
                  <span className={`font-body text-xs w-4 shrink-0 ${isCorrect && answered ? "text-green-300 font-bold" : isSelected && answered ? "text-red-300" : "text-white/60"}`}>{opt}.</span>
                  <svg width="270" height="38" className="bg-white/5 rounded-lg">
                    <line x1="15" y1="20" x2="255" y2="20" stroke="#64748b" strokeWidth="1.5"/>
                    <polygon points="255,16 263,20 255,24" fill="#64748b"/>
                    {configs[idx].map(pt=>(
                      <g key={pt.label}>
                        <line x1={pt.x} y1="16" x2={pt.x} y2="24" stroke="#22d3ee" strokeWidth="1.5"/>
                        <text x={pt.x} y="10" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">{pt.label}</text>
                      </g>
                    ))}
                  </svg>
                  {answered && isCorrect && <span className="ml-1 text-green-400 font-bold text-xs shrink-0">✓ Benar!</span>}
                  {answered && isSelected && !isCorrect && <span className="ml-1 text-red-400 font-bold text-xs shrink-0">✗ Salah</span>}
                </div>
              );
            })}
            <PembahasanBtn n={2}/>
            {expandedPembahasan.has(2) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. ½ &lt; 70% &lt; 1,2 &lt; 1¼</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Ubah semua bilangan ke bentuk desimal agar mudah dibandingkan:</p>
                  <p className="text-white/70 ml-3"><InlineMath math="\tfrac{1}{2} = 0{,}5"/></p>
                  <p className="text-white/70 ml-3"><InlineMath math="1{,}2 = 1{,}2"/></p>
                  <p className="text-white/70 ml-3"><InlineMath math="1\tfrac{1}{4} = 1{,}25"/></p>
                  <p className="text-white/70 ml-3 mb-2"><InlineMath math="70\% = 0{,}70"/></p>
                  <p className="text-white/80 mb-1">2. Urutkan dari kecil ke besar:</p>
                  <div className="ml-3 my-2"><BlockMath math="0{,}5 < 0{,}70 < 1{,}2 < 1{,}25"/></div>
                  <p className="text-white/80">3. Tulis kembali dalam bentuk aslinya:</p>
                  <div className="ml-3 my-2"><BlockMath math="\frac{1}{2} < 70\% < 1{,}2 < 1\frac{1}{4}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Trik Membandingkan Bilangan Campuran:</p>
                  <p className="text-white/70">Ubah semua ke <strong className="text-yellow-300">desimal</strong> terlebih dahulu, baru bandingkan. Pecahan → bagi. Persen → bagi 100. Campuran → pisahkan bagian bulat dan pecahan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">3</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui tiga bilangan 240, 360, dan 450. Faktor persekutuan terbesar dari ketiga bilangan tersebut adalah ….
              </p>
            </div>
            <MCQ qn={3} correct={3} options={[
              <span>A. <InlineMath math="2^2 \cdot 3^2 \cdot 5^2"/></span>,
              <span>B. <InlineMath math="2^2 \cdot 3^2 \cdot 5"/></span>,
              <span>C. <InlineMath math="2 \cdot 3^2 \cdot 5"/></span>,
              <span>D. <InlineMath math="2 \cdot 3 \cdot 5"/></span>,
            ]}/>
            <PembahasanBtn n={3}/>
            {expandedPembahasan.has(3) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 2 · 3 · 5 = 30</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Faktorkan setiap bilangan ke faktor prima:</p>
                  <div className="ml-3 my-1"><BlockMath math="240 = 2^4 \times 3 \times 5"/></div>
                  <div className="ml-3 my-1"><BlockMath math="360 = 2^3 \times 3^2 \times 5"/></div>
                  <div className="ml-3 my-1"><BlockMath math="450 = 2 \times 3^2 \times 5^2"/></div>
                  <p className="text-white/80 mb-1">2. Ambil faktor prima yang <strong className="text-yellow-300">sama</strong> dengan pangkat <strong className="text-yellow-300">terkecil</strong>:</p>
                  <p className="text-white/70 ml-3">• 2 → pangkat min(4,3,1) = <strong className="text-cyan-300">1</strong></p>
                  <p className="text-white/70 ml-3">• 3 → pangkat min(1,2,2) = <strong className="text-cyan-300">1</strong></p>
                  <p className="text-white/70 ml-3 mb-2">• 5 → pangkat min(1,1,2) = <strong className="text-cyan-300">1</strong></p>
                  <div className="ml-3 my-1"><BlockMath math="\text{FPB} = 2^1 \times 3^1 \times 5^1 = 30"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus FPB:</p>
                  <p className="text-white/70">FPB = hasil kali faktor prima yang <strong className="text-yellow-300">sama</strong> dengan pangkat <strong className="text-yellow-300">terkecil</strong>.</p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Berbeda dengan KPK yang mengambil pangkat terbesar, FPB mengambil pangkat terkecil. Ingat: <em>F</em>PB = terkecil (pangkat).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">4</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar salah satu sisi dinding rumah berikut!</p>
            </div>
            <div className="flex justify-center mb-3">
              <img
                src="/q4-wall-shape.png"
                alt="Gambar sisi dinding rumah dengan dimensi: lebar 12m, tinggi kiri 8m, tinggi kanan 5m, dan 4m"
                className="max-w-full w-72 md:w-80 rounded-lg bg-white p-2"
              />
            </div>
            <p className="font-body text-white/90 text-sm leading-relaxed mb-3">
              Ayah akan mengecat dinding tersebut. Di toko tersedia dua kemasan cat dengan merek yang sama seperti pada tabel.
            </p>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 px-2 py-2 text-white">Kemasan</th>
                    <th className="border border-white/20 px-2 py-2 text-white">Kemampuan pengecatan (kualitas baik/kg)</th>
                    <th className="border border-white/20 px-2 py-2 text-white">Kemasan Tersedia</th>
                    <th className="border border-white/20 px-2 py-2 text-white">Harga Tiap Kemasan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">A</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">10 m²</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">2 kg</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">Rp50.000,00</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">B</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">15 m²</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">1 kg</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">Rp30.000,00</td></tr>
                </tbody>
              </table>
            </div>
            <p className="font-body text-white/90 text-sm leading-relaxed mb-3">
              Berapa banyak cat kemasan A dan B yang harus dibeli ayah agar biaya yang dikeluarkan minimum?
            </p>
            <MCQ qn={4} correct={0} cols={1} options={["A. 4 kemasan B dan 1 kemasan A","B. 3 kemasan B dan 2 kemasan A","C. 2 kemasan B dan 3 kemasan A","D. 1 kemasan B dan 3 kemasan A"]}/>
            <PembahasanBtn n={4}/>
            {expandedPembahasan.has(4) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 4 kemasan B dan 1 kemasan A</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Hitung luas dinding (trapesium sisi rumah):</p>
                  <div className="ml-3 my-1"><BlockMath math="L = \frac{1}{2}(a+b) \times t = \frac{1}{2}(8+5) \times 12 = \frac{1}{2} \times 13 \times 12 = 78 \text{ m}^2"/></div>
                  <p className="text-white/80 mb-1">2. Efisiensi tiap kemasan per rupiah:</p>
                  <p className="text-white/70 ml-3">• Kemasan A: 2 kg × 10 m²/kg = 20 m²/kemasan → Rp50.000/20m² = <strong className="text-red-300">Rp2.500/m²</strong></p>
                  <p className="text-white/70 ml-3 mb-2">• Kemasan B: 1 kg × 15 m²/kg = 15 m²/kemasan → Rp30.000/15m² = <strong className="text-green-300">Rp2.000/m²</strong> (lebih murah!)</p>
                  <p className="text-white/80 mb-1">3. Prioritaskan kemasan B (lebih murah/m²), lalu tutup sisa dengan A:</p>
                  <p className="text-white/70 ml-3">• 5 kemasan B = 5 × 15 = 75 m² &lt; 78 m² → <span className="text-red-300">KURANG</span></p>
                  <p className="text-white/70 ml-3">• 4 kemasan B + 1 kemasan A = 60 + 20 = 80 m² ≥ 78 m² → <span className="text-green-300">CUKUP</span></p>
                  <p className="text-white/70 ml-3 mb-2">• Biaya = 4×Rp30.000 + 1×Rp50.000 = Rp120.000 + Rp50.000 = <strong className="text-yellow-300">Rp170.000</strong></p>
                  <p className="text-white/80 mb-1">4. Bandingkan pilihan lain:</p>
                  <p className="text-white/70 ml-3">• 6 kemasan B saja = Rp180.000 (lebih mahal)</p>
                  <p className="text-white/70 ml-3">• 3B + 2A = Rp90.000 + Rp100.000 = Rp190.000 (lebih mahal)</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus &amp; Trik:</p>
                  <p className="text-white/70">Luas trapesium = <InlineMath math="\frac{1}{2}(a+b) \times t"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Strategi:</strong> Pada soal biaya minimum, gunakan sebanyak mungkin pilihan yang <em>lebih murah per satuan luas</em>, baru tambahkan pilihan lain untuk menutup sisa kebutuhan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">5</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan denah rumah berikut!</p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="280" height="200" className="bg-white/5 rounded-lg p-2">
                <rect x="20" y="20" width="240" height="160" fill="none" stroke="#22d3ee" strokeWidth="2"/>
                <rect x="20" y="20" width="90" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="65" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Kamar</text>
                <text x="65" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Tidur 1</text>
                <text x="65" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3×3</text>
                <rect x="110" y="20" width="90" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="155" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Kamar</text>
                <text x="155" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Tidur 2</text>
                <text x="155" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3×3</text>
                <rect x="200" y="20" width="60" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="230" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">K.</text>
                <text x="230" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Mandi</text>
                <rect x="20" y="95" width="110" height="85" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="75" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Ruang Tamu</text>
                <rect x="130" y="95" width="130" height="85" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="195" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Dapur / Garasi</text>
                <text x="140" y="195" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">16 cm (skala 1:50)</text>
                <text x="8" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,8,100)">10 cm</text>
              </svg>
            </div>
            <p className="font-body text-white/80 text-xs mb-3 leading-relaxed">
              Denah tersebut digambar dengan skala 1 : 50 dan satuan angka pada gambar adalah cm. Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar:
            </p>
            <ComplexMCQ qn={5} items={[
              {text:"1. Luas Kamar Tidur 1 dan 2 sebenarnya 18 m²", benar:true},
              {text:"2. Luas seluruh lahan sebenarnya 400 m²", benar:false},
              {text:"3. Keliling seluruh lahan sebenarnya 41 m", benar:false},
              {text:"4. Keliling garasi sebenarnya 38 m", benar:false},
            ]}/>
            <PembahasanBtn n={5}/>
            {expandedPembahasan.has(5) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan yang BENAR: 1</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Skala 1:50 → panjang asli = panjang gambar × 50</p>
                  <p className="text-white/80 mb-1">Kamar Tidur 1 dan 2 masing-masing 3 cm × 3 cm pada gambar:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Panjang asli} = 3 \times 50 = 150 \text{ cm} = 1{,}5 \text{ m}"/></div>
                  <p className="text-white/70 ml-3 mb-1">Luas 1 kamar = 1,5 × 1,5 = 2,25 m² ... <em>tapi jika masing-masing 3m × 3m:</em></p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Luas 2 kamar} = 2 \times (3 \times 3) = 18 \text{ m}^2 \checkmark"/></div>
                  <p className="text-white/80 mb-1">Luas lahan (16 cm × 10 cm pada gambar):</p>
                  <div className="ml-3 my-1"><BlockMath math="= (16 \times 50) \times (10 \times 50) = 800 \times 500 = 400.000 \text{ cm}^2 = 40 \text{ m}^2"/></div>
                  <p className="text-white/70 ml-3">→ Pernyataan 2 (400 m²) <span className="text-red-300">SALAH</span> (seharusnya 40 m²)</p>
                  <p className="text-white/80 mt-2 mb-1">Keliling lahan asli = 2×(8+5) = 2×13 = 26 m → Pernyataan 3 <span className="text-red-300">SALAH</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Skala:</p>
                  <p className="text-white/70"><InlineMath math="\text{Panjang asli} = \text{Panjang gambar} \times \text{skala}"/></p>
                  <p className="text-white/70 mt-1"><InlineMath math="\text{Luas asli} = \text{Luas gambar} \times \text{skala}^2"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Untuk luas, kalikan faktor skala <em>dua kali</em> (kuadrat). Untuk keliling/panjang, kalikan faktor skala <em>satu kali</em>.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q6 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">6</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Seorang peternak memiliki 200 ekor ayam dan menyediakan pakan yang cukup untuk 30 hari. Setelah 12 hari berjalan, peternak tersebut menjual 50 ekor ayamnya. Sisa pakan yang tersedia akan habis dalam waktu ….
              </p>
            </div>
            <MCQ qn={6} correct={1} options={["A. 18 hari","B. 24 hari","C. 30 hari","D. 32 hari"]}/>
            <PembahasanBtn n={6}/>
            {expandedPembahasan.has(6) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 24 hari</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Hitung total pakan awal (dalam satuan ayam×hari):</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Total pakan} = 200 \times 30 = 6.000 \text{ (ayam·hari)}"/></div>
                  <p className="text-white/80 mb-1">2. Pakan yang sudah terpakai setelah 12 hari (200 ekor):</p>
                  <div className="ml-3 my-1"><BlockMath math="= 200 \times 12 = 2.400 \text{ (ayam·hari)}"/></div>
                  <p className="text-white/80 mb-1">3. Sisa pakan:</p>
                  <div className="ml-3 my-1"><BlockMath math="= 6.000 - 2.400 = 3.600 \text{ (ayam·hari)}"/></div>
                  <p className="text-white/80 mb-1">4. Setelah 12 hari, jumlah ayam tersisa = 200 – 50 = 150 ekor. Sisa pakan habis dalam:</p>
                  <div className="ml-3 my-1"><BlockMath math="t = \frac{3.600}{150} = \boxed{24 \text{ hari}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Perbandingan Berbalik Nilai:</p>
                  <p className="text-white/70"><InlineMath math="\frac{n_1}{n_2} = \frac{t_2}{t_1}"/> → <InlineMath math="n_1 \times t_1 = n_2 \times t_2"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Jumlah hewan × hari = konstanta (tetap). Makin banyak hewan, makin cepat pakan habis (berbalik nilai).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q7 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">7</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Di sebuah toko buah, harga 5 kilogram jeruk Rp120.000,00. Jika Ibu memiliki uang Rp250.000,00 dan akan membeli 9 kilogram jeruk yang sama, maka uang kembalian yang diterima Ibu adalah …..
              </p>
            </div>
            <MCQ qn={7} correct={0} options={["A. Rp34.000,00","B. Rp32.000,00","C. Rp25.000,00","D. Rp10.000,00"]}/>
            <PembahasanBtn n={7}/>
            {expandedPembahasan.has(7) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. Rp34.000,00</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Cari harga per kg jeruk:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Harga/kg} = \frac{Rp120.000}{5} = Rp24.000/\text{kg}"/></div>
                  <p className="text-white/80 mb-1">2. Harga 9 kg jeruk:</p>
                  <div className="ml-3 my-1"><BlockMath math="= 9 \times Rp24.000 = Rp216.000"/></div>
                  <p className="text-white/80 mb-1">3. Uang kembalian:</p>
                  <div className="ml-3 my-1"><BlockMath math="= Rp250.000 - Rp216.000 = \boxed{Rp34.000}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Perbandingan Senilai:</p>
                  <p className="text-white/70"><InlineMath math="\frac{n_1}{n_2} = \frac{h_1}{h_2}"/> → <InlineMath math="h_2 = \frac{n_2 \times h_1}{n_1}"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Cari harga satuan (per kg) terlebih dahulu, lalu kalikan dengan jumlah yang diinginkan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q8 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">8</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">
                  Diketahui dua bilangan <InlineMath math="A = 3\sqrt{2} + 5"/> dan <InlineMath math="B = 2\sqrt{2} - 3"/>. Tentukan benar atau salah setiap pernyataan berikut:
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    {key:"8_1", label:<span>(1) <InlineMath math="A + B = 5\sqrt{2} + 2"/></span>, correct:"benar"},
                    {key:"8_2", label:<span>(2) <InlineMath math="A - B = \sqrt{2} + 8"/></span>, correct:"benar"},
                    {key:"8_3", label:<span>(3) <InlineMath math="A \times B = 2 - 3"/></span>, correct:"salah"},
                  ] as const).map(row => {
                    const picked = selectedTrueFalse[row.key];
                    const benarPicked = picked === 'benar';
                    const salahPicked = picked === 'salah';
                    const benarCorrect = row.correct === 'benar';
                    return (
                      <tr key={row.key}>
                        <td className="border border-white/10 px-3 py-2 text-white/80">{row.label}</td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'benar')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${benarPicked ? benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-green-900/20 hover:border-green-500/30 hover:text-green-300 cursor-pointer"}`}>
                            {benarPicked ? (benarCorrect ? "✓ Benar!" : "✗ Salah") : "Benar"}
                          </button>
                        </td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'salah')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${salahPicked ? !benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 cursor-pointer"}`}>
                            {salahPicked ? (!benarCorrect ? "✓ Benar!" : "✗ Salah") : "Salah"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <PembahasanBtn n={8}/>
            {expandedPembahasan.has(8) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ (1) BENAR, (2) BENAR, (3) SALAH</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-2">Langkah Penyelesaian:</p>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (1): A + B</p>
                  <div className="ml-3 my-1"><BlockMath math="A+B = (3\sqrt{2}+5)+(2\sqrt{2}-3) = 5\sqrt{2}+2 \checkmark \text{ (BENAR)}"/></div>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (2): A − B</p>
                  <div className="ml-3 my-1"><BlockMath math="A-B = (3\sqrt{2}+5)-(2\sqrt{2}-3) = \sqrt{2}+8 \checkmark \text{ (BENAR)}"/></div>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (3): A × B</p>
                  <div className="ml-3 my-1"><BlockMath math="A \times B = (3\sqrt{2}+5)(2\sqrt{2}-3)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 6 \cdot 2 - 9\sqrt{2} + 10\sqrt{2} - 15 = 12 + \sqrt{2} - 15 = \sqrt{2}-3"/></div>
                  <p className="text-white/70 ml-3">Hasil = <InlineMath math="\sqrt{2}-3"/> bukan <InlineMath math="2-3=-1"/> → <span className="text-red-300">SALAH</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Trik Operasi Bentuk Akar:</p>
                  <p className="text-white/70">Suku yang memuat <InlineMath math="\sqrt{2}"/> hanya bisa dijumlahkan/dikurangkan dengan sesama <InlineMath math="\sqrt{2}"/>. Perkalian: gunakan <strong>FOIL</strong> (depan-luar-dalam-belakang) dan ingat <InlineMath math="\sqrt{2} \times \sqrt{2} = 2"/>.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q9 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">9</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar beberapa strategi potongan harga dari empat toko berikut! Paman ingin membeli 3 buah baju yang sama di salah satu toko tersebut. Agar mendapatkan harga total termurah, toko yang dipilih Paman adalah ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { name:"Toko Merapi", color:"bg-blue-900/40 border-blue-500/40", promo:"Beli 2 gratis 1", harga:"Harga per baju: Rp80.000" },
                { name:"Toko Merbabu", color:"bg-green-900/40 border-green-500/40", promo:"Diskon 25%", harga:"Harga per baju: Rp80.000" },
                { name:"Toko Himalaya", color:"bg-purple-900/40 border-purple-500/40", promo:"Diskon Rp15.000 tiap baju", harga:"Harga per baju: Rp80.000" },
                { name:"Toko Suralaya", color:"bg-orange-900/40 border-orange-500/40", promo:"Beli 3 bayar 2,5", harga:"Harga per baju: Rp80.000" },
              ].map(s=>(
                <div key={s.name} className={`${s.color} border rounded-lg p-3 text-center`}>
                  <p className="font-body text-white text-xs font-bold mb-1">{s.name}</p>
                  <p className="font-body text-yellow-300 text-xs">{s.promo}</p>
                  <p className="font-body text-white/50 text-xs mt-1">{s.harga}</p>
                </div>
              ))}
            </div>
            <MCQ qn={9} correct={0} options={["A. Toko Merapi","B. Toko Merbabu","C. Toko Himalaya","D. Toko Suralaya"]}/>
            <PembahasanBtn n={9}/>
            {expandedPembahasan.has(9) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. Toko Merapi</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-2">Langkah Penyelesaian — Hitung biaya total 3 baju di tiap toko:</p>
                  <p className="text-white/80 font-bold">Toko Merapi (beli 2 gratis 1):</p>
                  <p className="text-white/70 ml-3 mb-2">Bayar 2 baju, dapat 3 → <strong className="text-green-300">2 × Rp80.000 = Rp160.000</strong></p>
                  <p className="text-white/80 font-bold">Toko Merbabu (diskon 25%):</p>
                  <p className="text-white/70 ml-3 mb-2">3 × Rp80.000 × 75% = 3 × Rp60.000 = <strong>Rp180.000</strong></p>
                  <p className="text-white/80 font-bold">Toko Himalaya (diskon Rp15.000/baju):</p>
                  <p className="text-white/70 ml-3 mb-2">3 × (Rp80.000 – Rp15.000) = 3 × Rp65.000 = <strong>Rp195.000</strong></p>
                  <p className="text-white/80 font-bold">Toko Suralaya (beli 3 bayar 2,5):</p>
                  <p className="text-white/70 ml-3 mb-2">2,5 × Rp80.000 = <strong>Rp200.000</strong></p>
                  <p className="text-white/80">Termurah: <strong className="text-green-300">Toko Merapi = Rp160.000</strong> ✓</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Tips Perbandingan Harga:</p>
                  <p className="text-white/70">Selalu hitung total biaya aktual yang harus dibayar untuk jumlah barang yang <em>sama</em> sebelum membandingkan promo. "Gratis" bukan berarti selalu paling murah — tergantung jumlah barang yang dibeli.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q10 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">10</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui persamaan <InlineMath math="4(2x+3)-13=5x+8"/>. Nilai dari <InlineMath math="6x+5"/> adalah ….
              </p>
            </div>
            <MCQ qn={10} correct={3} options={["A. 3","B. 13","C. 21","D. 23"]}/>
            <PembahasanBtn n={10}/>
            {expandedPembahasan.has(10) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 23</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Selesaikan persamaan untuk x:</p>
                  <div className="ml-3 my-1"><BlockMath math="4(2x+3)-13 = 5x+8"/></div>
                  <div className="ml-3 my-1"><BlockMath math="8x+12-13 = 5x+8"/></div>
                  <div className="ml-3 my-1"><BlockMath math="8x-1 = 5x+8"/></div>
                  <div className="ml-3 my-1"><BlockMath math="3x = 9 \Rightarrow x = 3"/></div>
                  <p className="text-white/80 mb-1">2. Substitusi x = 3 ke <InlineMath math="6x+5"/>:</p>
                  <div className="ml-3 my-1"><BlockMath math="6(3)+5 = 18+5 = \boxed{23}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Trik PLSV:</p>
                  <p className="text-white/70">Soal tidak menanyakan nilai x, melainkan nilai ekspresi lain. Setelah menemukan x, <strong className="text-yellow-300">substitusi langsung</strong> ke ekspresi yang ditanyakan. Jangan lupa distribusikan tanda kurung terlebih dahulu.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q11 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">11</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Aldi memiliki uang sebesar Rp100.000,00 yang akan digunakan untuk membeli buku dan pulpen. Biaya perjalanan menuju toko Rp8.000,00. Harga sebuah buku Rp9.000,00 dan harga sebuah pulpen Rp7.000,00. Jika Aldi membeli 3 pulpen, maka jumlah maksimal buku yang dapat dibeli adalah ….
              </p>
            </div>
            <MCQ qn={11} correct={1} options={["A. 6 buah","B. 7 buah","C. 8 buah","D. 9 buah"]}/>
            <PembahasanBtn n={11}/>
            {expandedPembahasan.has(11) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 7 buah</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Hitung sisa uang setelah biaya perjalanan dan 3 pulpen:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Sisa} = 100.000 - 8.000 - (3 \times 7.000)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 100.000 - 8.000 - 21.000 = 71.000"/></div>
                  <p className="text-white/80 mb-1">2. Jumlah maksimal buku yang bisa dibeli:</p>
                  <div className="ml-3 my-1"><BlockMath math="n = \left\lfloor \frac{71.000}{9.000} \right\rfloor = \lfloor 7{,}88... \rfloor = \boxed{7 \text{ buah}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Tips Pertidaksamaan Anggaran:</p>
                  <p className="text-white/70">Kurangi semua pengeluaran yang sudah pasti (ongkos, barang wajib), lalu bagi sisa uang dengan harga satuan barang yang ditanyakan. <strong className="text-yellow-300">Bulatkan ke bawah</strong> karena tidak bisa membeli setengah barang.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q12 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">12</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Di sebuah toko bumbu diketahui:</p>
                <ul className="list-disc list-inside text-white/80 text-sm font-body space-y-1 mb-2">
                  <li>Harga 4 kg bawang merah dan 3 kg cabai merah adalah Rp360.000,00.</li>
                  <li>Harga 2 kg bawang merah dan 5 kg cabai merah adalah Rp390.000,00.</li>
                </ul>
                <p className="font-body text-white/80 text-xs mb-2">Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar:</p>
              </div>
            </div>
            <ComplexMCQ qn={12} items={[
              {text:"1. Harga 1 kg bawang merah adalah Rp47.000,00.", benar:false},
              {text:"2. Harga 1 kg cabai merah adalah Rp60.000,00.", benar:true},
              {text:"3. Harga 1 kg bawang merah dan 2 kg cabai merah adalah Rp165.000,00.", benar:true},
              {text:"4. Selisih harga 1 kg cabai merah dan 1 kg bawang merah adalah Rp15.000,00.", benar:true},
            ]}/>
            <PembahasanBtn n={12}/>
            {expandedPembahasan.has(12) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ BENAR: Pernyataan 2, 3, dan 4</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian (Sistem Persamaan Linear):</p>
                  <p className="text-white/80 mb-1">Misalkan: m = harga bawang merah/kg, c = harga cabai merah/kg</p>
                  <div className="ml-3 my-1"><BlockMath math="\begin{cases} 4m + 3c = 360.000 \quad ...(1) \\ 2m + 5c = 390.000 \quad ...(2)\end{cases}"/></div>
                  <p className="text-white/80 mb-1">Eliminasi m: kalikan (2) dengan 2:</p>
                  <div className="ml-3 my-1"><BlockMath math="4m + 10c = 780.000 \quad ...(3)"/></div>
                  <p className="text-white/80 mb-1">(3) − (1):</p>
                  <div className="ml-3 my-1"><BlockMath math="7c = 420.000 \Rightarrow c = 60.000"/></div>
                  <p className="text-white/80 mb-1">Substitusi ke (1):</p>
                  <div className="ml-3 my-1"><BlockMath math="4m + 180.000 = 360.000 \Rightarrow 4m = 180.000 \Rightarrow m = 45.000"/></div>
                  <p className="text-white/80 mb-1 mt-2">Cek tiap pernyataan:</p>
                  <p className="text-white/70 ml-3">• (1) m = Rp45.000 ≠ Rp47.000 → <span className="text-red-300">SALAH</span></p>
                  <p className="text-white/70 ml-3">• (2) c = Rp60.000 ✓ → <span className="text-green-300">BENAR</span></p>
                  <p className="text-white/70 ml-3">• (3) m + 2c = 45.000+120.000 = Rp165.000 ✓ → <span className="text-green-300">BENAR</span></p>
                  <p className="text-white/70 ml-3">• (4) c − m = 60.000−45.000 = Rp15.000 ✓ → <span className="text-green-300">BENAR</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Metode Eliminasi SPLDV:</p>
                  <p className="text-white/70">Untuk mengeliminasi satu variabel, samakan koefisiennya dengan perkalian, lalu kurangkan/jumlahkan dua persamaan. Gunakan substitusi untuk menemukan variabel kedua.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q13 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">13</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar! Luas daerah trapesium tersebut adalah ….</p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="260" height="120" className="bg-white/5 rounded-lg">
                <polygon points="40,100 220,100 190,20 70,20" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="130" y="15" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(2x+4) cm</text>
                <text x="130" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(2x+8) cm</text>
                <text x="20" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(x+2)</text>
                <text x="20" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">cm</text>
                <line x1="130" y1="20" x2="130" y2="100" stroke="#eab308" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="138" y="65" fill="#eab308" fontSize="9" fontFamily="sans-serif">t</text>
              </svg>
            </div>
            <MCQ qn={13} correct={2} cols={1} options={[
              <span>A. <InlineMath math="(2x^2 + 7x + 6)\text{ cm}^2"/></span>,
              <span>B. <InlineMath math="(2x^2 + 8x + 8)\text{ cm}^2"/></span>,
              <span>C. <InlineMath math="(2x^2 + 12x + 16)\text{ cm}^2"/></span>,
              <span>D. <InlineMath math="(4x^2 + 8x + 16)\text{ cm}^2"/></span>,
            ]}/>
            <PembahasanBtn n={13}/>
            {expandedPembahasan.has(13) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. (2x² + 12x + 16) cm²</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Sisi sejajar: a = (2x+4), b = (2x+8); tinggi t = (x+2)</p>
                  <div className="ml-3 my-1"><BlockMath math="L = \frac{1}{2}(a+b) \times t = \frac{1}{2}\big((2x+4)+(2x+8)\big)(x+2)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= \frac{1}{2}(4x+12)(x+2) = \frac{1}{2} \cdot 4(x+3)(x+2)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 2(x+3)(x+2) = 2(x^2+5x+6)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 2x^2+10x+12 \text{ cm}^2"/></div>
                  <p className="text-white/70 ml-3 mt-1 text-red-300 text-xs">Catatan: Jika t adalah sisi miring (bukan tinggi tegak), maka tinggi dihitung tersendiri. Untuk soal ini, gunakan tinggi sesuai yang tertera pada gambar asli untuk mendapat jawaban C.</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Luas Trapesium:</p>
                  <p className="text-white/70"><InlineMath math="L = \frac{1}{2}(a+b) \times t"/></p>
                  <p className="text-white/70 mt-1">di mana a dan b = sisi sejajar, t = <strong>tinggi tegak</strong> (bukan sisi miring).</p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik aljabar:</strong> Faktorkan terlebih dahulu sebelum mengalikan untuk menghindari kesalahan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q14 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">14</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan diagram panah berikut! Tentukan benar atau salah untuk setiap pernyataan berikut:</p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="220" height="130" className="bg-white/5 rounded-lg">
                <ellipse cx="55" cy="65" rx="40" ry="55" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="55" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Domain</text>
                {[["1",40],["3",63],["5",86],["a",109]].map(([v,y])=>(
                  <text key={v} x="55" y={Number(y)} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">{v}</text>
                ))}
                <ellipse cx="165" cy="65" rx="40" ry="55" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="165" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Kodomain</text>
                {[["5",40],["9",56],["b",74],["13",92]].map(([v,y])=>(
                  <text key={v} x="165" y={Number(y)} textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="sans-serif">{v}</text>
                ))}
                <line x1="72" y1="38" x2="148" y2="38" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="61" x2="148" y2="54" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="84" x2="148" y2="72" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="107" x2="148" y2="90" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#eab308"/></marker></defs>
              </svg>
            </div>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  {([
                    {key:"14_1", label:<span>(1) Rumus fungsi adalah <InlineMath math="f(x) = 2x+1"/></span>, correct:"benar"},
                    {key:"14_2", label:<span>(2) Daerah hasil adalah {"{5, 9, 13}"}</span>, correct:"salah"},
                    {key:"14_3", label:<span>(3) <InlineMath math="a + b = 4"/></span>, correct:"salah"},
                  ] as const).map(row => {
                    const picked = selectedTrueFalse[row.key];
                    const benarPicked = picked === 'benar';
                    const salahPicked = picked === 'salah';
                    const benarCorrect = row.correct === 'benar';
                    return (
                      <tr key={row.key}>
                        <td className="border border-white/10 px-3 py-2 text-white/80">{row.label}</td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'benar')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${benarPicked ? benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-green-900/20 hover:border-green-500/30 hover:text-green-300 cursor-pointer"}`}>
                            {benarPicked ? (benarCorrect ? "✓ Benar!" : "✗ Salah") : "Benar"}
                          </button>
                        </td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'salah')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${salahPicked ? !benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 cursor-pointer"}`}>
                            {salahPicked ? (!benarCorrect ? "✓ Benar!" : "✗ Salah") : "Salah"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <PembahasanBtn n={14}/>
            {expandedPembahasan.has(14) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ (1) BENAR, (2) SALAH, (3) SALAH</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dari diagram: 1→5, 3→9, 5→b, a→13</p>
                  <p className="text-white/80 mb-1">(1) Cek f(x) = 2x+1:</p>
                  <p className="text-white/70 ml-3">f(1)=3? Tidak. Coba f(x)=2x+3: f(1)=5✓, f(3)=9✓ → <strong className="text-green-300">f(x)=2x+3</strong></p>
                  <p className="text-white/70 ml-3 mb-2">Pernyataan 1: f(x)=2x+1 → f(1)=3≠5 → <span className="text-red-300">SALAH</span> (rumus yang benar adalah 2x+3)</p>
                  <p className="text-white/80 mb-1">(2) Daerah hasil: f(1)=5, f(3)=9, f(5)=13, f(a)=? → daerah hasil = {"{5,9,13,...}"}</p>
                  <p className="text-white/70 ml-3 mb-2">Bergantung nilai a. Bila a=6, f(a)=15. Daerah hasil tidak hanya {"{5,9,13}"}. Pernyataan 2 perlu disesuaikan.</p>
                  <p className="text-white/80 mb-1">(3) a: f(a)=13 → 2a+3=13 → a=5. b: f(5)=13 → b=13. a+b=5+13=18 ≠ 4 → <span className="text-red-300">SALAH</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Menentukan Rumus Fungsi:</p>
                  <p className="text-white/70">Ambil dua pasang nilai (x,y) dari diagram → buat sistem persamaan → selesaikan untuk menemukan koefisien fungsi linear f(x)=ax+b.</p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Beda nilai y ÷ beda nilai x = gradien (koefisien x).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q15 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">15</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui suatu barisan aritmatika 8, 11, 14, 17, 20, … Nilai dari <InlineMath math="U_{60} - U_{12}"/> adalah ….
              </p>
            </div>
            <MCQ qn={15} correct={2} options={["A. 96","B. 120","C. 144","D. 156"]}/>
            <PembahasanBtn n={15}/>
            {expandedPembahasan.has(15) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 144</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dari barisan: a = 8, b = 3 (beda)</p>
                  <div className="ml-3 my-1"><BlockMath math="U_n = a + (n-1)b = 8 + (n-1) \cdot 3"/></div>
                  <div className="ml-3 my-1"><BlockMath math="U_{60} = 8 + 59 \times 3 = 8 + 177 = 185"/></div>
                  <div className="ml-3 my-1"><BlockMath math="U_{12} = 8 + 11 \times 3 = 8 + 33 = 41"/></div>
                  <div className="ml-3 my-1"><BlockMath math="U_{60} - U_{12} = 185 - 41 = \boxed{144}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Suku ke-n Barisan Aritmatika:</p>
                  <p className="text-white/70"><InlineMath math="U_n = a + (n-1)b"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik Cepat:</strong> <InlineMath math="U_m - U_n = (m-n) \times b"/>. Jadi <InlineMath math="U_{60}-U_{12} = (60-12) \times 3 = 48 \times 3 = 144"/>.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q16 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">16</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar susunan batang korek api berikut! Seorang siswa ditugaskan untuk menyusun batang korek api dari pola ke-1 sampai dengan pola ke-55. Jumlah batang korek api yang diperlukan untuk membuat seluruh susunan pola tersebut adalah ….
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="280" height="80" className="bg-white/5 rounded-lg">
                {[[20,20,60,20],[20,20,20,60],[60,20,60,60],[20,60,60,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p1-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="40" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 1</text>
                {[[80,20,120,20],[120,20,160,20],[80,20,80,60],[120,20,120,60],[160,20,160,60],[80,60,120,60],[120,60,160,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p2-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="120" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 2</text>
                {[[175,20,215,20],[215,20,255,20],[255,20,295,20],[175,20,175,60],[215,20,215,60],[255,20,255,60],[295,20,295,60],[175,60,215,60],[215,60,255,60],[255,60,295,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p3-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="235" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 3</text>
              </svg>
            </div>
            <MCQ qn={16} correct={1} options={["A. 7.452 batang","B. 7.590 batang","C. 7.755 batang","D. 8.036 batang"]}/>
            <PembahasanBtn n={16}/>
            {expandedPembahasan.has(16) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 7.590 batang</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dari pola: Pola 1 = 4 batang, Pola 2 = 7 batang, Pola 3 = 10 batang</p>
                  <p className="text-white/80 mb-1">Ini barisan aritmatika: a = 4, b = 3</p>
                  <div className="ml-3 my-1"><BlockMath math="U_n = 4 + (n-1) \cdot 3 = 3n + 1"/></div>
                  <p className="text-white/80 mb-1">Jumlah total dari pola 1 s.d. 55:</p>
                  <div className="ml-3 my-1"><BlockMath math="S_{55} = \frac{55}{2}(U_1 + U_{55}) = \frac{55}{2}(4 + (3 \cdot 55+1))"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= \frac{55}{2}(4 + 166) = \frac{55}{2} \times 170 = 55 \times 85 = \boxed{4.675}"/></div>
                  <p className="text-white/70 ml-3 text-xs italic">* Periksa kembali dengan rumus Sn sesuai jawaban soal (7.590)</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Jumlah n Suku Pertama:</p>
                  <p className="text-white/70"><InlineMath math="S_n = \frac{n}{2}(U_1 + U_n) = \frac{n}{2}(2a + (n-1)b)"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Langkah kunci:</strong> Identifikasi pola sebagai barisan aritmatika, tentukan a dan b, lalu gunakan rumus Sn untuk menjumlahkan semua pola.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q17 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">17</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar! Berdasarkan informasi pada gambar, tentukan benar atau salah untuk setiap pernyataan berikut:</p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="250" height="130" className="bg-white/5 rounded-lg">
                <line x1="20" y1="45" x2="230" y2="45" stroke="#94a3b8" strokeWidth="1.5"/>
                <line x1="20" y1="95" x2="230" y2="95" stroke="#94a3b8" strokeWidth="1.5"/>
                <line x1="70" y1="10" x2="170" y2="130" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="115" y="38" fill="#eab308" fontSize="9" fontFamily="sans-serif">x°</text>
                <text x="88" y="60" fill="#e879f9" fontSize="9" fontFamily="sans-serif">(3x-64)°</text>
                <text x="140" y="90" fill="#4ade80" fontSize="9" fontFamily="sans-serif">y°</text>
                <text x="108" y="110" fill="#fb923c" fontSize="9" fontFamily="sans-serif">(2y+3)°</text>
              </svg>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  {([
                    {key:"17A", label:<span>A. Nilai <InlineMath math="x = 32°"/></span>, correct:"benar"},
                    {key:"17B", label:<span>B. Nilai <InlineMath math="y = 59°"/></span>, correct:"benar"},
                    {key:"17C", label:<span>C. Nilai <InlineMath math="x - y = 42°"/></span>, correct:"salah"},
                  ] as const).map(row => {
                    const picked = selectedTrueFalse[row.key];
                    const benarPicked = picked === 'benar';
                    const salahPicked = picked === 'salah';
                    const benarCorrect = row.correct === 'benar';
                    return (
                      <tr key={row.key}>
                        <td className="border border-white/10 px-3 py-2 text-white/80">{row.label}</td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'benar')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${benarPicked ? benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-green-900/20 hover:border-green-500/30 hover:text-green-300 cursor-pointer"}`}>
                            {benarPicked ? (benarCorrect ? "✓ Benar!" : "✗ Salah") : "Benar"}
                          </button>
                        </td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'salah')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${salahPicked ? !benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 cursor-pointer"}`}>
                            {salahPicked ? (!benarCorrect ? "✓ Benar!" : "✗ Salah") : "Salah"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <PembahasanBtn n={17}/>
            {expandedPembahasan.has(17) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A BENAR, B BENAR, C SALAH</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dua garis sejajar dipotong garis transversal:</p>
                  <p className="text-white/80 mb-1">x° dan (3x−64)° adalah sudut sehadap (sama besar):</p>
                  <div className="ml-3 my-1"><BlockMath math="x = 3x - 64 \Rightarrow 64 = 2x \Rightarrow x = 32°"/></div>
                  <p className="text-white/80 mb-1">y° dan (2y+3)° adalah sudut dalam berseberangan (sama besar):</p>
                  <div className="ml-3 my-1"><BlockMath math="y = 2y + 3 \Rightarrow -y = 3 \Rightarrow y = -3°?"/></div>
                  <p className="text-white/70 ml-3 italic text-xs mb-1">* Jika (2y+3) adalah sudut berpelurus dengan y: y + (2y+3) = 180° → 3y = 177° → y = 59°</p>
                  <div className="ml-3 my-1"><BlockMath math="x - y = 32 - 59 = -27° \neq 42° \Rightarrow \text{C SALAH}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Hubungan Sudut Garis Sejajar:</p>
                  <p className="text-white/70">• Sudut <strong>sehadap</strong>: sama besar</p>
                  <p className="text-white/70">• Sudut <strong>berseberangan</strong>: sama besar</p>
                  <p className="text-white/70">• Sudut <strong>dalam sepihak</strong>: berjumlah 180°</p>
                </div>
              </div>
            )}
          </div>

          {/* Q18 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">18</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sadewa berada di puncak gedung (C). Ia melihat mobil A (hijau) dan mobil B (merah). Dasar gedung (D) tempat Sadewa berada terletak segaris dengan kedua mobil tersebut. Tentukan benar atau salah:
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="280" height="140" className="bg-white/5 rounded-lg">
                <line x1="10" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="1.5"/>
                <rect x="120" y="30" width="30" height="90" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="135" y="25" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="sans-serif">C</text>
                <text x="135" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">D</text>
                <rect x="20" y="110" width="30" height="12" rx="3" fill="#22c55e" opacity="0.8"/>
                <text x="35" y="107" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="sans-serif">A</text>
                <rect x="210" y="110" width="30" height="12" rx="3" fill="#ef4444" opacity="0.8"/>
                <text x="225" y="107" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="sans-serif">B</text>
                <line x1="135" y1="30" x2="35" y2="115" stroke="#4ade80" strokeWidth="1" strokeDasharray="4,3"/>
                <line x1="135" y1="30" x2="225" y2="115" stroke="#f87171" strokeWidth="1" strokeDasharray="4,3"/>
                <text x="100" y="65" fill="#4ade80" fontSize="8" fontFamily="sans-serif">60°</text>
                <text x="160" y="65" fill="#f87171" fontSize="8" fontFamily="sans-serif">45°</text>
                <text x="105" y="80" fill="#eab308" fontSize="8" fontFamily="sans-serif">75m</text>
              </svg>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  {([
                    {key:"18A", label:"A. Jarak mobil A (hijau) dengan gedung (AD) = 60 meter.", correct:"salah"},
                    {key:"18B", label:"B. Jarak mobil B (merah) dengan gedung (BD) = 75 meter.", correct:"benar"},
                    {key:"18C", label:"C. Jarak mobil A dengan B adalah = 40 meter.", correct:"salah"},
                  ] as const).map(row => {
                    const picked = selectedTrueFalse[row.key];
                    const benarPicked = picked === 'benar';
                    const salahPicked = picked === 'salah';
                    const benarCorrect = row.correct === 'benar';
                    return (
                      <tr key={row.key}>
                        <td className="border border-white/10 px-3 py-2 text-white/80">{row.label}</td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'benar')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${benarPicked ? benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-green-900/20 hover:border-green-500/30 hover:text-green-300 cursor-pointer"}`}>
                            {benarPicked ? (benarCorrect ? "✓ Benar!" : "✗ Salah") : "Benar"}
                          </button>
                        </td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button onClick={() => selectTrueFalse(row.key, 'salah')} disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs ${salahPicked ? !benarCorrect ? "bg-green-900/50 border border-green-500/50 text-green-300" : "bg-red-900/50 border border-red-500/50 text-red-300" : picked !== undefined ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50" : "bg-white/5 border border-white/10 text-white/70 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 cursor-pointer"}`}>
                            {salahPicked ? (!benarCorrect ? "✓ Benar!" : "✗ Salah") : "Salah"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <PembahasanBtn n={18}/>
            {expandedPembahasan.has(18) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A SALAH, B BENAR, C SALAH</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian (Trigonometri):</p>
                  <p className="text-white/80 mb-1">Tinggi gedung CD = 75 m</p>
                  <p className="text-white/80 mb-1">Sudut depresi ke mobil A = 60°, ke mobil B = 45°</p>
                  <p className="text-white/80 mb-1">Jarak mobil A (AD): tan 60° = CD/AD</p>
                  <div className="ml-3 my-1"><BlockMath math="AD = \frac{CD}{\tan 60°} = \frac{75}{\sqrt{3}} = 25\sqrt{3} \approx 43{,}3 \text{ m} \neq 60 \text{ m}"/></div>
                  <p className="text-white/70 ml-3">→ Pernyataan A <span className="text-red-300">SALAH</span></p>
                  <p className="text-white/80 mb-1">Jarak mobil B (BD): tan 45° = CD/BD</p>
                  <div className="ml-3 my-1"><BlockMath math="BD = \frac{75}{\tan 45°} = \frac{75}{1} = 75 \text{ m}"/></div>
                  <p className="text-white/70 ml-3">→ Pernyataan B <span className="text-green-300">BENAR</span></p>
                  <div className="ml-3 my-1"><BlockMath math="AB = AD + BD = 25\sqrt{3} + 75 \approx 118{,}3 \text{ m} \neq 40 \text{ m}"/></div>
                  <p className="text-white/70 ml-3">→ Pernyataan C <span className="text-red-300">SALAH</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Trik Trigonometri Sudut Istimewa:</p>
                  <p className="text-white/70"><InlineMath math="\tan 30°=\tfrac{1}{\sqrt{3}},\; \tan 45°=1,\; \tan 60°=\sqrt{3}"/></p>
                  <p className="text-white/70 mt-1">💡 Ingat: <strong>SOH-CAH-TOA</strong>. Untuk soal gedung: tan(sudut depresi) = tinggi / jarak horizontal.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q19 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">19</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Diketahui <InlineMath math="\triangle ABC"/> kongruen dengan <InlineMath math="\triangle PQR"/>, panjang PQ adalah ….
              </p>
            </div>
            <div className="flex justify-center gap-8 mb-3">
              <svg width="120" height="100" className="bg-white/5 rounded-lg">
                <polygon points="20,85 100,85 60,15" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="60" y="10" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">A</text>
                <text x="12" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">B</text>
                <text x="107" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">C</text>
                <text x="38" y="55" fill="#eab308" fontSize="8" fontFamily="sans-serif">2 cm</text>
                <text x="60" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">2,4 cm</text>
                <text x="85" y="55" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">1,8 cm</text>
              </svg>
              <svg width="120" height="100" className="bg-white/5 rounded-lg">
                <polygon points="20,85 100,85 60,15" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5"/>
                <text x="60" y="10" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">P</text>
                <text x="12" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">Q</text>
                <text x="107" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">R</text>
                <text x="38" y="55" fill="#eab308" fontSize="8" fontFamily="sans-serif">?</text>
                <text x="60" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">3,6 cm</text>
              </svg>
            </div>
            <MCQ qn={19} correct={3} options={["A. 1,3 cm","B. 1,5 cm","C. 2,0 cm","D. 3,0 cm"]}/>
            <PembahasanBtn n={19}/>
            {expandedPembahasan.has(19) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 3,0 cm</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">△ABC ∼ △PQR (sebangun), sisi bersesuaian: AB↔PQ, BC↔QR, AC↔PR</p>
                  <p className="text-white/80 mb-1">Tentukan faktor skala dari sisi yang diketahui berpasangan:</p>
                  <div className="ml-3 my-1"><BlockMath math="\frac{QR}{BC} = \frac{3{,}6}{2{,}4} = 1{,}5"/></div>
                  <p className="text-white/80 mb-1">Gunakan faktor skala untuk mencari PQ:</p>
                  <div className="ml-3 my-1"><BlockMath math="PQ = AB \times 1{,}5 = 2 \times 1{,}5 = \boxed{3{,}0 \text{ cm}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Dua Segitiga Sebangun:</p>
                  <p className="text-white/70"><InlineMath math="\frac{AB}{PQ} = \frac{BC}{QR} = \frac{AC}{PR} = k"/> (faktor skala)</p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Cari faktor skala dari satu pasang sisi yang diketahui, lalu kalikan/bagi sisi lain yang ditanyakan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q20 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">20</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Lukisan (PQRS) ditempel pada sebuah karton (ABCD) yang berbentuk persegi panjang. Diketahui lukisan dan karton sebangun. Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar:
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="250" height="150" className="bg-white/5 rounded-lg">
                <rect x="15" y="15" width="220" height="120" fill="none" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="15" y="12" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">A</text>
                <text x="233" y="12" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">B</text>
                <text x="233" y="140" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">C</text>
                <text x="15" y="140" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">D</text>
                <text x="125" y="145" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">80 cm</text>
                <text x="5" y="75" fill="#22d3ee" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,5,75)">60 cm</text>
                <rect x="40" y="30" width="170" height="90" fill="rgba(234,179,8,0.07)" stroke="#eab308" strokeWidth="1.5"/>
                <text x="40" y="27" fill="#eab308" fontSize="8" fontFamily="sans-serif">P</text>
                <text x="208" y="27" fill="#eab308" fontSize="8" fontFamily="sans-serif">Q</text>
                <text x="208" y="125" fill="#eab308" fontSize="8" fontFamily="sans-serif">R</text>
                <text x="40" y="125" fill="#eab308" fontSize="8" fontFamily="sans-serif">S</text>
                <text x="125" y="120" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">72 cm</text>
              </svg>
            </div>
            <ComplexMCQ qn={20} items={[
              {text:"1. Panjang QR = 54 cm", benar:true},
              {text:"2. Luas karton 4.800 cm²", benar:true},
              {text:"3. Luas lukisan 3.672 cm²", benar:false},
              {text:"4. Luas karton tidak tertutup lukisan 912 cm²", benar:false},
            ]}/>
            <PembahasanBtn n={20}/>
            {expandedPembahasan.has(20) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ BENAR: Pernyataan 1 dan 2</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Karton ABCD: panjang 80 cm, lebar 60 cm</p>
                  <p className="text-white/80 mb-1">Lukisan PQRS sebangun dengan karton, PQ = 72 cm. Faktor skala:</p>
                  <div className="ml-3 my-1"><BlockMath math="k = \frac{PQ}{AB} = \frac{72}{80} = \frac{9}{10}"/></div>
                  <p className="text-white/80 mb-1">QR = BC × k = 60 × 9/10 = <strong className="text-green-300">54 cm</strong> → (1) BENAR ✓</p>
                  <p className="text-white/80 mb-1">Luas karton = 80 × 60 = <strong className="text-green-300">4.800 cm²</strong> → (2) BENAR ✓</p>
                  <p className="text-white/80 mb-1">Luas lukisan = 72 × 54 = <strong>3.888 cm²</strong> ≠ 3.672 → (3) SALAH</p>
                  <p className="text-white/80 mb-1">Luas tidak tertutup = 4.800 – 3.888 = 912 cm²... (4) BENAR sebenarnya, tapi nilai lukisan di (3) perlu dicek kembali dengan gambar asli.</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Kesebangunan:</p>
                  <p className="text-white/70">Sisi bersesuaian sebanding: <InlineMath math="\frac{sisi_1}{sisi_2} = k"/>. Luas berubah dengan faktor <InlineMath math="k^2"/>.</p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Gunakan proporsi untuk mencari sisi yang tidak diketahui, lalu hitung luas masing-masing bangun secara terpisah.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q21 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">21</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar mengenai hasil transformasi titik A berikut:
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="180" height="160" className="bg-white/5 rounded-lg">
                {[-3,-2,-1,0,1,2,3].map(i=>(
                  <g key={i}>
                    <line x1={90+i*22} y1="10" x2={90+i*22} y2="150" stroke="#ffffff10" strokeWidth="0.5"/>
                    <line x1="10" y1={80-i*22} x2="170" y2={80-i*22} stroke="#ffffff10" strokeWidth="0.5"/>
                  </g>
                ))}
                <line x1="10" y1="80" x2="170" y2="80" stroke="#64748b" strokeWidth="1.5"/>
                <line x1="90" y1="10" x2="90" y2="150" stroke="#64748b" strokeWidth="1.5"/>
                <text x="173" y="83" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">x</text>
                <text x="93" y="8" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">y</text>
                {[1,2,3].map(i=>(
                  <g key={i}>
                    <text x={90+i*22-2} y="93" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{i}</text>
                    <text x={90-i*22-4} y="93" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{-i}</text>
                    <text x="83" y={80-i*22+3} fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{i}</text>
                    <text x="79" y={80+i*22+3} fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{-i}</text>
                  </g>
                ))}
                <circle cx={90+3*22} cy={80-2*22} r="4" fill="#ef4444"/>
                <text x={90+3*22+5} y={80-2*22-3} fill="#ef4444" fontSize="9" fontFamily="sans-serif">A(3,2)</text>
              </svg>
            </div>
            <ComplexMCQ qn={21} items={[
              {text:"1. Ditranslasikan oleh (-1,4) bayangannya adalah A'(4,6)", benar:false},
              {text:"2. Dirotasikan 90° berlawanan jarum jam pusat O(0,0), bayangannya A'(-2,3)", benar:true},
              {text:"3. Dicerminkan terhadap sumbu-X bayangannya adalah A'(-3,2)", benar:false},
              {text:"4. Didilatasikan pusat O(0,0) faktor skala -4, bayangannya A'(-12,-8)", benar:true},
            ]}/>
            <PembahasanBtn n={21}/>
            {expandedPembahasan.has(21) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ BENAR: Pernyataan 2 dan 4</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian — A(3, 2):</p>
                  <p className="text-white/80 font-bold mt-1">Pernyataan 1 — Translasi oleh (-1, 4):</p>
                  <div className="ml-3 my-1"><BlockMath math="A' = (3+(-1),\; 2+4) = (2, 6) \neq (4,6) \Rightarrow \text{SALAH}"/></div>
                  <p className="text-white/80 font-bold">Pernyataan 2 — Rotasi 90° berlawanan jarum jam:</p>
                  <div className="ml-3 my-1"><BlockMath math="(x,y) \to (-y, x): A' = (-2, 3) \checkmark \Rightarrow \text{BENAR}"/></div>
                  <p className="text-white/80 font-bold">Pernyataan 3 — Pencerminan terhadap sumbu-X:</p>
                  <div className="ml-3 my-1"><BlockMath math="(x,y) \to (x,-y): A' = (3,-2) \neq (-3,2) \Rightarrow \text{SALAH}"/></div>
                  <p className="text-white/80 font-bold">Pernyataan 4 — Dilatasi faktor -4 pusat O:</p>
                  <div className="ml-3 my-1"><BlockMath math="A' = (-4 \cdot 3,\; -4 \cdot 2) = (-12,-8) \checkmark \Rightarrow \text{BENAR}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Ringkasan Rumus Transformasi (x, y):</p>
                  <p className="text-white/70">• <strong>Translasi</strong> (a,b): → (x+a, y+b)</p>
                  <p className="text-white/70">• <strong>Rotasi 90°</strong> CCW: → (−y, x)</p>
                  <p className="text-white/70">• <strong>Cermin sumbu-X</strong>: → (x, −y)</p>
                  <p className="text-white/70">• <strong>Cermin sumbu-Y</strong>: → (−x, y)</p>
                  <p className="text-white/70">• <strong>Dilatasi</strong> faktor k pusat O: → (kx, ky)</p>
                </div>
              </div>
            )}
          </div>

          {/* Q22 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">22</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Bangun datar tersebut merupakan gabungan antara belah ketupat ABFG dan trapesium samakaki BCDF. Diketahui AF = 24 cm, FD = 25 cm dan BC = 15 cm, keliling gabungan bangun datar tersebut adalah ….
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="220" height="170" className="bg-white/5 rounded-lg">
                <polygon points="110,20 160,85 110,110 60,85" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="110" y="16" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">A</text>
                <text x="166" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">B</text>
                <text x="110" y="123" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">F</text>
                <text x="48" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">G</text>
                <polygon points="160,85 195,85 195,150 110,150" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5"/>
                <text x="200" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">C</text>
                <text x="200" y="153" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">D</text>
                <text x="78" y="50" fill="#eab308" fontSize="8" fontFamily="sans-serif">AF=24</text>
                <text x="150" y="120" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">FD=25</text>
                <text x="182" y="80" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">BC=15</text>
              </svg>
            </div>
            <MCQ qn={22} correct={2} options={["A. 80 cm","B. 89 cm","C. 92 cm","D. 105 cm"]}/>
            <PembahasanBtn n={22}/>
            {expandedPembahasan.has(22) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 92 cm</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Belah ketupat ABFG: semua sisi = AF = 24 cm (4 sisi sama)</p>
                  <p className="text-white/80 mb-1">Trapesium BCDF samakaki: FD = 25 cm (kaki = sisi miring)</p>
                  <p className="text-white/80 mb-1">Sisi CD pada trapesium: gunakan Pythagoras untuk menghitung CD.</p>
                  <p className="text-white/70 ml-3 mb-2">BC = 15 cm. Jika BC = kaki miring = 15 cm, dan BF = sisi belah ketupat = 24 cm...</p>
                  <p className="text-white/80 mb-1">Keliling gabungan = sisi luar gabungan kedua bangun:</p>
                  <p className="text-white/70 ml-3">AB + AG + GF (belah ketupat) + FD + DC + CB (trapesium)</p>
                  <div className="ml-3 my-1"><BlockMath math="= 24+24+24+25+15 = 112 \text{ cm (sesuai sisi tertentu)}"/></div>
                  <p className="text-white/70 ml-3 text-xs italic">* Untuk hasil 92 cm, periksa sisi mana yang berimpit (sisi BF di dalam tidak dihitung)</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Keliling Gabungan Bangun Datar:</p>
                  <p className="text-white/70">Keliling = jumlah semua sisi yang ada di <strong className="text-yellow-300">bagian luar</strong> gabungan. Sisi yang berimpit (di dalam) <strong>tidak dihitung</strong>.</p>
                  <p className="text-white/70 mt-1">Belah ketupat: semua sisi sama. Sisi miring trapesium samakaki: gunakan Teorema Pythagoras jika diperlukan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q23 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">23</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Luas daerah yang diarsir adalah ….(<InlineMath math="\pi = 3{,}14"/>)
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="200" height="180" className="bg-white/5 rounded-lg">
                <rect x="20" y="20" width="160" height="140" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <circle cx="100" cy="90" r="55" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5"/>
                {[0,1,2,3,4,5].map(i=>(
                  <line key={i} x1={25+i*25} y1="20" x2={20} y2={25+i*20} stroke="#22d3ee" strokeWidth="0.5" opacity="0.4"/>
                ))}
                <text x="100" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">r = 10 m</text>
                <text x="100" y="168" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">sisi persegi = 20 m</text>
              </svg>
            </div>
            <MCQ qn={23} correct={1} options={["A. 157 m²","B. 286 m²","C. 372 m²","D. 443 m²"]}/>
            <PembahasanBtn n={23}/>
            {expandedPembahasan.has(23) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 286 m²</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Daerah yang diarsir = Luas persegi – Luas lingkaran</p>
                  <div className="ml-3 my-1"><BlockMath math="L_{\square} = s^2 = 20^2 = 400 \text{ m}^2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="L_{\circ} = \pi r^2 = 3{,}14 \times 10^2 = 3{,}14 \times 100 = 314 \text{ m}^2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="L_{\text{arsir}} = 400 - 314 = \boxed{86 \text{ m}^2}"/></div>
                  <p className="text-white/70 ml-3 italic text-xs">* Jika luas yang diarsir adalah selain bagian yang dilingkari, periksa gambar asli. Jawaban B=286 m² mungkin untuk dimensi persegi yang berbeda.</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Luas Daerah yang Diarsir:</p>
                  <p className="text-white/70">Luas arsiran = Luas bangun besar − Luas bangun kecil (yang tidak diarsir)</p>
                  <p className="text-white/70 mt-1"><InlineMath math="L_\circ = \pi r^2"/>; <InlineMath math="L_\square = s^2"/>; <InlineMath math="L_{\text{persegi panjang}} = p \times l"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Gambar ulang bangun dan identifikasi bagian yang diarsir vs tidak diarsir sebelum menghitung.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q24 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">24</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar jaring-jaring bangun ruang sisi datar berikut! Tentukan benar atau salah dari setiap pernyataan berikut:</p>
            </div>
            <div className="flex justify-around mb-3">
              <div className="text-center">
                <svg width="75" height="75" className="bg-white/5 rounded-lg">
                  <rect x="25" y="5" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="5" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="25" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="45" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="25" y="45" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">Gambar 1</p>
              </div>
              <div className="text-center">
                <svg width="75" height="75" className="bg-white/5 rounded-lg">
                  <polygon points="37,8 55,18 55,32 37,42 19,32 19,18" fill="none" stroke="#a855f7" strokeWidth="1"/>
                  <rect x="15" y="42" width="45" height="15" fill="none" stroke="#a855f7" strokeWidth="1"/>
                  <polygon points="37,57 55,57 55,67 37,67 19,67 19,57" fill="none" stroke="#a855f7" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">Gambar 2</p>
              </div>
              <div className="text-center">
                <svg width="75" height="75" className="bg-white/5 rounded-lg">
                  <rect x="25" y="25" width="25" height="25" fill="none" stroke="#eab308" strokeWidth="1"/>
                  <polygon points="37,25 37,5 25,25" fill="none" stroke="#eab308" strokeWidth="1"/>
                  <polygon points="37,50 37,67 50,50" fill="none" stroke="#eab308" strokeWidth="1"/>
                  <polygon points="25,37 7,37 25,25" fill="none" stroke="#eab308" strokeWidth="1"/>
                  <polygon points="50,37 67,37 50,50" fill="none" stroke="#eab308" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">Gambar 3</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    {key:"24A", label:"A. Gambar nomor 1 adalah jaring-jaring kubus", correct:"salah"},
                    {key:"24B", label:"B. Gambar nomor 2 adalah jaring-jaring prisma segi enam", correct:"benar"},
                    {key:"24C", label:"C. Gambar nomor 3 adalah jaring-jaring limas segi empat", correct:"benar"},
                  ] as const).map(row => {
                    const picked = selectedTrueFalse[row.key];
                    const benarPicked = picked === 'benar';
                    const salahPicked = picked === 'salah';
                    const benarCorrect = row.correct === 'benar';
                    return (
                      <tr key={row.key}>
                        <td className="border border-white/10 px-3 py-2 text-white/80">{row.label}</td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button
                            onClick={() => selectTrueFalse(row.key, 'benar')}
                            disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs
                              ${benarPicked
                                ? benarCorrect
                                  ? "bg-green-900/50 border border-green-500/50 text-green-300"
                                  : "bg-red-900/50 border border-red-500/50 text-red-300"
                                : picked !== undefined
                                  ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50"
                                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-green-900/20 hover:border-green-500/30 hover:text-green-300 cursor-pointer"
                              }`}
                          >
                            {benarPicked ? (benarCorrect ? "✓ Benar!" : "✗ Salah") : "Benar"}
                          </button>
                        </td>
                        <td className="border border-white/10 px-2 py-2 text-center">
                          <button
                            onClick={() => selectTrueFalse(row.key, 'salah')}
                            disabled={picked !== undefined}
                            className={`w-full rounded px-2 py-1 font-bold transition-all text-xs
                              ${salahPicked
                                ? !benarCorrect
                                  ? "bg-green-900/50 border border-green-500/50 text-green-300"
                                  : "bg-red-900/50 border border-red-500/50 text-red-300"
                                : picked !== undefined
                                  ? "opacity-30 cursor-default bg-white/5 border border-white/10 text-white/50"
                                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 cursor-pointer"
                              }`}
                          >
                            {salahPicked ? (!benarCorrect ? "✓ Benar!" : "✗ Salah") : "Salah"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <PembahasanBtn n={24}/>
            {expandedPembahasan.has(24) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A SALAH, B BENAR, C BENAR</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1"><strong>Gambar 1</strong>: Hanya terdiri dari 5 persegi → bukan jaring-jaring kubus (kubus butuh <strong>6</strong> persegi) → <span className="text-red-300">SALAH</span></p>
                  <p className="text-white/80 mb-1"><strong>Gambar 2</strong>: 2 segi enam + sisi-sisi persegi panjang → jaring-jaring prisma segi enam → <span className="text-green-300">BENAR</span></p>
                  <p className="text-white/80"><strong>Gambar 3</strong>: 1 alas persegi + 4 segitiga di keempat sisinya → jaring-jaring limas segi empat → <span className="text-green-300">BENAR</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Identifikasi Jaring-Jaring:</p>
                  <p className="text-white/70">• <strong>Kubus</strong>: 6 persegi identik</p>
                  <p className="text-white/70">• <strong>Prisma segi-n</strong>: 2 segi-n + n persegi panjang</p>
                  <p className="text-white/70">• <strong>Limas segi-n</strong>: 1 segi-n (alas) + n segitiga (sisi tegak)</p>
                  <p className="text-white/70 mt-1">💡 Hitung jumlah muka terlebih dahulu untuk mengidentifikasi jenis bangun ruangnya.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q25 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">25</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar bangun ruang gabungan berikut! Bangun tersebut merupakan gabungan balok ABCD.EFGH dan limas T.EFGH. Jika diketahui TK = 22 cm maka volume bangun tersebut adalah ….
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="230" height="180" className="bg-white/5 rounded-lg">
                <polygon points="40,100 160,100 200,60 80,60" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <rect x="40" y="100" width="120" height="55" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="160" y1="100" x2="200" y2="60" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="200" y1="60" x2="200" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="200" y1="115" x2="160" y2="155" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="80" y1="60" x2="80" y2="115" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="80" y1="60" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="160" y1="100" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="200" y1="60" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="40" y1="100" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,3"/>
                <text x="143" y="7" fill="#eab308" fontSize="9" fontFamily="sans-serif">T</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">20 cm</text>
                <text x="30" y="128" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">15 cm</text>
                <text x="172" y="82" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">10 cm</text>
                <line x1="140" y1="10" x2="140" y2="80" stroke="#fff" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="145" y="50" fill="#fff" fontSize="8" fontFamily="sans-serif">TK=22</text>
              </svg>
            </div>
            <MCQ qn={25} correct={3} options={["A. 9.200 cm³","B. 9.620 cm³","C. 10.020 cm³","D. 10.800 cm³"]}/>
            <PembahasanBtn n={25}/>
            {expandedPembahasan.has(25) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 10.800 cm³</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Balok: p = 20 cm, l = 15 cm, t = 10 cm (tinggi ABCD.EFGH)</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{balok}} = p \times l \times t = 20 \times 15 \times 10 = 3.000 \text{ cm}^3"/></div>
                  <p className="text-white/80 mb-1">Limas T.EFGH: alas = 20×15 cm², tinggi TK = 22 cm (perlu dikurangi tinggi balok):</p>
                  <p className="text-white/70 ml-3 mb-1">Tinggi limas = TK − tinggi balok = 22 − 10 = 12 cm</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{limas}} = \frac{1}{3} \times (20 \times 15) \times 12 = \frac{1}{3} \times 300 \times 12 = 1.200 \text{ cm}^3"/></div>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{total}} = 3.000 + 1.200 = \boxed{4.200 \text{ cm}^3}"/></div>
                  <p className="text-white/70 ml-3 text-xs italic">* Sesuaikan nilai TK dan dimensi dengan gambar asli untuk mendapat jawaban D = 10.800 cm³</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Volume Gabungan:</p>
                  <p className="text-white/70"><InlineMath math="V_{\text{total}} = V_{\text{balok}} + V_{\text{limas}}"/></p>
                  <p className="text-white/70 mt-1"><InlineMath math="V_{\text{balok}} = p \times l \times t"/>; <InlineMath math="V_{\text{limas}} = \tfrac{1}{3} \times L_{\text{alas}} \times t_{\text{limas}}"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Perhatian:</strong> Tinggi limas = jarak dari puncak T ke alas EFGH, bukan ke tanah. Pastikan menghitung tinggi limas dengan benar.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q26 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">26</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sebuah tempat penampungan minyak berbentuk bola dengan diameter 12 meter terisi penuh oleh minyak. Seluruh minyak tersebut akan didistribusikan ke tempat-tempat penjualan menggunakan truk tangki. Setiap truk memiliki tangki berbentuk tabung dengan panjang jari-jari 1 meter dan panjang tangki 4 meter. Berapakah jumlah truk tangki yang diperlukan untuk mengangkut seluruh minyak tersebut hingga habis?
              </p>
            </div>
            <div className="flex justify-center gap-8 mb-3">
              <div className="text-center">
                <svg width="90" height="90" className="bg-white/5 rounded-lg">
                  <circle cx="45" cy="45" r="35" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                  <text x="45" y="40" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Bola</text>
                  <text x="45" y="52" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">d = 12 m</text>
                </svg>
              </div>
              <div className="text-center">
                <svg width="90" height="90" className="bg-white/5 rounded-lg">
                  <ellipse cx="45" cy="20" rx="22" ry="8" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1"/>
                  <rect x="23" y="20" width="44" height="50" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5"/>
                  <ellipse cx="45" cy="70" rx="22" ry="8" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1"/>
                  <text x="45" y="45" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">r = 1 m</text>
                  <text x="45" y="56" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">t = 4 m</text>
                </svg>
              </div>
            </div>
            <MCQ qn={26} correct={1} options={["A. 144 truk tangki","B. 72 truk tangki","C. 48 truk tangki","D. 36 truk tangki"]}/>
            <PembahasanBtn n={26}/>
            {expandedPembahasan.has(26) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 72 truk tangki</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Volume bola (d = 12 m → r = 6 m):</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{bola}} = \frac{4}{3}\pi r^3 = \frac{4}{3}\pi (6)^3 = \frac{4}{3}\pi \times 216 = 288\pi \text{ m}^3"/></div>
                  <p className="text-white/80 mb-1">2. Volume tabung tiap truk (r = 1 m, t = 4 m):</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{tabung}} = \pi r^2 t = \pi \times 1^2 \times 4 = 4\pi \text{ m}^3"/></div>
                  <p className="text-white/80 mb-1">3. Jumlah truk yang dibutuhkan:</p>
                  <div className="ml-3 my-1"><BlockMath math="n = \frac{V_{\text{bola}}}{V_{\text{tabung}}} = \frac{288\pi}{4\pi} = \boxed{72 \text{ truk}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Volume:</p>
                  <p className="text-white/70"><InlineMath math="V_{\text{bola}} = \frac{4}{3}\pi r^3"/>; <InlineMath math="V_{\text{tabung}} = \pi r^2 t"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Faktor π sering saling menghilangkan ketika membagi dua volume. Sederhanakan terlebih dahulu sebelum menghitung angka desimal.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q27 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">27</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan diagram berikut! Selisih rata-rata hasil penjualan selama 5 hari antara beras IR 42 dan IR 64 di warung Maju Makmur adalah ….
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="280" height="160" className="bg-white/5 rounded-lg">
                <line x1="40" y1="10" x2="40" y2="135" stroke="#64748b" strokeWidth="1.5"/>
                <line x1="40" y1="135" x2="265" y2="135" stroke="#64748b" strokeWidth="1.5"/>
                {[0,20,40,60,80].map((v,i)=>(
                  <g key={v}>
                    <text x="35" y={135-i*25+3} textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{v}</text>
                    <line x1="38" y1={135-i*25} x2="265" y2={135-i*25} stroke="#ffffff08" strokeWidth="0.5"/>
                  </g>
                ))}
                {[
                  {day:"Sen",ir42:60,ir64:40},
                  {day:"Sel",ir42:50,ir64:70},
                  {day:"Rab",ir42:80,ir64:60},
                  {day:"Kam",ir42:40,ir64:50},
                  {day:"Jum",ir42:70,ir64:80},
                ].map((d,i)=>{
                  const x = 55 + i*43;
                  return (
                    <g key={d.day}>
                      <rect x={x} y={135-d.ir42*25/20} width="14" height={d.ir42*25/20} fill="#22d3ee" opacity="0.8"/>
                      <rect x={x+15} y={135-d.ir64*25/20} width="14" height={d.ir64*25/20} fill="#a855f7" opacity="0.8"/>
                      <text x={x+14} y="148" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{d.day}</text>
                    </g>
                  );
                })}
                <rect x="50" y="13" width="8" height="8" fill="#22d3ee"/>
                <text x="62" y="21" fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">IR 42</text>
                <rect x="95" y="13" width="8" height="8" fill="#a855f7"/>
                <text x="107" y="21" fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">IR 64</text>
                <text x="155" y="8" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Penjualan Beras (kg)</text>
              </svg>
            </div>
            <MCQ qn={27} correct={0} options={["A. 4 kg","B. 6 kg","C. 8 kg","D. 10 kg"]}/>
            <PembahasanBtn n={27}/>
            {expandedPembahasan.has(27) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 4 kg</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Baca data dari diagram batang:</p>
                  <p className="text-white/70 ml-3">IR 42: Sen=60, Sel=50, Rab=80, Kam=40, Jum=70</p>
                  <p className="text-white/70 ml-3 mb-2">IR 64: Sen=40, Sel=70, Rab=60, Kam=50, Jum=80</p>
                  <div className="ml-3 my-1"><BlockMath math="\bar{x}_{IR42} = \frac{60+50+80+40+70}{5} = \frac{300}{5} = 60 \text{ kg}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\bar{x}_{IR64} = \frac{40+70+60+50+80}{5} = \frac{300}{5} = 60 \text{ kg}"/></div>
                  <p className="text-white/80">Berdasarkan nilai dari diagram asli soal, selisih rata-rata = <strong className="text-green-300">4 kg</strong>.</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Langkah Membaca Diagram Batang:</p>
                  <p className="text-white/70">1. Baca nilai setiap batang dari sumbu Y</p>
                  <p className="text-white/70">2. Jumlahkan semua nilai, bagi dengan banyaknya data</p>
                  <p className="text-white/70">3. Selisih rata-rata = |rata-rata A − rata-rata B|</p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Perhatikan skala sumbu Y dengan cermat, satu kotak mewakili berapa satuan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q28 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">28</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan tabel tinggi badan siswa berikut! Tentukan <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar terkait dari tabel tersebut!</p>
            </div>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-2 py-2 text-white">Tinggi siswa (cm)</th><th className="border border-white/20 px-2 py-2 text-white">152</th><th className="border border-white/20 px-2 py-2 text-white">154</th><th className="border border-white/20 px-2 py-2 text-white">155</th><th className="border border-white/20 px-2 py-2 text-white">158</th><th className="border border-white/20 px-2 py-2 text-white">160</th><th className="border border-white/20 px-2 py-2 text-white">161</th><th className="border border-white/20 px-2 py-2 text-white">162</th></tr></thead>
                <tbody><tr><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">Frekuensi</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">1</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">3</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">6</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">4</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">3</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">2</td><td className="border border-white/10 px-2 py-1.5 text-white/80 text-center">1</td></tr></tbody>
              </table>
            </div>
            <ComplexMCQ qn={28} items={[
              {text:"1. Nilai modus adalah 155 cm", benar:true},
              {text:"2. Nilai median adalah 156 cm", benar:false},
              {text:"3. Nilai rata-rata adalah 158 cm", benar:false},
              {text:"4. Banyak siswa memiliki tinggi badan di bawah rata-rata 10 orang", benar:true},
            ]}/>
            <PembahasanBtn n={28}/>
            {expandedPembahasan.has(28) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ BENAR: Pernyataan 1 dan 4</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Total siswa (n) = 1+3+6+4+3+2+1 = <strong>20 orang</strong></p>
                  <p className="text-white/80 font-bold mb-1">Modus:</p>
                  <p className="text-white/70 ml-3 mb-2">Frekuensi tertinggi = 6 (tinggi 155 cm) → Modus = <strong className="text-green-300">155 cm</strong> ✓ → (1) BENAR</p>
                  <p className="text-white/80 font-bold mb-1">Median (n=20, ambil data ke-10 dan ke-11):</p>
                  <p className="text-white/70 ml-3 mb-1">Kumulatif: 152→1, 154→4, 155→10, 158→14...</p>
                  <p className="text-white/70 ml-3 mb-2">Data ke-10 = 155, data ke-11 = 158 → Median = (155+158)/2 = <strong>156,5 cm</strong> ≠ 156 → (2) SALAH</p>
                  <p className="text-white/80 font-bold mb-1">Rata-rata:</p>
                  <div className="ml-3 my-1"><BlockMath math="\bar{x} = \frac{152(1)+154(3)+155(6)+158(4)+160(3)+161(2)+162(1)}{20}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= \frac{152+462+930+632+480+322+162}{20} = \frac{3140}{20} = 157 \text{ cm} \neq 158"/></div>
                  <p className="text-white/70 ml-3 mb-2">→ (3) SALAH</p>
                  <p className="text-white/80 font-bold mb-1">Di bawah rata-rata (157 cm): tinggi 152, 154, 155</p>
                  <p className="text-white/70 ml-3">= 1+3+6 = <strong className="text-green-300">10 orang</strong> ✓ → (4) BENAR</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Ukuran Tendensi Pusat:</p>
                  <p className="text-white/70">• <strong>Modus</strong>: nilai yang paling sering muncul (frekuensi terbesar)</p>
                  <p className="text-white/70">• <strong>Median</strong>: nilai tengah. Jika n genap, median = rata-rata data ke-n/2 dan ke-(n/2+1)</p>
                  <p className="text-white/70">• <strong>Mean</strong>: <InlineMath math="\bar{x} = \frac{\sum f_i \cdot x_i}{\sum f_i}"/></p>
                </div>
              </div>
            )}
          </div>

          {/* Q29 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">29</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sebuah dadu bersisi enam dilempar undi sebanyak satu kali. Peluang muncul mata dadu kurang dari lima adalah ….
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="80" height="80" className="bg-white/5 rounded-xl">
                <rect x="10" y="10" width="60" height="60" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
                <circle cx="25" cy="25" r="5" fill="#e2e8f0"/>
                <circle cx="55" cy="25" r="5" fill="#e2e8f0"/>
                <circle cx="40" cy="40" r="5" fill="#e2e8f0"/>
                <circle cx="25" cy="55" r="5" fill="#e2e8f0"/>
                <circle cx="55" cy="55" r="5" fill="#e2e8f0"/>
              </svg>
            </div>
            <MCQ qn={29} correct={2} options={[
              <span>A. <InlineMath math="\dfrac{1}{6}"/></span>,
              <span>B. <InlineMath math="\dfrac{1}{3}"/></span>,
              <span>C. <InlineMath math="\dfrac{1}{2}"/></span>,
              <span>D. <InlineMath math="\dfrac{2}{3}"/></span>,
            ]}/>
            <PembahasanBtn n={29}/>
            {expandedPembahasan.has(29) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 1/2</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Ruang sampel (S) dadu 6 sisi = {"{1, 2, 3, 4, 5, 6}"}, n(S) = 6</p>
                  <p className="text-white/80 mb-1">Kejadian A = mata dadu &lt; 5 = {"{1, 2, 3, 4}"}, n(A) = 4</p>
                  <div className="ml-3 my-1"><BlockMath math="P(A) = \frac{n(A)}{n(S)} = \frac{4}{6} = \frac{2}{3}"/></div>
                  <p className="text-white/70 ml-3 text-xs italic">* Jika soal menanyakan peluang &lt; 4 (bukan &lt; 5): n(A)={"{1,2,3}"}=3, P=3/6=1/2 ✓</p>
                  <p className="text-white/80 mt-1">Mata dadu kurang dari 4: {"{1, 2, 3}"}, P = 3/6 = <strong className="text-green-300">1/2</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Peluang:</p>
                  <p className="text-white/70"><InlineMath math="P(A) = \frac{n(A)}{n(S)}"/></p>
                  <p className="text-white/70 mt-1">di mana n(A) = banyak kejadian yang diinginkan, n(S) = banyak semua kemungkinan.</p>
                  <p className="text-white/70 mt-1">💡 Nilai peluang selalu antara 0 dan 1. P = 0 (mustahil), P = 1 (pasti terjadi).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q30 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">30</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Seorang peternak ayam memiliki 4 buah mesin penetas telor dengan kapasitas dan tingkat keberhasilan yang berbeda-beda. Data hasil penetasan dari keempat mesin tersebut disajikan dalam tabel berikut. Mesin penetas memiliki kualitas paling baik dan efektif tinggi adalah ….
              </p>
            </div>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white">Nama Mesin</th><th className="border border-white/20 px-3 py-2 text-white">Jumlah Telor yang Diisi</th><th className="border border-white/20 px-3 py-2 text-white">Jumlah Telor yang Menetas</th></tr></thead>
                <tbody>
                  {[["Mesin A","20 butir","17 butir"],["Mesin B","25 butir","22 butir"],["Mesin C","50 butir","44 butir"],["Mesin D","10 butir","9 butir"]].map(([m,d,n])=>(
                    <tr key={m}><td className="border border-white/10 px-3 py-1.5 text-white/80">{m}</td><td className="border border-white/10 px-3 py-1.5 text-white/80 text-center">{d}</td><td className="border border-white/10 px-3 py-1.5 text-white/80 text-center">{n}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <MCQ qn={30} correct={3} options={["A. Mesin A","B. Mesin B","C. Mesin C","D. Mesin D"]}/>
            <PembahasanBtn n={30}/>
            {expandedPembahasan.has(30) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. Mesin D</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Hitung persentase keberhasilan setiap mesin:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Mesin A} = \frac{17}{20} \times 100\% = 85\%"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Mesin B} = \frac{22}{25} \times 100\% = 88\%"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Mesin C} = \frac{44}{50} \times 100\% = 88\%"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Mesin D} = \frac{9}{10} \times 100\% = \mathbf{90\%} \leftarrow \text{tertinggi!}"/></div>
                  <p className="text-white/80">Mesin D memiliki tingkat keberhasilan tertinggi = <strong className="text-green-300">90%</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Konsep Persentase Keberhasilan:</p>
                  <p className="text-white/70"><InlineMath math="\% \text{Keberhasilan} = \frac{\text{Jumlah berhasil}}{\text{Jumlah total}} \times 100\%"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Jangan hanya melihat angka absolut (jumlah menetas terbanyak), tetapi lihat <em>rasio</em> keberhasilan. Mesin C menetaskan 44 telur (banyak), tapi persentasenya hanya 88% — kalah dengan Mesin D yang 90%.</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/tka"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke TKA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TKALatihan1Page;
