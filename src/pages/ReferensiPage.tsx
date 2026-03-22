import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, Globe, Youtube } from "lucide-react";

const bukuRefs = [
  "Abdur Rahman As'ari, dkk. 2017. Matematika SMP/MTs Kelas VIII Semester I. Edisi Revisi. Jakarta: Kementerian Pendidikan dan Kebudayaan RI.",
  "Adinawan, M. C. 2017. MATEMATIKA UNTUK SMP/MTs KELAS VII SEMESTER 1. Jakarta: Erlangga.",
  "Adinawan, M. C. 2017. MATEMATIKA UNTUK SMP/MTs KELAS VIII SEMESTER 2. Jakarta: Erlangga.",
  "B.K. Noormandiri. 2018. Matematika untuk SMA/MA Kelas XII Kelompok Wajib. Jakarta: Erlangga.",
  "Raharjo, M dan Setiawan, A. 2019. Matematik 2 untuk SMP/MTS Kelas VIII. Jakarta: Erlangga.",
  "Sukino. 2020. The Great Matematika untuk Siswa SMP-MTs Kelas IX. Kab. Bandung: Srikandi Empat Widya Utama.",
];

const internetRefs = [
  { label: "defantri.com/2022/01/pembahasan-garis-sudut-matematika-smp.html", url: "https://defantri.com/2022/01/pembahasan-garis-sudut-matematika-smp.html", akses: "Desember 2025" },
  { label: "konsep-matematika.com/2022/07/prinsip-teleskopik-olim-matik-sma.html", url: "https://konsep-matematika.com/2022/07/prinsip-teleskopik-olim-matik-sma.html", akses: "Desember 2025" },
  { label: "m4th-lab.net/2019/09/cara-mudah-memahami-modulo-persiapan.html", url: "https://m4th-lab.net/2019/09/cara-mudah-memahami-modulo-persiapan.html", akses: "November 2025" },
  { label: "pngtree.com/freepng/3d-sun-full-view_16171547.html", url: "https://pngtree.com/freepng/3d-sun-full-view_16171547.html", akses: "12 Maret 2026" },
  { label: "bing.com/images/create", url: "https://bing.com/images/create", akses: "Januari 2026" },
  { label: "youtube.com/watch?v=PXT5uJP1WwE", url: "https://www.youtube.com/watch?v=PXT5uJP1WwE", akses: "Maret 2026", author: "Nurahman, F.", title: "TEMPLATE GAME INTERAKTIF POWERPOINT #4" },
];

const ReferensiPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/latihan" />
      <div className="relative z-10 max-w-2xl w-full px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-primary text-glow-cyan mb-8 text-center">
          SUMBER REFERENSI
        </h1>

        {/* Buku */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-accent" />
            <h2 className="font-display text-base font-bold text-accent">Buku</h2>
          </div>
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5 space-y-4">
            {bukuRefs.map((r, i) => (
              <div key={i} className="flex gap-3 text-sm text-muted-foreground font-body animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="text-primary font-display font-bold shrink-0">[{i + 1}]</span>
                <p className="leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internet */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-accent" />
            <h2 className="font-display text-base font-bold text-accent">Internet</h2>
          </div>
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5 space-y-4">
            {internetRefs.map((r, i) => (
              <div key={i} className="flex gap-3 text-sm font-body animate-slide-up" style={{ animationDelay: `${(bukuRefs.length + i) * 0.08}s` }}>
                <span className="text-primary font-display font-bold shrink-0">[{bukuRefs.length + i + 1}]</span>
                <div className="leading-relaxed">
                  {(r as any).author && (
                    <p className="text-muted-foreground mb-0.5">
                      {(r as any).author}{" "}
                      <span className="italic text-foreground/80">{(r as any).title}</span>
                      {" "}
                      <Youtube className="inline w-3.5 h-3.5 text-red-500 mb-0.5" />
                      {" "}
                      <span className="text-muted-foreground text-xs">YouTube.</span>
                    </p>
                  )}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 break-all transition-colors"
                  >
                    {r.label}
                  </a>
                  <span className="text-muted-foreground ml-1">(diakses {r.akses})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigate("/menu")} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferensiPage;
