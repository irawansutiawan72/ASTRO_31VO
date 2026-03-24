import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "ARTI PECAHAN, PECAHAN SENILAI DAN MEMBANDINGKAN PECAHAN", path: "/materi-matematika/kelas-7/bilangan-rasional/arti-pecahan" },
  { label: "PECAHAN CAMPURAN DAN PERSEN", path: "/materi-matematika/kelas-7/bilangan-rasional/pecahan-campuran" },
  { label: "PENJUMLAHAN DAN PENGURANGAN PECAHAN", path: "/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan-pecahan" },
  { label: "PERKALIAN PECAHAN", path: "/materi-matematika/kelas-7/bilangan-rasional/perkalian-pecahan" },
  { label: "PEMBAGIAN PECAHAN", path: "/materi-matematika/kelas-7/bilangan-rasional/pembagian-pecahan" },
  { label: "BENTUK DESIMAL", path: "/materi-matematika/kelas-7/bilangan-rasional/bentuk-desimal" },
  { label: "PENJUMLAHAN DAN PENGURANGAN BENTUK DESIMAL", path: "/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan-bentuk-desimal" },
  { label: "PERKALIAN BENTUK DESIMAL", path: "/materi-matematika/kelas-7/bilangan-rasional/perkalian-bentuk-desimal" },
  { label: "PEMBAGIAN BENTUK DESIMAL", path: "/materi-matematika/kelas-7/bilangan-rasional/pembagian-bentuk-desimal" },
  { label: "PEMBULATAN BENTUK DESIMAL", path: "/materi-matematika/kelas-7/bilangan-rasional/pembulatan-bentuk-desimal" },
];

const BilanganRasionalPage = () => (
  <MateriTopicPage
    title="BILANGAN RASIONAL"
    emoji="🔵"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default BilanganRasionalPage;
