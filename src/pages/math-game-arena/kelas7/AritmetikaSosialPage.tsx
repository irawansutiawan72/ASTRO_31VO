import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Gamepad2, ChevronRight } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const subtopics = [
  { label: "JUAL BELI, UNTUNG DAN RUGI", path: "/math-game-arena/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" },
  { label: "DISKON", path: "/math-game-arena/kelas-7/aritmetika-sosial/diskon" },
  { label: "BRUTO, NETTO DAN TARA", path: "/math-game-arena/kelas-7/aritmetika-sosial/bruto-netto-tara" },
  { label: "BUNGA TUNGGAL", path: "/math-game-arena/kelas-7/aritmetika-sosial/bunga-tunggal" },
  { label: "PAJAK PERTAMBAHAN NILAI (PPN)", path: "/math-game-arena/kelas-7/aritmetika-sosial/ppn" },
  { label: "PAJAK PENGHASILAN (PPh)", path: "/math-game-arena/kelas-7/aritmetika-sosial/pph" },
];

const AritmetikaSosialPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/math-game-arena/kelas-7" />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Gamepad2 className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          ARITMETIKA SOSIAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 7 - Math Game Arena</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {subtopics.map((subtopic, i) => (
            <button
              key={subtopic.label}
              onClick={() => { playPopSound(); navigate(subtopic.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                hover:border-accent/60 transition-all duration-300
                cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <ChevronRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
              <span className="font-body text-sm text-white">{subtopic.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/math-game-arena/kelas-7"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Kelas 7
          </button>
        </div>
      </div>
    </div>
  );
};

export default AritmetikaSosialPage;
