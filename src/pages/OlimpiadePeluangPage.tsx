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

// ─────────────────────────────────────────────────────────────────────────────
// SVG DIAGRAMS
// ─────────────────────────────────────────────────────────────────────────────

const DiagramPerkalian = () => (
  <svg viewBox="0 0 360 90" className="w-full max-w-sm mx-auto my-2" aria-label="Diagram Aturan Perkalian">
    <rect x="0" y="30" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="30" y="50" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">A</text>
    <rect x="150" y="30" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="180" y="50" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">P</text>
    <rect x="300" y="30" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="330" y="50" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">B</text>
    <line x1="60" y1="45" x2="148" y2="45" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrow1)"/>
    <text x="104" y="38" textAnchor="middle" fill="#fbbf24" fontSize="11">r cara</text>
    <line x1="210" y1="45" x2="298" y2="45" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrow1)"/>
    <text x="254" y="38" textAnchor="middle" fill="#fbbf24" fontSize="11">s cara</text>
    <text x="180" y="82" textAnchor="middle" fill="#86efac" fontSize="11">Total A→B = r × s cara</text>
    <defs>
      <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa"/>
      </marker>
    </defs>
  </svg>
);

const DiagramPenjumlahan = () => (
  <svg viewBox="0 0 320 110" className="w-full max-w-sm mx-auto my-2" aria-label="Diagram Aturan Penjumlahan">
    <rect x="10" y="15" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="40" y="35" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">A</text>
    <rect x="10" y="65" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="40" y="85" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">B</text>
    <rect x="240" y="40" width="60" height="30" rx="8" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
    <text x="270" y="60" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>
    <line x1="70" y1="30" x2="238" y2="50" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrow2)"/>
    <text x="155" y="28" textAnchor="middle" fill="#fbbf24" fontSize="11">r cara</text>
    <line x1="70" y1="80" x2="238" y2="60" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrow2)"/>
    <text x="155" y="90" textAnchor="middle" fill="#fbbf24" fontSize="11">s cara</text>
    <text x="160" y="108" textAnchor="middle" fill="#86efac" fontSize="11">Total ke C = r + s cara</text>
    <defs>
      <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa"/>
      </marker>
    </defs>
  </svg>
);

const DiagramSiklis = () => (
  <svg viewBox="0 0 180 180" className="w-36 h-36 mx-auto my-2" aria-label="Diagram Permutasi Siklis">
    <circle cx="90" cy="90" r="60" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5,3"/>
    {[["A",90,20],["B",160,90],["C",90,160],["D",20,90]].map(([lbl,cx,cy])=>(
      <g key={String(lbl)}>
        <circle cx={Number(cx)} cy={Number(cy)} r="14" fill="#1e3a5f" stroke="#a78bfa" strokeWidth="1.5"/>
        <text x={Number(cx)} y={Number(cy)+5} textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="bold">{lbl}</text>
      </g>
    ))}
    <text x="90" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11">(n−1)!</text>
  </svg>
);

const DiagramVenn = () => (
  <svg viewBox="0 0 260 130" className="w-full max-w-xs mx-auto my-2" aria-label="Diagram Venn Kejadian Majemuk">
    <rect x="5" y="5" width="250" height="120" rx="10" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="5,3"/>
    <circle cx="95" cy="65" r="48" fill="#3b82f620" stroke="#60a5fa" strokeWidth="1.5"/>
    <circle cx="165" cy="65" r="48" fill="#a78bfa20" stroke="#a78bfa" strokeWidth="1.5"/>
    <text x="68" y="68" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold">A</text>
    <text x="192" y="68" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="bold">B</text>
    <text x="130" y="68" textAnchor="middle" fill="#fbbf24" fontSize="11">A∩B</text>
    <text x="130" y="120" textAnchor="middle" fill="#86efac" fontSize="10">S (Ruang Sampel)</text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// MATERI SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

const Kotak = ({ children, warna = "biru" }: { children: React.ReactNode; warna?: string }) => {
  const cls = warna === "ungu"
    ? "bg-purple-900/20 border border-purple-400/30"
    : warna === "kuning"
    ? "bg-yellow-900/20 border border-yellow-400/30"
    : warna === "hijau"
    ? "bg-green-900/20 border border-green-400/30"
    : "bg-blue-900/20 border border-blue-400/30";
  return <div className={`${cls} rounded-lg px-3 py-2 text-xs my-1`}>{children}</div>;
};

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-2 border-yellow-400 bg-yellow-900/10 pl-3 py-1 text-xs text-yellow-200 my-1 rounded-r">
    💡 {children}
  </div>
);

const ContohLabel = ({ no, level }: { no: number; level: string }) => {
  const color = level === "Mudah" ? "text-green-400" : level === "Sedang" ? "text-yellow-400" : "text-red-400";
  return (
    <div className={`font-bold text-xs mt-3 mb-1 ${color}`}>
      Contoh {no} <span className="text-muted-foreground font-normal">({level})</span>
    </div>
  );
};

const Pembahasan = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted/20 rounded px-3 py-2 text-xs mt-1 space-y-1 border-l-2 border-accent/40">
    <div className="text-accent font-semibold text-[10px] uppercase tracking-wide mb-1">Pembahasan</div>
    {children}
  </div>
);

