import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronRight, Lightbulb, Calculator, Target, Plus, Minus } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const PenjumlahanPenguranganBentukDesimalPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    playPopSound();
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-4xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          PENJUMLAHAN DAN PENGURANGAN BENTUK DESIMAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-8 font-body">
          Kelas 7 - Bilangan Rasional
        </p>

        {/* Sub-bab 1: Penjumlahan Bentuk Desimal */}
        <div className="mb-6 animate-slide-up">
          <button
            onClick={() => toggleSection(0)}
            className="w-full group flex items-center gap-4 bg-card/90 backdrop-blur border border-border rounded-xl px-5 py-4
              hover:border-primary/60 transition-all duration-300 cursor-pointer text-left"
          >
            <Plus className="w-5 h-5 text-green-400 shrink-0" />
            <span className="font-body text-base text-white font-semibold">Penjumlahan Bentuk Desimal</span>
            <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-transform ${activeSection === 0 ? 'rotate-90' : ''}`} />
          </button>

          {activeSection === 0 && (
            <div className="mt-3 bg-card/70 backdrop-blur border border-border rounded-xl px-5 py-6 space-y-5 animate-slide-up">
              {/* Ringkasan Intisari */}
              <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Ringkasan Intisari
                </h3>
                <p className="text-white/90 text-sm font-body leading-relaxed">
                  Penjumlahan bilangan desimal dilakukan dengan cara <strong>menyusun angka secara vertikal</strong> dengan
                  tanda koma lurus ke bawah, lalu menjumlahkan kolom per kolom dari kanan ke kiri, persis seperti
                  menjumlahkan bilangan bulat biasa!
                </p>
              </div>

              {/* Langkah-langkah */}
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Langkah-Langkah Penjumlahan Desimal
                </h4>
                <ol className="space-y-2 text-white/80 text-sm font-body list-decimal list-inside">
                  <li>Susun bilangan secara vertikal dengan <strong>tanda koma sejajar</strong>.</li>
                  <li>Tambahkan nol di belakang koma jika jumlah digit desimal berbeda.</li>
                  <li>Jumlahkan kolom per kolom dari kanan ke kiri (seperti bilangan bulat).</li>
                  <li>Beri tanda koma pada hasil di posisi yang sama.</li>
                </ol>
              </div>

              {/* Contoh Soal */}
              <div className="border-t border-border pt-4">
                <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                </p>

                {/* Contoh 1 - Mudah */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Hitunglah <InlineMath math="3{,}25 + 1{,}4" />
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Susun secara vertikal, koma sejajar. Tambahkan nol pada 1,4 menjadi 1,40:</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;3,25</p>
                        <p>+ 1,40</p>
                        <p className="border-t border-white/30 mt-1">= 4,65</p>
                      </div>
                      <p><strong>Langkah 2:</strong> Jumlahkan kolom per kolom:</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="3{,}25 + 1{,}40 = 4{,}65" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, <InlineMath math="3{,}25 + 1{,}4 = 4{,}65" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - Sedang */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Hitunglah <InlineMath math="12{,}375 + 8{,}9 + 0{,}025" />
                    </p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Samakan jumlah digit desimal (3 angka), tambahkan nol yang diperlukan:</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;12,375</p>
                        <p>&nbsp;&nbsp;&nbsp;8,900</p>
                        <p>+&nbsp;&nbsp;0,025</p>
                        <p className="border-t border-white/30 mt-1">= 21,300</p>
                      </div>
                      <p><strong>Hasil akhir</strong> (nol di belakang bisa dihilangkan):</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="12{,}375 + 8{,}9 + 0{,}025 = 21{,}3" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, hasilnya adalah <InlineMath math="21{,}3" /></p>
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
                    <p className="font-body text-sm text-white">
                      Seorang pedagang membeli beras sebanyak <InlineMath math="12{,}5" /> kg, gula <InlineMath math="8{,}75" /> kg,
                      dan tepung <InlineMath math="5{,}25" /> kg. Berapa kg total belanjaan pedagang tersebut?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tulis persamaan:</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="\text{Total} = 12{,}5 + 8{,}75 + 5{,}25" />
                      </div>
                      <p><strong>Langkah 2:</strong> Susun vertikal dan samakan digit desimal:</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;12,50</p>
                        <p>&nbsp;&nbsp;&nbsp;8,75</p>
                        <p>+&nbsp;&nbsp;5,25</p>
                        <p className="border-t border-white/30 mt-1">= 26,50</p>
                      </div>
                      <p className="text-primary font-semibold">Jadi, total belanjaan pedagang adalah <InlineMath math="26{,}5" /> kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sub-bab 2: Pengurangan Bentuk Desimal */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <button
            onClick={() => toggleSection(1)}
            className="w-full group flex items-center gap-4 bg-card/90 backdrop-blur border border-border rounded-xl px-5 py-4
              hover:border-primary/60 transition-all duration-300 cursor-pointer text-left"
          >
            <Minus className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-body text-base text-white font-semibold">Pengurangan Bentuk Desimal</span>
            <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-transform ${activeSection === 1 ? 'rotate-90' : ''}`} />
          </button>

          {activeSection === 1 && (
            <div className="mt-3 bg-card/70 backdrop-blur border border-border rounded-xl px-5 py-6 space-y-5 animate-slide-up">
              {/* Ringkasan Intisari */}
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Ringkasan Intisari
                </h3>
                <p className="text-white/90 text-sm font-body leading-relaxed">
                  Pengurangan bilangan desimal caranya sama seperti penjumlahan, yaitu dengan <strong>menyusun angka secara
                  vertikal</strong> dan menjajarkan tanda koma. Lalu kurangkan kolom per kolom dari kanan ke kiri,
                  dengan meminjam nilai dari kolom sebelah kiri jika perlu.
                </p>
              </div>

              {/* Langkah-langkah */}
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Langkah-Langkah Pengurangan Desimal
                </h4>
                <ol className="space-y-2 text-white/80 text-sm font-body list-decimal list-inside">
                  <li>Susun bilangan secara vertikal dengan <strong>tanda koma sejajar</strong>.</li>
                  <li>Tambahkan nol di belakang koma jika jumlah digit desimal berbeda.</li>
                  <li>Kurangkan kolom per kolom dari kanan ke kiri.</li>
                  <li>Jika kolom atas lebih kecil, <strong>pinjam</strong> nilai dari kolom sebelah kirinya.</li>
                  <li>Beri tanda koma pada hasil di posisi yang sama.</li>
                </ol>
              </div>

              {/* Contoh Soal */}
              <div className="border-t border-border pt-4">
                <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                </p>

                {/* Contoh 1 - Mudah */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Hitunglah <InlineMath math="7{,}8 - 3{,}45" />
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Samakan digit desimal: 7,8 menjadi 7,80</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;7,80</p>
                        <p>- 3,45</p>
                        <p className="border-t border-white/30 mt-1">= 4,35</p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="7{,}80 - 3{,}45 = 4{,}35" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, <InlineMath math="7{,}8 - 3{,}45 = 4{,}35" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - Sedang */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Hitunglah <InlineMath math="15{,}03 - 6{,}785" />
                    </p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Samakan digit desimal: 15,03 menjadi 15,030</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;15,030</p>
                        <p>-&nbsp;&nbsp;6,785</p>
                        <p className="border-t border-white/30 mt-1">=&nbsp;&nbsp;8,245</p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="15{,}030 - 6{,}785 = 8{,}245" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, <InlineMath math="15{,}03 - 6{,}785 = 8{,}245" /></p>
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
                    <p className="font-body text-sm text-white">
                      Sebuah tali panjangnya <InlineMath math="24{,}5" /> m. Dipotong sepanjang <InlineMath math="9{,}75" /> m
                      untuk pagar, lalu dipotong lagi <InlineMath math="6{,}325" /> m untuk jemuran. Berapa meter sisa tali?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tulis persamaan:</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="\text{Sisa} = 24{,}5 - 9{,}75 - 6{,}325" />
                      </div>
                      <p><strong>Langkah 2:</strong> Kurangkan pertama:</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;24,500</p>
                        <p>-&nbsp;&nbsp;9,750</p>
                        <p className="border-t border-white/30 mt-1">= 14,750</p>
                      </div>
                      <p><strong>Langkah 3:</strong> Kurangkan kedua:</p>
                      <div className="bg-slate-900/50 rounded p-3 font-mono text-center text-white">
                        <p>&nbsp;&nbsp;14,750</p>
                        <p>-&nbsp;&nbsp;6,325</p>
                        <p className="border-t border-white/30 mt-1">=&nbsp;&nbsp;8,425</p>
                      </div>
                      <p className="text-primary font-semibold">Jadi, sisa tali adalah <InlineMath math="8{,}425" /> m</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sub-bab 3: Gabungan Penjumlahan dan Pengurangan */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <button
            onClick={() => toggleSection(2)}
            className="w-full group flex items-center gap-4 bg-card/90 backdrop-blur border border-border rounded-xl px-5 py-4
              hover:border-primary/60 transition-all duration-300 cursor-pointer text-left"
          >
            <Calculator className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="font-body text-base text-white font-semibold">Gabungan Penjumlahan dan Pengurangan</span>
            <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-transform ${activeSection === 2 ? 'rotate-90' : ''}`} />
          </button>

          {activeSection === 2 && (
            <div className="mt-3 bg-card/70 backdrop-blur border border-border rounded-xl px-5 py-6 space-y-5 animate-slide-up">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Aturan Penting
                </h3>
                <p className="text-white/90 text-sm font-body leading-relaxed">
                  Jika dalam satu soal terdapat operasi penjumlahan <strong>dan</strong> pengurangan sekaligus,
                  kerjakan dari <strong>kiri ke kanan</strong> secara berurutan, karena kedua operasi ini
                  memiliki tingkat prioritas yang sama.
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                </p>

                {/* Contoh 1 - Mudah */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Hitunglah <InlineMath math="5{,}6 + 2{,}4 - 3{,}1" />
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Kerjakan dari kiri ke kanan:</strong></p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="5{,}6 + 2{,}4 - 3{,}1 = 8{,}0 - 3{,}1 = 4{,}9" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, hasilnya adalah <InlineMath math="4{,}9" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - Sulit */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Suhu pagi hari <InlineMath math="18{,}5°C" />. Siang hari naik <InlineMath math="7{,}35°C" />,
                      lalu sore hari turun <InlineMath math="4{,}8°C" />. Berapa suhu pada sore hari?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tulis persamaan:</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="\text{Suhu sore} = 18{,}5 + 7{,}35 - 4{,}8" />
                      </div>
                      <p><strong>Langkah 2:</strong> Hitung dari kiri ke kanan:</p>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="18{,}50 + 7{,}35 = 25{,}85" />
                      </div>
                      <div className="bg-slate-900/50 rounded p-3 text-center">
                        <BlockMath math="25{,}85 - 4{,}80 = 21{,}05" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, suhu sore hari adalah <InlineMath math="21{,}05°C" /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-7/bilangan-rasional"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Bilangan Rasional
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenjumlahanPenguranganBentukDesimalPage;
