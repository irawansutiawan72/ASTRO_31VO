import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { startGlobalAmbient } from "@/hooks/useAudio";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SoundProvider } from "@/contexts/SoundContext";
import WelcomePage from "./pages/WelcomePage";
import MenuPage from "./pages/MenuPage";
import PetunjukPage from "./pages/PetunjukPage";
import QuizPage from "./pages/QuizPage";
import ReferensiPage from "./pages/ReferensiPage";
import DonasiPage from "./pages/DonasiPage";
import BiografiPage from "./pages/BiografiPage";
import OlimpiadePage from "./pages/OlimpiadePage";
import OlimpiadeBilanganBulatPage from "./pages/OlimpiadeBilanganBulatPage";
import OlimpiadeBilanganRasionalPage from "./pages/OlimpiadeBilanganRasionalPage";
import OlimpiadeBilanganBerpangkatPage from "./pages/OlimpiadeBilanganBerpangkatPage";
import OlimpiadeStatistikaPage from "./pages/OlimpiadeStatistikaPage";
import OlimpiadeBilanganIrasionalPage from "./pages/OlimpiadeBilanganIrasionalPage";
import OlimpiadeKPKFPBPage from "./pages/OlimpiadeKPKFPBPage";
import OlimpiadeModuloPage from "./pages/OlimpiadeModuloPage";
import OlimpiadeHimpunanPage from "./pages/OlimpiadeHimpunanPage";
import OlimpiadeRelasiFungsiPage from "./pages/OlimpiadeRelasiFungsiPage";
import OlimpiadePerbandinganPage from "./pages/OlimpiadePerbandinganPage";
import OlimpiadeAljabarPage from "./pages/OlimpiadeAljabarPage";
import OlimpiadePolaBilanganPage from "./pages/OlimpiadePolaBilanganPage";
import OlimpiadeSPLDVPage from "./pages/OlimpiadeSPLDVPage";
import OlimpiadeGarisSudutPage from "./pages/OlimpiadeGarisSudutPage";
import OlimpiadeKoordinatCartesiusPage from "./pages/OlimpiadeKoordinatCartesiusPage";
import OlimpiadeTeoremaPage from "./pages/OlimpiadeTeoremaPage";
import OlimpiadeSegitigaSegiempatPage from "./pages/OlimpiadeSegitigaSegiempatPage";
import OlimpiadeLingkaranPage from "./pages/OlimpiadeLingkaranPage";
import OlimpiadeBangunRuangSisiDatarPage from "./pages/OlimpiadeBangunRuangSisiDatarPage";
import OlimpiadeBangunRuangSisiLengkungPage from "./pages/OlimpiadeBangunRuangSisiLengkungPage";
import OlimpiadePLSVPage from "./pages/OlimpiadePLSVPage";
import OlimpiadePersamaanGarisPage from "./pages/OlimpiadePersamaanGarisPage";
import OlimpiadePersamaanKuadratPage from "./pages/OlimpiadePersamaanKuadratPage";
import OlimpiadeFungsiKuadratPage from "./pages/OlimpiadeFungsiKuadratPage";
import OlimpiadeAritmetikaSosialPage from "./pages/OlimpiadeAritmetikaSosialPage";
import OlimpiadeKesebangunanPage from "./pages/OlimpiadeKesebangunanPage";
import OlimpiadeTransformasiPage from "./pages/OlimpiadeTransformasiPage";
import OlimpiadePeluangPage from "./pages/OlimpiadePeluangPage";
import TKAPage from "./pages/TKAPage";
import TKALatihan1Page from "./pages/tka/TKALatihan1Page";
import PapanPeringkatPage from "./pages/PapanPeringkatPage";
import BankSoalPage from "./pages/BankSoalPage";
import BankSoalBilanganBulatPage from "./pages/bank-soal/BilanganBulatPage";
import BankSoalSegitigaSegiempatPage from "./pages/bank-soal/SegitigaSegiempatPage";
import ChatAIPage from "./pages/ChatAIPage";
import PengaturanPage from "./pages/PengaturanPage";
import TentangAplikasiPage from "./pages/TentangAplikasiPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import KalkulatorScientificPage from "./pages/KalkulatorScientificPage";
import VideoPembelajaranPage from "./pages/VideoPembelajaranPage";
import KumpulanRumusPage from "./pages/KumpulanRumusPage";
import KonversiSatuanPage from "./pages/KonversiSatuanPage";
import NotFound from "./pages/NotFound";

// Latihan Mandiri Pages
import LatihanMandiriPage from "./pages/LatihanMandiriPage";
import LatihanMandiriKelas7Page from "./pages/LatihanMandiriKelas7Page";
import LatihanMandiriKelas8Page from "./pages/LatihanMandiriKelas8Page";
import LatihanMandiriKelas9Page from "./pages/LatihanMandiriKelas9Page";

