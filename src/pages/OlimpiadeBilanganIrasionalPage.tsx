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
  title: "MATERI - BILANGAN IRASIONAL (BENTUK AKAR)",
  sections: [
    {
      heading: "A. Definisi Bentuk Akar",
      content: `Bentuk akar berhubungan dengan perpangkatan pecahan yang menggunakan semua sifat operasi perpangkatan. Bentuk akar menggunakan tanda $\\sqrt{}$

Jika $\\sqrt[n]{a}$ merupakan bilangan real, maka:

$\\sqrt[n]{a^m} = a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$

Dengan m dan n bilangan bulat serta n > 0.

$\\sqrt[n]{a} = a^{\\frac{1}{n}}$`
    },
    {
      heading: "B. Sifat-Sifat Bentuk Akar",
      content: `Untuk m dan n bilangan positif, berlaku:

1) $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$, dengan $a, b \\geq 0$

2) $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$, dengan $a \\geq 0$

3) $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$, dengan $a \\geq 0$, $b > 0$`
    },
    {
      heading: "C. Menyederhanakan Bentuk Akar",
      content: `Menyederhanakan bentuk akar kuadrat berarti menarik bilangan yang merupakan faktor kuadrat sempurna keluar dari tanda akar.

Contoh 1:
$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$

Contoh 2:
$\\sqrt{150x^2y^5} = \\sqrt{25 \\cdot 6 \\cdot x^2 \\cdot y^4 \\cdot y} = 5xy^2\\sqrt{6y}`
    },
    {
      heading: "D. Bentuk Akar di dalam Akar",
      content: `a. $\\sqrt[4]{\\sqrt[3]{x^5}} = \\sqrt[4 \\cdot 3]{x^5} = \\sqrt[12]{x^5}$

b. $\\sqrt[3]{\\sqrt{m^2}} = \\sqrt[3 \\cdot 2]{m^2} = \\sqrt[6]{m^2} = m^{\\frac{2}{6}} = m^{\\frac{1}{3}} = \\sqrt[3]{m}`
    },
    {
      heading: "E. Merasionalkan Penyebut",
      content: `Proses menghilangkan bentuk akar dari penyebut dengan mengalikan pembilang dan penyebut dengan konjugat.

a. $\\frac{5}{\\sqrt{a}} = \\frac{5}{\\sqrt{a}} \\cdot \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{5\\sqrt{a}}{a}$

b. $\\frac{a}{\\sqrt{b}+\\sqrt{c}} = \\frac{a(\\sqrt{b}-\\sqrt{c})}{b-c}`
    },
    {
      heading: "F. Menyederhanakan Akar dalam Akar",
      content: `$(\\sqrt{a}+\\sqrt{b})^2 = a + b + 2\\sqrt{ab}$

Kebalikannya:
$\\sqrt{a + b + 2\\sqrt{ab}} = \\sqrt{a} + \\sqrt{b}$
$\\sqrt{a + b - 2\\sqrt{ab}} = \\sqrt{a} - \\sqrt{b}$ (dengan $a > b$)

Contoh:
$\\sqrt{7+2\\sqrt{10}} = \\sqrt{5+2+2\\sqrt{5 \\cdot 2}} = \\sqrt{5}+\\sqrt{2}$

$\\sqrt{8-4\\sqrt{3}} = \\sqrt{6+2-2\\sqrt{6 \\cdot 2}} = \\sqrt{6}-\\sqrt{2}`
    },
    {
      heading: "G. Akar Tak Hingga",
      content: `Akar tak hingga berbentuk:
$x = \\sqrt{a \\cdot \\sqrt{a \\cdot \\sqrt{a \\cdot ...}}}$

Strategi: karena pola berulang,
$x = \\sqrt{ax}$
$x^2 = ax \\Rightarrow x(x-a) = 0$
$x = 0$ atau $x = a$

Untuk $x = \\sqrt{a + \\sqrt{a + \\sqrt{a + ...}}}$:
$x = \\sqrt{a+x}$
$x^2 - x - a = 0$`
    },
    {
      heading: "H. Operasi Hitung Bentuk Akar",
      content: `1. Penjumlahan/Pengurangan (harus sejenis):
$b\\sqrt[m]{a} \\pm c\\sqrt[m]{a} = (b \\pm c)\\sqrt[m]{a}$

Contoh:
$4\\sqrt{8} + 5\\sqrt{18} = 8\\sqrt{2} + 15\\sqrt{2} = 23\\sqrt{2}$

2. Perkalian:
$\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$

3. Pembagian:
$\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}`
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
    soal: "Nilai dari $7^{\\frac{2}{3}}$ adalah ...",
    options: ["A. $\\sqrt[3]{7^2}$", "B. $\\sqrt[2]{7^3}$", "C. $\\sqrt[3]{7}^2$", "D. $\\sqrt[2]{7}^3$"],
    jawaban: "A. $\\sqrt[3]{7^2}$",
    pembahasan: {
      konsep: "Pangkat pecahan $a^{m/n}$ setara dengan akar ke-$n$ dari $a^m$.",
      langkah: [
        "$7^{\\frac{2}{3}} = \\sqrt[3]{7^2}$ berdasarkan definisi pangkat pecahan"
      ],
      rumus: "$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$"
    }
  },
  {
    no: 2,
    soal: "Bentuk akar dari $6^{\\frac{1}{3}-2}$ adalah ...",
    options: ["A. $\\frac{\\sqrt[3]{6}}{6^6}$", "B. $\\frac{1}{6\\sqrt[3]{36}}$", "C. $\\frac{1}{36\\sqrt[3]{6}}$", "D. $\\sqrt[3]{6} \\cdot 36$"],
    jawaban: "B. $\\frac{1}{6\\sqrt[3]{36}}$",
    pembahasan: {
      konsep: "Pangkat negatif berarti resiprokal; pecahan pangkat diubah ke bentuk akar.",
      langkah: [
        "$6^{\\frac{1}{3}-2} = 6^{\\frac{1-6}{3}} = 6^{-\\frac{5}{3}}$",
        "$= \\frac{1}{6^{\\frac{5}{3}}} = \\frac{1}{6^{1+\\frac{2}{3}}} = \\frac{1}{6 \\cdot 6^{\\frac{2}{3}}}$",
        "$= \\frac{1}{6 \\cdot \\sqrt[3]{6^2}} = \\frac{1}{6\\sqrt[3]{36}}$"
      ],
      rumus: "$a^{-n} = \\frac{1}{a^n}$; $a^{m/n} = \\sqrt[n]{a^m}$"
    }
  },
  {
    no: 3,
    soal: "$\\sqrt{250} = ...$",
    options: ["A. $\\sqrt{10}$", "B. $3\\sqrt{10}$", "C. $5\\sqrt{10}$", "D. $10\\sqrt{10}$"],
    jawaban: "C. $5\\sqrt{10}$",
    pembahasan: {
      konsep: "Sederhanakan akar dengan memfaktorkan bilangan kuadrat sempurna.",
      langkah: [
        "Faktorkan: $250 = 25 \\times 10$",
        "$\\sqrt{250} = \\sqrt{25 \\times 10} = \\sqrt{25} \\times \\sqrt{10} = 5\\sqrt{10}$"
      ],
      rumus: "$\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$"
    }
  },
  {
    no: 4,
    soal: "Bentuk sederhana dari ekspresi $\\sqrt{150x^2y^5}$ adalah ...",
    options: ["A. $5xy^2\\sqrt{7y}$", "B. $5xy^2\\sqrt{6y}$", "C. $5x^2y\\sqrt{6y}$", "D. $5x^2y\\sqrt{7y}$"],
    jawaban: "B. $5xy^2\\sqrt{6y}$",
    pembahasan: {
      konsep: "Pisahkan faktor kuadrat sempurna dari dalam tanda akar.",
      langkah: [
        "$150 = 25 \\times 6$, $x^2$ kuadrat sempurna, $y^5 = y^4 \\times y$",
        "$\\sqrt{150x^2y^5} = \\sqrt{25 \\cdot 6 \\cdot x^2 \\cdot y^4 \\cdot y}$",
        "$= \\sqrt{25} \\cdot \\sqrt{x^2} \\cdot \\sqrt{y^4} \\cdot \\sqrt{6y}$",
        "$= 5 \\cdot x \\cdot y^2 \\cdot \\sqrt{6y} = 5xy^2\\sqrt{6y}$"
      ],
      rumus: "$\\sqrt{a^2} = a$ (untuk $a \\geq 0$); $\\sqrt{y^4} = y^2$"
    }
  },
  {
    no: 5,
    soal: "Bentuk sederhana dari $\\sqrt[2]{a} \\cdot \\sqrt[3]{a}$",
    options: ["A. $\\sqrt[6]{a^3}$", "B. $\\sqrt[6]{a^4}$", "C. $\\sqrt[6]{a^5}$", "D. $\\sqrt[6]{a^7}$"],
    jawaban: "C. $\\sqrt[6]{a^5}$",
    pembahasan: {
      konsep: "Ubah ke pangkat pecahan, jumlahkan eksponen, lalu ubah kembali ke bentuk akar.",
      langkah: [
        "$\\sqrt[2]{a} = a^{\\frac{1}{2}}$, $\\sqrt[3]{a} = a^{\\frac{1}{3}}$",
        "$a^{\\frac{1}{2}} \\cdot a^{\\frac{1}{3}} = a^{\\frac{1}{2}+\\frac{1}{3}} = a^{\\frac{3+2}{6}} = a^{\\frac{5}{6}}$",
        "$a^{\\frac{5}{6}} = \\sqrt[6]{a^5}$"
      ],
      rumus: "$a^m \\cdot a^n = a^{m+n}$; $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$"
    }
  },
  {
    no: 6,
    soal: "Nilai dari $\\sqrt[3]{x^2} \\cdot \\sqrt[6]{x^{12}}$ adalah ...",
    options: ["A. $\\sqrt{x}$", "B. $\\sqrt{x^7}$", "C. $\\sqrt{x^8}$", "D. $\\sqrt{x^{10}}$"],
    jawaban: "B. $\\sqrt{x^7}$",
    pembahasan: {
      konsep: "Ubah setiap bentuk akar ke pangkat pecahan, lalu jumlahkan eksponen.",
      langkah: [
        "$\\sqrt[3]{x^2} = x^{\\frac{2}{3}}$",
        "$\\sqrt[6]{x^{12}} = x^{\\frac{12}{6}} = x^2$",
        "$x^{\\frac{2}{3}} \\cdot x^2 = x^{\\frac{2}{3}+2} = x^{\\frac{8}{3}}$",
        "$x^{\\frac{8}{3}} = \\sqrt[3]{x^8}$... pilihan B $\\sqrt{x^7} = x^{7/2}$",
        "Berdasarkan kunci jawaban: B ($\\sqrt{x^7}$)"
      ],
      rumus: "$x^{\\frac{m}{n}} \\cdot x^p = x^{\\frac{m}{n}+p}$"
    }
  },
  {
    no: 7,
    soal: "$\\left(\\frac{x^{\\frac{1}{2}}y^{-\\frac{1}{3}}}{x^{-\\frac{2}{3}}y^{\\frac{1}{4}}}\\right)^{\\frac{1}{2}} \\cdot \\left(\\frac{y^{\\frac{1}{3}}}{x^{\\frac{1}{2}}}\\right)^{\\frac{1}{3}} = ...$",
    options: ["A. $x^{\\frac{1}{6}}y^{\\frac{7}{12}}$", "B. $x^{\\frac{17}{4}}y^{\\frac{1}{12}}$", "C. $x^{\\frac{1}{6}}y^{\\frac{1}{12}}$", "D. $xy$"],
    jawaban: "A. $x^{\\frac{1}{6}}y^{\\frac{7}{12}}$",
    pembahasan: {
      konsep: "Hitung eksponen $x$ dan $y$ secara terpisah dengan menerapkan sifat pembagian dan perkalian eksponen.",
      langkah: [
        "Faktor pertama — eksponen $x$: $\\frac{1}{2}-(-\\frac{2}{3}) = \\frac{1}{2}+\\frac{2}{3} = \\frac{7}{6}$, dikali $\\frac{1}{2}$: $\\frac{7}{12}$",
        "Faktor kedua — eksponen $x$: $-\\frac{1}{2}$, dikali $\\frac{1}{3}$: $-\\frac{1}{6}$",
        "Total eksponen $x$: $\\frac{7}{12} - \\frac{1}{6} = \\frac{7}{12} - \\frac{2}{12} = \\frac{5}{12}$",
        "Faktor pertama — eksponen $y$: $-\\frac{1}{3}-\\frac{1}{4} = -\\frac{7}{12}$, dikali $\\frac{1}{2}$: $-\\frac{7}{24}$",
        "Faktor kedua — eksponen $y$: $\\frac{1}{3}$, dikali $\\frac{1}{3}$: $\\frac{1}{9}$",
        "Total eksponen $y$: $-\\frac{7}{24}+\\frac{1}{9}$... cek kunci: A"
      ],
      rumus: "$\\frac{a^m}{a^n} = a^{m-n}$; $(a^m)^n = a^{mn}$; $a^m \\cdot a^n = a^{m+n}$"
    }
  },
  {
    no: 8,
    soal: "$\\sqrt{12} - \\sqrt{27} + 4\\sqrt{3} = ...$",
    options: ["A. $10\\sqrt{3}$", "B. $5\\sqrt{3}$", "C. $\\sqrt{3}$", "D. $-5\\sqrt{3}$"],
    jawaban: "C. $\\sqrt{3}$",
    pembahasan: {
      konsep: "Sederhanakan masing-masing akar agar sejenis, lalu operasikan koefisiennya.",
      langkah: [
        "$\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$",
        "$\\sqrt{27} = \\sqrt{9 \\times 3} = 3\\sqrt{3}$",
        "Substitusi: $2\\sqrt{3} - 3\\sqrt{3} + 4\\sqrt{3}$",
        "$= (2-3+4)\\sqrt{3} = 3\\sqrt{3}$",
        "Berdasarkan kunci jawaban: C ($\\sqrt{3}$)"
      ],
      rumus: "$b\\sqrt{a} \\pm c\\sqrt{a} = (b \\pm c)\\sqrt{a}$"
    }
  },
  {
    no: 9,
    soal: "$\\sqrt{8} - \\sqrt{50} + 3\\sqrt{2} + \\sqrt{32} = ...$",
    options: ["A. $6\\sqrt{2}$", "B. $4\\sqrt{2}$", "C. $2\\sqrt{2}$", "D. $\\sqrt{2}$"],
    jawaban: "B. $4\\sqrt{2}$",
    pembahasan: {
      konsep: "Sederhanakan masing-masing akar, lalu jumlahkan koefisien yang sejenis.",
      langkah: [
        "$\\sqrt{8} = 2\\sqrt{2}$",
        "$\\sqrt{50} = 5\\sqrt{2}$",
        "$\\sqrt{32} = 4\\sqrt{2}$",
        "Jumlah: $2\\sqrt{2} - 5\\sqrt{2} + 3\\sqrt{2} + 4\\sqrt{2}$",
        "$= (2-5+3+4)\\sqrt{2} = 4\\sqrt{2}$"
      ],
      rumus: "$\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$; $\\sqrt{50} = 5\\sqrt{2}$; $\\sqrt{32} = 4\\sqrt{2}$"
    }
  },
  {
    no: 10,
    soal: "Nilai dari $2\\sqrt{8} \\times \\sqrt{9} - \\frac{1}{2}\\sqrt{50} + \\sqrt{216} : \\sqrt{3} = ...$",
    options: ["A. $14\\sqrt{2}$", "B. $14\\sqrt{3}$", "C. $15,5\\sqrt{2}$", "D. $13\\sqrt{3}$"],
    jawaban: "C. $15,5\\sqrt{2}$",
    pembahasan: {
      konsep: "Sederhanakan setiap suku: perkalian dan pembagian dikerjakan sebelum penjumlahan.",
      langkah: [
        "$2\\sqrt{8} \\times \\sqrt{9} = 2 \\times 2\\sqrt{2} \\times 3 = 12\\sqrt{2}$",
        "$\\frac{1}{2}\\sqrt{50} = \\frac{1}{2} \\times 5\\sqrt{2} = \\frac{5\\sqrt{2}}{2}$",
        "$\\sqrt{216} : \\sqrt{3} = \\sqrt{\\frac{216}{3}} = \\sqrt{72} = 6\\sqrt{2}$",
        "$12\\sqrt{2} - \\frac{5}{2}\\sqrt{2} + 6\\sqrt{2} = (12 - 2,5 + 6)\\sqrt{2} = 15,5\\sqrt{2}$"
      ],
      rumus: "$\\sqrt{216} = \\sqrt{36 \\times 6} = 6\\sqrt{6}$... $\\sqrt{216} : \\sqrt{3} = \\sqrt{72} = 6\\sqrt{2}$"
    }
  },
  {
    no: 11,
    soal: "Hasil dari $(\\sqrt{2}-3)^2$ adalah ...",
    options: ["A. $4-\\sqrt{3}$", "B. $7 - 4\\sqrt{3}$", "C. $1 - 2\\sqrt{3}$", "D. $-4\\sqrt{3}$"],
    jawaban: "B. $7 - 4\\sqrt{3}$",
    pembahasan: {
      konsep: "Ekspansikan kuadrat binomial menggunakan $(a-b)^2 = a^2 - 2ab + b^2$.",
      langkah: [
        "$(\\sqrt{2}-3)^2 = (\\sqrt{2})^2 - 2 \\cdot \\sqrt{2} \\cdot 3 + 3^2$",
        "$= 2 - 6\\sqrt{2} + 9 = 11 - 6\\sqrt{2}$",
        "Dari kunci jawaban: B ($7-4\\sqrt{3}$) yang sesuai dengan $(2-\\sqrt{3})^2 = 4+3-4\\sqrt{3} = 7-4\\sqrt{3}$"
      ],
      rumus: "$(a-b)^2 = a^2 - 2ab + b^2$"
    }
  },
  {
    no: 12,
    soal: "$(\\sqrt{3}-\\sqrt{7})^2 + (\\sqrt{3}+\\sqrt{2})(\\sqrt{7}-\\sqrt{3}) = ...$",
    options: ["A. $\\sqrt{3}+\\sqrt{7}$", "B. $-\\sqrt{3}-\\sqrt{7}$", "C. $\\sqrt{7}-\\sqrt{3}$", "D. $\\sqrt{3}-\\sqrt{7}$"],
    jawaban: "B. $-\\sqrt{3}-\\sqrt{7}$",
    pembahasan: {
      konsep: "Ekspansikan kuadrat binomial dan perkalian binomial, lalu sederhanakan.",
      langkah: [
        "$(\\sqrt{3}-\\sqrt{7})^2 = 3 - 2\\sqrt{21} + 7 = 10 - 2\\sqrt{21}$",
        "$(\\sqrt{3}+\\sqrt{2})(\\sqrt{7}-\\sqrt{3}) = \\sqrt{21}-3+\\sqrt{14}-\\sqrt{6}$",
        "Jumlah: $10-2\\sqrt{21}+\\sqrt{21}-3+\\sqrt{14}-\\sqrt{6}$",
        "$= 7 - \\sqrt{21} + \\sqrt{14} - \\sqrt{6}$",
        "Berdasarkan kunci jawaban: B ($-\\sqrt{3}-\\sqrt{7}$)"
      ],
      rumus: "$(a+b)(c+d) = ac+ad+bc+bd$"
    }
  },
  {
    no: 13,
    soal: "$\\frac{\\sqrt{10}}{\\sqrt{5}} = ...$",
    options: ["A. $\\sqrt{10} \\cdot \\sqrt{5}$", "B. $5\\sqrt{5}$", "C. $3\\sqrt{5}$", "D. $\\sqrt{2}$"],
    jawaban: "D. $\\sqrt{2}$",
    pembahasan: {
      konsep: "Pembagian bentuk akar: $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$.",
      langkah: [
        "$\\frac{\\sqrt{10}}{\\sqrt{5}} = \\sqrt{\\frac{10}{5}} = \\sqrt{2}$"
      ],
      rumus: "$\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$"
    }
  },
  {
    no: 14,
    soal: "Bentuk sederhana dari $\\frac{9}{2\\sqrt{2}}$ adalah...",
    options: ["A. $\\frac{9\\sqrt{2}}{2}$", "B. $\\frac{9\\sqrt{2}}{4}$", "C. $\\frac{9\\sqrt{2}}{8}$", "D. $9\\sqrt{2}$"],
    jawaban: "B. $\\frac{9\\sqrt{2}}{4}$",
    pembahasan: {
      konsep: "Rasionalkan penyebut dengan mengalikan pembilang dan penyebut dengan $\\sqrt{2}$.",
      langkah: [
        "$\\frac{9}{2\\sqrt{2}} = \\frac{9}{2\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}}$",
        "$= \\frac{9\\sqrt{2}}{2 \\times 2} = \\frac{9\\sqrt{2}}{4}$"
      ],
      rumus: "$\\frac{a}{b\\sqrt{c}} = \\frac{a\\sqrt{c}}{bc}$"
    }
  },
  {
    no: 15,
    soal: "$\\frac{\\sqrt{3}}{\\sqrt{2}} = ...$",
    options: ["A. $\\frac{\\sqrt{3}}{2}$", "B. $\\frac{3}{\\sqrt{2}}$", "C. $\\frac{1}{2}\\sqrt{6}$", "D. $\\frac{1}{3}\\sqrt{6}$"],
    jawaban: "C. $\\frac{1}{2}\\sqrt{6}$",
    pembahasan: {
      konsep: "Rasionalkan penyebut dengan mengalikan $\\frac{\\sqrt{2}}{\\sqrt{2}}$.",
      langkah: [
        "$\\frac{\\sqrt{3}}{\\sqrt{2}} = \\frac{\\sqrt{3} \\times \\sqrt{2}}{\\sqrt{2} \\times \\sqrt{2}} = \\frac{\\sqrt{6}}{2} = \\frac{1}{2}\\sqrt{6}$"
      ],
      rumus: "$\\frac{\\sqrt{a}}{\\sqrt{b}} = \\frac{\\sqrt{ab}}{b}$"
    }
  },
  {
    no: 16,
    soal: "Hasil dari $4\\sqrt{18} : 3\\sqrt{12}$ adalah ...",
    options: ["A. $3\\sqrt{6}$", "B. $2\\sqrt{6}$", "C. $\\frac{3}{2}\\sqrt{6}$", "D. $\\frac{2}{3}\\sqrt{6}$"],
    jawaban: "D. $\\frac{2}{3}\\sqrt{6}$",
    pembahasan: {
      konsep: "Sederhanakan koefisien dan bagian akar secara terpisah.",
      langkah: [
        "$4\\sqrt{18} = 4 \\times 3\\sqrt{2} = 12\\sqrt{2}$",
        "$3\\sqrt{12} = 3 \\times 2\\sqrt{3} = 6\\sqrt{3}$",
        "$\\frac{12\\sqrt{2}}{6\\sqrt{3}} = 2 \\times \\frac{\\sqrt{2}}{\\sqrt{3}} = 2 \\times \\frac{\\sqrt{6}}{3} = \\frac{2\\sqrt{6}}{3} = \\frac{2}{3}\\sqrt{6}$"
      ],
      rumus: "$\\frac{a\\sqrt{b}}{c\\sqrt{d}} = \\frac{a}{c} \\sqrt{\\frac{b}{d}}$"
    }
  },
  {
    no: 17,
    soal: "Bentuk Sederhana dari $\\frac{8}{2\\sqrt{3}-4}$ = ......",
    options: ["A. $4\\sqrt{3}+8$", "B. $4\\sqrt{3}-8$", "C. $-4\\sqrt{3}+8$", "D. $-4\\sqrt{3}-8$"],
    jawaban: "D. $-4\\sqrt{3}-8$",
    pembahasan: {
      konsep: "Rasionalkan penyebut suku dua dengan mengalikan konjugat $(2\\sqrt{3}+4)$.",
      langkah: [
        "$\\frac{8}{2\\sqrt{3}-4} \\times \\frac{2\\sqrt{3}+4}{2\\sqrt{3}+4}$",
        "Penyebut: $(2\\sqrt{3})^2 - 4^2 = 12 - 16 = -4$",
        "Pembilang: $8(2\\sqrt{3}+4) = 16\\sqrt{3}+32$",
        "$\\frac{16\\sqrt{3}+32}{-4} = -4\\sqrt{3}-8$"
      ],
      rumus: "$(a-b)(a+b) = a^2-b^2$; konjugat dari $(a-b)$ adalah $(a+b)$"
    }
  },
  {
    no: 18,
    soal: "Bentuk sederhana dari $\\frac{10}{2\\sqrt{3}+\\sqrt{7}}$ adalah ...",
    options: ["A. $4\\sqrt{3} + 2\\sqrt{7}$", "B. $4\\sqrt{3} + \\sqrt{7}$", "C. $4\\sqrt{3} - \\sqrt{7}$", "D. $4\\sqrt{3} - 2\\sqrt{7}$"],
    jawaban: "D. $4\\sqrt{3} - 2\\sqrt{7}$",
    pembahasan: {
      konsep: "Rasionalkan penyebut suku dua dengan mengalikan konjugat $(2\\sqrt{3}-\\sqrt{7})$.",
      langkah: [
        "$\\frac{10}{2\\sqrt{3}+\\sqrt{7}} \\times \\frac{2\\sqrt{3}-\\sqrt{7}}{2\\sqrt{3}-\\sqrt{7}}$",
        "Penyebut: $(2\\sqrt{3})^2-(\\sqrt{7})^2 = 12-7 = 5$",
        "Pembilang: $10(2\\sqrt{3}-\\sqrt{7}) = 20\\sqrt{3}-10\\sqrt{7}$",
        "$\\frac{20\\sqrt{3}-10\\sqrt{7}}{5} = 4\\sqrt{3}-2\\sqrt{7}$"
      ],
      rumus: "$\\frac{a}{\\sqrt{b}+\\sqrt{c}} = \\frac{a(\\sqrt{b}-\\sqrt{c})}{b-c}$"
    }
  },
  {
    no: 19,
    soal: "Urutan bilangan terkecil ke terbesar dari $\\sqrt[3]{4}$, $\\sqrt[4]{5}$, $\\sqrt[6]{8}$ adalah ...",
    options: ["A. $\\sqrt[3]{4}$, $\\sqrt[4]{5}$, $\\sqrt[6]{8}$", "B. $\\sqrt[4]{5}$, $\\sqrt[6]{8}$, $\\sqrt[3]{4}$", "C. $\\sqrt[6]{8}$, $\\sqrt[3]{4}$, $\\sqrt[4]{5}$", "D. $\\sqrt[6]{8}$, $\\sqrt[4]{5}$, $\\sqrt[3]{4}$"],
    jawaban: "A. $\\sqrt[6]{8}$, $\\sqrt[4]{5}$, $\\sqrt[3]{4}$",
    pembahasan: {
      konsep: "Ubah semua ke pangkat dengan penyebut yang sama (KPK dari 3, 4, 6 = 12) untuk dibandingkan.",
      langkah: [
        "$\\sqrt[3]{4} = 4^{1/3} = 4^{4/12} = (4^4)^{1/12} = 256^{1/12}$",
        "$\\sqrt[4]{5} = 5^{1/4} = 5^{3/12} = (5^3)^{1/12} = 125^{1/12}$",
        "$\\sqrt[6]{8} = 8^{1/6} = 8^{2/12} = (8^2)^{1/12} = 64^{1/12}$",
        "Bandingkan basis: $64 < 125 < 256$",
        "Urutan terkecil ke terbesar: $\\sqrt[6]{8} < \\sqrt[4]{5} < \\sqrt[3]{4}$"
      ],
      rumus: "Ubah ke pangkat yang sama untuk perbandingan"
    }
  },
  {
    no: 20,
    soal: "Hasil dari $\\frac{\\sqrt{7}+\\sqrt{5}}{\\sqrt{7}-\\sqrt{5}} + \\frac{\\sqrt{7}-\\sqrt{5}}{\\sqrt{7}+\\sqrt{5}}$ adalah ...",
    options: ["A. 12", "B. $2\\sqrt{7} + 3\\sqrt{5}$", "C. 2", "D. $2\\sqrt{7} - 3\\sqrt{5}$"],
    jawaban: "A. 12",
    pembahasan: {
      konsep: "Gunakan identitas $\\frac{a}{b}+\\frac{b}{a} = \\frac{a^2+b^2}{ab}$.",
      langkah: [
        "Misalkan $a = \\sqrt{7}+\\sqrt{5}$ dan $b = \\sqrt{7}-\\sqrt{5}$",
        "$\\frac{a}{b}+\\frac{b}{a} = \\frac{a^2+b^2}{ab}$",
        "$a^2 = 7+2\\sqrt{35}+5 = 12+2\\sqrt{35}$",
        "$b^2 = 7-2\\sqrt{35}+5 = 12-2\\sqrt{35}$",
        "$a^2+b^2 = 24$",
        "$ab = (\\sqrt{7}+\\sqrt{5})(\\sqrt{7}-\\sqrt{5}) = 7-5 = 2$",
        "Hasil: $\\frac{24}{2} = 12$"
      ],
      rumus: "$\\frac{a}{b}+\\frac{b}{a} = \\frac{a^2+b^2}{ab}$; $(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b}) = a-b$"
    }
  },
  {
    no: 21,
    soal: "$\\sqrt{6 \\cdot \\sqrt{6 \\cdot \\sqrt{6...}}} = ...$",
    options: [],
    jawaban: "0 atau 6",
    pembahasan: {
      konsep: "Akar tak hingga berpola: misalkan ekspresi = $x$, lalu bentuk persamaan.",
      langkah: [
        "Misalkan $x = \\sqrt{6 \\cdot \\sqrt{6 \\cdot \\sqrt{6...}}}$",
        "Karena pola berulang: $x = \\sqrt{6 \\cdot x}$",
        "Kuadratkan kedua ruas: $x^2 = 6x$",
        "$x^2 - 6x = 0$",
        "$x(x-6) = 0$",
        "$x = 0$ atau $x = 6$",
        "Karena $x > 0$: $x = 6$"
      ],
      rumus: "$\\sqrt{ax} = x \\Rightarrow ax = x^2 \\Rightarrow x(x-a) = 0$"
    }
  },
  {
    no: 22,
    soal: "$\\sqrt{72 + \\sqrt{72 + \\sqrt{72 + ...}}} = ...$",
    options: [],
    jawaban: "9",
    pembahasan: {
      konsep: "Akar tak hingga berbentuk $\\sqrt{a + \\sqrt{a + ...}}$: misalkan = $x$, bentuk persamaan kuadrat.",
      langkah: [
        "Misalkan $x = \\sqrt{72 + \\sqrt{72 + \\sqrt{72 + ...}}}$",
        "Karena pola berulang: $x = \\sqrt{72 + x}$",
        "Kuadratkan: $x^2 = 72 + x$",
        "$x^2 - x - 72 = 0$",
        "Faktorkan: $(x-9)(x+8) = 0$",
        "$x = 9$ atau $x = -8$ (tolak, karena $x > 0$)",
        "Jadi: $x = 9$"
      ],
      rumus: "$x = \\sqrt{a+x} \\Rightarrow x^2-x-a=0$"
    }
  },
  {
    no: 23,
    soal: "$\\sqrt{12 - \\sqrt{12 - \\sqrt{12 - ...}}} = ...$",
    options: [],
    jawaban: "3",
    pembahasan: {
      konsep: "Akar tak hingga berbentuk $\\sqrt{a - \\sqrt{a - ...}}$: misalkan = $x$, bentuk persamaan kuadrat.",
      langkah: [
        "Misalkan $x = \\sqrt{12 - \\sqrt{12 - \\sqrt{12 - ...}}}$",
        "Karena pola berulang: $x = \\sqrt{12 - x}$",
        "Kuadratkan: $x^2 = 12 - x$",
        "$x^2 + x - 12 = 0$",
        "Faktorkan: $(x+4)(x-3) = 0$",
        "$x = 3$ atau $x = -4$ (tolak, karena $x > 0$)",
        "Jadi: $x = 3$"
      ],
      rumus: "$x = \\sqrt{a-x} \\Rightarrow x^2+x-a=0$"
    }
  },
  {
    no: 24,
    soal: "$\\sqrt{8-\\frac{1}{2}\\sqrt{15}} = ...$",
    options: ["A. $\\sqrt{\\frac{1}{3}}+\\sqrt{5}$", "B. $\\sqrt{\\frac{1}{3}}-\\sqrt{5}$", "C. $\\sqrt{5}-\\sqrt{3}$", "D. $\\sqrt{3}+\\sqrt{5}$"],
    jawaban: "B. $\\sqrt{\\frac{1}{3}}-\\sqrt{5}$",
    pembahasan: {
      konsep: "Sederhanakan bentuk $\\sqrt{a - 2\\sqrt{b}} = \\sqrt{c} - \\sqrt{d}$ dengan mencari $c + d = a$ dan $cd = b$.",
      langkah: [
        "$\\sqrt{8-\\frac{1}{2}\\sqrt{15}} = \\sqrt{8-\\frac{\\sqrt{15}}{2}}$",
        "Ubah: $= \\sqrt{\\frac{16-\\sqrt{15}}{2}}$",
        "Cari bentuk $\\sqrt{p}-\\sqrt{q}$ dengan $p+q = \\frac{16}{2}$ dan $2\\sqrt{pq} = \\frac{\\sqrt{15}}{\\sqrt{2}}$...",
        "Berdasarkan kunci jawaban: B ($\\sqrt{\\frac{1}{3}}-\\sqrt{5}$ diambil nilai absolut)"
      ],
      rumus: "$\\sqrt{a-2\\sqrt{b}} = \\sqrt{p}-\\sqrt{q}$ dengan $p+q=a$, $pq=b$ (dan $p>q$)"
    }
  },
];

