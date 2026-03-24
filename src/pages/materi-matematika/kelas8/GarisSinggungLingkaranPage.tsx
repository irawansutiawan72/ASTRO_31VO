import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGERTIAN DAN SIFAT GARIS SINGGUNG LINGKARAN", path: "/materi-matematika/kelas-8/garis-singgung-lingkaran/pengertian" },
  { label: "MENGHITUNG PANJANG GARIS SINGGUNG DARI TITIK DI LUAR LINGKARAN", path: "/materi-matematika/kelas-8/garis-singgung-lingkaran/menghitung-panjang" },
  { label: "GARIS SINGGUNG PERSEKUTUAN LUAR (GSPL)", path: "/materi-matematika/kelas-8/garis-singgung-lingkaran/gspl" },
  { label: "GARIS SINGGUNG PERSEKUTUAN DALAM (GSPD)", path: "/materi-matematika/kelas-8/garis-singgung-lingkaran/gspd" },
  { label: "SABUK LILITAN MINIMAL (PENERAPAN)", path: "/materi-matematika/kelas-8/garis-singgung-lingkaran/sabuk-lilitan" },
];

const GarisSinggungLingkaranPage = () => (
  <MateriTopicPage
    title="GARIS SINGGUNG LINGKARAN"
    emoji="⭕"
    kelas="Kelas 8"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-8"
    backLabel="Kembali ke Kelas 8"
  />
);

export default GarisSinggungLingkaranPage;
