import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import SpaceObjects from "@/components/SpaceObjects";
import { spaceBg } from "@/assets/placeholder";
import { playPopSound } from "@/hooks/useAudio";

const RotatingSun = () => (
  <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
    {/* Outer glow */}
    <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 blur-2xl animate-pulse" style={{ transform: 'scale(1.8)' }} />
    {/* Rotating rays ring */}
    <div
      className="absolute"
      style={{
        width: 96,
        height: 96,
        animation: 'spin 8s linear infinite',
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-yellow-300 rounded-full opacity-70"
          style={{
            width: 4,
            height: 18,
            left: '50%',
            top: '50%',
            transformOrigin: '2px -26px',
            transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-100%)`,
          }}
        />
      ))}
    </div>
    {/* Sun body */}
    <div
      className="relative rounded-full z-10"
      style={{
        width: 56,
        height: 56,
        background: 'radial-gradient(circle at 35% 35%, #ffe066, #ffb300 55%, #ff6f00 100%)',
        boxShadow: '0 0 24px 8px rgba(255,200,0,0.5), 0 0 48px 16px rgba(255,150,0,0.25)',
      }}
    >
      {/* Surface shimmer */}
      <div
        className="absolute rounded-full opacity-30"
        style={{
          width: 20,
          height: 14,
          top: 10,
          left: 10,
          background: 'radial-gradient(circle, #fff8dc, transparent)',
        }}
      />
    </div>
  </div>
);

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

        {/* App Logo - best position: top, sets visual identity before text */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0s' }}>
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-violet-500 opacity-30 blur-2xl scale-125 animate-pulse" />
            <img
              src="/logo-numatik-transparent.png"
              alt="Logo NUMATIK"
              className="relative w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 18px rgba(167,139,250,0.7))' }}
            />
          </div>
        </div>

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
        <div className="relative mb-12">
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

        {/* Rotating Sun */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <RotatingSun />
          <span className="text-xs text-yellow-300/60 tracking-widest font-display">☀ MATH SPACE</span>
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