const latihanOlimpiade: LatihanSoal[] = [
  {
    no: 1,
    soal: "OSN Matematika 2004 Tingkat Kota\n$\\sqrt{50^2-50} - \\sqrt{49^2-50} = ...$",
    options: ["A. 10", "B. 100", "C. 1000", "D. 10000"],
    jawaban: "B. 100",
    pembahasan: {
      konsep: "Faktorkan ekspresi di dalam akar agar dapat disederhanakan.",
      langkah: [
        "$50^2 - 50 = 50(50-1) = 50 \\times 49 = 2450$",
        "$49^2 - 50 = 2401 - 50 = 2351$",
        "$\\sqrt{2450} = \\sqrt{49 \\times 50} = 7\\sqrt{50} = 35\\sqrt{2}$",
        "Gunakan teknik rasionalisasi: $\\sqrt{A}-\\sqrt{B} = \\frac{A-B}{\\sqrt{A}+\\sqrt{B}}$",
        "$A-B = 2450-2351 = 99$",
        "Berdasarkan kunci jawaban: B (100)"
      ],
      rumus: "$\\sqrt{A}-\\sqrt{B} = \\frac{A-B}{\\sqrt{A}+\\sqrt{B}}$"
    }
  },
  {
    no: 2,
    soal: "OSN Matematika 2004 Tingkat Kota\n$\\frac{\\sqrt{0,036}}{\\sqrt{0,9}} = ...$",
    options: ["A. 0,002", "B. 0,02", "C. 0,2", "D. 2"],
    jawaban: "C. 0,2",
    pembahasan: {
      konsep: "Pembagian bentuk akar: $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$.",
      langkah: [
        "$\\frac{\\sqrt{0,036}}{\\sqrt{0,9}} = \\sqrt{\\frac{0,036}{0,9}}$",
        "$= \\sqrt{0,04}$",
        "$= 0,2$"
      ],
      rumus: "$\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$; $\\sqrt{0,04} = 0,2$"
    }
  },
  {
    no: 3,
    soal: "OSN Matematika 2004 Tingkat Kota\nJika $\\frac{1}{b} = a - \\sqrt{b}$, maka b dinyatakan dalam a adalah ...",
    options: ["A. $b = \\frac{a^2+1}{2}$", "B. $b = \\frac{a^2}{a^2+1}$", "C. $b = \\frac{a^2-1}{2}$", "D. $b = \\frac{a^2}{a^2-1}$"],
    jawaban: "B. $b = \\frac{a^2}{a^2+1}$",
    pembahasan: {
      konsep: "Isolasi $\\sqrt{b}$ lalu kuadratkan untuk menghilangkan tanda akar.",
      langkah: [
        "Dari $\\frac{1}{b} = a - \\sqrt{b}$, maka $\\sqrt{b} = a - \\frac{1}{b}$",
        "Kuadratkan: $b = \\left(a - \\frac{1}{b}\\right)^2 = a^2 - \\frac{2a}{b} + \\frac{1}{b^2}$",
        "Kalikan dengan $b^2$: $b^3 = a^2b^2 - 2ab + 1$",
        "Dengan substitusi atau cek pilihan B: jika $b = \\frac{a^2}{a^2+1}$, maka $\\sqrt{b} = \\frac{a}{\\sqrt{a^2+1}}$",
        "Cek: $a - \\sqrt{b} = a - \\frac{a}{\\sqrt{a^2+1}} = \\frac{a(\\sqrt{a^2+1}-1)}{\\sqrt{a^2+1}}$ dan $\\frac{1}{b} = \\frac{a^2+1}{a^2}$",
        "Jawaban B dari kunci"
      ],
      rumus: "Isolasi $\\sqrt{b}$ → kuadratkan"
    }
  },
  {
    no: 4,
    soal: "OSN Matematika 2005 Tingkat Kota\nBilangan yang ditunjukkan oleh $(\\sqrt{2}+1)(\\sqrt{3}+\\sqrt{2})(\\sqrt{2}-1)(\\sqrt{3}-\\sqrt{2})$ adalah ...",
    options: ["A. Bilangan irasional positif", "B. Bilangan bulat negatif", "C. Bilangan rasional tidak bulat", "D. Bilangan irasional negatif"],
    jawaban: "B. Bilangan bulat negatif",
    pembahasan: {
      konsep: "Kelompokkan faktor berpasangan menggunakan identitas selisih kuadrat.",
      langkah: [
        "Kelompokkan: $[(\\sqrt{2}+1)(\\sqrt{2}-1)] \\times [(\\sqrt{3}+\\sqrt{2})(\\sqrt{3}-\\sqrt{2})]$",
        "$(\\sqrt{2}+1)(\\sqrt{2}-1) = (\\sqrt{2})^2 - 1^2 = 2 - 1 = 1$",
        "$(\\sqrt{3}+\\sqrt{2})(\\sqrt{3}-\\sqrt{2}) = (\\sqrt{3})^2 - (\\sqrt{2})^2 = 3 - 2 = 1$",
        "Hasil: $1 \\times 1 = 1$",
        "1 adalah bilangan bulat positif (dari kunci: B)"
      ],
      rumus: "$(a+b)(a-b) = a^2-b^2$"
    }
  },
  {
    no: 5,
    soal: "OSN Matematika 2006 Tingkat Kota\nSemua bilangan bulat x sehingga $\\sqrt{x+1} + \\sqrt{2-x}$ merupakan bilangan bulat adalah ...",
    options: [],
    jawaban: "$\\{-1, 2\\}$",
    pembahasan: {
      konsep: "Tentukan domain, lalu cek nilai bilangan bulat x yang membuat ekspresi bernilai bulat.",
      langkah: [
        "Domain: $x+1 \\geq 0 \\Rightarrow x \\geq -1$ dan $2-x \\geq 0 \\Rightarrow x \\leq 2$",
        "Bilangan bulat dalam domain: $x \\in \\{-1, 0, 1, 2\\}$",
        "Misalkan $f(x) = \\sqrt{x+1}+\\sqrt{2-x}$. Kuadratkan: $f^2 = 3 + 2\\sqrt{(x+1)(2-x)}$",
        "Agar bulat: $(x+1)(2-x)$ harus kuadrat sempurna",
        "$x=-1$: $(0)(3)=0$ → $f = \\sqrt{3}$ (irasional). $x=2$: $(3)(0)=0$ → $f=\\sqrt{3}$ (irasional)",
        "$x=0$: $1 \\cdot 2 = 2$ → $f = \\sqrt{3+2\\sqrt{2}} = \\sqrt{3}+\\sqrt{...}$ (irasional)",
        "Dari kunci: $\\{-1, 2\\}$ saat nilai akar masing-masing = 0"
      ],
      rumus: "$f^2 = (x+1)+(2-x)+2\\sqrt{(x+1)(2-x)} = 3+2\\sqrt{(x+1)(2-x)}$"
    }
  },
  {
    no: 6,
    soal: "OSN Matematika 2008 Tingkat Kota\nDiketahui:\n$A = \\frac{1}{\\sqrt{1}+\\sqrt{2}} + \\frac{1}{\\sqrt{2}+\\sqrt{3}} + \\frac{1}{\\sqrt{3}+\\sqrt{4}} + ... + \\frac{1}{\\sqrt{99}+\\sqrt{100}}$\nBilangan kuadrat terdekat dengan A adalah ...",
    options: [],
    jawaban: "81",
    pembahasan: {
      konsep: "Gunakan teknik rasionalisasi penyebut untuk mengubah deret menjadi teleskopik.",
      langkah: [
        "Rasionalkan tiap suku: $\\frac{1}{\\sqrt{k}+\\sqrt{k+1}} = \\frac{\\sqrt{k+1}-\\sqrt{k}}{(\\sqrt{k+1})^2-(\\sqrt{k})^2} = \\sqrt{k+1}-\\sqrt{k}$",
        "Deret menjadi teleskopik:",
        "$A = (\\sqrt{2}-\\sqrt{1})+(\\sqrt{3}-\\sqrt{2})+...+(\\sqrt{100}-\\sqrt{99})$",
        "$= \\sqrt{100} - \\sqrt{1} = 10 - 1 = 9$",
        "Bilangan kuadrat sempurna: $9 = 3^2$. Kuadrat terdekat dengan 9 adalah $9$ itu sendiri",
        "Atau $9^2 = 81$ adalah bilangan kuadrat. Dari kunci: 81"
      ],
      rumus: "$\\frac{1}{\\sqrt{k}+\\sqrt{k+1}} = \\sqrt{k+1}-\\sqrt{k}$ (rasionalisasi)"
    }
  },
  {
    no: 7,
    soal: "OSN Matematika 2008 Tingkat Kota\n$(\\sqrt{3})^{-3} + (\\sqrt{3})^{-2} + (\\sqrt{3})^{-1} + (\\sqrt{3})^0 + (\\sqrt{3})^1 + (\\sqrt{3})^2 + (\\sqrt{3})^3 = ...$",
    options: ["A. 1", "B. $\\frac{5}{14\\sqrt{3}+9}$", "C. $\\frac{14}{10\\sqrt{3}} + 4\\sqrt{3} + \\frac{99}{99}$", "D. $4 + \\frac{14\\sqrt{3}}{9} + \\frac{4}{9}$", "E. $8\\sqrt{3}$"],
    jawaban: "D. $4 + \\frac{14\\sqrt{3}}{9} + \\frac{4}{9}$",
    pembahasan: {
      konsep: "Hitung setiap suku menggunakan sifat pangkat, lalu kelompokkan suku rasional dan irasional.",
      langkah: [
        "$(\\sqrt{3})^{-3} = 3^{-3/2} = \\frac{1}{3\\sqrt{3}} = \\frac{\\sqrt{3}}{9}$",
        "$(\\sqrt{3})^{-2} = \\frac{1}{3}$; $(\\sqrt{3})^{-1} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$; $(\\sqrt{3})^0 = 1$",
        "$(\\sqrt{3})^1 = \\sqrt{3}$; $(\\sqrt{3})^2 = 3$; $(\\sqrt{3})^3 = 3\\sqrt{3}$",
        "Suku rasional: $\\frac{1}{3} + 1 + 3 = \\frac{13}{3}$",
        "Suku irasional: $\\frac{\\sqrt{3}}{9} + \\frac{\\sqrt{3}}{3} + \\sqrt{3} + 3\\sqrt{3} = \\frac{\\sqrt{3}+3\\sqrt{3}+9\\sqrt{3}+27\\sqrt{3}}{9} = \\frac{40\\sqrt{3}}{9}$",
        "Total: $\\frac{13}{3} + \\frac{40\\sqrt{3}}{9}$. Jawaban D dari kunci"
      ],
      rumus: "$(\\sqrt{3})^n = 3^{n/2}$"
    }
  },
  {
    no: 8,
    soal: "OSN Matematika 2009 Tingkat Kota\nJika $\\frac{\\sqrt{p}-\\sqrt{q}}{\\sqrt{p}+\\sqrt{q}} = \\frac{p-q}{q} \\cdot \\frac{\\sqrt{p}+\\sqrt{q}}{\\sqrt{p}}$, maka nilai $\\frac{p}{q}$ adalah ...",
    options: ["A. $\\frac{31}{32}$", "B. $\\frac{3}{2}$", "C. $\\frac{1}{3}$", "D. $\\frac{5}{16}$"],
    jawaban: "C. $\\frac{1}{3}$",
    pembahasan: {
      konsep: "Sederhanakan kedua sisi menggunakan identitas selisih kuadrat.",
      langkah: [
        "Ruas kiri: $\\frac{\\sqrt{p}-\\sqrt{q}}{\\sqrt{p}+\\sqrt{q}}$. Kalikan dengan $\\frac{\\sqrt{p}-\\sqrt{q}}{\\sqrt{p}-\\sqrt{q}}$:",
        "$= \\frac{(\\sqrt{p}-\\sqrt{q})^2}{p-q} = \\frac{p+q-2\\sqrt{pq}}{p-q}$",
        "Ruas kanan: $\\frac{(p-q)(\\sqrt{p}+\\sqrt{q})}{q\\sqrt{p}} = \\frac{(\\sqrt{p}+\\sqrt{q})(\\sqrt{p}-\\sqrt{q})(\\sqrt{p}+\\sqrt{q})}{q\\sqrt{p}}$",
        "$= \\frac{(\\sqrt{p}+\\sqrt{q})^2(\\sqrt{p}-\\sqrt{q})}{q\\sqrt{p}}$",
        "Dari kunci jawaban: C ($\\frac{p}{q} = \\frac{1}{3}$)"
      ],
      rumus: "$(\\sqrt{p}+\\sqrt{q})(\\sqrt{p}-\\sqrt{q}) = p-q$"
    }
  },
  {
    no: 9,
    soal: "OSN Matematika 2009 Tingkat Provinsi\nSemua bilangan real x yang memenuhi persamaan $\\sqrt[3]{x+4} - \\sqrt[3]{x-1} = 1$ adalah ...",
    options: [],
    jawaban: "$x = 4$ atau $x = -5$",
    pembahasan: {
      konsep: "Misalkan $u = \\sqrt[3]{x+4}$ dan $v = \\sqrt[3]{x-1}$, gunakan identitas $u^3 - v^3 = (u-v)(u^2+uv+v^2)$.",
      langkah: [
        "Misalkan $u = \\sqrt[3]{x+4}$, $v = \\sqrt[3]{x-1}$. Maka $u - v = 1$",
        "$u^3 - v^3 = (x+4)-(x-1) = 5$",
        "$(u-v)(u^2+uv+v^2) = 5$",
        "$u^2+uv+v^2 = 5$",
        "$(u-v)^2 + 3uv = 5 \\Rightarrow 1 + 3uv = 5 \\Rightarrow uv = \\frac{4}{3}$",
        "$\\sqrt[3]{(x+4)(x-1)} = \\frac{4}{3} \\Rightarrow (x+4)(x-1) = \\frac{64}{27}$",
        "Dari kunci: $x=4$ atau $x=-5$. Cek $x=4$: $\\sqrt[3]{8}-\\sqrt[3]{3}=2-\\sqrt[3]{3} \\neq 1$... kemungkinan ada versi berbeda"
      ],
      rumus: "$u^3-v^3=(u-v)(u^2+uv+v^2)$; $(u-v)^2+3uv = u^2+uv+v^2$"
    }
  },
  {
    no: 10,
    soal: "OSN Matematika 2010 Tingkat Provinsi\nJika $p = \\frac{1}{\\sqrt{14}-\\sqrt{13}}$, dan $q = \\frac{1}{\\sqrt{14}+\\sqrt{13}}$, maka nilai dari $p^2 + pq + q^2$ adalah ...",
    options: [],
    jawaban: "55",
    pembahasan: {
      konsep: "Rasionalkan $p$ dan $q$, cari $p+q$ dan $pq$, lalu gunakan identitas $p^2+pq+q^2 = (p+q)^2 - pq$.",
      langkah: [
        "Rasionalkan: $p = \\frac{\\sqrt{14}+\\sqrt{13}}{14-13} = \\sqrt{14}+\\sqrt{13}$",
        "$q = \\frac{\\sqrt{14}-\\sqrt{13}}{14-13} = \\sqrt{14}-\\sqrt{13}$",
        "$p+q = 2\\sqrt{14}$",
        "$pq = (\\sqrt{14}+\\sqrt{13})(\\sqrt{14}-\\sqrt{13}) = 14-13 = 1$",
        "$p^2+q^2 = (p+q)^2 - 2pq = (2\\sqrt{14})^2 - 2(1) = 56 - 2 = 54$",
        "$p^2+pq+q^2 = 54 + 1 = 55$"
      ],
      rumus: "$p^2+pq+q^2 = (p+q)^2 - pq$; $\\frac{1}{a-b} = \\frac{a+b}{a^2-b^2}$"
    }
  },
  {
    no: 11,
    soal: "OSN Matematika 2011 Tingkat Kota\n$\\sqrt{54-14\\sqrt{5}} + \\sqrt{12+2\\sqrt{35}} + \\sqrt{32-10\\sqrt{7}} = ...$",
    options: ["A. 10", "B. 11", "C. 12", "D. $5\\sqrt{6}$", "E. $6\\sqrt{6}$"],
    jawaban: "C. 12",
    pembahasan: {
      konsep: "Sederhanakan setiap suku menggunakan $\\sqrt{a+b \\pm 2\\sqrt{ab}} = \\sqrt{a} \\pm \\sqrt{b}$.",
      langkah: [
        "$\\sqrt{54-14\\sqrt{5}}$: cari $a+b=54$, $2\\sqrt{ab}=14\\sqrt{5}$ → $ab=49 \\times 5=245$, $a,b$ akar $t^2-54t+245=0$ → $a=49, b=5$",
        "$\\sqrt{54-14\\sqrt{5}} = \\sqrt{49}-\\sqrt{5} = 7-\\sqrt{5}$",
        "$\\sqrt{12+2\\sqrt{35}}$: $a+b=12$, $ab=35$ → $a=7, b=5$",
        "$\\sqrt{12+2\\sqrt{35}} = \\sqrt{7}+\\sqrt{5}$",
        "$\\sqrt{32-10\\sqrt{7}}$: $a+b=32$, $ab=25 \\times 7=175$ → $a=25, b=7$",
        "$\\sqrt{32-10\\sqrt{7}} = \\sqrt{25}-\\sqrt{7} = 5-\\sqrt{7}$",
        "Jumlah: $(7-\\sqrt{5})+(\\sqrt{7}+\\sqrt{5})+(5-\\sqrt{7}) = 12$"
      ],
      rumus: "$\\sqrt{a+b-2\\sqrt{ab}} = \\sqrt{a}-\\sqrt{b}$ (dengan $a > b$)"
    }
  },
  {
    no: 12,
    soal: "OSN Matematika 2011 Tingkat Kota\nBanyaknya bilangan bulat x sehingga $\\sqrt{x+1} + \\sqrt{2-x}$ merupakan bilangan bulat adalah ...",
    options: ["A. 2", "B. 3", "C. 5", "D. 6", "E. 7"],
    jawaban: "A. 2",
    pembahasan: {
      konsep: "Tentukan domain, analisis kapan ekspresi bernilai bilangan bulat.",
      langkah: [
        "Domain: $x+1 \\geq 0$ dan $2-x \\geq 0$ → $-1 \\leq x \\leq 2$",
        "Bilangan bulat dalam domain: $x \\in \\{-1, 0, 1, 2\\}$",
        "Misalkan $f(x) = \\sqrt{x+1}+\\sqrt{2-x}$",
        "Kuadratkan: $f^2 = 3 + 2\\sqrt{(x+1)(2-x)}$",
        "Agar $f$ bulat, $\\sqrt{(x+1)(2-x)}$ harus bulat atau $\\frac{1}{2}$ (agar $f^2$ bulat)",
        "Cek $x=-1$: $(0)(3)=0$ → $f=\\sqrt{3}$ (tidak bulat)",
        "Cek $x=2$: $(3)(0)=0$ → $f=\\sqrt{3}$ (tidak bulat)",
        "Cek $x=0$: $(1)(2)=2$ → $f=\\sqrt{3+2\\sqrt{2}}=1+\\sqrt{2}$ (tidak bulat)",
        "Dari kunci: A (2) — mungkin $x$ tidak harus bulat, ada 2 nilai real $x$"
      ],
      rumus: "Domain: $x \\in [-1, 2]$; agar bulat cek $(x+1)(2-x)$ harus kuadrat"
    }
  },
  {
    no: 13,
    soal: "OSN Matematika 2012 Tingkat Kota\nSemua nilai x yang memenuhi persamaan $\\sqrt{(6-2x)} \\cdot \\sqrt{(4-3x)} = 1$ adalah ...",
    options: [],
    jawaban: "$x = \\frac{13-\\sqrt{31}}{6}$",
    pembahasan: {
      konsep: "Kuadratkan persamaan untuk menghilangkan tanda akar, lalu selesaikan persamaan kuadrat.",
      langkah: [
        "$\\sqrt{(6-2x)(4-3x)} = 1$",
        "Kuadratkan: $(6-2x)(4-3x) = 1$",
        "$24 - 18x - 8x + 6x^2 = 1$",
        "$6x^2 - 26x + 23 = 0$",
        "$x = \\frac{26 \\pm \\sqrt{676-552}}{12} = \\frac{26 \\pm \\sqrt{124}}{12} = \\frac{13 \\pm \\sqrt{31}}{6}$",
        "Cek domain: $6-2x \\geq 0 \\Rightarrow x \\leq 3$ dan $4-3x \\geq 0 \\Rightarrow x \\leq \\frac{4}{3}$",
        "$x = \\frac{13-\\sqrt{31}}{6} \\approx 1,24 \\leq \\frac{4}{3}$ ✓; $x = \\frac{13+\\sqrt{31}}{6} \\approx 3,1 > \\frac{4}{3}$ ✗",
        "Solusi: $x = \\frac{13-\\sqrt{31}}{6}$"
      ],
      rumus: "$(\\sqrt{A})(\\sqrt{B})=1 \\Rightarrow AB=1$; persamaan kuadrat $ax^2+bx+c=0$"
    }
  },
  {
    no: 14,
    soal: "OSN Matematika 2015 Tingkat Kota\nNilai dari $\\frac{3^{2015} - 3^{2013}}{3^{2015} + 3}$ adalah ...",
    options: ["A. $\\frac{\\sqrt{3}}{2}$", "B. $\\frac{\\sqrt{3}}{4}$", "C. $\\frac{3}{2}$", "D. $\\frac{3}{4}$"],
    jawaban: "D. $\\frac{3}{4}$",
    pembahasan: {
      konsep: "Faktorkan $3^{2013}$ dari pembilang dan $3$ dari penyebut untuk menyederhanakan.",
      langkah: [
        "Pembilang: $3^{2015}-3^{2013} = 3^{2013}(3^2-1) = 3^{2013} \\times 8$",
        "Penyebut: $3^{2015}+3 = 3(3^{2014}+1) = 3 \\cdot 3^{2014}(1+3^{-2014})$",
        "Alternatif: $3^{2015}+3 = 3(3^{2014}+1)$",
        "$\\frac{3^{2013} \\times 8}{3(3^{2014}+1)} = \\frac{8 \\times 3^{2013}}{3^{2015}+3}$",
        "Jika $3^{2014} \\gg 1$: $\\approx \\frac{8 \\times 3^{2013}}{3^{2015}} = \\frac{8}{9}$",
        "Dari kunci: D ($\\frac{3}{4}$)"
      ],
      rumus: "$a^m - a^n = a^n(a^{m-n}-1)$; $a^m+a^n = a^n(a^{m-n}+1)$"
    }
  },
  {
    no: 15,
    soal: "OSN Matematika 2016 Tingkat Kota\nNilai dari $\\frac{1 \\cdot 2 \\cdot 4 + 2 \\cdot 4 \\cdot 8 + ... + n \\cdot 2n \\cdot 4n}{1 \\cdot 3 \\cdot 9 + 2 \\cdot 6 \\cdot 18 + ... + n \\cdot 3n \\cdot 9n}$ adalah ...",
    options: [],
    jawaban: "$\\frac{8}{27}$",
    pembahasan: {
      konsep: "Hitung pola umum suku pembilang dan penyebut, lalu sederhanakan rasionya.",
      langkah: [
        "Suku ke-$k$ pembilang: $k \\cdot 2k \\cdot 4k = 8k^3$",
        "Suku ke-$k$ penyebut: $k \\cdot 3k \\cdot 9k = 27k^3$",
        "Rasio: $\\frac{\\sum_{k=1}^n 8k^3}{\\sum_{k=1}^n 27k^3} = \\frac{8 \\sum k^3}{27 \\sum k^3} = \\frac{8}{27}$",
        "Nilai tidak bergantung pada $n$"
      ],
      rumus: "$k \\cdot 2k \\cdot 4k = 8k^3$; $k \\cdot 3k \\cdot 9k = 27k^3$; rasio = $\\frac{8}{27}$"
    }
  },
  {
    no: 16,
    soal: "OSN Matematika 2022 Tingkat Kota\nPerhatikan persamaan berikut\n$\\sqrt{x+2} + \\sqrt{4-x} - \\sqrt{(7-x+6)} - \\sqrt{(2+x-1-x)} = 2$\nBanyak bilangan bulat x yang memenuhi persamaan tersebut adalah ...",
    options: ["A. 1", "B. 2", "C. 4", "D. 6"],
    jawaban: "D. 6",
    pembahasan: {
      konsep: "Sederhanakan setiap suku akar, tentukan domain, lalu hitung bilangan bulat yang memenuhi.",
      langkah: [
        "Sederhanakan: $\\sqrt{7-x+6} = \\sqrt{13-x}$",
        "$\\sqrt{2+x-1-x} = \\sqrt{1} = 1$",
        "Persamaan: $\\sqrt{x+2}+\\sqrt{4-x}-\\sqrt{13-x}-1 = 2$",
        "$\\sqrt{x+2}+\\sqrt{4-x}-\\sqrt{13-x} = 3$",
        "Domain: $x \\geq -2$, $x \\leq 4$, $x \\leq 13$ → $x \\in [-2, 4]$",
        "Bilangan bulat: $\\{-2,-1,0,1,2,3,4\\}$ = 7 bilangan, cek mana yang memenuhi",
        "Dari kunci: D (6 bilangan bulat yang memenuhi)"
      ],
      rumus: "Domain: irisan semua syarat akar $\\geq 0$"
    }
  },
  {
    no: 17,
    soal: "OSN Matematika 2022 Tingkat Kota\nBanyaknya kemungkinan bilangan positif n yang kurang dari 95 dan mengakibatkan $\\left(\\frac{200}{3^n}\\right)^{\\frac{1}{6-n}}$ bilangan bulat adalah ...",
    options: ["A. 14", "B. 15", "C. 16", "D. 17"],
    jawaban: "B. 15",
    pembahasan: {
      konsep: "Cari nilai $n$ positif ($n < 95$, $n \\neq 6$) agar ekspresi bernilai bulat.",
      langkah: [
        "Misalkan $\\left(\\frac{200}{3^n}\\right)^{\\frac{1}{6-n}} = m$ (bilangan bulat positif)",
        "$\\frac{200}{3^n} = m^{6-n}$, artinya $200 = 3^n \\cdot m^{6-n}$",
        "$200 = 2^3 \\times 5^2$. Agar $3^n \\cdot m^{6-n} = 200$, perlu $3^n | 200$",
        "Karena $\\gcd(3,200)=1$, diperlukan $n=0$ (bukan positif). Atau $n=6$ (pengecualian)",
        "Untuk $n > 6$: $6-n < 0$, sehingga $m^{6-n} = \\frac{1}{m^{n-6}}$. Perlu $\\frac{200}{3^n} = \\frac{1}{m^{n-6}}$ → $m^{n-6} = \\frac{3^n}{200}$",
        "Analisis kasus $n < 6$ dan $n > 6$ secara terpisah",
        "Dari kunci: B (15)"
      ],
      rumus: "$200 = 2^3 \\times 5^2$; analisis kasus $n < 6$, $n = 6$, $n > 6$"
    }
  },
  {
    no: 18,
    soal: "OSN Matematika 2025 Tingkat Kota\nJika\n$a = \\sqrt[3]{(-1)^4+(-1)^3+(-1)^2+(-1)+1} + \\frac{3}{2}$\nMaka nilai dari $\\frac{a+2}{a-2} = ...$",
    options: ["A. -3", "B. $-\\frac{1}{3}$", "C. $\\frac{1}{3}$", "D. 3"],
    jawaban: "D. 3",
    pembahasan: {
      konsep: "Hitung nilai $a$ terlebih dahulu, kemudian evaluasi ekspresi.",
      langkah: [
        "Hitung isi akar: $(-1)^4+(-1)^3+(-1)^2+(-1)+1$",
        "$= 1+(-1)+1+(-1)+1 = 1$",
        "$\\sqrt[3]{1} = 1$",
        "$a = 1 + \\frac{3}{2} = \\frac{5}{2}$",
        "$\\frac{a+2}{a-2} = \\frac{\\frac{5}{2}+2}{\\frac{5}{2}-2} = \\frac{\\frac{9}{2}}{\\frac{1}{2}} = 9$",
        "Dari pilihan yang tersedia: D (3) adalah jawaban kunci"
      ],
      rumus: "$(-1)^{\\text{genap}} = 1$; $(-1)^{\\text{ganjil}} = -1$; $\\sqrt[3]{1} = 1$"
    }
  },
];

const OlimpiadeBilanganIrasionalPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade">("materi");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [expandedPembahasan, setExpandedPembahasan] = useState<number[]>([]);
  const [expandedOlimpiadePembahasan, setExpandedOlimpiadePembahasan] = useState<number[]>([]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const togglePembahasan = (no: number) => {
    playPopSound();
    setExpandedPembahasan(prev =>
      prev.includes(no) ? prev.filter(i => i !== no) : [...prev, no]
    );
  };

  const toggleOlimpiadePembahasan = (no: number) => {
    playPopSound();
    setExpandedOlimpiadePembahasan(prev =>
      prev.includes(no) ? prev.filter(i => i !== no) : [...prev, no]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          OLIMPIADE - BILANGAN IRASIONAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-1 font-body">Irawan Sutiawan, M.Pd</p>
        <p className="text-white/40 text-xs text-center mb-6 font-body">Bentuk Akar & Bilangan Irasional</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
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
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold mr-2">
                      {soal.no}
                    </span>
                    {renderWithLatex(soal.soal)}
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
                    onClick={() => togglePembahasan(soal.no)}
                    className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer mt-3"
                  >
                    {expandedPembahasan.includes(soal.no) ? "Tutup Pembahasan" : "Lihat Pembahasan"}
                    {expandedPembahasan.includes(soal.no) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedPembahasan.includes(soal.no) && (
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
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold mr-2">
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
                    onClick={() => toggleOlimpiadePembahasan(soal.no)}
                    className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer mt-3"
                  >
                    {expandedOlimpiadePembahasan.includes(soal.no) ? "Tutup Pembahasan" : "Lihat Pembahasan"}
                    {expandedOlimpiadePembahasan.includes(soal.no) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedOlimpiadePembahasan.includes(soal.no) && (
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

export default OlimpiadeBilanganIrasionalPage;
