import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "UNSUR-UNSUR LINGKARAN", path: "/coming-soon" },
  { name: "KELILING DAN LUAS LINGKARAN", path: "/coming-soon" },
  { name: "KAITAN LINGKARAN DENGAN BANGUN DATAR LAINNYA", path: "/coming-soon" },
  { name: "PANJANG BUSUR DAN LUAS JURING", path: "/coming-soon" },
  { name: "SUDUT PUSAT DAN SUDUT KELILING", path: "/coming-soon" },
  { name: "PENERAPAN KONSEP LINGKARAN PADA PERMASALAHAN KONTEKSTUAL", path: "/coming-soon" },
];

const LingkaranPage = () => (
  <GameSubtopicPage
    title="LINGKARAN"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="⭕"
    kelasLabel="Kelas 8"
  />
);

export default LingkaranPage;
