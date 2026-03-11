import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Helper function to render text with LaTeX
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
  title: "MATERI - STATISTIKA",
  sections: [
    {
      heading: "A. Pengertian Data dan Statistika",
      content: `1. Data: Kumpulan informasi atau fakta dalam bentuk angka atau kategori. Contoh: nilai siswa, tinggi badan, jenis kelamin, hobi.
- Data Kualitatif: Data yang tidak berbentuk angka dan tidak dapat diukur, tetapi dapat dikategorikan. Contoh: warna favorit, jenis pekerjaan.
- Data Kuantitatif: Data yang berbentuk angka dan dapat diukur atau dihitung. Contoh: tinggi badan, berat badan, jumlah siswa.

2. Statistika: Ilmu yang berkaitan dengan pengumpulan, pengolahan, penyajian, analisis, dan penarikan kesimpulan dari data.`
    },
    {
      heading: "B. Populasi dan Sampel",
      content: `- Populasi: Keseluruhan objek atau individu yang menjadi perhatian dalam suatu penelitian. Contoh: Seluruh siswa SMP di kota Bandung.
- Sampel: Sebagian dari populasi yang diambil untuk diteliti. Sampel harus representatif (mewakili) populasi agar kesimpulan yang ditarik akurat. Contoh: 100 siswa SMP yang dipilih secara acak dari kota Bandung.`
    },
    {
      heading: "C. Penyajian Data",
      content: `Data yang sudah dikumpulkan perlu disajikan agar lebih mudah dibaca dan dipahami.

1. Tabel Distribusi Frekuensi: Tabel yang menunjukkan sebaran frekuensi (jumlah kemunculan) dari setiap kategori atau nilai data.

2. Diagram Batang: Digunakan untuk membandingkan data antar kategori atau menunjukkan perubahan data dari waktu ke waktu.

3. Diagram Garis: Sering digunakan untuk menunjukkan perubahan data sepanjang waktu atau serangkaian nilai yang berurutan.

4. Diagram Lingkaran (Pie Chart): Digunakan untuk menunjukkan proporsi atau bagian dari keseluruhan.
- Besar Sudut Sektor = $\\frac{\\text{Frekuensi Kategori}}{\\text{Total Frekuensi}} \\times 360^{\\circ}$
- Persentase Sektor = $\\frac{\\text{Frekuensi Kategori}}{\\text{Total Frekuensi}} \\times 100\\%$`
    },
    {
      heading: "D. Mean (Rata-rata)",
      content: `Mean atau rata-rata adalah jumlah semua nilai data dibagi dengan banyaknya data.

Rumus: $\\bar{x} = \\frac{\\text{Jumlah semua nilai data}}{\\text{Banyaknya data}}$

Atau jika datanya dalam bentuk frekuensi:
$\\bar{x} = \\frac{\\sum f_i \\cdot x_i}{\\sum f_i}$

Contoh: Nilai ulangan Matematika Ani adalah 7, 8, 6, 9, 7. Berapa rata-rata nilai Ani?
$\\bar{x} = \\frac{7 + 8 + 6 + 9 + 7}{5} = \\frac{37}{5} = 7,4$`
    },
    {
      heading: "E. Rata-rata Gabungan",
      content: `Rata-rata gabungan adalah rata-rata yang dihitung dari gabungan beberapa kelompok data, di mana setiap kelompok memiliki rata-rata dan jumlah anggota (bobot) yang berbeda.

Rumus rata-rata gabungan ($\\bar{x}_{gab}$):
$\\bar{x}_{gab} = \\frac{n_1 \\cdot \\bar{x}_1 + n_2 \\cdot \\bar{x}_2 + ... + n_k \\cdot \\bar{x}_k}{n_1 + n_2 + ... + n_k}$

Atau secara umum:
$\\bar{x}_{gab} = \\frac{\\sum_{i=1}^{k} n_i \\cdot \\bar{x}_i}{\\sum_{i=1}^{k} n_i}$

Contoh: Rata-rata tinggi badan 15 siswa laki-laki adalah 160 cm, sedangkan rata-rata tinggi badan 10 siswa perempuan adalah 150 cm. Berapakah rata-rata tinggi badan seluruh siswa?
$\\bar{x}_{gab} = \\frac{160 \\times 15 + 150 \\times 10}{15 + 10} = \\frac{2400 + 1500}{25} = \\frac{3900}{25} = 156$ cm`
    },
    {
      heading: "F. Median (Nilai Tengah)",
      content: `Median adalah nilai tengah dari kumpulan data yang telah diurutkan dari yang terkecil hingga terbesar (atau sebaliknya).

Langkah Menentukan Median:
1. Urutkan data dari yang terkecil ke terbesar.
2. Tentukan letak median:
   - Jika banyaknya data (n) ganjil, median adalah nilai pada posisi $\\frac{n+1}{2}$
   - Jika banyaknya data (n) genap, median adalah rata-rata dari dua nilai tengah, yaitu nilai pada posisi $\\frac{n}{2}$ dan $\\frac{n}{2}+1$

Contoh (Data Ganjil): Nilai ulangan Ani: 7, 8, 6, 9, 7
1. Urutkan: 6, 7, 7, 8, 9
2. Banyak data n = 5 (ganjil). Letak median: $\\frac{5+1}{2} = 3$
3. Nilai pada posisi ke-3 adalah 7. Jadi, Median = 7.`
    },
    {
      heading: "G. Modus (Nilai Paling Sering Muncul)",
      content: `Modus adalah nilai atau kategori data yang paling sering muncul (memiliki frekuensi tertinggi). Sebuah data bisa memiliki satu modus atau lebih dari satu modus.

Contoh 1: Nilai ulangan Ani: 6, 7, 7, 8, 9
Nilai 7 muncul 2 kali, nilai lainnya 1 kali. Modus = 7.

Contoh 2: Ukuran sepatu siswa: 38, 39, 40, 38, 41, 39, 40, 38
- 38 muncul 3 kali
- 39 muncul 2 kali
- 40 muncul 2 kali
- 41 muncul 1 kali
Modus = 38.`
    },
    {
      heading: "H. Kuartil dan Jangkauan",
      content: `Kuartil adalah ukuran yang membagi data menjadi empat kelompok yang sama banyak setelah diurutkan.
- $Q_1$ = Kuartil bawah
- $Q_2$ = Kuartil tengah (median)
- $Q_3$ = Kuartil atas

Jangkauan (Range): Selisih data terbesar dan data terkecil.
$R = X_{maks} - X_{min}$

Jangkauan Interkuartil: Selisih antara kuartil atas ($Q_3$) dan kuartil bawah ($Q_1$).
$Q_R = Q_3 - Q_1$

Simpangan Kuartil: Setengah dari jangkauan interkuartil.
$Q_D = \\frac{1}{2}(Q_3 - Q_1)$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Diketahui data berikut: 85, 90, 70, 80, 70, 65, 80, 85, 70, 80, 95, 70. Modus dan median data tersebut berturut-turut adalah ...", options: ["A. 65 dan 80", "B. 70 dan 80", "C. 75 dan 70", "D. 80 dan 75"] },
  { no: 2, soal: "Median dan mean dari data: 5, 5, 7, 3, 2, 5, 6, 9, 7, 10, 7, 7 berturut-turut adalah ...", options: ["A. 5,5 dan 6,1", "B. 5,5 dan 7,0", "C. 6,5 dan 6,1", "D. 6,5 dan 7,0"] },
  { no: 3, soal: "Nilai matematika siswa disajikan dalam tabel berikut:\nNilai: 4, 5, 6, 7, 8, 9, 10\nBanyak siswa: 2, 4, 5, 5, 9, 3, 4\nMedian dari data di atas adalah ...", options: ["A. 6,5", "B. 7,0", "C. 7,5", "D. 8,0"] },
  { no: 4, soal: "Perhatikan tabel berikut!\nNilai: 3, 4, 5, 6, 7, 8, 9, 10\nFrekuensi: 2, 5, 5, 3, 4, 4, 4, 3\nPernyataan yang benar dari tabel di atas adalah ...", options: ["A. Modus dari data 5", "B. Median data 6,5", "C. Rata-rata data 6,6", "D. Jangkauan data 6"] },
  { no: 5, soal: "Diagram batang berikut ini menunjukan nilai ulangan matematika diperoleh dari 20 anak pada suatu kelas. Rataan (Mean) dari data tersebut adalah ...", options: ["A. 7", "B. 7,5", "C. 8", "D. 8,5"] },
  { no: 6, soal: "Dalam sebuah kelas, nilai rata-rata siswa putra adalah 7,2, sedangkan rata-rata kelompok putri adalah 8,1. Jika nilai rata-rata itu 7,5, maka perbandingan banyak putra dan siswa putri adalah ...", options: ["A. 2 : 1", "B. 1 : 2", "C. 1 : 3", "D. 2 : 3"] },
  { no: 7, soal: "Nilai rata-rata ulangan matematika siswa perempuan 75 dan siswa laki-laki adalah 66 dan rata-rata nilai keseluruhan siswa kelas tersebut adalah 72. Jika dalam kelas tersebut terdapat 36 siswa, banyak siswa laki-laki adalah ...", options: ["A. 12 orang", "B. 16 orang", "C. 18 orang", "D. 24 orang"] },
  { no: 8, soal: "Rata-rata nilai remedial 20 siswa adalah 7, rata-rata nilai siswa laki-laki adalah 6 dan rata-rata nilai siswa perempuan adalah 8,5. Selisih banyak siswa laki-laki dan perempuan adalah ...", options: ["A. 8", "B. 6", "C. 4", "D. 3"] },
  { no: 9, soal: "Diagram di bawah menunjukan tentang kegemaran siswa terhadap mata pelajaran. Jika jumlah siswa seluruhnya 240 orang. Jumlah siswa yang gemar penjas adalah ...", options: ["A. 76 orang", "B. 90 orang", "C. 104 orang", "D. 156 orang"] },
  { no: 10, soal: "Data koleksi jenis buku di sebuah perpustakaan tersaji dalam diagram. Jika banyak buku kesenian 200 eksemplar, banyak buku kesehatan .... eksemplar", options: ["A. 180", "B. 200", "C. 210", "D. 220"] },
  { no: 11, soal: "Diagram berikut menunjukan penyusutan harga mobil setelah dipakai dalam kurun waktu 5 tahun. Besarnya penyusutan antara tahun 2015 dan 2016 adalah ...", options: ["A. Rp. 2.500.000,00", "B. Rp. 5.000.000,00", "C. Rp. 5.500.000,00", "D. Rp. 7.500.000,00"] },
  { no: 12, soal: "Perhatikan table perolehan nilai berikut.\nNilai: 3, 4, 5, 6, 7, 8, 9\nFrekuensi: 2, 3, 4, 5, 3, 2, 1\nBanyaknya siswa yang memperoleh nilai lebih dari nilai rata-rata adalah ...", options: ["A. 6 orang", "B. 9 orang", "C. 11 orang", "D. 15 orang"] },
  { no: 13, soal: "Suatu hari Ani menemukan sobekan kertas koran yang memuat data pengunjung perpustakaan berupa gambar diagram batang. Rata-rata pengunjung 41 orang selama lima hari. Tolong bantu Ani mencari banyak pengunjung pada hari Rabu ...", options: ["A. 55 orang", "B. 60 orang", "C. 65 orang", "D. 70 orang"] },
  { no: 14, soal: "Ada 25 murid perempuan dalam sebuah kelas. Rata-rata tinggi mereka adalah 130 cm. Bagaimana cara menghitung tinggi rata-rata tersebut?", options: ["A. Jika ada seorang murid perempuan dengan tinggi 132 cm, maka pasti ada seorang murid perempuan dengan tinggi 128 cm.", "B. Jika 23 orang dari murid perempuan tersebut tingginya masing-masing 130 cm dan satu orang tingginya 133, maka satu lagi tingginya 127 cm", "C. Jika anda mengurutkan semua perempuan tersebut dari yang terpendek sampai yang tertinggi, maka yang ditengah pasti mempunyai tinggi 130 cm.", "D. Setengah dari perempuan di kelas pasti di bawah 130 cm dan setengahnya lagi pasti di atas 130 cm"] },
  { no: 15, soal: "Disajikan data sebagai berikut: 4, 7, 4, 6, 10, 5, 6, 3, 8, 5, 8, 9. Kuartil atas dari data tersebut adalah ...", options: ["A. 6", "B. 7", "C. 7,5", "D. 8"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2004 Tingkat Kota\nRata-rata sembilan bilangan adalah 6. Satu diantara kesembilan bilangan dibuang. Rata-rata delapan bilangan yang tinggal adalah $6\\frac{1}{2}$. Bilangan yang dibuang adalah ...", options: [] },
  { no: 2, soal: "OSN Matematika 2005 Tingkat Kota\nSekumpulan data dari 5 bilangan asli memiliki rata-rata hitung 8 dan rentang (selisih terbesar dan terkecil) 12. Bilangan asli terkecil yang tidak mungkin menjadi anggota dari kumpulan tersebut adalah ...", options: ["A. 1", "B. 20", "C. 18", "D. 6", "E. 15"] },
  { no: 3, soal: "OSN Matematika 2008 Tingkat Kota\nLima orang dalam satu keluarga dicatat nama dan umurnya. Rata-rata umur keluarga tersebut lima tahun yang lalu adalah ...", options: [] },
  { no: 4, soal: "OSN Matematika 2008 Tingkat Kota\nRata-rata dari 15 bilangan asli berbeda adalah 12, maka bilangan asli terbesar yang mungkin adalah ...", options: ["A. 45", "B. 75", "C. 89", "D. 105", "E. 166"] },
  { no: 5, soal: "OSN Matematika 2009 Tingkat Kota\nJika nilai ulangan siswa kelas VIII terdiri dari bilangan genap berurutan dengan nilai terendah 2 dan tertinggi 98, jangkauan interkuartil dari data tersebut adalah ...", options: [] },
  { no: 6, soal: "OSN Matematika 2009 Tingkat Kota\nRata-rata dari empat bilangan berurutan adalah 2m - 1, maka nilai dari empat kali bilangan terkecil adalah ...", options: ["A. 8m + 8", "B. 8m + 3", "C. 8m - 7", "D. 8m - 10"] },
  { no: 7, soal: "OSN Matematika 2009 Tingkat Kota\nRata-rata 15 bilangan adalah 0. Bila bilangan v, w, x, y dan z ditambahkan, maka rata-ratanya bertambah 5. Rata-rata bilangan yang ditambahkan adalah ...", options: [] },
  { no: 8, soal: "OSN Matematika 2011 Tingkat Kota\nRataan usia kelompok guru dan profesor adalah 40 tahun. Jika rataan kelompok guru adalah 35 tahun sedangkan rataan kelompok profesor adalah 50 tahun, perbandingan banyaknya guru dengan profesor adalah ...", options: ["A. 2 : 1", "B. 1 : 2", "C. 3 : 2", "D. 2 : 3", "E. 3 : 4"] },
  { no: 9, soal: "OSN Matematika 2012 Tingkat Kota\nJika rata-rata 1000 bilangan ganjil positif berurutan adalah 2012, maka bilangan terkecil dari bilangan-bilangan tersebut adalah ...", options: [] },
  { no: 10, soal: "OSN Matematika 2013 Tingkat Kota\nDiketahui sekelompok data memiliki sifat-sifat berikut:\ni. Terdiri dari 5 data bilangan positif dengan rataan = 7\nii. Median = modus = 9\nJika jangkauan didefinisikan sebagai selisih data terbesar dengan data terkecil, maka jangkauan terbesar yang mungkin adalah ...", options: ["A. 11", "B. 12", "C. 13", "D. 14", "E. 15"] },
  { no: 11, soal: "OSN Matematika 2013 Tingkat Kota\nNilai rata-rata kelas A adalah 73, sedangkan nilai rata-rata kelas B adalah 88. Jika siswa kedua kelas tersebut adalah 75 dan nilai rata-rata kedua kelas adalah 80, maka banyak siswa kelas A adalah ... orang", options: ["A. 35", "B. 38", "C. 40", "D. 42", "E. 45"] },
  { no: 12, soal: "OSN Matematika 2013 Tingkat Kota\nJika rata-rata 51 bilangan bulat berurutan adalah 10, maka bilangan terkecil dari semua bilangan tersebut adalah ...", options: ["A. 5", "B. 0", "C. -5", "D. -13", "E. -15"] },
  { no: 13, soal: "OSN Matematika 2014 Tingkat Kota\nDiketahui empat bilangan a, b, c dan d. Jika rata-rata a dan b adalah 50 dan rata-rata b dan c adalah 75, serta rata-rata c dan d adalah 70, maka rata-rata a dan d adalah ...", options: ["A. 35", "B. 45", "C. 50", "D. 55"] },
  { no: 14, soal: "OSN Matematika 2014 Tingkat Kota\nRata-rata nilai 28 siswa adalah 80. Setelah ditambah nilai siswa A dan B, rata-ratanya menjadi 78. Jika nilai A tiga kali nilai B, maka selisih antara nilai A dan B adalah ...", options: ["A. 15", "B. 25", "C. 50", "D. 75"] },
  { no: 15, soal: "OSN Matematika 2014 Tingkat Kota\nPernyataan berikut yang salah adalah ...", options: ["A. Modus pada gambar A < modus pada gambar B", "B. Median pada gambar A < median pada gambar B", "C. Quartil 1 pada gambar A < Quartil 1 pada gambar B", "D. Rata-rata pada gambar A = rata-rata pada gambar B"] },
  { no: 16, soal: "OSN Matematika 2015 Tingkat Kota\nNilai ujian lima orang siswa yakni Adi, Budi, Cici, Didi dan Eki adalah bilangan bulat dan mempunyai rata-rata yang sama dengan mediannya. Diketahui nilai tertinggi adalah 10 dan terendah adalah 4. Jika yang memperoleh nilai tertinggi adalah Adi dan yang terendah adalah Eki, maka susunan nilai yang mungkin ada sebanyak ...", options: ["A. 3", "B. 4", "C. 13", "D. 16"] },
  { no: 17, soal: "OSN Matematika 2016 Tingkat Kota\nTerdapat lima bilangan bulat positif dengan rata-rata 40 dan jangkauan 10. Nilai maksimum yang mungkin untuk bilangan terbesar dari lima bilangan tersebut adalah ...", options: ["A. 50", "B. 49", "C. 48", "D. 45"] },
  { no: 18, soal: "OSN Matematika 2017 Tingkat Kota\nData 4 pengamatan berupa bilangan positif yang sudah diurutkan dilambangkan dengan $x_1$, $x_2$, $x_3$ dan $x_4$. Jika jangkauan data tersebut adalah 16, $x_1 = \\frac{1}{6}$ median, $x_2 = \\frac{1}{2}$ median dan $x_3 = x_4$, maka rata-rata data tersebut adalah ...", options: ["A. 10", "B. 11", "C. 12", "D. 13"] },
  { no: 19, soal: "OSN Matematika 2018 Tingkat Kota\nRata-rata usia sepasang suami istri pada saat mereka menikah adalah 25 tahun. Rata-rata usia pada saat anak pertama lahir adalah 18 tahun. Rata-rata usia keluarga pada saat anak lahir adalah 15 tahun. Rata-rata usia keluarga pada saat anak ketiga dan anak keempat lahir (kembar) adalah 12 tahun. Jika saat ini rata-rata usia enam orang adalah 16 tahun, maka usia anak pertama adalah ...", options: ["A. 7", "B. 8", "C. 9", "D. 10"] },
  { no: 20, soal: "OSN Matematika 2021 Tingkat Kota\nLima data bilangan asli tidak lebih dari sepuluh mempunyai modus 5 dan rata-rata 6. Jika terhadap lima data tersebut ditambah satu data bilangan asli yang tidak lebih dari 10, maka salah satu median yang mungkin dari enam data adalah ...", options: ["A. 4", "B. 4,5", "C. 5", "D. 6,5"] },
  { no: 21, soal: "OSN Matematika 2024 Tingkat Kota\nSekelompok bilangan berbeda terdiri dari 6 bilangan genap dan 4 bilangan ganjil. Dari kelompok bilangan tersebut diperoleh informasi sebagai berikut:\n- Jangkauan data = 24\n- Jangkauan antar kuartil = 14\n- Bilangan ke-3, 5, 6 dan 8 adalah bilangan ganjil.\n- Median = 2024\n- Rata-rata bilangan ganjil adalah 2022\nRata-rata terbesar yang mungkin dimiliki oleh kelompok bilangan tersebut adalah ...", options: ["A. 2022", "B. 2022,4", "C. 2024", "D. 2024,4"] },
  { no: 22, soal: "OSN Matematika 2024 Tingkat Kota\nEmpat bilangan asli kurang dari sepuluh memiliki rata-rata, median dan modus tunggal yang membentuk tiga bilangan asli berurutan. Jika A adalah jumlah terkecil yang mungkin dari empat bilangan tersebut dan B adalah jumlah terbesar yang mungkin dari empat bilangan tersebut, maka nilai dari A + B adalah ...", options: ["A. 36", "B. 40", "C. 42", "D. 44"] },
  { no: 23, soal: "OSN Matematika 2025 Tingkat Kota\nSuatu data terdiri dari 35 bilangan bulat positif. Bilangan terbesar adalah 29 dan mediannya adalah 22. Misalkan rata-rata terkecil yang mungkin dari data tersebut adalah x dan rata-rata terbesar yang mungkin dari data tersebut adalah y. Nilai x + y = ...", options: ["A. 40,4", "B. 37,4", "C. 36,4", "D. 25,4"] },
];

const OlimpiadeStatistikaPage = () => {
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
          OLIMPIADE - STATISTIKA
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Irawan Sutiawan, M.Pd</p>

        {/* Tabs */}
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

        {/* Materi Tab */}
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

        {/* Latihan Dasar Tab */}
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

        {/* Latihan Olimpiade Tab */}
        {activeTab === "olimpiade" && (
          <div className="space-y-4 animate-slide-up">
            {latihanOlimpiade.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {renderWithLatex(line)}
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
            &larr; Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeStatistikaPage;
