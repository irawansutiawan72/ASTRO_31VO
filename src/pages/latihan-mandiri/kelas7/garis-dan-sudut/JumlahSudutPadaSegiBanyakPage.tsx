import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import imgPicture11 from "@assets/Picture11_1774844542359.png";

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
          <p className="text-yellow-400 text-sm mb-4 font-body">Tentukan nilai sudut yang belum diketahui pada bangun datar berikut.</p>
          <img src={imgPicture11} alt="Soal Isian Pendek" className="w-full max-w-xl mx-auto mt-2" />
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
