import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGERTIAN DAN UNSUR-UNSUR BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/pengertian-unsur" },
  { label: "PENJUMLAHAN DAN PENGURANGAN BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/penjumlahan-pengurangan" },
  { label: "PERKALIAN BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/perkalian" },
  { label: "PEMBAGIAN BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/pembagian" },
  { label: "PEMANGKATAN BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/pemangkatan" },
  { label: "SUBSTITUSI BILANGAN PADA BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/substitusi" },
  { label: "FAKTORISASI BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/faktorisasi" },
  { label: "OPERASI PECAHAN BENTUK ALJABAR", path: "/materi-matematika/kelas-7/aljabar/operasi-pecahan" },
];

const AljabarPage = () => (
  <MateriTopicPage
    title="ALJABAR"
    emoji="🔣"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default AljabarPage;
