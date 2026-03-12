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

## Notes

- Merge conflicts from Vercel migration were resolved on 2026-03-12
- Server binds to `0.0.0.0` for Replit compatibility
- In production, Express serves the built frontend (`dist/`) and handles all routes
