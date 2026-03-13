import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronRight } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const subtopics = [
  { name: "HUBUNGAN 2 GARIS", path: "/materi-matematika/kelas-7/garis-dan-sudut/hubungan-2-garis" },
  { name: "SUDUT PELURUS, SUDUT PENYIKU DAN SUDUT BERTOLAK BELAKANG", path: "/materi-matematika/kelas-7/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" },
  { name: "SIFAT SUDUT DUA GARIS SEJAJAR JIKA DIPOTONG GARIS LAIN", path: "/materi-matematika/kelas-7/garis-dan-sudut/sifat-sudut-dua-garis-sejajar" },
  { name: "JUMLAH SUDUT PADA SEGI BANYAK", path: "/materi-matematika/kelas-7/garis-dan-sudut/jumlah-sudut-segi-banyak" },
];

const GarisDanSudutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          GARIS DAN SUDUT
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 7 - Materi Matematika</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {subtopics.map((subtopic, i) => (
            <button
              key={subtopic.name}
              onClick={() => { playPopSound(); if (subtopic.path) navigate(subtopic.path); }}
              className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                transition-all duration-300 text-left animate-slide-up hover:border-primary/60 cursor-pointer"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <ChevronRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
              <span className="font-body text-sm text-white">{subtopic.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-7"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Kelas 7
          </button>
        </div>
      </div>
    </div>
  );
};

export default GarisDanSudutPage;
