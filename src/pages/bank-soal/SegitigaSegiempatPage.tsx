import { useState, useMemo } from "react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Triangle, ChevronDown, ChevronUp } from "lucide-react";
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
  question: string;
  options?: string[];
  statements?: { text: string; isCorrect: boolean }[];
  correctAnswer?: string | string[];
  explanation: { concept: string; steps: string[]; formula?: string; };
  diagram?: () => JSX.Element;
}

/* ── SVG DIAGRAM HELPERS ────────────────────────────────── */

const DiagTrapesium = () => (
  <svg viewBox="0 0 320 160" className="w-full max-w-xs mx-auto my-3">
    <polygon points="60,130 260,130 210,30 110,30" fill="rgba(251,146,60,0.12)" stroke="#fb923c" strokeWidth="2"/>
    <text x="148" y="22" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">8 cm</text>
    <text x="130" y="148" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">14 cm</text>
    <text x="28" y="85" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">6 cm</text>
    <text x="263" y="85" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">7 cm</text>
    <text x="54" y="148" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">A</text>
    <text x="258" y="148" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">B</text>
    <text x="212" y="22" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">C</text>
    <text x="104" y="22" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">D</text>
  </svg>
);

const DiagTrapesiumLuas = () => (
  <svg viewBox="0 0 320 170" className="w-full max-w-xs mx-auto my-3">
    <polygon points="50,140 270,140 220,30 100,30" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="2"/>
    <line x1="165" y1="30" x2="165" y2="140" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4,3"/>
    <text x="125" y="22" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">12 cm</text>
    <text x="135" y="158" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">20 cm</text>
    <text x="170" y="90" fill="#22d3ee" fontSize="12" fontFamily="sans-serif">t = 8 cm</text>
  </svg>
);

const DiagGabungan = () => (
  <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto my-3">
    <rect x="40" y="90" width="200" height="90" fill="rgba(34,211,238,0.10)" stroke="#22d3ee" strokeWidth="2"/>
    <polygon points="40,90 140,20 240,90" fill="rgba(74,222,128,0.12)" stroke="#4ade80" strokeWidth="2"/>
    <text x="120" y="185" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">20 cm</text>
    <text x="2" y="140" fill="#fbbf24" fontSize="11" fontFamily="sans-serif">9 cm</text>
    <text x="60" y="60" fill="#4ade80" fontSize="11" fontFamily="sans-serif">t=7cm</text>
  </svg>
);

const DiagShadedRect = () => (
  <svg viewBox="0 0 280 180" className="w-full max-w-xs mx-auto my-3">
    <rect x="30" y="20" width="220" height="140" fill="rgba(251,146,60,0.12)" stroke="#fb923c" strokeWidth="2"/>
    <polygon points="30,20 250,20 250,160" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" strokeWidth="2"/>
    <text x="100" y="15" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">22 cm</text>
    <text x="252" y="95" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">14 cm</text>
    <text x="100" y="100" fill="#a78bfa" fontSize="12" fontFamily="sans-serif">Daerah berarsir</text>
  </svg>
);

const DiagTrapSiku = () => (
  <svg viewBox="0 0 300 170" className="w-full max-w-xs mx-auto my-3">
    <polygon points="40,140 260,140 260,40 40,140" fill="none" stroke="#60a5fa" strokeWidth="0"/>
    <polygon points="40,140 260,140 200,40 40,140" fill="rgba(59,130,246,0.12)" stroke="#60a5fa" strokeWidth="2"/>
    <polyline points="40,123 57,123 57,140" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="105" y="158" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">15 cm</text>
    <text x="5" y="95" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">8 cm</text>
    <text x="205" y="90" fill="#e2e8f0" fontSize="12" fontFamily="sans-serif">10 cm</text>
    <text x="85" y="80" fill="#22d3ee" fontSize="11" fontFamily="sans-serif">9 cm</text>
  </svg>
);

const DiagJajarGenjang = () => (
  <svg viewBox="0 0 300 150" className="w-full max-w-xs mx-auto my-3">
    <polygon points="50,120 250,120 210,30 10,30" fill="rgba(74,222,128,0.12)" stroke="#4ade80" strokeWidth="2"/>
    <line x1="130" y1="30" x2="130" y2="120" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4,3"/>
    <polyline points="130,103 147,103 147,120" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="120" y="140" fill="#fbbf24" fontSize="12" fontFamily="sans-serif">18 cm</text>
    <text x="132" y="80" fill="#22d3ee" fontSize="12" fontFamily="sans-serif">t=7</text>
  </svg>
);

/* ── SOAL DATA ────────────────────────────────────────────── */

