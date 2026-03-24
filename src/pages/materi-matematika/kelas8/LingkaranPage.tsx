import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "UNSUR-UNSUR LINGKARAN", path: "/materi-matematika/kelas-8/lingkaran/unsur-unsur" },
  { label: "KELILING DAN LUAS LINGKARAN", path: "/materi-matematika/kelas-8/lingkaran/keliling-luas" },
  { label: "KAITAN LINGKARAN DENGAN BANGUN DATAR LAINNYA", path: "/materi-matematika/kelas-8/lingkaran/kaitan-bangun-datar" },
  { label: "PANJANG BUSUR DAN LUAS JURING", path: "/materi-matematika/kelas-8/lingkaran/busur-juring" },
  { label: "SUDUT PUSAT DAN SUDUT KELILING", path: "/materi-matematika/kelas-8/lingkaran/sudut-pusat-keliling" },
  { label: "PENERAPAN KONSEP LINGKARAN PADA PERMASALAHAN KONTEKSTUAL", path: "/materi-matematika/kelas-8/lingkaran/penerapan-kontekstual" },
];

const LingkaranPage = () => (
  <MateriTopicPage
    title="LINGKARAN"
    emoji="🔵"
    kelas="Kelas 8"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-8"
    backLabel="Kembali ke Kelas 8"
  />
);

export default LingkaranPage;
