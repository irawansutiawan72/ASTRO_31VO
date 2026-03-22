import GameSubtopicPage from "@/components/GameSubtopicPage";

const subtopics = [
  { name: "PENGERTIAN DAN SIFAT GARIS SINGGUNG LINGKARAN", path: "/coming-soon" },
  { name: "MENGHITUNG PANJANG GARIS SINGGUNG DARI TITIK DI LUAR LINGKARAN", path: "/coming-soon" },
  { name: "GARIS SINGGUNG PERSEKUTUAN LUAR (GSPL)", path: "/coming-soon" },
  { name: "GARIS SINGGUNG PERSEKUTUAN DALAM (GSPD)", path: "/coming-soon" },
  { name: "SABUK LILITAN MINIMAL (PENERAPAN)", path: "/coming-soon" },
];

const GarisSinggungLingkaranPage = () => (
  <GameSubtopicPage
    title="GARIS SINGGUNG LINGKARAN"
    subtopics={subtopics}
    backPath="/math-game-arena/kelas-8"
    backLabel="Kembali ke Kelas 8"
    icon="🔵"
    kelasLabel="Kelas 8"
  />
);

export default GarisSinggungLingkaranPage;
