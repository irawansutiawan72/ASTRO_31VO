import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "KUBUS", path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar/kubus" },
  { label: "BALOK", path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar/balok" },
  { label: "PRISMA", path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar/prisma" },
  { label: "LIMAS", path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar/limas" },
  { label: "BANGUN RUANG SISI DATAR GABUNGAN", path: "/materi-matematika/kelas-8/bangun-ruang-sisi-datar/gabungan" },
  { label: "MASALAH KONTEKSTUAL YANG BERKAITAN DENGAN BANGUN RUANG SISI DATAR", path: "/coming-soon" },
];

const BangunRuangSisiDatarPage = () => (
  <MateriTopicPage
    title="BANGUN RUANG SISI DATAR"
    emoji="📦"
    kelas="Kelas 8"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-8"
    backLabel="Kembali ke Kelas 8"
  />
);

export default BangunRuangSisiDatarPage;
