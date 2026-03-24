import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "PENGERTIAN DAN KEANGGOTAAAN SUATU HIMPUNAN", path: "/materi-matematika/kelas-7/himpunan/pengertian-keanggotaan" },
  { label: "HIMPUNAN BERHINGGA, HIMPUNAN KOSONG, DAN HIMPUNAN TAK HINGGA, HIMPUNAN BAGIAN, HIMPUNAN SEMESTA DAN HIMPUNAN KUASA", path: "/materi-matematika/kelas-7/himpunan/jenis-himpunan" },
  { label: "DIAGRAM VENN", path: "/materi-matematika/kelas-7/himpunan/diagram-venn" },
  { label: "PEMECAHAN MASALAH YANG BERKAITAN DENGAN HIMPUNAN", path: "/materi-matematika/kelas-7/himpunan/pemecahan-masalah" },
];

const HimpunanPage = () => (
  <MateriTopicPage
    title="HIMPUNAN"
    emoji="🔷"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default HimpunanPage;
