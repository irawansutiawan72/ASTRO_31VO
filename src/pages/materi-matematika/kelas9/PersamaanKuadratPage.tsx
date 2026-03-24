import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "BENTUK UMUM PERSAMAAN KUADRAT", path: "/materi-matematika/kelas-9/persamaan-kuadrat/bentuk-umum" },
  { label: "MENENTUKAN AKAR-AKAR PERSAMAAN KUADRAT DENGAN PEMFAKTORAN", path: "/materi-matematika/kelas-9/persamaan-kuadrat/pemfaktoran" },
  { label: "MENENTUKAN AKAR-AKAR PERSAMAAN KUADRAT DENGAN RUMUS KUADRATIK", path: "/materi-matematika/kelas-9/persamaan-kuadrat/rumus-kuadratik" },
  { label: "AKAR-AKAR PERSAMAAN KUADRAT DENGAN PELENGKAP KUADRAT", path: "/materi-matematika/kelas-9/persamaan-kuadrat/pelengkap-kuadrat" },
  { label: "DISKRIMINAN", path: "/materi-matematika/kelas-9/persamaan-kuadrat/diskriminan" },
  { label: "MENYUSUN PERSAMAAN KUADRAT BARU", path: "/materi-matematika/kelas-9/persamaan-kuadrat/menyusun-persamaan-baru" },
  { label: "PENERAPAN PERSAMAAN KUADRAT PADA PERMASALAHAN KONTEKSTUAL", path: "/materi-matematika/kelas-9/persamaan-kuadrat/penerapan-kontekstual" },
];

const PersamaanKuadratPage = () => (
  <MateriTopicPage
    title="PERSAMAAN KUADRAT (PENGAYAAN)"
    emoji="🔣"
    kelas="Kelas 9"
    subtopics={subtopics}
    backPath="/materi-matematika/kelas-9"
    backLabel="Kembali ke Kelas 9"
  />
);

export default PersamaanKuadratPage;
