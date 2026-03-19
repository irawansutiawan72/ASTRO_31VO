import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronRight } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const subtopics = [
  {
    label: "PENGERTIAN DAN KEANGGOTAAAN SUATU HIMPUNAN",
    path: "/latihan-mandiri/kelas-7/himpunan/pengertian-keanggotaan",
    color: "#60a5fa",
  },
  {
    label: "MENYATAKAN SUATU HIMPUNAN, HIMPUNAN KOSONG DAN HIMPUNAN SEMESTA",
    path: "/latihan-mandiri/kelas-7/himpunan/menyatakan-himpunan",
    color: "#a78bfa",
  },
  {
    label: "DIAGRAM VENN",
    path: "/latihan-mandiri/kelas-7/himpunan/diagram-venn",
    color: "#4ade80",
  },
  {
    label: "HIMPUNAN BAGIAN",
    path: "/latihan-mandiri/kelas-7/himpunan/himpunan-bagian",
    color: "#fb923c",
  },
  {
    label: "OPERASI HIMPUNAN",
    path: "/latihan-mandiri/kelas-7/himpunan/operasi-himpunan",
    color: "#f87171",
  },
];

const HimpunanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          HIMPUNAN
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 7 - Latihan Mandiri</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {subtopics.map((subtopic, i) => (
            <button
              key={subtopic.label}
              onClick={() => { playPopSound(); navigate(subtopic.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                hover:border-accent/60 transition-all duration-300
                cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.03}s`, borderLeftColor: subtopic.color, borderLeftWidth: "3px" }}
            >
              <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: subtopic.color }} />
              <span className="font-body text-sm text-white">{subtopic.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Kelas 7
          </button>
        </div>
      </div>
    </div>
  );
};

export default HimpunanPage;
