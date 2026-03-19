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
  title: "MATERI - KPK DAN FPB",
  sections: [
    {
      heading: "A. Kelipatan Bilangan",
      content: `Kelipatan bilangan adalah hasil kali sebuah bilangan dengan bilangan bulat positif. Dengan kata lain, kelipatan sebuah bilangan adalah bilangan-bilangan yang dapat dibagi habis dengan bilangan tersebut.

Contoh:
- Kelipatan 2: 2, 4, 6, 8, 10, 12, dan seterusnya.
- Kelipatan 5: 5, 10, 15, 20, 25, 30, dan seterusnya.
- Kelipatan 7: 7, 14, 21, 28, 35, 42, dan seterusnya.

Cara Menentukan Kelipatan:
1. Mengalikan Bilangan dengan Bilangan Bulat Positif:
   Kalian dapat mengalikan bilangan tersebut dengan 1, 2, 3, 4, dan seterusnya.
   Contoh: Untuk mencari kelipatan 3, kalikan 3 dengan 1, 2, 3, 4, dan seterusnya ($3 \\times 1 = 3$, $3 \\times 2 = 6$, $3 \\times 3 = 9$, dan seterusnya).

2. Menjumlahkan Bilangan dengan Diri Sendiri:
   Kalian juga dapat menjumlahkan bilangan tersebut secara berulang.
   Contoh: Untuk mencari kelipatan 4, jumlahkan 4 dengan dirinya sendiri ($4 + 4 = 8$, $8 + 4 = 12$, dan seterusnya).`
    },
    {
      heading: "B. Pengertian KPK (Kelipatan Persekutuan Terkecil)",
      content: `KPK atau Kelipatan Persekutuan Terkecil adalah bilangan bulat positif terkecil yang merupakan kelipatan dari dua bilangan bulat positif tertentu yang sama.`
    },
    {
      heading: "C. Menentukan KPK Dengan Metode Perkalian",
      content: `Ada beberapa cara untuk menentukan KPK dari dua bilangan, yaitu dengan cara menggunakan metode perkalian dan cara faktorisasi prima.

Cara ini dilakukan dengan mengalikan kedua bilangan secara berulang sampai diperoleh bilangan yang sama.

Misalnya kita akan menentukan KPK dari bilangan 12 dan 15. Kita dapat mengalikan bilangan 12 dan 15 dengan 1, 2, 3, 4, 5 dan seterusnya, maka akan diperoleh:
12 = 12, 24, 36, 48, 60, ...
15 = 15, 30, 45, 60, 75, ...

Dari bilangan kelipatan tersebut ada kelipatan bilangan yang sama dan yang terkecil yaitu pada saat 60, maka KPK dari bilangan 12 dan 15 adalah 60.`
    },
    {
      heading: "D. Menentukan KPK Dengan Metode Faktorisasi Prima",
      content: `Cara ini dilakukan dengan memfaktorkan kedua bilangan menjadi faktor-faktor primanya terlebih dahulu.

Misalnya kita akan menentukan KPK dari bilangan 12 dan 15. Kita dapat memfaktorkan bilangan 12 menjadi:
$12 = 2 \\times 2 \\times 3 = 2^2 \\times 3$

dan bilangan 15 menjadi:
$15 = 3 \\times 5$

KPK diperoleh dari hasil kali faktor-faktor prima yang berbeda dan mengambil pangkat tertinggi untuk faktor yang sama yaitu $2^2 \\times 3 \\times 5$,
maka KPK dari bilangan 12 dan 15 adalah $2^2 \\times 3 \\times 5 = 60$`
    },
    {
      heading: "E. Contoh Soal Menentukan KPK",
      content: `1. Tentukanlah KPK dari bilangan 6 dan 10.
$6 = 2 \\times 3$
$10 = 2 \\times 5$
KPK (6, 10) = $2 \\times 3 \\times 5 = 30$

2. Tentukanlah KPK dari bilangan 9 dan 20.
$9 = 3^2$
$20 = 2^2 \\times 5$
KPK (9, 20) = $2^2 \\times 3^2 \\times 5 = 180$

3. Tentukanlah KPK dari bilangan 12 dan 18.
$12 = 2^2 \\times 3$
$18 = 2 \\times 3^2$
KPK (12, 18) = $2^2 \\times 3^2 = 36$

4. Tentukan KPK dari bilangan 126 dan 198.
$126 = 2 \\times 3^2 \\times 7$
$198 = 2 \\times 3^2 \\times 11$
KPK (126, 198) = $2 \\times 3^2 \\times 7 \\times 11 = 1386$

5. Tentukanlah KPK dari bilangan 15, 20, dan 30.
$15 = 3 \\times 5$
$20 = 2^2 \\times 5$
$30 = 2 \\times 3 \\times 5$
KPK (15, 20, 30) = $2^2 \\times 3 \\times 5 = 60$

6. Tentukanlah KPK dari bilangan 9, 21, dan 30.
$9 = 3^2$
$21 = 3 \\times 7$
$30 = 2 \\times 3 \\times 5$
KPK (9, 21, 30) = $2 \\times 3^2 \\times 5 \\times 7 = 630$`
    },
    {
      heading: "F. Faktor Suatu Bilangan",
      content: `Faktor bilangan adalah bilangan-bilangan bulat yang dapat membagi suatu bilangan lain secara tepat, tanpa sisa. Dengan kata lain, faktor-faktor suatu bilangan adalah bilangan-bilangan yang, jika dikalikan bersama-sama, akan menghasilkan bilangan tersebut.

Contoh:
- Faktor dari 10 adalah 1, 2, 5, dan 10.
- Faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12.
- Faktor bilangan 20 adalah 1, 2, 4, 5, 10, dan 20.
- Faktor bilangan 35 adalah 1, 5, 7, 35.
- Faktor bilangan 60 adalah 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, dan 60.`
    },
    {
      heading: "G. Pengertian FPB (Faktor Persekutuan terBesar)",
      content: `FPB adalah bilangan bulat positif terbesar yang dapat membagi habis dua atau lebih bilangan bulat.`
    },
    {
      heading: "H. Menentukan FPB dengan Faktor Bilangan",
      content: `Cara pertama untuk menentukan FPB adalah dengan faktorisasi bilangan. Faktorisasi adalah proses memecah bilangan menjadi faktor-faktor pembentuknya.

Setelah melakukan faktorisasi, cari faktor yang sama pada dua bilangan. Faktor yang sama dan terbesar inilah yang menjadi FPB dari bilangan tersebut.

Contoh:
- Faktorisasi dari bilangan 12 adalah 1, 2, 3, 4, 6, dan 12.
- Faktorisasi dari bilangan 20 adalah 1, 2, 4, 5, 10, dan 20.
- Faktorisasi dari bilangan 60 adalah 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, dan 60.

Dari hasil di atas dapat kita ambil beberapa kesimpulan terkait FPB yaitu:
- FPB (12, 20) = 4
- FPB (12, 60) = 12
- FPB (20, 60) = 20
- FPB (12, 20, 60) = 4`
    },
    {
      heading: "I. Menentukan FPB Dengan Bantuan Faktor Prima",
      content: `Cara menentukan FPB dengan bantuan faktor bilangan prima. Faktorisasi bilangan prima adalah proses memecah bilangan menjadi faktor-faktor prima pembentuknya.

FPB diperoleh dari hasil kali faktor-faktor prima yang sama dengan pangkat terkecil

A. Faktor prima dari bilangan 12 adalah $2^2 \\times 3$
B. Faktor prima dari bilangan 20 adalah $2^2 \\times 5$
C. Faktor prima dari bilangan 60 adalah $2^2 \\times 3 \\times 5$

Dari hasil di atas dapat kita ambil beberapa kesimpulan terkait FPB yaitu:
- FPB (12, 20) = $2 \\times 2 = 4$
- FPB (12, 60) = $2^2 \\times 3 = 12$
- FPB (20, 60) = $2^2 \\times 5 = 20$
- FPB (12, 20, 60) = $2^2 = 4$`
    },
    {
      heading: "J. Contoh Soal Menentukan FPB",
      content: `1. Tentukanlah FPB dari bilangan 6 dan 10.
$6 = 2 \\times 3$
$10 = 2 \\times 5$
FPB (6, 10) = 2

2. Tentukanlah FPB dari bilangan 9 dan 20.
$9 = 3^2$
$20 = 2^2 \\times 5$
FPB (9, 20) = 1
*Jika tidak ada faktor prima yang sama dari kedua bilangan maka FPB dari kedua bilangan tersebut adalah 1

3. Tentukanlah FPB dari bilangan 12 dan 18.
$12 = 2^2 \\times 3$
$18 = 2 \\times 3^2$
FPB (12, 18) = $2 \\times 3 = 6$

4. Tentukanlah FPB dari bilangan 126 dan 198.
$126 = 2 \\times 3^2 \\times 7$
$198 = 2 \\times 3^2 \\times 11$
FPB (126, 198) = $2 \\times 3^2 = 18$

5. Tentukanlah FPB dari bilangan 15, 20, dan 30.
$15 = 3 \\times 5$
$20 = 2^2 \\times 5$
$30 = 2 \\times 3 \\times 5$
FPB (15, 20, 30) = 5

6. Tentukanlah FPB dari bilangan 9, 21, dan 30.
$9 = 3^2$
$21 = 3 \\times 7$
$30 = 2 \\times 3 \\times 5$
FPB (9, 21, 30) = 3`
    },
    {
      heading: "K. Menyelesaikan masalah berkaitan dengan KPK dan FPB",
      content: `Banyak permasalahan yang berkaitan dengan KPK dan FPB dapat dijumpai dalam kehidupan sehari-hari. Simaklah contoh berikut:

a. Dani, Roni dan Cahyo mempunyai jam mengajar di bimbingan belajar yang sama. Dani mengajar setiap 2 hari sekali, Roni mengajar setiap 4 hari sekali dan Cahyo mengajar setiap 6 hari sekali. Pada tanggal 4 agustus ketiganya mempunyai jam mengajar di hari yang sama. Kapan mereka akan mengajar di hari yang sama lagi?

Jawab:
Permasalahan tersebut dapat diselesaikan menggunakan KPK
Faktorisasi prima dari 2 adalah 2
Faktorisasi prima dari 4 adalah $2 \\times 2 = 2^2$
Faktorisasi prima dari 6 adalah $2 \\times 3$
KPK = $2^2 \\times 3 = 4 \\times 3 = 12$
4 agustus + 12 = 16 agustus
Jadi, Dani, Roni dan Cahyo akan mengajar di hari yang sama lagi pada tanggal 16 agustus

b. Bu Wati mempunyai 40 apel, 56 jeruk dan 32 buah manggis. Ketiga jenis buah tersebut akan dibuat menjadi parsel. Tiap parsel memuat masing-masing buah sama banyak.
1) Berapa parsel paling banyak yang dapat dibuat Bu Wati?
2) Berapa banyak masing-masing buah dalam setiap parsel?

Jawab:
1) Permasalahan tersebut dapat diselesaikan menggunakan FPB
Faktorisasi prima dari 40 adalah $2^3 \\times 5$
Faktorisasi prima dari 56 adalah $2^3 \\times 7$
Faktorisasi prima dari 32 adalah $2^5$
Faktor yang sama dengan pangkat terkecil adalah $2^3$.
FPB = $2^3 = 8$
Jadi, Bu Wati dapat membuat paling banyak 8 parsel

2) Banyak buah apel = $\\frac{40}{8} = 5$
Banyak buah jeruk = $\\frac{56}{8} = 7$
Banyak buah manggis = $\\frac{32}{8} = 4$
Jadi, tiap parsel memuat 5 buah apel, 7 buah jeruk dan 4 buah manggis`
    },
    {
      heading: "L. Banyak faktor positif dari bentuk $X = a^m \\cdot b^n \\cdot c^k$",
      content: `Banyak faktor positif dari bentuk $X = a^m \\cdot b^n \\cdot c^k$ adalah $(m+1)(n+1)(k+1)$`
    },
  ]
};

