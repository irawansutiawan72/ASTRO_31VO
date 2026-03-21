# Math Space - NUMATIK AI

A React + Vite math tutoring app for Indonesian middle school students (SMP), powered by a NUMATIK AI chatbot backed by Google Gemini.

## Architecture

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, react-router-dom
- **Backend**: Express.js API server (`server.ts`) running on port 3001 (dev) / 5000 (prod)
- **AI**: Google Gemini via `@ai-sdk/google` — streamed responses through `/api/chat`
- **Dev workflow**: Vite dev server on port 5000 proxies `/api/*` to Express on port 3001

## Running the App

```bash
npm run dev      # Start both Vite (port 5000) and Express (port 3001)
npm run build    # Build frontend for production
npm start        # Run production server (Express serves built frontend on port 5000)
```

## Required Environment Variables

- `GOOGLE_GENERATIVE_AI_API_KEY` — Google AI Studio API key for Gemini access

## Content Status

- **Kelas 8 — Latihan Mandiri — Bangun Ruang Sisi Datar**: 4 sub-topics fully implemented (160 soal total)
  - KUBUS: 40 soal (unsur-unsur, luas permukaan, volume, jaring-jaring, kontekstual) — sky/cyan theme with 3D isometric cube SVG
  - BALOK: 40 soal (unsur-unsur, luas permukaan, volume, jaring-jaring, kontekstual) — emerald/teal theme with 3D cuboid SVG
  - PRISMA: 40 soal (segitiga, siku-siku, segiempat, luas permukaan, volume, kontekstual) — amber/orange theme with prism SVGs
  - LIMAS: 40 soal (segitiga, segiempat, segilima, apotema, luas permukaan, volume, kontekstual) — violet/purple theme with pyramid SVGs
  - All pages include: LaTeX formulas, inline formula reference cards, 3D SVG diagrams, UN/ANBK/TKA-style questions

- **Kelas 8 — Latihan Mandiri — Bangun Ruang Sisi Datar Gabungan**: 40 soal, route `/latihan-mandiri/kelas-8/bangun-ruang-sisi-datar-gabungan`
  - Covers: Balok+Limas, Kubus+Prisma, dua balok (L-shape), limas terpancung, benda berlubang, 3 balok bertingkat
  - SVG diagrams: BalokLimas, KubusPrisma, DuaBalok, PrismaBalok (5 different combined solid types)
  - indigo/blue theme — direct single page (no sub-topics hub)

- **Kelas 8 — Garis Singgung Lingkaran**: All 5 sub-topics fully implemented with animated SVGs, LaTeX formulas, color-coded sections, 3-level examples, interactive tools.
  - Pengertian dan Sifat (3-case comparison SVG, tangent properties, inscribed circle problem)
  - Menghitung Panjang Garis Singgung (Pythagoras triangle SVG, 3 formula variations, two-tangent SVG)
  - GSPL (dual-circle external tangent SVG, animated glowing lines, proof construction)
  - GSPD (crossing X-pattern SVG, GSPL vs GSPD comparison table, combined problem)
  - Sabuk Lilitan Minimal (belt-around-circles SVG, interactive belt calculator, 3 applied problems)
- **Kelas 8 — Teorema Pythagoras**: All 6 sub-topics fully implemented with animated SVGs, interactive tools, LaTeX formulas, color-coded blocks, 3-level examples (Mudah/Sedang/Sulit), and summaries.
  - Pembuktian Teorema Pythagoras (visual square-arrangement proof with animated SVG)
  - Menghitung Panjang Sisi Segitiga Siku-siku (three formula variations, bar chart visual)
  - Triple Pythagoras (full table of triples, interactive triple checker, kelipatan pattern)
  - Pythagoras dan Jenis-jenis Segitiga (three triangle types, interactive type classifier)
  - Perbandingan Sisi Segitiga Siku-siku Sudut Khusus (45-45-90 and 30-60-90 with animated SVGs)
  - Penerapan Teorema Pythagoras pada Masalah Kontekstual (real-world problems with sketches)
- **Kelas 8 — Persamaan Garis Lurus**: All 5 sub-topics fully implemented with rich content, extensive SVG coordinate-system diagrams (6-panel galleries, slope triangles, BEP charts, growth graphs), LaTeX formulas, collapsible sections, color-coded blocks, 3-level examples, and summary sections.
  - Grafik Persamaan Garis Lurus
  - Gradien (Kemiringan Garis)
  - Menentukan Persamaan Garis Lurus
  - Hubungan 2 Garis
  - Aplikasi Persamaan Garis pada Soal Kontekstual
