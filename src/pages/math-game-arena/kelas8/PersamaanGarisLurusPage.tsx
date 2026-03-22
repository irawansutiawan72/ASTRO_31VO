import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "GRAFIK PERSAMAAN GARIS LURUS", path: "/coming-soon" },
  { name: "GRADIEN (KEMIRINGAN GARIS)", path: "/coming-soon" },
  { name: "MENENTUKAN PERSAMAAN GARIS LURUS", path: "/coming-soon" },
  { name: "HUBUNGAN 2 GARIS", path: "/coming-soon" },
  { name: "APLIKASI PERSAMAAN GARIS PADA SOAL KONTEKSTUAL", path: "/coming-soon" },
];

const PersamaanGarisLurusPage = () => (
  <GameSubtopicPage
    title="PERSAMAAN GARIS LURUS"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="📏"
    kelasLabel="Kelas 8"
  />
);

export default PersamaanGarisLurusPage;
