# Math Space - NUMATIK AI

A math education app for Indonesian middle school students (SMP, ages 12-15), featuring NUMATIK AI - an AI math tutor with a space/galaxy theme.

## Architecture

- **Frontend**: Vite + React + TypeScript, using shadcn/ui components and Tailwind CSS
- **Backend**: Express.js server (`server.ts`) for the AI chat API
- **AI**: Google Gemini 2.5 Flash via `@ai-sdk/google`

## Running the App

```
npm run dev
```

This runs both:
- Vite dev server on port 5000 (frontend, webview)
- Express API server on port 3001 (backend, proxied via Vite)

## Key Files

- `server.ts` — Express API server handling `/api/chat` with streaming
- `src/pages/ChatAIPage.tsx` — AI chat UI
- `vite.config.ts` — Vite config with proxy to API server
- `src/` — React frontend source

## Environment Variables

- `GOOGLE_GENERATIVE_AI_API_KEY` — Required for the Gemini AI model (get from Google AI Studio)
- `API_PORT` — Optional, defaults to 3001

## Migration Notes

Migrated from Vercel to Replit:
- Replaced Vercel serverless function (`api/chat.ts`) with an Express server (`server.ts`)
- Replaced `@ai-sdk/gateway` (Vercel-specific) with `@ai-sdk/google` for direct Gemini API access
- Updated Vite config to use port 5000 (Replit webview) and proxy `/api` calls to Express
