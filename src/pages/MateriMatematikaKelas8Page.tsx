import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import {
  BookOpen,
  BarChart2,
  Crosshair,
  GitBranch,
  Equal,
  TrendingUp,
  Triangle,
  Circle,
  CircleDot,
  Box,
} from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const topics = [
  {
    label: "POLA BILANGAN",
    path: "/materi-matematika/kelas-8/pola-bilangan",
    icon: BarChart2,
    color: "text-cyan-400",
    bg: "group-hover:bg-cyan-500/10",
    ring: "group-hover:border-cyan-500/60",
  },
  {
    label: "KOORDINAT CARTESIUS",
    path: "/materi-matematika/kelas-8/koordinat-cartesius",
    icon: Crosshair,
    color: "text-green-400",
    bg: "group-hover:bg-green-500/10",
    ring: "group-hover:border-green-500/60",
  },
  {
    label: "RELASI DAN FUNGSI",
    path: "/materi-matematika/kelas-8/relasi-dan-fungsi",
    icon: GitBranch,
    color: "text-purple-400",
    bg: "group-hover:bg-purple-500/10",
    ring: "group-hover:border-purple-500/60",
  },
  {
    label: "SISTEM PERSAMAAN LINEAR DUA VARIABEL",
    path: "/materi-matematika/kelas-8/spldv",
    icon: Equal,
    color: "text-yellow-400",
    bg: "group-hover:bg-yellow-500/10",
    ring: "group-hover:border-yellow-500/60",
  },
  {
    label: "PERSAMAAN GARIS LURUS",
    path: "/materi-matematika/kelas-8/persamaan-garis-lurus",
    icon: TrendingUp,
    color: "text-orange-400",
    bg: "group-hover:bg-orange-500/10",
    ring: "group-hover:border-orange-500/60",
  },
  {
    label: "TEOREMA PYTHAGORAS",
    path: "/materi-matematika/kelas-8/teorema-pythagoras",
    icon: Triangle,
    color: "text-blue-400",
    bg: "group-hover:bg-blue-500/10",
    ring: "group-hover:border-blue-500/60",
  },
  {
    label: "LINGKARAN",
    path: "/materi-matematika/kelas-8/lingkaran",
    icon: Circle,
    color: "text-red-400",
    bg: "group-hover:bg-red-500/10",
    ring: "group-hover:border-red-500/60",
  },
  {
    label: "GARIS SINGGUNG LINGKARAN",
    path: "/materi-matematika/kelas-8/garis-singgung-lingkaran",
    icon: CircleDot,
    color: "text-pink-400",
    bg: "group-hover:bg-pink-500/10",
    ring: "group-hover:border-pink-500/60",
  },
  {
    label: "BANGUN RUANG SISI DATAR",
    path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar",
    icon: Box,
    color: "text-teal-400",
    bg: "group-hover:bg-teal-500/10",
    ring: "group-hover:border-teal-500/60",
  },
];

const MateriMatematikaKelas8Page = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          MATERI MATEMATIKA - KELAS 8
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Pilih topik untuk mempelajari materi</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {topics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.label}
                onClick={() => { playPopSound(); navigate(topic.path); }}
                className={`group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                  ${topic.ring} ${topic.bg} transition-all duration-300
                  cursor-pointer text-left animate-slide-up`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <span className={`shrink-0 p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform ${topic.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-body text-sm text-white">{topic.label}</span>
                <span className={`ml-auto text-xs font-display transition-colors ${topic.color}`}>BELAJAR</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Materi Matematika
          </button>
        </div>
      </div>
    </div>
  );
};

export default MateriMatematikaKelas8Page;
