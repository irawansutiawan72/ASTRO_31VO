/* ─────────────────────────────────────────────────────────────
   NUMATIK  –  Ambient Piano Background Music Engine
   Uses Web Audio API to synthesise a calm, looping piano melody.
   Safe to import anywhere: nothing runs until startMusic() is called.
───────────────────────────────────────────────────────────── */

let _ctx: AudioContext | null = null;
let _master: GainNode | null = null;
let _reverb: ConvolverNode | null = null;
let _schedulerTimer: ReturnType<typeof setInterval> | null = null;
let _noteIdx = 0;
let _nextTime = 0;
let _isPlaying = false;
let _musicEnabled = false;

// ── Frequencies (Hz) — ALL declared before MELODY ─────────────
const G2 = 98.00;
const A2 = 110.00;
const C3 = 130.81;
const E3 = 164.81;
const G3 = 196.00;
const A3 = 220.00;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;

const BPM = 68;
const BEAT = 60 / BPM;       // seconds per beat ≈ 0.882 s
const LOOKAHEAD = 0.25;       // schedule 250 ms ahead
const TICK_MS = 80;           // scheduler tick interval

type Note = { f: number; d: number; vel?: number; bass?: number };

/* ── Melody: gentle C-major / A-minor loop (~38 s) ─────────── */
const MELODY: Note[] = [
  // ── Phrase 1: ascending warmth
  { f: C4, d: 1.5, bass: C3, vel: 0.55 },
  { f: E4, d: 0.5,            vel: 0.45 },
  { f: G4, d: 1,   bass: G3, vel: 0.50 },
  { f: A4, d: 1.5, bass: A3, vel: 0.60 },
  { f: G4, d: 0.5,            vel: 0.40 },
  { f: E4, d: 1,   bass: E3, vel: 0.50 },
  { f: C4, d: 1,   bass: C3, vel: 0.45 },

  // ── Phrase 2: mid movement
  { f: D4, d: 2,   bass: G3, vel: 0.55 },
  { f: F4, d: 1,              vel: 0.45 },
  { f: E4, d: 1,              vel: 0.45 },
  { f: D4, d: 1,   bass: C3, vel: 0.40 },
  { f: C4, d: 3,              vel: 0.50 },

  // ── Phrase 3: gentle high melody
  { f: E4, d: 1,   bass: C3, vel: 0.50 },
  { f: G4, d: 1,              vel: 0.50 },
  { f: A4, d: 1,   bass: A3, vel: 0.55 },
  { f: C5, d: 1.5, bass: C3, vel: 0.60 },
  { f: B4, d: 0.5,            vel: 0.40 },
  { f: A4, d: 1,              vel: 0.50 },
  { f: G4, d: 1,   bass: G3, vel: 0.45 },

  // ── Phrase 4: descending resolve
  { f: E4, d: 1.5, bass: C3, vel: 0.50 },
  { f: D4, d: 0.5,            vel: 0.40 },
  { f: C4, d: 1,              vel: 0.45 },
  { f: G3, d: 1,   bass: G2, vel: 0.40 },
  { f: A3, d: 1,   bass: A2, vel: 0.40 },
  { f: C4, d: 2,   bass: C3, vel: 0.55 },

  // ── Phrase 5: bright flourish
  { f: G4, d: 0.5, bass: G3, vel: 0.50 },
  { f: A4, d: 0.5,            vel: 0.50 },
  { f: C5, d: 1,              vel: 0.55 },
  { f: E5, d: 1.5, bass: C3, vel: 0.60 },
  { f: D5, d: 0.5,            vel: 0.45 },
  { f: C5, d: 1,   bass: A3, vel: 0.50 },
  { f: A4, d: 1,              vel: 0.45 },

  // ── Phrase 6: peaceful close
  { f: G4, d: 2,   bass: G3, vel: 0.50 },
  { f: E4, d: 1,              vel: 0.45 },
  { f: D4, d: 1,   bass: C3, vel: 0.40 },
  { f: E4, d: 1,              vel: 0.45 },
  { f: C4, d: 3,   bass: C3, vel: 0.55 },
];

/* ─── Create short room-reverb impulse ──────────────────────── */
function buildReverb(ctx: AudioContext): ConvolverNode {
  const conv = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 1.6);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
    }
  }
  conv.buffer = buf;
  return conv;
}

