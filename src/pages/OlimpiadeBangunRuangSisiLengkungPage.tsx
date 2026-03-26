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
  title: "MATERI - BANGUN RUANG SISI LENGKUNG",
  sections: [
    {
      heading: "A. Tabung",
      content: `Tabung (silinder) merupakan bangun sisi lengkung yang memiliki bidang alas dan bidang atas berbentuk lingkaran yang sejajar dan kongruen (menyerupai prisma segi-n).

1. Unsur-unsur Tabung
a. Memiliki 3 buah sisi: sisi alas, sisi tutup/atap, dan selimut tabung
b. Memiliki 2 buah rusuk
c. Tinggi tabung: panjang ruas garis dari pusat alas ke pusat tutup

2. Rumus Tabung
Luas selimut tabung = $2\\pi r t$
Luas Permukaan Tabung = $2\\pi r(r + t)$ atau $2\\pi r^2 + 2\\pi r t$
Volume Tabung = $\\pi r^2 t$`
    },
    {
      heading: "B. Kerucut",
      content: `Kerucut merupakan bangun ruang sisi lengkung yang menyerupai limas segi-n beraturan yang bidang alasnya berbentuk lingkaran (limas lingkaran).

1. Unsur-Unsur Kerucut
a. Memiliki 2 buah sisi: sisi alas dan selimut kerucut
b. Memiliki 1 buah rusuk
c. Diameter bidang alas (d)
d. Jari-jari bidang alas (r)
e. Tinggi kerucut (t): jarak dari titik puncak ke pusat bidang alas
f. Selimut kerucut
g. Garis pelukis (s): garis-garis pada selimut kerucut dari titik puncak ke tepi alas

2. Hubungan r, s, dan t pada kerucut:
$s^2 = r^2 + t^2$
$r^2 = s^2 - t^2$
$t^2 = s^2 - r^2$

3. Rumus Kerucut
Luas selimut kerucut = $\\pi r s$
Luas permukaan kerucut = $\\pi r(s + r)$ atau $\\pi rs + \\pi r^2$
Volume kerucut = $\\frac{1}{3}\\pi r^2 t$`
    },
    {
      heading: "C. Bola",
      content: `Bola merupakan bangun ruang sisi lengkung yang dibatasi oleh satu bidang lengkung.

1. Unsur-Unsur Bola
a. Memiliki 1 buah sisi
b. Tidak memiliki rusuk
c. Jarak dari pusat (O) ke permukaan bola sama
d. Diameter bola
e. Jari-jari bola

2. Rumus Bola
Luas permukaan bola = $4\\pi r^2$
Volume bola = $\\frac{4}{3}\\pi r^3$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Banyak rusuk pada tabung adalah ...", options: ["A. Tidak ada", "B. 1 buah", "C. 2 buah", "D. 4 buah"] },
  { no: 2, soal: "Banyak sisi pada bola adalah ...", options: ["A. 4 buah", "B. 3 buah", "C. 2 buah", "D. 1 buah"] },
  { no: 3, soal: "Nomor yang menunjukkan rusuk pada kerucut berikut adalah ...", options: ["A. 1", "B. 2", "C. 3", "D. 4"] },
  { no: 4, soal: "Bentuk bangun dari selimut kerucut adalah ...", options: ["A. Tembereng", "B. Segitiga", "C. Lingkaran", "D. Juring lingkaran"] },
  { no: 5, soal: "Bentuk bangun dari selimut tabung adalah", options: ["A. Segi empat", "B. Persegi panjang", "C. Belah ketupat", "D. Bidang lengkung"] },
  { no: 6, soal: "Perhatikan gambar selimut tabung berikut.\nJari-jari tabung yang terjadi adalah ...", options: ["A. 3,5 cm", "B. 5 cm", "C. 7 cm", "D. 10 cm"] },
  { no: 7, soal: "Suatu tabung tanpa tutup dengan jari-jari alas 6 cm dan tingginya 10 cm. Jika $\\pi = 3,14$ maka luas tabung tanpa tutup adalah ...", options: ["A. 602,88 $cm^2$", "B. 489,84 $cm^2$", "C. 376,84 $cm^2$", "D. 301,44 $cm^2$"] },
  { no: 8, soal: "Suatu kerucut jari-jarinya 7 cm dan tingginya 24 cm. Jika $\\pi = \\frac{22}{7}$, maka luas seluruh permukaan kerucut tersebut adalah ...", options: ["A. 682 $cm^2$", "B. 704 $cm^2$", "C. 726 $cm^2$", "D. 752 $cm^2$"] },
  { no: 9, soal: "Sebuah kerucut luas alasnya 154 $cm^2$. Jika tinggi kerucut 24 cm, maka luas seluruh permukaan kerucut adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 604 $cm^2$", "B. 614 $cm^2$", "C. 704 $cm^2$", "D. 714 $cm^2$"] },
  { no: 10, soal: "Bila luas kulit bola 616 $cm^2$ dan $\\pi = \\frac{22}{7}$, maka jari-jari bola itu adalah ...", options: ["A. 28 cm", "B. 21 cm", "C. 14 cm", "D. 7 cm"] },
  { no: 11, soal: "Luas permukaan $\\frac{3}{4}$ bola padat yang panjang jari-jarinya 7 cm adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 616 $cm^2$", "B. 606 $cm^2$", "C. 462 $cm^2$", "D. 452 $cm^2$"] },
  { no: 12, soal: "Tanti akan membuat dua buah topi ulang tahun dari karton berukuran 30 cm x 50 cm. Jika diameter topi 21 cm dan garis pelukis 20 cm, maka sisa karton yang tidak terpakai adalah ....", options: ["A. 75 $cm^2$", "B. 100 $cm^2$", "C. 150 $cm^2$", "D. 180 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar topi berbentuk kerucut terbuat dari karton berikut ini!\nJika diameter lingkaran alas 28 cm dan tinggi topi 48 cm, luas karton minimal yang diperlukan untuk membuat 3 buah topi tersebut adalah ....", options: ["A. 2.112 $cm^2$", "B. 2.200 $cm^2$", "C. 6.336 $cm^2$", "D. 6.600 $cm^2$"] },
  { no: 14, soal: "Volume kerucut yang panjang diameternya 21 cm dan tinggi 12 cm adalah ...", options: ["A. 231 $cm^3$", "B. 986 $cm^3$", "C. 1.386 $cm^3$", "D. 2.958 $cm^3$"] },
  { no: 15, soal: "Sebuah kerucut setinggi 30 cm memiliki alas dengan keliling 66 cm ($\\pi = \\frac{22}{7}$). Volume kerucut itu adalah...", options: ["A. 16.860 $cm^3$", "B. 10.395 $cm^3$", "C. 6.930 $cm^3$", "D. 3.465 $cm^3$"] },
  { no: 16, soal: "Diketahui luas selimut kerucut 550 $cm^2$. Jika panjang garis pelukisnya 25 cm, maka volume kerucut adalah...", options: ["A. 1.232 $cm^3$", "B. 1.283 $cm^3$", "C. 3.696 $cm^3$", "D. 3.850 $cm^3$"] },
  { no: 17, soal: "Selisih luas permukaan bola berjari-jari 9 cm dan 5 cm dengan $\\pi = \\frac{22}{7}$ adalah ...", options: ["A. 440 $cm^2$", "B. 528 $cm^2$", "C. 628 $cm^2$", "D. 704 $cm^2$"] },
  { no: 18, soal: "Jika luas seluruh permukaan bola 144$\\pi$ $cm^2$, maka volume bola adalah ....", options: ["A. 278$\\pi$ $cm^3$", "B. 288$\\pi$ $cm^3$", "C. 432$\\pi$ $cm^3$", "D. 442$\\pi$ $cm^3$"] },
  { no: 19, soal: "Nasyara akan membuat nasi tumpeng berbentuk kerucut yang permukaannya akan ditutup penuh dengan hiasan dari makanan. Jika diameter tumpeng 28 cm dan tinggi 48 cm, luas tumpeng yang akan di hias makanan adalah...", options: ["A. 2.112 $cm^2$", "B. 2.200 $cm^2$", "C. 2.288 $cm^2$", "D. 2.376 $cm^2$"] },
  { no: 20, soal: "Panjang jari-jari alas kerucut 6 cm. Jika tinggi kerucut 8 cm, maka luas seluruh permukaan kerucut adalah... ($\\pi = 3,14$).", options: ["A. 3024,4 $cm^2$", "B. 3014,4 $cm^2$", "C. 302,44 $cm^2$", "D. 301,44 $cm^2$"] },
  { no: 21, soal: "Atap sebuah gedung berbentuk setengah bola dengan panjang diameter 14 m. Atap gedung tersebut akan dicat dengan biaya Rp50.000,00 setiap $m^2$. Biaya yang diperlukan untuk mengecat atap gedung itu adalah ....", options: ["A. Rp13.700.000,00", "B. Rp15.400.000,00", "C. Rp15.850.000,00", "D. Rp16.400.000,00"] },
  { no: 22, soal: "Kubah masjid berbentuk setengah bola yang akan dilapisi alumunium disisi luarnya. Panjang jari-jari kubah 3,5 m, luas alumunium yang dibutuhkan adalah ....", options: ["A. 77 $m^2$", "B. 154 $m^2$", "C. 770 $m^2$", "D. 1540 $m^2$"] },
  { no: 23, soal: "Volume sebuah kerucut adalah 314 $cm^3$, Jika jari-jari alasnya 5 cm dan $\\pi = 3,14$, maka panjang garis pelukisnya adalah ...", options: ["A. 4 cm", "B. 12 cm", "C. 13 cm", "D. 20 cm"] },
  { no: 24, soal: "Sebuah drum berbentuk tabung dengan panjang jari-jari 70 cm dan tinggi 100 cm penuh berisi minyak tanah. Minyak tanah tersebut akan dituang ke dalam tabung-tabung kecil dengan panjang jari-jari 35 cm dan tinggi 50 cm. Banyak tabung kecil yang akan diperlukan adalah....", options: ["A. 2 buah", "B. 4 buah", "C. 6 buah", "D. 8 buah"] },
  { no: 25, soal: "Sebuah drum berbentuk tabung dengan diameter alas 10 cm dan tinggi 100 cm. Bila $\\frac{3}{4}$ bagian dari drum berisi minyak, banyak minyak di dalam drum tersebut adalah ...", options: ["A. 8587,5 $cm^3$", "B. 8578,5 $cm^3$", "C. 5887,5 $cm^3$", "D. 5878,5 $cm^3$"] },
  { no: 26, soal: "Panjang jari-jari dua buah bola masing-masing adalah 12 cm dan 20 cm. tentukan perbandingan volume kedua bola itu...", options: ["A. 27 : 125", "B. 9 : 25", "C. 3 : 20", "D. 3 : 5"] },
  { no: 27, soal: "Sebuah kerucut mempunyai volume 40 $cm^3$, jika diameter kerucut diperbesar 2 kali dan tinggi diperbesar 3 kali, maka volume kerucut yang baru adalah ....", options: ["A. 240 $cm^3$", "B. 480 $cm^3$", "C. 720 $cm^3$", "D. 1440 $cm^3$"] },
  { no: 28, soal: "Diketahui volume suatu kerucut 120 $cm^3$, jika diameter kerucut diperbesar dua kali dan tinggi diperpanjang 3 kali, maka volume kerucut sekarang adalah....", options: ["A. 240 $cm^3$", "B. 480 $cm^3$", "C. 1.440 $cm^3$", "D. 1.540 $cm^3$"] },
  { no: 29, soal: "Sebuah kertas karton berbentuk juring lingkaran dengan sudut pusat $216^0$ dan panjang jari-jarinya 15 cm. Jika kertas karton tersebut dibuat kerucut, maka volume kerucut maksimum adalah ....", options: ["A. $324\\pi$ $cm^3$", "B. $405\\pi$ $cm^3$", "C. $620\\pi$ $cm^3$", "D. $675\\pi$ $cm^3$"] },
  { no: 30, soal: "Perhatikan gambar!\nLuas permukaan bangun ruang tersebut adalah ....", options: ["A. 550 $cm^2$", "B. 1320 $cm^2$", "C. 1474 $cm^2$", "D. 1584 $cm^2$"] },
  { no: 31, soal: "Perhatikan gambar!\nLuas permukaan gambar disamping adalah ...", options: ["A. 400$\\pi$ $cm^2$", "B. 800$\\pi$ $cm^2$", "C. 1200$\\pi$ $cm^2$", "D. 1600$\\pi$ $cm^2$"] },
  { no: 32, soal: "Perhatikan gambar!\nGambar diatas merupakan sebuah bandul terbuat dari logam. Jika berat setiap 1 $cm^3$ adalah 15 gram, maka berat bandul seluruhnya adalah ....", options: ["A. 7122 gram", "B. 7212 gram", "C. 7222 gram", "D. 7232 gram"] },
  { no: 33, soal: "Sebuah bandul terdiri dari kerucut dan belahan bola. Jika diameter bola 14 cm dan garis pelukis kerucutnya 25 cm, maka volume bandul tersebut adalah ....", options: ["A. 132,6 $cm^3$", "B. 1232,0 $cm^3$", "C. 1950,7 $cm^3$", "D. 2002,0 $cm^3$"] },
  { no: 34, soal: "Perhatikan gambar benda padat berbentuk tabung dan setengah bola berikut!\nLuas permukaan benda tersebut adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 702 cm²", "B. 802 cm²", "C. 902 cm²", "D. 1.002 cm²"] },
  { no: 35, soal: "Perhatikan gambar berikut!\nSebuah peluru terbentuk dari tabung dan kerucut. Volume peluru tersebut adalah...", options: ["A. 4.312,0 $cm^3$", "B. 4.230,0 $cm^3$", "C. 4.358,2 $cm^3$", "D. 5.312,4 $cm^3$"] },
  { no: 36, soal: "Bangun pada gambar berikut terdiri dari tabung dan belahan bola.\nLuas permukaan bangun tersebut adalah....", options: ["A. 880 $cm^2$", "B. 1.496 $cm^2$", "C. 1.596 $cm^2$", "D. 2.010 $cm^2$"] },
  { no: 37, soal: "Gambar di bawah adalah sebuah bola dimasukkan ke sebuah tabung, jika luas permukaan bola 616 $cm^2$. Maka luas permukaan tabung adalah ....", options: ["A. 360 $cm^2$", "B. 300 $cm^2$", "C. 160 $cm^2$", "D. 150 $cm^2$"] },
  { no: 38, soal: "Sebuah bak air berbentuk tabung dengan diameter 140 cm dan memiliki tinggi 1 m yang terisi penuh. Dari tabung tersebut dialirkan air melalui kran dengan debit 20 liter/menit selama 1 jam. Maka volume air yang masih tersisa adalah ...", options: ["A. 40 liter", "B. 140 liter", "C. 240 liter", "D. 340 liter"] },
  { no: 39, soal: "Ke dalam tabung berisi air setinggi 30 cm dimasukkan 6 bola besi yang masing-masing berjari-jari 7 cm. Jika diameter tabung 28 cm, tinggi air dalam tabung setelah dimasukkan enam bola besi adalah ...", options: ["A. 37 cm", "B. 42 cm", "C. 44 cm", "D. 52 cm"] },
  { no: 40, soal: "Sebuah tabung berdiameter 24 cm dan tinggi 50 cm diisi air $\\frac{3}{5}$ dari tingginya. Tiga buah bola besi berjari-jari 6 cm dimasukan kedalam tabung. Tinggi air dalam tabung sekarang adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 32 cm", "B. 34 cm", "C. 36 cm", "D. 42 cm"] },
  { no: 41, soal: "Sebuah tabung berjari-jari 10 cm dan tinggi 50 cm berisi air $\\frac{3}{5}$ tinggi tabung. Jika 4 bola besi berjari-jari 5 cm dimasukkan ke dalam tabung, maka permukaan air pada tabung akan naik setinggi ...", options: [] },
  { no: 42, soal: "Sebuah torn pengisi air berbentuk tabung dengan diameter 2 m dan tinggi 10 m. Torn tersebut diisi air dengan debit air 20 liter/menit. Maka torn tersebut akan terisi air hingga penuh selama ...", options: ["A. 2 jam 15 menit", "B. 2 jam 27 menit", "C. 2 jam 37 menit", "D. 2 jam 38 menit"] },
  { no: 43, soal: "Sebuah bola logam dimasukkan ke dalam tabung yang berisi air sehingga permukaan air di dalam tabung menjadi naik. Hitunglah tinggi air yang naik jika diameternya 3 cm dan diameter tabung 5 cm.", options: ["A. 0,72", "B. 52", "C. 18", "D. 7,2"] },
  { no: 44, soal: "Fitra menyalakan lilin berbentuk tabung dengan diameter 2,8 cm dan tinggi 15 cm. Jika setiap menit lilin terbakar 1,68 $cm^3$, maka lilin akan habis terbakar dalam waktu ... ($\\pi = \\frac{22}{7}$)", options: ["A. 48 menit", "B. 50 menit", "C. 55 menit", "D. 56 menit"] },
  { no: 45, soal: "Wadah pembuatan es cream berbentuk tabung dengan diameter 0,2 m dan tinggi 0,75 m. Jika es cream tersebut dimasukkan kedalam corong-corong es cream berbentuk kerucut dengan jari-jari 2,5 cm dan tinggi 10 cm. Maka banyak corong es cream yang dibutuhkan adalah...", options: ["A. 60", "B. 120", "C. 240", "D. 360"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2004 Tingkat Kota\nSebuah tempat air berbentuk kerucut. Untuk mengisi tempat itu dengan air sampai pada ketinggian $\\frac{1}{2}t$ diperlukan air sebanyak 38,5 liter. Volum air yang diperlukan untuk memenuhi tempat tersebut adalah ... liter", options: [] },
  { no: 2, soal: "OSN Matematika 2005 Tingkat Kota\nPompa air merk Tangguh sanggup memompa sebanyak 25 liter setiap menit. Pompa merek perkasa sanggup memompa air 400 cc setiap detik, sedangkan merek Tahan Banting sanggup memompa 1,6 $m^3$ setiap jam. Pompa manakah yang paling cepat mengisi sebuah tangka air berkapasitas 500 liter.", options: [] },
  { no: 3, soal: "OSN Matematika 2006 Tingkat Kota\nDiberikan kerucut dengan volume 77 $cm^3$. Jika tinggi kerucut itu 6 cm, maka jari-jari alasnya adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 2 cm", "B. 3,5 cm", "C. 7 cm", "D. 10,3 cm", "E. 12,25 cm"] },
  { no: 4, soal: "OSN Matematika 2008 Tingkat Kota\nSuatu kerucut tegak tertutup yang berisi air dengan diameter alas d cm dan tinggi x cm. tinggi air pada kerucut adalah $\\frac{1}{2}x$ cm. jika posisi kerucutnya dibalik, maka tinggi air kerucut tersebut adalah ...", options: [] },
  { no: 5, soal: "OSN Matematika 2011 Tingkat Kota\nPada gambar berikut tabung berisi air, tinggi dan diameter tabung tersebut adalah 18 cm dan 6 cm. kemudian ke dalam tabung dimasukkan 3 bola pejal identic (sama bentuk) sehingga bola tersebut menyinggung sisi tabung dan air dalam tabung keluar, maka sisa air di dalam tabung adalah ... $cm^3$", options: ["A. $51\\pi$", "B. $52\\pi$", "C. $53\\pi$", "D. $54\\pi$", "E. $54\\pi$"] },
  { no: 6, soal: "OSN Matematika 2013 Tingkat Kota\nSebuah silinder tegak diletakkan di dalam kubus ABCD.EFGH dengan panjang sisi kubus 2 m. selanjutnya silinder dipancung oleh bidang miring yang melalui titik A, B dan T Dimana T adalah titik perpotongan diagonal bidang CDHG. Volume terbesar silinder terpancung ini adalah ... $m^3$", options: ["A. $\\frac{3\\pi}{2}$", "B. $\\frac{4\\pi}{3}$", "C. $\\frac{5\\pi}{4}$", "D. $\\frac{5\\pi}{3}$", "E. $\\frac{7\\pi}{5}$"] },
  { no: 7, soal: "OSN Matematika 2015 Tingkat Kota\nDua botol yang berukuran sama berisi penuh dengan larutan gula. Rasio kandungan gula dan air pada botol pertama adalah 2 : 11 dan pada botol kedua 3 : 5. Jika isi botol tersebut dicampurkan, maka rasio kandungan gula dan air hasil campurannya adalah ...", options: [] },
  { no: 8, soal: "OSN Matematika 2016 Tingkat Kota\nKetika suatu segitiga siku-siku diputar pada salah satu sisi siku-sikunya, maka diperoleh kerucut dengan volume $392\\pi$ $cm^3$. Bila diputar pada sisi siku-siku lainnya akan diperoleh kerucut dengan volume $1344\\pi$ $cm^3$. Panjang sisi miring segitiga siku-siku tersebut adalah ... cm", options: [] },
  { no: 9, soal: "OSN Matematika 2019 Tingkat Kota\nDua akuarium A dan B diisi air sehingga volumnya sama yaitu 64.000 $cm^3$. Anto memiliki 30 kelereng kecil dan 20 kelereng besar yang ajan dimasukkan ke dalam akuarium tersebut. Ke dalam akuarium A dimasukkan 7 kelereng kecil dan 7 kelereng besar sehingga volum akuarium yang terisi menjadi $64821\\frac{1}{3}$ $cm^3$. Sedangkan, kedalam akuarium B dimasukkan 21 kelereng kecil dan 7 kelereng besar sehingga volum akuarium yang terisi menjadi 64880 $cm^3$. Volum seluruh kelereng Anto yang tidak dimasukkan ke akuarium adalah ... $cm^3$", options: ["A. $113\\frac{3}{21}$", "B. $226\\frac{6}{21}$", "C. $251\\frac{9}{21}$", "D. $687\\frac{5}{21}$"] },
  { no: 10, soal: "OSN Matematika 2019 Tingkat Kota\nPerhatikan gambar di bawah ini. Gambar tersebut adalah gambar kap lampu yang tidak mempunyai alas dan tutup. Alas dan tutup kap lampu berbentuk lingkaran. Luas bahan untuk membuat kap lampu tersebut adalah ... $cm^2$", options: ["A. 1130,4", "B. 1120", "C. 565,2", "D. 560,2"] },
  { no: 11, soal: "OSN Matematika 2019 Tingkat Kota\nABCD adalah jajargenjang. E adalah titik Tengah AB. Ruas garis DE memotong AC di titik P. perbandingan luas jajargenjang ABCD dengan luas segitiga AEP adalah ...", options: ["A. 12 : 1", "B. 8 : 1", "C. 6 : 1", "D. 4 : 1"] },
  { no: 12, soal: "OSN Matematika 2020 Tingkat Kota\n$R_t$ dan $R_k$ berturut-turut menyatakan jari-jari tabung dan jari-jari kerucut. Jika tinggi tabung dan tinggi kerucut adalah 3600 cm, volum tabung $490\\pi$ liter dan volum kerucut $30\\pi$ liter, maka hubungan antara $R_t$ dan $R_k$ adalah ...", options: ["A. $7R_t = 3R_k$", "B. $3R_t = 7R_k$", "C. $6R_t = 7R_k$", "D. $6R_t = 3R_k$"] },
  { no: 13, soal: "OSN Matematika 2020 Tingkat Kota\nDi dalam sebuah kerucut terdapat sebuah balok. Volum kerucut $600\\pi$ $cm^3$ dan jari-jarinya 10 cm. jika tinggi balok setengah tinggi kerucut, maka volum balok terbesar yang ada di dalam kerucut adalah ...", options: ["A. 72 $cm^3$", "B. 225 $cm^3$", "C. 450 $cm^3$", "D. 900 $cm^3$"] },
  { no: 14, soal: "OSN Matematika 2022 Tingkat Kota\nDiketahui persegi ABCD dengan panjang sisi 12 cm. titik P terletak pada sisi CD dengan CP : DP = 1 : 2. Persegi ini akan dibentuk menjadi selimut tabung dengan cara mempertemukan sisi AD dengan sisi BC. Jika jarak titik A ke titik P di selimut tabung yang terbentuk adalah $\\sqrt{a^2 + b}$ cm, maka a + b = ...", options: ["A. 252", "B. 260", "C. 180", "D. 165"] },
  { no: 15, soal: "OSN Matematika 2023 Tingkat Kota\nSuatu bak penampung air berbentuk kerucut terbalik (seperti gambar) berisi air dengan volume 1 liter. Jika bak penampungan tersebut ditambahkan air sebanyak 331 mililiter, maka perbandingan antara tinggi air di dalam bak penampungan mula-mula dan setelah ditambahkan air adalah ...", options: ["A. 10 : 11", "B. 11 : 13", "C. 331 : 1000", "D. 1000 : 1331"] },
  { no: 16, soal: "OSN Matematika 2023 Tingkat Provinsi\nSuatu kerucut memiliki jari jari alas 3 cm dan panjang sisi miring 5 cm. kerucut tersebut di celupkan dalam posisi tegak kedalam suatu wadah cukup besar yang berisi cat. pada saat keseluruhan alas kerucut menyentuh alas wadah cat, ketinggian cat pada wadah adalah 2 cm, sehingga sebagian kerucut akan tertutup cat. jika perbandingan luas permukaan yang tertutup cat terhadap keseluruhan permukaan kerucut dapat dinyatakan dalam pecahan paling sederhana $\\frac{a}{b}$, maka nilai a + b adalah ...", options: [] },
  { no: 17, soal: "OSN Matematika 2024 Tingkat Kota\nDiketahui suatu kerucut dengan titik puncak T, pusat sisi alas O, dan diameter alas AB. Titik C berada pada ruas garis AT dengan AC = OC = 11 cm. titik D merupakan titik potong antara garis OT dan BC dengan DC = 7 cm. volume kerucut tersebut adalah ... $cm^3$", options: ["A. $196\\pi$", "B. $960\\pi$", "C. $1960\\pi$", "D. $9600\\pi$"] },
  { no: 18, soal: "OSN Matematika 2024 Tingkat Kota\nDiberikan 4 bola pejal berukuran sama dengan diameter 22 cm dan sebuah silinder dengan diameter 46 cm. dua bola diletakkan di dasar silinder dengan jarak pusat keduanya 24 cm. dua bola sisanya juga dimasukkan ke dalam silinder dengan jarak antar pusat keduanya 24 cm dan garis yang menghubungkan kedua pusat bola ini tegak lurus dengan garis yang menghubungkan kedua pusat bola sebelumnya. Jika air dimasukkan ke dalam silinder sehingga menutupi seluruh permukaan bola, maka volume minimum air yang dimasukkan adalah ... $cm^3$", options: ["A. $307\\frac{1}{3}\\pi$", "B. $529\\frac{1}{3}\\pi$", "C. $1694\\pi$", "D. $7098\\frac{2}{3}\\pi$"] },
];

const OlimpiadeBangunRuangSisiLengkungPage = () => {
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
          OLIMPIADE - BANGUN RUANG SISI LENGKUNG
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

        {/* Latihan Olimpiade Tab */}
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
            Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeBangunRuangSisiLengkungPage;
