import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGERTIAN DAN NOTASI PANGKAT", path: "/materi-matematika/kelas-9/bilangan-berpangkat/pengertian-notasi" },
  { label: "SIFAT-SIFAT OPERASI BILANGAN BERPANGKAT", path: "/materi-matematika/kelas-9/bilangan-berpangkat/sifat-sifat-operasi" },
  { label: "BENTUK AKAR", path: "/materi-matematika/kelas-9/bilangan-berpangkat/bentuk-akar" },
  { label: "NOTASI ILMIAH", path: "/materi-matematika/kelas-9/bilangan-berpangkat/notasi-ilmiah" },
];

const BilanganBerpangkatPage = () => (
  <MateriTopicPage
    title="BILANGAN BERPANGKAT"
    emoji="⚡"
    kelas="Kelas 9"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-9"
    backLabel="Kembali ke Kelas 9"
  />
);

export default BilanganBerpangkatPage;