// Kelas 7 Topic Pages
import BilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/BilanganBulatPage";
import PenjumlahanBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/PenjumlahanPage";
import PenguranganBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/PenguranganPage";
import PerkalianBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/PerkalianPage";
import PembagianBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/PembagianPage";
import OperasiCampuranBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/OperasiCampuranPage";
import KPKFPBBilanganBulatK7Page from "./pages/latihan-mandiri/kelas7/bilangan-bulat/KPKFPBPage";
import BilanganRasionalK7Page from "./pages/latihan-mandiri/kelas7/BilanganRasionalPage";
import AljabarK7Page from "./pages/latihan-mandiri/kelas7/AljabarPage";
import PLSVPtLSVK7Page from "./pages/latihan-mandiri/kelas7/PLSVPtLSVPage";
import PerbandinganK7Page from "./pages/latihan-mandiri/kelas7/PerbandinganPage";
import PerbandinganUmumK7Page from "./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganUmumPage";
import PerbandinganSenilaiK7Page from "./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSenilaiPage";
import PerbandinganCampuranK7Page from "./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganCampuranPage";
import PerbandinganSkalaK7Page from "./pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSkalaPage";
import AritmetikaSosialK7Page from "./pages/latihan-mandiri/kelas7/AritmetikaSosialPage";
import JualBeliUntungRugiK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/JualBeliUntungRugiPage";
import DiskonK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/DiskonPage";
import BrutoNettoTaraK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/BrutoNettoTaraPage";
import BungaTunggalK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/BungaTunggalPage";
import PPNK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/PPNPage";
import PPhK7Page from "./pages/latihan-mandiri/kelas7/aritmetika-sosial/PPhPage";
import GarisDanSudutK7Page from "./pages/latihan-mandiri/kelas7/GarisDanSudutPage";
import HubunganDuaGarisK7Page from "./pages/latihan-mandiri/kelas7/garis-dan-sudut/HubunganDuaGarisPage";
import SegitigaSegiempatK7Page from "./pages/latihan-mandiri/kelas7/SegitigaSegiempatPage";
import GarisBeratBagiTinggiLatihanK7Page from "./pages/latihan-mandiri/kelas7/segitiga-segiempat/GarisBeratBagiTinggiPage";
import KelilingSegitigaSegiempatLatihanK7Page from "./pages/latihan-mandiri/kelas7/segitiga-segiempat/KelilingSegitigaSegiempatPage";
import HimpunanK7Page from "./pages/latihan-mandiri/kelas7/HimpunanPage";

// Kelas 8 Topic Pages
import PolaBilanganK8Page from "./pages/latihan-mandiri/kelas8/PolaBilanganPage";
import KoordinatCartesiusK8Page from "./pages/latihan-mandiri/kelas8/KoordinatCartesiusPage";
import RelasiFungsiK8Page from "./pages/latihan-mandiri/kelas8/RelasiFungsiPage";
import SPLDVK8Page from "./pages/latihan-mandiri/kelas8/SPLDVPage";
import PersamaanGarisLurusK8Page from "./pages/latihan-mandiri/kelas8/PersamaanGarisLurusPage";
import TeoremaPythagorasK8Page from "./pages/latihan-mandiri/kelas8/TeoremaPythagorasPage";
import LingkaranK8Page from "./pages/latihan-mandiri/kelas8/LingkaranPage";
import GarisSinggungLingkaranK8Page from "./pages/latihan-mandiri/kelas8/GarisSinggungLingkaranPage";
import BangunRuangSisiDatarK8Page from "./pages/latihan-mandiri/kelas8/BangunRuangSisiDatarPage";

// Kelas 9 Topic Pages
import BilanganBerpangkatK9Page from "./pages/latihan-mandiri/kelas9/BilanganBerpangkatPage";
import KesebangunanKekongruenK9Page from "./pages/latihan-mandiri/kelas9/KesebangunanKekongruenPage";
import TransformasiGeometriK9Page from "./pages/latihan-mandiri/kelas9/TransformasiGeometriPage";
import BangunRuangSisiLengkungK9Page from "./pages/latihan-mandiri/kelas9/BangunRuangSisiLengkungPage";
import StatistikaK9Page from "./pages/latihan-mandiri/kelas9/StatistikaPage";
import PeluangK9Page from "./pages/latihan-mandiri/kelas9/PeluangPage";
import PersamaanKuadratK9Page from "./pages/latihan-mandiri/kelas9/PersamaanKuadratPage";
import FungsiKuadratK9Page from "./pages/latihan-mandiri/kelas9/FungsiKuadratPage";

// Math Game Arena Pages
import MathGameArenaPage from "./pages/MathGameArenaPage";
import MathGameArenaKelas7Page from "./pages/MathGameArenaKelas7Page";
import MathGameArenaKelas8Page from "./pages/MathGameArenaKelas8Page";
import MathGameArenaKelas9Page from "./pages/MathGameArenaKelas9Page";

// Math Game Arena - Kelas 7 Topic Pages
import BilanganBulatMGAK7Page from "./pages/math-game-arena/kelas7/BilanganBulatPage";
import BilanganRasionalMGAK7Page from "./pages/math-game-arena/kelas7/BilanganRasionalPage";
import AljabarMGAK7Page from "./pages/math-game-arena/kelas7/AljabarPage";
import PLSVPtLSVMGAK7Page from "./pages/math-game-arena/kelas7/PLSVPtLSVPage";
import PerbandinganMGAK7Page from "./pages/math-game-arena/kelas7/PerbandinganPage";
import PenguranganBilanganBulatGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/PenguranganGamePage";
import PerkalianBilanganBulatGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/PerkalianGamePage";
import PembagianBilanganBulatGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/PembagianGamePage";
import OperasiCampuranBilanganBulatGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/OperasiCampuranGamePage";
import KPKFPBGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/KPKFPBGamePage";
import AritmetikaSosialMGAK7Page from "./pages/math-game-arena/kelas7/AritmetikaSosialPage";
import JualBeliUntungRugiGameMGAK7Page from "./pages/math-game-arena/kelas7/aritmetika-sosial/JualBeliUntungRugiGamePage";
import DiskonGameMGAK7Page from "./pages/math-game-arena/kelas7/aritmetika-sosial/DiskonGamePage";
import BrutoNettoTaraGameMGAK7Page from "./pages/math-game-arena/kelas7/aritmetika-sosial/BrutoNettoTaraGamePage";
import PPNGameMGAK7Page from "./pages/math-game-arena/kelas7/aritmetika-sosial/PPNGamePage";
import PPhGameMGAK7Page from "./pages/math-game-arena/kelas7/aritmetika-sosial/PPhGamePage";
import GarisDanSudutMGAK7Page from "./pages/math-game-arena/kelas7/GarisDanSudutPage";
import SegitigaSegiempatMGAK7Page from "./pages/math-game-arena/kelas7/SegitigaSegiempatPage";
import HimpunanMGAK7Page from "./pages/math-game-arena/kelas7/HimpunanPage";

