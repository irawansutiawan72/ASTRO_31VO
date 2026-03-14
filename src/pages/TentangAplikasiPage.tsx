import { useEffect, useRef } from "react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";

const TentangAplikasiPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />

      {/* Shooting stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animation: `shootingStar ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
              boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.6)'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }
      `}</style>

      <PageNavigation />

      <div className="relative z-10 max-w-4xl w-full px-4 py-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-20 blur-2xl animate-pulse" />
            <img
              src="/logo-numatik.png"
              alt="NUMATIK Logo"
              className="relative w-32 h-32 mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]"
            />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-primary text-glow-cyan mb-2">
            NUMATIK
          </h1>
          <p className="text-accent font-body text-sm">
            Numerasi Aktif dengan Teknologi Informasi dan Komunikasi
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 md:p-8 mb-6 animate-slide-up">
          <div className="space-y-4">
            <p className="text-white font-body text-sm md:text-base leading-relaxed text-justify">
              <strong className="text-primary">Numatik (Versi 1A)</strong> adalah aplikasi edukasi matematika yang dirancang khusus untuk menjembatani tantangan belajar di era digital. Lahir dari semangat untuk menghadirkan pembelajaran yang tidak hanya informatif, tetapi juga <strong className="text-accent">bermakna dan menyenangkan</strong>.
            </p>

            <p className="text-white/90 font-body text-sm md:text-base leading-relaxed text-justify">
              Diluncurkan pertama kali pada tahun <strong className="text-primary">2026</strong>, Numatik dikembangkan sepenuhnya selaras dengan <strong className="text-accent">Kurikulum Merdeka</strong>. Aplikasi ini mengintegrasikan pendekatan <strong className="text-secondary">Deep Learning</strong> untuk memastikan siswa tidak sekadar menghafal rumus, melainkan memahami konsep secara mendalam, kritis, dan kontekstual.
            </p>

            <p className="text-white/80 font-body text-sm md:text-base leading-relaxed text-justify">
              Walaupun awalnya didedikasikan untuk siswa-siswi <strong className="text-primary">SMPN 28 Bandung</strong>, Numatik dipersiapkan untuk menjadi sahabat belajar bagi seluruh siswa SMP di pelosok Nusantara.
            </p>
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up text-center" style={{ animationDelay: '0.3s' }}>
          <p className="text-primary font-display text-xs mb-2">DIKEMBANGKAN OLEH</p>
          <p className="text-white font-body text-base md:text-lg font-bold mb-1">Irawan Sutiawan, M.Pd</p>
          <p className="text-white/60 font-body text-sm mb-3">SMPN 28 Bandung</p>
          <p className="text-accent font-body text-sm">numatik.app@gmail.com</p>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-white/40 font-body text-xs">
            Versi 1A - © 2026 NUMATIK. All rights reserved.
          </p>
        </div>

        <button
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className="mt-6 block mx-auto text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default TentangAplikasiPage;
