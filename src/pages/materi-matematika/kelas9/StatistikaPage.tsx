import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGANTAR STATISTIKA DAN PENGUMPULAN DATA", path: "/materi-matematika/kelas-9/statistika/pengantar" },
  { label: "PENYAJIAN DATA", path: "/materi-matematika/kelas-9/statistika/penyajian-data" },
  { label: "UKURAN PEMUSATAN DATA (RATA-RATA DAN RATA-RATA GABUNGAN)", path: "/materi-matematika/kelas-9/statistika/rata-rata" },
  { label: "UKURAN PEMUSATAN DATA (MEDIAN DAN MODUS)", path: "/materi-matematika/kelas-9/statistika/median-modus" },
  { label: "UKURAN LETAK DATA (KUARTIL)", path: "/materi-matematika/kelas-9/statistika/kuartil" },
  { label: "UKURAN PENYEBARAN DATA (JANGKAUAN, JANGKAUAN INTERKUARTIL, SIMPANGAN KUARTIL)", path: "/materi-matematika/kelas-9/statistika/penyebaran-data" },
];

const StatistikaPage = () => (
  <MateriTopicPage
    title="STATISTIKA"
    emoji="📊"
    kelas="Kelas 9"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-9"
    backLabel="Kembali ke Kelas 9"
  />
);

export default StatistikaPage;
