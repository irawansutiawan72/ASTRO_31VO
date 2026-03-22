import MeteorShootingGame, { QuizQuestion } from "@/components/MeteorShootingGame";

const questions: QuizQuestion[] = [
  {
    question: "Uang Ani, Budi, dan Citra berbanding 2 : 3 : 5. Jika total uang mereka Rp 200.000, berapa uang Budi?",
    options: ["Rp 40.000", "Rp 60.000", "Rp 80.000", "Rp 100.000"],
    correctIndex: 1,
  },
  {
    question: "Tiga sudut segitiga berbanding 1 : 2 : 3. Besar sudut yang terkecil adalah ...",
    options: ["20°", "30°", "40°", "50°"],
    correctIndex: 1,
  },
  {
    question: "Campuran cat merah, biru, dan putih adalah 3 : 2 : 5. Jika cat merah 6 liter, total cat seluruhnya adalah ...",
    options: ["15 liter", "18 liter", "20 liter", "25 liter"],
    correctIndex: 2,
  },
  {
    question: "Modal usaha tiga orang berbanding 4 : 3 : 3. Jika total modal Rp 500.000, berapa modal orang pertama?",
    options: ["Rp 150.000", "Rp 175.000", "Rp 200.000", "Rp 225.000"],
    correctIndex: 2,
  },
  {
    question: "Nilai perbandingan 3 : 4 jika dijumlahkan nilainya adalah 35, maka nilai yang lebih besar adalah ...",
    options: ["15", "18", "20", "25"],
    correctIndex: 2,
  },
];

const PerbandinganCampuranGamePage = () => (
  <MeteorShootingGame
    questions={questions}
    topicLabel="PERBANDINGAN CAMPURAN"
    backPath="/math-game-arena/kelas-7/perbandingan"
    backLabel="Kembali ke Perbandingan"
  />
);

export default PerbandinganCampuranGamePage;
