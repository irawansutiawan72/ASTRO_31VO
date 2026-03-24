import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGERTIAN POLA DAN BARISAN BILANGAN", path: "/materi-matematika/kelas-8/pola-bilangan/pengertian" },
  { label: "POLA-POLA KHUSUS", path: "/materi-matematika/kelas-8/pola-bilangan/pola-khusus" },
  { label: "POLA ARITMETIKA", path: "/materi-matematika/kelas-8/pola-bilangan/pola-aritmetika" },
  { label: "POLA GEOMETRI", path: "/materi-matematika/kelas-8/pola-bilangan/pola-geometri" },
];

const PolaBilanganPage = () => (
  <MateriTopicPage
    title="POLA BILANGAN"
    emoji="🔢"
    kelas="Kelas 8"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-8"
    backLabel="Kembali ke Kelas 8"
  />
);

export default PolaBilanganPage;