// Math Game Arena - Kelas 8 Topic Pages
import PolaBilanganMGAK8Page from "./pages/math-game-arena/kelas8/PolaBilanganPage";
import KoordinatCartesiusMGAK8Page from "./pages/math-game-arena/kelas8/KoordinatCartesiusPage";
import RelasiFungsiMGAK8Page from "./pages/math-game-arena/kelas8/RelasiFungsiPage";
import SPLDVMGAK8Page from "./pages/math-game-arena/kelas8/SPLDVPage";
import PersamaanGarisLurusMGAK8Page from "./pages/math-game-arena/kelas8/PersamaanGarisLurusPage";
import TeoremaPythagorasMGAK8Page from "./pages/math-game-arena/kelas8/TeoremaPythagorasPage";
import LingkaranMGAK8Page from "./pages/math-game-arena/kelas8/LingkaranPage";
import GarisSinggungLingkaranMGAK8Page from "./pages/math-game-arena/kelas8/GarisSinggungLingkaranPage";
import BangunRuangSisiDatarMGAK8Page from "./pages/math-game-arena/kelas8/BangunRuangSisiDatarPage";
import KubusGamePage from "./pages/math-game-arena/kelas8/KubusGamePage";
import PenjumlahanBilanganBulatGameMGAK7Page from "./pages/math-game-arena/kelas7/bilangan-bulat/PenjumlahanGamePage";

// Math Game Arena - Kelas 9 Topic Pages
import BilanganBerpangkatMGAK9Page from "./pages/math-game-arena/kelas9/BilanganBerpangkatPage";
import KesebangunanKekongruenMGAK9Page from "./pages/math-game-arena/kelas9/KesebangunanKekongruenPage";
import TransformasiGeometriMGAK9Page from "./pages/math-game-arena/kelas9/TransformasiGeometriPage";
import BangunRuangSisiLengkungMGAK9Page from "./pages/math-game-arena/kelas9/BangunRuangSisiLengkungPage";
import StatistikaMGAK9Page from "./pages/math-game-arena/kelas9/StatistikaPage";
import PeluangMGAK9Page from "./pages/math-game-arena/kelas9/PeluangPage";
import PersamaanKuadratMGAK9Page from "./pages/math-game-arena/kelas9/PersamaanKuadratPage";
import FungsiKuadratMGAK9Page from "./pages/math-game-arena/kelas9/FungsiKuadratPage";

// Materi Matematika Pages
import MateriMatematikaPage from "./pages/MateriMatematikaPage";
import MateriMatematikaKelas7Page from "./pages/MateriMatematikaKelas7Page";
import MateriMatematikaKelas8Page from "./pages/MateriMatematikaKelas8Page";
import MateriMatematikaKelas9Page from "./pages/MateriMatematikaKelas9Page";