/* ─── Synthesise one piano-like note ────────────────────────────
   Triangle (warm fundamental) + 2nd sine harmonic + 3rd harmonic
   ADSR: fast attack → quick decay → sustain → natural release
──────────────────────────────────────────────────────────────── */
function scheduleNote(
  ctx: AudioContext,
  dry: GainNode,
  wet: ConvolverNode,
  freq: number,
  vel: number,
  startTime: number,
  dur: number
) {
  if (freq <= 0) return;

  const attack  = 0.012;
  const decay   = 0.12;
  const sustain = vel * 0.45;
  const release = Math.min(0.5, dur * 0.35);
  const stop    = startTime + dur + release;

  const envGain = ctx.createGain();
  envGain.gain.setValueAtTime(0.001, startTime);
  envGain.gain.linearRampToValueAtTime(vel * 0.9, startTime + attack);
  envGain.gain.exponentialRampToValueAtTime(sustain, startTime + attack + decay);
  envGain.gain.setValueAtTime(sustain, startTime + dur - release);
  envGain.gain.exponentialRampToValueAtTime(0.001, stop);

  // Very light vibrato
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 5.5;
  lfoGain.gain.value = freq * 0.003;
  lfo.connect(lfoGain);

  const layers = [
    { f: freq,     type: "triangle" as OscillatorType, g: 1.00 },
    { f: freq * 2, type: "sine"     as OscillatorType, g: 0.22 },
    { f: freq * 3, type: "sine"     as OscillatorType, g: 0.07 },
  ];

  layers.forEach(({ f, type, g }) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = f;
    lfoGain.connect(osc.frequency);
    const hg = ctx.createGain();
    hg.gain.value = g;
    osc.connect(hg);
    hg.connect(envGain);
    osc.start(startTime);
    osc.stop(stop);
  });

  lfo.start(startTime);
  lfo.stop(stop);

  // Low-pass warmth filter
  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = Math.min(3500, freq * 8);
  lpf.Q.value = 0.5;

  envGain.connect(lpf);
  lpf.connect(dry);
  lpf.connect(wet);
}

/* ─── Lookahead scheduler ───────────────────────────────────── */
function schedule() {
  if (!_ctx || !_master || !_reverb || !_isPlaying) return;
  const now = _ctx.currentTime;
  while (_nextTime < now + LOOKAHEAD) {
    const note = MELODY[_noteIdx % MELODY.length];
    const dur  = note.d * BEAT;
    const vel  = (note.vel ?? 0.5) * 0.07; // master vol — very quiet
    scheduleNote(_ctx, _master, _reverb, note.f, vel, _nextTime, dur);
    if (note.bass) {
      scheduleNote(_ctx, _master, _reverb, note.bass, vel * 0.55, _nextTime, dur * 1.2);
    }
    _nextTime += dur;
    _noteIdx++;
  }
}

/* ─── Public API ─────────────────────────────────────────────── */
export function isMusicEnabled(): boolean {
  return _musicEnabled;
}

export function startMusic() {
  if (_isPlaying) return;
  try {
    if (!_ctx) _ctx = new AudioContext();
    if (_ctx.state === "suspended") _ctx.resume();

    _master = _ctx.createGain();
    _master.gain.value = 1;
    _master.connect(_ctx.destination);

    _reverb = buildReverb(_ctx);
    const wetGain = _ctx.createGain();
    wetGain.gain.value = 0.18;
    _reverb.connect(wetGain);
    wetGain.connect(_ctx.destination);

    _nextTime = _ctx.currentTime + 0.1;
    _noteIdx  = 0;
    _isPlaying = true;
    _musicEnabled = true;

    schedule();
    _schedulerTimer = setInterval(schedule, TICK_MS);
  } catch (e) {
    console.warn("BgMusic start failed:", e);
  }
}

export function stopMusic() {
  _isPlaying = false;
  _musicEnabled = false;
  if (_schedulerTimer !== null) {
    clearInterval(_schedulerTimer);
    _schedulerTimer = null;
  }
  if (_master) {
    try { _master.disconnect(); } catch { /* ignore */ }
    _master = null;
  }
  if (_reverb) {
    try { _reverb.disconnect(); } catch { /* ignore */ }
    _reverb = null;
  }
}

export function setMusicEnabled(val: boolean) {
  if (val) startMusic(); else stopMusic();
}
