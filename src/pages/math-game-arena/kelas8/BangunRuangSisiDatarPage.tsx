import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "KUBUS", path: "/math-game-arena/kelas-8/bangun-ruang-sisi-datar/kubus-game" },
  { name: "BALOK", path: "/coming-soon" },
  { name: "PRISMA", path: "/coming-soon" },
  { name: "LIMAS", path: "/coming-soon" },
  { name: "BANGUN RUANG SISI DATAR GABUNGAN", path: "/coming-soon" },
  { name: "MASALAH KONTEKSTUAL YANG BERKAITAN DENGAN BANGUN RUANG SISI DATAR", path: "/coming-soon" },
];

const BangunRuangSisiDatarPage = () => (
  <GameSubtopicPage
    title="BANGUN RUANG SISI DATAR"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="🧊"
    kelasLabel="Kelas 8"
  />
);

export default BangunRuangSisiDatarPage;
