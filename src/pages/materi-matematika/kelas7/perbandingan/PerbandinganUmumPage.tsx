import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target, Star } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const PerbandinganUmumPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(["intro", "konsep", "bertingkat", "contoh"]);

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
          PERBANDINGAN UMUM, SATUAN PEMBANDING & RASIO
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          Kelas 7 - Perbandingan - Materi Matematika
        </p>

        <div className="flex flex-col gap-4 animate-slide-up">

          {/* SECTION: PENGANTAR */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("intro")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-body font-semibold text-white">Apa Itu Perbandingan?</span>
              </div>
              {expandedSections.includes("intro") ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
            </button>
            {expandedSections.includes("intro") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Setiap hari tanpa sadar kita sering membandingkan sesuatu — harga yang lebih murah, jarak yang lebih dekat, atau porsi yang lebih besar.
                  Dalam matematika, membandingkan dua hal bisa dilakukan dengan dua cara berbeda.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="font-body text-sm font-semibold text-blue-300 mb-2">Cara 1: Selisih</p>
                    <p className="font-body text-sm text-white/70">
                      Melihat <strong>berapa bedanya</strong>. Contoh: Berat Dewa 40 kg, Eka 60 kg. Eka lebih berat <strong className="text-blue-300">20 kg</strong> dari Dewa.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="font-body text-sm font-semibold text-purple-300 mb-2">Cara 2: Hasil Bagi (Rasio)</p>
                    <p className="font-body text-sm text-white/70">
                      Melihat <strong>berapa kali lipatnya</strong>. Contoh: Berat Dewa : Eka = 40 : 60 = <strong className="text-purple-300">2 : 3</strong>.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200 leading-relaxed">
                    <strong>Catatan Penting:</strong> Dalam matematika, ketika soal meminta <strong>"perbandingan"</strong>, yang dimaksud hampir selalu adalah <strong>hasil bagi (rasio)</strong>, bukan selisih. Pastikan satuannya sama sebelum membandingkan!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION: RINGKASAN INTISARI */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("konsep")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="font-body font-semibold text-white">Ringkasan Intisari: Rasio & Satuan Pembanding</span>
              </div>
              {expandedSections.includes("konsep") ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
            </button>
            {expandedSections.includes("konsep") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  <strong className="text-primary">Rasio</strong> adalah cara menyatakan perbandingan dua atau lebih besaran menggunakan tanda titik dua (<InlineMath math=":" />).
                  Rasio harus disederhanakan ke bentuk paling sederhana, seperti menyederhanakan pecahan.
                </p>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-3">Rumus Perbandingan Dua Besaran:</p>
                  <div className="bg-slate-900/50 rounded p-3 text-center">
                    <BlockMath math="\text{Perbandingan} = \frac{a}{b} = a : b" />
                  </div>
                  <p className="font-body text-xs text-white/60 mt-2">Syarat: <InlineMath math="a" /> dan <InlineMath math="b" /> harus memiliki satuan yang <strong>sama</strong>.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2">Satuan Pembanding</p>
                  <p className="font-body text-sm text-white/70 leading-relaxed">
                    Angka yang digunakan untuk menyederhanakan perbandingan disebut <strong className="text-green-300">satuan pembanding</strong> (atau FPB dari kedua nilai).
                    Contoh: 40 : 60, FPB-nya adalah 20. Jadi satuan pembandingnya 20, dan rasionya menjadi <InlineMath math="2 : 3" />.
                  </p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-2">Rasio Lebih dari Dua Besaran (Bertingkat)</p>
                  <p className="font-body text-sm text-white/70 leading-relaxed">
                    Perbandingan bisa melibatkan tiga atau lebih objek, ditulis <InlineMath math="a : b : c" />.
                    Untuk membagi total berdasarkan rasio, gunakan rumus:
                  </p>
                  <div className="bg-slate-900/50 rounded p-3 mt-2">
                    <BlockMath math="\text{Bagian}_x = \frac{\text{angka rasio}_x}{\text{total rasio}} \times \text{total nilai}" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION: PERBANDINGAN BERTINGKAT */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("bertingkat")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-cyan-400" />
                <span className="font-body font-semibold text-white">Konsep Khusus: Perbandingan Bertingkat</span>
              </div>
              {expandedSections.includes("bertingkat") ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
            </button>
            {expandedSections.includes("bertingkat") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  <strong className="text-primary">Perbandingan bertingkat</strong> muncul saat kita punya dua perbandingan terpisah yang terhubung melalui satu variabel perantara.
                  Trik utamanya: samakan nilai variabel perantara menggunakan <strong className="text-cyan-300">KPK</strong>.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-white/60 mb-3">LANGKAH-LANGKAH:</p>
                  <div className="space-y-2 font-body text-sm text-white/80">
                    <p><strong className="text-cyan-300">Langkah 1:</strong> Temukan variabel perantara (variabel yang muncul di kedua perbandingan).</p>
                    <p><strong className="text-cyan-300">Langkah 2:</strong> Cari KPK dari angka variabel perantara di kedua perbandingan.</p>
                    <p><strong className="text-cyan-300">Langkah 3:</strong> Kalikan masing-masing perbandingan agar variabel perantara nilainya sama (= KPK).</p>
                    <p><strong className="text-cyan-300">Langkah 4:</strong> Gabungkan menjadi satu rasio <InlineMath math="A : B : C" /> lalu hitung.</p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Tips:</strong> Jika soal menyebutkan <strong>jumlah total</strong>, gunakan total rasio untuk membagi. Jika soal menyebutkan <strong>selisih</strong>, gunakan selisih angka rasio untuk membagi.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION: CONTOH SOAL */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("contoh")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-blue-400" />
                <span className="font-body font-semibold text-white">Contoh Soal dan Pembahasan</span>
              </div>
              {expandedSections.includes("contoh") ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
            </button>
            {expandedSections.includes("contoh") && (
              <div className="px-5 pb-5 space-y-6">

                {/* Contoh 1 - MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1 – Menyederhanakan Rasio</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Panjang sebuah kolam renang adalah 25 meter dan lebarnya 10 meter. Nyatakan perbandingan panjang terhadap lebar dalam bentuk paling sederhana!
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Pastikan satuan sama (keduanya meter ✓).</p>
                      <p><strong>Langkah 2:</strong> Tulis rasionya: <InlineMath math="25 : 10" /></p>
                      <p><strong>Langkah 3:</strong> Cari FPB dari 25 dan 10. FPB = 5.</p>
                      <div className="bg-slate-900/50 rounded p-3 mt-2">
                        <BlockMath math="25 : 10 = \frac{25}{5} : \frac{10}{5} = 5 : 2" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, perbandingan panjang terhadap lebar = <InlineMath math="5 : 2" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - SEDANG */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2 – Membagi dengan Rasio</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Perbandingan panjang dan lebar sebuah lapangan adalah <InlineMath math="5 : 3" />. Jika kelilingnya 64 meter, tentukan panjang dan lebar lapangan tersebut!
                    </p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Misalkan panjang <InlineMath math="p = 5x" /> dan lebar <InlineMath math="l = 3x" />.</p>
                      <p><strong>Langkah 2:</strong> Gunakan rumus keliling persegi panjang:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="K = 2(p + l) = 2(5x + 3x) = 2 \times 8x = 16x" />
                      </div>
                      <p><strong>Langkah 3:</strong> Samakan dengan keliling yang diketahui:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="16x = 64 \Rightarrow x = 4 \text{ meter}" />
                      </div>
                      <p><strong>Langkah 4:</strong> Hitung ukuran sebenarnya:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="p = 5 \times 4 = 20 \text{ m}, \quad l = 3 \times 4 = 12 \text{ m}" />
                      </div>
                      <p className="text-primary font-semibold">Panjang = 20 m, Lebar = 12 m. Cek keliling: <InlineMath math="2(20+12)=64" /> ✓</p>
                    </div>
                  </div>
                </div>

                {/* Contoh 3 - SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3 – Perbandingan Bertingkat</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white">
                      Perbandingan kelereng Anto dan Budi adalah <InlineMath math="2 : 3" />, sedangkan perbandingan kelereng Budi dan Cepi adalah <InlineMath math="4 : 5" />.
                      Jika selisih kelereng Anto dan Cepi adalah 14 butir, berapakah kelereng masing-masing?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Variabel perantara = Budi (muncul di kedua perbandingan, nilainya 3 dan 4).</p>
                      <p><strong>Langkah 2:</strong> KPK(3, 4) = 12. Sesuaikan:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <p className="text-white/70 text-xs mb-1">Anto : Budi → dikali 4 →</p>
                        <BlockMath math="8 : 12" />
                        <p className="text-white/70 text-xs mb-1">Budi : Cepi → dikali 3 →</p>
                        <BlockMath math="12 : 15" />
                      </div>
                      <p><strong>Langkah 3:</strong> Gabung → Anto : Budi : Cepi = <InlineMath math="8 : 12 : 15" /></p>
                      <p><strong>Langkah 4:</strong> Selisih Anto dan Cepi: <InlineMath math="15 - 8 = 7" /> bagian = 14 butir.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="1 \text{ bagian} = \frac{14}{7} = 2 \text{ butir}" />
                      </div>
                      <p><strong>Langkah 5:</strong> Hitung masing-masing:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\text{Anto} = 8 \times 2 = 16 \text{ butir}" />
                        <BlockMath math="\text{Budi} = 12 \times 2 = 24 \text{ butir}" />
                        <BlockMath math="\text{Cepi} = 15 \times 2 = 30 \text{ butir}" />
                      </div>
                      <p className="text-primary font-semibold">Cek: Selisih Cepi – Anto = <InlineMath math="30 - 16 = 14" /> ✓</p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-7/perbandingan"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Perbandingan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerbandinganUmumPage;
