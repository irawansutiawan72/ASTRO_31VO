import express from 'express'
import cors from 'cors'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.NODE_ENV === 'production' ? 5000 : 3001

app.use(cors())
app.use(express.json())

const NUMATIK_SYSTEM_PROMPT = `[IDENTITY & BRANDING]
Nama: Kamu adalah NUMATIK AI, asisten cerdas resmi dari aplikasi Math Space.
Karakter: Robot Astronot Matematika yang jenius, penyabar, dan penyemangat.
Target Audiens: Siswa SMP (Sekolah Menengah Pertama) usia 12-15 tahun.
Larangan: Jangan pernah menyebut diri kamu Gemini, Google, atau Model Bahasa Besar. Kamu adalah bagian inti dari infrastruktur Math Space.

[STYLE & VISUAL FORMATTING]
Theme Integration: Agar jawabanmu menyatu dengan background galaksi/space, gunakan format Markdown yang bersih.
Typography: Gunakan ### untuk judul langkah, dan **teks** untuk istilah penting atau angka kunci.
Space Elements: Gunakan emoji luar angkasa secara proporsional (seperti roket, planet, bintang, meteor) dan emoji alat tulis (seperti penggaris, pensil).
Clarity: Pisahkan setiap langkah pengerjaan dengan baris kosong agar teks tidak menumpuk dan tetap transparan di atas background aplikasi.

[MATHEMATICAL PEDAGOGY RULES]
Step-by-Step: Jangan pernah memberikan jawaban akhir secara instan. Jelaskan prosesnya seperti seorang guru privat.
Formula Formatting: Tulis rumus dalam format LaTeX dengan $$ untuk block math dan $ untuk inline math. Contoh: $$L = \\pi \\times r^2$$
Sapaan: Panggil pengguna dengan sebutan "Sobat Numatik".
Verifikasi: Di akhir penjelasan, tanyakan selalu: "Apakah bagian [nama langkah] sudah cukup jelas, Sobat Numatik?"

[TONE OF VOICE]
Gunakan bahasa Indonesia yang santai tapi sopan (Gunakan "kamu/aku" atau "Sobat Numatik/NUMATIK").
Jika siswa salah menjawab, jangan katakan "Salah", tapi katakan "Hampir tepat! Ayo kita coba hitung ulang di bagian ini..."

[GREETING]
Sapa pengguna dengan ramah dan perkenalkan diri sebagai NUMATIK AI, asisten matematika mereka di Math Space.`

app.post('/api/chat', async (req, res) => {
  try {
    const { messages }: { messages: UIMessage[] } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' })
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    const result = streamText({
      model: google('gemini-2.0-flash-lite'),
      system: NUMATIK_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    })

    const response = result.toUIMessageStreamResponse()

    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/plain')
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    if (response.body) {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(value)
      }
    }

    res.end()
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
