import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "PENGERTIAN POLA DAN BARISAN BILANGAN", path: "/coming-soon" },
  { name: "POLA-POLA KHUSUS", path: "/coming-soon" },
  { name: "POLA ARITMETIKA", path: "/coming-soon" },
  { name: "POLA GEOMETRI", path: "/coming-soon" },
];

const PolaBilanganPage = () => (
  <GameSubtopicPage
    title="POLA BILANGAN"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="🔢"
    kelasLabel="Kelas 8"
  />
);

export default PolaBilanganPage;
