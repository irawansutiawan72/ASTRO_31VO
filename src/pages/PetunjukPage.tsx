import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import { Home, ArrowRight, ArrowLeft, X } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";

const PetunjukPage = () => {
  const navigate = useNavigate();

  const items = [
    { icon: <Home className="w-5 h-5" />, text: "Menuju ke Home" },
    { icon: <ArrowRight className="w-5 h-5" />, text: "Menuju ke halaman berikutnya" },
    { icon: <ArrowLeft className="w-5 h-5" />, text: "Menuju ke halaman sebelumnya" },
    { icon: <X className="w-5 h-5" />, text: "Keluar dari aplikasi" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/menu" nextPath="/materi" />
      <div className="relative z-10 max-w-2xl w-full px-4">
        <div className="flex justify-center mb-5">
          <img
            src="/logo-numatik.png"
            alt="NUMATIK Logo"
            className="w-24 h-24 object-contain drop-shadow-[0_0_16px_rgba(234,179,8,0.4)]"
          />
        </div>
        <h1 className="font-display text-3xl font-bold text-primary text-glow-cyan mb-8 text-center">
          PETUNJUK PENGGUNAAN
        </h1>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 space-y-4 mb-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-foreground animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                {item.icon}
              </div>
              <p className="text-sm font-body">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate("/menu")} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetunjukPage;