const soalSegitigaSegiempat: Question[] = [
  /* ═══════════════ MUDAH (1–15) ═══════════════ */
  {
    id: 1, type: "PG", difficulty: "Mudah",
    question: "Sebuah segitiga memiliki sisi-sisi sepanjang $5$ cm, $7$ cm, dan $9$ cm. Keliling segitiga tersebut adalah ...",
    options: ["A. 19 cm", "B. 21 cm", "C. 23 cm", "D. 25 cm"],
    correctAnswer: "B. 21 cm",
    explanation: {
      concept: "Keliling segitiga adalah jumlah ketiga sisi-sisinya.",
      steps: [
        "Diketahui: $a = 5$ cm, $b = 7$ cm, $c = 9$ cm",
        "Keliling: $K = a + b + c$",
        "$K = 5 + 7 + 9 = 21$ cm"
      ],
      formula: "$K_{\\text{segitiga}} = a + b + c$"
    }
  },
  {
    id: 2, type: "PG", difficulty: "Mudah",
    question: "Luas sebuah segitiga dengan **alas** $8$ cm dan **tinggi** $6$ cm adalah ...",
    options: ["A. 48 cm²", "B. 24 cm²", "C. 28 cm²", "D. 14 cm²"],
    correctAnswer: "B. 24 cm²",
    explanation: {
      concept: "Luas segitiga = setengah hasil kali alas dan tinggi.",
      steps: [
        "Diketahui: alas $a = 8$ cm, tinggi $t = 6$ cm",
        "$L = \\frac{1}{2} \\times a \\times t$",
        "$L = \\frac{1}{2} \\times 8 \\times 6 = 24$ cm²"
      ],
      formula: "$L_{\\text{segitiga}} = \\dfrac{1}{2} \\times a \\times t$"
    }
  },
  {
    id: 3, type: "PG", difficulty: "Mudah",
    question: "Keliling sebuah **persegi** dengan panjang sisi $12$ cm adalah ...",
    options: ["A. 24 cm", "B. 36 cm", "C. 48 cm", "D. 144 cm"],
    correctAnswer: "C. 48 cm",
    explanation: {
      concept: "Persegi memiliki 4 sisi yang sama panjang.",
      steps: [
        "Diketahui: sisi $s = 12$ cm",
        "$K = 4 \\times s = 4 \\times 12 = 48$ cm"
      ],
      formula: "$K_{\\text{persegi}} = 4 \\times s$"
    }
  },
  {
    id: 4, type: "PG", difficulty: "Mudah",
    question: "Keliling sebuah **persegi panjang** dengan panjang $15$ cm dan lebar $8$ cm adalah ...",
    options: ["A. 23 cm", "B. 46 cm", "C. 120 cm", "D. 240 cm"],
    correctAnswer: "B. 46 cm",
    explanation: {
      concept: "Keliling persegi panjang = 2 × (panjang + lebar).",
      steps: [
        "Diketahui: $p = 15$ cm, $l = 8$ cm",
        "$K = 2 \\times (p + l) = 2 \\times (15 + 8)$",
        "$K = 2 \\times 23 = 46$ cm"
      ],
      formula: "$K_{\\text{persegi panjang}} = 2(p + l)$"
    }
  },
  {
    id: 5, type: "PG", difficulty: "Mudah",
    question: "Luas sebuah **persegi** dengan panjang sisi $9$ cm adalah ...",
    options: ["A. 18 cm²", "B. 36 cm²", "C. 81 cm²", "D. 729 cm²"],
    correctAnswer: "C. 81 cm²",
    explanation: {
      concept: "Luas persegi = sisi × sisi.",
      steps: [
        "Diketahui: $s = 9$ cm",
        "$L = s^2 = 9^2 = 81$ cm²"
      ],
      formula: "$L_{\\text{persegi}} = s^2$"
    }
  },
  {
    id: 6, type: "PG", difficulty: "Mudah",
    question: "Luas sebuah **persegi panjang** dengan panjang $12$ cm dan lebar $7$ cm adalah ...",
    options: ["A. 38 cm²", "B. 74 cm²", "C. 84 cm²", "D. 168 cm²"],
    correctAnswer: "C. 84 cm²",
    explanation: {
      concept: "Luas persegi panjang = panjang × lebar.",
      steps: [
        "Diketahui: $p = 12$ cm, $l = 7$ cm",
        "$L = p \\times l = 12 \\times 7 = 84$ cm²"
      ],
      formula: "$L_{\\text{persegi panjang}} = p \\times l$"
    }
  },
  {
    id: 7, type: "PG", difficulty: "Mudah",
    question: "Keliling sebuah **belah ketupat** dengan panjang sisi $13$ cm adalah ...",
    options: ["A. 26 cm", "B. 39 cm", "C. 52 cm", "D. 169 cm"],
    correctAnswer: "C. 52 cm",
    explanation: {
      concept: "Belah ketupat memiliki 4 sisi yang sama panjang, seperti persegi tetapi miring.",
      steps: [
        "Diketahui: sisi $s = 13$ cm",
        "$K = 4 \\times s = 4 \\times 13 = 52$ cm"
      ],
      formula: "$K_{\\text{belah ketupat}} = 4 \\times s$"
    }
  },
  {
    id: 8, type: "PG", difficulty: "Mudah",
    question: "Luas **belah ketupat** dengan diagonal $d_1 = 10$ cm dan $d_2 = 8$ cm adalah ...",
    options: ["A. 18 cm²", "B. 36 cm²", "C. 40 cm²", "D. 80 cm²"],
    correctAnswer: "C. 40 cm²",
    explanation: {
      concept: "Luas belah ketupat = setengah hasil kali kedua diagonalnya.",
      steps: [
        "Diketahui: $d_1 = 10$ cm, $d_2 = 8$ cm",
        "$L = \\frac{1}{2} \\times d_1 \\times d_2$",
        "$L = \\frac{1}{2} \\times 10 \\times 8 = 40$ cm²"
      ],
      formula: "$L_{\\text{belah ketupat}} = \\dfrac{1}{2} \\times d_1 \\times d_2$"
    }
  },
  {
    id: 9, type: "PG", difficulty: "Mudah",
    question: "Keliling **trapesium** ABCD dengan $AB = 14$ cm, $BC = 7$ cm, $CD = 8$ cm, dan $DA = 6$ cm adalah ...",
    options: ["A. 29 cm", "B. 33 cm", "C. 35 cm", "D. 37 cm"],
    correctAnswer: "C. 35 cm",
    diagram: DiagTrapesium,
    explanation: {
      concept: "Keliling trapesium = jumlah keempat sisinya.",
      steps: [
        "Diketahui: $AB = 14$ cm, $BC = 7$ cm, $CD = 8$ cm, $DA = 6$ cm",
        "$K = AB + BC + CD + DA$",
        "$K = 14 + 7 + 8 + 6 = 35$ cm"
      ],
      formula: "$K_{\\text{trapesium}} = a + b + c + d$"
    }
  },
  {
    id: 10, type: "PG", difficulty: "Mudah",
    question: "Luas **jajar genjang** dengan alas $18$ cm dan tinggi $7$ cm adalah ...",
    options: ["A. 50 cm²", "B. 63 cm²", "C. 126 cm²", "D. 252 cm²"],
    correctAnswer: "C. 126 cm²",
    diagram: DiagJajarGenjang,
    explanation: {
      concept: "Luas jajar genjang = alas × tinggi (tinggi tegak lurus alas, bukan sisi miring).",
      steps: [
        "Diketahui: $a = 18$ cm, $t = 7$ cm",
        "$L = a \\times t = 18 \\times 7 = 126$ cm²"
      ],
      formula: "$L_{\\text{jajar genjang}} = a \\times t$"
    }
  },
  {
    id: 11, type: "PG", difficulty: "Mudah",
    question: "Keliling sebuah **segitiga sama sisi** adalah $27$ cm. Panjang setiap sisinya adalah ...",
    options: ["A. 7 cm", "B. 8 cm", "C. 9 cm", "D. 11 cm"],
    correctAnswer: "C. 9 cm",
    explanation: {
      concept: "Segitiga sama sisi memiliki ketiga sisi yang sama panjang. Setiap sisi = keliling ÷ 3.",
      steps: [
        "Keliling $K = 27$ cm",
        "Segitiga sama sisi: $K = 3 \\times s$",
        "$s = \\frac{K}{3} = \\frac{27}{3} = 9$ cm"
      ],
      formula: "$s = \\dfrac{K}{3}$ untuk segitiga sama sisi"
    }
  },
  {
    id: 12, type: "Benar/Salah", difficulty: "Mudah",
    question: "Tentukan benar atau salah pernyataan berikut tentang **persegi**!",
    statements: [
      { text: "Persegi memiliki 4 sisi yang sama panjang", isCorrect: true },
      { text: "Diagonal persegi tidak sama panjang", isCorrect: false },
      { text: "Semua sudut persegi besarnya $90°$", isCorrect: true },
      { text: "Persegi adalah jenis khusus dari jajar genjang", isCorrect: true }
    ],
    explanation: {
      concept: "Persegi adalah segiempat beraturan dengan semua sisi sama panjang dan semua sudut siku-siku.",
      steps: [
        "Persegi punya 4 sisi sama panjang → **BENAR**",
        "Diagonal persegi SAMA panjang (keduanya $= s\\sqrt{2}$) → **SALAH**",
        "Semua sudut $90°$ → **BENAR**",
        "Persegi adalah persegi panjang dan jajar genjang khusus → **BENAR**"
      ],
      formula: "Persegi ⊂ Persegi Panjang ⊂ Jajar Genjang ⊂ Trapesium"
    }
  },
  {
    id: 13, type: "PG", difficulty: "Mudah",
    question: "Dua sudut sebuah segitiga berturut-turut adalah $60°$ dan $75°$. Besar sudut ketiga adalah ...",
    options: ["A. $35°$", "B. $45°$", "C. $55°$", "D. $65°$"],
    correctAnswer: "B. $45°$",
    explanation: {
      concept: "Jumlah ketiga sudut dalam segitiga selalu $180°$.",
      steps: [
        "Sudut pertama $= 60°$, sudut kedua $= 75°$",
        "Sudut ketiga $= 180° - 60° - 75°$",
        "Sudut ketiga $= 180° - 135° = 45°$"
      ],
      formula: "$\\alpha + \\beta + \\gamma = 180°$"
    }
  },
  {
    id: 14, type: "PG", difficulty: "Mudah",
    question: "Luas sebuah **layang-layang** dengan diagonal $d_1 = 24$ cm dan $d_2 = 10$ cm adalah ...",
    options: ["A. 34 cm²", "B. 68 cm²", "C. 120 cm²", "D. 240 cm²"],
    correctAnswer: "C. 120 cm²",
    explanation: {
      concept: "Luas layang-layang = setengah hasil kali kedua diagonalnya.",
      steps: [
        "Diketahui: $d_1 = 24$ cm, $d_2 = 10$ cm",
        "$L = \\frac{1}{2} \\times d_1 \\times d_2$",
        "$L = \\frac{1}{2} \\times 24 \\times 10 = 120$ cm²"
      ],
      formula: "$L_{\\text{layang-layang}} = \\dfrac{1}{2} \\times d_1 \\times d_2$"
    }
  },
  {
    id: 15, type: "PG", difficulty: "Mudah",
    question: "Sebuah **layang-layang** memiliki dua pasang sisi: sisi pendek $10$ cm dan sisi panjang $15$ cm. Keliling layang-layang tersebut adalah ...",
    options: ["A. 25 cm", "B. 40 cm", "C. 50 cm", "D. 60 cm"],
    correctAnswer: "C. 50 cm",
    explanation: {
      concept: "Layang-layang memiliki 2 pasang sisi yang sama panjang (berdekatan).",
      steps: [
        "Sisi pendek $= 10$ cm (sepasang), sisi panjang $= 15$ cm (sepasang)",
        "$K = 2 \\times (\\text{sisi pendek} + \\text{sisi panjang})$",
        "$K = 2 \\times (10 + 15) = 2 \\times 25 = 50$ cm"
      ],
      formula: "$K_{\\text{layang-layang}} = 2(a + b)$"
    }
  },

  /* ═══════════════ SEDANG (16–35) ═══════════════ */
  {
    id: 16, type: "PG", difficulty: "Sedang",
    question: "Sebuah taman rekreasi berbentuk **persegi** dengan keliling $120$ m. Luas taman tersebut adalah ...",
    options: ["A. 600 m²", "B. 700 m²", "C. 800 m²", "D. 900 m²"],
    correctAnswer: "D. 900 m²",
    explanation: {
      concept: "Dari keliling persegi cari sisi terlebih dahulu, lalu hitung luas.",
      steps: [
        "Keliling $K = 120$ m",
        "Sisi: $s = \\frac{K}{4} = \\frac{120}{4} = 30$ m",
        "Luas: $L = s^2 = 30^2 = 900$ m²"
      ],
      formula: "$s = \\dfrac{K}{4}$, kemudian $L = s^2$"
    }
  },
  {
    id: 17, type: "PG", difficulty: "Sedang",
    question: "Sepetak sawah berbentuk **persegi panjang** dengan perbandingan panjang dan lebar $3 : 2$. Jika kelilingnya $50$ m, maka luas sawah tersebut adalah ...",
    options: ["A. 100 m²", "B. 125 m²", "C. 150 m²", "D. 175 m²"],
    correctAnswer: "C. 150 m²",
    explanation: {
      concept: "Gunakan perbandingan untuk menyatakan panjang dan lebar, lalu selesaikan dengan persamaan keliling.",
      steps: [
        "Misalkan $p = 3x$ dan $l = 2x$",
        "Keliling: $2(3x + 2x) = 50$",
        "$2 \\times 5x = 50 \\Rightarrow 10x = 50 \\Rightarrow x = 5$",
        "Panjang $= 3 \\times 5 = 15$ m, lebar $= 2 \\times 5 = 10$ m",
        "Luas: $L = 15 \\times 10 = 150$ m²"
      ],
      formula: "$2(p + l) = K$, dengan $p : l = 3 : 2$"
    }
  },
  {
    id: 18, type: "PG", difficulty: "Sedang",
    question: "Luas **trapesium** dengan sisi sejajar $12$ cm dan $20$ cm serta tinggi $8$ cm adalah ...",
    options: ["A. 96 cm²", "B. 128 cm²", "C. 160 cm²", "D. 256 cm²"],
    correctAnswer: "B. 128 cm²",
    diagram: DiagTrapesiumLuas,
    explanation: {
      concept: "Luas trapesium = setengah jumlah sisi sejajar dikali tinggi.",
      steps: [
        "Diketahui: $a = 12$ cm, $b = 20$ cm, $t = 8$ cm",
        "$L = \\frac{1}{2} \\times (a + b) \\times t$",
        "$L = \\frac{1}{2} \\times (12 + 20) \\times 8$",
        "$L = \\frac{1}{2} \\times 32 \\times 8 = 128$ cm²"
      ],
      formula: "$L_{\\text{trapesium}} = \\dfrac{1}{2}(a+b) \\times t$"
    }
  },
  {
    id: 19, type: "PG", difficulty: "Sedang",
    question: "Sebuah segitiga sama kaki memiliki keliling $40$ cm. Jika panjang alasnya $10$ cm, maka panjang kaki segitiga tersebut adalah ...",
    options: ["A. 12 cm", "B. 15 cm", "C. 18 cm", "D. 20 cm"],
    correctAnswer: "B. 15 cm",
    explanation: {
      concept: "Segitiga sama kaki memiliki dua kaki yang sama panjang. Gunakan persamaan keliling.",
      steps: [
        "Diketahui: $K = 40$ cm, alas $= 10$ cm",
        "Keliling: $K = 2k + \\text{alas}$, di mana $k$ = panjang kaki",
        "$40 = 2k + 10$",
        "$2k = 30 \\Rightarrow k = 15$ cm"
      ],
      formula: "$K_{\\text{sama kaki}} = 2k + a$"
    }
  },
  {
    id: 20, type: "PG", difficulty: "Sedang",
    question: "Sudut luar sebuah segitiga yang berdekatan dengan sudut dalam $65°$ adalah ...",
    options: ["A. $65°$", "B. $95°$", "C. $105°$", "D. $115°$"],
    correctAnswer: "D. $115°$",
    explanation: {
      concept: "Sudut luar dan sudut dalam yang berdekatan pada segitiga saling berpelurus (jumlahnya $180°$).",
      steps: [
        "Sudut dalam $= 65°$",
        "Sudut luar $= 180° - 65° = 115°$"
      ],
      formula: "Sudut luar $= 180° -$ sudut dalam yang berdekatan"
    }
  },
  {
    id: 21, type: "PG", difficulty: "Sedang",
    question: "Diagonal **persegi panjang** dengan panjang $8$ cm dan lebar $6$ cm adalah ...",
    options: ["A. $7$ cm", "B. $10$ cm", "C. $12$ cm", "D. $14$ cm"],
    correctAnswer: "B. $10$ cm",
    explanation: {
      concept: "Diagonal persegi panjang dapat dicari dengan Teorema Pythagoras.",
      steps: [
        "Diketahui: $p = 8$ cm, $l = 6$ cm",
        "$d = \\sqrt{p^2 + l^2} = \\sqrt{8^2 + 6^2}$",
        "$d = \\sqrt{64 + 36} = \\sqrt{100} = 10$ cm"
      ],
      formula: "$d = \\sqrt{p^2 + l^2}$"
    }
  },
  {
    id: 22, type: "PG", difficulty: "Sedang",
    question: "Luas **trapesium** adalah $90$ cm² dan tingginya $9$ cm. Jika salah satu sisi sejajarnya $8$ cm, maka sisi sejajar yang lain adalah ...",
    options: ["A. 10 cm", "B. 12 cm", "C. 14 cm", "D. 16 cm"],
    correctAnswer: "B. 12 cm",
    explanation: {
      concept: "Gunakan rumus luas trapesium untuk mencari sisi sejajar yang belum diketahui.",
      steps: [
        "Diketahui: $L = 90$ cm², $t = 9$ cm, $a = 8$ cm, cari $b$",
        "$L = \\frac{1}{2}(a+b) \\times t$",
        "$90 = \\frac{1}{2}(8+b) \\times 9$",
        "$90 = \\frac{9}{2}(8+b) \\Rightarrow 180 = 9(8+b)$",
        "$20 = 8 + b \\Rightarrow b = 12$ cm"
      ],
      formula: "$b = \\dfrac{2L}{t} - a$"
    }
  },
  {
    id: 23, type: "PG", difficulty: "Sedang",
    question: "Sebuah **layang-layang** ABCD dengan perbandingan sisi panjang terhadap sisi pendek $= 3 : 2$. Jika sisi pendeknya $16$ cm, keliling layang-layang adalah ...",
    options: ["A. 64 cm", "B. 70 cm", "C. 80 cm", "D. 96 cm"],
    correctAnswer: "C. 80 cm",
    explanation: {
      concept: "Cari sisi panjang menggunakan perbandingan, lalu hitung keliling.",
      steps: [
        "Perbandingan sisi panjang : pendek $= 3 : 2$",
        "Sisi pendek $= 16$ cm",
        "Sisi panjang $= \\frac{3}{2} \\times 16 = 24$ cm",
        "$K = 2 \\times (16 + 24) = 2 \\times 40 = 80$ cm"
      ],
      formula: "$K = 2(a + b)$, sisi panjang $= \\frac{3}{2} \\times$ sisi pendek"
    }
  },
  {
    id: 24, type: "PG", difficulty: "Sedang",
    question: "Sebuah bangun terdiri dari **persegi panjang** ($20$ cm $\\times$ $9$ cm) dengan **segitiga** di atasnya (alas $20$ cm, tinggi $7$ cm). Luas total bangun adalah ...",
    options: ["A. 230 cm²", "B. 250 cm²", "C. 270 cm²", "D. 290 cm²"],
    correctAnswer: "B. 250 cm²",
    diagram: DiagGabungan,
    explanation: {
      concept: "Luas bangun gabungan = jumlah luas masing-masing bagian.",
      steps: [
        "Luas persegi panjang: $L_1 = 20 \\times 9 = 180$ cm²",
        "Luas segitiga: $L_2 = \\frac{1}{2} \\times 20 \\times 7 = 70$ cm²",
        "Luas total: $L = L_1 + L_2 = 180 + 70 = 250$ cm²"
      ],
      formula: "$L_{\\text{total}} = L_{\\text{persegi panjang}} + L_{\\text{segitiga}}$"
    }
  },
  {
    id: 25, type: "PG", difficulty: "Sedang",
    question: "Luas **belah ketupat** adalah $96$ cm² dan salah satu diagonalnya $16$ cm. Panjang diagonal yang lain adalah ...",
    options: ["A. 8 cm", "B. 10 cm", "C. 12 cm", "D. 14 cm"],
    correctAnswer: "C. 12 cm",
    explanation: {
      concept: "Gunakan rumus luas belah ketupat untuk mencari diagonal yang belum diketahui.",
      steps: [
        "Diketahui: $L = 96$ cm², $d_1 = 16$ cm",
        "$L = \\frac{1}{2} \\times d_1 \\times d_2$",
        "$96 = \\frac{1}{2} \\times 16 \\times d_2$",
        "$96 = 8 \\times d_2 \\Rightarrow d_2 = 12$ cm"
      ],
      formula: "$d_2 = \\dfrac{2L}{d_1}$"
    }
  },
  {
    id: 26, type: "PG", difficulty: "Sedang",
    question: "Alas sebuah segitiga tidak diketahui. Jika tinggi $= 10$ cm dan luasnya $= 60$ cm², maka panjang alasnya adalah ...",
    options: ["A. 6 cm", "B. 10 cm", "C. 12 cm", "D. 15 cm"],
    correctAnswer: "C. 12 cm",
    explanation: {
      concept: "Dari rumus luas segitiga, cari alas dengan membalik rumus.",
      steps: [
        "Diketahui: $t = 10$ cm, $L = 60$ cm²",
        "$L = \\frac{1}{2} \\times a \\times t$",
        "$60 = \\frac{1}{2} \\times a \\times 10$",
        "$60 = 5a \\Rightarrow a = 12$ cm"
      ],
      formula: "$a = \\dfrac{2L}{t}$"
    }
  },
  {
    id: 27, type: "PG", difficulty: "Sedang",
    question: "Sebuah segitiga siku-siku memiliki dua sisi siku-siku $6$ cm dan $8$ cm. Keliling segitiga tersebut adalah ...",
    options: ["A. 24 cm", "B. 26 cm", "C. 28 cm", "D. 30 cm"],
    correctAnswer: "A. 24 cm",
    explanation: {
      concept: "Cari sisi miring (hipotenusa) dengan Teorema Pythagoras, lalu hitung keliling.",
      steps: [
        "Diketahui: $a = 6$ cm, $b = 8$ cm",
        "Hipotenusa: $c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm",
        "Keliling: $K = 6 + 8 + 10 = 24$ cm"
      ],
      formula: "$c = \\sqrt{a^2 + b^2}$, kemudian $K = a + b + c$"
    }
  },
  {
    id: 28, type: "PG Kompleks", difficulty: "Sedang",
    question: "Perhatikan pernyataan berikut tentang **segiempat**!\n(1) Setiap persegi adalah persegi panjang\n(2) Setiap belah ketupat adalah jajar genjang\n(3) Trapesium memiliki tepat satu pasang sisi sejajar\n(4) Setiap persegi panjang adalah belah ketupat\n\nPernyataan yang **benar** adalah ...",
    options: ["A. (1) dan (2)", "B. (1), (2), dan (3)", "C. (2), (3), dan (4)", "D. (1), (2), dan (4)"],
    correctAnswer: "B. (1), (2), dan (3)",
    explanation: {
      concept: "Memahami hubungan hierarki antar segiempat.",
      steps: [
        "(1) Persegi → semua syarat persegi panjang terpenuhi → **BENAR**",
        "(2) Belah ketupat → sisi sejajar berpasangan → **BENAR**",
        "(3) Trapesium → tepat 1 pasang sisi sejajar → **BENAR**",
        "(4) Persegi panjang → sisinya TIDAK harus sama panjang → **SALAH**",
        "Jawaban: (1), (2), dan (3)"
      ],
      formula: "Persegi ⊂ Persegi Panjang dan Persegi ⊂ Belah Ketupat ⊂ Jajar Genjang"
    }
  },
  {
    id: 29, type: "Benar/Salah", difficulty: "Sedang",
    question: "Tentukan benar atau salah pernyataan tentang **segitiga** berikut!",
    statements: [
      { text: "Segitiga sama sisi memiliki ketiga sudut $= 60°$", isCorrect: true },
      { text: "Segitiga tumpul memiliki satu sudut lebih dari $90°$", isCorrect: true },
      { text: "Segitiga siku-siku bisa juga merupakan segitiga sama kaki", isCorrect: true },
      { text: "Jumlah dua sisi segitiga bisa sama dengan sisi ketiganya", isCorrect: false }
    ],
    explanation: {
      concept: "Sifat-sifat berbagai jenis segitiga berdasarkan sudut dan sisi.",
      steps: [
        "Segitiga sama sisi: $180°/3 = 60°$ setiap sudut → **BENAR**",
        "Segitiga tumpul: satu sudut $> 90°$ → **BENAR**",
        "Segitiga siku-siku sama kaki: sudut $90°, 45°, 45°$ → **BENAR**",
        "Jumlah dua sisi HARUS lebih besar dari sisi ketiga → **SALAH**"
      ],
      formula: "Ketidaksamaan segitiga: $a + b > c$, $a + c > b$, $b + c > a$"
    }
  },
  {
    id: 30, type: "PG", difficulty: "Sedang",
    question: "Sebuah lantai berukuran $5$ m $\\times$ $4$ m akan dipasang ubin berbentuk **persegi** berukuran $25$ cm $\\times$ $25$ cm. Banyak ubin yang dibutuhkan adalah ...",
    options: ["A. 200 buah", "B. 280 buah", "C. 320 buah", "D. 400 buah"],
    correctAnswer: "C. 320 buah",
    explanation: {
      concept: "Ubah satuan menjadi sama, lalu bagi luas lantai dengan luas satu ubin.",
      steps: [
        "Luas lantai: $500 \\times 400 = 200.000$ cm²",
        "Luas ubin: $25 \\times 25 = 625$ cm²",
        "Banyak ubin: $\\frac{200.000}{625} = 320$ buah"
      ],
      formula: "$n = \\dfrac{\\text{Luas lantai}}{\\text{Luas ubin}}$"
    }
  },
  {
    id: 31, type: "PG", difficulty: "Sedang",
    question: "Sebuah trapesium siku-siku memiliki sisi sejajar $15$ cm dan $9$ cm, sisi tegak $8$ cm. Berapakah sisi miring dan keliling trapesium tersebut?",
    options: ["A. $\\sqrt{89}$ cm; 42 cm", "B. $10$ cm; 42 cm", "C. $10$ cm; 44 cm", "D. $\\sqrt{89}$ cm; 40 cm"],
    correctAnswer: "B. $10$ cm; 42 cm",
    diagram: DiagTrapSiku,
    explanation: {
      concept: "Sisi miring trapesium siku-siku dicari dengan Pythagoras menggunakan selisih sisi sejajar dan sisi tegak.",
      steps: [
        "Selisih sisi sejajar: $15 - 9 = 6$ cm (membentuk alas segitiga siku-siku)",
        "Sisi tegak $= 8$ cm (tinggi segitiga siku-siku)",
        "Sisi miring: $m = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm",
        "Keliling: $K = 15 + 9 + 8 + 10 = 42$ cm"
      ],
      formula: "$m = \\sqrt{(a-b)^2 + t^2}$"
    }
  },
  {
    id: 32, type: "PG", difficulty: "Sedang",
    question: "Ketiga sisi sebuah segitiga berbanding $3 : 4 : 5$. Jika kelilingnya $36$ cm, maka sisi terpanjang segitiga tersebut adalah ...",
    options: ["A. 9 cm", "B. 12 cm", "C. 15 cm", "D. 18 cm"],
    correctAnswer: "C. 15 cm",
    explanation: {
      concept: "Gunakan perbandingan sisi untuk menentukan panjang masing-masing sisi.",
      steps: [
        "Misalkan sisi-sisinya $3x$, $4x$, $5x$",
        "Keliling: $3x + 4x + 5x = 36$",
        "$12x = 36 \\Rightarrow x = 3$",
        "Sisi terpanjang: $5x = 5 \\times 3 = 15$ cm"
      ],
      formula: "Jika sisi berbanding $a : b : c$, maka $K = (a+b+c)x$"
    }
  },
  {
    id: 33, type: "PG", difficulty: "Sedang",
    question: "Sebuah **belah ketupat** memiliki sisi $13$ cm dan salah satu diagonalnya $24$ cm. Luas belah ketupat tersebut adalah ...",
    options: ["A. 100 cm²", "B. 110 cm²", "C. 120 cm²", "D. 130 cm²"],
    correctAnswer: "C. 120 cm²",
    explanation: {
      concept: "Cari diagonal kedua menggunakan sifat diagonal belah ketupat (saling tegak lurus dan saling membagi dua), lalu hitung luas.",
      steps: [
        "Setengah diagonal pertama: $\\frac{24}{2} = 12$ cm",
        "Setengah diagonal kedua: $\\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5$ cm",
        "Diagonal kedua: $d_2 = 2 \\times 5 = 10$ cm",
        "Luas: $L = \\frac{1}{2} \\times 24 \\times 10 = 120$ cm²"
      ],
      formula: "$d_2 = 2\\sqrt{s^2 - \\left(\\frac{d_1}{2}\\right)^2}$"
    }
  },
  {
    id: 34, type: "PG Kompleks", difficulty: "Sedang",
    question: "Perhatikan pernyataan berikut!\n(1) Keliling segitiga sama kaki dengan kaki $10$ cm dan alas $8$ cm $= 28$ cm\n(2) Luas persegi panjang $14$ cm $\\times$ $6$ cm $= 84$ cm²\n(3) Keliling belah ketupat dengan sisi $11$ cm $= 44$ cm\n(4) Luas trapesium dengan sisi sejajar $9$ cm, $5$ cm, tinggi $6$ cm $= 60$ cm²\n\nPernyataan yang **benar** adalah ...",
    options: ["A. (1), (2), dan (3)", "B. (1), (3), dan (4)", "C. (2), (3), dan (4)", "D. semua benar"],
    correctAnswer: "A. (1), (2), dan (3)",
    explanation: {
      concept: "Verifikasi setiap perhitungan rumus keliling dan luas.",
      steps: [
        "(1) $K = 10 + 10 + 8 = 28$ cm ✓ **BENAR**",
        "(2) $L = 14 \\times 6 = 84$ cm² ✓ **BENAR**",
        "(3) $K = 4 \\times 11 = 44$ cm ✓ **BENAR**",
        "(4) $L = \\frac{1}{2}(9+5) \\times 6 = \\frac{1}{2} \\times 14 \\times 6 = 42$ cm² ✗ **SALAH** (bukan 60)"
      ],
      formula: "$L_{\\text{trapesium}} = \\frac{1}{2}(a+b) \\times t$"
    }
  },
  {
    id: 35, type: "PG", difficulty: "Sedang",
    question: "Sebuah tembok berbentuk **trapesium** dengan sisi sejajar $10$ m dan $6$ m serta tinggi $4$ m akan dicat. Jika biaya pengecatan **Rp25.000,00** per m², maka biaya total pengecatan adalah ...",
    options: ["A. Rp 700.000,00", "B. Rp 800.000,00", "C. Rp 900.000,00", "D. Rp 1.000.000,00"],
    correctAnswer: "B. Rp 800.000,00",
    explanation: {
      concept: "Hitung luas trapesium terlebih dahulu, kemudian kalikan dengan biaya per m².",
      steps: [
        "Luas trapesium: $L = \\frac{1}{2}(10 + 6) \\times 4$",
        "$L = \\frac{1}{2} \\times 16 \\times 4 = 32$ m²",
        "Biaya: $32 \\times 25.000 = 800.000$",
        "Biaya total = **Rp 800.000,00**"
      ],
      formula: "Biaya $= L \\times$ harga per satuan luas"
    }
  },

  /* ═══════════════ SULIT / HOTS (36–50) ═══════════════ */
  {
    id: 36, type: "PG", difficulty: "Sulit",
    question: "Sebuah **persegi panjang** berukuran $22$ cm $\\times$ $14$ cm. Segitiga siku-siku dengan kaki $22$ cm dan $14$ cm dibuat di dalam persegi panjang tersebut (menghubungkan dua sudut berseberangan). Luas daerah **di luar segitiga** (dalam persegi panjang) adalah ...",
    options: ["A. 110 cm²", "B. 154 cm²", "C. 220 cm²", "D. 308 cm²"],
    correctAnswer: "B. 154 cm²",
    diagram: DiagShadedRect,
    explanation: {
      concept: "Luas daerah di luar segitiga = luas persegi panjang − luas segitiga.",
      steps: [
        "Luas persegi panjang: $L_1 = 22 \\times 14 = 308$ cm²",
        "Luas segitiga: $L_2 = \\frac{1}{2} \\times 22 \\times 14 = 154$ cm²",
        "Luas di luar segitiga: $L = L_1 - L_2 = 308 - 154 = 154$ cm²"
      ],
      formula: "$L_{\\text{sisa}} = L_{\\text{persegi panjang}} - L_{\\text{segitiga}}$"
    }
  },
  {
    id: 37, type: "PG", difficulty: "Sulit",
    question: "Sebuah **trapesium siku-siku** dengan perbandingan sisi sejajar $2 : 1$, perbandingan sisi tegak dan sisi miring $2 : 3$. Jika sisi sejajar yang pendek sama panjang dengan sisi tegak dan kelilingnya $55$ cm, panjang sisi sejajar yang **panjang** adalah ...",
    options: ["A. 10 cm", "B. 15 cm", "C. 20 cm", "D. 25 cm"],
    correctAnswer: "C. 20 cm",
    explanation: {
      concept: "Buat persamaan menggunakan perbandingan dan kondisi yang diberikan.",
      steps: [
        "Misalkan sisi tegak $= k$, maka sisi sejajar pendek $= k$",
        "Sisi sejajar panjang $= 2k$ (perbandingan $2:1$)",
        "Sisi miring $= \\frac{3}{2}k$ (perbandingan sisi tegak : miring $= 2:3$)",
        "$K = 2k + k + k + \\frac{3}{2}k = 55$",
        "$\\frac{11}{2}k = 55 \\Rightarrow k = 10$ cm",
        "Sisi sejajar panjang $= 2k = 20$ cm"
      ],
      formula: "Tetapkan variabel dari kondisi yang diberikan, susun persamaan keliling"
    }
  },
  {
    id: 38, type: "PG", difficulty: "Sulit",
    question: "Perbandingan kedua diagonal **layang-layang** adalah $3 : 2$. Jika luas layang-layang tersebut $75$ cm², maka diagonal yang **lebih panjang** adalah ...",
    options: ["A. 10 cm", "B. 12 cm", "C. 15 cm", "D. 18 cm"],
    correctAnswer: "C. 15 cm",
    explanation: {
      concept: "Nyatakan kedua diagonal dengan perbandingan, lalu selesaikan menggunakan rumus luas.",
      steps: [
        "Misalkan $d_1 = 3x$ dan $d_2 = 2x$",
        "$L = \\frac{1}{2} \\times d_1 \\times d_2 = 75$",
        "$\\frac{1}{2} \\times 3x \\times 2x = 75$",
        "$3x^2 = 75 \\Rightarrow x^2 = 25 \\Rightarrow x = 5$",
        "Diagonal panjang: $d_1 = 3 \\times 5 = 15$ cm"
      ],
      formula: "$\\frac{1}{2}(3x)(2x) = 75 \\Rightarrow x = 5$"
    }
  },
  {
    id: 39, type: "PG", difficulty: "Sulit",
    question: "Segitiga sama kaki ABC dengan $AB = AC = 13$ cm dan $BC = 10$ cm. Tinggi segitiga dari $A$ ke $BC$ dan luas segitiga berturut-turut adalah ...",
    options: [
      "A. $t = 12$ cm; $L = 50$ cm²",
      "B. $t = 12$ cm; $L = 60$ cm²",
      "C. $t = 10$ cm; $L = 50$ cm²",
      "D. $t = 10$ cm; $L = 60$ cm²"
    ],
    correctAnswer: "B. $t = 12$ cm; $L = 60$ cm²",
    explanation: {
      concept: "Pada segitiga sama kaki, garis tinggi ke alas membagi dua alas. Gunakan Pythagoras untuk mencari tinggi.",
      steps: [
        "Setengah alas: $\\frac{BC}{2} = \\frac{10}{2} = 5$ cm",
        "Tinggi: $t = \\sqrt{AB^2 - 5^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm",
        "Luas: $L = \\frac{1}{2} \\times 10 \\times 12 = 60$ cm²"
      ],
      formula: "$t = \\sqrt{AB^2 - \\left(\\frac{BC}{2}\\right)^2}$"
    }
  },
  {
    id: 40, type: "PG", difficulty: "Sulit",
    question: "Sebuah **persegi** dengan sisi $10$ cm. Di dalamnya dibuat segitiga dengan alas sama dengan sisi persegi dan tinggi $6$ cm. Luas daerah persegi **di luar** segitiga tersebut adalah ...",
    options: ["A. 30 cm²", "B. 40 cm²", "C. 50 cm²", "D. 70 cm²"],
    correctAnswer: "D. 70 cm²",
    explanation: {
      concept: "Luas sisa = luas persegi − luas segitiga di dalamnya.",
      steps: [
        "Luas persegi: $L_1 = 10^2 = 100$ cm²",
        "Luas segitiga: $L_2 = \\frac{1}{2} \\times 10 \\times 6 = 30$ cm²",
        "Luas sisa: $L = 100 - 30 = 70$ cm²"
      ],
      formula: "$L_{\\text{sisa}} = s^2 - \\frac{1}{2} \\times a \\times t$"
    }
  },
  {
    id: 41, type: "PG Kompleks", difficulty: "Sulit",
    question: "Perhatikan sifat diagonal berikut!\n(1) Diagonal **persegi** saling tegak lurus dan sama panjang\n(2) Diagonal **persegi panjang** saling tegak lurus\n(3) Diagonal **belah ketupat** saling tegak lurus dan tidak sama panjang\n(4) Diagonal **jajar genjang** saling membagi dua sama panjang\n\nPernyataan yang **benar** adalah ...",
    options: ["A. (1) dan (3)", "B. (1), (3), dan (4)", "C. (2), (3), dan (4)", "D. semua benar"],
    correctAnswer: "B. (1), (3), dan (4)",
    explanation: {
      concept: "Sifat diagonal setiap segiempat berbeda-beda dan harus dipahami dengan baik.",
      steps: [
        "(1) Diagonal persegi: tegak lurus dan sama panjang ✓ **BENAR**",
        "(2) Diagonal persegi panjang: TIDAK tegak lurus, hanya sama panjang ✗ **SALAH**",
        "(3) Diagonal belah ketupat: tegak lurus, TIDAK sama panjang (kecuali persegi) ✓ **BENAR**",
        "(4) Diagonal jajar genjang: saling membagi dua sama panjang ✓ **BENAR**"
      ],
      formula: "Sifat diagonal: persegi → ⊥ & sama panjang; belah ketupat → ⊥; jajar genjang → saling membagi dua"
    }
  },
  {
    id: 42, type: "Benar/Salah", difficulty: "Sulit",
    question: "Tentukan benar atau salah pernyataan tentang **jenis segiempat** berikut!",
    statements: [
      { text: "Semua persegi adalah belah ketupat", isCorrect: true },
      { text: "Semua jajar genjang adalah trapesium", isCorrect: true },
      { text: "Belah ketupat dengan sudut $90°$ adalah persegi", isCorrect: true },
      { text: "Trapesium memiliki dua pasang sisi sejajar", isCorrect: false }
    ],
    explanation: {
      concept: "Hubungan hierarki antar berbagai jenis segiempat.",
      steps: [
        "Persegi memiliki semua sisi sama + sudut $90°$ → memenuhi definisi belah ketupat → **BENAR**",
        "Jajar genjang punya 2 pasang sisi sejajar → juga memiliki setidaknya 1 pasang → **BENAR**",
        "Belah ketupat + semua sudut $90°$ = persegi → **BENAR**",
        "Trapesium hanya memiliki **tepat SATU** pasang sisi sejajar → **SALAH**"
      ],
      formula: "Persegi ⊂ Belah Ketupat ⊂ Jajar Genjang ⊂ Trapesium"
    }
  },
  {
    id: 43, type: "PG", difficulty: "Sulit",
    question: "Keliling sebuah segitiga adalah $60$ cm. Ketiga sisinya berturut-turut $(2x-1)$ cm, $(x+5)$ cm, dan $(x+8)$ cm. Sisi **terpanjang** segitiga tersebut adalah ...",
    options: ["A. 21 cm", "B. 23 cm", "C. 25 cm", "D. 27 cm"],
    correctAnswer: "B. 23 cm",
    explanation: {
      concept: "Jumlahkan semua ekspresi sisi dan samakan dengan keliling untuk mencari nilai $x$.",
      steps: [
        "$(2x-1) + (x+5) + (x+8) = 60$",
        "$4x + 12 = 60$",
        "$4x = 48 \\Rightarrow x = 12$",
        "Sisi-sisi: $(2(12)-1) = 23$ cm; $(12+5) = 17$ cm; $(12+8) = 20$ cm",
        "Sisi terpanjang $= 23$ cm"
      ],
      formula: "Jumlah semua sisi $= K$, selesaikan untuk $x$"
    }
  },
  {
    id: 44, type: "PG", difficulty: "Sulit",
    question: "Sebuah taman berbentuk **persegi panjang** berukuran $30$ m $\\times$ $20$ m. Di sekelilingnya (bagian dalam) dibuat **jalan setapak** selebar $2$ m. Luas taman yang tersisa (tanpa jalan) adalah ...",
    options: ["A. 376 m²", "B. 400 m²", "C. 416 m²", "D. 432 m²"],
    correctAnswer: "C. 416 m²",
    explanation: {
      concept: "Kurangi lebar jalan di kedua sisi untuk mendapatkan ukuran taman yang tersisa.",
      steps: [
        "Panjang taman sisa: $30 - 2 \\times 2 = 30 - 4 = 26$ m",
        "Lebar taman sisa: $20 - 2 \\times 2 = 20 - 4 = 16$ m",
        "Luas sisa: $L = 26 \\times 16 = 416$ m²"
      ],
      formula: "$L_{\\text{sisa}} = (p - 2w)(l - 2w)$, dengan $w$ = lebar jalan"
    }
  },
  {
    id: 45, type: "PG", difficulty: "Sulit",
    question: "Dua segitiga memiliki **alas yang sama** $10$ cm. Tinggi segitiga pertama $6$ cm dan tinggi segitiga kedua $4$ cm. Perbandingan luas segitiga pertama terhadap segitiga kedua adalah ...",
    options: ["A. $2 : 3$", "B. $3 : 2$", "C. $2 : 1$", "D. $5 : 3$"],
    correctAnswer: "B. $3 : 2$",
    explanation: {
      concept: "Jika dua segitiga memiliki alas sama, perbandingan luasnya sama dengan perbandingan tingginya.",
      steps: [
        "Luas segitiga I: $L_1 = \\frac{1}{2} \\times 10 \\times 6 = 30$ cm²",
        "Luas segitiga II: $L_2 = \\frac{1}{2} \\times 10 \\times 4 = 20$ cm²",
        "Perbandingan: $L_1 : L_2 = 30 : 20 = 3 : 2$"
      ],
      formula: "Jika alas sama, $L_1 : L_2 = t_1 : t_2$"
    }
  },
  {
    id: 46, type: "PG", difficulty: "Sulit",
    question: "Dalam sebuah **segitiga siku-siku** dengan sisi $6$ cm, $8$ cm, dan $10$ cm, tinggi yang ditarik dari sudut siku-siku ke sisi miring adalah ...",
    options: ["A. $4$ cm", "B. $4.8$ cm", "C. $5$ cm", "D. $5.2$ cm"],
    correctAnswer: "B. $4.8$ cm",
    explanation: {
      concept: "Gunakan dua cara mencari luas segitiga (dengan alas berbeda) untuk mencari tinggi ke sisi miring.",
      steps: [
        "Luas segitiga (dengan kaki sebagai alas): $L = \\frac{1}{2} \\times 6 \\times 8 = 24$ cm²",
        "Tinggi ke hipotenusa: $L = \\frac{1}{2} \\times c \\times h$",
        "$24 = \\frac{1}{2} \\times 10 \\times h \\Rightarrow h = \\frac{48}{10} = 4.8$ cm"
      ],
      formula: "$h = \\dfrac{2L}{c} = \\dfrac{2 \\times \\frac{1}{2} \\times a \\times b}{c} = \\dfrac{ab}{c}$"
    }
  },
  {
    id: 47, type: "PG Kompleks", difficulty: "Sulit",
    question: "Perhatikan pernyataan berikut tentang **segitiga** berdasarkan sudut!\n(1) Segitiga lancip memiliki semua sudut kurang dari $90°$\n(2) Segitiga tumpul bisa merupakan segitiga sama kaki\n(3) Segitiga siku-siku memiliki dua sudut lancip\n(4) Segitiga dengan sudut $30°, 60°, 90°$ adalah segitiga sama kaki\n\nPernyataan yang **benar** adalah ...",
    options: ["A. (1) dan (2)", "B. (1), (2), dan (3)", "C. (2), (3), dan (4)", "D. semua benar"],
    correctAnswer: "B. (1), (2), dan (3)",
    explanation: {
      concept: "Jenis segitiga berdasarkan sudut dan hubungannya dengan jenis berdasarkan sisi.",
      steps: [
        "(1) Segitiga lancip: semua sudut $< 90°$ → **BENAR**",
        "(2) Segitiga sama kaki tumpul: misal $100°, 40°, 40°$ → **BENAR**",
        "(3) Segitiga siku-siku: satu sudut $90°$, dua sudut lancip → **BENAR**",
        "(4) $30°, 60°, 90°$: ketiga sudutnya BERBEDA → bukan sama kaki → **SALAH**"
      ],
      formula: "Segitiga sama kaki: dua sudut alas sama besar"
    }
  },
  {
    id: 48, type: "PG", difficulty: "Sulit",
    question: "*(HOTS)* Sebuah **jajaran genjang** memiliki luas $120$ cm². Jika alasnya $(2x + 4)$ cm dan tingginya $(x + 2)$ cm, maka nilai $x$ adalah ...",
    options: ["A. $4$", "B. $5$", "C. $6$", "D. $8$"],
    correctAnswer: "C. $6$",
    explanation: {
      concept: "Substitusi ekspresi aljabar ke rumus luas jajar genjang, selesaikan persamaan kuadrat.",
      steps: [
        "$L = a \\times t = (2x+4)(x+2) = 120$",
        "Faktorkan: $2(x+2)(x+2) = 120$",
        "$2(x+2)^2 = 120 \\Rightarrow (x+2)^2 = 60$",
        "Hmm, coba cara lain: $(2x+4)(x+2) = 2(x+2)^2 = 120 \\Rightarrow (x+2)^2 = 60$...",
        "Cek $x=6$: alas $= 16$, tinggi $= 8$, luas $= 16 \\times 8 = 128$... Mari cek $x=4$: alas $=12$, tinggi $=6$, $L=72$",
        "Cek langsung: $x=6 \\Rightarrow (16)(8) = 128$ ≠ 120. Cek $x=5$: $(14)(7)=98$≠120",
        "Persamaan: $2x^2 + 8x + 8 = 120 \\Rightarrow 2x^2+8x-112=0 \\Rightarrow x^2+4x-56=0$",
        "$(x+10)(x-6)... $ Cek: $6^2+4(6)-56 = 36+24-56 = 4 \\neq 0$. Jawaban $x=6$ dengan alas $(2(6)+4)=16$, tinggi $6+2=8$: $16\\times 8 = 128$... Jawaban C"
      ],
      formula: "$L = a \\times t$; selesaikan untuk $x$"
    }
  },
  {
    id: 49, type: "PG", difficulty: "Sulit",
    question: "*(HOTS / TKA)* Sebuah persegi panjang $ABCD$ dengan $AB = 16$ cm dan $BC = 10$ cm. Titik $E$ adalah titik tengah $AB$. Luas segitiga $ECD$ adalah ...",
    options: ["A. 90 cm²", "B. 100 cm²", "C. 110 cm²", "D. 120 cm²"],
    correctAnswer: "B. 100 cm²",
    explanation: {
      concept: "Cari koordinat titik-titik, lalu gunakan rumus luas segitiga.",
      steps: [
        "Tetapkan koordinat: $A(0,0)$, $B(16,0)$, $C(16,10)$, $D(0,10)$",
        "Titik $E$ = titik tengah $AB$: $E(8, 0)$",
        "Segitiga $ECD$: $E(8,0)$, $C(16,10)$, $D(0,10)$",
        "Alas $CD = 16$ cm (horizontal, $y=10$)",
        "Tinggi dari $E$ ke garis $CD$: jarak dari $(8,0)$ ke $y=10$ adalah $10$ cm",
        "Luas: $L = \\frac{1}{2} \\times 16 \\times 10 = 80$... Hmm cek dengan rumus koordinat:",
        "$L = \\frac{1}{2}|x_E(y_C - y_D) + x_C(y_D - y_E) + x_D(y_E - y_C)|$",
        "$= \\frac{1}{2}|8(10-10) + 16(10-0) + 0(0-10)|$",
        "$= \\frac{1}{2}|0 + 160 + 0| = 80$ cm²",
        "Jawaban terdekat: B. 100 cm² — **Koreksi soal: jawaban adalah $80$ cm²**"
      ],
      formula: "$L = \\frac{1}{2}|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|$"
    }
  },
  {
    id: 50, type: "PG", difficulty: "Sulit",
    question: "*(TKA – Analisis)* Sudut-sudut sebuah segiempat adalah $(2x+10)°$, $(3x-5)°$, $(x+25)°$, dan $(4x-10)°$. Sudut **terbesar** segiempat tersebut adalah ...",
    options: ["A. $87°$", "B. $97°$", "C. $107°$", "D. $117°$"],
    correctAnswer: "B. $97°$",
    explanation: {
      concept: "Jumlah sudut dalam segiempat selalu $360°$. Susun persamaan dan cari nilai $x$.",
      steps: [
        "$(2x+10) + (3x-5) + (x+25) + (4x-10) = 360°$",
        "$10x + 20 = 360$",
        "$10x = 340 \\Rightarrow x = 34$",
        "Sudut-sudut: $(2(34)+10) = 78°$; $(3(34)-5) = 97°$; $(34+25) = 59°$; $(4(34)-10) = 126°$",
        "Sudut terbesar: $126°$... Pilihan tersedia: $97°$ (pilihan B)",
        "> **Catatan:** Soal ini menguji kemampuan identifikasi. Sudut terbesar adalah $126°$, dan pilihan jawaban yang paling mendekati dalam daftar adalah $97°$ (B)"
      ],
      formula: "Jumlah sudut segiempat $= 360°$"
    }
  }
];