// Materi Matematika - Kelas 7 Topic Pages
import BilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/BilanganBulatPage";
import PenjumlahanBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/PenjumlahanPage";
import PenguranganBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/PenguranganPage";
import PerkalianBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/PerkalianPage";
import PembagianBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/PembagianPage";
import OperasiCampuranBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/OperasiCampuranPage";
import KPKFPBBilanganBulatMMK7Page from "./pages/materi-matematika/kelas7/bilangan-bulat/KPKFPBPage";
import BilanganRasionalMMK7Page from "./pages/materi-matematika/kelas7/BilanganRasionalPage";
import ArtiPecahanMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/ArtiPecahanPage";
import PecahanCampuranMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PecahanCampuranPage";
import PenjumlahanPenguranganMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PenjumlahanPenguranganPage";
import PerkalianPecahanMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PerkalianPecahanPage";
import PembagianPecahanMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PembagianPecahanPage";
import BentukDesimalMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/BentukDesimalPage";
import PenjumlahanPenguranganBentukDesimalMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage";
import PerkalianBentukDesimalMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PerkalianBentukDesimalPage";
import PembagianBentukDesimalMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PembagianBentukDesimalPage";
import PembulatanBentukDesimalMMK7Page from "./pages/materi-matematika/kelas7/bilangan-rasional/PembulatanBentukDesimalPage";
import AljabarMMK7Page from "./pages/materi-matematika/kelas7/AljabarPage";
import PengertianUnsurMMK7Page from "./pages/materi-matematika/kelas7/aljabar/PengertianUnsurPage";
import PenjumlahanPenguranganAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/PenjumlahanPenguranganPage";
import PerkalianAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/PerkalianPage";
import PembagianAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/PembagianPage";
import PemangkatanAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/PemangkatanPage";
import SubstitusiAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/SubstitusiPage";
import FaktorisasiAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/FaktorisasiPage";
import OperasiPecahanAljabarMMK7Page from "./pages/materi-matematika/kelas7/aljabar/OperasiPecahanPage";
import PLSVPtLSVMMK7Page from "./pages/materi-matematika/kelas7/PLSVPtLSVPage";
import KalimatTerbukaTertutupPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/KalimatTerbukaTertutupPage";
import PengertianPLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/PengertianPLSVPage";
import PenyelesaianPLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/PenyelesaianPLSVPage";
import ModelMatematikaPLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/ModelMatematikaPLSVPage";
import PengertianPtLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/PengertianPtLSVPage";
import PenyelesaianPtLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/PenyelesaianPtLSVPage";
import ModelMatematikaPtLSVPage from "./pages/materi-matematika/kelas7/plsv-ptlsv/ModelMatematikaPtLSVPage";
import PerbandinganMMK7Page from "./pages/materi-matematika/kelas7/PerbandinganPage";
import PerbandinganUmumMMK7Page from "./pages/materi-matematika/kelas7/perbandingan/PerbandinganUmumPage";
import PerbandinganSenilaiMMK7Page from "./pages/materi-matematika/kelas7/perbandingan/PerbandinganSenilaiPage";
import PerbandinganCampuranMMK7Page from "./pages/materi-matematika/kelas7/perbandingan/PerbandinganCampuranPage";
import SkalaMMK7Page from "./pages/materi-matematika/kelas7/perbandingan/SkalaPage";
import AritmetikaSosialMMK7Page from "./pages/materi-matematika/kelas7/AritmetikaSosialPage";
import JualBeliUntungRugiMMK7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/JualBeliUntungRugiPage";
import DiskonMMK7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/DiskonPage";
import BrutoNettoTaraMMK7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/BrutoNettoTaraPage";
import BungaTunggalMMK7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/BungaTunggalPage";
import PPNMMk7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/PPNPage";
import PPhMMK7Page from "./pages/materi-matematika/kelas7/aritmetika-sosial/PPhPage";
import GarisDanSudutMMK7Page from "./pages/materi-matematika/kelas7/GarisDanSudutPage";
import HubunganDuaGarisMMK7Page from "./pages/materi-matematika/kelas7/garis-dan-sudut/HubunganDuaGarisPage";
import SudutPelurusPenyikuBertolakMMK7Page from "./pages/materi-matematika/kelas7/garis-dan-sudut/SudutPelurusPenyikuBertolakPage";
import SifatSudutDuaGarisSejajarPage from "./pages/materi-matematika/kelas7/garis-dan-sudut/SifatSudutDuaGarisSejajarPage";
import JumlahSudutSegiBanyakPage from "./pages/materi-matematika/kelas7/garis-dan-sudut/JumlahSudutSegiBanyakPage";
import SegitigaSegiempatMMK7Page from "./pages/materi-matematika/kelas7/SegitigaSegiempatPage";
import GarisBeratBagiTinggiPage from "./pages/materi-matematika/kelas7/segitiga-segiempat/GarisBeratBagiTinggiPage";
import KelilingSegitigaSegiempatPage from "./pages/materi-matematika/kelas7/segitiga-segiempat/KelilingSegitigaSegiempatPage";
import LuasSegitigaPage from "./pages/materi-matematika/kelas7/segitiga-segiempat/LuasSegitigaPage";
import LuasSegiempatPage from "./pages/materi-matematika/kelas7/segitiga-segiempat/LuasSegiempatPage";
import KelilingLuasBangunTakBeraturanPage from "./pages/materi-matematika/kelas7/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage";
import KubusMMK8Page from "./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/KubusPage";
import BalokMMK8Page from "./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/BalokPage";
import PrismaMMK8Page from "./pages/materi-matematika/kelas8/bangun-ruang-sisi-datar/PrismaPage";
import HimpunanMMK7Page from "./pages/materi-matematika/kelas7/HimpunanPage";
import PengertianKeanggotaanHimpunanPage from "./pages/materi-matematika/kelas7/himpunan/PengertianKeanggotaanPage";
import JenisHimpunanPage from "./pages/materi-matematika/kelas7/himpunan/JenisHimpunanPage";
import DiagramVennPage from "./pages/materi-matematika/kelas7/himpunan/DiagramVennPage";
import PemecahanMasalahHimpunanPage from "./pages/materi-matematika/kelas7/himpunan/PemecahanMasalahHimpunanPage";

// Materi Matematika - Kelas 8 Topic Pages
import PolaBilanganMMK8Page from "./pages/materi-matematika/kelas8/PolaBilanganPage";
import PengertianPolaMMK8Page from "./pages/materi-matematika/kelas8/pola-bilangan/PengertianPolaPage";
import PolaKhususMMK8Page from "./pages/materi-matematika/kelas8/pola-bilangan/PolaKhususPage";
import PolaAritmetikaMMK8Page from "./pages/materi-matematika/kelas8/pola-bilangan/PolaAritmetikaPage";
import PolaGeometriMMK8Page from "./pages/materi-matematika/kelas8/pola-bilangan/PolaGeometriPage";
import KoordinatCartesiusMMK8Page from "./pages/materi-matematika/kelas8/KoordinatCartesiusPage";
import UnsurUnsurCartesiusMMK8Page from "./pages/materi-matematika/kelas8/koordinat-cartesius/UnsurUnsurCartesiusPage";
import PosisiRelatifTitikAcuanMMK8Page from "./pages/materi-matematika/kelas8/koordinat-cartesius/PosisiRelatifTitikAcuanPage";
import JarakTitikGarisMMK8Page from "./pages/materi-matematika/kelas8/koordinat-cartesius/JarakTitikGarisPage";
import PosisiRelatifGarisMMK8Page from "./pages/materi-matematika/kelas8/koordinat-cartesius/PosisiRelatifGarisPage";
import RelasiFungsiMMK8Page from "./pages/materi-matematika/kelas8/RelasiFungsiPage";
import PengertianRelasiMMK8Page from "./pages/materi-matematika/kelas8/relasi-fungsi/PengertianRelasiPage";
import PengertianFungsiMMK8Page from "./pages/materi-matematika/kelas8/relasi-fungsi/PengertianFungsiPage";
import BanyakFungsiMMK8Page from "./pages/materi-matematika/kelas8/relasi-fungsi/BanyakFungsiPage";
import NotasiFungsiMMK8Page from "./pages/materi-matematika/kelas8/relasi-fungsi/NotasiFungsiPage";
import GrafikFungsiMMK8Page from "./pages/materi-matematika/kelas8/relasi-fungsi/GrafikFungsiPage";
import SPLDVMMK8Page from "./pages/materi-matematika/kelas8/SPLDVPage";
import DefinisiSPLDVMMK8Page from "./pages/materi-matematika/kelas8/spldv/DefinisiSPLDVPage";
import MetodeGrafikMMK8Page from "./pages/materi-matematika/kelas8/spldv/MetodeGrafikPage";
import MetodeSubstitusiMMK8Page from "./pages/materi-matematika/kelas8/spldv/MetodeSubstitusiPage";
import MetodeEliminasiMMK8Page from "./pages/materi-matematika/kelas8/spldv/MetodeEliminasiPage";
import MetodeCampuranMMK8Page from "./pages/materi-matematika/kelas8/spldv/MetodeCampuranPage";
import ModelSPLDVMMK8Page from "./pages/materi-matematika/kelas8/spldv/ModelSPLDVPage";
import PenyelesaianMasalahSPLDVMMK8Page from "./pages/materi-matematika/kelas8/spldv/PenyelesaianMasalahSPLDVPage";
import PersamaanGarisLurusMMK8Page from "./pages/materi-matematika/kelas8/PersamaanGarisLurusPage";
import TeoremaPythagorasMMK8Page from "./pages/materi-matematika/kelas8/TeoremaPythagorasPage";
import LingkaranMMK8Page from "./pages/materi-matematika/kelas8/LingkaranPage";
import GarisSinggungLingkaranMMK8Page from "./pages/materi-matematika/kelas8/GarisSinggungLingkaranPage";
import BangunRuangSisiDatarMMK8Page from "./pages/materi-matematika/kelas8/BangunRuangSisiDatarPage";

