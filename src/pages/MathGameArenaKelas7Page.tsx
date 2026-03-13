import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Gamepad2, BookOpen } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const topics = [
  { label: "BILANGAN BULAT", path: "/math-game-arena/kelas-7/bilangan-bulat" },
  { label: "PECAHAN", path: "/math-game-arena/kelas-7/bilangan-rasional" },
  { label: "ALJABAR", path: "/math-game-arena/kelas-7/aljabar" },
  { label: "PERSAMAAN DAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/math-game-arena/kelas-7/plsv-ptlsv" },
  { label: "PERBANDINGAN", path: "/math-game-arena/kelas-7/perbandingan" },
  { label: "ARITMETIKA SOSIAL", path: "/math-game-arena/kelas-7/aritmetika-sosial" },
  { label: "GARIS DAN SUDUT", path: "/math-game-arena/kelas-7/garis-dan-sudut" },
  { label: "SEGITIGA DAN SEGIEMPAT", path: "/math-game-arena/kelas-7/segitiga-dan-segiempat" },
  { label: "HIMPUNAN", path: "/math-game-arena/kelas-7/himpunan" },
];

const MathGameArenaKelas7Page = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Gamepad2 className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          MATH GAME ARENA - KELAS 7
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Pilih topik untuk bermain</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {topics.map((topic, i) => (
            <button
              key={topic.label}
              onClick={() => { playPopSound(); navigate(topic.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                hover:border-accent/60 transition-all duration-300
                cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <BookOpen className="w-5 h-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-body text-sm text-white">{topic.label}</span>
              <span className="ml-auto text-xs text-accent font-display">MAIN</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/math-game-arena"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Math Game Arena
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathGameArenaKelas7Page;
