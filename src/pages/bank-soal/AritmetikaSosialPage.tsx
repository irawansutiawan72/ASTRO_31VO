import { useState, useMemo } from "react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Coins, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const MathText = ({ text, className = "" }: { text: string; className?: string }) => {
  const elements = useMemo(() => {
    const result: React.ReactNode[] = [];
    let key = 0;
    const blockParts = text.split(/(\$\$[^$]+\$\$)/g);
    blockParts.forEach((part) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        const math = part.slice(2, -2).trim();
        result.push(<span key={key++} className="mx-1"><InlineMath math={math} /></span>);
      } else if (part) {
        const inlineParts = part.split(/(\$[^$]+\$)/g);
        inlineParts.forEach((inlinePart) => {
          if (inlinePart.startsWith("$") && inlinePart.endsWith("$")) {
            const math = inlinePart.slice(1, -1).trim();
            result.push(<span key={key++} className="mx-0.5"><InlineMath math={math} /></span>);
          } else if (inlinePart) {
            result.push(<span key={key++}>{inlinePart}</span>);
          }
        });
      }
    });
    return result;
  }, [text]);
  return <span className={className}>{elements}</span>;
};

type Difficulty = "Mudah" | "Sedang" | "Sulit";
type QuestionType = "PG" | "PG Kompleks" | "Benar/Salah";

interface Question {
  id: number;
  type: QuestionType;
  difficulty: Difficulty;
  tag?: string;
  question: string;
  options?: string[];
  statements?: { text: string; isCorrect: boolean }[];
  correctAnswer?: string | string[];
}

