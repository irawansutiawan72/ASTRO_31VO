import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "GRAFIK PERSAMAAN GARIS LURUS", path: "/materi-matematika/kelas-8/persamaan-garis-lurus/grafik" },
  { label: "GRADIEN (KEMIRINGAN GARIS)", path: "/materi-matematika/kelas-8/persamaan-garis-lurus/gradien" },
  { label: "MENENTUKAN PERSAMAAN GARIS LURUS", path: "/materi-matematika/kelas-8/persamaan-garis-lurus/menentukan-pgl" },
  { label: "HUBUNGAN 2 GARIS", path: "/materi-matematika/kelas-8/persamaan-garis-lurus/hubungan-2-garis" },
  { label: "APLIKASI PERSAMAAN GARIS PADA SOAL KONTEKSTUAL", path: "/materi-matematika/kelas-8/persamaan-garis-lurus/aplikasi-kontekstual" },
];

const PersamaanGarisLurusPage = () => (
  <MateriTopicPage
    title="PERSAMAAN GARIS LURUS"
    emoji="📏"
    kelas="Kelas 8"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-8"
    backLabel="Kembali ke Kelas 8"
  />
);

export default PersamaanGarisLurusPage;