const materiSections = [
  {
    heading: "A. Notasi Faktorial",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Faktorial</strong> adalah cara singkat menuliskan perkalian bilangan bulat positif berurutan dari 1 hingga n, dinotasikan <strong>n!</strong> (dibaca "n faktorial").</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus Utama</div>
          <div>{renderWithLatex('$n! = n \\times (n-1) \\times (n-2) \\times \\cdots \\times 2 \\times 1$')}</div>
          <div className="mt-1">{renderWithLatex('Dengan kesepakatan: $0! = 1$ dan $1! = 1$')}</div>
        </Kotak>
        <Tip>Faktorial tumbuh sangat cepat. 10! = 3.628.800 — bayangkan betapa banyaknya susunan yang bisa dibuat!</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Hitung nilai dari {renderWithLatex('$4!$')}</p>
        <Pembahasan>
          <div>{renderWithLatex('$4! = 4 \\times 3 \\times 2 \\times 1 = \\mathbf{24}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Hitung {renderWithLatex('$0! + 1! + 2! + 3!$')}</p>
        <Pembahasan>
          <div>{renderWithLatex('$0! = 1,\\quad 1! = 1,\\quad 2! = 2,\\quad 3! = 6$')}</div>
          <div>{renderWithLatex('Jumlah $= 1 + 1 + 2 + 6 = \\mathbf{10}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Sederhanakan {renderWithLatex('$\\dfrac{8!}{6!}$')}</p>
        <Pembahasan>
          <div>{renderWithLatex('$\\dfrac{8!}{6!} = \\dfrac{8 \\times 7 \\times \\cancel{6!}}{\\cancel{6!}} = 8 \\times 7 = \\mathbf{56}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Tentukan nilai {renderWithLatex('$n$')} jika {renderWithLatex('$\\dfrac{n!}{(n-2)!} = 30$')}</p>
        <Pembahasan>
          <div>{renderWithLatex('$\\dfrac{n!}{(n-2)!} = n(n-1) = 30$')}</div>
          <div>{renderWithLatex('$n^2 - n - 30 = 0 \\Rightarrow (n-6)(n+5) = 0$')}</div>
          <div>{renderWithLatex('Karena $n > 0$, maka $n = \\mathbf{6}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Hitung nilai dari {renderWithLatex('$\\dfrac{(n+2)!}{n! \\cdot 2}$')} untuk {renderWithLatex('$n = 5$')}</p>
        <Pembahasan>
          <div>{renderWithLatex('$\\dfrac{(5+2)!}{5! \\cdot 2} = \\dfrac{7!}{5! \\cdot 2} = \\dfrac{7 \\times 6 \\times \\cancel{5!}}{\\cancel{5!} \\times 2} = \\dfrac{42}{2} = \\mathbf{21}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "B. Kaidah Pencacahan",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Kaidah Pencacahan</strong> adalah teknik menghitung banyak cara suatu kejadian dapat terjadi tanpa harus mendaftar semua kemungkinan satu per satu. Ada dua aturan utama: <strong>Aturan Perkalian</strong> dan <strong>Aturan Penjumlahan</strong>.</p>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-2">① Aturan Perkalian</div>
        <p>Digunakan saat peristiwa dilakukan <strong>secara berurutan (berpasangan)</strong>. Jika tahap 1 ada {renderWithLatex('$r_1$')} cara, tahap 2 ada {renderWithLatex('$r_2$')} cara, ..., maka total:</p>
        <Kotak warna="ungu">
          <div className="text-center">{renderWithLatex('$\\text{Total} = r_1 \\times r_2 \\times \\cdots \\times r_n$')}</div>
        </Kotak>
        <DiagramPerkalian/>

        <div className="font-bold text-accent text-xs mt-2">② Aturan Penjumlahan</div>
        <p>Digunakan saat peristiwa bersifat <strong>saling lepas (pilih salah satu)</strong>. Jika ada {renderWithLatex('$r_1$')} cara untuk kejadian 1, {renderWithLatex('$r_2$')} cara untuk kejadian 2, ..., maka total:</p>
        <Kotak warna="ungu">
          <div className="text-center">{renderWithLatex('$\\text{Total} = r_1 + r_2 + \\cdots + r_n$')}</div>
        </Kotak>
        <DiagramPenjumlahan/>

        <Tip>Kunci membedakan: jika kamu melakukan kejadian A <em>lalu</em> B → pakai perkalian. Jika kamu memilih A <em>atau</em> B → pakai penjumlahan.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Ada 4 jalan dari kota A ke kota P dan 3 jalan dari P ke B. Berapa banyak rute dari A ke B melalui P?</p>
        <Pembahasan>
          <div>Kejadian berurutan → gunakan aturan perkalian.</div>
          <div>{renderWithLatex('$\\text{Total} = 4 \\times 3 = \\mathbf{12 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Dari kota X ke kota Y tersedia 3 bus, 2 kapal laut, dan 1 pesawat. Berapa banyak cara memilih kendaraan?</p>
        <Pembahasan>
          <div>Pilih salah satu kendaraan → gunakan aturan penjumlahan.</div>
          <div>{renderWithLatex('$\\text{Total} = 3 + 2 + 1 = \\mathbf{6 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Pengurus kelas (1 ketua pria + 1 sekretaris wanita) akan dipilih dari 8 siswa pria dan 10 siswi. Berapa banyak cara pemilihan?</p>
        <Pembahasan>
          <div>Pilih pria (8 cara) <em>lalu</em> pilih wanita (10 cara) → perkalian.</div>
          <div>{renderWithLatex('$\\text{Total} = 8 \\times 10 = \\mathbf{80 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Berapa banyak bilangan <strong>ganjil</strong> 5 digit berbeda yang dapat disusun dari angka {renderWithLatex('$\\{1, 2, 3, 4, 5, 6, 7, 8\\}$')}?</p>
        <Pembahasan>
          <div>Digit terakhir harus ganjil: {renderWithLatex('$\\{1,3,5,7\\}$')} → 4 pilihan.</div>
          <div>Digit 1 s.d. 4 dari sisa 7 angka: {renderWithLatex('$7 \\times 6 \\times 5 \\times 4$')}</div>
          <div>{renderWithLatex('$\\text{Total} = 7 \\times 6 \\times 5 \\times 4 \\times 4 = \\mathbf{3.360 \\text{ bilangan}}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Berapa banyak bilangan ribuan yang <strong>lebih dari 3.000</strong> dengan angka berbeda yang dapat dibentuk dari {renderWithLatex('$\\{0,1,2,3,5,6,9\\}$')}?</p>
        <Pembahasan>
          <div>Bilangan ribuan → 4 digit. Digit pertama ≥ 3 dan bukan 0: {renderWithLatex('$\\{3,5,6,9\\}$')} → 4 pilihan.</div>
          <div>Digit 2, 3, 4 dari sisa 6 angka (termasuk 0): {renderWithLatex('$6 \\times 5 \\times 4$')}</div>
          <div>{renderWithLatex('$\\text{Total} = 4 \\times 6 \\times 5 \\times 4 = \\mathbf{480 \\text{ bilangan}}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "C. Permutasi",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Permutasi</strong> adalah susunan yang <strong>memperhatikan urutan</strong>. Jika kamu menyusun A-B-C berbeda dari C-B-A, itu permutasi. Ada 4 jenis permutasi yang perlu kamu kuasai.</p>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-2">① Permutasi Semua Unsur Berbeda (ambil semua)</div>
        <Kotak warna="ungu">
          <div>{renderWithLatex('$P(n,n) = n!$')}</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">② Permutasi Sebagian Unsur (ambil r dari n)</div>
        <Kotak warna="ungu">
          <div>{renderWithLatex('$P(n,r) = \\dfrac{n!}{(n-r)!}$')}</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">③ Permutasi dengan Unsur Sama</div>
        <Kotak warna="ungu">
          <div>{renderWithLatex('$P = \\dfrac{n!}{k_1! \\cdot k_2! \\cdots k_m!}$')}</div>
          <div className="text-muted-foreground mt-1">di mana {renderWithLatex('$k_i$')} adalah banyak unsur yang identik.</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">④ Permutasi Siklis (Melingkar)</div>
        <div className="flex items-center gap-4">
          <DiagramSiklis/>
          <Kotak warna="ungu">
            <div>{renderWithLatex('$P_{siklis} = (n-1)!$')}</div>
            <div className="text-muted-foreground mt-1">Satu elemen dianggap tetap sebagai patokan lingkaran.</div>
          </Kotak>
        </div>

        <Tip>Permutasi vs Kombinasi: jika urutan penting (jabatan, posisi, nomor) → Permutasi. Jika tidak penting (tim, kelompok) → Kombinasi.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Berapa banyak cara menyusun 5 buku berbeda di rak?</p>
        <Pembahasan>
          <div>Semua 5 buku disusun → {renderWithLatex('$P(5,5) = 5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = \\mathbf{120 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Seorang programmer membuat password 4 huruf dari {renderWithLatex('$\\{A,B,C,D,E,F,G,H\\}$')} tanpa pengulangan. Berapa banyak password yang mungkin?</p>
        <Pembahasan>
          <div>{renderWithLatex('$P(8,4) = \\dfrac{8!}{(8-4)!} = \\dfrac{8!}{4!} = 8 \\times 7 \\times 6 \\times 5 = \\mathbf{1.680 \\text{ password}}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Berapa banyak susunan huruf berbeda dari kata <strong>STATISTIKA</strong>?</p>
        <Pembahasan>
          <div>Huruf: S(2×), T(3×), A(2×), I(1×), K(1×) → total 10 huruf.</div>
          <div>{renderWithLatex('$P = \\dfrac{10!}{2! \\cdot 3! \\cdot 2! \\cdot 1! \\cdot 1!} = \\dfrac{3.628.800}{2 \\times 6 \\times 2} = \\mathbf{151.200 \\text{ susunan}}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Berapa banyak cara 6 orang dapat duduk mengelilingi meja bundar?</p>
        <Pembahasan>
          <div>Permutasi siklis 6 orang:</div>
          <div>{renderWithLatex('$P_{siklis} = (6-1)! = 5! = \\mathbf{120 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Tujuh orang akan duduk melingkari meja. Dua orang istimewa (X dan Y) harus selalu berdampingan. Berapa banyak cara?</p>
        <Pembahasan>
          <div>X dan Y diikat jadi satu "blok" → sekarang ada 6 "orang".</div>
          <div>Permutasi siklis 6: {renderWithLatex('$(6-1)! = 5! = 120$')}</div>
          <div>X dan Y dalam blok bisa bertukar: {renderWithLatex('$2! = 2$')}</div>
          <div>{renderWithLatex('$\\text{Total} = 120 \\times 2 = \\mathbf{240 \\text{ cara}}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "D. Kombinasi",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Kombinasi</strong> adalah pemilihan yang <strong>tidak memperhatikan urutan</strong>. Tim {"{A,B,C}"} sama saja dengan {"{C,A,B}"}. Kombinasi dipakai saat kamu memilih anggota kelompok, soal, atau objek tanpa peduli urutannya.</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus Kombinasi</div>
          <div>{renderWithLatex('$C(n,r) = \\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}$')}</div>
          <div className="text-muted-foreground mt-1">Membaca: "pilih r dari n tanpa memperhatikan urutan"</div>
        </Kotak>
        <Tip>Hubungan Permutasi & Kombinasi: {renderWithLatex('$P(n,r) = C(n,r) \\times r!$')} — Permutasi "lebih banyak" karena memperhitungkan urutan.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Berapa banyak cara memilih 2 perwakilan dari 6 orang?</p>
        <Pembahasan>
          <div>{renderWithLatex('$C(6,2) = \\dfrac{6!}{2! \\cdot 4!} = \\dfrac{6 \\times 5}{2} = \\mathbf{15 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Dalam ulangan, siswa wajib menjawab 5 dari 8 soal. Berapa banyak pilihan soal yang dapat dibuat?</p>
        <Pembahasan>
          <div>Urutan soal tidak penting → kombinasi.</div>
          <div>{renderWithLatex('$C(8,5) = \\dfrac{8!}{5! \\cdot 3!} = \\dfrac{8 \\times 7 \\times 6}{6} = \\mathbf{56 \\text{ pilihan}}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Siswa harus mengerjakan 8 dari 10 soal ujian. Soal nomor 1, 2, dan 3 wajib dikerjakan. Berapa banyak cara memilih?</p>
        <Pembahasan>
          <div>3 soal wajib sudah pasti dipilih → sisa harus memilih {renderWithLatex('$8-3=5$')} soal dari {renderWithLatex('$10-3=7$')} soal bebas.</div>
          <div>{renderWithLatex('$C(7,5) = \\dfrac{7!}{5! \\cdot 2!} = \\dfrac{7 \\times 6}{2} = \\mathbf{21 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Delegasi 5 orang dipilih dari 6 pria dan 4 wanita. Hitung banyak cara jika <strong>minimal 2 wanita</strong> harus ada.</p>
        <Pembahasan>
          <div>Kasus yang memenuhi: tepat 2W, tepat 3W, tepat 4W.</div>
          <div>{renderWithLatex('$C(4,2)\\cdot C(6,3) + C(4,3)\\cdot C(6,2) + C(4,4)\\cdot C(6,1)$')}</div>
          <div>{renderWithLatex('$= 6 \\times 20 + 4 \\times 15 + 1 \\times 6 = 120 + 60 + 6 = \\mathbf{186 \\text{ cara}}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Pada bidang terdapat 10 titik, tidak ada 3 yang segaris. Berapa banyak segitiga yang dapat dibentuk?</p>
        <Pembahasan>
          <div>Setiap segitiga membutuhkan tepat 3 titik. Urutan tidak penting.</div>
          <div>{renderWithLatex('$C(10,3) = \\dfrac{10!}{3! \\cdot 7!} = \\dfrac{10 \\times 9 \\times 8}{6} = \\mathbf{120 \\text{ segitiga}}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "E. Ruang Sampel",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Ruang Sampel (S)</strong> adalah himpunan semua hasil yang mungkin muncul dari sebuah percobaan. Setiap anggota ruang sampel disebut <strong>titik sampel</strong>, dan banyaknya titik sampel dilambangkan {renderWithLatex('$n(S)$')}.</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus Praktis</div>
          <div>Jika tiap objek punya {renderWithLatex('$k$')} kemungkinan hasil dan ada {renderWithLatex('$n$')} objek:</div>
          <div className="mt-1">{renderWithLatex('$n(S) = k^n$')}</div>
        </Kotak>
        <Tip>Visualisasikan dengan tabel atau diagram pohon untuk menemukan seluruh anggota ruang sampel secara sistematis.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Sebuah koin dilempar sekali. Tuliskan ruang sampelnya.</p>
        <Pembahasan>
          <div>Sisi koin: Angka (A) dan Gambar (G).</div>
          <div>{renderWithLatex('$S = \\{A, G\\}$')}, {renderWithLatex('$n(S) = 2$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Dua koin dilempar bersamaan. Tuliskan ruang sampelnya.</p>
        <Pembahasan>
          <div>{renderWithLatex('$S = \\{AA, AG, GA, GG\\}$')}, {renderWithLatex('$n(S) = 2^2 = 4$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Tiga koin dilempar bersamaan. Berapa banyak anggota ruang sampelnya? Tuliskan semua kejadian "tepat 2 Angka".</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = 2^3 = 8$')}</div>
          <div>Ruang sampel: {renderWithLatex('$\\{AAA, AAG, AGA, AGG, GAA, GAG, GGA, GGG\\}$')}</div>
          <div>Kejadian tepat 2A: {renderWithLatex('$\\{AAG, AGA, GAA\\}$')} → 3 titik sampel.</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Dua dadu dilempar bersamaan. Berapa banyak anggota ruang sampelnya? Tentukan kejadian munculnya jumlah mata dadu = 7.</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = 6^2 = 36$')}</div>
          <div>Jumlah = 7: {renderWithLatex('$\\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\\}$')}</div>
          <div>{renderWithLatex('$n(E) = 6$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Sebuah dadu dan sebuah koin dilempar bersamaan. Tentukan ruang sampel dan banyak titik sampel kejadian "angka pada koin dan bilangan genap pada dadu".</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = 2 \\times 6 = 12$')}</div>
          <div>Kejadian A = koin Angka ∩ dadu genap {renderWithLatex('$\\{2,4,6\\}$')}:</div>
          <div>{renderWithLatex('$A = \\{(A,2),(A,4),(A,6)\\}$')}, {renderWithLatex('$n(A) = 3$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "F. Peluang",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Peluang (Probabilitas)</strong> mengukur seberapa besar kemungkinan suatu kejadian terjadi. Nilainya selalu berada di antara 0 (mustahil) sampai 1 (pasti terjadi).</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus Peluang</div>
          <div>{renderWithLatex('$P(A) = \\dfrac{n(A)}{n(S)}$')}</div>
          <div className="mt-1 space-y-1">
            <div>{renderWithLatex('$0 \\leq P(A) \\leq 1$')}</div>
            <div>{renderWithLatex('$P(S) = 1$ (kejadian pasti)')}</div>
            <div>{renderWithLatex('$P(\\emptyset) = 0$ (kejadian mustahil)')}</div>
          </div>
        </Kotak>
        <Tip>Peluang bisa dinyatakan sebagai pecahan, desimal, atau persentase. {renderWithLatex('$P = \\frac{1}{4} = 0{,}25 = 25\\%$')}</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Sebuah dadu dilempar sekali. Berapa peluang muncul bilangan prima?</p>
        <Pembahasan>
          <div>{renderWithLatex('$S = \\{1,2,3,4,5,6\\}$')}, {renderWithLatex('$n(S) = 6$')}</div>
          <div>Prima: {renderWithLatex('$\\{2,3,5\\}$')}, {renderWithLatex('$n(A) = 3$')}</div>
          <div>{renderWithLatex('$P(A) = \\dfrac{3}{6} = \\mathbf{\\dfrac{1}{2}}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Dari kata MATEMATIKA, dipilih satu huruf secara acak. Berapa peluang terpilih huruf A?</p>
        <Pembahasan>
          <div>Huruf: M-A-T-E-M-A-T-I-K-A → 10 huruf, huruf A ada 3.</div>
          <div>{renderWithLatex('$P(A) = \\dfrac{3}{10}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Dua dadu dilempar. Berapa peluang jumlah mata dadu = 9?</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = 36$')}</div>
          <div>Jumlah 9: {renderWithLatex('$\\{(3,6),(4,5),(5,4),(6,3)\\}$')}, {renderWithLatex('$n(E) = 4$')}</div>
          <div>{renderWithLatex('$P(E) = \\dfrac{4}{36} = \\mathbf{\\dfrac{1}{9}}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Kotak berisi 5 bola merah dan 4 bola biru. Diambil 2 bola sekaligus. Berapa peluang keduanya berwarna biru?</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = C(9,2) = \\dfrac{9 \\times 8}{2} = 36$')}</div>
          <div>{renderWithLatex('$n(E) = C(4,2) = 6$')}</div>
          <div>{renderWithLatex('$P(E) = \\dfrac{6}{36} = \\mathbf{\\dfrac{1}{6}}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Dalam kotak ada 10 jeruk manis dan 5 jeruk masam, tampak sama. Ana mengambil 2 jeruk sekaligus. Berapa peluang dua jeruk yang diambil memiliki rasa yang sama?</p>
        <Pembahasan>
          <div>{renderWithLatex('$n(S) = C(15,2) = 105$')}</div>
          <div>Dua manis: {renderWithLatex('$C(10,2) = 45$')}. Dua masam: {renderWithLatex('$C(5,2) = 10$')}</div>
          <div>{renderWithLatex('$P(\\text{sama}) = \\dfrac{45+10}{105} = \\dfrac{55}{105} = \\mathbf{\\dfrac{11}{21}}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "G. Frekuensi Harapan",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Frekuensi Harapan</strong> adalah perkiraan berapa kali suatu kejadian akan muncul jika percobaan dilakukan sebanyak {renderWithLatex('$n$')} kali. Ini bukan jaminan, melainkan prediksi berdasarkan peluang teoritis.</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus</div>
          <div>{renderWithLatex('$F_h = n \\times P(A)$')}</div>
          <div className="mt-1 text-muted-foreground">
            <div>{renderWithLatex('$F_h$')} = frekuensi harapan</div>
            <div>{renderWithLatex('$n$')} = banyak percobaan</div>
            <div>{renderWithLatex('$P(A)$')} = peluang kejadian A</div>
          </div>
        </Kotak>
        <Tip>Frekuensi harapan bisa berupa bilangan desimal. Misalnya, {renderWithLatex('$F_h = 13{,}3$')} berarti "sekitar 13 kali" — tidak harus bilangan bulat.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Peluang seorang penembak mengenai sasaran adalah {renderWithLatex('$\\dfrac{1}{5}$')}. Jika dia menembak 150 kali, berapa kali diharapkan mengenai sasaran?</p>
        <Pembahasan>
          <div>{renderWithLatex('$F_h = 150 \\times \\dfrac{1}{5} = \\mathbf{30 \\text{ kali}}$')}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Sebuah dadu dilempar 300 kali. Berapa kali diharapkan muncul angka 6?</p>
        <Pembahasan>
          <div>{renderWithLatex('$P(6) = \\dfrac{1}{6}$')}</div>
          <div>{renderWithLatex('$F_h = 300 \\times \\dfrac{1}{6} = \\mathbf{50 \\text{ kali}}$')}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Dua koin dilempar 200 kali. Berapa kali diharapkan muncul tepat satu gambar?</p>
        <Pembahasan>
          <div>{renderWithLatex('$S = \\{AA,AG,GA,GG\\}$')}, {renderWithLatex('$n(S)=4$')}</div>
          <div>Tepat 1G: {renderWithLatex('$\\{AG,GA\\}$')}, {renderWithLatex('$P = \\dfrac{2}{4} = \\dfrac{1}{2}$')}</div>
          <div>{renderWithLatex('$F_h = 200 \\times \\dfrac{1}{2} = \\mathbf{100 \\text{ kali}}$')}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Dari seperangkat kartu bridge (52 kartu), diambil satu kartu kemudian dikembalikan, sebanyak 260 kali. Berapa kali diharapkan terambil kartu As?</p>
        <Pembahasan>
          <div>Ada 4 kartu As dari 52 kartu: {renderWithLatex('$P(As) = \\dfrac{4}{52} = \\dfrac{1}{13}$')}</div>
          <div>{renderWithLatex('$F_h = 260 \\times \\dfrac{1}{13} = \\mathbf{20 \\text{ kali}}$')}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Peluang sebuah mesin gagal produksi adalah 0,03. Jika mesin beroperasi 5.000 siklus, berapa kali diharapkan terjadi kegagalan? Juga, berapa kali mesin diharapkan berhasil?</p>
        <Pembahasan>
          <div>Frekuensi harapan gagal: {renderWithLatex('$F_h = 5.000 \\times 0{,}03 = \\mathbf{150 \\text{ kali}}$')}</div>
          <div>Peluang berhasil: {renderWithLatex('$P(\\text{berhasil}) = 1 - 0{,}03 = 0{,}97$')}</div>
          <div>Frekuensi harapan berhasil: {renderWithLatex('$F_h = 5.000 \\times 0{,}97 = \\mathbf{4.850 \\text{ kali}}$')}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "H. Komplemen Suatu Kejadian",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Komplemen kejadian A</strong>, ditulis {renderWithLatex("$A'$")} atau {renderWithLatex("$A^c$")}, adalah himpunan semua kejadian di ruang sampel yang <strong>bukan</strong> merupakan anggota A. Trik komplemen sangat berguna saat menghitung "minimal satu" atau "sekurang-kurangnya".</p>
        </Kotak>
        <Kotak warna="ungu">
          <div className="font-bold text-purple-300 mb-1">Rumus Komplemen</div>
          <div>{renderWithLatex("$P(A') = 1 - P(A)$")}</div>
          <div className="mt-1">{renderWithLatex("$P(A) + P(A') = 1$")}</div>
        </Kotak>
        <Tip>Jika soal menyebutkan "minimal", "sekurang-kurangnya", atau "paling sedikit" → pikirkan komplemen. Biasanya lebih mudah menghitung yang "tidak memenuhi" lalu dikurangi dari 1.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Peluang hari esok hujan adalah 0,45. Berapa peluang hari esok tidak hujan?</p>
        <Pembahasan>
          <div>{renderWithLatex("$P(\\text{tidak hujan}) = 1 - 0{,}45 = \\mathbf{0{,}55}$")}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Sebuah dadu dilempar sekali. Berapa peluang muncul angka yang <strong>bukan</strong> bilangan prima?</p>
        <Pembahasan>
          <div>{renderWithLatex("$P(\\text{prima}) = \\dfrac{3}{6} = \\dfrac{1}{2}$")}</div>
          <div>{renderWithLatex("$P(\\text{bukan prima}) = 1 - \\dfrac{1}{2} = \\mathbf{\\dfrac{1}{2}}$")}</div>
          <div className="text-muted-foreground">Bukan prima: {renderWithLatex("$\\{1,4,6\\}$")}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Tiga koin dilempar bersamaan. Berapa peluang muncul <strong>sekurang-kurangnya satu gambar</strong>?</p>
        <Pembahasan>
          <div>Komplemen = tidak ada gambar (semua angka) = {renderWithLatex("$\\{AAA\\}$")}</div>
          <div>{renderWithLatex("$P(\\text{semua angka}) = \\dfrac{1}{8}$")}</div>
          <div>{renderWithLatex("$P(\\text{min. 1 gambar}) = 1 - \\dfrac{1}{8} = \\mathbf{\\dfrac{7}{8}}$")}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Kotak berisi 5 bola merah, 3 bola biru, 2 bola hijau. Diambil 1 bola secara acak. Berapa peluang yang terambil <strong>bukan bola merah</strong>?</p>
        <Pembahasan>
          <div>{renderWithLatex("$P(\\text{merah}) = \\dfrac{5}{10} = \\dfrac{1}{2}$")}</div>
          <div>{renderWithLatex("$P(\\text{bukan merah}) = 1 - \\dfrac{1}{2} = \\mathbf{\\dfrac{1}{2}}$")}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Dua dadu dilempar bersamaan. Berapa peluang muncul jumlah mata dadu <strong>kurang dari atau sama dengan 10</strong>?</p>
        <Pembahasan>
          <div>Komplemen = jumlah {renderWithLatex("$> 10$")}: {renderWithLatex("$\\{(5,6),(6,5),(6,6)\\}$")}, ada 3 cara.</div>
          <div>{renderWithLatex("$P(\\text{jumlah}>10) = \\dfrac{3}{36} = \\dfrac{1}{12}$")}</div>
          <div>{renderWithLatex("$P(\\text{jumlah} \\leq 10) = 1 - \\dfrac{1}{12} = \\mathbf{\\dfrac{11}{12}}$")}</div>
        </Pembahasan>
      </div>
    )
  },
  {
    heading: "I. Kejadian Majemuk",
    renderContent: () => (
      <div className="space-y-2 text-xs">
        <Kotak warna="biru">
          <p><strong>Kejadian Majemuk</strong> terjadi saat dua atau lebih kejadian digabungkan dengan operasi "atau" (∪) maupun "dan" (∩). Ada tiga jenis hubungan penting antar kejadian.</p>
        </Kotak>
        <DiagramVenn/>

        <div className="font-bold text-accent text-xs mt-1">① Saling Lepas (Mutually Exclusive)</div>
        <Kotak warna="ungu">
          <div>Tidak ada irisan: {renderWithLatex("$P(A \\cap B) = 0$")}</div>
          <div className="mt-1">{renderWithLatex("$P(A \\cup B) = P(A) + P(B)$")}</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">② Tidak Saling Lepas</div>
        <Kotak warna="ungu">
          <div>Ada irisan, jadi harus dikurangi agar tidak dihitung dua kali:</div>
          <div className="mt-1">{renderWithLatex("$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$")}</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">③ Saling Bebas (Independent)</div>
        <Kotak warna="ungu">
          <div>Kejadian A tidak mempengaruhi B:</div>
          <div className="mt-1">{renderWithLatex("$P(A \\cap B) = P(A) \\times P(B)$")}</div>
        </Kotak>

        <div className="font-bold text-accent text-xs mt-1">④ Bersyarat (Conditional)</div>
        <Kotak warna="ungu">
          <div>Kejadian A mempengaruhi peluang B:</div>
          <div className="mt-1">{renderWithLatex("$P(A \\cap B) = P(A) \\times P(B|A)$")}</div>
          <div className="text-muted-foreground">{renderWithLatex("$P(B|A)$")} = peluang B terjadi dengan syarat A telah terjadi</div>
        </Kotak>

        <Tip>Pengambilan <em>dengan pengembalian</em> → kejadian saling bebas. Pengambilan <em>tanpa pengembalian</em> → kejadian bersyarat.</Tip>

        <ContohLabel no={1} level="Mudah"/>
        <p>Sebuah dadu dilempar. A = muncul angka 2, B = muncul angka 5. Hitung {renderWithLatex("$P(A \\cup B)$")}.</p>
        <Pembahasan>
          <div>A dan B saling lepas (tidak bisa dua angka sekaligus).</div>
          <div>{renderWithLatex("$P(A \\cup B) = \\dfrac{1}{6} + \\dfrac{1}{6} = \\mathbf{\\dfrac{2}{6} = \\dfrac{1}{3}}$")}</div>
        </Pembahasan>

        <ContohLabel no={2} level="Mudah"/>
        <p>Dari {renderWithLatex("$S = \\{1,2,...,12\\}$")}, A = bilangan prima, B = bilangan ≥ 5. Hitung {renderWithLatex("$P(A \\cup B)$")}.</p>
        <Pembahasan>
          <div>{renderWithLatex("$A = \\{2,3,5,7,11\\}$")}, {renderWithLatex("$P(A)=\\dfrac{5}{12}$")}</div>
          <div>{renderWithLatex("$B = \\{5,6,7,8,9,10,11,12\\}$")}, {renderWithLatex("$P(B)=\\dfrac{8}{12}$")}</div>
          <div>{renderWithLatex("$A \\cap B = \\{5,7,11\\}$")}, {renderWithLatex("$P(A \\cap B)=\\dfrac{3}{12}$")}</div>
          <div>{renderWithLatex("$P(A \\cup B) = \\dfrac{5}{12}+\\dfrac{8}{12}-\\dfrac{3}{12} = \\mathbf{\\dfrac{10}{12}=\\dfrac{5}{6}}$")}</div>
        </Pembahasan>

        <ContohLabel no={3} level="Sedang"/>
        <p>Kantong berisi 2 bola hijau (H) dan 3 bola merah (M). Diambil 2 kali <strong>dengan pengembalian</strong>. Berapa peluang keduanya berwarna hijau?</p>
        <Pembahasan>
          <div>Dengan pengembalian → saling bebas.</div>
          <div>{renderWithLatex("$P(H_1 \\cap H_2) = P(H_1) \\times P(H_2) = \\dfrac{2}{5} \\times \\dfrac{2}{5} = \\mathbf{\\dfrac{4}{25}}$")}</div>
        </Pembahasan>

        <ContohLabel no={4} level="Sedang"/>
        <p>Kantong berisi 2 bola hijau dan 3 bola merah. Diambil 2 kali <strong>tanpa pengembalian</strong>. Berapa peluang keduanya berwarna hijau?</p>
        <Pembahasan>
          <div>Tanpa pengembalian → bersyarat.</div>
          <div>{renderWithLatex("$P(H_1) = \\dfrac{2}{5}$")}, setelah diambil hijau pertama: {renderWithLatex("$P(H_2|H_1) = \\dfrac{1}{4}$")}</div>
          <div>{renderWithLatex("$P(H_1 \\cap H_2) = \\dfrac{2}{5} \\times \\dfrac{1}{4} = \\mathbf{\\dfrac{2}{20}=\\dfrac{1}{10}}$")}</div>
        </Pembahasan>

        <ContohLabel no={5} level="Sulit"/>
        <p>Kotak berisi 5 bola merah dan 4 bola biru. Diambil 2 bola sekaligus secara acak. Berapa peluang terambilnya <strong>sekurang-kurangnya satu bola biru</strong>?</p>
        <Pembahasan>
          <div>Gunakan komplemen: P(minimal 1 biru) = 1 − P(keduanya merah)</div>
          <div>{renderWithLatex("$n(S) = C(9,2) = 36$")}</div>
          <div>{renderWithLatex("$P(\\text{keduanya merah}) = \\dfrac{C(5,2)}{C(9,2)} = \\dfrac{10}{36} = \\dfrac{5}{18}$")}</div>
          <div>{renderWithLatex("$P(\\text{min. 1 biru}) = 1 - \\dfrac{5}{18} = \\mathbf{\\dfrac{13}{18}}$")}</div>
        </Pembahasan>
      </div>
    )
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LATIHAN DASAR (20 soal)
// ─────────────────────────────────────────────────────────────────────────────
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
  { no: 21, soal: "Roni diperbolehkan ibunya untuk mengambil 1 permen dari sebuah kantong. Dia tidak dapat melihat warna permen tersebut. Kantong tersebut berisi 4 permen merah, 2 permen biru, 8 permen kuning, dan 6 permen hijau. Berapa peluang Roni mengambil sebuah permen warna merah?", options: ["A. 10%", "B. 20%", "C. 25%", "D. 50%"] },
  { no: 22, soal: "Di dalam kaleng terdapat 8 buah bola yang bernomor 1, 2, 3, 4, 5, 6, 7, 8. Jika diambil secara acak 2 bola sekaligus dari kaleng tersebut, peluang yang terambil kedua bola tersebut bernomor genap adalah …", options: ["A. $\\frac{1}{7}$", "B. $\\frac{2}{7}$", "C. $\\frac{3}{14}$", "D. $\\frac{3}{7}$"] },
  { no: 23, soal: "Terdapat 5 buah bola yang diberi nomor 1, 2, 3, 4, dan 5. Jika diambil 2 buah bola sekaligus, maka peluang terambil kedua bola bernomor ganjil adalah …", options: ["A. $\\frac{1}{5}$", "B. $\\frac{3}{10}$", "C. $\\frac{2}{5}$", "D. $\\frac{1}{2}$"] },
  { no: 24, soal: "Bima ingin menulis bilangan yang terdiri dari dua angka dari angka-angka 1, 2, 3, 5, 8, 9. Jika tidak ada angka yang sama, banyak bilangan dengan nilai berbeda yang bisa ditulis seluruhnya adalah ....", options: ["A. 20", "B. 24", "C. 30", "D. 36"] },
  { no: 25, soal: "Pada pelemparan dua dadu, peluang muncul mata dadu berjumlah 5 atau 7 adalah ...", options: ["A. 0,14", "B. 0,16", "C. 0,17", "D. 0,28"] },
  { no: 26, soal: "Sebuah dadu dan mata uang logam ditos bersama-sama. Peluang munculnya mata uang logam muncul gambar dan dadu lebih dari 4 adalah ....", options: ["A. $\\frac{1}{12}$", "B. $\\frac{1}{6}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 27, soal: "Dari seperangkat kartu bridge (52 kartu), diambil sebuah kartu secara acak. Peluang yang terambil kartu As adalah ....", options: ["A. $\\frac{1}{52}$", "B. $\\frac{1}{26}$", "C. $\\frac{1}{13}$", "D. $\\frac{4}{13}$"] },
  { no: 28, soal: "Sebuah dadu ditos sebanyak 60 kali. Frekuensi harapan munculnya angka kurang dari 3 adalah ....", options: ["A. 15 kali", "B. 20 kali", "C. 30 kali", "D. 35 kali"] },
  { no: 29, soal: "Sebuah bola diambil dari sebuah kantong yang berisi 4 bola berwarna putih, 6 bola berwarna hijau, dan 5 bola berwarna merah. Peluang terambilnya bola berwarna merah adalah ...", options: ["A. $\\frac{1}{5}$", "B. $\\frac{4}{15}$", "C. $\\frac{1}{3}$", "D. $\\frac{3}{5}$"] },
  { no: 30, soal: "Tiga keping uang logam dilempar bersama-sama. Peluang muncul ketiganya gambar adalah ...", options: ["A. $\\frac{1}{8}$", "B. $\\frac{1}{4}$", "C. $\\frac{3}{8}$", "D. $\\frac{1}{2}$"] },
  { no: 31, soal: "Sebuah dadu dilambungkan satu kali. Peluang munculnya mata dadu kurang dari 4 adalah ...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{2}{3}$"] },
  { no: 32, soal: "Seorang ibu dan anaknya bermain tebak warna dengan cara mengambil bola dari kotak A dan memasukkannya ke kotak B. Kotak A berisi 5 bola merah, 7 bola kuning, dan 3 bola biru, sedangkan kotak B berisi 3 bola merah, 5 bola kuning, dan 3 bola biru. Ibu mengambil satu bola dari kotak A dan memasukkannya ke kotak B, kemudian si anak mengambil satu bola dari kotak B. Peluang si anak mendapatkan bola biru adalah ...", options: ["A. $\\frac{3}{11}$", "B. $\\frac{4}{15}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 33, soal: "Sebuah keluarga ingin mempunyai 4 orang anak. Peluang bahwa keluarga tersebut memiliki paling banyak 2 orang anak laki-laki adalah ...", options: ["A. $\\frac{5}{16}$", "B. $\\frac{6}{16}$", "C. $\\frac{11}{16}$", "D. $\\frac{13}{16}$"] },
  { no: 34, soal: "Babak perempat final Liga Champion diikuti oleh 8 tim A, B, C, D, E, F, G, dan H. Setiap tim memiliki peluang $\\frac{1}{2}$ untuk melaju ke babak selanjutnya. Jika B dan F berada di bagian bracket yang berbeda, peluang B bertemu F di babak final dan F menjadi juara adalah ...", options: ["A. $\\frac{1}{8}$", "B. $\\frac{1}{16}$", "C. $\\frac{1}{32}$", "D. $\\frac{1}{64}$"] },
  { no: 35, soal: "Seorang siswa mempunyai tiga buah celana berwarna biru, hitam, dan abu-abu, tiga buah kemeja berwarna putih, hijau, dan kuning serta dua pasang sepatu berwarna hitam dan coklat. Banyak kombinasi pakaian dan sepatu yang bisa digunakan siswa tersebut adalah ... kombinasi.", options: ["A. 12", "B. 15", "C. 18", "D. 24"] },
  { no: 36, soal: "Dalam sebuah peti terdapat 7 bola kuning bernomor 1−7, dan 5 bola merah bernomor a−e. Jika seseorang mengambil sebuah bola dari dalam peti secara acak, peluang terambilnya bola kuning bernomor ganjil atau bola merah dengan huruf vokal adalah ...", options: ["A. $\\frac{1}{4}$", "B. $\\frac{1}{3}$", "C. $\\frac{5}{12}$", "D. $\\frac{1}{2}$"] },
  { no: 37, soal: "Sebuah kantong berisi 5 kelereng merah, 6 kelereng kuning, dan 9 kelereng hijau. Sebuah kelereng diambil dari kantong tersebut. Peluang terambil kelereng kuning adalah ...", options: ["A. $\\frac{1}{4}$", "B. $\\frac{3}{10}$", "C. $\\frac{9}{20}$", "D. $\\frac{3}{5}$"] },
  { no: 38, soal: "Dalam rangka memperingati Hari Kemerdekaan RI, panitia menyiapkan sebuah kotak berisi kartu yang diberi nomor 1 sampai dengan 30. Setiap peserta hanya boleh mengambil satu kartu, dan yang mendapatkan kartu bernomor kelipatan 3 atau bilangan prima akan mendapat hadiah doorprize. Berapakah peluang seorang murid akan mendapatkan doorprize?", options: ["A. $\\frac{7}{15}$", "B. $\\frac{17}{30}$", "C. $\\frac{19}{30}$", "D. $\\frac{2}{3}$"] },
  { no: 39, soal: "Sebuah survei mengambil secara acak 60 murid sebagai sampelnya. Hasilnya, 36 siswa menjawab membawa bekal ke sekolah. Jika survei dilakukan lagi pada 50 murid lainnya dan diperkirakan hasil survei sama proporsinya dengan survei sebelumnya, frekuensi relatif murid yang membawa bekal dari seluruh siswa yang disurvei adalah ....", options: ["A. 0,59", "B. 0,60", "C. 0,61", "D. 0,62"] },
  { no: 40, soal: "Tiga buah dadu biasa dilempar sekaligus sebanyak satu kali. Peluang salah satu mata dadu sama dengan jumlah dua mata dadu lainnya adalah …", options: ["A. $\\frac{1}{6}$", "B. $\\frac{5}{24}$", "C. $\\frac{7}{24}$", "D. $\\frac{1}{3}$"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// LATIHAN OLIMPIADE (39 soal)
// ─────────────────────────────────────────────────────────────────────────────
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
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function OlimpiadePeluangPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "latihan" | "olimpiade">("materi");
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (i: number) => {
    playPopSound();
    setOpenSection(openSection === i ? null : i);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Starfield />
      <div className="relative z-10 flex flex-col min-h-screen">
        <PageNavigation />

        {/* Header */}
        <div className="flex flex-col items-center pt-6 pb-2 px-4">
          <Trophy className="w-10 h-10 text-yellow-400 mb-2" />
          <h1 className="text-2xl font-bold text-accent tracking-widest text-center">
            OLIMPIADE - PELUANG
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Irawan Sutiawan, M.Pd</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 px-4 mb-4">
          {(["materi", "latihan", "olimpiade"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { playPopSound(); setActiveTab(tab); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tab === "materi" ? "Materi" : tab === "latihan" ? "Latihan Dasar" : "Latihan Olimpiade"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3 max-w-2xl mx-auto w-full">

          {/* ── MATERI TAB ── */}
          {activeTab === "materi" && (
            <div className="space-y-2">
              {materiSections.map((sec, i) => (
                <div key={i} className="bg-card/50 backdrop-blur border border-border/50 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    onClick={() => toggleSection(i)}
                  >
                    <span className="font-semibold text-accent text-sm">{sec.heading}</span>
                    {openSection === i
                      ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {openSection === i && (
                    <div className="px-4 pb-4">
                      {sec.renderContent()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── LATIHAN DASAR TAB ── */}
          {activeTab === "latihan" && (
            <div className="space-y-3">
              {latihanDasar.map((q) => (
                <div key={q.no} className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-accent/20 text-accent rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                      {q.no}
                    </span>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {(() => {
                          const firstNewline = q.soal.indexOf('\n');
                          if (firstNewline === -1 || !q.soal.startsWith('OSN')) return renderWithLatex(q.soal);
                          const header = q.soal.slice(0, firstNewline);
                          const body = q.soal.slice(firstNewline + 1);
                          return <><span className="text-yellow-400 font-semibold">{header}</span>{'\n'}{renderWithLatex(body)}</>;
                        })()}
                      </p>
                      {q.options.length > 0 && (
                        <div className="grid grid-cols-2 gap-1">
                          {q.options.map((opt, j) => (
                            <div key={j} className="bg-muted/20 rounded px-2 py-1 text-xs">
                              {renderWithLatex(opt)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── LATIHAN OLIMPIADE TAB ── */}
          {activeTab === "olimpiade" && (
            <div className="space-y-3">
              {latihanOlimpiade.map((q) => (
                <div key={q.no} className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-yellow-400/20 text-yellow-400 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                      {q.no}
                    </span>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {(() => {
                          const firstNewline = q.soal.indexOf('\n');
                          if (firstNewline === -1 || !q.soal.startsWith('OSN')) return renderWithLatex(q.soal);
                          const header = q.soal.slice(0, firstNewline);
                          const body = q.soal.slice(firstNewline + 1);
                          return <><span className="text-yellow-400 font-semibold">{header}</span>{'\n'}{renderWithLatex(body)}</>;
                        })()}
                      </p>
                      {q.options.length > 0 && (
                        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                          {q.options.map((opt, j) => (
                            <div key={j} className="bg-muted/20 rounded px-2 py-1 text-xs">
                              {renderWithLatex(opt)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