const soalAritmetikaSosial: Question[] = [
  // ─── MUDAH 1–35 ─────────────────────────────────────────────────────────────
  {
    id: 1, type: "PG", difficulty: "Mudah",
    question: "Seorang pedagang membeli baju seharga Rp80.000 dan menjualnya seharga Rp100.000. Keuntungan yang diperoleh pedagang tersebut adalah ...",
    options: ["A. Rp10.000", "B. Rp15.000", "C. Rp20.000", "D. Rp25.000"],
    correctAnswer: "C. Rp20.000",
  },
  {
    id: 2, type: "PG", difficulty: "Mudah",
    question: "Ibu membeli sepatu seharga Rp150.000 kemudian dijual kembali seharga Rp120.000. Ibu mengalami ...",
    options: ["A. Untung Rp30.000", "B. Rugi Rp30.000", "C. Untung Rp20.000", "D. Impas"],
    correctAnswer: "B. Rugi Rp30.000",
  },
  {
    id: 3, type: "PG", difficulty: "Mudah",
    question: "Harga beli sebuah meja adalah Rp200.000. Jika pedagang mendapat untung Rp50.000, maka harga jual meja tersebut adalah ...",
    options: ["A. Rp150.000", "B. Rp220.000", "C. Rp240.000", "D. Rp250.000"],
    correctAnswer: "D. Rp250.000",
  },
  {
    id: 4, type: "PG", difficulty: "Mudah",
    question: "Sebuah barang dibeli seharga Rp500.000 dan dijual dengan rugi Rp75.000. Harga jual barang tersebut adalah ...",
    options: ["A. Rp400.000", "B. Rp425.000", "C. Rp450.000", "D. Rp575.000"],
    correctAnswer: "B. Rp425.000",
  },
  {
    id: 5, type: "PG", difficulty: "Mudah",
    question: "Harga jual sebuah sepeda adalah Rp450.000 dan harga belinya Rp400.000. Persentase untung pedagang adalah ...",
    options: ["A. 10%", "B. 12,5%", "C. 15%", "D. 20%"],
    correctAnswer: "B. 12,5%",
  },
  {
    id: 6, type: "PG", difficulty: "Mudah",
    question: "Sebuah toko memberikan diskon 20% untuk baju seharga Rp200.000. Harga setelah diskon adalah ...",
    options: ["A. Rp140.000", "B. Rp150.000", "C. Rp160.000", "D. Rp180.000"],
    correctAnswer: "C. Rp160.000",
  },
  {
    id: 7, type: "PG", difficulty: "Mudah",
    question: "Harga sebuah tas sebelum diskon adalah Rp300.000. Jika diskon yang diberikan Rp45.000, maka persentase diskon adalah ...",
    options: ["A. 10%", "B. 15%", "C. 20%", "D. 25%"],
    correctAnswer: "B. 15%",
  },
  {
    id: 8, type: "PG", difficulty: "Mudah",
    question: "Bruto sebuah kaleng berisi kerupuk adalah 2,5 kg. Jika tara 0,5 kg, maka neto kaleng tersebut adalah ...",
    options: ["A. 1,5 kg", "B. 2 kg", "C. 2,5 kg", "D. 3 kg"],
    correctAnswer: "B. 2 kg",
  },
  {
    id: 9, type: "PG", difficulty: "Mudah",
    question: "Neto sebuah produk makanan adalah 800 gram dan tara 200 gram. Bruto produk tersebut adalah ...",
    options: ["A. 600 gram", "B. 800 gram", "C. 900 gram", "D. 1.000 gram"],
    correctAnswer: "D. 1.000 gram",
  },
  {
    id: 10, type: "PG", difficulty: "Mudah",
    question: "Andi menabung Rp500.000 di bank dengan bunga tunggal 6% per tahun. Bunga yang diperoleh setelah 1 tahun adalah ...",
    options: ["A. Rp25.000", "B. Rp30.000", "C. Rp35.000", "D. Rp40.000"],
    correctAnswer: "B. Rp30.000",
  },
  {
    id: 11, type: "PG", difficulty: "Mudah",
    question: "Siti menabung Rp1.000.000 dengan bunga tunggal 12% per tahun. Besar bunga setelah 6 bulan adalah ...",
    options: ["A. Rp40.000", "B. Rp50.000", "C. Rp60.000", "D. Rp120.000"],
    correctAnswer: "C. Rp60.000",
  },
  {
    id: 12, type: "PG", difficulty: "Mudah",
    question: "Harga sebuah televisi Rp2.000.000 dikenai PPN 10%. Harga televisi setelah pajak adalah ...",
    options: ["A. Rp2.100.000", "B. Rp2.150.000", "C. Rp2.200.000", "D. Rp2.250.000"],
    correctAnswer: "C. Rp2.200.000",
  },
  {
    id: 13, type: "PG", difficulty: "Mudah",
    question: "Jika harga beli = harga jual, maka pedagang mengalami ...",
    options: ["A. Untung", "B. Rugi", "C. Impas", "D. Diskon"],
    correctAnswer: "C. Impas",
  },
  {
    id: 14, type: "PG", difficulty: "Mudah",
    question: "Pak Budi membeli motor dengan harga Rp10.000.000. Setelah dipakai setahun, dijual seharga Rp8.000.000. Kerugian Pak Budi adalah ...",
    options: ["A. Rp1.500.000", "B. Rp2.000.000", "C. Rp2.500.000", "D. Rp3.000.000"],
    correctAnswer: "B. Rp2.000.000",
  },
  {
    id: 15, type: "PG", difficulty: "Mudah",
    question: "Sebuah sepatu harga asli Rp400.000 mendapat diskon 25%. Besar diskon tersebut adalah ...",
    options: ["A. Rp80.000", "B. Rp90.000", "C. Rp100.000", "D. Rp120.000"],
    correctAnswer: "C. Rp100.000",
  },
  {
    id: 16, type: "PG", difficulty: "Mudah",
    question: "Seorang pedagang rugi 10% dari harga beli Rp600.000. Harga jualnya adalah ...",
    options: ["A. Rp520.000", "B. Rp530.000", "C. Rp540.000", "D. Rp550.000"],
    correctAnswer: "C. Rp540.000",
  },
  {
    id: 17, type: "PG", difficulty: "Mudah",
    question: "Besar bunga tunggal tahunan 8% dari modal Rp750.000 selama 1 tahun adalah ...",
    options: ["A. Rp50.000", "B. Rp55.000", "C. Rp60.000", "D. Rp65.000"],
    correctAnswer: "C. Rp60.000",
  },
  {
    id: 18, type: "PG", difficulty: "Mudah",
    question: "Persentase rugi dihitung berdasarkan ...",
    options: ["A. Harga jual", "B. Harga beli", "C. Keuntungan", "D. Diskon"],
    correctAnswer: "B. Harga beli",
  },
  {
    id: 19, type: "PG", difficulty: "Mudah",
    question: "Pedagang membeli 10 kg beras dengan harga Rp12.000/kg lalu dijual Rp13.500/kg. Untung totalnya adalah ...",
    options: ["A. Rp12.000", "B. Rp13.000", "C. Rp14.000", "D. Rp15.000"],
    correctAnswer: "D. Rp15.000",
  },
  {
    id: 20, type: "PG", difficulty: "Mudah",
    question: "Neto suatu barang 5 kg dengan tara 4%. Bruto barang tersebut adalah ...",
    options: ["A. 5,2 kg", "B. 5,208 kg", "C. 5,21 kg", "D. 5,25 kg"],
    correctAnswer: "A. 5,2 kg",
  },
  {
    id: 21, type: "PG", difficulty: "Mudah",
    question: "Seseorang meminjam uang Rp2.000.000 dengan bunga tunggal 2% per bulan selama 3 bulan. Total bunga yang harus dibayar adalah ...",
    options: ["A. Rp80.000", "B. Rp100.000", "C. Rp120.000", "D. Rp140.000"],
    correctAnswer: "C. Rp120.000",
  },
  {
    id: 22, type: "PG", difficulty: "Mudah",
    question: "Harga beli selusin pena Rp36.000. Jika dijual satuan Rp3.500, pedagang mengalami ...",
    options: ["A. Untung Rp6.000", "B. Rugi Rp6.000", "C. Untung Rp3.000", "D. Impas"],
    correctAnswer: "A. Untung Rp6.000",
  },
  {
    id: 23, type: "PG", difficulty: "Mudah",
    question: "Mana yang termasuk pengertian diskon yang benar?",
    options: ["A. Pajak yang dikenakan pemerintah", "B. Potongan harga yang diberikan penjual", "C. Bunga yang diterima nasabah", "D. Biaya pengiriman barang"],
    correctAnswer: "B. Potongan harga yang diberikan penjual",
  },
  {
    id: 24, type: "PG", difficulty: "Mudah",
    question: "Harga setelah diskon 30% adalah Rp350.000. Harga sebelum diskon adalah ...",
    options: ["A. Rp455.000", "B. Rp490.000", "C. Rp500.000", "D. Rp525.000"],
    correctAnswer: "C. Rp500.000",
  },
  {
    id: 25, type: "PG", difficulty: "Mudah",
    question: "Pak Ahmad menabung Rp3.000.000 dengan bunga 10% per tahun. Jumlah uang setelah 1 tahun adalah ...",
    options: ["A. Rp3.100.000", "B. Rp3.200.000", "C. Rp3.300.000", "D. Rp3.400.000"],
    correctAnswer: "C. Rp3.300.000",
  },
  {
    id: 26, type: "PG", difficulty: "Mudah",
    question: "Sebuah jaket memiliki harga Rp600.000 dan mendapat diskon 15%. Harga bayar adalah ...",
    options: ["A. Rp490.000", "B. Rp500.000", "C. Rp510.000", "D. Rp520.000"],
    correctAnswer: "C. Rp510.000",
  },
  {
    id: 27, type: "PG", difficulty: "Mudah",
    question: "Suatu produk memiliki bruto 10 kg dan neto 9,5 kg. Persentase tara produk tersebut adalah ...",
    options: ["A. 4%", "B. 5%", "C. 6%", "D. 7%"],
    correctAnswer: "B. 5%",
  },
  {
    id: 28, type: "PG", difficulty: "Mudah",
    question: "Seorang pedagang menjual barang dengan harga Rp180.000 dan untung 20%. Harga belinya adalah ...",
    options: ["A. Rp140.000", "B. Rp145.000", "C. Rp150.000", "D. Rp160.000"],
    correctAnswer: "C. Rp150.000",
  },
  {
    id: 29, type: "PG", difficulty: "Mudah",
    question: "Pada struk belanja tertulis harga Rp250.000 sebelum PPN 11%. Harga yang harus dibayar adalah ...",
    options: ["A. Rp272.500", "B. Rp275.000", "C. Rp277.500", "D. Rp280.000"],
    correctAnswer: "C. Rp277.500",
  },
  {
    id: 30, type: "PG", difficulty: "Mudah",
    question: "Persentase untung = $$\\frac{\\text{Untung}}{\\text{Harga Beli}} \\times 100\\%$$. Jika untung Rp30.000 dan harga beli Rp200.000, persentase untungnya adalah ...",
    options: ["A. 10%", "B. 12%", "C. 15%", "D. 20%"],
    correctAnswer: "C. 15%",
  },
  {
    id: 31, type: "PG", difficulty: "Mudah",
    question: "Ibu membeli gula 5 kg seharga Rp65.000 lalu dijual Rp14.000/kg. Untung atau rugi? Besarnya ...",
    options: ["A. Untung Rp5.000", "B. Rugi Rp5.000", "C. Untung Rp4.000", "D. Impas"],
    correctAnswer: "A. Untung Rp5.000",
  },
  {
    id: 32, type: "PG", difficulty: "Mudah",
    question: "Bunga tabungan Rp900.000 selama 8 bulan dengan bunga 9% per tahun adalah ...",
    options: ["A. Rp50.000", "B. Rp54.000", "C. Rp56.000", "D. Rp60.000"],
    correctAnswer: "B. Rp54.000",
  },
  {
    id: 33, type: "PG", difficulty: "Mudah",
    question: "Harga barang Rp500.000 terkena diskon 10% kemudian terkena PPN 10%. Harga akhir yang dibayar adalah ...",
    options: ["A. Rp490.000", "B. Rp495.000", "C. Rp495.000", "D. Rp500.000"],
    correctAnswer: "B. Rp495.000",
  },
  {
    id: 34, type: "PG", difficulty: "Mudah",
    question: "Pedagang membeli 50 buah mangga Rp3.000/buah, lalu 20 buah busuk dibuang, sisanya dijual Rp5.000/buah. Pedagang ...",
    options: ["A. Untung Rp30.000", "B. Untung Rp10.000", "C. Rugi Rp10.000", "D. Impas"],
    correctAnswer: "A. Untung Rp30.000",
  },
  {
    id: 35, type: "PG", difficulty: "Mudah",
    question: "Tara suatu barang adalah ...",
    options: ["A. Berat bersih isi barang", "B. Berat kotor termasuk kemasan", "C. Berat kemasan saja", "D. Berat barang setelah dikurangi diskon"],
    correctAnswer: "C. Berat kemasan saja",
  },

  // ─── SEDANG 36–75 ────────────────────────────────────────────────────────────
  {
    id: 36, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Seorang pedagang membeli 100 kg beras dengan harga Rp9.000/kg. Beras dijual Rp10.500/kg, tetapi 10 kg tidak terjual. Untung atau rugi pedagang tersebut?",
    options: ["A. Untung Rp35.000", "B. Untung Rp42.000", "C. Rugi Rp35.000", "D. Impas"],
    correctAnswer: "A. Untung Rp35.000",
  },
  {
    id: 37, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Seorang pedagang menjual sepeda dengan harga Rp1.200.000 dan mendapat keuntungan 20% dari harga beli. Harga beli sepeda tersebut adalah ...",
    options: ["A. Rp900.000", "B. Rp960.000", "C. Rp1.000.000", "D. Rp1.080.000"],
    correctAnswer: "C. Rp1.000.000",
  },
  {
    id: 38, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Sebuah toko memberikan diskon 25% untuk semua produk. Jika harga setelah diskon Rp270.000, harga asli produk adalah ...",
    options: ["A. Rp340.000", "B. Rp350.000", "C. Rp360.000", "D. Rp380.000"],
    correctAnswer: "C. Rp360.000",
  },
  {
    id: 39, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Modal awal Rp5.000.000 dengan bunga tunggal 18% per tahun. Lama menabung agar uang menjadi Rp5.900.000 adalah ...",
    options: ["A. 10 bulan", "B. 12 bulan", "C. 15 bulan", "D. 18 bulan"],
    correctAnswer: "A. 10 bulan",
  },
  {
    id: 40, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Bu Rina membeli 3 lusin piring dengan harga Rp720.000. Kemudian 8 piring pecah dan sisanya dijual Rp25.000/piring. Persentase untung atau rugi Bu Rina adalah ...",
    options: ["A. Untung 11,1%", "B. Rugi 11,1%", "C. Untung 16,7%", "D. Rugi 16,7%"],
    correctAnswer: "A. Untung 11,1%",
  },
  {
    id: 41, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Harga baju sebelum diskon Rp240.000. Setelah diskon 20% dikenakan PPN 10%. Harga akhir yang dibayar adalah ...",
    options: ["A. Rp201.000", "B. Rp205.000", "C. Rp211.200", "D. Rp215.000"],
    correctAnswer: "C. Rp211.200",
  },
  {
    id: 42, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Persentase tara suatu barang 4%. Jika bruto 25 kg, maka neto barang tersebut adalah ...",
    options: ["A. 23 kg", "B. 24 kg", "C. 24,5 kg", "D. 25 kg"],
    correctAnswer: "B. 24 kg",
  },
  {
    id: 43, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Sebuah smartphone dibeli seharga Rp3.600.000 dan dijual kembali setelah 1 tahun dengan harga Rp2.880.000. Persentase ruginya adalah ...",
    options: ["A. 15%", "B. 18%", "C. 20%", "D. 25%"],
    correctAnswer: "C. 20%",
  },
  {
    id: 44, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Pak Hasan meminjam uang Rp4.000.000 dengan bunga tunggal 15% per tahun. Angsuran per bulan jika dilunasi dalam 10 bulan adalah ...",
    options: ["A. Rp450.000", "B. Rp460.000", "C. Rp450.000", "D. Rp500.000"],
    correctAnswer: "A. Rp450.000",
  },
  {
    id: 45, type: "PG", difficulty: "Sedang", tag: "Literasi Matematika",
    question: "Sebuah supermarket mengiklankan: 'Beli 2 gratis 1' untuk produk seharga Rp15.000. Jika Andi membeli 6 produk, total yang dibayar adalah ...",
    options: ["A. Rp60.000", "B. Rp75.000", "C. Rp80.000", "D. Rp90.000"],
    correctAnswer: "A. Rp60.000",
  },
  {
    id: 46, type: "PG", difficulty: "Sedang", tag: "TKA",
    question: "Seseorang mendapatkan gaji Rp4.500.000/bulan. Dikenai PPh 5% dari gaji. Gaji bersih yang diterima adalah ...",
    options: ["A. Rp4.200.000", "B. Rp4.250.000", "C. Rp4.275.000", "D. Rp4.300.000"],
    correctAnswer: "C. Rp4.275.000",
  },
  {
    id: 47, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Pedagang buah membeli 60 buah jeruk Rp2.500/buah, 15 buah busuk dibuang. Agar untung 20% dari modal, tiap jeruk harus dijual seharga ...",
    options: ["A. Rp3.500", "B. Rp3.600", "C. Rp3.800", "D. Rp4.000"],
    correctAnswer: "D. Rp4.000",
  },
  {
    id: 48, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Modal Rp6.000.000, bunga tunggal 2% per bulan. Setelah 9 bulan, total uang tabungan menjadi ...",
    options: ["A. Rp7.000.000", "B. Rp7.080.000", "C. Rp7.100.000", "D. Rp7.200.000"],
    correctAnswer: "B. Rp7.080.000",
  },
  {
    id: 49, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Dua pedagang menjual barang yang sama. Pedagang A memberi diskon 30%, pedagang B memberi diskon 20% lalu diskon lagi 10%. Manakah yang lebih murah?",
    options: ["A. Pedagang A lebih murah", "B. Pedagang B lebih murah", "C. Sama harganya", "D. Tergantung harga asal"],
    correctAnswer: "A. Pedagang A lebih murah",
  },
  {
    id: 50, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Sebuah toko elektronik menawarkan cicilan: harga tunai Rp2.400.000 atau cicilan 12 × Rp225.000. Berapa persen lebih mahal jika memilih cicilan?",
    options: ["A. 10%", "B. 11%", "C. 12,5%", "D. 15%"],
    correctAnswer: "C. 12,5%",
  },
  {
    id: 51, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Harga sebuah mesin cuci Rp3.500.000 dikenai diskon 10% dan PPN 11%. Harga yang dibayarkan adalah ...",
    options: ["A. Rp3.490.650", "B. Rp3.499.500", "C. Rp3.504.500", "D. Rp3.500.000"],
    correctAnswer: "B. Rp3.499.500",
  },
  {
    id: 52, type: "PG", difficulty: "Sedang", tag: "Literasi Matematika",
    question: "Warung A menjual 1 liter susu Rp12.000. Warung B menjual 250 ml susu Rp3.500. Mana yang lebih hemat jika membeli 1 liter?",
    options: ["A. Warung A lebih hemat Rp2.000", "B. Warung B lebih hemat Rp2.000", "C. Sama harganya", "D. Warung A lebih hemat Rp1.000"],
    correctAnswer: "A. Warung A lebih hemat Rp2.000",
  },
  {
    id: 53, type: "PG", difficulty: "Sedang", tag: "TKA",
    question: "Hasil penjualan 40 kg kopi Rp2.400.000 dengan keuntungan 20%. Harga beli per kilogram kopi adalah ...",
    options: ["A. Rp45.000", "B. Rp48.000", "C. Rp50.000", "D. Rp55.000"],
    correctAnswer: "C. Rp50.000",
  },
  {
    id: 54, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Uang tabungan menjadi Rp1.320.000 setelah 1 tahun dengan bunga tunggal 10% per tahun. Besar modal awal tabungan adalah ...",
    options: ["A. Rp1.100.000", "B. Rp1.150.000", "C. Rp1.200.000", "D. Rp1.250.000"],
    correctAnswer: "C. Rp1.200.000",
  },
  {
    id: 55, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Sebuah rumah dibeli Rp450.000.000 dan dijual Rp540.000.000. Untung penjual dalam persentase adalah ...",
    options: ["A. 15%", "B. 16%", "C. 18%", "D. 20%"],
    correctAnswer: "D. 20%",
  },
  {
    id: 56, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Pak Tono meminjam Rp8.000.000 dengan bunga tunggal 18% per tahun selama 2 tahun. Total yang harus dibayar adalah ...",
    options: ["A. Rp9.880.000", "B. Rp10.000.000", "C. Rp10.640.000", "D. Rp11.000.000"],
    correctAnswer: "C. Rp10.640.000",
  },
  {
    id: 57, type: "PG", difficulty: "Sedang", tag: "Literasi Matematika",
    question: "Label pada kaleng tertulis: Bruto 500g, Tara 5%. Seorang ibu membeli 4 kaleng. Neto total yang diperoleh adalah ...",
    options: ["A. 1.800 gram", "B. 1.900 gram", "C. 2.000 gram", "D. 2.100 gram"],
    correctAnswer: "B. 1.900 gram",
  },
  {
    id: 58, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Harga jual Rp1.980.000 setelah rugi 10% dari harga beli. Harga beli barang tersebut adalah ...",
    options: ["A. Rp2.100.000", "B. Rp2.150.000", "C. Rp2.200.000", "D. Rp2.300.000"],
    correctAnswer: "C. Rp2.200.000",
  },
  {
    id: 59, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Seorang agen membeli 200 novel seharga Rp60.000/buku. Diskon 25% dari distributor. Jika dijual Rp55.000/buku, persentase untung agen adalah ...",
    options: ["A. 10%", "B. 12%", "C. 15%", "D. 22,2%"],
    correctAnswer: "D. 22,2%",
  },
  {
    id: 60, type: "PG", difficulty: "Sedang", tag: "TKA",
    question: "Bruto 3 karung beras masing-masing 50 kg dengan tara 2%. Total neto beras tersebut adalah ...",
    options: ["A. 144 kg", "B. 147 kg", "C. 148 kg", "D. 150 kg"],
    correctAnswer: "B. 147 kg",
  },
  {
    id: 61, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Seorang nasabah menabung Rp2.500.000 dan setelah 15 bulan total tabungan Rp3.062.500. Bunga tunggal per tahun yang diberikan bank adalah ...",
    options: ["A. 15%", "B. 16%", "C. 18%", "D. 20%"],
    correctAnswer: "C. 18%",
  },
  {
    id: 62, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Toko A diskon 40% dan toko B diskon 20% lalu diskon lagi 20%. Harga asal sama Rp500.000. Selisih harga akhir kedua toko adalah ...",
    options: ["A. Rp0", "B. Rp5.000", "C. Rp10.000", "D. Rp20.000"],
    correctAnswer: "D. Rp20.000",
  },
  {
    id: 63, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Pedagang membeli barang seharga Rp750.000 lalu menawarkan dengan harga Rp900.000. Pembeli menawar dan disepakati harga Rp825.000. Persentase untung pedagang adalah ...",
    options: ["A. 8%", "B. 9%", "C. 10%", "D. 12%"],
    correctAnswer: "C. 10%",
  },
  {
    id: 64, type: "PG", difficulty: "Sedang", tag: "Literasi Matematika",
    question: "Tagihan listrik Rp450.000 dikenai pajak penerangan jalan 3% dan PPN 11%. Total tagihan yang harus dibayar adalah ...",
    options: ["A. Rp510.300", "B. Rp513.000", "C. Rp515.700", "D. Rp520.000"],
    correctAnswer: "A. Rp510.300",
  },
  {
    id: 65, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Seorang petani memiliki 2 ton gabah. Setelah diproses menjadi beras, beratnya menjadi 1,4 ton. Jika harga beras Rp10.000/kg dan ongkos giling Rp500.000, keuntungan petani jika modal awal Rp8.000.000 adalah ...",
    options: ["A. Rp4.500.000", "B. Rp5.000.000", "C. Rp5.500.000", "D. Rp6.000.000"],
    correctAnswer: "C. Rp5.500.000",
  },
  {
    id: 66, type: "PG", difficulty: "Sedang", tag: "TKA",
    question: "Lama menabung agar modal Rp4.000.000 dengan bunga 12% per tahun menjadi Rp4.600.000 adalah ...",
    options: ["A. 12 bulan", "B. 15 bulan", "C. 18 bulan", "D. 20 bulan"],
    correctAnswer: "B. 15 bulan",
  },
  {
    id: 67, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Harga tas branded asli Rp1.500.000 dan KW-nya Rp450.000 (rugi 10% dari harga beli). Harga beli tas KW adalah ...",
    options: ["A. Rp480.000", "B. Rp490.000", "C. Rp500.000", "D. Rp510.000"],
    correctAnswer: "C. Rp500.000",
  },
  {
    id: 68, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Sebuah toko memberikan diskon bertingkat: 20% lalu 15% untuk produk Rp800.000. Harga yang dibayar adalah ...",
    options: ["A. Rp528.000", "B. Rp536.000", "C. Rp540.000", "D. Rp544.000"],
    correctAnswer: "D. Rp544.000",
  },
  {
    id: 69, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Pak Dedi meminjam Rp6.000.000 dengan bunga 1,5% per bulan. Jika diangsur 12 bulan, besar angsuran per bulan adalah ...",
    options: ["A. Rp580.000", "B. Rp590.000", "C. Rp595.000", "D. Rp600.000"],
    correctAnswer: "C. Rp595.000",
  },
  {
    id: 70, type: "PG", difficulty: "Sedang", tag: "Literasi Matematika",
    question: "Sebuah iklan menyatakan 'Hemat 35%!' untuk produk seharga Rp260.000. Berapa harga asli produk tersebut sebelum diskon?",
    options: ["A. Rp380.000", "B. Rp390.000", "C. Rp400.000", "D. Rp420.000"],
    correctAnswer: "C. Rp400.000",
  },
  {
    id: 71, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Seorang pengepul membeli 50 kg plastik bekas Rp3.000/kg dan 30 kg kertas bekas Rp2.000/kg. Semua dijual Rp4.500/kg. Untung atau rugi?",
    options: ["A. Untung Rp15.000", "B. Untung Rp25.000", "C. Rugi Rp15.000", "D. Impas"],
    correctAnswer: "B. Untung Rp25.000",
  },
  {
    id: 72, type: "PG", difficulty: "Sedang", tag: "TKA",
    question: "Nilai akhir tabungan Rp1.650.000 setelah 2,5 tahun dengan bunga tunggal 12% per tahun. Besar modal awal adalah ...",
    options: ["A. Rp1.250.000", "B. Rp1.300.000", "C. Rp1.350.000", "D. Rp1.400.000"],
    correctAnswer: "A. Rp1.250.000",
  },
  {
    id: 73, type: "PG", difficulty: "Sedang", tag: "UN",
    question: "Seorang pedagang memiliki modal Rp12.000.000 dan menginvestasikan selama 8 bulan dengan bunga 15% per tahun. Total bunga yang diperoleh adalah ...",
    options: ["A. Rp1.100.000", "B. Rp1.150.000", "C. Rp1.200.000", "D. Rp1.300.000"],
    correctAnswer: "C. Rp1.200.000",
  },
  {
    id: 74, type: "PG", difficulty: "Sedang", tag: "Kontekstual",
    question: "Harga kulkas Rp4.500.000 (termasuk PPN 11%). Harga kulkas sebelum PPN adalah ...",
    options: ["A. Rp4.000.000", "B. Rp4.050.000", "C. Rp4.054.054", "D. Rp4.100.000"],
    correctAnswer: "C. Rp4.054.054",
  },
  {
    id: 75, type: "PG", difficulty: "Sedang", tag: "ANBK",
    question: "Penjual mengambil untung 40% dari harga beli. Pembeli mendapat diskon 10% dari harga jual. Persentase keuntungan penjual setelah diskon adalah ...",
    options: ["A. 20%", "B. 22%", "C. 24%", "D. 26%"],
    correctAnswer: "D. 26%",
  },

  // ─── SULIT / HOTS 76–100 ────────────────────────────────────────────────────
  {
    id: 76, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Pedagang A menjual barang untung 25%, pedagang B menjual barang sama dengan rugi 20%. Jika harga jual keduanya sama Rp1.500.000, selisih harga beli keduanya adalah ...",
    options: ["A. Rp75.000", "B. Rp150.000", "C. Rp175.000", "D. Rp200.000"],
    correctAnswer: "B. Rp150.000",
  },
  {
    id: 77, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Modal Rp10.000.000 diinvestasikan: 40% dengan bunga 12%/tahun dan sisanya 60% dengan bunga 9%/tahun. Total bunga setelah 2 tahun adalah ...",
    options: ["A. Rp1.960.000", "B. Rp2.000.000", "C. Rp2.040.000", "D. Rp2.160.000"],
    correctAnswer: "C. Rp2.040.000",
  },
  {
    id: 78, type: "PG", difficulty: "Sulit", tag: "TKA",
    question: "Toko X menetapkan harga jual dengan keuntungan 35% dari harga beli. Setelah dua minggu, barang belum terjual dan diberikan diskon 20%. Persentase keuntungan atau kerugian dari harga beli adalah ...",
    options: ["A. Untung 8%", "B. Untung 10%", "C. Untung 12%", "D. Rugi 8%"],
    correctAnswer: "A. Untung 8%",
  },
  {
    id: 79, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Seseorang menabung selama $n$ bulan dengan modal $M$ dan bunga $p$%/bulan. Agar tabungan menjadi $1{,}5M$, dengan $p = 2\\%$, nilai $n$ adalah ...",
    options: ["A. 20 bulan", "B. 25 bulan", "C. 30 bulan", "D. 35 bulan"],
    correctAnswer: "B. 25 bulan",
  },
  {
    id: 80, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Pak Joko membeli 3 jenis barang: A (harga Rp200.000 untung 20%), B (harga Rp150.000 rugi 10%), C (harga Rp250.000 untung 8%). Total persentase untung/rugi secara keseluruhan adalah ...",
    options: ["A. Untung 8,17%", "B. Untung 9,17%", "C. Untung 10%", "D. Rugi 8,17%"],
    correctAnswer: "A. Untung 8,17%",
  },
  {
    id: 81, type: "PG", difficulty: "Sulit", tag: "Literasi Matematika",
    question: "Sebuah platform belanja online menawarkan: cashback 15% max Rp50.000 + voucher ongkir Rp20.000. Jika belanja Rp500.000 dengan ongkir Rp25.000, total yang benar-benar dikeluarkan adalah ...",
    options: ["A. Rp430.000", "B. Rp450.000", "C. Rp455.000", "D. Rp460.000"],
    correctAnswer: "C. Rp455.000",
  },
  {
    id: 82, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Dua pedagang berbagi modal: A menyumbang Rp3.000.000 (untung 20%) dan B menyumbang Rp5.000.000 (untung 15%). Keuntungan dibagi proporsional. Berapa keuntungan bagian A?",
    options: ["A. Rp225.000", "B. Rp270.000", "C. Rp300.000", "D. Rp360.000"],
    correctAnswer: "B. Rp270.000",
  },
  {
    id: 83, type: "PG", difficulty: "Sulit", tag: "TKA",
    question: "Suatu toko menjual pakaian dengan harga normal Rp480.000. Toko memberikan diskon 25% lalu diskon lagi 10%, dan masih terkena PPN 11%. Harga akhir yang dibayar adalah ...",
    options: ["A. Rp358.236", "B. Rp359.640", "C. Rp360.000", "D. Rp362.340"],
    correctAnswer: "B. Rp359.640",
  },
  {
    id: 84, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Modal tabungan $M$ tumbuh menjadi $1{,}24M$ setelah 2 tahun dengan bunga tunggal. Jika modal awal Rp5.000.000 ditabung 3 tahun dengan bunga yang sama, hasilnya adalah ...",
    options: ["A. Rp5.900.000", "B. Rp5.950.000", "C. Rp6.000.000", "D. Rp6.100.000"],
    correctAnswer: "A. Rp5.900.000",
  },
  {
    id: 85, type: "PG", difficulty: "Sulit", tag: "Kontekstual",
    question: "PT. Maju Jaya memiliki omzet Rp500.000.000/bulan dengan pajak penghasilan badan 22%. Setelah dipotong biaya operasional Rp300.000.000, pajak yang dibayar adalah ...",
    options: ["A. Rp40.000.000", "B. Rp44.000.000", "C. Rp48.000.000", "D. Rp50.000.000"],
    correctAnswer: "B. Rp44.000.000",
  },
  {
    id: 86, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Seorang pedagang menjual 2 barang dengan harga jual sama Rp960.000. Barang pertama untung 20%, barang kedua rugi 20%. Hasil keseluruhan transaksi adalah ...",
    options: ["A. Impas", "B. Untung Rp80.000", "C. Rugi Rp80.000", "D. Rugi Rp160.000"],
    correctAnswer: "C. Rugi Rp80.000",
  },
  {
    id: 87, type: "PG", difficulty: "Sulit", tag: "ANBK",
    question: "Nasabah menabung Rp2.000.000 per bulan selama 12 bulan di rekening berbunga tunggal 6%/tahun (bunga dihitung dari total simpanan akhir tahun). Total uang setelah 1 tahun adalah ...",
    options: ["A. Rp25.000.000", "B. Rp25.440.000", "C. Rp25.600.000", "D. Rp25.920.000"],
    correctAnswer: "B. Rp25.440.000",
  },
  {
    id: 88, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Harga jual sebuah barang adalah Rp1.320.000 setelah mendapat untung $p$% dari harga beli. Jika harga beli naik 10% sementara harga jual tetap, maka pedagang hanya untung $0{,}5p$%. Nilai $p$ adalah ...",
    options: ["A. 20%", "B. 25%", "C. 30%", "D. 40%"],
    correctAnswer: "A. 20%",
  },
  {
    id: 89, type: "PG", difficulty: "Sulit", tag: "Literasi Matematika",
    question: "Sebuah artikel keuangan menyatakan: 'Inflasi 5%/tahun membuat daya beli turun.' Jika uang Rp1.000.000 ditabung dengan bunga tunggal 3%/tahun selama 2 tahun, nilai riil uang dibanding inflasi adalah ...",
    options: ["A. Turun Rp40.000", "B. Turun Rp38.100", "C. Naik Rp20.000", "D. Tetap sama"],
    correctAnswer: "A. Turun Rp40.000",
  },
  {
    id: 90, type: "PG", difficulty: "Sulit", tag: "TKA",
    question: "Sebuah toko menjual TV harga pokok Rp4.000.000 dengan keuntungan 30%. Karena persaingan, harga diturunkan agar tetap untung minimal 5%. Diskon maksimal yang bisa diberikan dari harga jual awal adalah ...",
    options: ["A. 15,38%", "B. 18,46%", "C. 19,23%", "D. 20%"],
    correctAnswer: "C. 19,23%",
  },
  {
    id: 91, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Dua orang menabung bersama Rp10.000.000. Orang pertama menabung 3 bulan lebih awal dengan bunga 12%/tahun, orang kedua menabung setelahnya selama 9 bulan dengan bunga yang sama. Selisih bunga yang diterima keduanya adalah ...",
    options: ["A. Rp90.000", "B. Rp100.000", "C. Rp120.000", "D. Rp150.000"],
    correctAnswer: "A. Rp90.000",
  },
  {
    id: 92, type: "PG", difficulty: "Sulit", tag: "Kontekstual",
    question: "Koperasi memberikan pinjaman Rp15.000.000 dengan bunga menurun 1%/bulan dari sisa pokok. Setelah 3 bulan diangsur Rp5.000.000/bulan, total bunga yang sudah dibayar adalah ...",
    options: ["A. Rp300.000", "B. Rp350.000", "C. Rp450.000", "D. Rp600.000"],
    correctAnswer: "C. Rp450.000",
  },
  {
    id: 93, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Seorang importir membeli barang seharga \$1.000 saat kurs Rp15.000/dolar. Barang dijual Rp18.000.000. Saat pembayaran, kurs menjadi Rp16.000/dolar. Persentase keuntungan importir berdasarkan modal dalam rupiah saat beli adalah ...",
    options: ["A. 20%", "B. 22,67%", "C. 12,5%", "D. 15%"],
    correctAnswer: "A. 20%",
  },
  {
    id: 94, type: "PG", difficulty: "Sulit", tag: "TKA",
    question: "Seorang konsumen membeli barang harga Rp600.000 (sudah termasuk PPN 11%) dan mendapat diskon 10%. Harga pokok barang sebelum pajak dan sebelum diskon adalah ...",
    options: ["A. Rp480.000", "B. Rp486.000", "C. Rp500.000", "D. Rp540.540"],
    correctAnswer: "D. Rp540.540",
  },
  {
    id: 95, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Seorang pedagang membeli barang X (harga beli Rp500.000) dan barang Y (harga beli Rp300.000). Barang X dijual untung 30%, barang Y rugi 20%. Total untung/rugi dan persentasenya terhadap total harga beli adalah ...",
    options: ["A. Untung Rp93.000 (11,6%)", "B. Untung Rp90.000 (11,25%)", "C. Untung Rp95.000 (11,875%)", "D. Rugi Rp90.000"],
    correctAnswer: "B. Untung Rp90.000 (11,25%)",
  },
  {
    id: 96, type: "PG", difficulty: "Sulit", tag: "Literasi Matematika",
    question: "Seorang guru membahas: 'Diskon 50%+20% berbeda dengan diskon 70%.' Jika harga barang Rp1.000.000, selisih harga akhir keduanya adalah ...",
    options: ["A. Rp10.000", "B. Rp20.000", "C. Rp30.000", "D. Rp40.000"],
    correctAnswer: "B. Rp20.000",
  },
  {
    id: 97, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Pedagang A menjual 100 kg beras (harga beli Rp8.000/kg) dengan untung 10%. Pedagang B membeli dari A dan menjual kembali dengan untung 15%. Harga jual pedagang B per kilogram adalah ...",
    options: ["A. Rp9.900", "B. Rp10.000", "C. Rp10.120", "D. Rp10.200"],
    correctAnswer: "C. Rp10.120",
  },
  {
    id: 98, type: "PG", difficulty: "Sulit", tag: "ANBK",
    question: "Seseorang menginvestasikan uang di dua tempat: Rp4.000.000 dengan bunga 10%/tahun dan Rp6.000.000 dengan bunga 8%/tahun. Setelah 18 bulan, total hasil investasi (modal + bunga) adalah ...",
    options: ["A. Rp11.320.000", "B. Rp11.480.000", "C. Rp11.520.000", "D. Rp11.600.000"],
    correctAnswer: "A. Rp11.320.000",
  },
  {
    id: 99, type: "PG", difficulty: "Sulit", tag: "TKA",
    question: "Sebuah barang diimpor seharga \$200. Bea masuk 15%, PPN 11% dari (harga + bea masuk). Jika kurs 1\$ = Rp16.000, total harga barang dalam rupiah adalah ...",
    options: ["A. Rp3.872.000", "B. Rp4.012.000", "C. Rp4.121.120", "D. Rp4.150.000"],
    correctAnswer: "C. Rp4.121.120",
  },
  {
    id: 100, type: "PG", difficulty: "Sulit", tag: "HOTS",
    question: "Seorang pebisnis memiliki dua toko. Toko A untung 25% dari modal Rp8.000.000, toko B rugi 15% dari modal Rp12.000.000. Agar keduanya mencapai total keuntungan minimal 5% dari total modal, berapa tambahan keuntungan yang diperlukan?",
    options: ["A. Rp200.000", "B. Rp300.000", "C. Rp400.000", "D. Rp500.000"],
    correctAnswer: "C. Rp400.000",
  },
];

