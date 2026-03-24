import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PERBANDINGAN UMUM, SATUAN PEMBANDING DAN RASIO", path: "/materi-matematika/kelas-7/perbandingan/umum" },
  { label: "PERBANDINGAN SENILAI DAN BERBALIK NILAI", path: "/materi-matematika/kelas-7/perbandingan/senilai" },
  { label: "PERBANDINGAN CAMPURAN", path: "/materi-matematika/kelas-7/perbandingan/campuran" },
  { label: "SKALA", path: "/materi-matematika/kelas-7/perbandingan/skala" },
];

const PerbandinganPage = () => (
  <MateriTopicPage
    title="PERBANDINGAN"
    emoji="⚖️"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default PerbandinganPage;
