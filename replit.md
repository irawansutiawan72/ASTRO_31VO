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

### Kelas 9 - Statistika (2 of 6 sub-bab completed)
- `/materi-matematika/kelas-9/statistika/pengantar` — Pengantar Statistika & Pengumpulan Data (definisi, jenis data, metode pengumpulan, jenis penyajian, 9 contoh soal)
- `/materi-matematika/kelas-9/statistika/penyajian-data` — Penyajian Data (batang daun, diagram batang, garis, lingkaran, tabel distribusi frekuensi, 15 contoh soal)

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