const difficultyColor: Record<Difficulty, string> = {
  Mudah: "bg-green-500/20 text-green-300 border-green-500/40",
  Sedang: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  Sulit: "bg-red-500/20 text-red-300 border-red-500/40",
};

const tagColor: Record<string, string> = {
  HOTS: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  Kontekstual: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  UN: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  ANBK: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  TKA: "bg-pink-500/20 text-pink-300 border-pink-500/40",
  "Literasi Matematika": "bg-teal-500/20 text-teal-300 border-teal-500/40",
};

const AritmetikaSosialPage = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterDiff, setFilterDiff] = useState<Difficulty | "Semua">("Semua");
  const [filterTag, setFilterTag] = useState<string>("Semua");

  const filtered = useMemo(() => {
    return soalAritmetikaSosial.filter((q) => {
      const diffOk = filterDiff === "Semua" || q.difficulty === filterDiff;
      const tagOk = filterTag === "Semua" || q.tag === filterTag;
      return diffOk && tagOk;
    });
  }, [filterDiff, filterTag]);

  const toggle = (id: number) => {
    playPopSound();
    setExpandedId(expandedId === id ? null : id);
  };

  const difficulties: ("Semua" | Difficulty)[] = ["Semua", "Mudah", "Sedang", "Sulit"];
  const tags = ["Semua", "HOTS", "Kontekstual", "UN", "ANBK", "TKA", "Literasi Matematika"];

  const counts = {
    Mudah: soalAritmetikaSosial.filter((q) => q.difficulty === "Mudah").length,
    Sedang: soalAritmetikaSosial.filter((q) => q.difficulty === "Sedang").length,
    Sulit: soalAritmetikaSosial.filter((q) => q.difficulty === "Sulit").length,
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden py-8">
      <Starfield />
      <PageNavigation prevPath="/bank-soal" />

      <div className="relative z-10 max-w-4xl w-full px-4 mt-16">
        <div className="text-center mb-8">
          <Coins className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-1">
            BANK SOAL
          </h1>
          <h2 className="font-display text-lg md:text-xl font-bold text-yellow-300 mb-2">
            ARITMETIKA SOSIAL
          </h2>
          <p className="text-white/60 text-sm font-body">
            100 soal pilihan ganda — Mudah · Sedang · Sulit
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["Mudah", "Sedang", "Sulit"] as Difficulty[]).map((d) => (
            <div key={d} className={`rounded-xl border p-3 text-center ${difficultyColor[d]}`}>
              <div className="text-xl font-bold font-display">{counts[d]}</div>
              <div className="text-xs font-body">{d}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => { playPopSound(); setFilterDiff(d); }}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-all ${
                  filterDiff === d
                    ? "bg-primary text-black border-primary font-bold"
                    : "bg-card/60 text-white/70 border-border hover:border-primary/50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => { playPopSound(); setFilterTag(t); }}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-all ${
                  filterTag === t
                    ? "bg-primary text-black border-primary font-bold"
                    : "bg-card/60 text-white/70 border-border hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="text-white/50 text-xs font-body mb-4">
          Menampilkan {filtered.length} soal
        </p>

        {/* Questions */}
        <div className="space-y-3 pb-12">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all"
            >
              <button
                className="w-full text-left p-4 flex items-start gap-3"
                onClick={() => toggle(q.id)}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-display font-bold text-xs">
                  {q.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-body font-semibold ${difficultyColor[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    {q.tag && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-body font-semibold ${tagColor[q.tag] ?? "bg-white/10 text-white/60 border-white/20"}`}>
                        {q.tag}
                      </span>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded-full border font-body bg-white/10 text-white/50 border-white/20">
                      {q.type}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm font-body leading-relaxed">
                    <MathText text={q.question} />
                  </p>
                </div>
                <span className="flex-shrink-0 text-white/40 mt-1">
                  {expandedId === q.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {expandedId === q.id && q.options && (
                <div className="px-4 pb-4 pt-0 ml-11 space-y-1.5">
                  {q.options.map((opt, i) => {
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <div
                        key={i}
                        className={`text-sm font-body px-3 py-2 rounded-lg border transition-all ${
                          isCorrect
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                      >
                        <MathText text={opt} />
                        {isCorrect && (
                          <span className="ml-2 text-green-400 text-xs font-semibold">✓ Kunci</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AritmetikaSosialPage;
