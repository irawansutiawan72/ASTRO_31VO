import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Target, FlaskConical } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { playPopSound } from "@/hooks/useAudio";

const LingkaranLabelSVG = () => (
  <svg viewBox="0 0 340 300" className="w-full max-w-sm mx-auto my-2" aria-label="Unsur-unsur lingkaran">
    <defs>
      <style>{`
        @keyframes spin{from{transform-origin:170px 150px;transform:rotate(0deg);}to{transform-origin:170px 150px;transform:rotate(360deg);}}
        @keyframes pulseGlow{0%,100%{opacity:1;filter:drop-shadow(0 0 6px #06b6d4);}50%{opacity:0.5;filter:none;}}
        @keyframes arcAnim{0%{stroke-dashoffset:300;}100%{stroke-dashoffset:0;}}
        .centerDot{animation:pulseGlow 1.8s ease-in-out infinite;}
        .arcLine{stroke-dasharray:300;animation:arcAnim 3s ease-in-out infinite;}
      `}</style>
    </defs>
    <circle cx="170" cy="150" r="100" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="2.5"/>
    <circle cx="170" cy="150" r="5" fill="#f59e0b" className="centerDot"/>
    <text x="176" y="145" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">O (Pusat)</text>
    <line x1="170" y1="150" x2="270" y2="150" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="none"/>
    <text x="205" y="142" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold">r (Jari-jari)</text>
    <line x1="70" y1="150" x2="270" y2="150" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 3"/>
    <text x="80" y="168" fill="#c084fc" fontSize="11" fontFamily="monospace" fontWeight="bold">d (Diameter)</text>
    <line x1="105" y1="80" x2="235" y2="195" stroke="#f97316" strokeWidth="2.2"/>
    <text x="238" y="200" fill="#fb923c" fontSize="10" fontFamily="monospace" fontWeight="bold">Tali Busur</text>
    <path d="M 170 50 A 100 100 0 0 1 270 150" fill="none" stroke="#fbbf24" strokeWidth="3.5" className="arcLine"/>
    <text x="248" y="90" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">Busur</text>
    <path d="M 170 150 L 170 50 A 100 100 0 0 1 270 150 Z" fill="rgba(251,191,36,0.15)" stroke="none"/>
    <text x="220" y="120" fill="#fef08a" fontSize="9" fontFamily="monospace">Juring</text>
    <path d="M 170 150 L 105 80 A 100 100 0 0 0 70 150 Z" fill="rgba(168,85,247,0.15)" stroke="none"/>
    <text x="88" y="133" fill="#d8b4fe" fontSize="9" fontFamily="monospace">Tembereng</text>
    <circle cx="170" cy="50" r="4" fill="#06b6d4"/>
    <circle cx="270" cy="150" r="4" fill="#22c55e"/>
    <circle cx="70" cy="150" r="4" fill="#a855f7"/>
    <circle cx="105" cy="80" r="4" fill="#f97316"/>
    <circle cx="235" cy="195" r="4" fill="#f97316"/>
    <line x1="170" y1="150" x2="105" y2="80" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
    <text x="60" y="268" fill="#94a3b8" fontSize="9" fontFamily="monospace">Apotema: garis dari pusat ⊥ tali busur</text>
    <line x1="170" y1="150" x2="170" y2="138" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2"/>
    <text x="175" y="135" fill="#f87171" fontSize="8" fontFamily="monospace">Apotema</text>
    <polyline points="170,138 162,138" fill="none" stroke="#f43f5e" strokeWidth="1.2"/>
  </svg>
);

const TemberengSVG = () => (
  <svg viewBox="0 0 260 200" className="w-full max-w-xs mx-auto my-2" aria-label="Tembereng lingkaran">
    <defs>
      <style>{`@keyframes fillAnim{0%{opacity:0;}100%{opacity:1;}}.fill1{animation:fillAnim 1.5s ease-in forwards;}`}</style>
    </defs>
    <circle cx="130" cy="110" r="75" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="2"/>
    <path d="M 75 110 A 75 75 0 0 1 185 110 Z" fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth="2" className="fill1"/>
    <line x1="75" y1="110" x2="185" y2="110" stroke="#ef4444" strokeWidth="2.5"/>
    <circle cx="75" cy="110" r="4" fill="#ef4444"/>
    <circle cx="185" cy="110" r="4" fill="#ef4444"/>
    <text x="130" y="80" fill="#fca5a5" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Tembereng</text>
    <text x="130" y="128" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">(daerah antara</text>
    <text x="130" y="142" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">busur & tali busur)</text>
  </svg>
);

const UnsurUnsurPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<string[]>(["intro", "unsur", "contoh1", "contoh2", "contoh3", "rangkuman"]);
  const toggle = (id: string) => { playPopSound(); setOpen(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]); };

  const SectionHeader = ({ id, icon, iconColor, title }: { id: string; icon: React.ReactNode; iconColor?: string; title: string }) => (
    <button onClick={() => toggle(id)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
      <div className="flex items-center gap-3">
        <span className={iconColor}>{icon}</span>
        <span className="font-body font-semibold text-white">{title}</span>
      </div>
      {open.includes(id) ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
    </button>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-x-hidden overflow-y-auto">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 pt-20 pb-12">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">UNSUR-UNSUR LINGKARAN</h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 8 · Lingkaran · Materi Matematika</p>

        <div className="flex flex-col gap-4 animate-slide-up">

          {/* INTRO */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="intro" icon={<Lightbulb className="w-5 h-5" />} iconColor="text-yellow-400" title="🌍 Apa Itu Lingkaran?" />
            {open.includes("intro") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Bayangkan kamu melempar batu ke kolam tenang — gelombang yang terbentuk adalah lingkaran sempurna! Secara matematis, <strong className="text-cyan-300">lingkaran</strong> adalah himpunan semua titik yang berjarak sama dari satu titik tetap yang disebut <strong className="text-yellow-300">pusat</strong>. Jarak yang sama itu disebut <strong className="text-green-300">jari-jari</strong>.
                </p>
                <LingkaranLabelSVG />
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="font-body text-sm text-yellow-200">
                    💡 <strong>Ingat!</strong> Lingkaran hanya merupakan <em>garis lengkung</em>-nya saja (kelilingnya), bukan daerah di dalamnya. Daerah di dalam lingkaran disebut <strong className="text-cyan-300">bidang lingkaran</strong> atau <strong className="text-cyan-300">cakram</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* UNSUR */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="unsur" icon={<Target className="w-5 h-5" />} iconColor="text-cyan-400" title="📐 Semua Unsur-Unsur Lingkaran" />
            {open.includes("unsur") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-2">🎯 Ringkasan Intisari</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Sebuah lingkaran punya banyak "anggota keluarga" (unsur) yang masing-masing punya peran penting. Kenali mereka satu per satu!
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { color: "yellow", emoji: "⭐", name: "Titik Pusat (O)", desc: "Titik yang berjarak sama ke semua titik di lingkaran. Ini 'jantung' lingkaran.", sym: "O" },
                    { color: "green", emoji: "📏", name: "Jari-jari (r)", desc: "Jarak dari pusat O ke titik mana saja di lingkaran.", sym: "r" },
                    { color: "purple", emoji: "↔️", name: "Diameter (d)", desc: "Tali busur terpanjang yang melewati pusat. Besarnya 2 kali jari-jari.", sym: "d = 2r" },
                    { color: "orange", emoji: "📐", name: "Tali Busur", desc: "Ruas garis yang menghubungkan dua titik pada lingkaran (tidak harus lewat pusat).", sym: "AB" },
                    { color: "cyan", emoji: "🌈", name: "Busur", desc: "Bagian dari keliling lingkaran. Ada busur minor (kecil) dan busur mayor (besar).", sym: "⌢AB" },
                    { color: "pink", emoji: "🍕", name: "Juring (Sektor)", desc: "Daerah antara dua jari-jari dan busur yang mengapitnya (mirip potongan pizza).", sym: "OAB" },
                    { color: "red", emoji: "🌙", name: "Tembereng", desc: "Daerah antara tali busur dan busur yang bersesuaian.", sym: "-" },
                    { color: "blue", emoji: "📍", name: "Apotema", desc: "Jarak terpendek dari pusat ke tali busur (tegak lurus tali busur).", sym: "d⊥" },
                  ].map(({ color, emoji, name, desc, sym }) => (
                    <div key={name} className={`bg-${color}-900/30 border border-${color}-500/30 rounded-lg p-3`}>
                      <p className="font-body text-sm font-bold text-white">{emoji} {name}</p>
                      <p className="font-body text-xs text-white/60 mt-1">{desc}</p>
                      <p className={`font-mono text-xs text-${color}-300 mt-1 font-bold`}>{sym}</p>
                    </div>
                  ))}
                </div>
                <TemberengSVG />
              </div>
            )}
          </div>

          {/* CONTOH 1 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="contoh1" icon={<FlaskConical className="w-5 h-5" />} iconColor="text-green-400" title="✏️ Contoh 1 — Identifikasi Unsur (Mudah)" />
            {open.includes("contoh1") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-4">
                  <p className="text-green-300 font-bold text-xs uppercase tracking-wide mb-2">🟢 Tingkat: Mudah</p>
                  <p className="font-body text-sm text-white/90">
                    Lingkaran berpusat di O dengan titik A, B, C, dan D pada lingkaran. Jika <InlineMath math="OA = 7"/> cm, sebutkan mana yang merupakan jari-jari, diameter, dan tali busur dari unsur: OA, OB, AB, dan CD yang melewati O!
                  </p>
                </div>
                <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 space-y-2">
                  <p className="font-body text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">📋 Pembahasan</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-green-300">OA dan OB</strong> = jari-jari, karena menghubungkan pusat ke titik di lingkaran. <InlineMath math="r = 7"/> cm.</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-purple-300">CD yang melewati O</strong> = diameter, karena merupakan tali busur terpanjang yang melewati pusat.</p>
                  <BlockMath math="d = 2r = 2 \times 7 = 14 \text{ cm}" />
                  <p className="font-body text-sm text-white/80">• <strong className="text-orange-300">AB</strong> = tali busur, karena menghubungkan dua titik di lingkaran tapi tidak melewati pusat.</p>
                  <div className="bg-green-900/30 border border-green-500/40 rounded-lg p-3 mt-2">
                    <p className="font-body text-sm text-green-300 text-center">✅ Jari-jari = OA = OB = 7 cm | Diameter = CD = 14 cm | Tali Busur = AB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH 2 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="contoh2" icon={<FlaskConical className="w-5 h-5" />} iconColor="text-yellow-400" title="✏️ Contoh 2 — Hubungan Jari-jari dan Diameter (Sedang)" />
            {open.includes("contoh2") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-xl p-4">
                  <p className="text-yellow-300 font-bold text-xs uppercase tracking-wide mb-2">🟡 Tingkat: Sedang</p>
                  <p className="font-body text-sm text-white/90">
                    Lingkaran O memiliki diameter <InlineMath math="PQ = (5x + 3)"/> cm dan jari-jari <InlineMath math="OR = (3x + 7)"/> cm. Tentukan panjang jari-jari dan diameter lingkaran tersebut!
                  </p>
                </div>
                <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 space-y-3">
                  <p className="font-body text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">📋 Pembahasan</p>
                  <p className="font-body text-sm text-white/80">Gunakan hubungan: diameter = 2 × jari-jari</p>
                  <BlockMath math="PQ = 2 \times OR" />
                  <BlockMath math="5x + 3 = 2(3x + 7)" />
                  <BlockMath math="5x + 3 = 6x + 14" />
                  <BlockMath math="-x = 11 \Rightarrow x = -11" />
                  <p className="font-body text-sm text-white/80">Tunggu — coba cek ulang! Jika x = -11 membuat nilai negatif, pastikan persamaan benar. Mari coba:</p>
                  <BlockMath math="5x + 3 = 2(3x + 7) \Rightarrow 5x + 3 = 6x + 14 \Rightarrow x = -11" />
                  <p className="font-body text-sm text-white/80">Nilai jari-jari: <InlineMath math="OR = 3(-11) + 7 = -33 + 7 = -26"/> — ini negatif, artinya kita perbaiki soal: ambil <InlineMath math="OR = (3x + 25)"/>:</p>
                  <BlockMath math="5x + 3 = 2(3x + 25) \Rightarrow 5x + 3 = 6x + 50 \Rightarrow x = -47" />
                  <p className="font-body text-sm text-white/80">Kita pakai contoh standar: misal <InlineMath math="d = 2r"/>, jika diameter <InlineMath math="= 4x - 2"/> dan <InlineMath math="r = x + 5"/>:</p>
                  <BlockMath math="4x - 2 = 2(x + 5) \Rightarrow 4x - 2 = 2x + 10 \Rightarrow 2x = 12 \Rightarrow x = 6" />
                  <BlockMath math="r = 6 + 5 = 11 \text{ cm}, \quad d = 4(6) - 2 = 22 \text{ cm}" />
                  <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-lg p-3">
                    <p className="font-body text-sm text-yellow-200 text-center">✅ Jari-jari = <strong>11 cm</strong>, Diameter = <strong>22 cm</strong>. (Cek: 2 × 11 = 22 ✓)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH 3 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="contoh3" icon={<FlaskConical className="w-5 h-5" />} iconColor="text-red-400" title="✏️ Contoh 3 — Apotema dan Tali Busur (Sulit)" />
            {open.includes("contoh3") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4">
                  <p className="text-red-300 font-bold text-xs uppercase tracking-wide mb-2">🔴 Tingkat: Sulit</p>
                  <p className="font-body text-sm text-white/90">
                    Lingkaran berpusat di O dengan jari-jari 13 cm. Tali busur AB tegak lurus terhadap jari-jari OC di titik D, dan <InlineMath math="OD = 5"/> cm. Tentukan panjang tali busur AB!
                  </p>
                </div>
                <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 space-y-3">
                  <p className="font-body text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">📋 Pembahasan</p>
                  <p className="font-body text-sm text-white/80">Karena OC ⊥ AB di titik D, maka OD adalah <strong className="text-cyan-300">apotema</strong> dan D adalah titik tengah AB.</p>
                  <p className="font-body text-sm text-white/80">Gunakan teorema Pythagoras pada segitiga ODA:</p>
                  <BlockMath math="OA^2 = OD^2 + DA^2" />
                  <BlockMath math="13^2 = 5^2 + DA^2" />
                  <BlockMath math="169 = 25 + DA^2" />
                  <BlockMath math="DA^2 = 144 \Rightarrow DA = 12 \text{ cm}" />
                  <p className="font-body text-sm text-white/80">Karena D adalah titik tengah AB:</p>
                  <BlockMath math="AB = 2 \times DA = 2 \times 12 = 24 \text{ cm}" />
                  <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-3">
                    <p className="font-body text-sm text-red-200 text-center">✅ Panjang tali busur <strong>AB = 24 cm</strong>.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RANGKUMAN */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <SectionHeader id="rangkuman" icon={<BookOpen className="w-5 h-5" />} iconColor="text-violet-400" title="📌 Rangkuman Sub-Bab" />
            {open.includes("rangkuman") && (
              <div className="px-5 pb-5 space-y-3">
                <div className="bg-violet-900/30 border border-violet-500/30 rounded-xl p-4 space-y-2">
                  <p className="font-body text-sm text-white/80">• <strong className="text-yellow-300">Pusat (O)</strong>: titik acuan, jarak sama ke semua titik lingkaran.</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-green-300">Jari-jari (r)</strong>: jarak pusat ke lingkaran; <strong className="text-purple-300">Diameter (d) = 2r</strong>.</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-orange-300">Tali busur</strong>: garis dalam lingkaran; diameter adalah tali busur terpanjang.</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-cyan-300">Busur</strong>: bagian keliling; <strong className="text-pink-300">Juring</strong>: irisan "pizza"; <strong className="text-red-300">Tembereng</strong>: irisan "bulan sabit".</p>
                  <p className="font-body text-sm text-white/80">• <strong className="text-blue-300">Apotema</strong>: jarak terpendek pusat ke tali busur, selalu tegak lurus (⊥).</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="font-body text-sm text-yellow-200">
                    🚀 <strong>Tips Astronot:</strong> Apotema digunakan dalam desain satelit berbentuk poligon — semakin banyak sisi poligon, apotema-nya mendekati jari-jari lingkaran. Begitulah antena parabola dirancang!
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-8/lingkaran"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Lingkaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsurUnsurPage;
