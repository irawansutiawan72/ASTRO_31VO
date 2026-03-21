import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Search } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

type RumusCategory = {
  id: string;
  title: string;
  icon: string;
  rumus: {
    name: string;
    formula: string;
    description?: string;
  }[];
};

const rumusData: RumusCategory[] = [
  {
    id: "bilangan",
    title: "Bilangan",
    icon: "123",
    rumus: [
      { name: "Penjumlahan", formula: "a + b = c", description: "Menjumlahkan dua bilangan" },
      { name: "Pengurangan", formula: "a - b = c", description: "Mengurangkan dua bilangan" },
      { name: "Perkalian", formula: "a \\times b = c", description: "Mengalikan dua bilangan" },
      { name: "Pembagian", formula: "a \\div b = c", description: "Membagi dua bilangan" },
      { name: "Pangkat", formula: "a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ kali}}", description: "Bilangan berpangkat" },
      { name: "Akar Kuadrat", formula: "\\sqrt{a} = b \\Leftrightarrow b^2 = a", description: "Akar kuadrat" },
      { name: "Akar Pangkat n", formula: "\\sqrt[n]{a} = b \\Leftrightarrow b^n = a", description: "Akar pangkat n" },
      { name: "Sifat Pangkat (kali)", formula: "a^m \\times a^n = a^{m+n}", description: "Perkalian pangkat — basis sama, eksponen dijumlah" },
      { name: "Sifat Pangkat (bagi)", formula: "a^m \\div a^n = a^{m-n}", description: "Pembagian pangkat — basis sama, eksponen dikurang" },
      { name: "Sifat Pangkat (kuadrat)", formula: "(a^m)^n = a^{m \\cdot n}", description: "Pangkat dari pangkat — eksponen dikalikan" },
      { name: "Pangkat Nol", formula: "a^0 = 1 \\quad (a \\neq 0)", description: "Setiap bilangan tak nol berpangkat 0 = 1" },
      { name: "Pangkat Negatif", formula: "a^{-n} = \\dfrac{1}{a^n} \\quad (a \\neq 0)", description: "Pangkat negatif = kebalikan pangkat positif" },
    ]
  },
  {
    id: "fpb-kpk",
    title: "FPB dan KPK",
    icon: "FPB",
    rumus: [
      { name: "FPB", formula: "\\text{FPB} = \\text{Faktorisasi prima dengan pangkat terkecil}", description: "Faktor Persekutuan Terbesar" },
      { name: "KPK", formula: "\\text{KPK} = \\text{Faktorisasi prima dengan pangkat terbesar}", description: "Kelipatan Persekutuan Terkecil" },
      { name: "Hubungan FPB dan KPK", formula: "a \\times b = \\text{FPB}(a,b) \\times \\text{KPK}(a,b)", description: "Hasil kali dua bilangan = FPB x KPK" },
    ]
  },
  {
    id: "pecahan",
    title: "Pecahan",
    icon: "½",
    rumus: [
      { name: "Penjumlahan Pecahan (penyebut sama)", formula: "\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}", description: "Penyebut sama" },
      { name: "Penjumlahan Pecahan (penyebut beda)", formula: "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}", description: "Penyebut berbeda" },
      { name: "Pengurangan Pecahan", formula: "\\frac{a}{b} - \\frac{c}{d} = \\frac{ad - bc}{bd}", description: "Penyebut berbeda" },
      { name: "Perkalian Pecahan", formula: "\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}", description: "Kalikan pembilang dengan pembilang, penyebut dengan penyebut" },
      { name: "Pembagian Pecahan", formula: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}", description: "Kalikan dengan kebalikan" },
      { name: "Pecahan ke Desimal", formula: "\\frac{a}{b} = a \\div b", description: "Bagi pembilang dengan penyebut" },
      { name: "Pecahan ke Persen", formula: "\\frac{a}{b} = \\frac{a}{b} \\times 100\\%", description: "Kalikan dengan 100%" },
    ]
  },
  {
    id: "perbandingan",
    title: "Perbandingan",
    icon: ":",
    rumus: [
      { name: "Perbandingan", formula: "a : b = \\frac{a}{b}", description: "Perbandingan dua besaran" },
      { name: "Perbandingan Senilai", formula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2}", description: "Jika a naik, b ikut naik" },
      { name: "Perbandingan Berbalik Nilai", formula: "a_1 \\times b_1 = a_2 \\times b_2", description: "Jika a naik, b turun" },
      { name: "Skala", formula: "\\text{Skala} = \\frac{\\text{Jarak pada peta}}{\\text{Jarak sebenarnya}}", description: "Perbandingan jarak pada peta dengan jarak sebenarnya" },
    ]
  },
  {
    id: "aljabar",
    title: "Aljabar",
    icon: "x",
    rumus: [
      { name: "Bentuk Aljabar", formula: "ax + by + c", description: "Bentuk umum aljabar" },
      { name: "Penjumlahan Suku Sejenis", formula: "ax + bx = (a+b)x", description: "Jumlahkan koefisien suku sejenis" },
      { name: "Perkalian Konstanta", formula: "k(ax + b) = kax + kb", description: "Distributif" },
      { name: "Perkalian Dua Suku", formula: "(a+b)(c+d) = ac + ad + bc + bd", description: "FOIL method" },
      { name: "Kuadrat Binomial", formula: "(a+b)^2 = a^2 + 2ab + b^2", description: "Kuadrat dari jumlah" },
      { name: "Kuadrat Binomial", formula: "(a-b)^2 = a^2 - 2ab + b^2", description: "Kuadrat dari selisih" },
      { name: "Selisih Kuadrat", formula: "a^2 - b^2 = (a+b)(a-b)", description: "Faktorisasi selisih kuadrat" },
    ]
  },
  {
    id: "plsv",
    title: "Persamaan Linear",
    icon: "=",
    rumus: [
      { name: "PLSV", formula: "ax + b = c \\Rightarrow x = \\frac{c-b}{a}", description: "Persamaan Linear Satu Variabel" },
      { name: "PtLSV", formula: "ax + b < c \\text{ atau } ax + b > c", description: "Pertidaksamaan Linear Satu Variabel" },
      { name: "SPLDV Substitusi", formula: "\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}", description: "Substitusikan salah satu variabel" },
      { name: "SPLDV Eliminasi", formula: "\\text{Samakan koefisien salah satu variabel}", description: "Eliminasi salah satu variabel" },
    ]
  },
  {
    id: "fungsi",
    title: "Relasi dan Fungsi",
    icon: "f",
    rumus: [
      { name: "Fungsi Linear", formula: "f(x) = ax + b", description: "Bentuk umum fungsi linear" },
      { name: "Nilai Fungsi", formula: "f(c) = ac + b", description: "Substitusi x = c" },
      { name: "Fungsi Kuadrat", formula: "f(x) = ax^2 + bx + c", description: "Bentuk umum fungsi kuadrat" },
      { name: "Titik Puncak", formula: "x_p = -\\frac{b}{2a}, \\quad y_p = -\\frac{b^2-4ac}{4a}", description: "Koordinat titik puncak parabola" },
      { name: "Sumbu Simetri", formula: "x = -\\frac{b}{2a}", description: "Sumbu simetri parabola" },
    ]
  },
  {
    id: "persamaan-garis",
    title: "Persamaan Garis Lurus",
    icon: "/",
    rumus: [
      { name: "Bentuk Umum", formula: "y = mx + c", description: "m = gradien, c = konstanta" },
      { name: "Gradien", formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}", description: "Kemiringan garis" },
      { name: "Garis Melalui Satu Titik", formula: "y - y_1 = m(x - x_1)", description: "Titik (x₁, y₁) dengan gradien m" },
      { name: "Garis Melalui Dua Titik", formula: "\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}", description: "Melalui (x₁, y₁) dan (x₂, y₂)" },
      { name: "Garis Sejajar", formula: "m_1 = m_2", description: "Gradien sama" },
      { name: "Garis Tegak Lurus", formula: "m_1 \\times m_2 = -1", description: "Hasil kali gradien = -1" },
    ]
  },
  {
    id: "aritmetika-sosial",
    title: "Aritmetika Sosial",
    icon: "Rp",
    rumus: [
      { name: "Untung", formula: "U = H_j - H_b", description: "Harga jual > Harga beli" },
      { name: "Rugi", formula: "R = H_b - H_j", description: "Harga jual < Harga beli" },
      { name: "Persentase Untung", formula: "\\% U = \\frac{U}{H_b} \\times 100\\%", description: "Persentase keuntungan" },
      { name: "Persentase Rugi", formula: "\\% R = \\frac{R}{H_b} \\times 100\\%", description: "Persentase kerugian" },
      { name: "Harga Jual (Untung)", formula: "H_j = H_b + U = H_b \\left(1 + \\frac{\\%U}{100}\\right)", description: "Jika untung" },
      { name: "Harga Jual (Rugi)", formula: "H_j = H_b - R = H_b \\left(1 - \\frac{\\%R}{100}\\right)", description: "Jika rugi" },
      { name: "Diskon", formula: "\\text{Harga Akhir} = \\text{Harga Awal} \\times \\left(1 - \\frac{\\text{diskon}}{100}\\right)", description: "Potongan harga" },
      { name: "Bunga Tunggal", formula: "B = \\frac{M \\times p \\times t}{100}", description: "M = Modal, p = persen, t = waktu (tahun)" },
      { name: "Bruto, Netto, Tara", formula: "\\text{Bruto} = \\text{Netto} + \\text{Tara}", description: "Berat kotor = Berat bersih + Berat kemasan" },
    ]
  },
  {
    id: "sudut-garis",
    title: "Garis dan Sudut",
    icon: "∠",
    rumus: [
      { name: "Sudut Berpelurus", formula: "\\alpha + \\beta = 180°", description: "Jumlah sudut = 180°" },
      { name: "Sudut Berpenyiku", formula: "\\alpha + \\beta = 90°", description: "Jumlah sudut = 90°" },
      { name: "Sudut Bertolak Belakang", formula: "\\alpha = \\beta", description: "Sudut yang saling berhadapan" },
      { name: "Sudut Sehadap", formula: "\\alpha = \\beta", description: "Pada dua garis sejajar dipotong garis transversal" },
      { name: "Sudut Berseberangan", formula: "\\alpha = \\beta", description: "Sudut dalam berseberangan sama besar" },
      { name: "Sudut Sepihak", formula: "\\alpha + \\beta = 180°", description: "Sudut dalam sepihak berpelurus" },
    ]
  },
  {
    id: "segitiga",
    title: "Segitiga",
    icon: "△",
    rumus: [
      { name: "Keliling Segitiga", formula: "K = a + b + c", description: "Jumlah semua sisi" },
      { name: "Luas Segitiga", formula: "L = \\frac{1}{2} \\times a \\times t", description: "a = alas, t = tinggi" },
      { name: "Luas dengan Sinus", formula: "L = \\frac{1}{2} \\times a \\times b \\times \\sin C", description: "Dua sisi dan sudut apit" },
      { name: "Rumus Heron", formula: "L = \\sqrt{s(s-a)(s-b)(s-c)}", description: "s = (a+b+c)/2" },
      { name: "Jumlah Sudut Segitiga", formula: "\\alpha + \\beta + \\gamma = 180°", description: "Jumlah sudut dalam = 180°" },
      { name: "Teorema Pythagoras", formula: "c^2 = a^2 + b^2", description: "Untuk segitiga siku-siku" },
      { name: "Tripel Pythagoras", formula: "(3,4,5), (5,12,13), (8,15,17), (7,24,25)", description: "Tripel bilangan bulat" },
    ]
  },
  {
    id: "segiempat",
    title: "Segiempat",
    icon: "□",
    rumus: [
      { name: "Luas Persegi", formula: "L = s^2", description: "s = sisi" },
      { name: "Keliling Persegi", formula: "K = 4s", description: "s = sisi" },
      { name: "Luas Persegi Panjang", formula: "L = p \\times l", description: "p = panjang, l = lebar" },
      { name: "Keliling Persegi Panjang", formula: "K = 2(p + l)", description: "p = panjang, l = lebar" },
      { name: "Luas Jajar Genjang", formula: "L = a \\times t", description: "a = alas, t = tinggi" },
      { name: "Luas Belah Ketupat", formula: "L = \\frac{1}{2} \\times d_1 \\times d_2", description: "d₁, d₂ = diagonal" },
      { name: "Luas Layang-layang", formula: "L = \\frac{1}{2} \\times d_1 \\times d_2", description: "d₁, d₂ = diagonal" },
      { name: "Luas Trapesium", formula: "L = \\frac{1}{2} \\times (a + b) \\times t", description: "a, b = sisi sejajar, t = tinggi" },
    ]
  },
  {
    id: "lingkaran",
    title: "Lingkaran",
    icon: "○",
    rumus: [
      { name: "Keliling Lingkaran", formula: "K = 2\\pi r = \\pi d", description: "r = jari-jari, d = diameter" },
      { name: "Luas Lingkaran", formula: "L = \\pi r^2", description: "r = jari-jari" },
      { name: "Panjang Busur", formula: "\\text{Panjang busur} = \\frac{\\theta}{360°} \\times 2\\pi r", description: "θ = sudut pusat" },
      { name: "Luas Juring", formula: "L_{juring} = \\frac{\\theta}{360°} \\times \\pi r^2", description: "θ = sudut pusat" },
      { name: "Luas Tembereng", formula: "L_{tembereng} = L_{juring} - L_{segitiga}", description: "Selisih luas juring dan segitiga" },
      { name: "Garis Singgung", formula: "d = \\sqrt{r_1^2 + r_2^2}", description: "Panjang garis singgung persekutuan dalam" },
    ]
  },
  {
    id: "brsd",
    title: "Bangun Ruang Sisi Datar",
    icon: "⬡",
    rumus: [
      { name: "Volume Kubus", formula: "V = s^3", description: "s = sisi" },
      { name: "Luas Permukaan Kubus", formula: "L = 6s^2", description: "s = sisi" },
      { name: "Diagonal Ruang Kubus", formula: "d = s\\sqrt{3}", description: "s = sisi" },
      { name: "Volume Balok", formula: "V = p \\times l \\times t", description: "p = panjang, l = lebar, t = tinggi" },
      { name: "Luas Permukaan Balok", formula: "L = 2(pl + pt + lt)", description: "p, l, t = dimensi balok" },
      { name: "Diagonal Ruang Balok", formula: "d = \\sqrt{p^2 + l^2 + t^2}", description: "p, l, t = dimensi balok" },
      { name: "Volume Prisma", formula: "V = L_{alas} \\times t", description: "Luas alas kali tinggi" },
      { name: "Luas Permukaan Prisma", formula: "L = 2 \\times L_{alas} + K_{alas} \\times t", description: "Dua alas + selimut" },
      { name: "Volume Limas", formula: "V = \\frac{1}{3} \\times L_{alas} \\times t", description: "Sepertiga luas alas kali tinggi" },
    ]
  },
  {
    id: "brsl",
    title: "Bangun Ruang Sisi Lengkung",
    icon: "⬢",
    rumus: [
      { name: "Volume Tabung", formula: "V = \\pi r^2 t", description: "r = jari-jari, t = tinggi" },
      { name: "Luas Permukaan Tabung", formula: "L = 2\\pi r(r + t)", description: "r = jari-jari, t = tinggi" },
      { name: "Luas Selimut Tabung", formula: "L_s = 2\\pi r t", description: "r = jari-jari, t = tinggi" },
      { name: "Volume Kerucut", formula: "V = \\frac{1}{3}\\pi r^2 t", description: "r = jari-jari, t = tinggi" },
      { name: "Luas Permukaan Kerucut", formula: "L = \\pi r(r + s)", description: "r = jari-jari, s = garis pelukis" },
      { name: "Garis Pelukis Kerucut", formula: "s = \\sqrt{r^2 + t^2}", description: "r = jari-jari, t = tinggi" },
      { name: "Volume Bola", formula: "V = \\frac{4}{3}\\pi r^3", description: "r = jari-jari" },
      { name: "Luas Permukaan Bola", formula: "L = 4\\pi r^2", description: "r = jari-jari" },
    ]
  },
  {
    id: "kesebangunan",
    title: "Kesebangunan dan Kekongruenan",
    icon: "∼",
    rumus: [
      { name: "Syarat Kesebangunan", formula: "\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}", description: "Sisi-sisi bersesuaian sebanding" },
      { name: "Sudut Kesebangunan", formula: "\\angle A = \\angle D, \\angle B = \\angle E, \\angle C = \\angle F", description: "Sudut-sudut bersesuaian sama besar" },
      { name: "Kekongruenan", formula: "\\triangle ABC \\cong \\triangle DEF", description: "Bentuk dan ukuran sama" },
      { name: "Perbandingan Luas", formula: "\\frac{L_1}{L_2} = \\left(\\frac{s_1}{s_2}\\right)^2", description: "Kuadrat perbandingan sisi" },
      { name: "Perbandingan Volume", formula: "\\frac{V_1}{V_2} = \\left(\\frac{s_1}{s_2}\\right)^3", description: "Pangkat tiga perbandingan sisi" },
    ]
  },
  {
    id: "transformasi",
    title: "Transformasi Geometri",
    icon: "↺",
    rumus: [
      { name: "Translasi", formula: "T(a,b): (x,y) \\rightarrow (x+a, y+b)", description: "Pergeseran" },
      { name: "Refleksi Sumbu X", formula: "(x,y) \\rightarrow (x, -y)", description: "Pencerminan terhadap sumbu x" },
      { name: "Refleksi Sumbu Y", formula: "(x,y) \\rightarrow (-x, y)", description: "Pencerminan terhadap sumbu y" },
      { name: "Refleksi y = x", formula: "(x,y) \\rightarrow (y, x)", description: "Pencerminan terhadap y = x" },
      { name: "Refleksi y = -x", formula: "(x,y) \\rightarrow (-y, -x)", description: "Pencerminan terhadap y = -x" },
      { name: "Refleksi Titik O", formula: "(x,y) \\rightarrow (-x, -y)", description: "Pencerminan terhadap titik O(0,0)" },
      { name: "Rotasi 90° (berlawanan)", formula: "(x,y) \\rightarrow (-y, x)", description: "Rotasi 90° berlawanan arah jarum jam" },
      { name: "Rotasi 90° (searah)", formula: "(x,y) \\rightarrow (y, -x)", description: "Rotasi 90° searah jarum jam" },
      { name: "Rotasi 180°", formula: "(x,y) \\rightarrow (-x, -y)", description: "Rotasi 180° terhadap titik O" },
      { name: "Dilatasi", formula: "D_{O,k}: (x,y) \\rightarrow (kx, ky)", description: "Perbesaran/pengecilan dengan faktor k" },
    ]
  },
  {
    id: "statistika",
    title: "Statistika",
    icon: "📊",
    rumus: [
      { name: "Mean (Rata-rata)", formula: "\\bar{x} = \\frac{\\sum x_i}{n}", description: "Jumlah data dibagi banyak data" },
      { name: "Median (Data Ganjil)", formula: "Me = x_{\\frac{n+1}{2}}", description: "Nilai tengah data ganjil" },
      { name: "Median (Data Genap)", formula: "Me = \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}", description: "Rata-rata dua nilai tengah" },
      { name: "Modus", formula: "Mo = \\text{Nilai yang paling sering muncul}", description: "Nilai dengan frekuensi tertinggi" },
      { name: "Jangkauan", formula: "J = x_{max} - x_{min}", description: "Selisih nilai terbesar dan terkecil" },
      { name: "Kuartil Bawah", formula: "Q_1 = \\text{Median dari data di bawah median}", description: "Kuartil pertama" },
      { name: "Kuartil Atas", formula: "Q_3 = \\text{Median dari data di atas median}", description: "Kuartil ketiga" },
      { name: "Jangkauan Interkuartil", formula: "IQR = Q_3 - Q_1", description: "Selisih kuartil atas dan bawah" },
    ]
  },
  {
    id: "peluang",
    title: "Peluang",
    icon: "🎲",
    rumus: [
      { name: "Peluang", formula: "P(A) = \\frac{n(A)}{n(S)}", description: "n(A) = kejadian A, n(S) = ruang sampel" },
      { name: "Komplemen", formula: "P(A') = 1 - P(A)", description: "Peluang bukan A" },
      { name: "Peluang Gabungan", formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)", description: "A atau B" },
      { name: "Kejadian Saling Lepas", formula: "P(A \\cup B) = P(A) + P(B)", description: "Jika A dan B saling lepas" },
      { name: "Peluang Bersyarat", formula: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}", description: "Peluang A jika B terjadi" },
      { name: "Kejadian Bebas", formula: "P(A \\cap B) = P(A) \\times P(B)", description: "A dan B saling bebas" },
      { name: "Frekuensi Harapan", formula: "f_h = n \\times P(A)", description: "n = banyak percobaan" },
    ]
  },
  {
    id: "pola-bilangan",
    title: "Pola Bilangan",
    icon: "123",
    rumus: [
      { name: "Barisan Aritmatika", formula: "U_n = a + (n-1)b", description: "a = suku pertama, b = beda" },
      { name: "Deret Aritmatika", formula: "S_n = \\frac{n}{2}(2a + (n-1)b) = \\frac{n}{2}(a + U_n)", description: "Jumlah n suku pertama" },
      { name: "Barisan Geometri", formula: "U_n = a \\cdot r^{n-1}", description: "a = suku pertama, r = rasio" },
      { name: "Deret Geometri (r < 1)", formula: "S_n = \\frac{a(1-r^n)}{1-r}", description: "Jumlah n suku pertama" },
      { name: "Deret Geometri (r > 1)", formula: "S_n = \\frac{a(r^n-1)}{r-1}", description: "Jumlah n suku pertama" },
      { name: "Deret Geometri Tak Hingga", formula: "S_\\infty = \\frac{a}{1-r}, \\quad |r| < 1", description: "Jumlah tak hingga" },
    ]
  },
  {
    id: "persamaan-kuadrat",
    title: "Persamaan Kuadrat",
    icon: "x²",
    rumus: [
      { name: "Bentuk Umum", formula: "ax^2 + bx + c = 0", description: "a ≠ 0" },
      { name: "Rumus ABC", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", description: "Rumus mencari akar-akar" },
      { name: "Diskriminan", formula: "D = b^2 - 4ac", description: "D > 0: 2 akar real berbeda, D = 0: 2 akar sama, D < 0: tidak ada akar real" },
      { name: "Jumlah Akar", formula: "x_1 + x_2 = -\\frac{b}{a}", description: "Jumlah kedua akar" },
      { name: "Hasil Kali Akar", formula: "x_1 \\times x_2 = \\frac{c}{a}", description: "Hasil kali kedua akar" },
      { name: "Faktorisasi", formula: "ax^2 + bx + c = a(x - x_1)(x - x_2)", description: "Bentuk faktorisasi" },
    ]
  },
];

const KumpulanRumusPage = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>("bilangan");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (categoryId: string) => {
    playPopSound();
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const filteredData = rumusData.filter(category => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (category.title.toLowerCase().includes(query)) return true;
    return category.rumus.some(r => 
      r.name.toLowerCase().includes(query) || 
      (r.description && r.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2 text-center">
          KUMPULAN RUMUS MATEMATIKA
        </h1>
        <p className="text-white/60 text-sm text-center mb-6 font-body">
          Rumus lengkap matematika SMP
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Cari rumus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/80 backdrop-blur border border-border rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60"
          />
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {filteredData.map((category) => (
            <div
              key={category.id}
              className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-display text-sm font-bold text-white">{category.title}</span>
                  <span className="text-xs text-white/40">({category.rumus.length} rumus)</span>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-5 h-5 text-accent" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/40" />
                )}
              </button>

              {expandedCategory === category.id && (
                <div className="px-4 pb-4 space-y-3">
                  {category.rumus.map((rumus, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-3 border border-white/5"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs text-accent font-medium">{rumus.name}</span>
                        {rumus.description && (
                          <span className="text-xs text-white/40">{rumus.description}</span>
                        )}
                      </div>
                      <div className="text-white text-center py-2 overflow-x-auto">
                        <BlockMath math={rumus.formula} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default KumpulanRumusPage;
