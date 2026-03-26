import { useState, useEffect, useRef } from "react";
import { InlineMath } from "react-katex";
import { playPopSound } from "@/hooks/useAudio";

const FUNCTIONS = [
  {
    id: "f1", label: "2x + 3", latex: "f(x) = 2x + 3",
    fn: (x: number) => 2 * x + 3,
    steps: (x: number) => [
      { desc: "Substitusi x", expr: `f(${x}) = 2(${x}) + 3` },
      { desc: "Kalikan", expr: `= ${2 * x} + 3` },
      { desc: "Hasil", expr: `= ${2 * x + 3}` },
    ],
    color: "#a78bfa", bg: "bg-violet-500/20 border-violet-500/40",
  },
  {
    id: "f2", label: "x² − 1", latex: "f(x) = x^2 - 1",
    fn: (x: number) => x * x - 1,
    steps: (x: number) => [
      { desc: "Substitusi x", expr: `f(${x}) = (${x})² − 1` },
      { desc: "Pangkatkan", expr: `= ${x * x} − 1` },
      { desc: "Hasil", expr: `= ${x * x - 1}` },
    ],
    color: "#22d3ee", bg: "bg-cyan-500/20 border-cyan-500/40",
  },
  {
    id: "f3", label: "3x − 5", latex: "f(x) = 3x - 5",
    fn: (x: number) => 3 * x - 5,
    steps: (x: number) => [
      { desc: "Substitusi x", expr: `f(${x}) = 3(${x}) − 5` },
      { desc: "Kalikan", expr: `= ${3 * x} − 5` },
      { desc: "Hasil", expr: `= ${3 * x - 5}` },
    ],
    color: "#f472b6", bg: "bg-pink-500/20 border-pink-500/40",
  },
  {
    id: "f4", label: "x² + 2x", latex: "f(x) = x^2 + 2x",
    fn: (x: number) => x * x + 2 * x,
    steps: (x: number) => [
      { desc: "Substitusi x", expr: `f(${x}) = (${x})² + 2(${x})` },
      { desc: "Hitung", expr: `= ${x * x} + ${2 * x}` },
      { desc: "Hasil", expr: `= ${x * x + 2 * x}` },
    ],
    color: "#fbbf24", bg: "bg-yellow-500/20 border-yellow-500/40",
  },
  {
    id: "f5", label: "−x + 10", latex: "f(x) = -x + 10",
    fn: (x: number) => -x + 10,
    steps: (x: number) => [
      { desc: "Substitusi x", expr: `f(${x}) = −(${x}) + 10` },
      { desc: "Negatifkan", expr: `= ${-x} + 10` },
      { desc: "Hasil", expr: `= ${-x + 10}` },
    ],
    color: "#4ade80", bg: "bg-green-500/20 border-green-500/40",
  },
];

type Phase = "idle" | "feeding" | "processing" | "outputting" | "done";

const PRESETS = [-3, -2, -1, 0, 1, 2, 3, 5];

