import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "UNSUR-UNSUR PADA DIAGRAM CARTESIUS", path: "/coming-soon" },
  { name: "JARAK ANTAR DUA TITIK DAN JARAK TITIK KE GARIS", path: "/coming-soon" },
  { name: "POSISI RELATIF SUATU TITIK TERHADAP SUATU GARIS", path: "/coming-soon" },
];

const KoordinatCartesiusPage = () => (
  <GameSubtopicPage
    title="KOORDINAT CARTESIUS"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="📍"
    kelasLabel="Kelas 8"
  />
);

export default KoordinatCartesiusPage;