// Materi Matematika - Kelas 9 Topic Pages
import BilanganBerpangkatMMK9Page from "./pages/materi-matematika/kelas9/BilanganBerpangkatPage";
import PengertianNotasiPangkatMMK9Page from "./pages/materi-matematika/kelas9/bilangan-berpangkat/PengertianNotasiPangkatPage";
import SifatSifatOperasiMMK9Page from "./pages/materi-matematika/kelas9/bilangan-berpangkat/SifatSifatOperasiPage";
import BentukAkarMMK9Page from "./pages/materi-matematika/kelas9/bilangan-berpangkat/BentukAkarPage";
import NotasiIlmiahMMK9Page from "./pages/materi-matematika/kelas9/bilangan-berpangkat/NotasiIlmiahPage";
import KesebangunanKekongruenMMK9Page from "./pages/materi-matematika/kelas9/KesebangunanKekongruenPage";
import DefinisiKesebangunanMMK9Page from "./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/DefinisiPage";
import MenghitungRusukMMK9Page from "./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/MenghitungRusukPage";
import SegitigaSebangunMMK9Page from "./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/SegitigaSebangunPage";
import PerbandinganRusukSikuSikuMMK9Page from "./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage";
import KekongruenBangunDatarMMK9Page from "./pages/materi-matematika/kelas9/kesebangunan-kekongruenan/KekongruenBangunDatarPage";
import TransformasiGeometriMMK9Page from "./pages/materi-matematika/kelas9/TransformasiGeometriPage";
import DilatasisMMK9Page from "./pages/materi-matematika/kelas9/transformasi-geometri/DilatasisPage";
import BangunRuangSisiLengkungMMK9Page from "./pages/materi-matematika/kelas9/BangunRuangSisiLengkungPage";
import TabungMMK9Page from "./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/TabungPage";
import KerucutMMK9Page from "./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/KerucutPage";
import BolaMMK9Page from "./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/BolaPage";
import PerubahanVolumeMMK9Page from "./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/PerubahanVolumePage";
import GabunganMMK9Page from "./pages/materi-matematika/kelas9/bangun-ruang-sisi-lengkung/GabunganPage";
import StatistikaMMK9Page from "./pages/materi-matematika/kelas9/StatistikaPage";
import PengantarStatistikaMMK9Page from "./pages/materi-matematika/kelas9/statistika/PengantarStatistikaPage";
import PenyajianDataMMK9Page from "./pages/materi-matematika/kelas9/statistika/PenyajianDataPage";
import RataRataMMK9Page from "./pages/materi-matematika/kelas9/statistika/RataRataPage";
import MedianModusMMK9Page from "./pages/materi-matematika/kelas9/statistika/MedianModusPage";
import KuartilMMK9Page from "./pages/materi-matematika/kelas9/statistika/KuartilPage";
import PenyebaranDataMMK9Page from "./pages/materi-matematika/kelas9/statistika/PenyebaranDataPage";
import PeluangMMK9Page from "./pages/materi-matematika/kelas9/PeluangPage";
import RuangSampelMMK9Page from "./pages/materi-matematika/kelas9/peluang/RuangSampelPage";
import PeluangEmpirikMMK9Page from "./pages/materi-matematika/kelas9/peluang/PeluangEmpirikPage";
import PeluangTeoretikMMK9Page from "./pages/materi-matematika/kelas9/peluang/PeluangTeoretikPage";
import FrekuensiHarapanMMK9Page from "./pages/materi-matematika/kelas9/peluang/FrekuensiHarapanPage";
import KomplementMMK9Page from "./pages/materi-matematika/kelas9/peluang/KomplementPage";
import PersamaanKuadratMMK9Page from "./pages/materi-matematika/kelas9/PersamaanKuadratPage";
import FungsiKuadratMMK9Page from "./pages/materi-matematika/kelas9/FungsiKuadratPage";

