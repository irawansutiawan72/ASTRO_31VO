import { useEffect } from "react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Brain, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";

const packages = [
  { id: 1, label: "LATIHAN TKA PAKET 1", path: "/tka/paket-1", available: true },
  { id: 2, label: "LATIHAN TKA PAKET 2", path: "/coming-soon", available: false },
  { id: 3, label: "LATIHAN TKA PAKET 3", path: "/coming-soon", available: false },
  { id: 4, label: "LATIHAN TKA PAKET 4", path: "/coming-soon", available: false },
  { id: 5, label: "LATIHAN TKA PAKET 5", path: "/coming-soon", available: false },
  { id: 6, label: "LATIHAN TKA PAKET 6", path: "/coming-soon", available: false },
];

const TKAPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-2xl w-full px-4 py-10">
        <Brain className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          TES KEMAMPUAN AKADEMIK
        </h1>
        <p className="text-white/50 text-xs text-center mb-8 font-body">
          Pemantapan & Persiapan TKA — Matematika Kelas IX
        </p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {packages.map((pkg, i) => (
            <button
              key={pkg.id}
              onClick={() => { playPopSound(); navigate(pkg.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                hover:border-accent/60 transition-all duration-300 cursor-pointer text-left animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                pkg.available
                  ? "bg-accent/20 border border-accent/40"
                  : "bg-white/5 border border-white/10"
              }`}>
                <FileText className={`w-4 h-4 ${pkg.available ? "text-accent" : "text-white/30"}`} />
              </div>
              <span className={`font-body text-sm flex-1 ${pkg.available ? "text-white" : "text-white/50"}`}>
                {pkg.label}
              </span>
              {pkg.available
                ? <span className="text-xs font-body text-accent border border-accent/30 px-2 py-0.5 rounded-full">30 Soal</span>
                : <span className="text-xs font-body text-white/30">Segera Hadir</span>
              }
              <ChevronRight className={`w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform ${
                pkg.available ? "text-accent" : "text-white/20"
              }`} />
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TKAPage;
