import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Gamepad2, ChevronRight } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const subtopics = [
  { name: "PENGANTAR STATISTIKA DAN PENGUMPULAN DATA", path: "/math-game-arena/kelas-9/statistika/pengantar" },
  { name: "PENYAJIAN DATA", path: "/math-game-arena/kelas-9/statistika/penyajian-data" },
  { name: "UKURAN PEMUSATAN DATA (RATA-RATA DAN RATA-RATA GABUNGAN)", path: "/math-game-arena/kelas-9/statistika/rata-rata" },
  { name: "UKURAN PEMUSATAN DATA (MEDIAN DAN MODUS)", path: "/math-game-arena/kelas-9/statistika/median-modus" },
  { name: "UKURAN LETAK DATA (KUARTIL)", path: "/math-game-arena/kelas-9/statistika/kuartil" },
  { name: "UKURAN PENYEBARAN DATA (JANGKAUAN, JIK, SIMPANGAN KUARTIL)", path: "/math-game-arena/kelas-9/statistika/penyebaran-data" },
];

const StatistikaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/math-game-arena/kelas-9" />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Gamepad2 className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          STATISTIKA
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 9 - Math Game Arena</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {subtopics.map((subtopic, i) => (
            <button
              key={subtopic.name}
              onClick={() => { playPopSound(); navigate(subtopic.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                hover:border-accent/60 transition-all duration-300
                cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <ChevronRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
              <span className="font-body text-sm text-white">{subtopic.name}</span>
              <span className="ml-auto text-xs text-accent font-display">MAIN</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/math-game-arena/kelas-9"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Kelas 9
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatistikaPage;
