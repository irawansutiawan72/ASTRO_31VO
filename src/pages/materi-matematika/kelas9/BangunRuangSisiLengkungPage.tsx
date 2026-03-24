import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "TABUNG", path: "/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/tabung" },
  { label: "KERUCUT", path: "/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/kerucut" },
  { label: "BOLA", path: "/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/bola" },
  { label: "PERUBAHAN LUAS DAN VOLUME BANGUN RUANG SISI LENGKUNG", path: "/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/perubahan-volume" },
  { label: "BANGUN RUANG SISI LENGKUNG GABUNGAN", path: "/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/gabungan" },
];

const BangunRuangSisiLengkungPage = () => (
  <MateriTopicPage
    title="BANGUN RUANG SISI LENGKUNG"
    emoji="🌐"
    kelas="Kelas 9"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-9"
    backLabel="Kembali ke Kelas 9"
  />
);

export default BangunRuangSisiLengkungPage;