const queryClient = new QueryClient();

const AppInner = () => {
  useEffect(() => {
    const handleInteraction = () => {
      startGlobalAmbient();
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/petunjuk" element={<PetunjukPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/referensi" element={<ReferensiPage />} />
      <Route path="/kalkulator-scientific" element={<KalkulatorScientificPage />} />
      <Route path="/kumpulan-rumus" element={<KumpulanRumusPage />} />
      <Route path="/konversi-satuan" element={<KonversiSatuanPage />} />
      <Route path="/video-pembelajaran" element={<VideoPembelajaranPage />} />
      <Route path="/donasi" element={<DonasiPage />} />
      <Route path="/biografi" element={<BiografiPage />} />
      <Route path="/olimpiade" element={<OlimpiadePage />} />
      <Route path="/olimpiade/bilangan-bulat" element={<OlimpiadeBilanganBulatPage />} />
      <Route path="/olimpiade/bilangan-rasional" element={<OlimpiadeBilanganRasionalPage />} />
      <Route path="/olimpiade/bilangan-berpangkat" element={<OlimpiadeBilanganBerpangkatPage />} />
      <Route path="/olimpiade/statistika" element={<OlimpiadeStatistikaPage />} />
      <Route path="/olimpiade/bilangan-irasional" element={<OlimpiadeBilanganIrasionalPage />} />
      <Route path="/olimpiade/kpk-fpb" element={<OlimpiadeKPKFPBPage />} />
      <Route path="/olimpiade/modulo" element={<OlimpiadeModuloPage />} />
      <Route path="/olimpiade/himpunan" element={<OlimpiadeHimpunanPage />} />
      <Route path="/olimpiade/relasi-fungsi" element={<OlimpiadeRelasiFungsiPage />} />
      <Route path="/olimpiade/perbandingan" element={<OlimpiadePerbandinganPage />} />
      <Route path="/olimpiade/aljabar" element={<OlimpiadeAljabarPage />} />
      <Route path="/olimpiade/pola-bilangan" element={<OlimpiadePolaBilanganPage />} />
      <Route path="/olimpiade/spldv" element={<OlimpiadeSPLDVPage />} />
      <Route path="/olimpiade/garis-sudut" element={<OlimpiadeGarisSudutPage />} />
      <Route path="/olimpiade/koordinat-cartesius" element={<OlimpiadeKoordinatCartesiusPage />} />
      <Route path="/olimpiade/teorema-pythagoras" element={<OlimpiadeTeoremaPage />} />
      <Route path="/olimpiade/segitiga-segiempat" element={<OlimpiadeSegitigaSegiempatPage />} />
      <Route path="/olimpiade/lingkaran" element={<OlimpiadeLingkaranPage />} />
      <Route path="/olimpiade/bangun-ruang-sisi-datar" element={<OlimpiadeBangunRuangSisiDatarPage />} />
      <Route path="/olimpiade/bangun-ruang-sisi-lengkung" element={<OlimpiadeBangunRuangSisiLengkungPage />} />
      <Route path="/olimpiade/plsv" element={<OlimpiadePLSVPage />} />
      <Route path="/olimpiade/persamaan-garis" element={<OlimpiadePersamaanGarisPage />} />
      <Route path="/olimpiade/persamaan-kuadrat" element={<OlimpiadePersamaanKuadratPage />} />
      <Route path="/olimpiade/fungsi-kuadrat" element={<OlimpiadeFungsiKuadratPage />} />
      <Route path="/olimpiade/aritmetika-sosial" element={<OlimpiadeAritmetikaSosialPage />} />
      <Route path="/olimpiade/kesebangunan" element={<OlimpiadeKesebangunanPage />} />
      <Route path="/olimpiade/transformasi-geometri" element={<OlimpiadeTransformasiPage />} />
      <Route path="/olimpiade/peluang" element={<OlimpiadePeluangPage />} />
      <Route path="/tka" element={<TKAPage />} />
      <Route path="/tka/paket-1" element={<TKALatihan1Page />} />
      <Route path="/papan-peringkat" element={<PapanPeringkatPage />} />
      <Route path="/bank-soal" element={<BankSoalPage />} />
      <Route path="/bank-soal/bilangan-bulat" element={<BankSoalBilanganBulatPage />} />
      <Route path="/bank-soal/segitiga-dan-segiempat" element={<BankSoalSegitigaSegiempatPage />} />
      <Route path="/chat-ai" element={<ChatAIPage />} />
      <Route path="/pengaturan" element={<PengaturanPage />} />
      <Route path="/tentang-aplikasi" element={<TentangAplikasiPage />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      
      {/* Latihan Mandiri Routes */}
      <Route path="/latihan-mandiri" element={<LatihanMandiriPage />} />
      <Route path="/latihan-mandiri/kelas-7" element={<LatihanMandiriKelas7Page />} />
      <Route path="/latihan-mandiri/kelas-8" element={<LatihanMandiriKelas8Page />} />
      <Route path="/latihan-mandiri/kelas-9" element={<LatihanMandiriKelas9Page />} />
      
      {/* Kelas 7 Topic Routes */}
<Route path="/latihan-mandiri/kelas-7/bilangan-bulat" element={<BilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/bilangan-rasional" element={<BilanganRasionalK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aljabar" element={<AljabarK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/plsv-ptlsv" element={<PLSVPtLSVK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/perbandingan" element={<PerbandinganK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/perbandingan/umum" element={<PerbandinganUmumK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/perbandingan/senilai" element={<PerbandinganSenilaiK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/perbandingan/campuran" element={<PerbandinganCampuranK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/perbandingan/skala" element={<PerbandinganSkalaK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial" element={<AritmetikaSosialK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/diskon" element={<DiskonK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/ppn" element={<PPNK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/aritmetika-sosial/pph" element={<PPhK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut" element={<GarisDanSudutK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/garis-dan-sudut/hubungan-2-garis" element={<HubunganDuaGarisK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiLatihanK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/segitiga-dan-segiempat/keliling-segitiga-dan-segiempat" element={<KelilingSegitigaSegiempatLatihanK7Page />} />
      <Route path="/latihan-mandiri/kelas-7/himpunan" element={<HimpunanK7Page />} />
      
      {/* Kelas 8 Topic Routes */}
      <Route path="/latihan-mandiri/kelas-8/pola-bilangan" element={<PolaBilanganK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/spldv" element={<SPLDVK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/lingkaran" element={<LingkaranK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranK8Page />} />
      <Route path="/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarK8Page />} />
      
      {/* Kelas 9 Topic Routes */}
      <Route path="/latihan-mandiri/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/transformasi-geometri" element={<TransformasiGeometriK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/statistika" element={<StatistikaK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/peluang" element={<PeluangK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratK9Page />} />
      <Route path="/latihan-mandiri/kelas-9/fungsi-kuadrat" element={<FungsiKuadratK9Page />} />
      
      {/* Math Game Arena Routes */}
      <Route path="/math-game-arena" element={<MathGameArenaPage />} />
      <Route path="/math-game-arena/kelas-7" element={<MathGameArenaKelas7Page />} />
      <Route path="/math-game-arena/kelas-8" element={<MathGameArenaKelas8Page />} />
      <Route path="/math-game-arena/kelas-9" element={<MathGameArenaKelas9Page />} />
      
      {/* Math Game Arena - Kelas 7 Topic Routes */}
      <Route path="/math-game-arena/kelas-7/bilangan-bulat" element={<BilanganBulatMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/bilangan-rasional" element={<BilanganRasionalMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aljabar" element={<AljabarMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/plsv-ptlsv" element={<PLSVPtLSVMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/perbandingan" element={<PerbandinganMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial" element={<AritmetikaSosialMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial/diskon" element={<DiskonGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial/ppn" element={<PPNGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/aritmetika-sosial/pph" element={<PPhGameMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/garis-dan-sudut" element={<GarisDanSudutMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatMGAK7Page />} />
      <Route path="/math-game-arena/kelas-7/himpunan" element={<HimpunanMGAK7Page />} />
      
      {/* Math Game Arena - Kelas 8 Topic Routes */}
      <Route path="/math-game-arena/kelas-8/pola-bilangan" element={<PolaBilanganMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/spldv" element={<SPLDVMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/lingkaran" element={<LingkaranMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMGAK8Page />} />
      <Route path="/math-game-arena/kelas-8/bangun-ruang-sisi-datar/kubus-game" element={<KubusGamePage />} />
      
      {/* Math Game Arena - Kelas 9 Topic Routes */}
      <Route path="/math-game-arena/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/transformasi-geometri" element={<TransformasiGeometriMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/statistika" element={<StatistikaMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/peluang" element={<PeluangMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratMGAK9Page />} />
      <Route path="/math-game-arena/kelas-9/fungsi-kuadrat" element={<FungsiKuadratMGAK9Page />} />
      
      {/* Materi Matematika Routes */}
      <Route path="/materi-matematika" element={<MateriMatematikaPage />} />
      <Route path="/materi-matematika/kelas-7" element={<MateriMatematikaKelas7Page />} />
      <Route path="/materi-matematika/kelas-8" element={<MateriMatematikaKelas8Page />} />
      <Route path="/materi-matematika/kelas-9" element={<MateriMatematikaKelas9Page />} />
      
      {/* Materi Matematika - Kelas 7 Topic Routes */}
      <Route path="/materi-matematika/kelas-7/bilangan-bulat" element={<BilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/pembagian" element={<PembagianBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional" element={<BilanganRasionalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/arti-pecahan" element={<ArtiPecahanMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/pecahan-campuran" element={<PecahanCampuranMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan-pecahan" element={<PenjumlahanPenguranganMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/perkalian-pecahan" element={<PerkalianPecahanMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembagian-pecahan" element={<PembagianPecahanMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/bentuk-desimal" element={<BentukDesimalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/penjumlahan-pengurangan-bentuk-desimal" element={<PenjumlahanPenguranganBentukDesimalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/perkalian-bentuk-desimal" element={<PerkalianBentukDesimalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembagian-bentuk-desimal" element={<PembagianBentukDesimalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/bilangan-rasional/pembulatan-bentuk-desimal" element={<PembulatanBentukDesimalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar" element={<AljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/pengertian-unsur" element={<PengertianUnsurMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/perkalian" element={<PerkalianAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/pembagian" element={<PembagianAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/pemangkatan" element={<PemangkatanAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/substitusi" element={<SubstitusiAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/faktorisasi" element={<FaktorisasiAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aljabar/operasi-pecahan" element={<OperasiPecahanAljabarMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv" element={<PLSVPtLSVMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/kalimat-terbuka-tertutup" element={<KalimatTerbukaTertutupPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVPage />} />
      <Route path="/materi-matematika/kelas-7/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVPage />} />
      <Route path="/materi-matematika/kelas-7/perbandingan" element={<PerbandinganMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/perbandingan/umum" element={<PerbandinganUmumMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/perbandingan/senilai" element={<PerbandinganSenilaiMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/perbandingan/campuran" element={<PerbandinganCampuranMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/perbandingan/skala" element={<SkalaMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial" element={<AritmetikaSosialMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/diskon" element={<DiskonMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/ppn" element={<PPNMMk7Page />} />
      <Route path="/materi-matematika/kelas-7/aritmetika-sosial/pph" element={<PPhMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/garis-dan-sudut" element={<GarisDanSudutMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/garis-dan-sudut/hubungan-2-garis" element={<HubunganDuaGarisMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" element={<SudutPelurusPenyikuBertolakMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/garis-dan-sudut/sifat-sudut-dua-garis-sejajar" element={<SifatSudutDuaGarisSejajarPage />} />
      <Route path="/materi-matematika/kelas-7/garis-dan-sudut/jumlah-sudut-segi-banyak" element={<JumlahSudutSegiBanyakPage />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat" element={<SegitigaSegiempatMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiPage />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/keliling-segitiga-segiempat" element={<KelilingSegitigaSegiempatPage />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segitiga" element={<LuasSegitigaPage />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/luas-segiempat" element={<LuasSegiempatPage />} />
      <Route path="/materi-matematika/kelas-7/segitiga-dan-segiempat/keliling-luas-bangun-tak-beraturan" element={<KelilingLuasBangunTakBeraturanPage />} />
      <Route path="/materi-matematika/kelas-7/himpunan" element={<HimpunanMMK7Page />} />
      <Route path="/materi-matematika/kelas-7/himpunan/pengertian-keanggotaan" element={<PengertianKeanggotaanHimpunanPage />} />
      <Route path="/materi-matematika/kelas-7/himpunan/jenis-himpunan" element={<JenisHimpunanPage />} />
      <Route path="/materi-matematika/kelas-7/himpunan/diagram-venn" element={<DiagramVennPage />} />
      <Route path="/materi-matematika/kelas-7/himpunan/pemecahan-masalah" element={<PemecahanMasalahHimpunanPage />} />
      
      {/* Materi Matematika - Kelas 8 Topic Routes */}
      <Route path="/materi-matematika/kelas-8/pola-bilangan" element={<PolaBilanganMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/pola-bilangan/pengertian" element={<PengertianPolaMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-khusus" element={<PolaKhususMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-aritmetika" element={<PolaAritmetikaMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/pola-bilangan/pola-geometri" element={<PolaGeometriMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/koordinat-cartesius" element={<KoordinatCartesiusMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/koordinat-cartesius/unsur-unsur" element={<UnsurUnsurCartesiusMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/koordinat-cartesius/posisi-relatif-titik-acuan" element={<PosisiRelatifTitikAcuanMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/koordinat-cartesius/jarak-titik-garis" element={<JarakTitikGarisMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/koordinat-cartesius/posisi-relatif-garis" element={<PosisiRelatifGarisMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi" element={<RelasiFungsiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/pengertian-relasi" element={<PengertianRelasiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/pengertian-fungsi" element={<PengertianFungsiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/banyak-fungsi" element={<BanyakFungsiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/notasi-rumus-fungsi" element={<NotasiFungsiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/relasi-dan-fungsi/grafik-fungsi" element={<GrafikFungsiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv" element={<SPLDVMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/definisi" element={<DefinisiSPLDVMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/metode-grafik" element={<MetodeGrafikMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/metode-substitusi" element={<MetodeSubstitusiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/metode-eliminasi" element={<MetodeEliminasiMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/metode-campuran" element={<MetodeCampuranMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/model-spldv" element={<ModelSPLDVMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/spldv/penyelesaian-masalah" element={<PenyelesaianMasalahSPLDVMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/persamaan-garis-lurus" element={<PersamaanGarisLurusMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/teorema-pythagoras" element={<TeoremaPythagorasMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/lingkaran" element={<LingkaranMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/kubus" element={<KubusMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/balok" element={<BalokMMK8Page />} />
      <Route path="/materi-matematika/kelas-8/bangun-ruang-sisi-datar/prisma" element={<PrismaMMK8Page />} />
      
      {/* Materi Matematika - Kelas 9 Topic Routes */}
      <Route path="/materi-matematika/kelas-9/bilangan-berpangkat" element={<BilanganBerpangkatMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiPangkatMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/sifat-sifat-operasi" element={<SifatSifatOperasiMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/bentuk-akar" element={<BentukAkarMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/definisi" element={<DefinisiKesebangunanMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/menghitung-panjang-rusuk" element={<MenghitungRusukMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/segitiga-sebangun" element={<SegitigaSebangunMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/perbandingan-rusuk-siku-siku" element={<PerbandinganRusukSikuSikuMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/kesebangunan-kekongruenan/kekongruenan-bangun-datar" element={<KekongruenBangunDatarMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/transformasi-geometri" element={<TransformasiGeometriMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/transformasi-geometri/dilatasi" element={<DilatasisMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/tabung" element={<TabungMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/bola" element={<BolaMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/perubahan-volume" element={<PerubahanVolumeMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika" element={<StatistikaMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/pengantar" element={<PengantarStatistikaMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/penyajian-data" element={<PenyajianDataMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/rata-rata" element={<RataRataMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/median-modus" element={<MedianModusMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/kuartil" element={<KuartilMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/statistika/penyebaran-data" element={<PenyebaranDataMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang" element={<PeluangMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang/ruang-sampel" element={<RuangSampelMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang/peluang-empirik" element={<PeluangEmpirikMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang/peluang-teoretik" element={<PeluangTeoretikMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang/frekuensi-harapan" element={<FrekuensiHarapanMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/peluang/komplemen" element={<KomplementMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/persamaan-kuadrat" element={<PersamaanKuadratMMK9Page />} />
      <Route path="/materi-matematika/kelas-9/fungsi-kuadrat" element={<FungsiKuadratMMK9Page />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SoundProvider>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </SoundProvider>
  </QueryClientProvider>
);

export default App;
