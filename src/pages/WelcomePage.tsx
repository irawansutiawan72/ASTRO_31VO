import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import SpaceObjects from "@/components/SpaceObjects";
import { spaceBg, logoNumatik } from "@/assets/placeholder";
import { playPopSound } from "@/hooks/useAudio";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <img src={spaceBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/40" />

      {/* Space objects and effects */}
      <SpaceObjects />

      {/* Starfield */}
      <Starfield />

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-2xl flex flex-col items-center px-4 py-16 sm:px-6">
        {/* Welcome text */}
        <p className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-cyan-400 mb-6 animate-fade-in">
          Selamat Datang di Aplikasi
        </p>

        {/* Main title */}
        <h1 className="font-display text-5xl sm:text-7xl font-black text-yellow-400 mb-8 drop-shadow-lg" style={{
          textShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)'
        }}>
          NUMATIK
        </h1>

        {/* Subtitle */}
        <p className="font-display text-sm sm:text-base font-semibold mb-12 leading-relaxed text-cyan-300">
          Numerasi Aktif dengan Teknologi<br />Informasi dan Komunikasi
        </p>

        {/* Main button with pulse animation */}
        <div className="relative mb-16">
          {/* Button background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-50 animate-button-pulse" />

          {/* Actual button */}
          <button
            onClick={() => {
              playPopSound();
              navigate("/menu");
            }}
            className="relative font-display text-xl sm:text-2xl px-12 py-6 rounded-2xl font-bold tracking-widest shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer animate-button-pulse bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-2 border-cyan-300 hover:border-cyan-200 active:scale-95"
          >
            🚀 MULAI
          </button>
        </div>

        {/* Logo */}
        <div className="mt-8 mb-12">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-20 blur-lg animate-pulse" />
            <img
              src={logoNumatik}
              alt="NUMATIK"
              className="relative w-24 h-24 mx-auto opacity-70 hover:opacity-100 transition-opacity animate-rotate-slow"
            />
          </div>
        </div>

        {/* Marquee text */}
        <div className="overflow-hidden w-full max-w-lg mx-auto bg-background/60 rounded-xl p-5 border border-cyan-500/30 backdrop-blur-sm">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-body font-semibold text-cyan-300 inline-block px-6">
              ✨ APLIKASI MULTIMEDIA PEMBELAJARAN INTERAKTIF MATEMATIKA SMP ✨
            </span>
            <span className="font-body font-semibold text-cyan-300 inline-block px-6">
              ✨ APLIKASI MULTIMEDIA PEMBELAJARAN INTERAKTIF MATEMATIKA SMP ✨
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
