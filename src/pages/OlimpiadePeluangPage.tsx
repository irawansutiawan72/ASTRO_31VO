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
  title: "MATERI - KAIDAH PENCACAHAN DAN PELUANG",
  sections: [
    {
      heading: "A. Notasi Faktorial",
      content: `Dalam matematika perkalian $3 \\times 2 \\times 1$ dinotasikan dengan $3!$ dibaca 3 faktorial.
Demikian juga dengan:
- $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1$
- $10! = 10 \\times 9 \\times 8 \\times ... \\times 3 \\times 2 \\times 1$

Jadi, untuk n bilangan bulat positif, maka:
$n! = n(n-1)(n-2) \\times ... \\times 3 \\times 2 \\times 1$
Dengan $1! = 1$ dan $0! = 1$`
    },
    {
      heading: "B. Kaidah Pencacahan",
      content: `1. Aturan Perkalian
Jika peristiwa pertama dapat dilakukan dengan r cara yang berbeda dan setiap cara ini dilanjutkan dengan peristiwa kedua yang dapat dilakukan dengan s cara berbeda, maka kedua peristiwa tersebut dapat dilakukan secara bersama-sama dengan $r \\times s$ cara yang berbeda.

Apabila suatu peristiwa terdiri dari n tahap yang berurutan di mana peristiwa pertama dapat dilakukan dengan $r_1$ cara, peristiwa kedua dengan $r_2$ cara, dan seterusnya hingga peristiwa ke-n dengan $r_n$ cara, maka peristiwa tersebut dapat dilakukan secara bersama-sama dengan $r_1 \\times r_2 \\times ... \\times r_n$ cara.

2. Aturan Penjumlahan
Apabila suatu peristiwa terdiri dari n tahap yang saling lepas di mana peristiwa pertama dapat dilakukan dengan $r_1$ cara, peristiwa kedua dengan $r_2$ cara, dan seterusnya hingga peristiwa ke-n dengan $r_n$ cara, maka total peristiwa tersebut adalah $r_1 + r_2 + ... + r_n$ cara.`
    },
    {
      heading: "C. Permutasi",
      content: `1. Permutasi dengan Semua Unsur Berbeda
Permutasi adalah susunan yang berbeda yang dapat dibentuk dari n unsur, yang diambil dari n unsur atau sebagian unsur.

Jika ada n unsur yang berbeda diambil n unsur, maka banyak susunan (permutasi) yang berbeda dari n unsur tersebut adalah:
$P(n, n) = n!$

2. Permutasi dengan Sebagian Unsur yang Berbeda
Banyak permutasi r unsur yang diambil dari n buah unsur yang berbeda adalah:
$P(n, r) = \\frac{n!}{(n-r)!}$ untuk $r < n$

3. Permutasi dengan Beberapa Unsur yang Sama
Banyaknya cara membagi n buah unsur ke dalam k sel yang masing-masing berisi $n_1, n_2, ..., n_k$ unsur adalah:
$P(n_1, n_2, ..., n_k) = \\frac{n!}{n_1! \\cdot n_2! \\cdot ... \\cdot n_k!}$

4. Permutasi Siklis (Permutasi Melingkar)
Secara umum banyaknya permutasi siklis dari n obyek adalah $(n - 1)!$`
    },
    {
      heading: "D. Kombinasi",
      content: `Kombinasi adalah permutasi "tanpa memperhatikan urutan unsur yang terpilih".

Secara umum kombinasi r unsur dari n unsur yang diketahui di mana $r \\leq n$ adalah:
$C(n, r) = \\frac{P(n, r)}{r!} = \\frac{n!}{(n-r)! \\cdot r!}$

Atau dapat ditulis sebagai:
$\\binom{n}{r} = \\frac{n!}{(n-r)! \\cdot r!}$

Contoh: Dalam suatu ulangan Matematika, setiap siswa diwajibkan menjawab 5 soal dari 8 soal yang diajukan. Berapa banyak pilihan untuk menjawab soal tersebut?
$C(8, 5) = \\frac{8!}{(8-5)! \\cdot 5!} = \\frac{8!}{3! \\cdot 5!} = 56$`
    },
    {
      heading: "E. Ruang Sampel",
      content: `Ruang sampel adalah himpunan semua kemungkinan hasil dari suatu percobaan, dilambangkan dengan S.

Contoh:
1. Mengambil satu bola secara acak dari dalam suatu kantong yang berisi tiga bola berwarna kuning (K), merah (M), dan hijau (H).
   Ruang sampel: S = {K, M, H}

2. Melemparkan satu mata uang logam: S = {A, G} (ada 2)

3. Melemparkan dua mata uang logam: S = {AA, AG, GA, GG} (ada 4)

4. Melemparkan tiga mata uang logam: S = {AAA, AAG, AGA, AGG, GAA, GAG, GGA, GGG} (ada 8)

Rumus jumlah ruang sampel adalah "jumlah kemungkinan hasil" dipangkatkan dengan "jumlah objek":
$n(S) = k^n$ dimana k adalah kemungkinan untuk setiap objek dan n adalah jumlah objek.`
    },
    {
      heading: "F. Peluang",
      content: `Jika suatu percobaan menghasilkan n titik contoh yang masing-masing berpeluang sama dan kejadian A terjadi dengan tepat k cara di mana k merupakan anggota dari titik contoh, maka:
$P(A) = \\frac{k}{n} = \\frac{n(A)}{n(S)}$ untuk $k \\leq n$

Kisaran Nilai Peluang:
- $0 \\leq P(E) \\leq 1$, untuk setiap E
- $P(S) = 1$
- $P(E_1 \\cup E_2) = P(E_1) + P(E_2)$, untuk $E_1$ dan $E_2$ kejadian yang saling lepas`
    },
    {
      heading: "G. Frekuensi Harapan",
      content: `$F_h = n \\times P(A)$

Dengan:
- $F_h$ = frekuensi harapan suatu kejadian A
- n = banyaknya percobaan
- P(A) = peluang kejadian A

Contoh: Diketahui peluang seorang menembak tepat sasaran adalah $\\frac{1}{5}$. Jika penembak itu menembak 150 kali tembakan, berapakah banyaknya tembakan yang diharapkan mengenai sasaran?

$F_h = \\frac{1}{5} \\times 150 = 30$ kali`
    },
    {
      heading: "H. Komplemen Suatu Kejadian",
      content: `Kejadian bukan A dari himpunan S ditulis dengan simbol A' atau $A^c$ dan disebut komplemen dari A.

Jika A mempunyai a elemen, dan S mempunyai n elemen, maka A' mempunyai n - a elemen.
Maka P(A') adalah peluang tidak terjadinya A, dan:
$P(A') = 1 - P(A)$

Contoh: Jika peluang hari esok akan turun hujan adalah 0,45; berapa peluang bahwa cuaca akan cerah esok hari?
$P(H^c) = 1 - P(H) = 1 - 0,45 = 0,55$`
    },
    {
      heading: "I. Kejadian Majemuk",
      content: `1. Dua Kejadian Saling Lepas
Jika A dan B dua kejadian yang saling lepas (saling asing/saling eksklusif), maka:
$P(A \\cup B) = P(A) + P(B)$

Untuk kejadian yang tidak saling lepas:
$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$

2. Dua Kejadian Saling Bebas
Jika $E_1$ dan $E_2$ adalah dua kejadian dengan syarat bahwa peluang kejadian $E_1$ tidak mempengaruhi kejadian $E_2$, maka $E_1$ dan $E_2$ disebut sebagai kejadian saling bebas:
$P(E_1 \\cap E_2) = P(E_1) \\cdot P(E_2)$

3. Kejadian Bersyarat
Jika kejadian $E_1$ mempengaruhi kejadian $E_2$:
$P(E_1 \\cap E_2) = P(E_1) \\cdot P(E_2 | E_1)$
$P(E_2 | E_1)$ dibaca: peluang kejadian $E_2$ dengan syarat $E_1$ telah terjadi.`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Dari angka 0, 1, 2, 3, 4, 5, 6, akan dibentuk bilangan 3 angka berbeda yang habis dibagi 5. Berapa banyak bilangan yang dapat terbentuk?", options: ["A. 49", "B. 30", "C. 55", "D. 60"] },
  { no: 2, soal: "Berapa banyak susunan huruf dari kata 'MATEMATIKA' jika kedua huruf 'M' tidak boleh bersebelahan?", options: ["A. 120960", "B. 30240", "C. 60480", "D. 151200"] },
  { no: 3, soal: "Lima pasang suami istri (10 orang) akan duduk mengelilingi meja bundar. Berapa banyak cara mereka duduk jika setiap pasangan suami istri harus duduk berdampingan?", options: ["A. 3840", "B. 362880", "C. 120", "D. 768"] },
  { no: 4, soal: "Sebuah delegasi terdiri dari 5 orang akan dipilih dari 6 pria dan 4 wanita. Berapa banyak cara memilih delegasi tersebut jika minimal harus ada 2 wanita dalam delegasi?", options: ["A. 252", "B. 66", "C. 120", "D. 186"] },
  { no: 5, soal: "Seorang siswa harus mengerjakan 8 dari 10 soal ujian. Tetapi, 3 soal pertama (no 1, 2, 3) wajib dikerjakan. Berapa banyak cara siswa tersebut memilih sisa soal yang akan dikerjakan?", options: ["A. 45", "B. 120", "C. 21", "D. 56"] },
  { no: 6, soal: "Di sebuah kelas, ada 30 siswa. 15 siswa suka Matematika, 20 siswa suka Fisika, dan 10 siswa suka Kimia. 8 siswa suka Matematika dan Fisika, 5 siswa suka Fisika dan Kimia, 3 siswa suka Matematika dan Kimia. Jika 2 siswa suka ketiga-tiganya, berapa banyak siswa yang tidak suka satupun dari ketiga pelajaran tersebut?", options: ["A. 0", "B. 3", "C. 1", "D. 2"] },
  { no: 7, soal: "Dalam sebuah kotak terdapat 10 bola merah, 8 bola biru, dan 12 bola hijau. Berapa jumlah minimal bola yang harus diambil (tanpa melihat) untuk menjamin bahwa setidaknya 5 bola berwarna sama telah terambil?", options: ["A. 12", "B. 15", "C. 13", "D. 9"] },
  { no: 8, soal: "Empat orang (A, B, C, D) masing-masing meletakkan topinya di atas meja. Kemudian, masing-masing mengambil satu topi secara acak. Berapa banyak cara sehingga tidak ada satupun orang yang mengambil topinya sendiri?", options: ["A. 24", "B. 9", "C. 8", "D. 6"] },
  { no: 9, soal: "Dalam sebuah pertemuan, setiap orang yang hadir berjabat tangan satu kali dengan setiap orang lainnya. Jika total jabat tangan yang terjadi adalah 120, berapa banyak orang yang hadir di pertemuan tersebut?", options: ["A. 15", "B. 16", "C. 20", "D. 60"] },
  { no: 10, soal: "6 pasang suami istri (total 12 orang) menghadiri sebuah pesta. Mereka semua saling berjabat tangan tepat satu kali dengan orang lain, kecuali dengan pasangan (suami/istri) mereka sendiri. Berapa total jabat tangan yang terjadi?", options: ["A. 30", "B. 55", "C. 60", "D. 66"] },
  { no: 11, soal: "Disediakan angka-angka 0, 1, 2, 3, 4, dan 5. Akan dibentuk bilangan 3 angka (ratusan) yang GENAP, dan angka-angkanya boleh berulang. Berapa banyak bilangan yang dapat terbentuk?", options: ["A. 60", "B. 75", "C. 90", "D. 108"] },
  { no: 12, soal: "Sebuah dadu dilambungkan satu kali. Peluang muncul mata dadu bilangan prima adalah...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{2}{9}$", "C. $\\frac{3}{6}$", "D. $\\frac{4}{6}$"] },
  { no: 13, soal: "Dua buah dadu dilempar bersama-sama, peluang munculnya dadu berjumlah 9 adalah ...", options: ["A. $\\frac{1}{9}$", "B. $\\frac{3}{4}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 14, soal: "Dalam percobaan melempar 2 buah dadu, peluang muncul mata dadu berjumlah lebih dari 7 adalah ...", options: ["A. $\\frac{1}{18}$", "B. $\\frac{5}{36}$", "C. $\\frac{5}{12}$", "D. $\\frac{7}{18}$"] },
  { no: 15, soal: "Jika dipilih satu huruf dari M A T E M A T I K A, maka peluang yang terpilih huruf A adalah ...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{5}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 16, soal: "Di dalam sebuah kotak terdapat kelereng sebanyak bernomor 1 sampai dengan 15. Jika dilakukan pengambilan 1 kelereng secara acak dan terambil kelereng bernomor 9, serta kelereng tersebut tidak dikembalikan, maka peluang terambilnya kelereng bernomor ganjil pada pengambilan kedua adalah ...", options: ["A. $\\frac{8}{14}$", "B. $\\frac{7}{14}$", "C. $\\frac{8}{15}$", "D. $\\frac{7}{15}$"] },
  { no: 17, soal: "Dalam sebuah kantong terdapat bola bernomor 1 sampai dengan 13. Bola merah bernomor 1 sampai dengan 4, bola biru bernomor 5 sampai dengan 8 dan sisanya bola putih. Dari kantong tersebut diambil sebuah bola secara acak dan terambil bola biru. Peluang terambilnya bola bernomor kelipatan tiga dan berwarna putih pada pengambilan kedua adalah ...", options: ["A. $\\frac{1}{2}$", "B. $\\frac{1}{5}$", "C. $\\frac{1}{6}$", "D. $\\frac{2}{13}$"] },
  { no: 18, soal: "Pada seleksi pegawai sebuah perusahaan, seorang calon dapat diterima apabila lulus tes akademik dan tes fisik. Dari hasil seleksi, 25 lulus tes akademik, 20 lulus tes fisik dan 15 orang lulus keduanya. Saat pengumuman peserta tes dipanggil satu-persatu. Peluang terpanggil peserta yang hanya lulus tes fisik adalah ...", options: ["A. $\\frac{5}{6}$", "B. $\\frac{2}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{1}{6}$"] },
  { no: 19, soal: "Tiga mata uang ditos bersama-sama. Peluang munculnya dua angka dan satu gambar adalah ...", options: ["A. $\\frac{3}{4}$", "B. $\\frac{2}{4}$", "C. $\\frac{3}{8}$", "D. $\\frac{2}{8}$"] },
  { no: 20, soal: "Dalam percobaan melempar 3 uang logam secara bersamaan, peluang muncul minimal 2 angka adalah...", options: ["A. 0,375", "B. 0,500", "C. 0,667", "D. 0,875"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2004 Tingkat Kota\nDengan menggunakan uang koin Rp50,00 ; Rp100,00 dan Rp200,00 ; ada berapa carakah kita menyatakan uang sebesar Rp2000,00.", options: ["A. 20", "B. 65", "C. 95", "D. 106", "E. 121"] },
  { no: 2, soal: "OSN Matematika 2004 Tingkat Kota\nAlex selalu berbohong pada hari kamis, jumat dan sabtu. Pada hari lain Alex selalu jujur. Di lain pihak Frans selalu berbohong pada hari-hari minggu, senin dan selasa dan selalu jujur pada hari-hari lain. Pada suatu hari keduanya berkata: 'kemarin saya berbohong'. Hari mereka mengucapkan perkataan tersebut adalah hari ...", options: [] },
  { no: 3, soal: "OSN Matematika 2005 Tingkat Kota\nSepuluh pasang suami istri mengikuti suatu pesta. Mereka kemudian saling berjabat tangan satu sama lain. Namun demikian, setiap pasang suami istri tidak pernah berjabat tangan, maka banyaknya jabatan tangan yang terjadi adalah ...", options: [] },
  { no: 4, soal: "OSN Matematika 2007 Tingkat Kota\nBanyak jalan terpendek dari P ke Q adalah ...", options: ["A. 4", "B. 16", "C. 22", "D. 60", "E. 80"] },
  { no: 5, soal: "OSN Matematika 2007 Tingkat Kota\nBanyak bilangan asli yang kurang dari 10.000 dengan jumlah digit pertama dan digit terakhirnya sama dengan 11 adalah ...", options: ["A. 999", "B. 888", "C. 800", "D. 444", "E. 400"] },
  { no: 6, soal: "OSN Matematika 2007 Tingkat Kota\nDua mata uang dilempar empat kali berturut-turut. Peluang muncul angka pertama kali pada pelemparan keempat adalah ...", options: ["A. $\\frac{1}{4^4}$", "B. $\\frac{2}{4^4}$", "C. $\\frac{3}{4^4}$", "D. $\\frac{1}{2^4}$", "E. $\\frac{1}{4}$"] },
  { no: 7, soal: "OSN Matematika 2007 Tingkat Kota\nUntuk meningkatkan penjualan, suatu perusahaan memberikan hadiah yang dimuat dalam setiap kotak susu yang dijual satu dari empat seri buku secara acak. Jika Ghina membeli empat kotak susu, maka peluang Ghina mendapatkan semua seri buku hadiah adalah ...", options: ["A. $\\frac{1}{256}$", "B. $\\frac{3}{256}$", "C. $\\frac{3}{32}$", "D. $\\frac{1}{4}$", "E. 1"] },
  { no: 8, soal: "OSN Matematika 2008 Tingkat Kota\nBapak Zaenal dan ibu Zaenal sedang merencanakan nama bagi anak mereka yang akan segera lahir dengan nama yang terdiri dari 3 kata dengan nama belakang Zaenal. Mereka menginginkan inisial/singkatan nama anak tersebut adalah terurut menurut abjad dengan tak ada huruf yang berulang. Banyak pilihan inisial nama yang dapat dipergunakan adalah ...", options: ["A. 25", "B. 125", "C. 150", "D. 300", "E. 600"] },
  { no: 9, soal: "OSN Matematika 2008 Tingkat Kota\nSeorang pedagang menjajakan 10 jeruk manis dan 5 jeruk masam yang kesemuanya terlihat sama dan diletakkan dalam satu keranjang yang sama. Jika Ana ingin membeli dua buah jeruk dan mengambilnya sekaligus secara sembarang, maka peluang Ana akan memperoleh dua jeruk dengan rasa yang sama adalah ...", options: ["A. $\\frac{1}{21}$", "B. $\\frac{1}{105}$", "C. $\\frac{11}{21}$", "D. $\\frac{2}{15}$", "E. $\\frac{11}{21}$"] },
  { no: 10, soal: "OSN Matematika 2008 Tingkat Kota\nBilangan-bilangan 3, 4 dan 7 disubstitusikan sembarang dan boleh berulang untuk menggantikan konstanta-konstanta a, b dan c pada persamaan kuadrat $ax^2 + bx + c = 0$. Peluang persamaan kuadrat itu mempunyai akar-akar real adalah ...", options: ["A. $\\frac{1}{3}$", "B. $\\frac{1}{6}$", "C. $\\frac{1}{9}$", "D. $\\frac{1}{18}$", "E. $\\frac{1}{27}$"] },
  { no: 11, soal: "OSN Matematika 2009 Tingkat Kota\nMisalkan S = {21, 22, 23, ..., 30}. Jika empat anggota S diambil secara acak, maka peluang terambilnya empat bilangan yang berjumlah genap adalah ...", options: ["A. $\\frac{2}{5}$", "B. $\\frac{1}{2}$", "C. $\\frac{11}{21}$", "D. $\\frac{2}{3}$"] },
  { no: 12, soal: "OSN Matematika 2010 Tingkat Kota\nDijual 100 lembar kupon, diantaranya berhadiah. Ali membeli 2 lembar undian. Peluang Ali mendapat 2 hadiah adalah ...", options: ["A. $\\frac{1}{5}$", "B. $\\frac{1}{100}$", "C. $\\frac{1}{200}$", "D. $\\frac{1}{4950}$"] },
  { no: 13, soal: "OSN Matematika 2011 Tingkat Kota\nLima pasang suami istri akan duduk di 10 kursi secara memanjang. Banyaknya cara mengatur tempat duduk mereka sehingga setiap pasang suami istri duduk berdampingan adalah ...", options: ["A. 3800", "B. 3820", "C. 3840", "D. 3900", "E. 3940"] },
  { no: 14, soal: "OSN Matematika 2011 Tingkat Kota\nDalam sebuah kotak berisi 15 telur, 5 telur diantaranya rusak. Untuk memisahkan telur baik dan telur yang rusak dilakukan pengetesan satu persatu tanpa pengembalian. Peluang diperoleh telur rusak ke-3 pada pengetesan ke-5 adalah ...", options: ["A. $\\frac{80}{1001}$", "B. $\\frac{90}{1001}$", "C. $\\frac{100}{1001}$", "D. $\\frac{110}{1001}$", "E. $\\frac{120}{1001}$"] },
  { no: 15, soal: "OSN Matematika 2011 Tingkat Kota\nDi dalam kotak terdapat 18 bola identik (berbentuk sama), 5 berwarna hitam, 6 berwarna putih dan 7 berwarna hijau. Jika diambil dua bola secara acak, maka peluang yang terambil bola berwarna sama adalah ...", options: ["A. $\\frac{46}{153}$", "B. $\\frac{13}{36}$", "C. $\\frac{4}{105}$", "D. $\\frac{55}{162}$", "E. $\\frac{55}{152}$"] },
  { no: 16, soal: "OSN Matematika 2012 Tingkat Kota\nSuatu byte didefinisikan sebagai susunan angka yang terdiri dari 8 angka (digit), yaitu 0 atau 1. Contoh byte: 01110111. Banyak jenis byte yang memuat angka 1 tepat sebanyak 5 adalah ...", options: ["A. 30", "B. 45", "C. 56", "D. 62", "E. 66"] },
  { no: 17, soal: "OSN Matematika 2012 Tingkat Kota\nLima orang guru akan ditempatkan pada 3 sekolah yang berbeda, 2 orang di sekolah pertama, 2 orang di sekolah kedua, dan 1 orang di sekolah ketiga. Banyak cara menempatkan kelima orang guru tersebut adalah ...", options: ["A. 40", "B. 30", "C. 20", "D. 10", "E. 4"] },
  { no: 18, soal: "OSN Matematika 2012 Tingkat Kota\nEmpat bola bernomor 1, 2, 3 dan 4 diletakkan dalam sebuah kotak. Sebuah bola diambil secara acak dari kotak tersebut. Nomor yang muncul dicatat, kemudian bola dikembalikan ke kotak semula. Jika proses pengambilan bola dilakukan sampai tiga kali dengan cara yang serupa, maka peluang nomor bola yang terambil berjumlah 5 adalah ...", options: ["A. $\\frac{5}{256}$", "B. $\\frac{5}{64}$", "C. $\\frac{1}{16}$", "D. $\\frac{3}{32}$", "E. $\\frac{3}{16}$"] },
  { no: 19, soal: "OSN Matematika 2016 Tingkat Kota\nDelapan buku yang berbeda akan dibagikan kepada 3 orang siswa A, B dan C sehingga berturut-turut mereka menerima 4 buku, 2 buku dan 2 buku. Banyak cara pembagian buku tersebut adalah ...", options: [] },
  { no: 20, soal: "OSN Matematika 2019 Tingkat Kota\nPassword akun media sosial Ahmad terdiri dari enam karakter berbeda penyusun kata 'NKRIgo'. Ahmad memintamu menebak passwordnya dengan memberikan dua informasi tambahan yaitu 'g' tidak bersebelahan dengan 'o' dan 'R' bersebelahan dengan 'I'. Jika kamu menggunakan seluruh informasi tersebut dengan baik, peluang untuk langsung menebak dengan benar adalah ...", options: ["A. $\\frac{1}{36}$", "B. $\\frac{1}{72}$", "C. $\\frac{1}{144}$", "D. $\\frac{1}{720}$"] },
  { no: 21, soal: "OSN Matematika 2013 Tingkat Kota\nSebuah kantong berisi 15 bola merah, 12 bola biru, dan 3 bola hijau. Diambil sebuah bola secara acak sebanyak 2 kali tanpa pengembalian. Peluang bola yang terambil merah pada pengambilan pertama dan hijau pada pengambilan kedua adalah ...", options: ["A. $\\frac{1}{20}$", "B. $\\frac{3}{58}$", "C. $\\frac{1}{5}$", "D. $\\frac{3}{29}$", "E. $\\frac{6}{29}$"] },
  { no: 22, soal: "OSN Matematika 2013 Tingkat Kota\nLima orang anak akan naik mobil dengan kapasitas enam tempat duduk, yakni di depan termasuk pengemudi (sopir), dua di tengah dan dua di belakang. Jika hanya ada dua orang yang bisa mengemudi, banyak cara mengatur tempat duduk mereka adalah ...", options: ["A. 120", "B. 200", "C. 220", "D. 240", "E. 280"] },
  { no: 23, soal: "OSN Matematika 2013 Tingkat Kota\nDi dalam suatu keranjang terdapat 12 apel Malang, dua diantaranya diketahui busuk. Jika diambil 3 apel secara acak, maka peluang tepat satu diantaranya busuk adalah ...", options: ["A. $\\frac{9}{22}$", "B. $\\frac{5}{11}$", "C. $\\frac{4}{11}$", "D. $\\frac{9}{44}$", "E. $\\frac{5}{22}$"] },
  { no: 24, soal: "OSN Matematika 2013 Tingkat Kota\nBeberapa bilangan empat angka memiliki angka-angka penyusun tak nol yang saling berbeda dan berjumlah 10. Banyak bilangan yang dimaksud adalah ...", options: ["A. 24", "B. 22", "C. 20", "D. 18", "E. 16"] },
  { no: 25, soal: "OSN Matematika 2014 Tingkat Kota\nSepuluh orang guru akan ditugaskan mengajar di tiga sekolah yaitu sekolah A, B dan C berturut-turut sebanyak dua, tiga dan lima orang. Banyak cara yang mungkin untuk menugaskan ke sepuluh guru tersebut adalah ...", options: ["A. 2520", "B. 5040", "C. 7250", "D. 10025"] },
  { no: 26, soal: "OSN Matematika 2014 Tingkat Kota\nPada sebuah bidang terdapat sepuluh titik. Di antara sepuluh titik tersebut tidak ada tiga titik atau lebih yang segaris. Banyak segitiga yang dapat dibentuk dengan menghubungkan sebarang tiga titik pada bidang tersebut adalah ...", options: ["A. 30", "B. 60", "C. 100", "D. 120"] },
  { no: 27, soal: "OSN Matematika 2014 Tingkat Kota\nSeorang guru memiliki 3 kantong permen yang akan dibagikan kepada para siswanya. Masing-masing kantong memiliki permen dengan warna sama. Kantong pertama berisi permen merah, kedua permen kuning, dan ketiga permen hijau. Masing-masing siswa mendapatkan 7 permen dengan dua warna, dan kombinasi berbeda untuk setiap siswa. Maksimal banyak siswa yang ada di kelas tersebut adalah ...", options: ["A. 15", "B. 18", "C. 21", "D. 24"] },
  { no: 28, soal: "OSN Matematika 2017 Tingkat Kota\nDiketahui M = {10, 11, 12, ..., 99} dan A adalah himpunan bagian dari M yang mempunyai 4 anggota. Jika jumlah semua anggota A merupakan suatu bilangan genap, maka banyak himpunan A yang mungkin adalah ...", options: ["A. 1980", "B. 148995", "C. 297990", "D. 299970"] },
  { no: 29, soal: "OSN Matematika 2018 Tingkat Kota\nPada sebuah laci terdapat kaos kaki berwarna putih dan berwarna hitam. Jika dua kaos diambil secara acak, maka peluang terpilihnya kedua kaos kaki berwarna putih adalah $\\frac{1}{2}$. Jika banyak kaos kaki berwarna hitam adalah genap, maka paling sedikit kaos kaki berwarna putih adalah ...", options: ["A. 12", "B. 15", "C. 18", "D. 21"] },
  { no: 30, soal: "OSN Matematika 2019 Tingkat Kota\nUntuk setiap buku baru yang datang, seorang pustakawan bertugas untuk menempel label nomor di bagian samping buku dan menyampul buku tersebut. Proses penyampulan suatu buku harus dilakukan setelah menempel label nomornya. Jika ada tiga buku baru berbeda yang harus dikerjakan, banyak kemungkinan urutan pengerjaan yang dapat dilakukan oleh pustakawan tersebut adalah ...", options: ["A. 8", "B. 48", "C. 90", "D. 720"] },
  { no: 31, soal: "OSN Matematika 2019 Tingkat Kota\nTerdapat empat kotak yang dinomori 1 sampai 4. Setiap kotak dapat diisi maksimum 5 koin dengan syarat kotak yang bernomor lebih besar tidak boleh berisi koin lebih banyak dari kotak yang bernomor lebih kecil. Jika tidak boleh ada kotak yang kosong, banyak cara pengisian koin yang mungkin ke dalam keempat kotak tersebut adalah ...", options: ["A. 25", "B. 70", "C. 252", "D. 625"] },
  { no: 32, soal: "OSN Matematika 2020 Tingkat Kota\nPada suatu pameran seni di sekolah, akan dipajang 8 lukisan istimewa terdiri dari 3 lukisan cat air dan 5 lukisan cat minyak. Semua lukisan tersebut saling berbeda. Untuk alasan artistik, maka setiap lukisan cat air akan diletakkan di antara dua lukisan cat minyak. Banyak cara susunan yang mungkin adalah ...", options: ["A. 0", "B. 24", "C. 27", "D. 54"] },
  { no: 33, soal: "OSN Matematika 2020 Tingkat Kota\nDiketahui suatu bilangan terdiri dari 6 digit. Jika digit terakhirnya sama dengan digit pertama, maka banyak kemungkinan bilangan tersebut adalah ...", options: ["A. 90.000", "B. 100.000", "C. 900.000", "D. 1.000.000"] },
  { no: 34, soal: "OSN Matematika 2020 Tingkat Kota\nSiswa-siswi sebuah SMP diberi Nomor Undian Doorprize (NUD) pada kertas yang terdiri atas empat digit. NUD untung adalah nomor yang digit ke-empatnya merupakan pengurangan bilangan dua digit pertama oleh bilangan digit ke-tiga (contoh: 1156 → 11 − 5 = 6 adalah NUD untung). Banyaknya hadiah yang harus disediakan oleh panitia adalah ...", options: ["A. 42", "B. 44", "C. 45", "D. 46"] },
  { no: 35, soal: "OSN Matematika 2020 Tingkat Kota\nPada suatu kotak terdapat 40 bola warna merah dan hijau. Dua buah bola diambil secara acak. Jika peluang terambilnya kedua bola berwarna merah adalah $\\frac{5}{12}$, maka banyaknya bola merah di dalam kotak semula adalah ... buah.", options: ["A. 20", "B. 22", "C. 25", "D. 26"] },
  { no: 36, soal: "OSN Matematika 2021 Tingkat Kota\nSebuah bilangan bulat yang terdiri atas empat digit akan disusun sedemikian sehingga berupa bilangan genap dengan digit pertama (paling kiri) bernilai genap serta tidak ada angka yang berulang. Banyaknya cara menyusun bilangan tersebut adalah ...", options: ["A. 120", "B. 896", "C. 1120", "D. 5040"] },
  { no: 37, soal: "OSN Matematika 2021 Tingkat Kota\nDi suatu fasilitas kesehatan, empat pasang suami istri sedang mengantri untuk disuntuk vaksin satu per satu. Jika setiap suami menghendaki istrinya untuk disuntuk terlebih dahulu daripada dirinya dan setiap pasang suami istri tidak harus disuntuk berurutan, banyak urutan penyuntukan vaksin berbeda yang mungkin adalah ...", options: ["A. 24", "B. 576", "C. 2520", "D. 40260"] },
  { no: 38, soal: "OSN Matematika 2021 Tingkat Kota\nBintang menuliskan angka 1, 2, 3, 4, 5, 6, 7 dan 8 di baris pertama tabel. Bintang ingin melakukan hal yang serupa pada baris kedua dengan suatu urutan tertentu. Setiap bilangan pada baris ketiga adalah jumlah dua bilangan di atasnya. Banyaknya cara Bintang mengisi baris kedua sehingga semua bilangan pada baris ketiga merupakan bilangan genap adalah ...", options: ["A. 8", "B. 16", "C. 48", "D. 576"] },
  { no: 39, soal: "OSN Matematika 2022 Tingkat Kota\nDalam suatu kotak tertutup, terdapat dua buah dadu. Dadu pertama memiliki satu sisi bermata 1, satu sisi bermata 2, dua sisi bermata 3, dan dua sisi bermata 5. Dadu kedua memiliki satu sisi bermata 1, satu sisi bermata 2, satu sisi bermata 3, dan tiga sisi bermata 5. Andi main dua kali: mendapatkan mata 1 pada permainan pertama dan mata 5 pada permainan kedua. Peluang bahwa hanya dadu kedua yang terambil pada kedua permainan yang dilakukan Andi adalah ...", options: ["A. 0,4", "B. 0,3", "C. 0,2", "D. 0,1"] },
  { no: 40, soal: "OSN Matematika 2022 Tingkat Kota\nRio ingin bermain Sudoki pada kotak berukuran 4 × 4. Peraturan: setiap sel harus diisi dengan salah satu dari angka 1, 2, 3 atau 4 dengan syarat tidak boleh ada angka yang sama dalam setiap baris maupun kolom. Banyak tampilan Sudoki yang mungkin adalah ...", options: ["A. 50", "B. 576", "C. 432", "D. 676"] },
  { no: 41, soal: "OSN Matematika 2025 Tingkat Kota\nAna memiliki 9 stiker. Delapan stiker ditempel berjejer dari kiri ke kanan di sampul buku tulisannya. Banyak cara ia menempel kedelapan stiker tersebut, sehingga stiker yang sama tidak bersebelahan dan stiker bergambar hati terletak di paling kanan adalah ...", options: ["A. 26", "B. 32", "C. 35", "D. 36"] },
  { no: 42, soal: "OSN Matematika 2025 Tingkat Kota\nSuatu objek di titik (x, y) hanya dapat bergerak ke titik (x+1, y), (x, y+1) atau (x+1, y+1). Banyak jalur berbeda yang dapat dilalui objek yang bergerak dari (0, 0) ke titik (5, 5) adalah ...", options: ["A. 25", "B. 252", "C. 1683", "D. 3125"] },
];

const OlimpiadePeluangPage = () => {
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
          OLIMPIADE - KAIDAH PENCACAHAN DAN PELUANG
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

export default OlimpiadePeluangPage;
