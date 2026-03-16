import { useState, useRef, useEffect, useCallback } from "react";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import ChatMessage from "@/components/ChatMessage";
import { Send, Loader2, Trash2, AlertCircle, Sparkles, Zap } from "lucide-react";
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

const ChatAIPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

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
          <div className="flex flex-col items-center gap-1 mb-1">
            <div className="flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-blue-500"}`} />
              <h1 className={`font-display text-2xl md:text-3xl font-bold tracking-widest ${isDark ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(103,232,249,0.6)]" : "text-blue-800"}`}>
                NUMATIK AI
              </h1>
              <Sparkles className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-blue-500"}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-green-400 shadow-[0_0_6px_#4ade80]" : "bg-green-500"}`} />
              <p className={`text-xs font-mono tracking-wider uppercase ${isDark ? "text-green-400" : "text-green-600"}`}>
                Online · Siap Membantu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 pb-4">
        <div className={`flex-1 flex flex-col rounded-t-2xl overflow-hidden ${
          isDark
            ? "bg-[#0a0f1e]/70 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_40px_rgba(103,232,249,0.08),inset_0_1px_0_rgba(103,232,249,0.15)]"
            : "bg-white/75 backdrop-blur-md border border-blue-200/60 shadow-xl"
        }`}>

          {/* Decorative top bar */}
          {isDark && (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
          )}

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                {/* Glow ring behind avatar */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 rounded-full blur-2xl scale-150 ${isDark ? "bg-cyan-500/20" : "bg-blue-300/30"}`} />
                  <div className={`relative w-28 h-28 rounded-full overflow-hidden border-2 ${isDark ? "border-cyan-500/50 shadow-[0_0_24px_rgba(103,232,249,0.4)]" : "border-blue-300 shadow-lg"}`}>
                    <img
                      src="/robot-numatik.jpeg"
                      alt="NUMATIK AI"
                      className="w-full h-full object-cover"
                    />
                    {/* Scan line animation */}
                    {isDark && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-[scan_2s_linear_infinite]" />
                    )}
                  </div>
                  {/* Orbit ring */}
                  {isDark && (
                    <div className="absolute inset-0 rounded-full border border-cyan-500/30 scale-[1.4] animate-[spin_8s_linear_infinite]"
                      style={{ borderStyle: "dashed" }} />
                  )}
                </div>

                <h2 className={`font-display text-2xl font-bold mb-1 tracking-wide ${isDark ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "text-blue-900"}`}>
                  Halo, Sobat Numatik!
                </h2>
                <p className={`text-sm max-w-sm mb-2 font-body leading-relaxed ${isDark ? "text-cyan-200/70" : "text-blue-700"}`}>
                  Aku <span className={`font-bold ${isDark ? "text-cyan-300" : "text-blue-600"}`}>NUMATIK AI</span> — asisten matematika pintarmu. Tanyakan soal apapun dan aku akan jelaskan langkah demi langkah!
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["Aljabar", "Geometri", "Statistika", "Olimpiade"].map((tag) => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full font-mono border ${
                      isDark
                        ? "bg-cyan-950/60 border-cyan-500/30 text-cyan-300"
                        : "bg-blue-50 border-blue-200 text-blue-600"
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow hint */}
                <div className={`mt-8 flex flex-col items-center gap-1 animate-bounce ${isDark ? "text-cyan-500/50" : "text-blue-300"}`}>
                  <span className="text-xs font-mono">Mulai bertanya</span>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    isDark={isDark}
                  />
                ))}

                {/* Typing indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                      isDark
                        ? "bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-400/30 shadow-[0_0_12px_rgba(103,232,249,0.3)]"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-300"
                    }`}>
                      <img src="/robot-numatik.jpeg" alt="AI" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className={`backdrop-blur border rounded-2xl rounded-bl-sm px-4 py-3 ${
                      isDark
                        ? "bg-[#0d1a2e]/80 border-cyan-500/20 shadow-[0_0_16px_rgba(103,232,249,0.06)]"
                        : "bg-white/80 border-blue-200"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0ms] ${isDark ? "bg-cyan-400" : "bg-blue-400"}`} />
                          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:150ms] ${isDark ? "bg-cyan-400" : "bg-blue-400"}`} />
                          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:300ms] ${isDark ? "bg-cyan-400" : "bg-blue-400"}`} />
                        </div>
                        <span className={`text-xs font-mono ${isDark ? "text-cyan-400/70" : "text-blue-500"}`}>
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
          <div className={`p-4 border-t ${
            isDark
              ? "border-cyan-500/15 bg-[#080d1a]/60 backdrop-blur-xl"
              : "border-blue-200/60 bg-white/60"
          }`}>
            {messages.length > 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className={`text-xs gap-1 ${isDark ? "text-cyan-500/50 hover:text-red-400 hover:bg-red-500/10" : "text-blue-400 hover:text-red-500"}`}
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus Chat
                </Button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <div className={`flex-1 relative rounded-xl transition-all duration-300 ${
                isDark
                  ? isFocused
                    ? "shadow-[0_0_0_1.5px_rgba(103,232,249,0.5),0_0_20px_rgba(103,232,249,0.1)]"
                    : "shadow-[0_0_0_1px_rgba(103,232,249,0.15)]"
                  : isFocused
                    ? "shadow-[0_0_0_2px_rgba(59,130,246,0.4)]"
                    : ""
              }`}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ketik pertanyaan matematika kamu..."
                  disabled={isLoading}
                  rows={1}
                  className={`w-full px-4 py-3 rounded-xl border text-sm resize-none disabled:opacity-50 transition-all font-body focus:outline-none ${
                    isDark
                      ? "bg-[#0d1a2e]/80 border-cyan-500/20 text-white placeholder:text-cyan-500/30 focus:border-cyan-500/50"
                      : "bg-white border-blue-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-400"
                  }`}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
                {isDark && (
                  <div className="absolute right-3 bottom-3 pointer-events-none">
                    <Zap className={`w-3 h-3 transition-colors ${input.trim() ? "text-cyan-400" : "text-cyan-500/20"}`} />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`h-12 w-12 rounded-xl border-0 shadow-lg transition-all shrink-0 disabled:opacity-40 disabled:shadow-none ${
                  isDark
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:shadow-[0_0_28px_rgba(103,232,249,0.5)]"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
            <p className={`text-center text-[10px] mt-2 font-mono ${isDark ? "text-cyan-500/30" : "text-gray-400"}`}>
              Enter untuk kirim · Shift+Enter untuk baris baru
            </p>
          </div>
        </div>

        {/* Decorative bottom glow */}
        {isDark && (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        )}

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/menu"); }}
            className={`text-sm transition-colors cursor-pointer font-mono tracking-wide ${isDark ? "text-cyan-500/50 hover:text-cyan-300" : "text-blue-400 hover:text-blue-600"}`}
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};

export default ChatAIPage;
