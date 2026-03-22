import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "PEMBUKTIAN TEOREMA PYTHAGORAS", path: "/coming-soon" },
  { name: "MENGHITUNG PANJANG SEGITIGA SIKU-SIKU", path: "/coming-soon" },
  { name: "TRIPLE PYTHAGORAS", path: "/coming-soon" },
  { name: "PYTHAGORAS DAN JENIS-JENIS SEGITIGA", path: "/coming-soon" },
  { name: "PERBANDINGAN SISI SEGITIGA SIKU-SIKU SUDUT KHUSUS", path: "/coming-soon" },
  { name: "PENERAPAN TEOREMA PYTHAGORAS PADA MASALAH KONTEKSTUAL", path: "/coming-soon" },
];

const TeoremaPythagorasPage = () => (
  <GameSubtopicPage
    title="TEOREMA PYTHAGORAS"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="📐"
    kelasLabel="Kelas 8"
  />
);

export default TeoremaPythagorasPage;
