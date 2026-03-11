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
  title: "MATERI - LINGKARAN",
  sections: [
    {
      heading: "A. Luas dan Keliling Lingkaran",
      content: `Rumus Luas Lingkaran: $\\pi r^2$
Rumus Keliling Lingkaran: $2\\pi r$`
    },
    {
      heading: "B. Unsur-Unsur Lingkaran",
      content: `Lingkaran memiliki unsur-unsur penting seperti:
- Titik pusat
- Jari-jari (r)
- Diameter (d = 2r)
- Busur
- Tali busur
- Juring
- Tembereng`
    },
    {
      heading: "C. Menghitung Panjang Busur Dan Luas Juring",
      content: `Panjang busur = $\\frac{\\alpha}{360^0} \\times 2\\pi r$

Luas Juring = $\\frac{\\alpha}{360^0} \\times \\pi r^2$

Luas Tembereng = Luas Juring OAB - Luas segitiga`
    },
    {
      heading: "D. Menghitung Panjang Busur Dan Luas Juring Menggunakan Perbandingan",
      content: `$\\frac{\\angle AOB}{\\angle COD} = \\frac{\\widehat{AB}}{\\widehat{CD}} = \\frac{L_{juring AOB}}{L_{juring COD}}$`
    },
    {
      heading: "E. Sudut-Sudut Pada Lingkaran",
      content: `1. Sudut pusat dan sudut keliling yang menghadap busur sama
   $\\angle AOB = 2 \\angle ACB$
   $\\angle ACB = \\frac{1}{2} \\angle AOB$

2. Sudut keliling yang menghadap diameter
   $\\angle BAC = 90^0$

3. Sudut keliling yang menghadap busur sama
   $\\angle ACB = \\angle ADB = \\angle AEB$

4. Sudut pada segiempat tali busur
   $\\angle A + \\angle C = 180^0$
   $\\angle B + \\angle D = 180^0$`
    },
    {
      heading: "F. Garis Singgung Lingkaran",
      content: `1. Definisi Garis Singgung Lingkaran
Garis singgung lingkaran adalah garis yang memotong lingkaran tepat di satu titik. Titik tersebut dinamakan titik singgung lingkaran.
Setiap garis singgung lingkaran selalu tegak lurus terhadap jari-jari (diameter) yang melalui titik singgungnya.

Pada $\\triangle OAB$ berlaku teorema Pythagoras sehingga:
$AB^2 = OB^2 - AO^2$ atau $AB^2 = OB^2 - r^2$

2. Garis Singgung Persekutuan Dalam
$d^2 = p^2 - (R + r)^2$
Keterangan:
p = jarak titik pusat dua lingkaran
d = panjang garis singgung lingkaran dalam
R = jari-jari lingkaran pertama
r = jari-jari lingkaran kedua

3. Garis Singgung Persekutuan Luar
$l^2 = p^2 - (R - r)^2$
Keterangan:
p = jarak titik pusat dua lingkaran
l = panjang garis singgung lingkaran luar
R = jari-jari lingkaran pertama
r = jari-jari lingkaran kedua`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Perhatikan gambar!\nJika O adalah pusat lingkaran, jika r = 21 cm dan $\\pi = \\frac{22}{7}$, maka luas daerah yang diarsir adalah ...", options: ["A. 77 $cm^2$", "B. 154 $cm^2$", "C. 231 $cm^2$", "D. 308 $cm^2$"] },
  { no: 2, soal: "Perhatikan gambar lingkaran di samping! Jika O pusat lingkaran, dan panjang OP = 21 cm, maka panjang busur kecil PQ adalah.... ($\\pi = \\frac{22}{7}$)\nLuas juring dengan sudut pusat $120^0$ dan panjang jari-jari 7 cm adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 77 $cm^2$", "B. 51,33 $cm^2$", "C. 38,50 $cm^2$", "D. 14,67 $cm^2$"] },
  { no: 3, soal: "Perhatikanlah gambar berikut.\nDiketahui O adalah titik pusat lingkaran. Jika panjang busur QR = 60 cm, panjang busur PQ adalah...", options: ["A. 40 cm", "B. 45 cm", "C. 50 cm", "D. 55 cm"] },
  { no: 4, soal: "Perhatikan gambar!\nJika luas juring ORS = 60 $cm^2$, luas juring OPQ adalah...", options: ["A. 40 $cm^2$", "B. 75 $cm^2$", "C. 90 $cm^2$", "D. 105 $cm^2$"] },
  { no: 5, soal: "Pada suatu lingkaran dengan pusat O diketahui titik A, B, C, dan D pada keliling lingkaran, sehingga $\\angle AOB = 35°$ dan $\\angle COD = 140°$. Jika panjang busur AB = 14 cm, hitunglah panjang busur CD.", options: ["A. 28 cm", "B. 42 cm", "C. 56 cm", "D. 70 cm"] },
  { no: 6, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 496,44 $cm^2$", "B. 718,2 $cm^2$", "C. 992,88 $cm^2$", "D. 1827 $cm^2$"] },
  { no: 7, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 59,5 $cm^2$", "B. 112 $cm^2$", "C. 119 $cm^2$", "D. 224 $cm^2$"] },
  { no: 8, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 47,1 cm", "B. 62,8 cm", "C. 78,5 cm", "D. 94,2 cm"] },
  { no: 9, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: [] },
  { no: 10, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: [] },
  { no: 11, soal: "Perhatikan gambar berikut!\nKeliling bangun tersebut adalah ...", options: ["A. 213,6 cm", "B. 221,2 cm", "C. 253,6 cm.", "D. 267,6 cm"] },
  { no: 12, soal: "Perhatikan gambar berikut\nJika total luas bangun di atas 480 $cm^2$, maka luas daerah persegi adalah ...", options: ["A. 24 $cm^2$", "B. 56 $cm^2$", "C. 72 $cm^2$", "D. 84 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar persegipanjang dan lingkaran berikut!\nDiketahui A dan B adalah pusat dua lingkaran yang kongruen dan saling bersinggungan luar. ABQP adalah persegi panjang. Luas daerah yang diarsir seluruhnya adalah 1.316 $cm^2$. Luas persegi panjang ABQP adalah....($\\pi = \\frac{22}{7}$)", options: ["A. 196 $cm^2$", "B. 392 $cm^2$", "C. 492 $cm^2$", "D. 512 $cm^2$"] },
  { no: 14, soal: "Perhatikan gambar di samping ini!\nDiketahui O adalah titik pusat lingkaran. Besar sudut AOB adalah ....", options: ["A. 15°", "B. 30°", "C. 45°", "D. 60°"] },
  { no: 15, soal: "Perhatikan gambar!\nTitik O adalah pusat lingkaran. Diketahui $\\angle ABE + \\angle ACE + \\angle ADE = 96°$ Besar $\\angle AOE$ adalah....", options: ["A. 32°", "B. 48°", "C. 64°", "D. 84°"] },
  { no: 16, soal: "Perhatikan gambar di bawah ini!,\nBesar $\\angle OAD = 20^0$, besar $\\angle OBD = 30^0$, maka besar sudut BOC adalah ....", options: ["A. $50^0$", "B. $70^0$", "C. $80^0$", "D. $100^0$"] },
  { no: 17, soal: "Pada gambar di bawah ini diketahui besar $\\angle AOC = 82^0$.\nBesar sudut $\\angle BDC$ adalah ...", options: ["A. $41^0$", "B. $49^0$", "C. $82^0$", "D. $98^0$"] },
  { no: 18, soal: "Perhatikan gambar berikut!\nJika besar sudut AOC = $112^0$, maka besar sudut ABC adalah ....", options: ["A. $124^0$", "B. $114^0$", "C. $68^0$", "D. $56^0$"] },
  { no: 19, soal: "Perhatikanlah gambar di bawah.\nHitunglah besar sudut $\\angle BAC$, $\\angle ADC$, $\\angle DAC$.", options: [] },
  { no: 20, soal: "Perhatikanlah gambar di bawah,\nHitunglah besar $\\angle DCB$, $\\angle BAD$, $\\angle ADC$", options: [] },
  { no: 21, soal: "Perhatikan gambar berikut!\nJika besar sudut COD = $48^0$, maka besar sudut ABC adalah ....", options: ["A. $132^0$", "B. $124^0$", "C. $122^0$", "D. $114^0$"] },
  { no: 22, soal: "Ayah akan membuat taman berbentuk lingkaran dengan jari-jari 35 m. Di sekeliling taman akan ditanami pohon cemara dengan jarak 1 m. Jika satu pohon memerlukan biaya Rp 25.000,00, seluruh biaya penanaman pohon cemara adalah....", options: ["A. Rp 5.900.000,00", "B. Rp 5.700.000,00", "C. Rp 5.500.000,00", "D. Rp 5.200.000,00"] },
  { no: 23, soal: "Sebuah roda yang berdiameter 50 cm berputar 60 kali. Jika $\\pi = 3,14$, maka jarak yang ditempuh adalah ....", options: ["A. 94,2 m", "B. 942 m", "C. 47,1 m", "D. 471 m"] },
  { no: 24, soal: "Sebuah roda berputar 40 kali menempuh jarak 52,8 m. Jika $\\pi = 22/7$, maka jari-jari roda tersebut adalah ....", options: ["A. 14 cm", "B. 21 cm", "C. 28 cm", "D. 42 cm"] },
  { no: 25, soal: "Seorang pengusaha akan membuat bianglala seperti yang ada di Dufan.\nJika tempat duduk pada bianglala sebanyak 44 buah dan masing-masing tempat duduk berjarak 3 m, berapakah panjang jari-jari bianglala?", options: ["A. 7 m", "B. 10,5 m", "C. 14 m", "D. 21 m"] },
  { no: 26, soal: "Perhatikan gambar berikut!\nKolam ikan Pak Arvin tampak seperti gambar di atas. Jika di sekeliling akan dipagari dengan kawat berduri dua kali putaran, maka dibutuhkan kawat berduri minimum sepanjang......", options: ["A. 72 m", "B. 86 m", "C. 144 m", "D. 172 m"] },
  { no: 27, soal: "Sebuah tonggak ditengah lapangan rumput berbentuk persegipanjang berukuran 15 m x 20 m. Seekor kambing diikat di tonggak dengan tali yang panjangnya 7 m. Berapa luas lapangan yang rumputnya tidak termakan kambing?", options: ["A. 100 $m^2$", "B. 146 $m^2$", "C. 154 $m^2$", "D. 300 $m^2$"] },
  { no: 28, soal: "Perhatikan gambar berikut!\nKolam pak Tedi bentuk dan ukuran Nampak seperti gambar.\nJika keliling kolam diberi pagar kawat dua kali putaran, maka dibutuhkan kawat minimum sepanjang ....", options: ["A. 66 m", "B. 88 m", "C. 132 m", "D. 180 m"] },
  { no: 29, soal: "Perhatikan gambar berikut.\nPanjang OP adalah ....", options: ["A. 16 cm", "B. 26 cm", "C. 34 cm", "D. 36 cm"] },
  { no: 30, soal: "Panjang jari-jari dua lingkaran masing-masing adalah 2 cm dan 10 cm. Panjang garis singgung persekutuan luarnya adalah 15 cm. Jarak kedua titik pusat lingkaran adalah ....", options: ["A. 13 cm", "B. 17 cm", "C. 23 cm", "D. 17 cm"] },
  { no: 31, soal: "Perhatikan gambar berikut.\nPada gambar tersebut, panjang jari-jari AD = 8 cm, panjang jari-jari BC = 3 cm, dan jarak AB = 13 cm. Luas trapesium ABCD adalah ....", options: ["A. 46 $cm^2$", "B. 56 $cm^2$", "C. 66 $cm^2$", "D. 76 $cm^2$"] },
  { no: 32, soal: "Perhatikan gambar berikut.\nPanjang garis singgung persekutuan dalam adalah ...", options: ["A. 12 cm", "B. 14 cm", "C. 16 cm", "D. 18 cm"] },
  { no: 33, soal: "Perbandingan jari-jari dua lingkaran adalah 1 : 2. Panjang garis singgung persekutuan dalam kedua lingkaran tersebut adalah 12 cm dan jarak antara kedua pusatnya 15 cm. Panjang jari-jari masing masing lingkaran adalah ....", options: ["A. 2 cm dan 4 cm", "B. 3 cm dan 6 cm", "C. 4 cm dan 8 cm", "D. 5 cm dan 10 cm"] },
  { no: 34, soal: "Perhatikan gambar di bawah ini.\nPanjang AD = 3,5 cm, panjang BE = 1,5 cm, dan jarak AB = 8 cm. Luas $\\triangle ABC$ adalah ....", options: ["A. $5\\sqrt{39}$", "B. $\\frac{1}{2}\\sqrt{39}$", "C. $\\frac{5}{2}\\sqrt{39}$", "D. $\\frac{3}{2}\\sqrt{39}$"] },
  { no: 35, soal: "Gambar berikut ini adalah penampang 6 buah kaleng cat yang berbentuk tabung dan berjari-jari 14 cm. Panjang tali terpendek yang dibutuhkan untuk mengikat keenam kaleng cat tersebut adalah ....", options: ["A. 256 cm", "B. 258 cm", "C. 260 cm", "D. 262 cm"] },
  { no: 36, soal: "Gambar di bawah ini adalah penampang 10 buah gelas berbentuk tabung dengan jari-jari 10 cm. Panjang tali minimal yang diperlukan untuk mengikat gelas-gelas tersebut dengan susunan seperti dalam gambar adalah ....", options: ["A. 261,8 cm", "B. 262,8 cm", "C. 261,6 cm", "D. 262,6 cm"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2003 Tingkat Kota\nDi dalam suatu lingkaran yang berjari-jari 4 cm dibuat persegi ABCD, sehingga titik sudut persegi tersebut berada pada lingkaran. Luas persgi ABCD adalah ...", options: ["A. 64 $cm^2$", "B. 32 $cm^2$", "C. 16 $cm^2$", "D. 8 $cm^2$", "E. 4 $cm^2$"] },
  { no: 2, soal: "OSN Matematika 2005 Tingkat Kota\nMisalkan a dan b menyatakan luas daerah yang diarsir pada gambar di bawah. Kelima lingkaran kecil berjari-jari r. titik-titik pusat empat lingkaran kecil yang menyinggung lingkaran besar merupakan titik-titik sudut persegi. Jika a sama dengan 10 10 $cm^2$, maka b = ...", options: [] },
  { no: 3, soal: "OSN Matematika 2006 Tingkat Kota\nLuas daerah yang diarsir setengah dari luas daerah yang tidak diarsir. Panjang AB dibagi panjang AC adalah ...", options: ["A. $\\frac{1}{2}\\sqrt{2}$", "B. $\\frac{1}{3}\\sqrt{3}$", "C. $\\frac{1}{5}\\sqrt{5}$", "D. $\\frac{1}{7}\\sqrt{7}$", "E. $\\frac{1}{5}\\sqrt{7}$"] },
  { no: 4, soal: "OSN Matematika 2007 Tingkat Kota\nDiketahui suatu segitiga sama sisi dan setengah lingkaran seperti pada gambar berikut.\nJika panjang sisi segitiga tersebut 14 cm, maka luas daerah di dalam segitiga dan di luar setengah lingkaran adalah ... $cm^2$", options: ["A. $49\\sqrt{3} - 14\\pi$", "B. $49\\sqrt{3} - \\frac{1}{2}(24\\pi)$", "C. $49\\sqrt{3} - \\frac{3}{8}(18\\pi)$", "D. $98\\sqrt{3} - \\frac{3}{4}(36\\pi)$", "E. $98\\sqrt{3} - \\frac{1}{2}(24\\pi)$"] },
  { no: 5, soal: "OSN Matematika 2007 Tingkat Kota\nPerhatikan dua lingkaran konsentrik (memiliki titik pusat sama) seperti gambar berikut.\nJika keliling lingkaran besar lebih panjang 4 meter dari keliling lingkaran kecil, maka jarak d adalah ... meter", options: [] },
  { no: 6, soal: "OSN Matematika 2007 Tingkat Kota\nPerhatikan gambar berikut. Luas daerah yang diarsir adalah ... $cm^2$", options: [] },
  { no: 7, soal: "OSN Matematika 2008 Tingkat Kota\nPerhatikan gambar berikut.\nJika QT garis singgung lingkaran yang berpusat di O dan $\\angle TOR = 112^0$, maka besar $\\angle PQT = ...$", options: ["A. $56^0$", "B. $44^0$", "C. $34^0$", "D. $26^0$", "E. $24^0$"] },
  { no: 8, soal: "OSN Matematika 2008 Tingkat Kota\nPerhatikan dua lingkaran pada gambar berikut.\nDiketahui panjang talibusur AB = 24 cm dan MO = ON. Maka luas daerah yang diarsir adalah ...", options: ["A. $24\\pi$ $cm^2$", "B. $72\\pi$ $cm^2$", "C. $104\\pi$ $cm^2$", "D. $144\\pi$ $cm^2$", "E. $152\\pi$ $cm^2$"] },
  { no: 9, soal: "OSN Matematika 2008 Tingkat Kota\nPerhatikan gambar berikut.\nPada segiempat ABCD dibuat setengah lingkaran pada sisi AD dengan pusat E dan segitiga sama sisi BEC. Jika BC = 20 cm, maka luas daerah yang diarsir adalah ...", options: ["A. $(100\\sqrt{3} - 50\\pi)$ $cm^2$", "B. $(100\\sqrt{3} - \\frac{50\\pi}{3})$ $cm^2$", "C. $(100\\sqrt{3} - \\frac{50\\pi}{6})$ $cm^2$", "D. $(100\\sqrt{3} - \\frac{100\\pi}{3})$ $cm^2$", "E. $(100\\sqrt{3} - \\frac{100}{3}\\pi)$ $cm^2$"] },
  { no: 10, soal: "OSN Matematika 2010 Tingkat Kota\nRoda A dengan jari-jari 40 cm dan roda B dengan jari-jari 10 cm dihubungkan dengan sebuah tali yang melingkar keduanya. Jika jarak pusat kedua roda adalah 60 cm, maka panjang tali yang dibutuhkan adalah ... cm", options: ["A. $60(\\pi + \\sqrt{3})$", "B. $56(\\pi + \\sqrt{3})$", "C. $50(\\pi + \\sqrt{3})$", "D. $40(\\pi + \\sqrt{3})$", "E. $38(\\pi + \\sqrt{3})$"] },
  { no: 11, soal: "OSN Matematika 2011 Tingkat Kota\nSembilan lingkaran kongruen terletak di dalam persegi seperti terlihat pada gambar. Jika keliling sebuah lingkaran 62,8 cm dengan $\\pi = 3,14$, maka luas daerah yang diarsir adalah ... $cm^2$", options: ["A. 344", "B. 364", "C. 484", "D. 688", "E. 728"] },
  { no: 12, soal: "OSN Matematika 2011 Tingkat Kota\nPerhatikan gambar di atas, persegi ABCD dengan panjang sisi 14 cm menyinggung Lingkaran. Masing-masing sisi persegi dibuat setengah lingkaran dengan diameter sisi persegi tersebut. Jika $\\pi = 3,14$, maka luas daerah yang diarsir adalah ... $cm^2$", options: ["A. 49", "B. 56", "C. 112", "D. 178", "E. 196"] },
  { no: 13, soal: "OSN Matematika 2011 Tingkat Kota\nSebuah bingkai foto yang berbentuk persegi diputar $45^0$ dengan sumbu putar titik perpotongan diagonal-diagonalnya. Jika panjang sisi persegi adalah 1 cm. luas irisan antara bingkai foto sebelum dan sesudah diputar adalah ... $cm^2$", options: ["A. $1 + 2\\sqrt{2}$", "B. $2 + 2\\sqrt{2}$", "C. 2", "D. $2 - 2\\sqrt{2}$", "E. $2\\sqrt{2} - 2$"] },
  { no: 14, soal: "OSN Matematika 2011 Tingkat Kota\nPerhatikan gambar berikut. ABCD persegi dengan panjang sisi-sisinya adalah 2 cm. E adalah titik Tengah CD dan F adalah titik Tengah AD. Luas daerah EDFGH adalah ...", options: [] },
  { no: 15, soal: "OSN Matematika 2012 Tingkat Kota\nPerhatikan gambar di bawah ini. Jika lingkaran besar berjari-jari 4 dan lingkaran kecil berjari-jari 2, serta luas daerah yang diarsir adalah 5/12 luas lingkaran besar, maka besar $\\angle RPQ$ adalah ...", options: ["A. $60^0$", "B. $90^0$", "C. $120^0$", "D. $135^0$", "E. $150^0$"] },
  { no: 16, soal: "OSN Matematika 2012 Tingkat Kota\nEmpat titik ditempatkan pada lingkaran berjari-jari $\\frac{1}{2}$ satuan. Jika keempat titik tersebut dihubungkan sehingga membentuk persegi panjang, mka luas terbesar (maksimum) yang mungkin bagi persegi panjang tersebut adalah ...", options: [] },
  { no: 17, soal: "OSN Matematika 2015 Tingkat Kota\nDiketahui lingkaran dengan pusat O dan mempunyai diameter AB. Segitiga CDE siku-siku di D, DE pada diameter AB sehingga DO = OE dan CD = DE untuk suatu titik C pada lingkaran. Jika jari-jari lingkaran adalah 1 cm, maka luas segitiga CDE = ... $cm^2$", options: ["A. 3/5", "B. 2/5", "C. 2/3", "D. 1/2"] },
  { no: 18, soal: "OSN Matematika 2015 Tingkat Kota\nSuatu taman kota dibatasi oleh lintasan lari berbentuk lingkaran (seperti pada gambar) dan tepat di titik pusat taman dibuat tugu (T) yang dihiasi lampu. Di sepanjang tepai bagian dalam taman diletakkan 12 bangku permanen (B) secara berurutan, sebut $B_1$, $B_2$, ..., $B_{12}$. Jarak antara dua bangku yang berurutan dibuat sama (termasuk dari $B_{12}$ ke $B_1$). Jarak tugu ke lintasan lari adalah 50 meter. Bakri, Bima dan Budi berlari pada lintasan lari mulai di depan bangu $B_1$. Berlari mengambil arah yang berlawanan. Jika setelah 20 menit posisi Bakri di depan bangku $B_7$, Bima di depan bangku $B_6$, Budi di depan bangku $B_4$, maka jarak total yang telah ditempuh tiga orang ini mendekati ... meter (gunakan $\\pi = 3,14$).", options: ["A. 549", "B. 523", "C. 471", "D. 392"] },
  { no: 19, soal: "OSN Matematika 2015 Tingkat Kota\nPerhatikan gambar berikut.\nTitik P, Q dan R masing-masing adalah titik singgung lingkaran pada sisi-sisi $\\triangle ACD$. Diketahui $\\angle SDR = 60^0$, panjang SR = panjang SQ = 1 cm dan panjang RD = $\\frac{\\sqrt{3}}{3}$ cm. jika $\\triangle ABC$ sama kaki, maka luas $\\triangle ABC$ adalah ... $cm^2$", options: [] },
  { no: 20, soal: "OSN Matematika 2017 Tingkat Kota\nLingkaran pada gambar berikut mempunyai radius 1 satuan panjang dan $\\angle DAB = 30^0$. Luas daerah trapesium ABCD yang diarsir adalah ...", options: ["A. $\\frac{1}{2}$", "B. 1", "C. $\\frac{\\sqrt{3}}{2}$", "D. $\\frac{1 + \\sqrt{3}}{2}$"] },
  { no: 21, soal: "OSN Matematika 2018 Tingkat Kota\nPerhatikan $\\triangle ABC$ dan lingkaran dalam pada gambar di bawah.\nJika $\\triangle ABC$ sama sisi dengan CD = 6 cm, maka luas daerah lingkaran dalam adalah ... $cm^2$", options: ["A. $16\\pi$", "B. $12\\pi$", "C. $9\\pi$", "D. $4\\pi$"] },
  { no: 22, soal: "OSN Matematika 2019 Tingkat Kota\nPerhatikan gambar. jika $\\angle ABE + \\angle ACE + \\angle ADE = 96^0$, maka besar $\\angle AOE$ adalah ...", options: ["A. $32^0$", "B. $48^0$", "C. $64^0$", "D. $84^0$"] },
  { no: 23, soal: "OSN Matematika 2020 Tingkat Kota\nPerhatikan bangun setengah lingkaran berikut. Jika CA = 6 cm dan ED + DF = 8 cm, maka keliling bangun yang diarsir adalah ...", options: ["A. $\\pi + 36$", "B. $6\\pi + 12$", "C. $3\\pi + 36$", "D. $3\\pi + 12$"] },
  { no: 24, soal: "OSN Matematika 2022 Tingkat Kota\nPerhatikan setengah lingkaran pusat O dan diameter AB berikut.\nTitik C terletak pada busur AB dan P adalah pusat lingkaran dalam ABC. Titik P dilalui DE yang tegak lurus AO, jika DE = 4 cm, maka luas daerah $\\triangle PBC$ adalah ... $cm^2$", options: ["A. 2", "B. 4", "C. 8", "D. 16"] },
  { no: 25, soal: "OSN Matematika 2022 Tingkat Kota\nTiga puluh koin dengan jari-jari 3,5 cm ditumpuk menjadi 4 tingkat sehingga meyerupai limas tegak segi empat beraturan dengan sisi angka menghadap ke atas. Tingkat pertama (paling bawah) terdiri dari 16 koin, tingkat kedua terdiri dari 9 koin, tingkat ketiga terdiri dari 4 koin dan tingkat keempat terdiri dari 1 koin. Pada setiap tingkat, koin akan disusun menyerupai persegi dengan setiap koin yang berdekatan saling bersinggungan. Jika dilihat dari atas, total luas sisi angka yang tertutup oleh koin lainnya adalah... $cm^2$.", options: ["A. 381,5", "B. 444,5", "C. 539", "D. 1155"] },
  { no: 26, soal: "OSN Matematika 2022 Tingkat Kota\nPerhatikan gambar setengah lingkaran dengan pusat O.\nJika $\\angle BOR = 48^0$ dan $\\angle OPA = 80^0$, maka besar $\\angle PQR = ...^o$", options: ["A. 92", "B. 104", "C. 118", "D. 125"] },
  { no: 27, soal: "OSN Matematika 2023 Tingkat Kota\nPerhatikan gambar berikut!\nDi dalam persegi ABCD terdapat dua setengah lingkaran dengan diameter AD dan BC. Ruas garis EF dan GH sejajar AB. Jika EK = 3 cm, LH = 6 cm dan EG = 9 cm, maka luas daerah persegi ABCD adalah ... $cm^2$", options: ["A. 180", "B. 360", "C. 90", "D. 150"] },
  { no: 28, soal: "OSN Matematika 2023 Tingkat Kota\nEmpat titik berbeda A, B, C dan D terletak pada lingkaran berjari-jari 7 cm. diketahui AB : BC = 3 : 4, AB = AD dan BC = CD. Titik E adalah perpotongan AC dan BD, melalui titik E dibuat garis k dan l. garis k tegak lurus BC dan memotong AD di P. sementara, garis l tegak lurus AD dan memotong BC di Q. perbandingan luas daerah segitiga AQP dan PDQ adalah 1 : ...", options: [] },
  { no: 29, soal: "OSN Matematika 2025 Tingkat Kota\nDalam suatu lingkaran berpusat di O berjari-jari 7, dibuat segitiga ABC dengan titik A, B dan C terletak pada lingkaran, AC merupakan diameter lingkaran dengan $\\angle ACB = 60^0$,\nMelalui C dan titik Tengah AB, dibuat garis memotong lingkaran di titik D. panjang CD sama dengan ...", options: ["A. $3\\sqrt{7}$", "B. $5\\sqrt{7}$", "C. $6\\sqrt{7}$", "D. $7\\sqrt{7}$"] },
];

const OlimpiadeLingkaranPage = () => {
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
          OLIMPIADE - LINGKARAN
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
            Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeLingkaranPage;