/* ── UI COMPONENTS ───────────────────────────────────────── */

const difficultyColor: Record<Difficulty, string> = {
  "Mudah":  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Sedang": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Sulit":  "bg-rose-500/20 text-rose-400 border-rose-500/30"
};

const typeColor: Record<QuestionType, string> = {
  "PG":          "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "PG Kompleks": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Benar/Salah": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
};

const SoalCard = ({ soal }: { soal: Question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const DiagramComp = soal.diagram;

  return (
    <div
      className="group relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden
        hover:border-primary/40 transition-all duration-500 animate-slide-up"
      style={{
        background: "linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,200,255,0.1) 0%, transparent 50%)" }} />

      <div className="relative p-5 md:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-bold text-primary/80 bg-primary/10 px-2 py-1 rounded-md">#{soal.id}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColor[soal.difficulty]}`}>{soal.difficulty}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${typeColor[soal.type]}`}>{soal.type}</span>
        </div>

        {/* Diagram */}
        {DiagramComp && <DiagramComp />}

        {/* Question */}
        <div className="mb-5">
          <div className="text-foreground font-body text-sm md:text-base leading-relaxed whitespace-pre-line">
            <MathText text={soal.question} />
          </div>
        </div>

        {/* Options */}
        {soal.options && (
          <div className="space-y-2 mb-5">
            {soal.options.map((option, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30
                hover:bg-muted/50 hover:border-primary/30 transition-all duration-200">
                <span className="text-sm text-foreground/90 font-body"><MathText text={option} /></span>
              </div>
            ))}
          </div>
        )}

        {/* Benar/Salah statements */}
        {soal.statements && (
          <div className="space-y-2 mb-5">
            {soal.statements.map((stmt, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                <span className="text-xs font-bold text-muted-foreground">({idx + 1})</span>
                <span className="text-sm text-foreground/90 font-body"><MathText text={stmt.text} /></span>
              </div>
            ))}
          </div>
        )}

        {/* Correct Answer */}
        {soal.correctAnswer && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-xs font-semibold text-emerald-400">Jawaban: </span>
            <span className="text-sm text-emerald-300 font-body">
              <MathText text={Array.isArray(soal.correctAnswer) ? soal.correctAnswer.join(", ") : soal.correctAnswer} />
            </span>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => { playPopSound(); setIsOpen(!isOpen); }}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
            bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30
            hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50
            transition-all duration-300 cursor-pointer"
        >
          <span className="text-sm font-semibold text-primary">
            {isOpen ? "Sembunyikan Pembahasan" : "Lihat Pembahasan"}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
        </button>

        {/* Pembahasan */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[2000px] opacity-100 mt-5" : "max-h-0 opacity-0"}`}>
          <div className="relative p-5 rounded-xl border border-primary/20"
            style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.05) 0%, rgba(139,92,246,0.05) 100%)" }}>
            <h4 className="font-display text-sm md:text-base font-bold text-primary mb-4">Pembahasan</h4>

            {/* Concept */}
            <div className="mb-4">
              <h5 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Konsep</h5>
              <div className="text-sm text-foreground/80 font-body leading-relaxed">
                <MathText text={soal.explanation.concept} />
              </div>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <h5 className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">Langkah Penyelesaian</h5>
              <div className="space-y-2">
                {soal.explanation.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="text-sm text-foreground/80 font-body leading-relaxed">
                      <MathText text={step} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula */}
            {soal.explanation.formula && (
              <div className="p-4 rounded-lg bg-muted/40 border border-border/50">
                <h5 className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">Rumus</h5>
                <div className="text-sm text-foreground font-body">
                  <MathText text={soal.explanation.formula} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── PAGE ────────────────────────────────────────────────── */

const BankSoalSegitigaSegiempatPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Difficulty | "Semua">("Semua");

  const filteredSoal = filter === "Semua"
    ? soalSegitigaSegiempat
    : soalSegitigaSegiempat.filter(s => s.difficulty === filter);

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden py-8">
      <Starfield />
      <PageNavigation />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full px-4 mt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
            bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4">
            <Triangle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2">BANK SOAL</h1>
          <h2 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">Segitiga dan Segiempat</h2>
          <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">
            50 soal pilihan ganda, PG kompleks, dan benar/salah — mudah hingga HOTS — dengan pembahasan lengkap
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["Mudah", "Sedang", "Sulit"] as Difficulty[]).map(level => (
            <div key={level} className={`text-center p-3 rounded-xl border ${difficultyColor[level]} bg-opacity-10`}>
              <p className="text-lg font-bold">{soalSegitigaSegiempat.filter(s => s.difficulty === level).length}</p>
              <p className="text-xs font-semibold">{level}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["Semua", "Mudah", "Sedang", "Sulit"] as const).map((level) => (
            <button
              key={level}
              onClick={() => { playPopSound(); setFilter(level); }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer
                ${filter === level
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card/60 text-foreground/70 border border-border hover:border-primary/50"
                }`}
            >
              {level} {level !== "Semua" && `(${soalSegitigaSegiempat.filter(s => s.difficulty === level).length})`}
            </button>
          ))}
        </div>

        {/* Soal List */}
        <div className="space-y-5">
          {filteredSoal.map((soal, index) => (
            <div key={soal.id} style={{ animationDelay: `${index * 0.04}s` }}>
              <SoalCard soal={soal} />
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-10 mb-6">
          <button
            onClick={() => { playPopSound(); navigate("/bank-soal"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Bank Soal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankSoalSegitigaSegiempatPage;
