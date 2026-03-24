import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENJUMLAHAN BILANGAN BULAT", path: "/materi-matematika/kelas-7/bilangan-bulat/penjumlahan" },
  { label: "PENGURANGAN BILANGAN BULAT", path: "/materi-matematika/kelas-7/bilangan-bulat/pengurangan" },
  { label: "PERKALIAN BILANGAN BULAT", path: "/materi-matematika/kelas-7/bilangan-bulat/perkalian" },
  { label: "PEMBAGIAN BILANGAN BULAT", path: "/materi-matematika/kelas-7/bilangan-bulat/pembagian" },
  { label: "OPERASI HITUNG CAMPURAN BILANGAN BULAT", path: "/materi-matematika/kelas-7/bilangan-bulat/operasi-campuran" },
  { label: "KPK DAN FPB", path: "/materi-matematika/kelas-7/bilangan-bulat/kpk-fpb" },
];

const BilanganBulatPage = () => (
  <MateriTopicPage
    title="BILANGAN BULAT"
    emoji="🔢"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default BilanganBulatPage;
