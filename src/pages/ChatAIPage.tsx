import { useState, useRef, useEffect, useCallback } from "react";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import ChatMessage from "@/components/ChatMessage";
import { Bot, Send, Loader2, Trash2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Bagaimana cara menghitung luas lingkaran?",
  "Jelaskan teorema Pythagoras",
  "Apa itu persamaan kuadrat?",
  "Bantu aku dengan soal pecahan",
];

const ChatAIPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      abortRef.current = new AbortController();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        const current = accumulated;
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: current } : m)
        );
      }
    } catch (err: any) {
      if (err.name === "AbortError") return;
      const errMsg = err.message || "Terjadi kesalahan. Coba lagi.";
      setError(errMsg);
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    playPopSound();
    sendMessage(input);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    playPopSound();
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
  };

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden ${isDark ? "gradient-space" : "gradient-snow"}`}>
      {isDark ? <Starfield /> : <Snowfall />}
      <PageNavigation />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center mb-2">
            <h1 className={`font-display text-2xl md:text-3xl font-bold text-glow-cyan ${isDark ? "text-primary" : "text-blue-800"}`}>
              NUMATIK AI
            </h1>
          </div>
          <p className={`text-sm font-body ${isDark ? "text-white/70" : "text-blue-700"}`}>
            Asisten Matematika Cerdas untuk Sobat Numatik
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 pb-4">
        <div className={`flex-1 backdrop-blur-md border rounded-t-2xl overflow-hidden flex flex-col ${
          isDark
            ? "bg-card/40 border-border/50"
            : "bg-white/70 border-blue-200/60"
        }`}>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="mb-6">
                  <img
                    src="/logo-numatik.png"
                    alt="NUMATIK Logo"
                    className="w-24 h-24 object-contain drop-shadow-[0_0_16px_rgba(234,179,8,0.4)]"
                  />
                </div>
                <h2 className={`font-display text-xl font-bold mb-2 ${isDark ? "text-foreground" : "text-blue-900"}`}>
                  Halo, Sobat Numatik!
                </h2>
                <p className={`text-sm max-w-md mb-6 font-body ${isDark ? "text-muted-foreground" : "text-blue-700"}`}>
                  Aku NUMATIK AI, asisten matematika kamu di aplikasi Numatik. Tanyakan
                  apapun tentang matematika, dan aku akan bantu menjelaskan
                  langkah demi langkah!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { playPopSound(); setInput(s); inputRef.current?.focus(); }}
                      className={`text-left text-sm p-3 rounded-xl border transition-all duration-200 font-body ${
                        isDark
                          ? "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50 hover:border-purple-500/30 hover:text-foreground"
                          : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center border border-purple-400/30 shadow-lg shadow-purple-500/20">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className={`backdrop-blur border rounded-2xl rounded-bl-sm px-4 py-3 ${
                      isDark
                        ? "bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30"
                        : "bg-white/80 border-blue-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <Loader2 className={`w-4 h-4 animate-spin ${isDark ? "text-purple-400" : "text-blue-500"}`} />
                        <span className={`text-sm font-body ${isDark ? "text-muted-foreground" : "text-blue-600"}`}>
                          NUMATIK sedang berpikir...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-body ${
                    isDark
                      ? "bg-red-900/30 border-red-700/50 text-red-300"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className={`p-4 border-t ${isDark ? "border-border/50 bg-card/60" : "border-blue-200/60 bg-white/60"}`}>
            {messages.length > 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className={`text-xs gap-1 ${isDark ? "text-muted-foreground hover:text-destructive" : "text-blue-400 hover:text-red-500"}`}
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus Chat
                </Button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan matematika kamu..."
                  disabled={isLoading}
                  rows={1}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm resize-none disabled:opacity-50 transition-all font-body focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-purple-500/50 focus:border-purple-500/50"
                      : "bg-white border-blue-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-400/50 focus:border-blue-400"
                  }`}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:shadow-none transition-all shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className={`text-sm transition-colors cursor-pointer font-body ${isDark ? "text-muted-foreground hover:text-primary" : "text-blue-400 hover:text-blue-600"}`}
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAIPage;
