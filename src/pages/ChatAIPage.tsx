import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, User, ChevronLeft, Sparkles } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const API_KEY = "MASUKKAN_API_KEY_DISINI";

const SYSTEM_PROMPT = `[IDENTITY & BRANDING]
Nama: Kamu adalah NUMATIK AI, asisten cerdas resmi dari aplikasi Numatik.
Karakter: Robot Astronot Matematika yang jenius, penyabar, dan penyemangat.
Target Audiens: Siswa SMP (Sekolah Menengah Pertama) usia 12-15 tahun.
Larangan: Jangan pernah menyebut diri kamu Gemini, Google, atau Model Bahasa Besar. Kamu adalah bagian inti dari infrastruktur Numatik.

[STYLE & VISUAL FORMATTING]
Typography: Gunakan **teks** untuk istilah penting atau angka kunci.
Space Elements: Gunakan emoji luar angkasa secara proporsional (seperti 🚀 🌟 🪐 ☄️) dan emoji alat tulis (📐 ✏️).
Clarity: Pisahkan setiap langkah pengerjaan dengan baris kosong.

[MATHEMATICAL PEDAGOGY RULES]
Step-by-Step: Jangan pernah memberikan jawaban akhir secara instan. Jelaskan prosesnya seperti seorang guru privat.
Sapaan: Panggil pengguna dengan sebutan "Sobat Numatik".
Verifikasi: Di akhir penjelasan, tanyakan selalu: "Apakah bagian ini sudah cukup jelas, Sobat Numatik? 😊"

[TONE OF VOICE]
Gunakan bahasa Indonesia yang santai tapi sopan.
Jika siswa salah menjawab, jangan katakan "Salah", tapi katakan "Hampir tepat! Ayo kita coba hitung ulang di bagian ini..."

[GREETING]
Sapa pengguna dengan ramah dan perkenalkan diri sebagai NUMATIK AI saat pertama kali memulai percakapan.`;

type Message = {
  role: "user" | "model";
  text: string;
};

const genAI = new GoogleGenerativeAI(API_KEY);

const formatText = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
};

const ChatAIPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Halo, Sobat Numatik! 🚀 Aku NUMATIK AI, asisten matematika pintarmu di galaksi ini! ✨\n\nAku siap membantu kamu belajar matematika dengan cara yang seru dan mudah dipahami. Mau tanya apa hari ini? 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(trimmed);
      const responseText = result.response.text();

      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Oops! 😅 Terjadi kesalahan koneksi ke sistem galaksi. Pastikan API Key sudah benar dan coba lagi ya, Sobat Numatik! 🚀",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col gradient-space overflow-hidden">
      <Starfield />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-card/80 backdrop-blur border-b border-border shrink-0">
        <button
          onClick={() => navigate("/menu")}
          className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0">
          <img src="/numatik-ai-avatar.png" alt="NUMATIK AI" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-bold text-primary leading-none">NUMATIK AI</p>
          <p className="font-body text-xs text-white/40 mt-0.5">Asisten Matematika Cerdasmu 🚀</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-500/30 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-300 text-xs font-body">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            {msg.role === "model" ? (
              <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-cyan-500/40">
                <img src="/numatik-ai-avatar.png" alt="NUMATIK AI" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center border bg-gradient-to-br from-accent/30 to-yellow-500/20 border-accent/40">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}

            {/* Bubble */}
            <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm font-body leading-relaxed shadow-lg ${
              msg.role === "model"
                ? "bg-card/90 border border-white/10 text-white/90 rounded-tl-sm"
                : "bg-gradient-to-br from-cyan-600/80 to-cyan-700/80 border border-cyan-500/50 text-white rounded-tr-sm"
            }`}>
              <div className="whitespace-pre-wrap break-words">{formatText(msg.text)}</div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-2 flex-row">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-cyan-500/40">
              <img src="/numatik-ai-avatar.png" alt="NUMATIK AI" className="w-full h-full object-cover" />
            </div>
            <div className="bg-card/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-white/50 text-xs font-body">NUMATIK AI sedang berpikir</span>
              <span className="flex gap-1 ml-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="relative z-10 px-4 pb-4 pt-2 bg-card/80 backdrop-blur border-t border-border shrink-0">
        <div className="flex gap-2 items-end bg-white/5 border border-white/10 rounded-2xl px-3 py-2 focus-within:border-cyan-500/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya NUMATIK AI tentang matematika... 🌟"
            rows={1}
            disabled={loading}
            className="flex-1 bg-transparent text-white text-sm font-body placeholder-white/30 resize-none outline-none max-h-32 leading-relaxed py-1"
            style={{ scrollbarWidth: "none" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-cyan-500 active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-white/20 text-xs font-body mt-2">
          Tekan Enter untuk kirim • Shift+Enter untuk baris baru
        </p>
      </div>
    </div>
  );
};

export default ChatAIPage;