- **Kelas 8 — Relasi dan Fungsi**: All 5 sub-topics fully implemented with rich content, LaTeX formulas, interactive collapsible sections, color-coded visual blocks, SVG charts, 3-level example problems (Easy/Medium/Hard) with full solutions, and summary sections.
  - Pengertian Relasi dan Penyajiannya
  - Pengertian Fungsi dan Penyajiannya
  - Menentukan Banyak Fungsi dan Korespondensi Satu-Satu
  - Notasi dan Rumus Fungsi
  - Grafik Fungsi

## Project Structure

```
server.ts          # Express API server (AI chat endpoint)
src/               # React frontend
  App.tsx
  main.tsx
  pages/           # Route pages
  components/      # UI components
  contexts/        # React context providers
  hooks/           # Custom hooks
  lib/             # Utilities
vite.config.ts     # Vite config (proxy /api → localhost:3001)
```

## Completed Content Pages

### Kelas 9 - Kesebangunan dan Kekongruenan (all 5 sub-bab)
- `/materi-matematika/kelas-9/kesebangunan-kekongruenan/definisi` — Definisi Kesebangunan dan Kekongruenan
- `/materi-matematika/kelas-9/kesebangunan-kekongruenan/menghitung-panjang-rusuk` — Menghitung Panjang Rusuk Bangun Datar yang Sebangun
- `/materi-matematika/kelas-9/kesebangunan-kekongruenan/segitiga-sebangun` — Segitiga – Segitiga yang Sebangun
- `/materi-matematika/kelas-9/kesebangunan-kekongruenan/perbandingan-rusuk-siku-siku` — Perbandingan Rusuk Segitiga Siku-siku
- `/materi-matematika/kelas-9/kesebangunan-kekongruenan/kekongruenan-bangun-datar` — Kekongruenan pada Bangun Datar

### Kelas 9 - Peluang (1 of 5 sub-bab completed)
- `/materi-matematika/kelas-9/peluang/ruang-sampel` — Ruang Sampel & Titik Sampel (definisi, notasi n(S)/n(K), kejadian tunggal: koin/dadu/kartu bridge, kejadian majemuk: 2koin/3koin/2dadu/koin+dadu, tabel silang, diagram pohon, 6 contoh soal bertahap)

### Kelas 9 - Statistika (6 of 6 sub-bab completed)
- `/materi-matematika/kelas-9/statistika/pengantar` — Pengantar Statistika & Pengumpulan Data (definisi, jenis data, metode pengumpulan, jenis penyajian, 9 contoh soal)
- `/materi-matematika/kelas-9/statistika/penyajian-data` — Penyajian Data (batang daun, diagram batang, garis, lingkaran, tabel distribusi frekuensi, 15 contoh soal)
- `/materi-matematika/kelas-9/statistika/rata-rata` — Ukuran Pemusatan: Rata-rata & Rata-rata Gabungan (data tunggal, tabel distribusi, diagram batang, gabungan masuk, gabungan keluar, 15 contoh soal)
- `/materi-matematika/kelas-9/statistika/median-modus` — Ukuran Pemusatan: Median & Modus (data ganjil, data genap, tabel distribusi frekuensi, modus tunggal, modus berkelompok, 15 contoh soal)
- `/materi-matematika/kelas-9/statistika/kuartil` — Ukuran Letak Data: Kuartil (Q1/Q2/Q3, data tunggal dengan interpolasi, tabel distribusi frekuensi tunggal via FK, 6 contoh soal bertahap)
- `/materi-matematika/kelas-9/statistika/penyebaran-data` — Ukuran Penyebaran Data: Jangkauan, JIK, Simpangan Kuartil (data tunggal & tabel distribusi frekuensi tunggal, 6 contoh soal bertahap)

### Kelas 9 - Transformasi Geometri
- `/materi-matematika/kelas-9/transformasi-geometri/dilatasi` — Dilatasi (full content with SVG diagrams, 9 examples)

### Math Game Arena - Kelas 7 - Aritmetika Sosial (5 games, meteor shooting)
- `/math-game-arena/kelas-7/aritmetika-sosial/jual-beli-untung-rugi` — Jual Beli, Untung dan Rugi
- `/math-game-arena/kelas-7/aritmetika-sosial/diskon` — Diskon
- `/math-game-arena/kelas-7/aritmetika-sosial/bruto-netto-tara` — Bruto, Netto dan Tara
- `/math-game-arena/kelas-7/aritmetika-sosial/ppn` — Pajak Pertambahan Nilai (PPN)
- `/math-game-arena/kelas-7/aritmetika-sosial/pph` — Pajak Penghasilan (PPh)
- Shared reusable game component: `src/components/MeteorShootingGame.tsx`

## Notes

- Merge conflicts from Vercel migration were resolved on 2026-03-12
- Server binds to `0.0.0.0` for Replit compatibility
- In production, Express serves the built frontend (`dist/`) and handles all routes
- Content pages use accordion sections, react-katex for LaTeX, SVG diagrams, color-coded difficulty badges
