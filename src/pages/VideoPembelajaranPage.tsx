import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { useTheme } from "@/contexts/ThemeContext";
import { playPopSound } from "@/hooks/useAudio";
import {
  ThumbsUp,
  Share2,
  Eye,
  BookOpen,
  PlayCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Rocket,
  Star,
  Lock,
} from "lucide-react";

const ALL_VIDEOS = [
  {
    id: "mRy5nXHrHQk",
    title: "PENJUMLAHAN DAN PENGURANGAN BILANGAN BULAT",
    subject: "Bilangan Bulat",
    kelas: "Kelas 7",
    duration: "12:34",
    views: "12.400",
    likes: "847",
    date: "Januari 2024",
    channel: "NUMATIK CHANNEL",
    color: "from-cyan-600 to-blue-500",
    icon: "➕",
    description:
      "Video pembelajaran ini membahas materi Penjumlahan dan Pengurangan Bilangan Bulat untuk siswa SMP Kelas 7. Kamu akan belajar cara menjumlahkan dan mengurangkan bilangan bulat positif dan negatif dengan mudah dan menyenangkan menggunakan garis bilangan dan teknik cepat.\n\nTopik yang dibahas:\n• Pengertian bilangan bulat positif dan negatif\n• Cara menjumlahkan bilangan bulat\n• Cara mengurangkan bilangan bulat\n• Contoh soal dan pembahasan lengkap",
  },
  {
    id: "JrWic2SG_ts",
    title: "PERKALIAN DAN PEMBAGIAN PADA BILANGAN BULAT",
    subject: "Bilangan Bulat",
    kelas: "Kelas 7",
    duration: "14:20",
    views: "8.200",
    likes: "512",
    date: "Februari 2024",
    channel: "NUMATIK CHANNEL",
    color: "from-blue-600 to-cyan-500",
    icon: "✖️",
    description:
      "Video pembelajaran ini membahas materi Perkalian dan Pembagian pada Bilangan Bulat untuk siswa SMP Kelas 7. Kamu akan belajar cara mengalikan dan membagi bilangan bulat positif dan negatif dengan mudah dan menyenangkan.\n\nTopik yang dibahas:\n• Perkalian bilangan bulat positif dan negatif\n• Pembagian bilangan bulat positif dan negatif\n• Sifat-sifat perkalian dan pembagian bilangan bulat\n• Contoh soal dan pembahasan lengkap",
  },
];

const RECOMMENDED = [
  {
    id: null,
    title: "BILANGAN PECAHAN DAN OPERASINYA",
    kelas: "Kelas 7",
    duration: "18:05",
    views: "9.750",
    color: "from-violet-600 to-purple-400",
    icon: "➗",
  },
  {
    id: null,
    title: "PERSAMAAN LINIER SATU VARIABEL",
    kelas: "Kelas 7",
    duration: "20:15",
    views: "11.300",
    color: "from-orange-500 to-amber-400",
    icon: "📐",
  },
  {
    id: null,
    title: "LUAS DAN KELILING BANGUN DATAR",
    kelas: "Kelas 7",
    duration: "16:45",
    views: "7.890",
    color: "from-green-600 to-emerald-400",
    icon: "📏",
  },
  {
    id: null,
    title: "STATISTIKA DASAR — MEAN, MEDIAN, MODUS",
    kelas: "Kelas 8",
    duration: "22:10",
    views: "6.400",
    color: "from-rose-600 to-pink-400",
    icon: "📊",
  },
];

const VideoPembelajaranPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(ALL_VIDEOS[0].likes ? parseInt(ALL_VIDEOS[0].likes) : 0);
  const [descOpen, setDescOpen] = useState(false);

  const currentVideo = ALL_VIDEOS[activeIndex];

  const handleSelectVideo = (index: number) => {
    if (index === activeIndex) return;
    playPopSound();
    setActiveIndex(index);
    setLiked(false);
    setLikeCount(parseInt(ALL_VIDEOS[index].likes));
    setDescOpen(false);
  };

  const handleLike = () => {
    playPopSound();
    setLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  };

  const card = isDark
    ? "bg-[#141d35]/90 backdrop-blur-md border border-[#2a3560]"
    : "bg-white/90 backdrop-blur-md shadow-xl border border-blue-100";

  const textPrimary   = isDark ? "text-white"        : "text-gray-900";
  const textSub       = isDark ? "text-white/55"     : "text-gray-500";
  const textMuted     = isDark ? "text-white/35"     : "text-gray-400";
  const divider       = isDark ? "border-[#2a3560]"  : "border-blue-100";
  const badgeBg       = isDark ? "bg-[#1a2040]"      : "bg-blue-50";
  const badgeText     = isDark ? "text-cyan-300"     : "text-blue-700";
  const hoverCard     = isDark ? "hover:bg-[#1a2040]" : "hover:bg-blue-50";

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden ${isDark ? "gradient-space" : "gradient-snow"}`}>
      {isDark ? <Starfield /> : <Snowfall />}
      <PageNavigation />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-20 pb-10">

        {/* ── PAGE TITLE ── */}
        <div className="flex items-center gap-3 mb-6">
          <PlayCircle className={`w-7 h-7 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
          <h1 className={`font-display text-2xl font-bold ${isDark ? "text-white text-glow-cyan" : "text-blue-900"}`}>
            VIDEO PEMBELAJARAN
          </h1>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ════ LEFT COL — main player ════ */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Video player */}
            <div className={`rounded-2xl overflow-hidden ${isDark ? "shadow-[0_0_40px_rgba(6,182,212,0.15)]" : "shadow-2xl"}`}>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1&color=white`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-display ${isDark ? "bg-cyan-900/60 text-cyan-300 border border-cyan-700/50" : "bg-cyan-100 text-cyan-700 border border-cyan-200"}`}>
                <BookOpen className="w-3 h-3" /> {currentVideo.subject}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-display ${isDark ? "bg-violet-900/60 text-violet-300 border border-violet-700/50" : "bg-violet-100 text-violet-700 border border-violet-200"}`}>
                <Star className="w-3 h-3" /> {currentVideo.kelas}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-display ${isDark ? "bg-orange-900/60 text-orange-300 border border-orange-700/50" : "bg-orange-100 text-orange-700 border border-orange-200"}`}>
                <Clock className="w-3 h-3" /> {currentVideo.duration}
              </span>
            </div>

            {/* Title + meta card */}
            <div className={`rounded-2xl p-5 ${card}`}>

              <h2 className={`font-display text-lg font-bold leading-snug mb-3 ${textPrimary}`}>
                {currentVideo.title}
              </h2>

              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-body mb-4 pb-4 border-b ${textSub} ${divider}`}>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {currentVideo.views} kali ditonton
                </span>
                <span>{currentVideo.date}</span>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-3 flex-wrap">

                {/* Like button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-bold transition-all duration-200 ${
                    liked
                      ? isDark
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60"
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                      : isDark
                        ? "bg-[#1a2040] text-white/70 border border-[#2a3560] hover:border-cyan-600"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                  {likeCount.toLocaleString()}
                </button>

                {/* Share button */}
                <button
                  onClick={() => { playPopSound(); navigator.clipboard?.writeText(`https://www.youtube.com/watch?v=${currentVideo.id}`); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-bold transition-all duration-200 border ${
                    isDark
                      ? "bg-[#1a2040] text-white/70 border-[#2a3560] hover:border-violet-500 hover:text-violet-300"
                      : "bg-gray-100 text-gray-600 border-gray-200 hover:border-violet-400 hover:text-violet-600"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </button>

              </div>

              {/* Channel row */}
              <div className={`mt-4 pt-4 border-t flex items-center gap-3 ${divider}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${isDark ? "bg-gradient-to-br from-cyan-600 to-blue-700" : "bg-gradient-to-br from-blue-500 to-cyan-400"}`}>
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-display text-sm font-bold ${textPrimary}`}>{currentVideo.channel}</p>
                  <p className={`font-body text-xs ${textMuted}`}>Pembelajaran Matematika SMP Interaktif</p>
                </div>
              </div>

              {/* Description toggle */}
              <div className={`mt-4 pt-4 border-t ${divider}`}>
                <button
                  onClick={() => { playPopSound(); setDescOpen(p => !p); }}
                  className={`flex items-center gap-2 text-xs font-display font-bold mb-2 ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-500"}`}
                >
                  {descOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {descOpen ? "Sembunyikan Deskripsi" : "Lihat Deskripsi"}
                </button>
                {descOpen && (
                  <p className={`font-body text-sm leading-relaxed whitespace-pre-line ${textSub}`}>
                    {currentVideo.description}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* ════ RIGHT COL — sidebar ════ */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col gap-3">

            {/* Playlist header */}
            <div className={`rounded-2xl px-4 py-3 flex items-center gap-2 ${card}`}>
              <PlayCircle className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
              <p className={`font-display text-sm font-bold ${textPrimary}`}>Playlist Video</p>
              <span className={`ml-auto text-xs font-body ${textMuted}`}>{ALL_VIDEOS.length} video</span>
            </div>

            {/* Playlist — ALL_VIDEOS (clickable) */}
            {ALL_VIDEOS.map((vid, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(i)}
                  className={`rounded-2xl overflow-hidden flex gap-0 border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-[#1a2040] border-cyan-500/60 shadow-[0_0_16px_rgba(6,182,212,0.2)]"
                        : "bg-blue-50 border-blue-400 shadow-md"
                      : isDark
                        ? "bg-[#141d35]/70 border-[#2a3560] hover:bg-[#1a2040] hover:border-[#3a4580]"
                        : "bg-white/80 border-blue-100 hover:bg-blue-50/80 hover:border-blue-300"
                  } backdrop-blur-md`}
                >
                  {/* Thumbnail */}
                  <div className={`relative w-28 h-20 shrink-0 flex items-center justify-center bg-gradient-to-br ${vid.color} overflow-hidden`}>
                    <span className="text-3xl">{vid.icon}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle className="w-7 h-7 text-white drop-shadow" />
                      </div>
                    )}
                    {/* Duration chip */}
                    <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0.5">
                      <span className="text-white text-[9px] font-display">{vid.duration}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-3 py-2 min-w-0">
                    <p className={`font-display text-[11px] font-bold leading-tight line-clamp-2 mb-1 ${isActive ? (isDark ? "text-cyan-300" : "text-blue-700") : textPrimary}`}>
                      {vid.title}
                    </p>
                    <p className={`font-body text-[10px] ${textMuted}`}>{vid.kelas}</p>
                    <p className={`font-body text-[10px] ${textMuted} flex items-center gap-1 mt-0.5`}>
                      <Eye className="w-2.5 h-2.5" /> {vid.views} ditonton
                    </p>
                    {isActive && (
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-display font-bold ${
                        isDark ? "bg-cyan-900/60 text-cyan-300" : "bg-blue-100 text-blue-700"
                      }`}>
                        Sedang Diputar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Coming soon header */}
            <div className={`rounded-2xl px-4 py-3 flex items-center gap-2 ${card}`}>
              <Lock className={`w-4 h-4 ${isDark ? "text-orange-400" : "text-orange-500"}`} />
              <p className={`font-display text-sm font-bold ${textPrimary}`}>Segera Hadir</p>
            </div>

            {/* Recommended cards (coming soon) */}
            {RECOMMENDED.map((vid, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden flex gap-0 border transition-all duration-200 cursor-not-allowed ${
                  isDark
                    ? "bg-[#141d35]/70 border-[#2a3560] opacity-70 hover:opacity-85"
                    : "bg-white/80 border-blue-100 opacity-70 hover:opacity-90"
                } backdrop-blur-md`}
                title="Segera tersedia"
              >
                {/* Thumbnail */}
                <div className={`relative w-28 h-20 shrink-0 flex items-center justify-center bg-gradient-to-br ${vid.color} overflow-hidden`}>
                  <span className="text-3xl">{vid.icon}</span>
                  {/* Lock badge */}
                  <div className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5">
                    <Lock className="w-3 h-3 text-white/80" />
                  </div>
                  {/* Duration chip */}
                  <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0.5">
                    <span className="text-white text-[9px] font-display">{vid.duration}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 px-3 py-2 min-w-0">
                  <p className={`font-display text-[11px] font-bold leading-tight line-clamp-2 mb-1 ${textPrimary}`}>
                    {vid.title}
                  </p>
                  <p className={`font-body text-[10px] ${textMuted}`}>{vid.kelas}</p>
                  <p className={`font-body text-[10px] ${textMuted} flex items-center gap-1 mt-0.5`}>
                    <Eye className="w-2.5 h-2.5" /> {vid.views} ditonton
                  </p>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-display font-bold ${
                    isDark ? "bg-orange-900/50 text-orange-300" : "bg-orange-100 text-orange-600"
                  }`}>
                    Segera Hadir
                  </span>
                </div>
              </div>
            ))}

            {/* "More soon" note */}
            <div className={`rounded-2xl p-4 text-center ${card}`}>
              <p className={`font-body text-xs ${textSub} leading-relaxed`}>
                🚀 Tim NUMATIK sedang menyiapkan lebih banyak video pembelajaran seru untukmu. Nantikan update berikutnya!
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPembelajaranPage;
