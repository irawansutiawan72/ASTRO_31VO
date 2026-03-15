import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { Settings, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { useSound } from "@/contexts/SoundContext";

const PengaturanPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { soundOn, toggleSound } = useSound();

  const isDark = theme === "dark";

  const setTheme = (newTheme: "dark" | "light") => {
    if (theme !== newTheme) {
      playPopSound();
      toggleTheme();
    }
  };

  const handleToggleSound = () => {
    if (soundOn) {
      toggleSound();
    } else {
      toggleSound();
      setTimeout(() => playPopSound(), 50);
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${isDark ? "gradient-space" : "gradient-snow"}`}>
      {isDark ? <Starfield /> : <Snowfall />}
      <PageNavigation />

      <div className="relative z-10 w-full max-w-sm px-5 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-center gap-3">
          <Settings className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className={`font-display text-3xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>
            Pengaturan
          </h1>
        </div>

        {/* ── TEMA TAMPILAN ── */}
        <div className={`rounded-2xl p-6 ${isDark ? "bg-[#141d35]/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md shadow-xl"}`}>
          <h2 className={`font-display text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            Tema Tampilan
          </h2>
          <p className={`font-body text-sm mb-6 leading-snug ${isDark ? "text-white/55" : "text-gray-500"}`}>
            Pilih tema yang kamu suka untuk tampilan aplikasi
          </p>

          <div className="grid grid-cols-2 gap-3">

            {/* Mode Gelap */}
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-xl py-6 px-3 flex flex-col items-center gap-3 border-2 transition-all duration-300 cursor-pointer ${
                isDark
                  ? "border-violet-500 bg-[#1a2040] shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                  : "border-gray-200 bg-gray-100 hover:border-violet-300"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? "bg-[#252d50]" : "bg-gray-200"}`}>
                <Moon className={`w-8 h-8 ${isDark ? "text-violet-300" : "text-gray-400"}`} />
              </div>
              <div className="text-center">
                <p className={`font-display font-bold text-base leading-tight ${isDark ? "text-white" : "text-gray-600"}`}>
                  Mode<br />Gelap
                </p>
                <p className={`font-body text-[11px] mt-1 ${isDark ? "text-white/45" : "text-gray-400"}`}>
                  Tema Luar Angkasa 🌌
                </p>
              </div>
            </button>

            {/* Mode Terang */}
            <button
              onClick={() => setTheme("light")}
              className={`rounded-xl py-6 px-3 flex flex-col items-center gap-3 border-2 transition-all duration-300 cursor-pointer ${
                !isDark
                  ? "border-violet-500 bg-blue-50 shadow-[0_0_18px_rgba(139,92,246,0.2)]"
                  : "border-[#2a3560] bg-[#1a2040] hover:border-violet-400"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${!isDark ? "bg-blue-100" : "bg-[#252d50]"}`}>
                <Sun className={`w-8 h-8 ${!isDark ? "text-yellow-500" : "text-gray-500"}`} />
              </div>
              <div className="text-center">
                <p className={`font-display font-bold text-base leading-tight ${!isDark ? "text-gray-800" : "text-gray-400"}`}>
                  Mode<br />Terang
                </p>
                <p className={`font-body text-[11px] mt-1 ${!isDark ? "text-gray-500" : "text-gray-500"}`}>
                  Tema Salju Cerah ❄️
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* ── EFEK SUARA ── */}
        <div className={`rounded-2xl p-6 ${isDark ? "bg-[#141d35]/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md shadow-xl"}`}>
          <h2 className={`font-display text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            Efek Suara
          </h2>
          <p className={`font-body text-sm mb-6 leading-snug ${isDark ? "text-white/55" : "text-gray-500"}`}>
            Aktifkan atau matikan suara tombol dan efek dalam aplikasi
          </p>

          <div className="grid grid-cols-2 gap-3">

            {/* Suara ON */}
            <button
              onClick={() => { if (!soundOn) handleToggleSound(); }}
              className={`rounded-xl py-6 px-3 flex flex-col items-center gap-3 border-2 transition-all duration-300 cursor-pointer ${
                soundOn
                  ? isDark
                    ? "border-cyan-500 bg-[#0d1f35] shadow-[0_0_18px_rgba(6,182,212,0.35)]"
                    : "border-cyan-500 bg-cyan-50 shadow-[0_0_18px_rgba(6,182,212,0.2)]"
                  : isDark
                    ? "border-[#2a3560] bg-[#1a2040] hover:border-cyan-600"
                    : "border-gray-200 bg-gray-100 hover:border-cyan-300"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                soundOn
                  ? isDark ? "bg-[#0e2a40]" : "bg-cyan-100"
                  : isDark ? "bg-[#252d50]" : "bg-gray-200"
              }`}>
                <Volume2 className={`w-8 h-8 transition-colors duration-300 ${
                  soundOn
                    ? isDark ? "text-cyan-300" : "text-cyan-600"
                    : isDark ? "text-gray-500" : "text-gray-400"
                }`} />
              </div>
              <div className="text-center">
                <p className={`font-display font-bold text-base leading-tight transition-colors duration-300 ${
                  soundOn
                    ? isDark ? "text-white" : "text-cyan-700"
                    : isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  Suara<br />Aktif
                </p>
                <p className={`font-body text-[11px] mt-1 ${
                  soundOn
                    ? isDark ? "text-cyan-400/70" : "text-cyan-600/70"
                    : isDark ? "text-gray-600" : "text-gray-400"
                }`}>
                  Efek suara menyala 🔊
                </p>
              </div>
            </button>

            {/* Suara OFF */}
            <button
              onClick={() => { if (soundOn) handleToggleSound(); }}
              className={`rounded-xl py-6 px-3 flex flex-col items-center gap-3 border-2 transition-all duration-300 cursor-pointer ${
                !soundOn
                  ? isDark
                    ? "border-rose-500 bg-[#2d1020] shadow-[0_0_18px_rgba(244,63,94,0.3)]"
                    : "border-rose-400 bg-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.15)]"
                  : isDark
                    ? "border-[#2a3560] bg-[#1a2040] hover:border-rose-700"
                    : "border-gray-200 bg-gray-100 hover:border-rose-300"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                !soundOn
                  ? isDark ? "bg-[#3d0e1e]" : "bg-rose-100"
                  : isDark ? "bg-[#252d50]" : "bg-gray-200"
              }`}>
                <VolumeX className={`w-8 h-8 transition-colors duration-300 ${
                  !soundOn
                    ? isDark ? "text-rose-400" : "text-rose-600"
                    : isDark ? "text-gray-500" : "text-gray-400"
                }`} />
              </div>
              <div className="text-center">
                <p className={`font-display font-bold text-base leading-tight transition-colors duration-300 ${
                  !soundOn
                    ? isDark ? "text-white" : "text-rose-700"
                    : isDark ? "text-gray-500" : "text-gray-400"
                }`}>
                  Suara<br />Mati
                </p>
                <p className={`font-body text-[11px] mt-1 ${
                  !soundOn
                    ? isDark ? "text-rose-400/70" : "text-rose-500/70"
                    : isDark ? "text-gray-600" : "text-gray-400"
                }`}>
                  Efek suara dimatikan 🔇
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Status note */}
        <p className={`text-center font-body text-xs ${isDark ? "text-white/40" : "text-blue-400"}`}>
          {isDark
            ? "Mode gelap aktif — bintang-bintang menghiasi layarmu ✨"
            : "Mode terang aktif — salju berjatuhan di sekitarmu ❄️"}
        </p>

      </div>
    </div>
  );
};

export default PengaturanPage;
