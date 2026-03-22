import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "DEFINISI DAN BENTUK UMUM SPLDV BESERTA KAITANNYA DENGAN PLDV", path: "/coming-soon" },
  { name: "PENYELESAIAN SPLDV DENGAN METODE GRAFIK", path: "/coming-soon" },
  { name: "PENYELESAIAN SPLDV DENGAN METODE SUBSTITUSI", path: "/coming-soon" },
  { name: "PENYELESAIAN SPLDV DENGAN METODE ELIMINASI", path: "/coming-soon" },
  { name: "PENYELESAIAN SPLDV DENGAN METODE CAMPURAN", path: "/coming-soon" },
  { name: "MEMBUAT MODEL DARI PERMASALAHAN YANG BERKAITAN DENGAN SPLDV", path: "/coming-soon" },
  { name: "PENYELESAIAN MASALAH YANG BERKAITAN DENGAN SPLDV", path: "/coming-soon" },
];

const SPLDVPage = () => (
  <GameSubtopicPage
    title="SISTEM PERSAMAAN LINEAR DUA VARIABEL"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="⚖️"
    kelasLabel="Kelas 8"
  />
);

export default SPLDVPage;
