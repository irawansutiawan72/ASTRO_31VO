import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "JUAL BELI, UNTUNG DAN RUGI", path: "/materi-matematika/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" },
  { label: "DISKON", path: "/materi-matematika/kelas-7/aritmetika-sosial/diskon" },
  { label: "BRUTO, NETTO DAN TARA", path: "/materi-matematika/kelas-7/aritmetika-sosial/bruto-netto-tara" },
  { label: "BUNGA TUNGGAL", path: "/materi-matematika/kelas-7/aritmetika-sosial/bunga-tunggal" },
  { label: "PAJAK PERTAMBAHAN NILAI (PPN)", path: "/materi-matematika/kelas-7/aritmetika-sosial/ppn" },
  { label: "PAJAK PENGHASILAN (PPH)", path: "/materi-matematika/kelas-7/aritmetika-sosial/pph" },
];

const AritmetikaSosialPage = () => (
  <MateriTopicPage
    title="ARITMETIKA SOSIAL"
    emoji="💰"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-7"
    backLabel="Kembali ke Kelas 7"
  />
);

export default AritmetikaSosialPage;
