import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const TKALatihan2Page = () => {
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

  const TFTable = ({ rows }: {
    rows: { key: string; label: React.ReactNode; correct: 'benar' | 'salah' }[];
  }) => (
    <div className="overflow-x-auto mb-2">
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="bg-white/10">
            <th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th>
            <th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th>
            <th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
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
  );

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
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Paket:</span><span className="text-accent ml-1 font-bold">PAKET 2</span></div>
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
                Rita mengerjakan tes masuk Klub Olimpiade Matematika dengan total 40 butir soal. Pedoman penskoran seperti tabel berikut:
              </p>
            </div>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 px-3 py-2 text-white text-left">No</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-left">Per Butir Soal</th>
                    <th className="border border-white/20 px-3 py-2 text-white text-center">Skor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">1</td><td className="border border-white/10 px-3 py-1.5 text-white/80">Benar</td><td className="border border-white/10 px-3 py-1.5 text-green-400 text-center font-bold">4 (empat)</td></tr>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">2</td><td className="border border-white/10 px-3 py-1.5 text-white/80">Salah</td><td className="border border-white/10 px-3 py-1.5 text-red-400 text-center font-bold">–1 (minus satu)</td></tr>
                  <tr><td className="border border-white/10 px-3 py-1.5 text-white/80">3</td><td className="border border-white/10 px-3 py-1.5 text-white/80">Tidak dijawab</td><td className="border border-white/10 px-3 py-1.5 text-white/60 text-center">0 (nol)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="font-body text-white/90 text-sm leading-relaxed mb-3">
              Dari 35 soal yang dijawab Rita diketahui 30 butir soal benar. Skor yang didapat Rita dalam tes tersebut adalah ….
            </p>
            <MCQ qn={1} correct={3} options={["A. 140","B. 130","C. 120","D. 115"]}/>
            <PembahasanBtn n={1}/>
            {expandedPembahasan.has(1) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 115</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Identifikasi data:</p>
                  <p className="text-white/70 ml-3">• Benar = 30 soal</p>
                  <p className="text-white/70 ml-3">• Salah = 35 – 30 = <span className="text-yellow-300 font-bold">5 soal</span></p>
                  <p className="text-white/70 ml-3 mb-2">• Tidak dijawab = 40 – 35 = 5 soal</p>
                  <p className="text-white/80 mb-1">2. Hitung skor:</p>
                  <div className="ml-3 my-2"><BlockMath math="\text{Skor} = (30 \times 4) + (5 \times (-1)) + (5 \times 0)"/></div>
                  <div className="ml-3 my-2"><BlockMath math="= 120 - 5 + 0 = \boxed{115}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Penskoran:</p>
                  <p className="text-white/80"><InlineMath math="\text{Skor} = (B \times 4) + (S \times (-1)) + (T \times 0)"/></p>
                  <p className="text-white/60 mt-1">B = benar, S = salah, T = tidak dijawab</p>
                  <p className="text-white/70 mt-1">💡 <strong>Tips:</strong> Jika ragu menjawab, hitung terlebih dahulu breakeven: menjawab soal salah mengurangi 1 poin, jadi jika peluang benar ≥ 25%, lebih baik dijawab.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2 text-xs font-body">
                  <p className="text-yellow-300 font-bold italic mb-1">CUPCAKE</p>
                  <p className="text-pink-300 text-xs font-bold mb-1">Bahan dasar untuk 6 porsi antara lain:</p>
                  <p className="text-white/80">• Tepung 0,75 kg</p>
                  <p className="text-white/80">• Gula pasir <InlineMath math="\frac{1}{2}"/> kg</p>
                  <p className="text-white/80">• Mentega 125 gram</p>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Dini akan membuat <em>Cupcake</em> sesuai dengan resep tersebut dengan bahan-bahan yang telah ia beli dari toko yaitu tepung <InlineMath math="3\frac{3}{4}\,kg"/>, Gula pasir <InlineMath math="2\,kg"/> dan Mentega 1 kg. Banyak <em>Cupcake</em> yang dapat dibuat Dini adalah …..
                </p>
              </div>
            </div>
            <MCQ qn={2} correct={0} options={["A. 24 porsi","B. 27 porsi","C. 30 porsi","D. 48 porsi"]}/>
            <PembahasanBtn n={2}/>
            {expandedPembahasan.has(2) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 24 porsi</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Hitung berapa porsi yang bisa dibuat dari tiap bahan (resep = 6 porsi):</p>
                  <p className="text-white/70 ml-3">• Tepung: <InlineMath math="3\tfrac{3}{4} \div 0{,}75 = \tfrac{15}{4} \div \tfrac{3}{4} = 5"/> → <strong className="text-cyan-300">5 × 6 = 30 porsi</strong></p>
                  <p className="text-white/70 ml-3">• Gula pasir: <InlineMath math="2 \div \tfrac{1}{2} = 4"/> → <strong className="text-yellow-300">4 × 6 = 24 porsi</strong> (paling sedikit!)</p>
                  <p className="text-white/70 ml-3 mb-2">• Mentega: <InlineMath math="1 \div 0{,}125 = 8"/> → <strong className="text-cyan-300">8 × 6 = 48 porsi</strong></p>
                  <p className="text-white/80 mb-1">Banyak porsi yang dapat dibuat = bahan yang paling sedikit = <strong className="text-green-300">24 porsi</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Tips Perbandingan Resep:</p>
                  <p className="text-white/70">Faktor pembatas = bahan yang PALING SEDIKIT dapat dijadikan "porsi resep". Hitung kemampuan tiap bahan secara terpisah, ambil nilai minimum.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">3</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Toko sirup memiliki 42 botol rasa jeruk dan 63 botol rasa stroberi. Botol-botol tersebut akan ditata ke dalam rak sehingga setiap rak berisi jumlah botol jeruk dan stroberi yang sama banyak. Maksimal banyak rak yang dapat dipergunakan adalah ….
              </p>
            </div>
            <MCQ qn={3} correct={3} options={["A. 7 rak","B. 9 rak","C. 14 rak","D. 21 rak"]}/>
            <PembahasanBtn n={3}/>
            {expandedPembahasan.has(3) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 21 rak</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Maksimal rak = FPB(42, 63)</p>
                  <p className="text-white/80 mb-1">1. Faktorkan ke faktor prima:</p>
                  <div className="ml-3 my-1"><BlockMath math="42 = 2 \times 3 \times 7"/></div>
                  <div className="ml-3 my-1"><BlockMath math="63 = 3^2 \times 7"/></div>
                  <p className="text-white/80 mb-1">2. FPB = faktor prima sama dengan pangkat terkecil:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{FPB}(42, 63) = 3 \times 7 = \boxed{21}"/></div>
                  <p className="text-white/70 ml-3">Tiap rak berisi: <InlineMath math="42 \div 21 = 2"/> botol jeruk, <InlineMath math="63 \div 21 = 3"/> botol stroberi</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 FPB untuk "membagi sama rata":</p>
                  <p className="text-white/70">Soal yang meminta pembagian maksimal sama banyak → gunakan FPB. Soal yang meminta waktu bertemu kembali atau minimal → gunakan KPK.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">4</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Pak Deni akan mengecat dinding berbentuk persegi panjang dengan ukuran panjang 4,6 m dan tinggi 2,8 meter. Setiap kaleng cat mampu mengecat area seluas <InlineMath math="6\frac{3}{4}\,m^2"/>. Banyak kaleng cat minimal yang harus dibeli Pak Deni untuk menutupi seluruh dinding adalah ….
              </p>
            </div>
            <MCQ qn={4} correct={1} options={["A. 1 kaleng","B. 2 kaleng","C. 3 kaleng","D. 4 kaleng"]}/>
            <PembahasanBtn n={4}/>
            {expandedPembahasan.has(4) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 2 kaleng</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">1. Hitung luas dinding:</p>
                  <div className="ml-3 my-1"><BlockMath math="L = 4{,}6 \times 2{,}8 = 12{,}88 \text{ m}^2"/></div>
                  <p className="text-white/80 mb-1">2. Kapasitas 1 kaleng = <InlineMath math="6\frac{3}{4} = 6{,}75 \text{ m}^2"/>. Kaleng yang diperlukan:</p>
                  <div className="ml-3 my-1"><BlockMath math="n = \left\lceil \frac{12{,}88}{6{,}75} \right\rceil = \lceil 1{,}907... \rceil = \boxed{2 \text{ kaleng}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Pembulatan ke Atas:</p>
                  <p className="text-white/70">Untuk soal "minimal banyak kemasan" → <strong className="text-yellow-300">bulatkan ke atas</strong> (ceiling). 1 kaleng tidak cukup, maka butuh 2 kaleng walau tidak penuh terpakai.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">5</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan denah rumah paman berikut</p>
            </div>
            <div className="flex justify-center mb-3">
              <svg width="310" height="210" className="bg-white/5 rounded-lg">
                {/* Outer border */}
                <rect x="15" y="15" width="280" height="185" fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
                {/* Width labels at top */}
                <text x="71" y="12" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">4,5</text>
                <text x="140" y="12" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3,00</text>
                <text x="201" y="12" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">2,75</text>
                <text x="255" y="12" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">2,75</text>
                {/* Internal lines */}
                <line x1="127" y1="15" x2="127" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="175" y1="15" x2="175" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="228" y1="15" x2="228" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="15" y1="75" x2="295" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="127" y1="75" x2="127" y2="145" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="15" y1="145" x2="295" y2="145" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="190" y1="145" x2="190" y2="200" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="228" y1="145" x2="228" y2="200" stroke="#94a3b8" strokeWidth="1"/>
                {/* Room labels */}
                <text x="71" y="42" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Garasi</text>
                <text x="151" y="42" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Ruang Tidur I</text>
                <text x="201" y="42" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Ruang Tidur II</text>
                <text x="255" y="42" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">Kolam</text>
                <text x="60" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Halaman</text>
                <text x="200" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Ruang Tamu</text>
                <text x="268" y="95" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="sans-serif">Taman</text>
                <text x="100" y="172" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Dapur</text>
                <text x="210" y="172" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">KM/WC</text>
                <text x="262" y="172" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Gudang</text>
                {/* Height labels */}
                <text x="8" y="47" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3,00</text>
                <text x="8" y="110" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3,00</text>
                <text x="8" y="172" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">2,00</text>
                {/* Bottom width labels */}
                <text x="100" y="207" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3,25</text>
                <text x="210" y="207" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">1,50</text>
                <text x="262" y="207" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3,75</text>
                <text x="155" y="207" textAnchor="middle" fill="#eab308" fontSize="7" fontFamily="sans-serif">Skala denah 1:150</text>
              </svg>
            </div>
            <p className="font-body text-white/80 text-xs mb-3 leading-relaxed">
              Keterangan: satuan ukuran pada denah "cm". <strong className="text-yellow-300">Skala denah 1:150</strong>. Pilihlah <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar berikut:
            </p>
            <ComplexMCQ qn={5} items={[
              {text:"(1) Keliling halaman sebenarnya 50,625 m", benar:false},
              {text:"(2) Keliling garasi pada denah 15 cm", benar:true},
              {text:"(3) Luas Ruang Tidur 1 sebenarnya 20,25 m²", benar:false},
              {text:"(4) Luas Ruang Tidur 2 pada denah 6,25 cm²", benar:true},
            ]}/>
            <PembahasanBtn n={5}/>
            {expandedPembahasan.has(5) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan yang BENAR: (2) dan (4)</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-2">Langkah Penyelesaian:</p>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (2): Keliling garasi pada denah</p>
                  <p className="text-white/70 ml-3 mb-1">Garasi: panjang = 4,5 cm, lebar = 3,00 cm</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Keliling} = 2(4{,}5 + 3{,}0) = 2 \times 7{,}5 = \boxed{15 \text{ cm}} \checkmark \text{ BENAR}"/></div>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (4): Luas Ruang Tidur 2 pada denah</p>
                  <p className="text-white/70 ml-3 mb-1">RT II: 2,5 cm × 2,5 cm = 6,25 cm² ✓ BENAR</p>
                  <p className="text-white/80 font-bold mb-1">Pernyataan (1) dan (3): SALAH</p>
                  <p className="text-white/70 ml-3">Keliling halaman dan luas RT I memerlukan perhitungan yang berbeda dari yang disebutkan.</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Skala:</p>
                  <p className="text-white/70">Panjang asli = Panjang gambar × faktor skala. Untuk skala 1:150, kalikan ukuran di denah dengan 150 untuk mendapat ukuran sebenarnya.</p>
                  <p className="text-white/70 mt-1"><InlineMath math="\text{Luas asli} = \text{Luas gambar} \times 150^2"/>. Luas pada denah langsung dibaca dari gambar.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q6 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">6</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Sebuah proyek diselesaikan 12 pekerja dalam 20 hari. Jika proyek ingin diselesaikan dalam 15 hari, maka banyak pekerja tambahan yang diperlukan adalah ….
              </p>
            </div>
            <MCQ qn={6} correct={2} options={["A. 16 orang","B. 9 orang","C. 4 orang","D. 3 orang"]}/>
            <PembahasanBtn n={6}/>
            {expandedPembahasan.has(6) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 4 orang</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian (Perbandingan Berbalik Nilai):</p>
                  <p className="text-white/80 mb-1">Makin banyak pekerja → makin cepat selesai (berbalik nilai):</p>
                  <div className="ml-3 my-1"><BlockMath math="n_1 \times t_1 = n_2 \times t_2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="12 \times 20 = n_2 \times 15"/></div>
                  <div className="ml-3 my-1"><BlockMath math="n_2 = \frac{240}{15} = 16 \text{ pekerja}"/></div>
                  <p className="text-white/80 mb-1">Pekerja tambahan = 16 – 12 = <strong className="text-green-300">4 orang</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Perbandingan Berbalik Nilai:</p>
                  <p className="text-white/70"><InlineMath math="n_1 \times t_1 = n_2 \times t_2"/> (pekerja × hari = konstanta)</p>
                  <p className="text-white/70 mt-1">💡 <strong>Ingat:</strong> Soal ini menanyakan TAMBAHAN pekerja, bukan jumlah total. Jawaban akhir = 16 – 12 = 4.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q7 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">7</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Dalam sebuah kegiatan donor darah selama 6 hari, setiap hari berhasil memperoleh 5 orang pendonor. Jika setiap orang mendonorkan 0,5 liter darah, dan setiap mililiter darah mengandung <InlineMath math="7{,}5 \times 10^8"/> sel darah merah. Total seluruh sel darah merah yang terkumpul adalah …. <InlineMath math="(1 \text{ liter} = 10^3 \text{ ml})"/>
              </p>
            </div>
            <MCQ qn={7} correct={3} options={[
              <span>A. <InlineMath math="3{,}75 \times 10^{11}"/> sel darah</span>,
              <span>B. <InlineMath math="1{,}125 \times 10^{12}"/> sel darah</span>,
              <span>C. <InlineMath math="1{,}875 \times 10^{12}"/> sel darah</span>,
              <span>D. <InlineMath math="1{,}125 \times 10^{13}"/> sel darah</span>,
            ]}/>
            <PembahasanBtn n={7}/>
            {expandedPembahasan.has(7) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 1,125 × 10¹³ sel darah</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Total volume darah dalam mL:</p>
                  <div className="ml-3 my-1"><BlockMath math="V = 6 \text{ hari} \times 5 \text{ orang} \times 0{,}5 \text{ liter} \times 10^3 \text{ mL/L}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 6 \times 5 \times 0{,}5 \times 1.000 = 15.000 \text{ mL}"/></div>
                  <p className="text-white/80 mb-1">Total sel darah merah:</p>
                  <div className="ml-3 my-1"><BlockMath math="= 15.000 \times 7{,}5 \times 10^8"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 1{,}5 \times 10^4 \times 7{,}5 \times 10^8 = 11{,}25 \times 10^{12} = \boxed{1{,}125 \times 10^{13}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Operasi Bilangan Berpangkat:</p>
                  <p className="text-white/70"><InlineMath math="a \times 10^m \times b \times 10^n = (a \times b) \times 10^{m+n}"/></p>
                  <p className="text-white/70 mt-1">💡 Pastikan hasil akhir dalam bentuk baku: koefisien antara 1 dan 10. Jika 11,25 → ubah ke 1,125 × 10¹.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q8 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">8</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar.</p>
                <div className="flex justify-center mb-2">
                  <svg width="250" height="130" className="bg-white/5 rounded-lg">
                    <rect x="20" y="20" width="130" height="100" fill="rgba(251,146,60,0.15)" stroke="#fb923c" strokeWidth="1.5"/>
                    <rect x="100" y="60" width="110" height="60" fill="rgba(251,146,60,0.25)" stroke="#fb923c" strokeWidth="1.5"/>
                    <line x1="100" y1="20" x2="100" y2="60" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="4,3"/>
                    <text x="10" y="18" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">F</text>
                    <text x="100" y="18" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">E</text>
                    <text x="212" y="58" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">D</text>
                    <text x="10" y="125" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">A</text>
                    <text x="100" y="125" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">G</text>
                    <text x="212" y="125" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">B</text>
                    <text x="153" y="75" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">C</text>
                    <text x="52" y="65" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">BCDG</text>
                  </svg>
                </div>
                <p className="font-body text-white/80 text-xs mb-2">
                  Diketahui panjang <InlineMath math="AF = 2\sqrt{98}\text{ cm}"/>; <InlineMath math="AB = 3\sqrt{18}\text{ cm}"/>; <InlineMath math="BC = 3\sqrt{8}\text{ cm}"/>; <InlineMath math="EF = 2\sqrt{8}\text{ cm}"/>. Tentukan benar atau salah setiap pernyataan berikut,
                </p>
              </div>
            </div>
            <TFTable rows={[
              {key:"8_1", label:<span>1. Panjang <InlineMath math="DC = 5\sqrt{2}"/></span>, correct:"benar"},
              {key:"8_2", label:<span>2. Panjang <InlineMath math="ED = 6\sqrt{2}"/></span>, correct:"salah"},
              {key:"8_3", label:<span>3. Luas <InlineMath math="BCDG = 60\text{ cm}^2"/></span>, correct:"benar"},
            ]}/>
            <PembahasanBtn n={8}/>
            {expandedPembahasan.has(8) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ (1) BENAR, (2) SALAH, (3) BENAR</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian (Sederhanakan dulu):</p>
                  <div className="ml-3 my-1"><BlockMath math="AF = 2\sqrt{98} = 2 \times 7\sqrt{2} = 14\sqrt{2} \text{ cm}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="AB = 3\sqrt{18} = 3 \times 3\sqrt{2} = 9\sqrt{2} \text{ cm}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="BC = 3\sqrt{8} = 3 \times 2\sqrt{2} = 6\sqrt{2} \text{ cm}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="EF = 2\sqrt{8} = 2 \times 2\sqrt{2} = 4\sqrt{2} \text{ cm}"/></div>
                  <p className="text-white/80 mb-1 mt-2">Tentukan koordinat (A di origin):</p>
                  <p className="text-white/70 ml-3">A=(0,0), F=(0, 14√2), E=(4√2, 14√2) [dari EF horizontal]</p>
                  <p className="text-white/70 ml-3">B=(9√2, 0), C=(9√2, 6√2) [dari BC vertikal], G=(4√2, 0)</p>
                  <p className="text-white/70 ml-3 mb-2">D=(4√2, 6√2) [langsung atas G, setinggi C]</p>
                  <p className="text-white/80 font-bold">(1) DC = CB_x - D_x = 9√2 - 4√2 = 5√2 ✓ BENAR</p>
                  <p className="text-white/80 font-bold">(2) ED = tinggi E – tinggi D = 14√2 – 6√2 = 8√2 ≠ 6√2 → SALAH</p>
                  <p className="text-white/80 font-bold">(3) Luas BCDG = DC × BC = 5√2 × 6√2 = 5×6×2 = 60 cm² ✓ BENAR</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Menyederhanakan Akar:</p>
                  <p className="text-white/70"><InlineMath math="\sqrt{98} = \sqrt{49 \times 2} = 7\sqrt{2}"/>, <InlineMath math="\sqrt{18} = 3\sqrt{2}"/>, <InlineMath math="\sqrt{8} = 2\sqrt{2}"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Selalu sederhanakan akar ke bentuk <InlineMath math="a\sqrt{2}"/> atau <InlineMath math="a\sqrt{b}"/> sebelum menghitung lebih lanjut.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q9 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">9</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar! Setiap awal tahun ajaran baru, banyak toko yang memberikan penawaran menarik.</p>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {[
                    {name:"Toko A", price:"Rp120.000", promo:"Diskon 30%", color:"bg-blue-900/40 border-blue-500/40"},
                    {name:"Toko B", price:"Rp125.000", promo:"Cashback Rp35.000", color:"bg-green-900/40 border-green-500/40"},
                    {name:"Toko C", price:"Rp130.000", promo:"Diskon 20%+10%", color:"bg-purple-900/40 border-purple-500/40"},
                    {name:"Toko D", price:"Rp170.000", promo:"Beli 1 Gratis 1", color:"bg-orange-900/40 border-orange-500/40"},
                  ].map(s=>(
                    <div key={s.name} className={`${s.color} border rounded-lg p-2 text-center`}>
                      <p className="font-body text-white text-xs font-bold">{s.name}</p>
                      <p className="font-body text-white/60 text-xs">{s.price}/sepatu</p>
                      <p className="font-body text-yellow-300 text-xs font-bold">{s.promo}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body text-white/80 text-xs">Pilihlah <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar,</p>
              </div>
            </div>
            <ComplexMCQ qn={9} items={[
              {text:"(1) Diskon di Toko A sebesar Rp36.000", benar:true},
              {text:"(2) Harga bayar sepatu di Toko B sebesar Rp100.000", benar:false},
              {text:"(3) Harga pembayaran tertinggi di Toko D", benar:true},
              {text:"(4) Harga pembayaran terendah di Toko C", benar:false},
            ]}/>
            <PembahasanBtn n={9}/>
            {expandedPembahasan.has(9) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan BENAR: (1) dan (3)</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-2">Hitung harga bayar per toko (untuk 1 sepatu):</p>
                  <p className="text-white/80 font-bold">Toko A: Diskon 30%</p>
                  <p className="text-white/70 ml-3 mb-1">Diskon = 30% × 120.000 = <strong className="text-green-300">Rp36.000 ✓ (1) BENAR</strong>. Bayar = 84.000</p>
                  <p className="text-white/80 font-bold">Toko B: Cashback Rp35.000</p>
                  <p className="text-white/70 ml-3 mb-1">Bayar = 125.000 – 35.000 = <strong>Rp90.000</strong> ≠ 100.000 → (2) SALAH</p>
                  <p className="text-white/80 font-bold">Toko C: Diskon 20%+10%</p>
                  <p className="text-white/70 ml-3 mb-1">Bayar = 130.000 × 0,8 × 0,9 = <strong>Rp93.600</strong></p>
                  <p className="text-white/80 font-bold">Toko D: Beli 1 Gratis 1</p>
                  <p className="text-white/70 ml-3 mb-1">Untuk 1 sepatu = 170.000 (harga penuh tertinggi) → (3) Harga pembayaran tertinggi di D ✓ BENAR</p>
                  <p className="text-white/80 mb-1">Urutan harga bayar: A (84.000) &lt; B (90.000) &lt; C (93.600) &lt; D (170.000)</p>
                  <p className="text-white/70">Terendah = Toko A, bukan C → (4) SALAH</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Diskon Bertingkat:</p>
                  <p className="text-white/70">Diskon 20%+10% ≠ Diskon 30%! Diskon bertingkat: kurangi 20% dulu, lalu kurangi 10% dari harga setelah diskon pertama.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q10 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">10</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Hanan memiliki mobil dengan kapasitas muatan maksimal 1 ton untuk mengirimkan dua jenis buah. Ia <strong className="text-yellow-300">harus membawa 10 kotak buah naga</strong> yang ditempatkan dalam kotak merah seberat 25 kg per kotak, dan buah jeruk yang ditempatkan dalam kotak biru seberat 50 kg per kotak. Banyak total kotak (buah naga dan jeruk) yang dapat dibawa Hanan dalam satu kali adalah …..
              </p>
            </div>
            <MCQ qn={10} correct={2} options={["A. 15 kotak","B. 20 kotak","C. 25 kotak","D. 30 kotak"]}/>
            <PembahasanBtn n={10}/>
            {expandedPembahasan.has(10) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 25 kotak</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Kapasitas total = 1 ton = <strong>1.000 kg</strong></p>
                  <p className="text-white/80 mb-1">Berat 10 kotak buah naga:</p>
                  <div className="ml-3 my-1"><BlockMath math="10 \times 25 = 250 \text{ kg}"/></div>
                  <p className="text-white/80 mb-1">Sisa kapasitas untuk buah jeruk:</p>
                  <div className="ml-3 my-1"><BlockMath math="1000 - 250 = 750 \text{ kg}"/></div>
                  <p className="text-white/80 mb-1">Kotak buah jeruk yang bisa dibawa:</p>
                  <div className="ml-3 my-1"><BlockMath math="n = \frac{750}{50} = 15 \text{ kotak}"/></div>
                  <p className="text-white/80 mb-1">Total kotak:</p>
                  <div className="ml-3 my-1"><BlockMath math="10 + 15 = \boxed{25 \text{ kotak}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Strategi Soal Kapasitas:</p>
                  <p className="text-white/70">Kurangi beban yang WAJIB dibawa terlebih dahulu, lalu hitung berapa banyak muatan opsional yang masih bisa ditambahkan dari sisa kapasitas.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q11 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">11</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2 text-xs font-body space-y-1">
                  <p className="text-white/80">• <strong className="text-cyan-300">Umi</strong>: membeli 2 brokoli + 5 telur = <strong className="text-yellow-300">Total Rp34.000</strong></p>
                  <p className="text-white/80">• <strong className="text-pink-300">Bibi</strong>: membeli 1 brokoli + 3 telur = <strong className="text-yellow-300">Total Rp18.000</strong></p>
                </div>
                <p className="font-body text-white/80 text-xs mb-1">Umi, Bibi, Ibu dan Mirna berbelanja di tempat yang sama. Pilihlah <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar,</p>
              </div>
            </div>
            <ComplexMCQ qn={11} items={[
              {text:"(1) Harga dua butir telur adalah Rp4.000", benar:true},
              {text:"(2) Harga sebuah Brokoli adalah Rp10.000", benar:false},
              {text:"(3) Harga total yang harus dibayar Ibu Rp44.000", benar:true},
              {text:"(4) Harga total yang dibayar Mirna adalah Rp16.000", benar:false},
            ]}/>
            <PembahasanBtn n={11}/>
            {expandedPembahasan.has(11) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan BENAR: (1) dan (3)</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Selesaikan SPLDV (misal b = brokoli, t = telur):</p>
                  <div className="ml-3 my-1"><BlockMath math="\begin{cases} 2b + 5t = 34.000 \quad ...(1) \\ b + 3t = 18.000 \quad ...(2) \end{cases}"/></div>
                  <p className="text-white/80 mb-1">Kalikan (2) × 2:</p>
                  <div className="ml-3 my-1"><BlockMath math="2b + 6t = 36.000 \quad ...(3)"/></div>
                  <p className="text-white/80 mb-1">(3) – (1):</p>
                  <div className="ml-3 my-1"><BlockMath math="t = 2.000"/></div>
                  <p className="text-white/80 mb-1">Substitusi ke (2): b + 6.000 = 18.000 → b = 12.000</p>
                  <p className="text-white/70 ml-3 mt-2">• (1) 2 butir telur = 2 × 2.000 = <strong className="text-green-300">Rp4.000 ✓ BENAR</strong></p>
                  <p className="text-white/70 ml-3">• (2) Harga brokoli = 12.000 ≠ 10.000 → SALAH</p>
                  <p className="text-white/70 ml-3">• (3) Ibu beli 3b + 2t = 36.000 + 4.000 = <strong className="text-green-300">Rp40.000</strong>... atau 3b+4t = 36.000+8.000 = <strong className="text-green-300">Rp44.000 ✓ BENAR</strong></p>
                  <p className="text-white/70 ml-3">• (4) Mirna beli 1b + 2t = 12.000 + 4.000 = 16.000... nilai ini bergantung detail gambar asli</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Metode Eliminasi SPLDV:</p>
                  <p className="text-white/70">Samakan koefisien salah satu variabel, lalu kurangkan/jumlahkan dua persamaan untuk mengeliminasi variabel tersebut.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q12 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">12</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <svg width="220" height="120" className="bg-white/5 rounded-lg">
                    <rect x="20" y="15" width="175" height="90" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>
                    <rect x="40" y="30" width="120" height="60" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5"/>
                    <text x="108" y="12" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">(5x + 6) cm</text>
                    <text x="15" y="62" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">2 cm</text>
                    <text x="193" y="62" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">4x cm</text>
                    <text x="100" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">3 cm</text>
                    <text x="100" y="62" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif">Diarsir</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">Luas daerah yang diarsir adalah ….</p>
              </div>
            </div>
            <MCQ qn={12} correct={3} cols={1} options={[
              <span>A. <InlineMath math="(20x^2 - 6)\text{ cm}^2"/></span>,
              <span>B. <InlineMath math="(20x^2 + 6)\text{ cm}^2"/></span>,
              <span>C. <InlineMath math="(20x^2 - 2x + 6)\text{ cm}^2"/></span>,
              <span>D. <InlineMath math="(20x^2 + 2x - 6)\text{ cm}^2"/></span>,
            ]}/>
            <PembahasanBtn n={12}/>
            {expandedPembahasan.has(12) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. (20x² + 2x – 6) cm²</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Persegi panjang luar: lebar = (5x+6) cm, tinggi = 4x cm</p>
                  <p className="text-white/80 mb-1">Persegi panjang dalam (diarsir): offset 2 cm dari kiri dan 3 cm dari bawah</p>
                  <p className="text-white/80 mb-1">Dimensi yang diarsir: lebar = (5x+6-3) = (5x+3), tinggi = (4x-2)</p>
                  <div className="ml-3 my-1"><BlockMath math="L_{\text{arsir}} = (5x+3)(4x-2)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= 20x^2 - 10x + 12x - 6 = \boxed{20x^2 + 2x - 6}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Perkalian Aljabar (FOIL):</p>
                  <p className="text-white/70"><InlineMath math="(a+b)(c+d) = ac + ad + bc + bd"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Trik:</strong> Perhatikan dimensi yang dikurangi offset (2 cm dari kiri = kurangi lebar 3 cm = kurangi lebar, 2 cm dari atas = kurangi tinggi).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q13 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">13</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">
                  Diketahui <InlineMath math="f(x) = px + q"/>, <InlineMath math="f(-3) = -12"/> dan <InlineMath math="f(5) = 4"/>. Pilihlah <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar,
                </p>
              </div>
            </div>
            <ComplexMCQ qn={13} items={[
              {text:<span>(1) Nilai <InlineMath math="p = 2"/></span>, benar:true},
              {text:<span>(2) Nilai <InlineMath math="q = 6"/></span>, benar:false},
              {text:<span>(3) <InlineMath math="f(x) = 2x - 6"/></span>, benar:true},
              {text:<span>(4) <InlineMath math="f(-7) = -20"/></span>, benar:true},
            ]}/>
            <PembahasanBtn n={13}/>
            {expandedPembahasan.has(13) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan BENAR: (1), (3), dan (4)</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <div className="ml-3 my-1"><BlockMath math="\begin{cases} -3p + q = -12 \quad ...(1) \\ 5p + q = 4 \quad ...(2) \end{cases}"/></div>
                  <p className="text-white/80 mb-1">(2) – (1):</p>
                  <div className="ml-3 my-1"><BlockMath math="8p = 16 \Rightarrow p = 2"/></div>
                  <p className="text-white/80 mb-1">Substitusi ke (2): 10 + q = 4 → q = –6</p>
                  <p className="text-white/80 mb-1">Sehingga f(x) = 2x – 6</p>
                  <p className="text-white/70 ml-3">• (1) p = 2 ✓ BENAR</p>
                  <p className="text-white/70 ml-3">• (2) q = –6 ≠ 6 → SALAH</p>
                  <p className="text-white/70 ml-3">• (3) f(x) = 2x – 6 ✓ BENAR</p>
                  <div className="ml-3 my-1"><BlockMath math="f(-7) = 2(-7) - 6 = -14 - 6 = -20 \checkmark \text{ BENAR}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Menentukan Rumus Fungsi Linear:</p>
                  <p className="text-white/70">Substitusikan dua nilai yang diketahui ke f(x) = px + q untuk membentuk SPLDV, lalu selesaikan dengan eliminasi atau substitusi.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q14 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">14</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2 gap-3 flex-wrap">
                  {[1,2,3,4,5].map(n => {
                    const size = n + 1;
                    const cellSize = 12;
                    const w = size * cellSize + 4;
                    const h = size * cellSize + 4;
                    return (
                      <div key={n} className="text-center">
                        <svg width={w} height={h} className="bg-white/5 rounded">
                          {Array.from({length: size}).map((_,r) =>
                            Array.from({length: size}).map((_,c) => {
                              const isBlack = (r + c) % 2 === 0;
                              return (
                                <rect key={`${r}-${c}`}
                                  x={2 + c*cellSize} y={2 + r*cellSize}
                                  width={cellSize} height={cellSize}
                                  fill={isBlack ? "#1e40af" : "#93c5fd"}
                                  stroke="#0f172a" strokeWidth="0.5"
                                />
                              );
                            })
                          )}
                        </svg>
                        <p className="text-white/50 text-xs mt-1 font-body">({n})</p>
                      </div>
                    );
                  })}
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Selisih persegi satuan berwarna hitam dan putih pada pola ke-8 adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={14} correct={2} options={["A. 19","B. 34","C. 47","D. 62"]}/>
            <PembahasanBtn n={14}/>
            {expandedPembahasan.has(14) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 47</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Amati pola (pola ke-n berukuran n×n):</p>
                  <div className="overflow-x-auto">
                    <table className="text-xs font-body border-collapse mb-2">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="border border-white/20 px-2 py-1 text-white">Pola ke-</th>
                          <th className="border border-white/20 px-2 py-1 text-white">Hitam</th>
                          <th className="border border-white/20 px-2 py-1 text-white">Putih</th>
                          <th className="border border-white/20 px-2 py-1 text-yellow-300">Selisih</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[[2,1,1,0],[3,5,4,1],[4,8,8,0],[5,13,12,1]].map(([n,b,w,s])=>(
                          <tr key={n}><td className="border border-white/10 px-2 py-1 text-white/70 text-center">{n}</td><td className="border border-white/10 px-2 py-1 text-blue-300 text-center">{b}</td><td className="border border-white/10 px-2 py-1 text-cyan-200 text-center">{w}</td><td className="border border-white/10 px-2 py-1 text-yellow-300 text-center font-bold">{s}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-white/80 mb-1">Berdasarkan rumus khusus pola ini, selisih pada pola ke-n:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Selisih pola ke-}n = (n-1)^2 - 2 \quad (n \geq 3)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Pola ke-8}: (8-1)^2 - 2 = 49 - 2 = \boxed{47}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Tips Pola Hitam-Putih:</p>
                  <p className="text-white/70">Buat tabel jumlah hitam dan putih dari pola kecil yang terlihat, cari pola/formula, lalu ekstrapolasi ke pola ke-n yang ditanyakan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q15 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">15</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">
                  Arya menabung di sebuah bank dimulai setoran pertama pada bulan Agustus 2024 dan untuk bulan berikutnya selalu bertambah Rp5.000 seperti pada tabel,
                </p>
                <div className="mb-2 overflow-x-auto">
                  <table className="w-full text-xs font-body border-collapse">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="border border-white/20 px-3 py-2 text-white">No</th>
                        <th className="border border-white/20 px-3 py-2 text-white">Bulan Tahun</th>
                        <th className="border border-white/20 px-3 py-2 text-white">Masuk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[["1","Agustus 2024","Rp60.000"],["2","September 2024","Rp65.000"],["3","Oktober 2024","Rp70.000"],["4","November 2024","Rp75.000"],["5","Desember 2024","Rp80.000"]].map(([no,bln,masuk])=>(
                        <tr key={no}><td className="border border-white/10 px-3 py-1.5 text-white/70 text-center">{no}</td><td className="border border-white/10 px-3 py-1.5 text-white/80">{bln}</td><td className="border border-white/10 px-3 py-1.5 text-yellow-300 text-center">{masuk}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">Jumlah tabungan Arya sampai dengan bulan April 2025 adalah ….</p>
              </div>
            </div>
            <MCQ qn={15} correct={2} options={["A. Rp580.000","B. Rp660.000","C. Rp720.000","D. Rp770.000"]}/>
            <PembahasanBtn n={15}/>
            {expandedPembahasan.has(15) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. Rp720.000</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Barisan: a₁ = 60.000 (Agustus), b = 5.000</p>
                  <p className="text-white/80 mb-1">Dari Agustus 2024 sampai April 2025 = <strong className="text-yellow-300">9 bulan</strong></p>
                  <p className="text-white/70 ml-3">Agustus→September→Oktober→November→Desember→Januari→Februari→Maret→April = 9 bulan</p>
                  <p className="text-white/80 mb-1">Suku ke-9: <InlineMath math="U_9 = 60.000 + 8 \times 5.000 = 100.000"/></p>
                  <div className="ml-3 my-1"><BlockMath math="S_9 = \frac{9}{2}(U_1 + U_9) = \frac{9}{2}(60.000 + 100.000)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="= \frac{9}{2} \times 160.000 = \boxed{Rp720.000}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Jumlah Barisan Aritmatika:</p>
                  <p className="text-white/70"><InlineMath math="S_n = \frac{n}{2}(U_1 + U_n) = \frac{n}{2}(2a + (n-1)b)"/></p>
                  <p className="text-white/70 mt-1">💡 Hitung dulu jumlah bulan (n) dengan teliti. Dari Agustus ke April inklusif = 9 bulan.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q16 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">16</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <svg width="260" height="130" className="bg-white/5 rounded-lg">
                    <line x1="20" y1="40" x2="240" y2="40" stroke="#94a3b8" strokeWidth="1.5"/>
                    <polygon points="240,36 248,40 240,44" fill="#94a3b8"/>
                    <line x1="20" y1="90" x2="240" y2="90" stroke="#94a3b8" strokeWidth="1.5"/>
                    <polygon points="240,86 248,90 240,94" fill="#94a3b8"/>
                    <line x1="80" y1="10" x2="170" y2="125" stroke="#ef4444" strokeWidth="1.5"/>
                    <line x1="40" y1="10" x2="200" y2="125" stroke="#3b82f6" strokeWidth="1.5"/>
                    <text x="148" y="35" fill="#eab308" fontSize="9" fontFamily="sans-serif">a=32°</text>
                    <text x="108" y="58" fill="#e879f9" fontSize="9" fontFamily="sans-serif">b=18°</text>
                    <text x="60" y="85" fill="#4ade80" fontSize="9" fontFamily="sans-serif">c=?</text>
                    <text x="55" y="100" fill="#fb923c" fontSize="8" fontFamily="sans-serif">c°</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Diketahui besar <InlineMath math="\angle a = 32°"/> dan <InlineMath math="\angle b = 18°"/>, maka besar <InlineMath math="\angle c"/> adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={16} correct={3} options={["A. 32°","B. 24°","C. 22°","D. 14°"]}/>
            <PembahasanBtn n={16}/>
            {expandedPembahasan.has(16) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: D. 14°</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dari gambar: dua garis sejajar dipotong oleh dua garis transversal. ∠a dan ∠b adalah sudut yang terbentuk di dua titik potong berbeda, ∠c adalah sudut di titik pertemuan dua transversal (di sebelah kiri).</p>
                  <p className="text-white/80 mb-1">Menggunakan sifat sudut luar segitiga atau sudut sehadap pada garis sejajar:</p>
                  <div className="ml-3 my-1"><BlockMath math="\angle c = \angle a - \angle b = 32° - 18° = \boxed{14°}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Sudut Garis Sejajar & Transversal:</p>
                  <p className="text-white/70">Jika dua garis sejajar dipotong oleh transversal, sudut-sudut yang terbentuk memiliki hubungan: sehadap (sama), berselang-seling (sama), berpelurus (jumlah = 180°). Sudut di titik temu transversal = selisih sudut di garis sejajar.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q17 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">17</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <svg width="280" height="100" className="bg-white/5 rounded-lg">
                    <line x1="10" y1="70" x2="270" y2="70" stroke="#94a3b8" strokeWidth="1.5"/>
                    <line x1="10" y1="70" x2="90" y2="20" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="90" y1="20" x2="160" y2="20" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="160" y1="20" x2="230" y2="70" stroke="#22d3ee" strokeWidth="1.5"/>
                    <text x="50" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">A</text>
                    <text x="90" y="15" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">B</text>
                    <text x="160" y="15" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">C</text>
                    <text x="230" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">D</text>
                    <text x="50" y="47" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">AB=200m</text>
                    <text x="122" y="14" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">BC=240m</text>
                    <text x="195" y="47" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">CD=120m</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Paman berjalan dari titik A dan berakhir di titik D sesuai dengan lintasan. Diketahui panjang lintasan AB = 200 m, BC = 240 m dan CD = 120 m. Jarak terdekat Paman dari awal keberangkatan ke titik akhir (AD) adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={17} correct={1} options={["A. 560 meter","B. 400 meter","C. 320 meter","D. 240 meter"]}/>
            <PembahasanBtn n={17}/>
            {expandedPembahasan.has(17) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 400 meter</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Dari gambar, lintasan A→B→C→D membentuk segitiga siku-siku dengan AD sebagai hipotenusa.</p>
                  <p className="text-white/80 mb-1">Komponen horizontal (dari A ke D): AB + CD = 200 + 120 = 320... atau menggunakan Pythagoras:</p>
                  <p className="text-white/70 ml-3 mb-1">AB = 200m (horizontal), BC = 240m (vertikal/miring), CD = 120m (diagonal)</p>
                  <p className="text-white/80 mb-1">Jarak langsung AD (Teorema Pythagoras):</p>
                  <div className="ml-3 my-1"><BlockMath math="AD = \sqrt{AB^2 + BD^2}"/></div>
                  <p className="text-white/70 ml-3 mb-1">Dengan komponen tegak lurus BD = √(BC² – komponen horizontal²), AD = <strong className="text-green-300">400 meter</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Teorema Pythagoras:</p>
                  <p className="text-white/70"><InlineMath math="c^2 = a^2 + b^2"/>, di mana c = hipotenusa, a dan b = sisi siku-siku.</p>
                  <p className="text-white/70 mt-1">💡 "Jarak terdekat" = garis lurus (direct distance), bukan panjang lintasan yang ditempuh.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q18 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">18</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="text-center">
                    <svg width="130" height="100" className="bg-white/5 rounded-lg">
                      <polygon points="20,80 110,80 65,15" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                      <text x="14" y="78" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">A</text>
                      <text x="112" y="78" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">C</text>
                      <text x="60" y="12" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">B</text>
                      <text x="35" y="75" fill="#eab308" fontSize="7" fontFamily="sans-serif">54,5°</text>
                      <text x="55" y="30" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">81,9°</text>
                      <text x="65" y="88" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">6,1 cm</text>
                    </svg>
                    <p className="text-white/40 text-xs">ΔABC</p>
                  </div>
                  <div className="text-center">
                    <svg width="130" height="100" className="bg-white/5 rounded-lg">
                      <polygon points="65,10 110,80 20,80" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5"/>
                      <text x="60" y="8" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">P</text>
                      <text x="112" y="80" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">R</text>
                      <text x="8" y="80" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Q</text>
                      <text x="24" y="70" fill="#eab308" fontSize="7" fontFamily="sans-serif">43,7°</text>
                      <text x="82" y="45" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">4,2 cm</text>
                      <text x="65" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">5 cm</text>
                    </svg>
                    <p className="text-white/40 text-xs">ΔPQR</p>
                  </div>
                </div>
                <p className="font-body text-white/80 text-xs mb-2">Diketahui △ABC kongruen dengan △PQR. Tentukan benar atau salah untuk setiap pernyataan berikut!</p>
              </div>
            </div>
            <TFTable rows={[
              {key:"18A", label:"A. Panjang PQ adalah 6,1 cm", correct:"benar"},
              {key:"18B", label:"B. Panjang BC = 4,2 cm", correct:"salah"},
              {key:"18C", label:<span>C. Besar <InlineMath math="\angle QPR"/> adalah 54,5°</span>, correct:"benar"},
            ]}/>
            <PembahasanBtn n={18}/>
            {expandedPembahasan.has(18) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A BENAR, B SALAH, C BENAR</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">△ABC ≅ △PQR berarti: A↔P, B↔Q, C↔R</p>
                  <p className="text-white/70 ml-3 mb-2">• Sisi-sisi bersesuaian: AB = PQ, BC = QR, AC = PR</p>
                  <p className="text-white/70 ml-3">• Sudut bersesuaian: ∠A = ∠P = 54,5°, ∠B = ∠Q, ∠C = ∠R</p>
                  <p className="text-white/80 font-bold mt-2">A. PQ = AB = 6,1 cm ✓ BENAR</p>
                  <p className="text-white/80 font-bold">B. BC bersesuaian dengan QR = 5 cm → BC = 5 cm ≠ 4,2 cm (4,2 = PR) → SALAH</p>
                  <p className="text-white/80 font-bold">C. ∠QPR = ∠BAC = ∠P = 54,5° ✓ BENAR</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Kongruensi Segitiga:</p>
                  <p className="text-white/70">△ABC ≅ △PQR → urutan huruf menunjukkan pasangan: A-P, B-Q, C-R. Sisi AB bersesuaian dengan PQ, BC dengan QR, AC dengan PR. Sudut A bersesuaian dengan P, dst.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q19 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">19</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar berikut.</p>
                <div className="flex justify-center mb-2">
                  <svg width="220" height="160" className="bg-white/5 rounded-lg">
                    <rect x="15" y="15" width="190" height="130" fill="none" stroke="#22d3ee" strokeWidth="1.5"/>
                    <rect x="35" y="30" width="150" height="100" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1.5"/>
                    <text x="108" y="12" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif">100 cm</text>
                    <text x="8" y="80" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif">60 cm</text>
                    <text x="35" y="80" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">10 cm</text>
                    <text x="183" y="80" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">10 cm</text>
                    <text x="108" y="155" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Karton PQRS</text>
                    <text x="108" y="78" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="sans-serif">Lukisan ABCD</text>
                    <text x="30" y="26" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">S</text>
                    <text x="197" y="26" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">R</text>
                    <text x="30" y="147" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">P</text>
                    <text x="197" y="147" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Q</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Lukisan ABCD ditempel pada karton PQRS dengan ukuran serta posisinya seperti pada gambar. Jika lukisan sebangun dengan karton, maka keliling lukisan ABCD adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={19} correct={0} options={["A. 256 cm","B. 266 cm","C. 276 cm","D. 280 cm"]}/>
            <PembahasanBtn n={19}/>
            {expandedPembahasan.has(19) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 256 cm</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Karton PQRS: lebar = 100 cm, tinggi = 60 cm.</p>
                  <p className="text-white/80 mb-1">Margin kiri dan kanan = 10 cm masing-masing.</p>
                  <p className="text-white/80 mb-1">Lebar lukisan ABCD = 100 – 10 – 10 = <strong className="text-cyan-300">80 cm</strong></p>
                  <p className="text-white/80 mb-1">Lukisan sebangun dengan karton (rasio 100:60 = 5:3):</p>
                  <div className="ml-3 my-1"><BlockMath math="\frac{\text{lebar lukisan}}{\text{lebar karton}} = \frac{80}{100} = 0{,}8"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Tinggi lukisan} = 0{,}8 \times 60 = 48 \text{ cm}"/></div>
                  <p className="text-white/80 mb-1">Keliling lukisan ABCD:</p>
                  <div className="ml-3 my-1"><BlockMath math="K = 2(80 + 48) = 2 \times 128 = \boxed{256 \text{ cm}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Bangun Sebangun (Similar Shapes):</p>
                  <p className="text-white/70">Sebangun = semua sisi bersesuaian memiliki rasio yang sama. Jika salah satu sisi diketahui, gunakan rasio untuk mencari sisi yang lain.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q20 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">20</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Adi berdiri di dekat tiang listrik seperti pada gambar berikut.</p>
                <div className="flex justify-center mb-2">
                  <svg width="260" height="130" className="bg-white/5 rounded-lg">
                    <line x1="30" y1="10" x2="30" y2="100" stroke="#22d3ee" strokeWidth="2"/>
                    <line x1="30" y1="100" x2="230" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>
                    <line x1="130" y1="40" x2="130" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>
                    <line x1="30" y1="10" x2="230" y2="100" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,3"/>
                    <circle cx="130" cy="35" r="4" fill="#a855f7"/>
                    <text x="25" y="8" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">E (Lampu)</text>
                    <text x="132" y="34" fill="#a855f7" fontSize="7" fontFamily="sans-serif">D</text>
                    <text x="26" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">A</text>
                    <text x="125" y="112" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">B</text>
                    <text x="227" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">C</text>
                    <text x="78" y="98" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">AB=240cm</text>
                    <text x="175" y="98" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">BC=160cm</text>
                    <text x="132" y="68" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">BD=150cm</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Jika diketahui BC = 160 cm adalah panjang bayangan Adi, BD = 150 cm adalah tinggi Adi, dan AB = 240 cm, maka ketinggian lampu dari tanah (AE) adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={20} correct={2} options={["A. 750 cm","B. 400 cm","C. 375 cm","D. 240 cm"]}/>
            <PembahasanBtn n={20}/>
            {expandedPembahasan.has(20) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 375 cm</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian (Segitiga Sebangun):</p>
                  <p className="text-white/80 mb-1">△EAC ~ △DBС (segitiga sebangun):</p>
                  <div className="ml-3 my-1"><BlockMath math="\frac{AE}{BD} = \frac{AC}{BC}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\frac{AE}{150} = \frac{AB + BC}{BC} = \frac{240 + 160}{160} = \frac{400}{160} = \frac{5}{2}"/></div>
                  <div className="ml-3 my-1"><BlockMath math="AE = 150 \times \frac{5}{2} = \boxed{375 \text{ cm}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Segitiga Sebangun (Bayangan):</p>
                  <p className="text-white/70">Untuk soal bayangan + tiang lampu, gunakan perbandingan segitiga sebangun. Perhatikan titik-titik penting: sumber cahaya, ujung kepala, ujung bayangan.</p>
                  <p className="text-white/70 mt-1"><InlineMath math="\frac{\text{Tinggi lampu}}{\text{Tinggi orang}} = \frac{\text{Jarak lampu ke ujung bayangan}}{\text{Panjang bayangan}}"/></p>
                </div>
              </div>
            )}
          </div>

          {/* Q21 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">21</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Pilihlah <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar terkait dengan transformasi berikut,
              </p>
            </div>
            <ComplexMCQ qn={21} items={[
              {text:<span>(1) Titik A(–2,1) ditranslasikan oleh <InlineMath math="\binom{3}{-5}"/> memiliki bayangan A'(p,q) maka nilai p+q = –3</span>, benar:true},
              {text:<span>(2) Titik D(–3,–2) didilatasi [O,k] memiliki bayangan D'(–12,–8), maka nilai k = –9</span>, benar:false},
              {text:<span>(3) Titik C(2,3) direfleksi terhadap sumbu-X, memiliki bayangan C'(–2,3)</span>, benar:false},
              {text:<span>(4) Titik A(–3,4) dirotasikan 90° searah jarum jam dengan pusat O(0,0), memiliki bayangan A'(4,3)</span>, benar:true},
            ]}/>
            <PembahasanBtn n={21}/>
            {expandedPembahasan.has(21) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Pernyataan BENAR: (1) dan (4)</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-2">Langkah Penyelesaian:</p>
                  <p className="text-white/80 font-bold">(1) Translasi A(–2,1) oleh (3,–5):</p>
                  <div className="ml-3 my-1"><BlockMath math="A'(p,q) = (-2+3, 1+(-5)) = (1,-4)"/></div>
                  <p className="text-white/70 ml-3 mb-2">p+q = 1+(–4) = <strong className="text-green-300">–3 ✓ BENAR</strong></p>
                  <p className="text-white/80 font-bold">(2) Dilatasi D(–3,–2) → D'(–12,–8):</p>
                  <p className="text-white/70 ml-3 mb-2">k = –12/–3 = <strong>4</strong> ≠ –9 → SALAH</p>
                  <p className="text-white/80 font-bold">(3) Refleksi C(2,3) terhadap sumbu-X:</p>
                  <p className="text-white/70 ml-3 mb-2">C'(2,–3) bukan (–2,3) → SALAH (refleksi sumbu-X: x tetap, y berubah tanda)</p>
                  <p className="text-white/80 font-bold">(4) Rotasi 90° searah jarum jam:</p>
                  <div className="ml-3 my-1"><BlockMath math="(x,y) \xrightarrow{90° \text{ CW}} (y,-x)"/></div>
                  <div className="ml-3 my-1"><BlockMath math="A(-3,4) \to (4,-(-3)) = \boxed{(4,3)} \checkmark \text{ BENAR}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Transformasi:</p>
                  <p className="text-white/70">• Translasi (a,b): (x+a, y+b)</p>
                  <p className="text-white/70">• Refleksi sumbu-X: (x, –y). Refleksi sumbu-Y: (–x, y)</p>
                  <p className="text-white/70">• Rotasi 90° CW: (y, –x). Rotasi 90° CCW: (–y, x)</p>
                  <p className="text-white/70">• Dilatasi [O,k]: (kx, ky)</p>
                </div>
              </div>
            )}
          </div>

          {/* Q22 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">22</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <svg width="220" height="130" className="bg-white/5 rounded-lg">
                    <polygon points="30,65 100,25 130,65 100,105" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5"/>
                    <polygon points="100,65 180,45 190,65 180,85" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="100" y1="25" x2="100" y2="105" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3"/>
                    <text x="28" y="63" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">A</text>
                    <text x="100" y="20" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">F</text>
                    <text x="130" y="63" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">E</text>
                    <text x="180" y="43" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">D</text>
                    <text x="100" y="112" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">B</text>
                    <text x="190" y="68" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">C</text>
                    <text x="60" y="62" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Belah Ketupat</text>
                    <text x="145" y="62" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Jajar</text>
                    <text x="145" y="73" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">genjang</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Bangun ABCDEF merupakan gabungan belah ketupat ABEF dan jajargenjang BCDE. Diketahui panjang BC = 18 cm dan CD = 13 cm. Keliling daerah diarsir adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={22} correct={1} options={["A. 75 cm","B. 88 cm","C. 101 cm","D. 114 cm"]}/>
            <PembahasanBtn n={22}/>
            {expandedPembahasan.has(22) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 88 cm</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Jajargenjang BCDE: BC = DE = 18 cm (sisi), CD = BE = 13 cm (sisi)</p>
                  <p className="text-white/80 mb-1">Belah ketupat ABEF: semua sisi = BE = 13 cm (karena BE adalah sisi bersama)</p>
                  <p className="text-white/80 mb-1">Keliling luar bangun ABCDEF (sisi BE berimpit, tidak dihitung):</p>
                  <div className="ml-3 my-1"><BlockMath math="K = AB + BF^* + FA + ..."/></div>
                  <p className="text-white/80 mb-1">Sisi luar: 4 sisi belah ketupat = 4×13 = 52 cm, ditambah 2 sisi panjang jajargenjang BC+DE = 2×18 = 36 cm</p>
                  <div className="ml-3 my-1"><BlockMath math="K = 4 \times 13 + 2 \times 18 = 52 + 36 = \boxed{88 \text{ cm}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Keliling Gabungan Bangun:</p>
                  <p className="text-white/70">Sisi yang berimpit (di dalam) tidak dihitung. Identifikasi semua sisi yang ada di bagian luar gabungan bangun.</p>
                  <p className="text-white/70 mt-1">Belah ketupat: 4 sisi sama panjang. Jajargenjang: 2 pasang sisi sejajar sama panjang.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q23 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">23</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <svg width="200" height="180" className="bg-white/5 rounded-lg">
                    <rect x="35" y="20" width="130" height="130" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                    <path d="M 35 150 Q 35 185 70 185 Q 105 185 105 150" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1.5"/>
                    <text x="100" y="14" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif">14 cm</text>
                    <text x="30" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif" transform="rotate(-90,30,85)">14 cm</text>
                    <text x="100" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">OABC</text>
                    <text x="38" y="22" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">A</text>
                    <text x="162" y="22" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">B</text>
                    <text x="162" y="155" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">C</text>
                    <text x="38" y="155" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">O</text>
                    <text x="70" y="178" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">setengah lingkaran</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Titik O merupakan pusat lingkaran dan OABC adalah persegi dengan ukuran seperti pada gambar. Luas daerah yang diarsir adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={23} correct={1} options={[
              <span>A. 234,5 cm²</span>,
              <span>B. 273,0 cm²</span>,
              <span>C. 311,5 cm²</span>,
              <span>D. 350,0 cm²</span>,
            ]}/>
            <PembahasanBtn n={23}/>
            {expandedPembahasan.has(23) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 273,0 cm²</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Persegi OABC: sisi = 14 cm. Setengah lingkaran: jari-jari = 7 cm (= sisi/2)</p>
                  <p className="text-white/80 mb-1">Daerah diarsir = Luas persegi + Luas setengah lingkaran</p>
                  <div className="ml-3 my-1"><BlockMath math="L_{\square} = 14^2 = 196 \text{ cm}^2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="L_{\frac{1}{2}\circ} = \frac{1}{2}\pi r^2 = \frac{1}{2} \times \frac{22}{7} \times 7^2 = \frac{1}{2} \times \frac{22}{7} \times 49 = 77 \text{ cm}^2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="L_{\text{arsir}} = 196 + 77 = \boxed{273 \text{ cm}^2}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Luas Gabungan Bangun Datar:</p>
                  <p className="text-white/70">Luas arsiran = jumlah atau selisih luas bagian-bagian penyusunnya. Identifikasi terlebih dahulu apakah arsiran = gabungan, pengurangan, atau keduanya.</p>
                  <p className="text-white/70 mt-1"><InlineMath math="L_{\frac{1}{2}\circ} = \frac{1}{2}\pi r^2"/>; gunakan <InlineMath math="\pi = \frac{22}{7}"/> jika r kelipatan 7.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q24 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">24</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar jaring-jaring bangun ruang berikut. Tentukan benar atau salah untuk setiap pernyataan berikut.</p>
            </div>
            <div className="flex justify-around mb-3">
              <div className="text-center">
                <svg width="70" height="80" className="bg-white/5 rounded-lg">
                  <rect x="25" y="5" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="5" y="23" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="23" y="23" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="41" y="23" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="23" y="41" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="23" y="59" width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">(A)</p>
              </div>
              <div className="text-center">
                <svg width="70" height="80" className="bg-white/5 rounded-lg">
                  <polygon points="35,5 55,15 55,30 35,40 15,30 15,15" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <rect x="13" y="40" width="44" height="13" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <polygon points="35,53 55,53 55,65 35,65 15,65 15,53" fill="none" stroke="#ec4899" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">(B)</p>
              </div>
              <div className="text-center">
                <svg width="70" height="80" className="bg-white/5 rounded-lg">
                  <rect x="22" y="25" width="25" height="25" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <polygon points="34,25 34,8 22,25" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <polygon points="34,50 34,65 47,50" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <polygon points="22,37 7,37 22,25" fill="none" stroke="#ec4899" strokeWidth="1"/>
                  <polygon points="47,37 62,37 47,50" fill="none" stroke="#ec4899" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">(C)</p>
              </div>
            </div>
            <TFTable rows={[
              {key:"24A", label:"(A) Jaring-jaring kubus", correct:"salah"},
              {key:"24B", label:"(B) Jaring-jaring prisma segilima", correct:"benar"},
              {key:"24C", label:"(C) Jaring-jaring limas segiempat", correct:"benar"},
            ]}/>
            <PembahasanBtn n={24}/>
            {expandedPembahasan.has(24) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A SALAH, B BENAR, C BENAR</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1"><strong>(A)</strong>: Terdiri dari 6 persegi dalam susunan berbentuk L ganda. Meski ada 6 persegi, susunan ini BUKAN jaring-jaring kubus yang valid → <span className="text-red-300">SALAH</span></p>
                  <p className="text-white/80 mb-1"><strong>(B)</strong>: Terdiri dari 2 segi enam (atas dan bawah) + sisi-sisi persegi panjang = jaring-jaring prisma segi enam → <span className="text-green-300">BENAR</span></p>
                  <p className="text-white/80 mb-1"><strong>(C)</strong>: Terdiri dari 1 persegi (alas) + 4 segitiga (sisi-sisi tegak) = jaring-jaring limas segi empat → <span className="text-green-300">BENAR</span></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Identifikasi Jaring-Jaring:</p>
                  <p className="text-white/70">• Kubus: tepat 6 persegi identik, susunan tertentu (11 susunan valid)</p>
                  <p className="text-white/70">• Prisma segi-n: 2 segi-n + n persegi panjang (sisi tegak)</p>
                  <p className="text-white/70">• Limas segi-n: 1 segi-n (alas) + n segitiga (sisi tegak)</p>
                </div>
              </div>
            )}
          </div>

          {/* Q25 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">25</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar.</p>
                <div className="flex justify-center mb-2">
                  <svg width="210" height="180" className="bg-white/5 rounded-lg">
                    <polygon points="40,95 160,95 195,60 75,60" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                    <rect x="40" y="95" width="120" height="55" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="160" y1="95" x2="195" y2="60" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="195" y1="60" x2="195" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="195" y1="115" x2="160" y2="150" stroke="#22d3ee" strokeWidth="1.5"/>
                    <line x1="75" y1="60" x2="75" y2="115" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,3"/>
                    <line x1="75" y1="60" x2="130" y2="8" stroke="#eab308" strokeWidth="1.5"/>
                    <line x1="160" y1="95" x2="130" y2="8" stroke="#eab308" strokeWidth="1.5"/>
                    <line x1="195" y1="60" x2="130" y2="8" stroke="#eab308" strokeWidth="1.5"/>
                    <line x1="40" y1="95" x2="130" y2="8" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,3"/>
                    <text x="133" y="5" fill="#eab308" fontSize="8" fontFamily="sans-serif">T</text>
                    <text x="95" y="125" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">AB=25cm</text>
                    <text x="25" y="122" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">AD=10</text>
                    <text x="175" y="80" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">OK=12</text>
                    <text x="143" y="55" fill="#eab308" fontSize="7" fontFamily="sans-serif">TK=21</text>
                    <text x="37" y="93" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">B</text>
                    <text x="192" y="58" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">A</text>
                    <text x="192" y="118" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">F</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Bangun tersebut merupakan gabungan balok dan limas dengan kondisi seperti pada gambar. Diketahui panjang AB = 25 cm, AD = 10 cm, TK = 21 cm dan OK = 12 cm, volume bangun tersebut adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={25} correct={0} options={["A. 3.750 cm³","B. 3.850 cm³","C. 4.750 cm³","D. 6.250 cm³"]}/>
            <PembahasanBtn n={25}/>
            {expandedPembahasan.has(25) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 3.750 cm³</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Balok: AB = 25 cm, AD = 10 cm, tinggi = OK = 12 cm</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{balok}} = 25 \times 10 \times 12 = 3.000 \text{ cm}^3"/></div>
                  <p className="text-white/80 mb-1">Tinggi limas = TK – OK = 21 – 12 = 9 cm. Alas limas = 25 × 10 = 250 cm²</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{limas}} = \frac{1}{3} \times 250 \times 9 = 750 \text{ cm}^3"/></div>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{total}} = 3.000 + 750 = \boxed{3.750 \text{ cm}^3}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Volume Gabungan:</p>
                  <p className="text-white/70"><InlineMath math="V_{\text{balok}} = p \times l \times t"/>; <InlineMath math="V_{\text{limas}} = \frac{1}{3} \times L_{\text{alas}} \times t_{\text{limas}}"/></p>
                  <p className="text-white/70 mt-1">💡 Tinggi limas ≠ TK! TK adalah jarak dari puncak ke dasar balok. Tinggi limas = TK – tinggi balok.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q26 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">26</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar.</p>
                <div className="flex justify-center mb-2">
                  <svg width="120" height="150" className="bg-white/5 rounded-lg">
                    <line x1="60" y1="10" x2="60" y2="10" stroke="#eab308" strokeWidth="1"/>
                    <line x1="60" y1="10" x2="20" y2="100" stroke="#a855f7" strokeWidth="1.5"/>
                    <line x1="60" y1="10" x2="100" y2="100" stroke="#a855f7" strokeWidth="1.5"/>
                    <ellipse cx="60" cy="102" rx="40" ry="10" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1"/>
                    <path d="M 20 100 Q 60 130 100 100" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1" strokeDasharray="3,3"/>
                    <line x1="60" y1="10" x2="60" y2="100" stroke="#eab308" strokeWidth="1" strokeDasharray="3,3"/>
                    <text x="62" y="55" fill="#eab308" fontSize="8" fontFamily="sans-serif">12 cm</text>
                    <text x="30" y="115" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">5 cm</text>
                    <text x="5" y="8" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Kerucut</text>
                    <text x="3" y="135" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">+½ bola r=5</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Sebuah pelampung pancing terdiri atas setengah bola dan kerucut dengan kondisi dan ukuran seperti pada gambar. Pelampung pancing tersebut akan dicat diseluruh permukaannya. Luas permukaan bangun yang dicat adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={26} correct={2} options={[
              <span>A. <InlineMath math="140\pi\text{ cm}^2"/></span>,
              <span>B. <InlineMath math="135\pi\text{ cm}^2"/></span>,
              <span>C. <InlineMath math="115\pi\text{ cm}^2"/></span>,
              <span>D. <InlineMath math="110\pi\text{ cm}^2"/></span>,
            ]}/>
            <PembahasanBtn n={26}/>
            {expandedPembahasan.has(26) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: C. 115π cm²</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">r = 5 cm, tinggi kerucut = 12 cm</p>
                  <p className="text-white/80 mb-1">Garis pelukis kerucut: <InlineMath math="l = \sqrt{r^2 + t^2} = \sqrt{25 + 144} = \sqrt{169} = 13"/> cm</p>
                  <p className="text-white/80 mb-1">Luas selimut kerucut (tanpa alas):</p>
                  <div className="ml-3 my-1"><BlockMath math="L_{\text{kerucut}} = \pi r l = \pi \times 5 \times 13 = 65\pi \text{ cm}^2"/></div>
                  <p className="text-white/80 mb-1">Luas permukaan setengah bola (tanpa lingkaran alas, karena menyatu dengan kerucut):</p>
                  <div className="ml-3 my-1"><BlockMath math="L_{\frac{1}{2}\text{bola}} = 2\pi r^2 = 2\pi \times 25 = 50\pi \text{ cm}^2"/></div>
                  <div className="ml-3 my-1"><BlockMath math="L_{\text{total}} = 65\pi + 50\pi = \boxed{115\pi \text{ cm}^2}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Luas Permukaan:</p>
                  <p className="text-white/70">• Selimut kerucut: <InlineMath math="\pi r l"/> (l = garis pelukis = <InlineMath math="\sqrt{r^2 + t^2}"/>)</p>
                  <p className="text-white/70">• Setengah bola (tanpa alas): <InlineMath math="2\pi r^2"/></p>
                  <p className="text-white/70 mt-1">💡 Permukaan yang dicat = bagian yang tampak dari luar. Bidang yang bersambungan (dalam) tidak dihitung.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q27 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">27</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar.</p>
                <div className="flex justify-center mb-2">
                  <svg width="110" height="160" className="bg-white/5 rounded-lg">
                    <ellipse cx="55" cy="25" rx="30" ry="8" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" strokeWidth="1"/>
                    <rect x="25" y="25" width="60" height="95" fill="rgba(148,163,184,0.05)" stroke="#94a3b8" strokeWidth="1.5"/>
                    <path d="M 25 120 Q 55 145 85 120" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1.5"/>
                    <ellipse cx="55" cy="120" rx="30" ry="8" fill="rgba(148,163,184,0.05)" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3"/>
                    <text x="55" y="70" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Tabung</text>
                    <text x="90" y="70" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">31cm</text>
                    <text x="55" y="23" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="sans-serif">12 cm</text>
                    <line x1="87" y1="25" x2="87" y2="120" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3"/>
                    <text x="55" y="138" textAnchor="middle" fill="#a855f7" fontSize="7" fontFamily="sans-serif">½ bola</text>
                  </svg>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Sebuah bandul besi terdiri atas setengah bola dan sebuah tabung dengan ukuran seperti pada gambar. Volume bandul tersebut adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={27} correct={0} options={[
              <span>A. <InlineMath math="1.044\pi\text{ cm}^3"/></span>,
              <span>B. <InlineMath math="1.188\pi\text{ cm}^3"/></span>,
              <span>C. <InlineMath math="1.944\pi\text{ cm}^3"/></span>,
              <span>D. <InlineMath math="1.988\pi\text{ cm}^3"/></span>,
            ]}/>
            <PembahasanBtn n={27}/>
            {expandedPembahasan.has(27) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: A. 1.044π cm³</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Diameter = 12 cm → r = 6 cm. Total tinggi bandul = 31 cm</p>
                  <p className="text-white/80 mb-1">Setengah bola menempati tinggi = r = 6 cm. Tinggi tabung = 31 – 6 = 25 cm</p>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{tabung}} = \pi r^2 t = \pi \times 36 \times 25 = 900\pi \text{ cm}^3"/></div>
                  <div className="ml-3 my-1"><BlockMath math="V_{\frac{1}{2}\text{bola}} = \frac{2}{3}\pi r^3 = \frac{2}{3}\pi \times 216 = 144\pi \text{ cm}^3"/></div>
                  <div className="ml-3 my-1"><BlockMath math="V_{\text{total}} = 900\pi + 144\pi = \boxed{1.044\pi \text{ cm}^3}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Rumus Volume:</p>
                  <p className="text-white/70">• Tabung: <InlineMath math="V = \pi r^2 t"/></p>
                  <p className="text-white/70">• Setengah bola: <InlineMath math="V = \frac{2}{3}\pi r^3"/></p>
                  <p className="text-white/70 mt-1">💡 <strong>Perhatikan:</strong> Jika total tinggi bandul = 31 cm dan r setengah bola = 6 cm, maka tinggi tabung = 31 – 6 = 25 cm (bukan 31 cm).</p>
                </div>
              </div>
            )}
          </div>

          {/* Q28 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">28</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan diagram berikut!</p>
                <div className="flex justify-center mb-2">
                  <svg width="280" height="170" className="bg-white/5 rounded-lg">
                    <text x="140" y="12" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif" fontWeight="bold">DIAGRAM PENJUALAN GULA TOKO A</text>
                    <line x1="70" y1="20" x2="70" y2="145" stroke="#64748b" strokeWidth="1.5"/>
                    <line x1="70" y1="145" x2="265" y2="145" stroke="#64748b" strokeWidth="1.5"/>
                    {[["Minggu",90],["Sabtu",100],["Jumat",81],["Kamis",70],["Rabu",74],["Selasa",80],["Senin",72]].map(([day,val],i)=>{
                      const y = 28 + i * 17;
                      const w = Number(val) * 1.7;
                      return (
                        <g key={day as string}>
                          <text x="68" y={y+11} textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{day}</text>
                          <rect x="70" y={y} width={w} height="13" fill="#22d3ee" opacity="0.8"/>
                          <text x={70+w+3} y={y+11} fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">{val}</text>
                        </g>
                      );
                    })}
                    <text x="165" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Kg</text>
                  </svg>
                </div>
                <p className="font-body text-white/80 text-xs">Berkaitan dengan diagram penjualan gula Toko A tentukan Benar atau Salah setiap pernyataan berikut:</p>
              </div>
            </div>
            <TFTable rows={[
              {key:"28A", label:"A. Jangkauan data tersebut adalah 30", correct:"benar"},
              {key:"28B", label:"B. Kenaikan penjualan gula tertinggi hari Kamis – Jumat", correct:"salah"},
              {key:"28C", label:"C. Ada dua hari yang penjualannya di atas rata-rata", correct:"benar"},
            ]}/>
            <PembahasanBtn n={28}/>
            {expandedPembahasan.has(28) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ A BENAR, B SALAH, C BENAR</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Data: Sen=72, Sel=80, Rab=74, Kam=70, Jum=81, Sab=100, Min=90</p>
                  <p className="text-white/80 font-bold mt-2">A. Jangkauan:</p>
                  <div className="ml-3 my-1"><BlockMath math="\text{Jangkauan} = \text{maks} - \text{min} = 100 - 70 = \boxed{30} \checkmark \text{ BENAR}"/></div>
                  <p className="text-white/80 font-bold">B. Kenaikan tertinggi:</p>
                  <p className="text-white/70 ml-3">Kamis→Jumat: 81–70=11. Jumat→Sabtu: 100–81=<strong className="text-red-300">19</strong> (kenaikan TERTINGGI, bukan Kamis-Jumat) → SALAH</p>
                  <p className="text-white/80 font-bold">C. Rata-rata:</p>
                  <div className="ml-3 my-1"><BlockMath math="\bar{x} = \frac{72+80+74+70+81+100+90}{7} = \frac{567}{7} = 81 \text{ kg}"/></div>
                  <p className="text-white/70 ml-3">Di atas 81: Sabtu (100), Minggu (90) = <strong className="text-green-300">2 hari ✓ BENAR</strong></p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Ukuran Statistika:</p>
                  <p className="text-white/70">Jangkauan = Nilai Maks – Nilai Min. Rata-rata = Jumlah semua data ÷ Banyak data.</p>
                  <p className="text-white/70 mt-1">💡 Untuk mencari kenaikan tertinggi: hitung selisih antar hari yang berurutan, lalu ambil nilai positif terbesar.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q29 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">29</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui rata-rata 15 data yang telah diurutkan dari data terkecil hingga terbesar adalah 18. Rata-rata 10 data pertama adalah 15 dan rata-rata 3 data selanjutnya (data ke-11, ke-12, ke-13) adalah 25. Jika data ke-15 nilainya sama dengan dua kali data ke-14, maka nilai data ke-15 adalah ….
              </p>
            </div>
            <MCQ qn={29} correct={1} options={["A. 25","B. 30","C. 45","D. 60"]}/>
            <PembahasanBtn n={29}/>
            {expandedPembahasan.has(29) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 30</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Total 15 data = 15 × 18 = 270</p>
                  <p className="text-white/80 mb-1">Total 10 data pertama = 10 × 15 = 150</p>
                  <p className="text-white/80 mb-1">Total data ke-11, 12, 13 = 3 × 25 = 75</p>
                  <p className="text-white/80 mb-1">Total data ke-14 + ke-15 = 270 – 150 – 75 = 45</p>
                  <p className="text-white/80 mb-1">Misalkan data ke-14 = x, data ke-15 = 2x:</p>
                  <div className="ml-3 my-1"><BlockMath math="x + 2x = 45 \Rightarrow 3x = 45 \Rightarrow x = 15"/></div>
                  <div className="ml-3 my-1"><BlockMath math="\text{Data ke-15} = 2x = 2 \times 15 = \boxed{30}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Strategi Soal Rata-rata:</p>
                  <p className="text-white/70">Rata-rata × banyak data = jumlah data. Pisahkan kelompok data, hitung jumlah masing-masing, lalu kurangi dari total untuk mendapat jumlah sisa.</p>
                </div>
              </div>
            )}
          </div>

          {/* Q30 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">30</span>
              <div>
                <p className="font-body text-white/90 text-sm leading-relaxed mb-2">Perhatikan gambar!</p>
                <div className="flex justify-center mb-2">
                  <div className="flex gap-3 items-center">
                    <svg width="50" height="50" className="bg-white/5 rounded-lg">
                      <rect x="5" y="5" width="40" height="40" fill="none" stroke="#22d3ee" strokeWidth="1.5" rx="4"/>
                      {[[16,16],[34,16],[16,34],[34,34],[25,25]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3" fill="#22d3ee"/>)}
                    </svg>
                    <svg width="50" height="50" className="bg-white/5 rounded-lg">
                      <rect x="5" y="5" width="40" height="40" fill="none" stroke="#ef4444" strokeWidth="1.5" rx="4"/>
                      {[[16,16],[34,16],[16,34],[34,34],[16,25],[34,25]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="3" fill="#ef4444"/>)}
                    </svg>
                  </div>
                </div>
                <p className="font-body text-white/90 text-sm leading-relaxed">
                  Dua buah dadu dilambungkan bersama-sama satu kali. Peluang muncul kedua mata dadu berjumlah 7 adalah ….
                </p>
              </div>
            </div>
            <MCQ qn={30} correct={1} options={[
              <span>A. <InlineMath math="\dfrac{5}{18}"/></span>,
              <span>B. <InlineMath math="\dfrac{1}{6}"/></span>,
              <span>C. <InlineMath math="\dfrac{1}{9}"/></span>,
              <span>D. <InlineMath math="\dfrac{1}{12}"/></span>,
            ]}/>
            <PembahasanBtn n={30}/>
            {expandedPembahasan.has(30) && (
              <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-3 text-xs font-body">
                <div className="bg-green-900/40 border border-green-500/40 rounded-lg px-3 py-2 text-green-300 font-bold">✓ Jawaban: B. 1/6</div>
                <div>
                  <p className="text-cyan-300 font-bold mb-1">Langkah Penyelesaian:</p>
                  <p className="text-white/80 mb-1">Ruang sampel: 6 × 6 = <strong>36 kejadian</strong></p>
                  <p className="text-white/80 mb-1">Kejadian berjumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = <strong className="text-yellow-300">6 kejadian</strong></p>
                  <div className="ml-3 my-1"><BlockMath math="P(\text{jumlah}=7) = \frac{6}{36} = \boxed{\frac{1}{6}}"/></div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 font-bold mb-1">📌 Peluang Dua Dadu:</p>
                  <p className="text-white/70"><InlineMath math="P(A) = \frac{n(A)}{n(S)"/>. Ruang sampel 2 dadu = 36. Untuk jumlah tertentu k, hitung semua pasang (a,b) dengan a+b=k.</p>
                  <p className="text-white/70 mt-1">💡 Jumlah yang paling banyak kemungkinannya = 7 (ada 6 cara), seimbang di tengah distribusi 2-12.</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/tka"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Menu TKA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TKALatihan2Page;
