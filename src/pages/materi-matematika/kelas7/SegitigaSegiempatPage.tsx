import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "GARIS BERAT, GARIS BAGI DAN GARIS TINGGI PADA SEGITIGA", path: "/materi-matematika/kelas-7/segitiga-dan-segiempat/garis-berat-bagi-tinggi" },
  { label: "KELILING SEGITIGA DAN SEGIEMPAT", path: "/materi-matematika/kelas-7/segitiga-dan-segiempat/keliling-segitiga-segiempat" },
  { label: "LUAS SEGITIGA", path: "/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segitiga" },
  { label: "LUAS SEGIEMPAT", path: "/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segiempat" },
  { label: "KELILING DAN LUAS BANGUN TAK BERATURAN", path: "/materi-matematika/kelas-7/segitiga-dan-segiempat/keliling-luas-bangun-tak-beraturan" },
];

const SegitigaSegiempatPage = () => (
  <MateriTopicPage
    title="SEGITIGA DAN SEGIEMPAT"
    emoji="🔺"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default SegitigaSegiempatPage;