interface LatihanSoal {
  no: number;
  soal: string;
  options: string[];
  jawaban: string;
  pembahasan: {
    konsep: string;
    langkah: string[];
    rumus?: string;
  };
}

const latihanDasar: LatihanSoal[] = [
  {
    no: 1,
    soal: "a) Tulislah bilangan-bilangan kelipatan 5 dan kelipatan 7 yang kurang dari 75.\nb) Tentukan kelipatan Persekutuan dari 5 dan 7 yang kurang dari 75.\nc) Berapakah KPK dari 5 dan 7.",
    options: [],
    jawaban: "a) Kelipatan 5: 5,10,15,20,25,30,35,40,45,50,55,60,65,70 | Kelipatan 7: 7,14,21,28,35,42,49,56,63,70\nb) KP(5,7) < 75: 35 dan 70\nc) KPK(5,7) = 35",
    pembahasan: {
      konsep: "KPK dari dua bilangan prima adalah hasil kalinya. Kelipatan persekutuan terkecil adalah kelipatan bersama yang paling kecil.",
      langkah: [
        "Kelipatan 5 < 75: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70",
        "Kelipatan 7 < 75: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70",
        "Kelipatan persekutuan (yang muncul di keduanya) < 75: 35 dan 70",
        "KPK(5, 7) = bilangan terkecil dari kelipatan persekutuan = 35",
        "Atau: $5 = 5$ dan $7 = 7$ (keduanya prima, tidak ada faktor sama) → KPK $= 5 \\times 7 = 35$"
      ],
      rumus: "Untuk dua bilangan prima $p$ dan $q$: $\\text{KPK}(p,q) = p \\times q$"
    }
  },
  {
    no: 2,
    soal: "a) Tulislah bilangan-bilangan kelipatan 4, 8 dan 12.\nb) Tentukan kelipatan Persekutuan dari 4, 8 dan 12.\nc) Berapakah KPK dari 4, 8 dan 12.",
    options: [],
    jawaban: "a) Kelipatan 4: 4,8,12,16,20,24,28,32,... | Kelipatan 8: 8,16,24,32,... | Kelipatan 12: 12,24,36,...\nb) KP(4,8,12): 24, 48, 72, ...\nc) KPK(4,8,12) = 24",
    pembahasan: {
      konsep: "KPK dari tiga bilangan diperoleh dari faktorisasi prima dengan mengambil pangkat tertinggi dari setiap faktor prima.",
      langkah: [
        "Kelipatan 4: 4, 8, 12, 16, 20, 24, ...",
        "Kelipatan 8: 8, 16, 24, 32, ...",
        "Kelipatan 12: 12, 24, 36, ...",
        "Kelipatan persekutuan: 24, 48, 72, ... → KPK = 24",
        "Verifikasi via faktorisasi: $4 = 2^2$, $8 = 2^3$, $12 = 2^2 \\times 3$",
        "KPK $= 2^3 \\times 3 = 8 \\times 3 = 24$ ✓"
      ],
      rumus: "$\\text{KPK} = $ hasil kali faktor prima dengan pangkat tertinggi"
    }
  },
  {
    no: 3,
    soal: "a) Tulislah faktor-faktor dari 36 dan 48.\nb) Tentukan faktor-faktor Persekutuan dari 36 dan 48.\nc) Berapakah FPB dari 36 dan 48.",
    options: [],
    jawaban: "a) Faktor 36: 1,2,3,4,6,9,12,18,36 | Faktor 48: 1,2,3,4,6,8,12,16,24,48\nb) Faktor persekutuan: 1,2,3,4,6,12\nc) FPB(36,48) = 12",
    pembahasan: {
      konsep: "FPB adalah faktor persekutuan terbesar, yaitu bilangan terbesar yang membagi habis semua bilangan yang ditinjau.",
      langkah: [
        "Faktor dari 36: 1, 2, 3, 4, 6, 9, 12, 18, 36",
        "Faktor dari 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48",
        "Faktor persekutuan (muncul di keduanya): 1, 2, 3, 4, 6, 12",
        "FPB = faktor persekutuan terbesar = 12",
        "Verifikasi: $36 = 2^2 \\times 3^2$, $48 = 2^4 \\times 3$",
        "FPB $= 2^2 \\times 3 = 4 \\times 3 = 12$ ✓"
      ],
      rumus: "$\\text{FPB} = $ hasil kali faktor prima yang sama dengan pangkat terkecil"
    }
  },
  {
    no: 4,
    soal: "a) Tulislah faktor-faktor dari 30, 75 dan 105.\nb) Tentukan faktor Persekutuan dari 30, 75 dan 105.\nc) Berapakah FPB dari 30, 75 dan 105.",
    options: [],
    jawaban: "a) Faktor 30: 1,2,3,5,6,10,15,30 | Faktor 75: 1,3,5,15,25,75 | Faktor 105: 1,3,5,7,15,21,35,105\nb) Faktor persekutuan: 1, 3, 5, 15\nc) FPB(30,75,105) = 15",
    pembahasan: {
      konsep: "FPB tiga bilangan diperoleh dari faktor prima yang sama dengan pangkat terkecil yang muncul di semua bilangan.",
      langkah: [
        "Faktorisasi prima: $30 = 2 \\times 3 \\times 5$",
        "$75 = 3 \\times 5^2$",
        "$105 = 3 \\times 5 \\times 7$",
        "Faktor prima yang muncul di ketiga bilangan: 3 dan 5",
        "Pangkat terkecil masing-masing: $3^1$ dan $5^1$",
        "FPB $= 3 \\times 5 = 15$"
      ],
      rumus: "$\\text{FPB} = $ faktor prima bersama dengan pangkat terkecil"
    }
  },
  {
    no: 5,
    soal: "Tentukan KPK dari pasangan bilangan berikut dengan cara memfaktorkan.\na) 24 dan 60\nb) 36 dan 81\nc) 42 dan 18\nd) 68 dan 85\ne) 105 dan 120\nf) 42, 63 dan 84\ng) 45, 75 dan 120\nh) 98, 126 dan 196",
    options: [],
    jawaban: "a) 120 | b) 324 | c) 126 | d) 340 | e) 840 | f) 252 | g) 1800 | h) 1764",
    pembahasan: {
      konsep: "KPK diperoleh dari faktorisasi prima setiap bilangan, lalu mengambil pangkat tertinggi dari setiap faktor prima yang muncul.",
      langkah: [
        "a) $24 = 2^3 \\times 3$, $60 = 2^2 \\times 3 \\times 5$ → KPK $= 2^3 \\times 3 \\times 5 = 120$",
        "b) $36 = 2^2 \\times 3^2$, $81 = 3^4$ → KPK $= 2^2 \\times 3^4 = 4 \\times 81 = 324$",
        "c) $42 = 2 \\times 3 \\times 7$, $18 = 2 \\times 3^2$ → KPK $= 2 \\times 3^2 \\times 7 = 126$",
        "d) $68 = 2^2 \\times 17$, $85 = 5 \\times 17$ → KPK $= 2^2 \\times 5 \\times 17 = 340$",
        "e) $105 = 3 \\times 5 \\times 7$, $120 = 2^3 \\times 3 \\times 5$ → KPK $= 2^3 \\times 3 \\times 5 \\times 7 = 840$",
        "f) $42 = 2 \\times 3 \\times 7$, $63 = 3^2 \\times 7$, $84 = 2^2 \\times 3 \\times 7$ → KPK $= 2^2 \\times 3^2 \\times 7 = 252$",
        "g) $45 = 3^2 \\times 5$, $75 = 3 \\times 5^2$, $120 = 2^3 \\times 3 \\times 5$ → KPK $= 2^3 \\times 3^2 \\times 5^2 = 1800$",
        "h) $98 = 2 \\times 7^2$, $126 = 2 \\times 3^2 \\times 7$, $196 = 2^2 \\times 7^2$ → KPK $= 2^2 \\times 3^2 \\times 7^2 = 1764$"
      ],
      rumus: "$\\text{KPK} = $ pangkat tertinggi setiap faktor prima"
    }
  },
  {
    no: 6,
    soal: "Tentukan FPB dari pasangan bilangan berikut dengan cara memfaktorkan.\na) 36 dan 48\nb) 56 dan 84\nc) 45 dan 75\nd) 81 dan 36\ne) 120 dan 168\nf) 14, 42 dan 70\ng) 30, 75 dan 105\nh) 84, 126 dan 168",
    options: [],
    jawaban: "a) 12 | b) 28 | c) 15 | d) 9 | e) 24 | f) 14 | g) 15 | h) 42",
    pembahasan: {
      konsep: "FPB diperoleh dari faktor prima yang sama di semua bilangan, diambil dengan pangkat terkecil.",
      langkah: [
        "a) $36 = 2^2 \\times 3^2$, $48 = 2^4 \\times 3$ → FPB $= 2^2 \\times 3 = 12$",
        "b) $56 = 2^3 \\times 7$, $84 = 2^2 \\times 3 \\times 7$ → FPB $= 2^2 \\times 7 = 28$",
        "c) $45 = 3^2 \\times 5$, $75 = 3 \\times 5^2$ → FPB $= 3 \\times 5 = 15$",
        "d) $81 = 3^4$, $36 = 2^2 \\times 3^2$ → FPB $= 3^2 = 9$",
        "e) $120 = 2^3 \\times 3 \\times 5$, $168 = 2^3 \\times 3 \\times 7$ → FPB $= 2^3 \\times 3 = 24$",
        "f) $14 = 2 \\times 7$, $42 = 2 \\times 3 \\times 7$, $70 = 2 \\times 5 \\times 7$ → FPB $= 2 \\times 7 = 14$",
        "g) $30 = 2 \\times 3 \\times 5$, $75 = 3 \\times 5^2$, $105 = 3 \\times 5 \\times 7$ → FPB $= 3 \\times 5 = 15$",
        "h) $84 = 2^2 \\times 3 \\times 7$, $126 = 2 \\times 3^2 \\times 7$, $168 = 2^3 \\times 3 \\times 7$ → FPB $= 2 \\times 3 \\times 7 = 42$"
      ],
      rumus: "$\\text{FPB} = $ pangkat terkecil faktor prima yang sama"
    }
  },
  {
    no: 7,
    soal: "Sebuah terminal bus melayani tiga jurusan. Bus-bus yang menuju ke jurusan pertama berangkat setiap 45 menit ke jurusan kedua berangkat setiap 60 menit dan ke jurusan ketiga berangkat setiap 75 menit. Jika pada pukul 06.00 ada tiga bus yang berangkat menuju ketiga jurusan tersebut secara bersamaan, pada pukul berapakah bus-bus berikutnya akan berangkat secara bersamaan menuju jurusan tersebut.",
    options: [],
    jawaban: "Pukul 21.00",
    pembahasan: {
      konsep: "Soal ini meminta waktu mereka berangkat bersamaan lagi, sehingga digunakan KPK dari interval waktu keberangkatan.",
      langkah: [
        "Faktorisasi prima: $45 = 3^2 \\times 5$, $60 = 2^2 \\times 3 \\times 5$, $75 = 3 \\times 5^2$",
        "KPK $= 2^2 \\times 3^2 \\times 5^2 = 4 \\times 9 \\times 25 = 900$ menit",
        "Konversi: $900 \\div 60 = 15$ jam",
        "Pukul 06.00 + 15 jam = pukul 21.00",
        "Jadi, bus-bus berikutnya akan berangkat bersamaan pada pukul 21.00"
      ],
      rumus: "Soal berangkat/bertemu bersamaan → gunakan KPK"
    }
  },
  {
    no: 8,
    soal: "Aldi mengunjungi sebuah perpustakaan setiap 6 hari sekali. Shifa dan Dinda mengunjungi perpustakaan tersebut masing-masing setiap 10 hari dan 12 hari sekali. Jika pada tanggal 28 agustus mereka mengunjungi perpustakaan itu bersama-sama, pada tanggal berapa mereka akan mengunjungi perpustakaan tersebut bersama-sama lagi berikutnya.",
    options: [],
    jawaban: "27 Oktober",
    pembahasan: {
      konsep: "Waktu mereka bertemu lagi ditentukan oleh KPK dari interval kunjungan masing-masing.",
      langkah: [
        "Faktorisasi prima: $6 = 2 \\times 3$, $10 = 2 \\times 5$, $12 = 2^2 \\times 3$",
        "KPK $= 2^2 \\times 3 \\times 5 = 60$ hari",
        "28 Agustus + 60 hari:",
        "Agustus memiliki 31 hari → sisa Agustus dari tgl 28: $31 - 28 = 3$ hari",
        "60 - 3 = 57 hari lagi setelah 31 Agustus",
        "September: 30 hari → 57 - 30 = 27 hari lagi",
        "27 hari di bulan Oktober → tanggal 27 Oktober",
        "Jadi mereka bertemu lagi pada tanggal 27 Oktober"
      ],
      rumus: "Soal bertemu kembali → KPK dari interval waktu"
    }
  },
  {
    no: 9,
    soal: "Jadwal Latihan tim voli A di lapangan yang sama adalah 4 hari sekali, tim bola voli B 5 hari sekali dan tim bola voli C 6 hari sekali. Jika tanggal 10 desember ketiga tim tersebut mengadakan Latihan bersama, kapan mereka akan Latihan bersama lagi berikutnya?",
    options: [],
    jawaban: "8 Februari (tahun berikutnya)",
    pembahasan: {
      konsep: "KPK menentukan kapan ketiga tim berlatih bersama kembali setelah siklus terpendek.",
      langkah: [
        "Faktorisasi prima: $4 = 2^2$, $5 = 5$, $6 = 2 \\times 3$",
        "KPK $= 2^2 \\times 3 \\times 5 = 60$ hari",
        "10 Desember + 60 hari:",
        "Sisa Desember dari tgl 10: $31 - 10 = 21$ hari",
        "60 - 21 = 39 hari setelah 31 Desember (masuk Januari tahun berikutnya)",
        "Januari: 31 hari → 39 - 31 = 8 hari",
        "8 hari di Februari → tanggal 8 Februari",
        "Jadi ketiga tim berlatih bersama lagi pada 8 Februari"
      ],
      rumus: "$\\text{KPK}(4,5,6) = 60$ hari"
    }
  },
  {
    no: 10,
    soal: "Tersedia 84 anggur, 56 buah stroberi dan 140 buah jambu yang akan dibagikan kepada sejumlah anak. Jika buah-buahan tersebut dibagi sama rata, berapa anak sebanyak-banyaknya yang dapat menerima pembagian buah-buahan tersebut?",
    options: [],
    jawaban: "28 anak",
    pembahasan: {
      konsep: "Soal 'dibagi sama rata sebanyak-banyaknya' berarti mencari FPB dari jumlah masing-masing buah.",
      langkah: [
        "Faktorisasi prima: $84 = 2^2 \\times 3 \\times 7$",
        "$56 = 2^3 \\times 7$",
        "$140 = 2^2 \\times 5 \\times 7$",
        "Faktor prima bersama dengan pangkat terkecil: $2^2$ dan $7$",
        "FPB $= 2^2 \\times 7 = 4 \\times 7 = 28$",
        "Jadi, sebanyak-banyaknya 28 anak yang dapat menerima",
        "Masing-masing mendapat: $84/28 = 3$ anggur, $56/28 = 2$ stroberi, $140/28 = 5$ jambu"
      ],
      rumus: "Soal 'dibagi sama rata maksimal' → FPB"
    }
  },
  {
    no: 11,
    soal: "Tersedia 175 kantong gula pasir dan 105 botol minyak goreng. Jika gula pasir dan minyak goreng tersebut akan dibagi rata, berapa orang terbanyak yang dapat menerima gula pasir dan minyak goreng tersebut?",
    options: [],
    jawaban: "35 orang",
    pembahasan: {
      konsep: "Mencari jumlah orang terbanyak yang mendapat bagian sama berarti mencari FPB.",
      langkah: [
        "Faktorisasi prima: $175 = 5^2 \\times 7$",
        "$105 = 3 \\times 5 \\times 7$",
        "Faktor prima bersama dengan pangkat terkecil: $5^1$ dan $7^1$",
        "FPB $= 5 \\times 7 = 35$",
        "Jadi, sebanyak-banyaknya 35 orang yang dapat menerima",
        "Masing-masing mendapat: $175/35 = 5$ kantong gula, $105/35 = 3$ botol minyak"
      ],
      rumus: "Soal distribusi maksimal → FPB"
    }
  },
  {
    no: 12,
    soal: "Bu Sinta akan membuat parsel yang berisi sirop, mi instan dan beras. Bu Sinta mempunyai 24 botol sirop, 90 bungkus mi instan dan 42 kg beras. Jika Bu Sinta ingin membuat parsel sebanyak-banyaknya dengan jenis dan banyak isi yang sama, berapa banyak keranjang yang diperlukan?",
    options: [],
    jawaban: "6 keranjang",
    pembahasan: {
      konsep: "Parsel sebanyak-banyaknya dengan isi sama berarti mencari FPB dari jumlah tiap jenis barang.",
      langkah: [
        "Faktorisasi prima: $24 = 2^3 \\times 3$",
        "$90 = 2 \\times 3^2 \\times 5$",
        "$42 = 2 \\times 3 \\times 7$",
        "Faktor prima bersama dengan pangkat terkecil: $2^1$ dan $3^1$",
        "FPB $= 2 \\times 3 = 6$",
        "Jadi, Bu Sinta memerlukan 6 keranjang",
        "Isi tiap keranjang: $24/6 = 4$ sirop, $90/6 = 15$ mi, $42/6 = 7$ kg beras"
      ],
      rumus: "Parsel maksimal dengan isi sama → FPB"
    }
  },
  {
    no: 13,
    soal: "Lampu merah menyala setiap 6 menit, kemudian padam. Lampu kuning menyala setiap 9 menit, kemudian padam. Kedua lampu menyala bersama-sama pada pukul 07.15. Pukul berapa kedua lampu akan menyala bersama-sama lagi?",
    options: [],
    jawaban: "Pukul 07.33",
    pembahasan: {
      konsep: "Lampu menyala bersama lagi setelah selang waktu sebesar KPK dari masing-masing interval.",
      langkah: [
        "Faktorisasi prima: $6 = 2 \\times 3$, $9 = 3^2$",
        "KPK $= 2 \\times 3^2 = 2 \\times 9 = 18$ menit",
        "Pukul 07.15 + 18 menit = pukul 07.33",
        "Jadi, kedua lampu menyala bersama lagi pada pukul 07.33"
      ],
      rumus: "$\\text{KPK}(6,9) = 18$ menit"
    }
  },
  {
    no: 14,
    soal: "Arkan mengunjungi perpustakaan setiap 6 hari sekali, Dimas setiap 4 hari sekali sedangkan Sukma setiap 8 hari sekali. Jika pada tanggal 28 januari mereka mengunjungi perpustakaan bersama-sama, pada tanggal berapa mereka akan mengunjungi perpustakaan bersama-sama lagi berikutnya.",
    options: [],
    jawaban: "21 Februari",
    pembahasan: {
      konsep: "Waktu bertemu kembali ditentukan oleh KPK dari interval kunjungan masing-masing orang.",
      langkah: [
        "Faktorisasi prima: $6 = 2 \\times 3$, $4 = 2^2$, $8 = 2^3$",
        "KPK $= 2^3 \\times 3 = 8 \\times 3 = 24$ hari",
        "28 Januari + 24 hari:",
        "Sisa Januari dari tgl 28: $31 - 28 = 3$ hari",
        "24 - 3 = 21 hari masuk Februari",
        "Tanggal 21 Februari",
        "Jadi mereka bertemu lagi pada tanggal 21 Februari"
      ],
      rumus: "$\\text{KPK}(6,4,8) = 24$ hari"
    }
  },
  {
    no: 15,
    soal: "Tersedia 84 buku, 56 pensil dan 140 krayon. Jika buku, pensil dan krayon tersebut akan dibagi rata kepada sejumlah anak, berapa anak sebanyak-banyaknya yang dapat menerima pembagian tersebut?",
    options: [],
    jawaban: "28 anak",
    pembahasan: {
      konsep: "Pembagian rata sebanyak-banyaknya orang → gunakan FPB dari jumlah semua barang.",
      langkah: [
        "Faktorisasi prima: $84 = 2^2 \\times 3 \\times 7$",
        "$56 = 2^3 \\times 7$",
        "$140 = 2^2 \\times 5 \\times 7$",
        "Faktor prima bersama dengan pangkat terkecil: $2^2$ dan $7$",
        "FPB $= 2^2 \\times 7 = 28$",
        "Jadi, sebanyak-banyaknya 28 anak",
        "Masing-masing mendapat: $84/28 = 3$ buku, $56/28 = 2$ pensil, $140/28 = 5$ krayon"
      ],
      rumus: "Distribusi rata maksimal → FPB"
    }
  },
  {
    no: 16,
    soal: "Pada tahun 2024, tiga acara diadakan secara periodik:\nAcara A setiap 15 hari\nAcara B setiap 20 hari\nAcara C setiap 30 hari\nJika semua acara diadakan pada tanggal 1 Januari 2024, maka berapa kali semua acara diadakan bersama-sama selama tahun 2024?",
    options: [],
    jawaban: "7 kali (termasuk 1 Januari)",
    pembahasan: {
      konsep: "Cari KPK untuk menentukan siklus pertemuan, lalu hitung berapa kali terjadi dalam 366 hari (2024 kabisat).",
      langkah: [
        "Faktorisasi prima: $15 = 3 \\times 5$, $20 = 2^2 \\times 5$, $30 = 2 \\times 3 \\times 5$",
        "KPK $= 2^2 \\times 3 \\times 5 = 60$ hari",
        "2024 adalah tahun kabisat → 366 hari",
        "Hari ke-1 (1 Jan), 61, 121, 181, 241, 301, 361 → semua ≤ 366",
        "Hari ke-421 > 366 (tidak termasuk)",
        "Jumlah: $\\lfloor 366/60 \\rfloor + 1 = 6 + 1 = 7$ kali (termasuk hari pertama)",
        "Jadi semua acara diadakan bersama-sama sebanyak 7 kali"
      ],
      rumus: "$\\text{KPK}(15,20,30) = 60$ hari; banyak pertemuan $= \\lfloor 366/60 \\rfloor + 1$"
    }
  },
  {
    no: 17,
    soal: "Jika FPB(x, y) = 12 dan KPK(x, y) = 210, maka $xy$ = ...",
    options: ["A. 2010", "B. 2520", "C. 2250", "D. 2100"],
    jawaban: "B. 2520",
    pembahasan: {
      konsep: "Terdapat hubungan penting: untuk dua bilangan bulat positif, $\\text{FPB}(x,y) \\times \\text{KPK}(x,y) = x \\times y$.",
      langkah: [
        "Menggunakan sifat: $\\text{FPB}(x,y) \\times \\text{KPK}(x,y) = x \\times y$",
        "$xy = 12 \\times 210$",
        "$xy = 2520$",
        "Jawaban: B. 2520"
      ],
      rumus: "$\\text{FPB}(x,y) \\times \\text{KPK}(x,y) = x \\times y$"
    }
  },
  {
    no: 18,
    soal: "Misalkan a dan b adalah bilangan asli yang memenuhi:\n- FPB(a, b) = 12\n- KPK(a, b) = 180\nJika a < b, maka berapakah banyak pasangan bilangan (a,b) yang memenuhi syarat tersebut?",
    options: [],
    jawaban: "2 pasangan: (12, 180) dan (36, 60)",
    pembahasan: {
      konsep: "Tulis $a = 12p$ dan $b = 12q$ dengan $\\gcd(p,q) = 1$ dan $pq = \\text{KPK}/\\text{FPB} = 180/12 = 15$.",
      langkah: [
        "Karena FPB$(a,b) = 12$, tulis $a = 12p$ dan $b = 12q$ dengan $\\gcd(p,q) = 1$",
        "KPK$(a,b) = 12pq = 180$ → $pq = 15$",
        "Cari semua pasangan $(p,q)$ dengan $p < q$, $pq = 15$, dan $\\gcd(p,q) = 1$:",
        "$(p,q) = (1, 15)$: $\\gcd(1,15) = 1$ ✓ → $(a,b) = (12, 180)$",
        "$(p,q) = (3, 5)$: $\\gcd(3,5) = 1$ ✓ → $(a,b) = (36, 60)$",
        "$(p,q) = (5, 3)$: tidak karena $p < q$ sudah diharuskan",
        "Jadi ada 2 pasangan: $(12, 180)$ dan $(36, 60)$"
      ],
      rumus: "$a = \\text{FPB} \\cdot p$, $b = \\text{FPB} \\cdot q$, $\\gcd(p,q)=1$, $pq = \\text{KPK}/\\text{FPB}$"
    }
  },
  {
    no: 19,
    soal: "Dua bilangan memiliki FPB = 6 dan KPK = 180. Jika salah satu bilangan adalah 30, maka bilangan lainnya adalah ...",
    options: [],
    jawaban: "36",
    pembahasan: {
      konsep: "Gunakan hubungan $\\text{FPB} \\times \\text{KPK} = x \\times y$ untuk mencari bilangan yang belum diketahui.",
      langkah: [
        "Diketahui: FPB $= 6$, KPK $= 180$, salah satu bilangan $x = 30$",
        "Gunakan: $x \\times y = \\text{FPB} \\times \\text{KPK}$",
        "$30 \\times y = 6 \\times 180 = 1080$",
        "$y = \\frac{1080}{30} = 36$",
        "Verifikasi: $\\text{FPB}(30, 36) = 6$ ✓ dan $\\text{KPK}(30, 36) = 180$ ✓",
        "Jadi bilangan lainnya adalah 36"
      ],
      rumus: "$y = \\frac{\\text{FPB} \\times \\text{KPK}}{x}$"
    }
  },
  {
    no: 20,
    soal: "Jika a dan b adalah bilangan bulat positif sehingga gcd(a, b) = 12, $a \\cdot b = 2016$, maka nilai terkecil yang mungkin untuk a + b adalah .... (Catatan: gcd adalah greatest common divisor atau FPB)",
    options: [],
    jawaban: "108",
    pembahasan: {
      konsep: "Tulis $a = 12m$ dan $b = 12n$ dengan $\\gcd(m,n)=1$, lalu cari pasangan yang meminimalkan $a+b$.",
      langkah: [
        "Karena $\\gcd(a,b) = 12$, tulis $a = 12m$, $b = 12n$ dengan $\\gcd(m,n) = 1$",
        "$a \\cdot b = 144mn = 2016$ → $mn = \\frac{2016}{144} = 14$",
        "Cari semua pasangan $(m,n)$ dengan $\\gcd(m,n)=1$ dan $mn = 14$:",
        "$(m,n) = (1, 14)$: $\\gcd(1,14) = 1$ ✓ → $(a,b) = (12, 168)$ → $a+b = 180$",
        "$(m,n) = (2, 7)$: $\\gcd(2,7) = 1$ ✓ → $(a,b) = (24, 84)$ → $a+b = 108$",
        "Bandingkan: $108 < 180$",
        "Nilai terkecil $a + b = 108$"
      ],
      rumus: "$a = 12m$, $b = 12n$, $\\gcd(m,n)=1$, $mn = 14$; minimumkan $12(m+n)$"
    }
  },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2003 Tingkat Kota\nFaktorisasi prima dari 5220 adalah ...", options: ["A. $2^2 \\cdot 3^2 \\cdot 145$", "B. $2^3 \\cdot 3 \\cdot 5 \\cdot 9$", "C. $2^2 \\cdot 3^2 \\cdot 5 \\cdot 29$", "D. $4^2 \\cdot 3 \\cdot 5 \\cdot 7$"] },
  { no: 2, soal: "OSN Matematika 2003 Tingkat Kota\nKelipatan Persekutuan terkecil dari 210, 42 dan 70 adalah ...", options: ["A. 14", "B. 210", "C. 420", "D. 1260"] },
  { no: 3, soal: "OSN Matematika 2004 Tingkat Kota\nJolo mengalikan tiga bilangan prima berbeda sekaligus. Ada berapa faktor berbeda dari bilangan yang dihasilkan.", options: ["A. 3", "B. 4", "C. 5", "D. 6", "E. 8"] },
  { no: 4, soal: "OSN Matematika 2005 Tingkat Kota\nSalah satu faktor dari $17^3 - 5^3$ adalah ...", options: ["A. 5", "B. 13", "C. 399", "D. 17", "E. 273"] },
  { no: 5, soal: "OSN Matematika 2005 Tingkat Kota\nBilangan 43 dapat dinyatakan ke dalam bentuk 5a + 11b, karena untuk a = 13 dan b = -2, nilai dari 5a + 11b adalah 43. Manakah dari tiga bilangan 37, 254 dan 1986 yang dapat dinyatakan dalam bentuk 5a + 11b", options: ["A. 1986", "B. 254", "C. 254 dan 1986", "D. Semua", "E. Tidak ada"] },
  { no: 6, soal: "OSN Matematika 2006 Tingkat Kota\nBanyak faktor dari 4200 yang merupakan bilangan ganjil positif adalah ...", options: [] },
  { no: 7, soal: "OSN Matematika 2007 Tingkat Kota\nPerhatikan gambar berikut. Jika pada setiap persegi ditempatkan bilangan bulat positif sedemikian rupa sehingga perkalian bilangan-bilangan dari sembarang lima persegi yang berurutan menghasilkan 360, maka jumlah bilangan pada semua persegi tersebut adalah ...\n4 | _ | 3 | 5 | _ | _ | 2", options: [] },
  { no: 8, soal: "OSN Matematika 2011 Tingkat Kota\nSuatu jam dinding selalu menghasilkan keterlambatan lima menit untuk setiap jamnya. Jika saat sekarang jam tersebut menunjukkan waktu yang tepat, maka jam tersebut akan menunjukkan waktu yang tepat setelah ... jam", options: ["A. 105", "B. 110", "C. 114", "D. 124", "E. 144"] },
  { no: 9, soal: "OSN Matematika 2014 Tingkat Kota\nDiketahui FPB dan KPK dari bilangan 72 dan x berturut-turut 3 dan 1800 pernyataan berikut yang benar adalah ...", options: ["A. x kelipatan 5", "B. x kelipatan 72", "C. x adalah genap", "D. x adalah faktor dari 3"] },
  { no: 10, soal: "OSN Matematika 2014 Tingkat Kota\nBanyak pasangan (x, y) dengan x dan y bilangan asli yang memenuhi $x^2 = y^2 + 100$ adalah ...", options: ["A. 0", "B. 1", "C. 2", "D. 3"] },
  { no: 11, soal: "OSN Matematika 2015 Tingkat Kota\nJika a dan b adalah bilangan bulat positif sehingga gcd(a, b) = 12, $a \\cdot b = 2016$, maka nilai terkecil yang mungkin untuk a + b adalah .... (Catatan: gcd adalah greatest common divisor atau FPB)", options: [] },
  { no: 12, soal: "OSN Matematika 2015 Tingkat Kota\nToto dan Titi mulai dari titik A bersamaan mengelilingi lapangan berbentuk persegi yang panjang sisinya 180 meter. Diasumsikan Toto dan Titi berjalan dengan kecepatan berturut-turut 72 meter/menit dan 60 meter/menit. Jika mereka bertemu untuk pertama kalinya kembali di titik A setelah Toto berjalan n putaran dan Titi berjalan m putaran, maka nilai m + n adalah ...", options: ["A. 6", "B. 11", "C. 20", "D. 22"] },
  { no: 13, soal: "OSN Matematika 2020 Tingkat Kota\nJika $\\frac{5^n}{2}$ dan $\\frac{2^m}{5}$ adalah faktor dari $2020^{2020}$, maka jumlah digit dari nilai maksimum $2m + n$ adalah ...", options: ["A. 16", "B. 18", "C. 20", "D. 22"] },
  { no: 14, soal: "OSN Matematika 2021 Tingkat Kota\nA mendapat giliran ronda malam setiap 4 hari, B mendapat giliran ronda setiap 5 hari dan C mendapat giliran ronda setiap 6 hari. Jika A dan B mulai ronda bersama pada tanggal 1 Januari 2021, sedangkan C ronda dua hari kemudian, maka mereka bertiga akan ronda bersama-sama untuk ke-3 kalinya pada tanggal ...", options: ["A. 1 Mei 2021", "B. 3 Mei 2021", "C. 21 Mei 2021", "D. 23 Mei 2021"] },
  { no: 15, soal: "OSN Matematika 2021 Tingkat Kota\nSetiap 12 menit Bus-A dapat menempuh rute P – X – S – X – P, setiap 20 menit, Bus-B dapat menyelesaikan rute Q – X – T – X – Q, setiap 28 menit Bus-C dapat menyelesaikan rute R – X – U – X – R. Pukul 1 siang (13.00), Bus-A berangkat dari P, Bus-B berangkat dari Q dan Bus-C berangkat dari R, menempuh rutenya masing-masing dengan kecepatan konstan dan mengulangi perjalanan sepanjang rutenya hingga pukul 11 malam (23.00). Diantara pukul 5 sore hingga pukul 10 malam (17.00 – 22.00), berapakah kali 2 atau lebih bus tiba di X secara bersamaan?", options: ["A. 18", "B. 19", "C. 20", "D. 21"] },
  { no: 16, soal: "OSN Matematika 2022 Tingkat Kota\nBanyaknya bilangan bulat positif yang habis membagi $10^{199}$ dan merupakan kelipatan $10^{111}$ adalah ...", options: ["A. 7921", "B. 12544", "C. 32079", "D. 40000"] },
  { no: 17, soal: "OSN Matematika 2024 Tingkat Kota\nBanyaknya faktor dari 2024 yang lebih besar dari $\\sqrt{2024}$ adalah ...", options: ["A. 4", "B. 8", "C. 12", "D. 16"] },
  { no: 18, soal: "OSN Matematika 2025 Tingkat Kota\nDua bilangan bulat positif memiliki jumlah 40 dan KPK 48, maka FPB dari kedua bilangan tersebut adalah ...", options: ["A. 8", "B. 12", "C. 16", "D. 24"] },
];

const OlimpiadeKPKFPBPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade">("materi");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [expandedDasarPembahasan, setExpandedDasarPembahasan] = useState<number[]>([]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleDasarPembahasan = (no: number) => {
    playPopSound();
    setExpandedDasarPembahasan(prev =>
      prev.includes(no) ? prev.filter(n => n !== no) : [...prev, no]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          OLIMPIADE - KPK DAN FPB
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
                  <span className="font-display text-sm text-accent font-bold">{renderWithLatex(section.heading)}</span>
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
              <div
                key={soal.no}
                className="group relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,200,255,0.1) 0%, transparent 50%)" }}
                />
                <div className="relative p-5">
                  <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap leading-relaxed">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold mr-2 shrink-0">
                      {soal.no}
                    </span>
                    {soal.soal.split('\n').map((line, lineIdx) => (
                      <span key={lineIdx}>
                        {lineIdx > 0 && <br />}
                        {renderWithLatex(line)}
                      </span>
                    ))}
                  </div>
                  {soal.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {soal.options.map((opt, j) => (
                        <div key={j} className="font-body text-xs text-white/80 bg-muted/30 border border-border/30 rounded-lg px-3 py-2 hover:bg-muted/50 hover:border-primary/30 transition-all duration-200">
                          {renderWithLatex(opt)}
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => toggleDasarPembahasan(soal.no)}
                    className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer mt-3"
                  >
                    {expandedDasarPembahasan.includes(soal.no) ? "Tutup Pembahasan" : "Lihat Pembahasan"}
                    {expandedDasarPembahasan.includes(soal.no) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedDasarPembahasan.includes(soal.no) && (
                    <div className="mt-4 relative overflow-hidden animate-slide-up">
                      <div
                        className="p-4 rounded-xl border border-primary/30"
                        style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.05) 0%, rgba(139,92,246,0.05) 100%)" }}
                      >
                        <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <span className="text-xs font-semibold text-emerald-400">Jawaban: </span>
                          <span className="text-sm text-emerald-300 font-body">
                            {renderWithLatex(soal.jawaban)}
                          </span>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Konsep</h5>
                          <p className="text-sm text-foreground/80 font-body leading-relaxed">
                            {renderWithLatex(soal.pembahasan.konsep)}
                          </p>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Langkah Penyelesaian</h5>
                          <div className="space-y-2">
                            {soal.pembahasan.langkah.map((step, idx) => (
                              <div key={idx} className="flex gap-3 items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                  {idx + 1}
                                </span>
                                <p className="text-sm text-foreground/80 font-body leading-relaxed">
                                  {renderWithLatex(step)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {soal.pembahasan.rumus && (
                          <div className="p-4 rounded-lg bg-muted/40 border border-border/50">
                            <h5 className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">Rumus</h5>
                            <p className="text-sm text-foreground font-body">
                              {renderWithLatex(soal.pembahasan.rumus)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
            ← Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeKPKFPBPage;
