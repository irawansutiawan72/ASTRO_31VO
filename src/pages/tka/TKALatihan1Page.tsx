import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const TKALatihan1Page = () => {
  const navigate = useNavigate();

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
            <div className="bg-white/5 rounded-lg p-2"><span className="text-white/40">Paket:</span><span className="text-accent ml-1 font-bold">PAKET A</span></div>
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
            <div className="grid grid-cols-2 gap-2">
              {["A. 90","B. 93","C. 96","D. 108"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q2 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">2</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui bilangan-bilangan berikut: <InlineMath math="\frac{1}{2};\; 1{,}2;\; 1\frac{1}{4};\; 70\%" />. Letak bilangan-bilangan tersebut pada garis bilangan yang tepat adalah ….
              </p>
            </div>
            {/* Number line options */}
            {["A","B","C","D"].map((opt, idx) => {
              const configs = [
                // A: 70% < 1/2 < 1.2 < 1 1/4
                [
                  {label:"70%", x:30}, {label:"½", x:95}, {label:"1,2", x:165}, {label:"1¼", x:225}
                ],
                // B: 1/2 < 1 1/4 < 70% < 1.2
                [
                  {label:"½", x:30}, {label:"1¼", x:95}, {label:"70%", x:165}, {label:"1,2", x:225}
                ],
                // C: 1/2 < 70% < 1.2 < 1 1/4
                [
                  {label:"½", x:30}, {label:"70%", x:95}, {label:"1,2", x:165}, {label:"1¼", x:225}
                ],
                // D: 1/2 < 70% < 1 1/4 < 1.2
                [
                  {label:"½", x:30}, {label:"70%", x:95}, {label:"1¼", x:155}, {label:"1,2", x:225}
                ],
              ];
              return (
                <div key={opt} className="flex items-center gap-3 mb-2">
                  <span className="text-white/60 font-body text-xs w-4">{opt}.</span>
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
                </div>
              );
            })}
          </div>

          {/* Q3 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">3</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui tiga bilangan 240, 360, dan 450. Faktor persekutuan terbesar dari ketiga bilangan tersebut adalah ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">A. <InlineMath math="2^2 \cdot 3^2 \cdot 5^2"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">B. <InlineMath math="2^2 \cdot 3^2 \cdot 5"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">C. <InlineMath math="2 \cdot 3^2 \cdot 5"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">D. <InlineMath math="2 \cdot 3 \cdot 5"/></div>
            </div>
          </div>

          {/* Q4 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">4</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar salah satu sisi dinding rumah berikut!</p>
            </div>
            {/* Wall diagram */}
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
            <div className="grid grid-cols-1 gap-2">
              {["A. 4 kemasan B dan 1 kemasan A","B. 3 kemasan B dan 2 kemasan A","C. 2 kemasan B dan 3 kemasan A","D. 1 kemasan B dan 3 kemasan A"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q5 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">5</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan denah rumah berikut!</p>
            </div>
            {/* Floor plan SVG */}
            <div className="flex justify-center mb-3">
              <svg width="280" height="200" className="bg-white/5 rounded-lg p-2">
                {/* Outer boundary 16x10 */}
                <rect x="20" y="20" width="240" height="160" fill="none" stroke="#22d3ee" strokeWidth="2"/>
                {/* Rooms */}
                {/* Kamar Tidur 1 - top left */}
                <rect x="20" y="20" width="90" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="65" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Kamar</text>
                <text x="65" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Tidur 1</text>
                <text x="65" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3×3</text>
                {/* Kamar Tidur 2 - top middle */}
                <rect x="110" y="20" width="90" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="155" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Kamar</text>
                <text x="155" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Tidur 2</text>
                <text x="155" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3×3</text>
                {/* Kamar Mandi */}
                <rect x="200" y="20" width="60" height="75" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="230" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">K.</text>
                <text x="230" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Mandi</text>
                {/* Ruang Tamu bottom left */}
                <rect x="20" y="95" width="110" height="85" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="75" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Ruang Tamu</text>
                {/* Dapur bottom right */}
                <rect x="130" y="95" width="130" height="85" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="195" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">Dapur / Garasi</text>
                {/* Dimension labels */}
                <text x="140" y="195" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">16 cm (skala 1:50)</text>
                <text x="8" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,8,100)">10 cm</text>
              </svg>
            </div>
            <p className="font-body text-white/80 text-xs mb-3 leading-relaxed">
              Denah tersebut digambar dengan skala 1 : 50 dan satuan angka pada gambar adalah cm. Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar:
            </p>
            <div className="flex flex-col gap-2">
              {[
                "1. Luas Kamar Tidur 1 dan 2 sebenarnya 18 m²",
                "2. Luas seluruh lahan sebenarnya 400 m²",
                "3. Keliling seluruh lahan sebenarnya 41 m",
                "4. Keliling garasi sebenarnya 38 m",
              ].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q6 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">6</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Seorang peternak memiliki 200 ekor ayam dan menyediakan pakan yang cukup untuk 30 hari. Setelah 12 hari berjalan, peternak tersebut menjual 50 ekor ayamnya. Sisa pakan yang tersedia akan habis dalam waktu ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 18 hari","B. 24 hari","C. 30 hari","D. 32 hari"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q7 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">7</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Di sebuah toko buah, harga 5 kilogram jeruk Rp120.000,00. Jika Ibu memiliki uang Rp250.000,00 dan akan membeli 9 kilogram jeruk yang sama, maka uang kembalian yang diterima Ibu adalah …..
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. Rp34.000,00","B. Rp32.000,00","C. Rp25.000,00","D. Rp10.000,00"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
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
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(1) <InlineMath math="A + B = 5\sqrt{2} + 2"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(2) <InlineMath math="A - B = \sqrt{2} + 8"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(3) <InlineMath math="A \times B = 2 - 3"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Q9 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">9</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar beberapa strategi potongan harga dari empat toko berikut! Paman ingin membeli 3 buah baju yang sama di salah satu toko tersebut. Agar mendapatkan harga total termurah, toko yang dipilih Paman adalah ….
              </p>
            </div>
            {/* Store discount cards */}
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
            <div className="grid grid-cols-2 gap-2">
              {["A. Toko Merapi","B. Toko Merbabu","C. Toko Himalaya","D. Toko Suralaya"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q10 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">10</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui persamaan <InlineMath math="4(2x+3)-13=5x+8"/>. Nilai dari <InlineMath math="6x+5"/> adalah ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 3","B. 13","C. 21","D. 23"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q11 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">11</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Aldi memiliki uang sebesar Rp100.000,00 yang akan digunakan untuk membeli buku dan pulpen. Biaya perjalanan menuju toko Rp8.000,00. Harga sebuah buku Rp9.000,00 dan harga sebuah pulpen Rp7.000,00. Jika Aldi membeli 3 pulpen, maka jumlah maksimal buku yang dapat dibeli adalah ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 6 buah","B. 7 buah","C. 8 buah","D. 9 buah"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
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
            <div className="flex flex-col gap-2">
              {[
                "1. Harga 1 kg bawang merah adalah Rp47.000,00.",
                "2. Harga 1 kg cabai merah adalah Rp60.000,00.",
                "3. Harga 1 kg bawang merah dan 2 kg cabai merah adalah Rp165.000,00.",
                "4. Selisih harga 1 kg cabai merah dan 1 kg bawang merah adalah Rp15.000,00.",
              ].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q13 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">13</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar! Luas daerah trapesium tersebut adalah ….</p>
            </div>
            {/* Trapezoid SVG */}
            <div className="flex justify-center mb-3">
              <svg width="260" height="120" className="bg-white/5 rounded-lg">
                <polygon points="40,100 220,100 190,20 70,20" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                {/* Labels */}
                <text x="130" y="15" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(2x+4) cm</text>
                <text x="130" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(2x+8) cm</text>
                <text x="20" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">(x+2)</text>
                <text x="20" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">cm</text>
                {/* Height arrow */}
                <line x1="130" y1="20" x2="130" y2="100" stroke="#eab308" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="138" y="65" fill="#eab308" fontSize="9" fontFamily="sans-serif">t</text>
              </svg>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">A. <InlineMath math="(2x^2 + 7x + 6)\text{ cm}^2"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">B. <InlineMath math="(2x^2 + 8x + 8)\text{ cm}^2"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">C. <InlineMath math="(2x^2 + 12x + 16)\text{ cm}^2"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">D. <InlineMath math="(4x^2 + 8x + 16)\text{ cm}^2"/></div>
            </div>
          </div>

          {/* Q14 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">14</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan diagram panah berikut! Tentukan benar atau salah untuk setiap pernyataan berikut:</p>
            </div>
            {/* Arrow diagram */}
            <div className="flex justify-center mb-3">
              <svg width="220" height="130" className="bg-white/5 rounded-lg">
                {/* Domain circle */}
                <ellipse cx="55" cy="65" rx="40" ry="55" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="55" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Domain</text>
                {/* x values */}
                {[["1",40],["3",63],["5",86],["a",109]].map(([v,y])=>(
                  <text key={v} x="55" y={Number(y)} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">{v}</text>
                ))}
                {/* Codomain circle */}
                <ellipse cx="165" cy="65" rx="40" ry="55" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                <text x="165" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Kodomain</text>
                {/* f(x) values */}
                {[["5",40],["9",56],["b",74],["13",92]].map(([v,y])=>(
                  <text key={v} x="165" y={Number(y)} textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="sans-serif">{v}</text>
                ))}
                {/* Arrows */}
                <line x1="72" y1="38" x2="148" y2="38" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="61" x2="148" y2="54" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="84" x2="148" y2="72" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <line x1="72" y1="107" x2="148" y2="90" stroke="#eab308" strokeWidth="1" markerEnd="url(#arr)"/>
                <defs>
                  <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#eab308"/>
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(1) Rumus fungsi adalah <InlineMath math="f(x) = 2x+1"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(2) Daerah hasil adalah {"{5, 9, 13}"}</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">(3) <InlineMath math="a + b = 4"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Q15 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">15</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Diketahui suatu barisan aritmatika 8, 11, 14, 17, 20, … Nilai dari <InlineMath math="U_{60} - U_{12}"/> adalah ….
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 96","B. 120","C. 144","D. 156"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q16 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">16</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar susunan batang korek api berikut! Seorang siswa ditugaskan untuk menyusun batang korek api dari pola ke-1 sampai dengan pola ke-55. Jumlah batang korek api yang diperlukan untuk membuat seluruh susunan pola tersebut adalah ….
              </p>
            </div>
            {/* Matchstick pattern SVG */}
            <div className="flex justify-center mb-3">
              <svg width="280" height="80" className="bg-white/5 rounded-lg">
                {/* Pattern 1: 1 square = 4 sticks */}
                {[[20,20,60,20],[20,20,20,60],[60,20,60,60],[20,60,60,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p1-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="40" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 1</text>
                {/* Pattern 2: 2 squares = 7 sticks */}
                {[[80,20,120,20],[120,20,160,20],[80,20,80,60],[120,20,120,60],[160,20,160,60],[80,60,120,60],[120,60,160,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p2-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="120" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 2</text>
                {/* Pattern 3: 3 squares = 10 sticks */}
                {[[175,20,215,20],[215,20,255,20],[255,20,295,20],[175,20,175,60],[215,20,215,60],[255,20,255,60],[295,20,295,60],[175,60,215,60],[215,60,255,60],[255,60,295,60]].map(([x1,y1,x2,y2],i)=>(
                  <line key={`p3-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#eab308" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <text x="235" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Pola 3</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 7.452 batang","B. 7.590 batang","C. 7.755 batang","D. 8.036 batang"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q17 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">17</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar! Berdasarkan informasi pada gambar, tentukan benar atau salah untuk setiap pernyataan berikut:</p>
            </div>
            {/* Angle diagram */}
            <div className="flex justify-center mb-3">
              <svg width="250" height="130" className="bg-white/5 rounded-lg">
                {/* Two parallel lines */}
                <line x1="20" y1="45" x2="230" y2="45" stroke="#94a3b8" strokeWidth="1.5"/>
                <line x1="20" y1="95" x2="230" y2="95" stroke="#94a3b8" strokeWidth="1.5"/>
                {/* Transversal */}
                <line x1="70" y1="10" x2="170" y2="130" stroke="#22d3ee" strokeWidth="1.5"/>
                {/* Angle labels */}
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
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">A. Nilai <InlineMath math="x = 97°"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">B. Nilai <InlineMath math="y = 45°"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">C. Nilai <InlineMath math="x - y = 42°"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Q18 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">18</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sadewa berada di puncak gedung (C). Ia melihat mobil A (hijau) dan mobil B (merah). Dasar gedung (D) tempat Sadewa berada terletak segaris dengan kedua mobil tersebut. Tentukan benar atau salah:
              </p>
            </div>
            {/* Building and cars diagram */}
            <div className="flex justify-center mb-3">
              <svg width="280" height="140" className="bg-white/5 rounded-lg">
                {/* Ground line */}
                <line x1="10" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="1.5"/>
                {/* Building */}
                <rect x="120" y="30" width="30" height="90" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1.5"/>
                {/* C at top */}
                <text x="135" y="25" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="sans-serif">C</text>
                {/* D at base */}
                <text x="135" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">D</text>
                {/* Car A (green) */}
                <rect x="20" y="110" width="30" height="12" rx="3" fill="#22c55e" opacity="0.8"/>
                <text x="35" y="107" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="sans-serif">A</text>
                {/* Car B (red) */}
                <rect x="210" y="110" width="30" height="12" rx="3" fill="#ef4444" opacity="0.8"/>
                <text x="225" y="107" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="sans-serif">B</text>
                {/* Lines of sight */}
                <line x1="135" y1="30" x2="35" y2="115" stroke="#4ade80" strokeWidth="1" strokeDasharray="4,3"/>
                <line x1="135" y1="30" x2="225" y2="115" stroke="#f87171" strokeWidth="1" strokeDasharray="4,3"/>
                {/* Angle labels */}
                <text x="100" y="65" fill="#4ade80" fontSize="8" fontFamily="sans-serif">60°</text>
                <text x="160" y="65" fill="#f87171" fontSize="8" fontFamily="sans-serif">45°</text>
                {/* Height label */}
                <text x="105" y="80" fill="#eab308" fontSize="8" fontFamily="sans-serif">75m</text>
              </svg>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body border-collapse">
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">A. Jarak mobil A (hijau) dengan gedung (AD) = 60 meter.</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">B. Jarak mobil B (merah) dengan gedung (BD) = 90 meter.</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">C. Jarak mobil A dengan B adalah = 40 meter.</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Q19 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">19</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Diketahui <InlineMath math="\triangle ABC"/> kongruen dengan <InlineMath math="\triangle PQR"/>, panjang PQ adalah ….
              </p>
            </div>
            {/* Two congruent triangles */}
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
            <div className="grid grid-cols-2 gap-2">
              {["A. 1,3 cm","B. 1,5 cm","C. 2,0 cm","D. 3,0 cm"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q20 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">20</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Lukisan (PQRS) ditempel pada sebuah karton (ABCD) yang berbentuk persegi panjang. Diketahui lukisan dan karton sebangun. Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar:
              </p>
            </div>
            {/* Similar rectangles */}
            <div className="flex justify-center mb-3">
              <svg width="250" height="150" className="bg-white/5 rounded-lg">
                {/* Outer rectangle ABCD */}
                <rect x="15" y="15" width="220" height="120" fill="none" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="15" y="12" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">A</text>
                <text x="233" y="12" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">B</text>
                <text x="233" y="140" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">C</text>
                <text x="15" y="140" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">D</text>
                <text x="125" y="145" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="sans-serif">80 cm</text>
                <text x="5" y="75" fill="#22d3ee" fontSize="8" fontFamily="sans-serif" transform="rotate(-90,5,75)">60 cm</text>
                {/* Inner rectangle PQRS */}
                <rect x="40" y="30" width="170" height="90" fill="rgba(234,179,8,0.07)" stroke="#eab308" strokeWidth="1.5"/>
                <text x="40" y="27" fill="#eab308" fontSize="8" fontFamily="sans-serif">P</text>
                <text x="208" y="27" fill="#eab308" fontSize="8" fontFamily="sans-serif">Q</text>
                <text x="208" y="125" fill="#eab308" fontSize="8" fontFamily="sans-serif">R</text>
                <text x="40" y="125" fill="#eab308" fontSize="8" fontFamily="sans-serif">S</text>
                <text x="125" y="120" textAnchor="middle" fill="#eab308" fontSize="8" fontFamily="sans-serif">72 cm</text>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              {[
                "1. Panjang QR = 54 cm",
                "2. Luas karton 4.800 cm²",
                "3. Luas lukisan 3.672 cm²",
                "4. Luas karton tidak tertutup lukisan 912 cm²",
              ].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q21 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">21</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Pilih <strong className="text-yellow-400">lebih dari satu</strong> pernyataan yang benar mengenai hasil transformasi titik A berikut:
              </p>
            </div>
            {/* Coordinate system with point A(3,2) */}
            <div className="flex justify-center mb-3">
              <svg width="180" height="160" className="bg-white/5 rounded-lg">
                {/* Grid */}
                {[-3,-2,-1,0,1,2,3].map(i=>(
                  <g key={i}>
                    <line x1={90+i*22} y1="10" x2={90+i*22} y2="150" stroke="#ffffff10" strokeWidth="0.5"/>
                    <line x1="10" y1={80-i*22} x2="170" y2={80-i*22} stroke="#ffffff10" strokeWidth="0.5"/>
                  </g>
                ))}
                {/* Axes */}
                <line x1="10" y1="80" x2="170" y2="80" stroke="#64748b" strokeWidth="1.5"/>
                <line x1="90" y1="10" x2="90" y2="150" stroke="#64748b" strokeWidth="1.5"/>
                <text x="173" y="83" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">x</text>
                <text x="93" y="8" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">y</text>
                {/* Axis labels */}
                {[1,2,3].map(i=>(
                  <g key={i}>
                    <text x={90+i*22-2} y="93" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{i}</text>
                    <text x={90-i*22-4} y="93" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{-i}</text>
                    <text x="83" y={80-i*22+3} fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{i}</text>
                    <text x="79" y={80+i*22+3} fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{-i}</text>
                  </g>
                ))}
                {/* Point A(3,2) */}
                <circle cx={90+3*22} cy={80-2*22} r="4" fill="#ef4444"/>
                <text x={90+3*22+5} y={80-2*22-3} fill="#ef4444" fontSize="9" fontFamily="sans-serif">A(3,2)</text>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">1. Ditranslasikan oleh <InlineMath math="\begin{pmatrix}-1\\4\end{pmatrix}"/> bayangannya adalah <InlineMath math="A'(4,6)"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">2. Dirotasikan berlawanan arah jarum jam dengan pusat titik <InlineMath math="O(0,0)"/> sebesar 90° bayangannya adalah <InlineMath math="A'(-2,3)"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">3. Dicerminkan terhadap sumbu-<InlineMath math="X"/> bayangannya adalah <InlineMath math="A'(-3,2)"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">4. Didilatasikan dengan pusat <InlineMath math="O(0,0)"/> dengan faktor skala <InlineMath math="-4"/> bayangannya adalah <InlineMath math="A'(-12,-8)"/></div>
            </div>
          </div>

          {/* Q22 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">22</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Bangun datar tersebut merupakan gabungan antara belah ketupat ABFG dan trapesium samakaki BCDF. Diketahui AF = 24 cm, FD = 25 cm dan BC = 15 cm, keliling gabungan bangun datar tersebut adalah ….
              </p>
            </div>
            {/* Rhombus + Trapezoid */}
            <div className="flex justify-center mb-3">
              <svg width="220" height="170" className="bg-white/5 rounded-lg">
                {/* Rhombus ABFG: A top, B right, F bottom, G left */}
                <polygon points="110,20 160,85 110,110 60,85" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <text x="110" y="16" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">A</text>
                <text x="166" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">B</text>
                <text x="110" y="123" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">F</text>
                <text x="48" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">G</text>
                {/* Trapezoid BCDF: B top-right, C right, D bottom, F bottom-left */}
                <polygon points="160,85 195,85 195,150 110,150" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5"/>
                <text x="200" y="88" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">C</text>
                <text x="200" y="153" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif">D</text>
                {/* Labels */}
                <text x="78" y="50" fill="#eab308" fontSize="8" fontFamily="sans-serif">AF=24</text>
                <text x="150" y="120" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">FD=25</text>
                <text x="182" y="80" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">BC=15</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 80 cm","B. 89 cm","C. 92 cm","D. 105 cm"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q23 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">23</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Luas daerah yang diarsir adalah ….(<InlineMath math="\pi = 3{,}14"/>)
              </p>
            </div>
            {/* Circle with shaded region */}
            <div className="flex justify-center mb-3">
              <svg width="200" height="180" className="bg-white/5 rounded-lg">
                {/* Large square */}
                <rect x="20" y="20" width="160" height="140" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                {/* Inner circle */}
                <circle cx="100" cy="90" r="55" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5"/>
                {/* Shaded corners (hatching) */}
                {[0,1,2,3,4,5].map(i=>(
                  <line key={i} x1={25+i*25} y1="20" x2={20} y2={25+i*20} stroke="#22d3ee" strokeWidth="0.5" opacity="0.4"/>
                ))}
                {/* Labels */}
                <text x="100" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">r = 10 m</text>
                <text x="100" y="168" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">sisi persegi = 20 m</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 157 m²","B. 286 m²","C. 372 m²","D. 443 m²"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q24 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">24</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">Perhatikan gambar jaring-jaring bangun ruang sisi datar berikut! Tentukan benar atau salah dari setiap pernyataan berikut:</p>
            </div>
            {/* Net diagrams */}
            <div className="flex justify-around mb-3">
              {/* Net 1: Cube net */}
              <div className="text-center">
                <svg width="75" height="75" className="bg-white/5 rounded-lg">
                  {/* T-cross cube net */}
                  <rect x="25" y="5" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="5" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="25" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="45" y="25" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                  <rect x="25" y="45" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">Gambar 1</p>
              </div>
              {/* Net 2: Hexagonal prism */}
              <div className="text-center">
                <svg width="75" height="75" className="bg-white/5 rounded-lg">
                  <polygon points="37,8 55,18 55,32 37,42 19,32 19,18" fill="none" stroke="#a855f7" strokeWidth="1"/>
                  <rect x="15" y="42" width="45" height="15" fill="none" stroke="#a855f7" strokeWidth="1"/>
                  <polygon points="37,57 55,57 55,67 37,67 19,67 19,57" fill="none" stroke="#a855f7" strokeWidth="1"/>
                </svg>
                <p className="text-white/60 text-xs mt-1 font-body">Gambar 2</p>
              </div>
              {/* Net 3: Square pyramid */}
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
                <thead><tr className="bg-white/10"><th className="border border-white/20 px-3 py-2 text-white text-left">Pernyataan</th><th className="border border-white/20 px-3 py-2 text-white text-center">Benar</th><th className="border border-white/20 px-3 py-2 text-white text-center">Salah</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">A. Gambar nomor 1 adalah jaring-jaring kubus</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">B. Gambar nomor 2 adalah jaring-jaring prisma segi enam</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                  <tr><td className="border border-white/10 px-3 py-2 text-white/80">C. Gambar nomor 3 adalah jaring-jaring limas segi empat</td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td><td className="border border-white/10 px-3 py-2 text-center"><div className="w-4 h-4 border border-white/30 rounded mx-auto"/></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Q25 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">25</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar bangun ruang gabungan berikut! Bangun tersebut merupakan gabungan balok ABCD.EFGH dan limas T.EFGH. Jika diketahui TK = 22 cm maka volume bangun tersebut adalah ….
              </p>
            </div>
            {/* 3D shape: cuboid + pyramid */}
            <div className="flex justify-center mb-3">
              <svg width="230" height="180" className="bg-white/5 rounded-lg">
                {/* Cuboid bottom */}
                <polygon points="40,100 160,100 200,60 80,60" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <rect x="40" y="100" width="120" height="55" fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="160" y1="100" x2="200" y2="60" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="200" y1="60" x2="200" y2="115" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="200" y1="115" x2="160" y2="155" stroke="#22d3ee" strokeWidth="1.5"/>
                <line x1="80" y1="60" x2="80" y2="115" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,3"/>
                {/* Pyramid on top */}
                <line x1="80" y1="60" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="160" y1="100" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="200" y1="60" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5"/>
                <line x1="40" y1="100" x2="140" y2="10" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4,3"/>
                <text x="143" y="7" fill="#eab308" fontSize="9" fontFamily="sans-serif">T</text>
                {/* Labels */}
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">20 cm</text>
                <text x="30" y="128" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">15 cm</text>
                <text x="172" y="82" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">10 cm</text>
                {/* TK dashed line */}
                <line x1="140" y1="10" x2="140" y2="80" stroke="#fff" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="145" y="50" fill="#fff" fontSize="8" fontFamily="sans-serif">TK=22</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">A. 9.200 cm³</div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">B. 9.620 cm³</div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">C. 10.020 cm³</div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">D. 10.800 cm³</div>
            </div>
          </div>

          {/* Q26 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">26</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sebuah tempat penampungan minyak berbentuk bola dengan diameter 12 meter terisi penuh oleh minyak. Seluruh minyak tersebut akan didistribusikan ke tempat-tempat penjualan menggunakan truk tangki. Setiap truk memiliki tangki berbentuk tabung dengan panjang jari-jari 1 meter dan panjang tangki 4 meter. Berapakah jumlah truk tangki yang diperlukan untuk mengangkut seluruh minyak tersebut hingga habis?
              </p>
            </div>
            {/* Sphere + cylinder */}
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
            <div className="grid grid-cols-2 gap-2">
              {["A. 144 truk tangki","B. 72 truk tangki","C. 48 truk tangki","D. 36 truk tangki"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q27 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">27</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan diagram berikut! Selisih rata-rata hasil penjualan selama 5 hari antara beras IR 42 dan IR 64 di warung Maju Makmur adalah ….
              </p>
            </div>
            {/* Bar chart */}
            <div className="flex justify-center mb-3">
              <svg width="280" height="160" className="bg-white/5 rounded-lg">
                {/* Y axis */}
                <line x1="40" y1="10" x2="40" y2="135" stroke="#64748b" strokeWidth="1.5"/>
                {/* X axis */}
                <line x1="40" y1="135" x2="265" y2="135" stroke="#64748b" strokeWidth="1.5"/>
                {/* Y labels */}
                {[0,20,40,60,80].map((v,i)=>(
                  <g key={v}>
                    <text x="35" y={135-i*25+3} textAnchor="end" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">{v}</text>
                    <line x1="38" y1={135-i*25} x2="265" y2={135-i*25} stroke="#ffffff08" strokeWidth="0.5"/>
                  </g>
                ))}
                {/* Bars: IR42 (cyan) and IR64 (purple) per day */}
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
                {/* Legend */}
                <rect x="50" y="13" width="8" height="8" fill="#22d3ee"/>
                <text x="62" y="21" fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">IR 42</text>
                <rect x="95" y="13" width="8" height="8" fill="#a855f7"/>
                <text x="107" y="21" fill="#e2e8f0" fontSize="7" fontFamily="sans-serif">IR 64</text>
                <text x="155" y="8" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Penjualan Beras (kg)</text>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["A. 4 kg","B. 6 kg","C. 8 kg","D. 10 kg"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
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
            <div className="flex flex-col gap-2">
              {[
                "1. Nilai modus adalah 155 cm",
                "2. Nilai median adalah 156 cm",
                "3. Nilai rata-rata adalah 158 cm",
                "4. Banyak siswa memiliki tinggi badan di bawah rata-rata 10 orang",
              ].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
          </div>

          {/* Q29 */}
          <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex gap-3 mb-3">
              <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">29</span>
              <p className="font-body text-white/90 text-sm leading-relaxed">
                Perhatikan gambar! Sebuah dadu bersisi enam dilempar undi sebanyak satu kali. Peluang muncul mata dadu kurang dari lima adalah ….
              </p>
            </div>
            {/* Dice SVG */}
            <div className="flex justify-center mb-3">
              <svg width="80" height="80" className="bg-white/5 rounded-xl">
                <rect x="10" y="10" width="60" height="60" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
                {/* 5 dots pattern */}
                <circle cx="25" cy="25" r="5" fill="#e2e8f0"/>
                <circle cx="55" cy="25" r="5" fill="#e2e8f0"/>
                <circle cx="40" cy="40" r="5" fill="#e2e8f0"/>
                <circle cx="25" cy="55" r="5" fill="#e2e8f0"/>
                <circle cx="55" cy="55" r="5" fill="#e2e8f0"/>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">A. <InlineMath math="\dfrac{1}{6}"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">B. <InlineMath math="\dfrac{1}{3}"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">C. <InlineMath math="\dfrac{1}{2}"/></div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">D. <InlineMath math="\dfrac{2}{3}"/></div>
            </div>
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
            <div className="grid grid-cols-2 gap-2">
              {["A. Mesin A","B. Mesin B","C. Mesin C","D. Mesin D"].map(o=><div key={o} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-body">{o}</div>)}
            </div>
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
