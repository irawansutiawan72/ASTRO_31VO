import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const renderWithLatex = (text: string) => {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      return <InlineMath key={index} math={latex} />;
    }
    return <span key={index}>{part}</span>;
  });
};

const materiSection = {
  title: "MATERI - ARITMETIKA SOSIAL",
  sections: [
    {
      heading: "A. Harga Beli (Modal)",
      content: `Harga beli atau modal adalah harga barang saat dibeli dari produsen, distributor, atau toko lain. Ini adalah uang yang dikeluarkan oleh seorang pedagang untuk mendapatkan suatu barang sebelum dijual kembali. Harga beli seringkali termasuk biaya tambahan seperti ongkos kirim atau biaya operasional lainnya.

Contoh: Seorang pedagang membeli 1 lusin buku dengan harga Rp 50.000. Maka, harga beli 1 lusin buku tersebut adalah Rp 50.000.`
    },
    {
      heading: "B. Harga Jual",
      content: `Harga jual adalah harga barang saat dijual kepada konsumen. Ini adalah uang yang diterima oleh seorang pedagang setelah menjual barangnya.

Contoh: Pedagang buku tersebut menjual 1 lusin bukunya dengan harga Rp 75.000. Maka, harga jual 1 lusin buku tersebut adalah Rp 75.000.`
    },
    {
      heading: "C. Untung (Laba)",
      content: `Untung atau laba terjadi ketika harga jual lebih besar daripada harga beli. Ini berarti pedagang mendapatkan keuntungan dari transaksi jual beli.

Rumus Untung:
$\\text{Untung} = \\text{Harga Jual} - \\text{Harga Beli}$

Contoh: Harga Beli buku = Rp 50.000, Harga Jual buku = Rp 75.000
Untung = Rp 75.000 - Rp 50.000 = Rp 25.000`
    },
    {
      heading: "D. Rugi",
      content: `Rugi terjadi ketika harga jual lebih kecil daripada harga beli. Ini berarti pedagang mengalami kerugian dari transaksi jual beli.

Rumus Rugi:
$\\text{Rugi} = \\text{Harga Beli} - \\text{Harga Jual}$

Contoh: Jika pedagang buku tersebut hanya berhasil menjual buku dengan harga Rp 40.000 (karena rusak atau lainnya).
Rugi = Rp 50.000 - Rp 40.000 = Rp 10.000`
    },
    {
      heading: "E. Impas (Titik Balik Modal)",
      content: `Impas atau balik modal terjadi ketika harga jual sama dengan harga beli. Pada kondisi ini, pedagang tidak mendapatkan untung maupun mengalami rugi.

Rumus Impas:
$\\text{Harga Jual} = \\text{Harga Beli}$`
    },
    {
      heading: "F. Persentase Untung",
      content: `Persentase untung adalah perbandingan antara besar untung dengan harga beli, dinyatakan dalam bentuk persentase.

Rumus Persentase Untung:
$\\%U = \\frac{\\text{Untung}}{\\text{Harga Beli}} \\times 100\\%$

Contoh: Untung = Rp 25.000, Harga Beli = Rp 50.000 maka:
$\\%U = \\frac{25.000}{50.000} \\times 100\\% = 50\\%$`
    },
    {
      heading: "G. Persentase Rugi",
      content: `Persentase rugi adalah perbandingan antara besar rugi dengan harga beli, dinyatakan dalam bentuk persentase.

Rumus Persentase Rugi:
$\\%R = \\frac{\\text{Rugi}}{\\text{Harga Beli}} \\times 100\\%$

Contoh: Rugi = Rp 10.000, Harga Beli = Rp 50.000, maka:
$\\%R = \\frac{10.000}{50.000} \\times 100\\% = 20\\%$`
    },
    {
      heading: "H. Mencari Harga Jual",
      content: `1. Mencari Harga Jual Jika Untung
$\\text{Harga Jual} = \\frac{(100 + \\%U)}{100} \\times \\text{Harga Beli}$

2. Mencari Harga Jual Jika Rugi
$\\text{Harga Jual} = \\frac{(100 - \\%R)}{100} \\times \\text{Harga Beli}$

3. Mencari Harga Beli Jika Diketahui Harga Jual dan Persentase Untung/Rugi
Jika Untung:
$\\text{Harga Beli} = \\frac{100}{(100 + \\%U)} \\times \\text{Harga Jual}$

Jika Rugi:
$\\text{Harga Beli} = \\frac{100}{(100 - \\%R)} \\times \\text{Harga Jual}$`
    },
    {
      heading: "I. Bunga Tunggal",
      content: `1. Pengertian Bunga Tunggal
Bunga tunggal adalah bunga yang dihitung hanya berdasarkan modal awal (pokok pinjaman atau pokok simpanan) untuk setiap periode.

2. Rumus Bunga Tunggal
$B = M \\times W \\times P$

Dimana:
- B = Besar bunga yang diperoleh/dibayar
- M = Pokok pinjaman/modal awal (Prinsip)
- W = Waktu atau jangka waktu (dalam periode yang sama dengan suku bunga)
- P = Tingkat suku bunga per periode (dalam bentuk desimal)

Modal akhir setelah dikenakan bunga tunggal:
$M_1 = M + B = M(1 + WP)$`
    },
    {
      heading: "J. Diskon (Potongan Harga)",
      content: `1. Pengertian Diskon
Diskon adalah potongan harga yang diberikan oleh penjual kepada pembeli. Diskon biasanya dinyatakan dalam persentase (%).

2. Rumus dan Perhitungan Diskon
- Besar Diskon = Persentase Diskon × Harga Awal
- Harga Bayar = Harga Awal - Besar Diskon
- Atau: Harga Bayar = Harga Awal × (100% - Persentase Diskon)

3. Diskon Ganda (Double Discount)
Diskon 20% + 10% TIDAK berarti diskon total 30%. Diskon kedua diberikan setelah diskon pertama diterapkan.

Contoh: Baju seharga Rp100.000 diskon 20% + 10%
- Harga Setelah Diskon 1 = Rp100.000 × 80% = Rp80.000
- Harga Setelah Diskon 2 = Rp80.000 × 90% = Rp72.000`
    },
    {
      heading: "K. Pajak Pertambahan Nilai (PPN)",
      content: `1. Pengertian PPN
Pajak Pertambahan Nilai (PPN) adalah pajak yang dikenakan atas konsumsi barang dan jasa di dalam daerah pabean (wilayah Indonesia). Besarnya PPN di Indonesia saat ini adalah 11% (per 2024).

2. Rumus dan Perhitungan PPN
- Besar PPN = Persentase PPN × Harga Barang/Jasa (sebelum PPN)
- Total Harga Bayar = Harga Barang/Jasa × (100% + Persentase PPN)

Contoh: Makanan di restoran seharga Rp50.000 (belum termasuk PPN 11%).
- Besar PPN = 11% × Rp50.000 = Rp5.500
- Total Harga Bayar = Rp50.000 + Rp5.500 = Rp55.500`
    },
    {
      heading: "L. Pajak Penghasilan (PPh)",
      content: `1. Pengertian PPh
Pajak Penghasilan (PPh) adalah pajak yang dikenakan atas penghasilan yang diterima atau diperoleh seseorang (pribadi) atau badan usaha dalam satu tahun pajak.

2. Rumus dan Perhitungan PPh
- Penghasilan Kena Pajak (PKP) = Penghasilan Bruto - Penghasilan Tidak Kena Pajak (PTKP)
- Besar PPh = Persentase PPh × PKP
- Penghasilan Bersih = Penghasilan Bruto - Besar PPh

Contoh: Pekerja dengan penghasilan bruto Rp5.000.000/bulan, PTKP Rp3.000.000/bulan, PPh 5%.
- PKP = Rp5.000.000 - Rp3.000.000 = Rp2.000.000
- Besar PPh = 5% × Rp2.000.000 = Rp100.000
- Penghasilan Bersih = Rp5.000.000 - Rp100.000 = Rp4.900.000`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Data harga dan diskon sepatu dan kaos dari ke-empat toko sebagai berikut. Jika Darmo akan membeli sepatu dan kaos, maka toko yang dipilihnya adalah ...", options: ["A. Toko Damai", "B. Toko Tentram", "C. Toko Rukun", "D. Toko Sentosa"] },
  { no: 2, soal: "Perhatikan tabel berikut!\nJenis | Harga | Disc\nTas | Rp 80.000 | 15%\nSendal | Rp 50.000 | 25%\nSepatu | Rp 120.000 | 20%\nJika Rani akan membeli 3 tas, 2 sendal dan 1 sepatu, maka uang yang harus dibayarkan adalah ...", options: ["A. Rp 360.000", "B. Rp 365.000", "C. Rp 370.000", "D. Rp 375.000"] },
  { no: 3, soal: "Affandi membeli sebuah televisi, kemudian menjualnya dengan harga Rp 1.800.000. Dari penjualan itu, ia mendapatkan untung 20%. Harga pembelian televisi adalah ...", options: ["A. Rp 1.600.000", "B. Rp 1.500.000", "C. Rp 1.440.000", "D. Rp 1.200.000"] },
  { no: 4, soal: "Seorang pedagang membeli 60 kg mangga, kemudian dijual seharga Rp 15.000 per kg. Jika pedagang tersebut mendapat keuntungan 20%, maka harga beli mangga tersebut adalah ...", options: ["A. Rp 600.000", "B. Rp 720.000", "C. Rp 750.000", "D. Rp 800.000"] },
  { no: 5, soal: "Seorang pedagang membeli sepeda bekas. Setelah diperbaiki kembali dengan biaya Rp 200.000, sepeda tersebut dijual dengan harga Rp 1.040.000 sehingga mendapat untung 30%. Harga beli sepeda semula adalah ...", options: ["A. Rp 500.000", "B. Rp 600.000", "C. Rp 700.000", "D. Rp 800.000"] },
  { no: 6, soal: "Pak Setya membeli sekarung beras seharga Rp 475.000. Beras itu akan dijual lagi dengan mengharapkan keuntungan sebesar 20%. Jika isi beras dalam karung adalah 50 kg, maka harga jual per kg dari beras adalah ...", options: ["A. Rp 12.400", "B. Rp 12.000", "C. Rp 11.400", "D. Rp 11.000"] },
  { no: 7, soal: "Bima menyimpan uang sebesar Rp 1.200.000 di sebuah bank dengan bunga tunggal 15% setahun. Setelah beberapa bulan ia mengambil seluruh tabungan beserta bunganya menjadi Rp 1.260.000. Lama Bima menabung adalah ...", options: ["A. 3 bulan", "B. 4 bulan", "C. 5 bulan", "D. 6 bulan"] },
  { no: 8, soal: "Doni menyimpan uang di bank sebesar Rp 800.000 dengan bunga tunggal 12% pertahun. Agar jumlah tabungannya menjadi Rp 872.000, Doni harus menabung selama ...", options: ["A. 9 bulan", "B. 7 bulan", "C. 6 bulan", "D. 4 bulan"] },
  { no: 9, soal: "Wira menabung Rp 600.000 pada sebuah bank. Setelah 10 bulan tabungan Wira menjadi Rp 640.000. Persentase bunga per tahun pada bank tersebut adalah ...", options: ["A. 6%", "B. 6,7%", "C. 8%", "D. 8,5%"] },
  { no: 10, soal: "Nina menabung pada sebuah bank dengan bunga tunggal 16% setahun. Setelah 9 bulan uangnya menjadi Rp 2.240.000. Tabungan awal Nina adalah ...", options: ["A. Rp 1.800.000", "B. Rp 1.900.000", "C. Rp 2.000.000", "D. Rp 2.100.000"] },
  { no: 11, soal: "Pak Budi meminjam uang di koperasi sebesar Rp 4.800.000. Ia dikenakan bunga 24% setahun. Ia berencana mengembalikan dalam 2 tahun. Besar cicilan yang harus dibayar tiap bulan adalah ...", options: ["A. Rp 296.000", "B. Rp 269.000", "C. Rp 260.000", "D. Rp 209.000"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2003 Tingkat Kota\nHarga sepotong kue turun dari Rp250 menjadi Rp200. Dengan uang Rp4.000, berapa potong kue lebih banyak yang dapat dibeli.", options: ["A. 4", "B. 8", "C. 20", "D. 2", "E. 6"] },
  { no: 2, soal: "OSN Matematika 2003 Tingkat Kota\nGabah hasil panen sawah mempunyai kadar air 25%. Setelah dijemur kadar airnya menyusut sebanyak 80%. Kadar gabah tersebut saat ini adalah ...", options: ["A. 2,5%", "B. 5%", "C. 10%", "D. 15%", "E. 2%"] },
  { no: 3, soal: "OSN Matematika 2004 Tingkat Kota\n3% dari 81 sama dengan 9% dari ...", options: ["A. 27", "B. 54", "C. 72", "D. 90", "E. 243"] },
  { no: 4, soal: "OSN Matematika 2005 Tingkat Kota\nDalam satu tahun harga suatu mobil berkurang 10% dari harga tahun sebelumnya. Paling sedikit berapa tahun sehingga harga mobil itu kurang dari setengah harga semula", options: [] },
  { no: 5, soal: "OSN Matematika 2007 Tingkat Kota\nSeorang pedagang membeli 25 kg beras jenis A seharga Rp6.000 setiap kg dan 15 kg beras jenis B seharga Rp4.000 setiap kg. Kedua jenis beras tersebut dicampur. Agar mendapat untung 4% setiap beras tersebut dijual seharga Rp .../kg", options: ["A. 5.200", "B. 5.460", "C. 5.520", "D. 5.580", "E. 6.240"] },
  { no: 6, soal: "OSN Matematika 2008 Tingkat Kota\nPada bulan Januari harga tas di toko Rima adalah Rp150.000. Pada bulan Februari harga tas naik 10%, tetapi bila yang membeli pelajar memperoleh potongan 10%. Pada bulan Maret potongan bagi pelajar tidak berlaku lagi, tetapi harga tas turun menjadi Rp135.000 dan pembeli dikenakan pajak pembelian 10%. Dua orang pelajar, Andi dan Anton membeli tas tersebut. Andi membeli pada bulan Februari, sedangkan Anton membeli pada bulan Maret. Pernyataan berikut yang benar adalah ...", options: ["A. Anton membayar sebesar Rp150.000 untuk tas yang dibelinya", "B. Andi membayar sebesar Rp150.000 untuk tas yang dibelinya", "C. Jumlah uang yang dibayarkan Andi sama dengan jumlah uang yang dibayarkan Anton", "D. Di antara tiga bulan yang disebut di atas, bulan Januari adalah bulan yang paling menguntungkan bagi pelajar untuk membeli tas"] },
  { no: 7, soal: "OSN Matematika 2009 Tingkat Kota\nPada bulan Januari harga tas di Toko Asia adalah Rp 150.000. Pada bulan Februari harga tas naik 10%, tetapi bila yang membeli pelajar memperoleh potongan 10%. Pada bulan Maret harga tas tersebut menjadi Rp135.000 tetapi pembeli dibebani pajak pembelian sebesar 10% dan diskon bagi pelajar tidak berlaku lagi. Dua orang pelajar, Andi dan Anton membeli tas tersebut. Andi membeli pada bulan Februari, sedangkan Anton membeli pada bulan Maret. Pertanyaan berikut yang benar adalah ...", options: ["A. Jumlah uang yang dibayarkan Andi sama dengan jumlah uang yang dibayarkan Anton", "B. Anton membayar sebesar Rp150.000 untuk tas yang dibelinya", "C. Di antara tiga bulan yang disebut di atas, bulan Januari adalah bulan yang paling menguntungkan bagi pelajar untuk membeli tas", "D. Jumlah uang yang dibayarkan Andi lebih besar dari jumlah uang yang dibayarkan Anton"] },
  { no: 8, soal: "OSN Matematika 2017 Tingkat Kota\nPenyedia jasa pengasuh bayi usia di bawah 3 tahun memberlakukan tarif upah pengasuh bayi sebagai berikut. Upah setiap jam sebesar Rp 40.000 untuk 3 jam pertama. Selanjutnya, diberlakukan aturan sebagai berikut. Untuk setiap 1 jam berikutnya di siang hari (mulai pukul 06.00 sampai dengan pukul 18.00), dikenakan upah sebesar 20% lebih banyak daripada upah 1 jam sebelumnya. Adapun upah untuk malam hari di atas 3 jam pertama dikenakan tetap sebesar Rp 30.000 setiap jam. Jika keluarga Adang menitipkan bayinya pada pukul 16.00 sampai pukul 09.00 hari berikutnya, maka keluarga Adang harus membayar biaya penitipan bayi tersebut sebesar Rp ...", options: ["A. 571.000", "B. 581.000", "C. 585.000", "D. 595.000"] },
  { no: 9, soal: "OSN Matematika 2018 Tingkat Kota\nMenjelang tahun baru, harga sebuah kacamata dipotong (didiskon) dua kali seperti dinyatakan pada tanda berikut. Seorang pembeli membayar Rp168.750 untuk kacamata tersebut. Berapa harga kacamata tersebut sebelum dipotong harganya? (Diskon 25% + 10%)", options: ["A. Rp262.500", "B. Rp281.250", "C. Rp375.000", "D. Rp421.675"] },
  { no: 10, soal: "OSN Matematika 2021 Tingkat Kota\nSuatu keluarga memiliki lima anak dengan anak sulung bernama Andy. Ayah memberi uang saku bulanan kepada kelima anaknya tersebut dengan ketentuan berikut. Uang saku Andy adalah dua kali lipat uang saku anak kedua, tiga kali lipat uang saku anak ketiga, empat kali lipat uang saku anak keempat, serta lima kali lipat uang saku anak kelima. Besaran uang saku anak-anak tersebut adalah bilangan bulat kelipatan ribuan rupiah. Bendy dan Cindy adalah adik dari Andy. Bendy mengeluh bahwa uang saku yang diterima adalah Rp20.000 lebih sedikit dibanding Cindy. Besaran terkecil uang saku Andy yang mungkin adalah ...", options: ["A. Rp60.000", "B. Rp80.000", "C. Rp120.000", "D. Rp240.000"] },
  { no: 11, soal: "OSN Matematika 2021 Tingkat Kota\nBerikut adalah data penjualan lima perusahaan A, B, C, D, E dalam lima tahun (2010 hingga 2014). Data diberikan dalam persentase terhadap total penjualan A, B, C, D dan E serta hanya tiga perusahaan teratas yang disebutkan untuk setiap tahun yang ditentukan. Diketahui bahwa tidak ada perusahaan yang memiliki persentase yang sama dalam satu tahun dan setidaknya persentase masing-masing perusahaan 1% dari total penjualan kelima perusahaan di tahun tersebut. Jika total penjualan kelima perusahaan adalah sama setiap tahunnya, banyaknya perusahaan yang penjualannya pasti lebih besar dari perusahaan E selama lima tahun adalah ...", options: ["A. 1", "B. 2", "C. 3", "D. 4"] },
];

const OlimpiadeAritmetikaSosialPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade">("materi");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          OLIMPIADE - ARITMETIKA SOSIAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Irawan Sutiawan, M.Pd</p>

        <div className="flex gap-2 justify-center mb-6">
          {[
            { key: "materi" as const, label: "Materi" },
            { key: "dasar" as const, label: "Latihan Dasar" },
            { key: "olimpiade" as const, label: "Latihan Olimpiade" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { playPopSound(); setActiveTab(tab.key); }}
              className={`font-display text-xs px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                activeTab === tab.key
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card/80 text-white/70 border-border hover:border-accent/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "materi" && (
          <div className="space-y-3 animate-slide-up">
            {materiSection.sections.map((section, idx) => (
              <div key={idx} className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                >
                  <span className="font-display text-sm text-accent font-bold">{section.heading}</span>
                  {expandedSections.includes(idx) ? (
                    <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                  )}
                </button>
                {expandedSections.includes(idx) && (
                  <div className="px-5 pb-4">
                    <div className="font-body text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                      {section.content.split('\n').map((line, i) => (
                        <div key={i} className="mb-1">{renderWithLatex(line)}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "dasar" && (
          <div className="space-y-4 animate-slide-up">
            {latihanDasar.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {renderWithLatex(soal.soal)}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "olimpiade" && (
          <div className="space-y-4 animate-slide-up">
            {latihanOlimpiade.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {lineIdx === 0 && line.startsWith('OSN') ? <span className="text-yellow-400 font-semibold">{line}</span> : renderWithLatex(line)}
                    </span>
                  ))}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/olimpiade"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeAritmetikaSosialPage;