function GearSVG({ size, speed, clockwise, color }: { size: number; speed: number; clockwise: boolean; color: string }) {
  const id = useRef(`gear-${Math.random().toString(36).slice(2)}`);
  const teeth = 8;
  const r = size / 2;
  const rInner = r * 0.55;
  const rOuter = r * 0.88;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = ((i * 2 * Math.PI) / teeth) - Math.PI / teeth / 2;
    const a1 = a0 + Math.PI / teeth / 2;
    const a2 = a1 + Math.PI / teeth / 2;
    const a3 = a2 + Math.PI / teeth / 2;
    points.push(
      `${rInner * Math.cos(a0)},${rInner * Math.sin(a0)}`,
      `${rOuter * Math.cos(a1)},${rOuter * Math.sin(a1)}`,
      `${rOuter * Math.cos(a2)},${rOuter * Math.sin(a2)}`,
      `${rInner * Math.cos(a3)},${rInner * Math.sin(a3)}`,
    );
  }
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`} style={{ overflow: "visible" }}>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={clockwise ? "0;360" : "360;0"}
        dur={`${speed}s`}
        repeatCount="indefinite"
      />
      <polygon points={points.join(" ")} fill={color} opacity="0.85" />
      <circle r={r * 0.32} fill="#0f172a" />
      <circle r={r * 0.14} fill={color} opacity="0.6" />
    </svg>
  );
}

export default function FunctionMachineAnimation() {
  const [fn, setFn] = useState(FUNCTIONS[0]);
  const [inputVal, setInputVal] = useState("3");
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    timerRefs.current.push(setTimeout(fn, delay));
  };

  const run = () => {
    const x = parseInt(inputVal);
    if (isNaN(x)) return;
    playPopSound();
    clearTimers();

    const output = fn.fn(x);
    const steps = fn.steps(x);

    setResult(null);
    setVisibleSteps(0);
    setPhase("feeding");

    addTimer(() => setPhase("processing"), 700);
    steps.forEach((_, i) => {
      addTimer(() => setVisibleSteps(i + 1), 700 + 500 + i * 450);
    });
    addTimer(() => setPhase("outputting"), 700 + 500 + steps.length * 450);
    addTimer(() => { setResult(output); setPhase("done"); }, 700 + 500 + steps.length * 450 + 600);
  };

  const reset = () => {
    playPopSound();
    clearTimers();
    setPhase("idle");
    setResult(null);
    setVisibleSteps(0);
  };

  const handleFnChange = (f: typeof FUNCTIONS[0]) => {
    playPopSound();
    clearTimers();
    setFn(f);
    setPhase("idle");
    setResult(null);
    setVisibleSteps(0);
  };

  const x = parseInt(inputVal);
  const xValid = !isNaN(x);
  const steps = xValid ? fn.steps(x) : [];
  const isRunning = phase === "feeding" || phase === "processing" || phase === "outputting";

  return (
    <div className="rounded-2xl overflow-hidden border border-violet-500/30 bg-gradient-to-br from-slate-900/90 to-violet-950/30 backdrop-blur">
      <style>{`
        @keyframes ball-enter {
          from { transform: translateX(-80px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes ball-exit {
          from { transform: translateX(0);    opacity: 0.3; }
          to   { transform: translateX(80px); opacity: 1; }
        }
        @keyframes machine-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(167,139,250,0.3); }
          50%       { box-shadow: 0 0 30px rgba(167,139,250,0.8), 0 0 60px rgba(167,139,250,0.3); }
        }
        @keyframes step-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-result {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
        @keyframes pipe-flow {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        .machine-pulse { animation: machine-pulse 0.8s ease-in-out infinite; }
        .step-in { animation: step-in 0.35s ease forwards; }
        .bounce-result { animation: bounce-result 0.5s ease forwards; }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-4 pb-2 text-center">
        <p className="font-display text-sm font-bold text-violet-300 mb-0.5">⚙️ Mesin Fungsi Interaktif</p>
        <p className="text-xs text-white/50 font-body">Masukkan nilai domain, lihat mesin memproses dan menghasilkan f(x)!</p>
      </div>

      {/* Function selector */}
      <div className="flex flex-wrap gap-1.5 justify-center px-4 pb-3">
        {FUNCTIONS.map(f => (
          <button
            key={f.id}
            onClick={() => handleFnChange(f)}
            className={`text-xs px-3 py-1.5 rounded-full border font-mono font-semibold transition-all cursor-pointer ${
              fn.id === f.id
                ? `border-2 text-white`
                : "bg-slate-800 border-slate-600 text-white/50 hover:text-white"
            }`}
            style={fn.id === f.id ? { borderColor: f.color, color: f.color, background: `${f.color}18` } : {}}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Machine Visual */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-center gap-0">

          {/* INPUT ZONE */}
          <div className="flex flex-col items-center gap-1.5 w-24 flex-shrink-0">
            <span className="text-[10px] text-white/40 font-body uppercase tracking-widest">Input</span>
            <div className="text-xs text-white/60 font-mono">x =</div>
            <div
              className="relative w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-lg transition-all duration-500"
              style={{
                borderColor: fn.color,
                color: fn.color,
                background: `${fn.color}15`,
                animation: phase === "feeding" ? "ball-enter 0.5s ease" : "none",
                opacity: phase === "processing" || phase === "outputting" || phase === "done" ? 0.35 : 1,
              }}
            >
              {xValid ? x : "?"}
            </div>
            <span className="text-[10px] text-white/30 font-body">domain</span>
          </div>

          {/* Arrow + pipe left */}
          <div className="flex-1 flex items-center justify-center">
            <svg width="60" height="24" viewBox="0 0 60 24" className="overflow-visible">
              <line x1="0" y1="12" x2="52" y2="12"
                stroke={fn.color}
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity={phase === "feeding" || phase === "processing" ? 1 : 0.3}
              >
                {(phase === "feeding" || phase === "processing") && (
                  <animate attributeName="stroke-dashoffset" values="60;0" dur="0.5s" repeatCount="indefinite" />
                )}
              </line>
              <polygon points="52,7 60,12 52,17" fill={fn.color} opacity={phase === "feeding" ? 1 : 0.3} />
            </svg>
          </div>

          {/* MACHINE BOX */}
          <div
            className={`relative rounded-2xl border-2 flex flex-col items-center justify-center px-4 py-5 transition-all duration-300 flex-shrink-0`}
            style={{
              width: 140,
              borderColor: fn.color,
              background: `linear-gradient(135deg, #0f172a 0%, ${fn.color}18 100%)`,
              boxShadow: phase === "processing"
                ? `0 0 30px ${fn.color}70, 0 0 60px ${fn.color}30`
                : `0 0 10px ${fn.color}25`,
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* Gears */}
            <div className="flex items-center gap-1 mb-2" style={{ opacity: phase === "processing" ? 1 : 0.4 }}>
              <GearSVG size={28} speed={phase === "processing" ? 1.2 : 4} clockwise={true} color={fn.color} />
              <GearSVG size={20} speed={phase === "processing" ? 0.8 : 3} clockwise={false} color={fn.color} />
              <GearSVG size={24} speed={phase === "processing" ? 1.0 : 3.5} clockwise={true} color={fn.color} />
            </div>

            {/* Formula */}
            <div className="text-center mb-1">
              <div className="text-[9px] text-white/40 font-body uppercase tracking-wider mb-0.5">fungsi</div>
              <div style={{ color: fn.color }} className="font-mono text-xs font-bold">
                <InlineMath math={fn.latex} />
              </div>
            </div>

            {/* Processing indicator */}
            {phase === "processing" && (
              <div className="flex gap-1 mt-1.5">
                {[0.1, 0.2, 0.3].map((d, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: fn.color, animation: `bounce 0.6s ${d}s ease-in-out infinite` }} />
                ))}
              </div>
            )}
            {phase !== "processing" && <div className="h-4" />}
          </div>

          {/* Arrow + pipe right */}
          <div className="flex-1 flex items-center justify-center">
            <svg width="60" height="24" viewBox="0 0 60 24" className="overflow-visible">
              <line x1="0" y1="12" x2="52" y2="12"
                stroke={fn.color}
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity={phase === "outputting" || phase === "done" ? 1 : 0.3}
              >
                {(phase === "outputting" || phase === "done") && (
                  <animate attributeName="stroke-dashoffset" values="60;0" dur="0.5s" repeatCount="indefinite" />
                )}
              </line>
              <polygon points="52,7 60,12 52,17" fill={fn.color} opacity={phase === "outputting" || phase === "done" ? 1 : 0.3} />
            </svg>
          </div>

          {/* OUTPUT ZONE */}
          <div className="flex flex-col items-center gap-1.5 w-24 flex-shrink-0">
            <span className="text-[10px] text-white/40 font-body uppercase tracking-widest">Output</span>
            <div className="text-xs text-white/60 font-mono">f(x) =</div>
            <div
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-lg"
              style={{
                borderColor: phase === "done" ? fn.color : "rgba(255,255,255,0.15)",
                color: phase === "done" ? fn.color : "rgba(255,255,255,0.2)",
                background: phase === "done" ? `${fn.color}20` : "rgba(255,255,255,0.03)",
                animation: phase === "done" ? "bounce-result 0.5s ease forwards" : "none",
              }}
            >
              {phase === "done" && result !== null ? result : "?"}
            </div>
            <span className="text-[10px] text-white/30 font-body">kodomain</span>
          </div>
        </div>
      </div>

      {/* Step-by-step */}
      <div className="px-4 pb-3 min-h-[80px]">
        <div className={`rounded-xl border px-4 py-3 transition-all ${fn.bg}`}>
          <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2 font-body">Langkah Pengerjaan</p>
          {visibleSteps === 0 && phase === "idle" && (
            <p className="text-white/30 text-xs font-body italic">Masukkan nilai x dan tekan "Jalankan" untuk melihat proses...</p>
          )}
          {steps.slice(0, visibleSteps).map((step, i) => (
            <div
              key={i}
              className="step-in flex items-center gap-3 mb-1.5"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full font-body flex-shrink-0"
                style={{ background: `${fn.color}25`, color: fn.color }}
              >
                {step.desc}
              </span>
              <span className="font-mono text-sm text-white/90">{step.expr}</span>
            </div>
          ))}
          {phase === "done" && result !== null && (
            <div className="bounce-result mt-2 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="font-mono font-bold text-base" style={{ color: fn.color }}>
                f({x}) = {result}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl border border-slate-600 px-3 py-2">
            <span className="text-white/60 text-sm font-mono">x =</span>
            <input
              type="number"
              value={inputVal}
              onChange={e => { setInputVal(e.target.value); reset(); }}
              className="w-16 bg-transparent text-white font-mono text-sm font-bold outline-none text-center"
              disabled={isRunning}
            />
          </div>
          <button
            onClick={run}
            disabled={!xValid || isRunning}
            className="flex-1 py-2 rounded-xl font-display font-bold text-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            style={{ background: `${fn.color}30`, border: `1px solid ${fn.color}60`, color: fn.color }}
          >
            {isRunning ? "⚙️ Memproses..." : "▶ Jalankan Mesin"}
          </button>
          {phase === "done" && (
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white/60 hover:text-white text-xs font-body transition-all cursor-pointer"
            >
              🔄 Reset
            </button>
          )}
        </div>
      </div>

      {/* Preset values */}
      <div className="px-4 pb-4">
        <p className="text-[10px] text-white/30 font-body mb-2 uppercase tracking-wider">Coba nilai domain:</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(v => (
            <button
              key={v}
              onClick={() => { setInputVal(String(v)); reset(); }}
              className="w-9 h-9 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer hover:scale-105"
              style={{
                background: inputVal === String(v) ? `${fn.color}25` : "rgba(255,255,255,0.05)",
                borderColor: inputVal === String(v) ? fn.color : "rgba(255,255,255,0.1)",
                color: inputVal === String(v) ? fn.color : "rgba(255,255,255,0.5)",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
