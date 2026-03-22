import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "PENGERTIAN RELASI DAN PENYAJIANNYA", path: "/coming-soon" },
  { name: "PENGERTIAN FUNGSI DAN PENYAJIANNYA", path: "/coming-soon" },
  { name: "MENENTUKAN BANYAK FUNGSI DAN KORESPONDENSI SATU-SATU", path: "/coming-soon" },
  { name: "NOTASI DAN RUMUS FUNGSI", path: "/coming-soon" },
  { name: "GRAFIK FUNGSI", path: "/coming-soon" },
];

const RelasiFungsiPage = () => (
  <GameSubtopicPage
    title="RELASI DAN FUNGSI"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="📊"
    kelasLabel="Kelas 8"
  />
);

export default RelasiFungsiPage;
