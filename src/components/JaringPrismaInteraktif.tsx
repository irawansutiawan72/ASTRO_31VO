import React, { useState, useEffect, useRef, useCallback } from "react";

type V2 = [number, number];
type V3 = [number, number, number];

/* ── 3-D helpers (for assembled view) ── */
const rotXv = (v: V3, a: number): V3 => [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
const rotYv = (v: V3, a: number): V3 => [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
const project3D = (v: V3, fov = 500, scale = 1.7): V2 => { const tz=v[2]+fov; return [(v[0]*fov*scale)/tz,(v[1]*fov*scale)/tz]; };

/* ── Math helpers ── */
const lerp  = (a: number, b: number, t: number) => a+(b-a)*t;
const lerp2 = (a: V2, b: V2, t: number): V2 => [lerp(a[0],b[0],t), lerp(a[1],b[1],t)];
const clamp01 = (x: number) => Math.max(0,Math.min(1,x));
const easeInOut = (t: number) => t<0.5?2*t*t:-1+(4-2*t)*t;
const easeOut   = (t: number) => 1-Math.pow(1-t, 2.5);
const smoothstep = (lo: number, hi: number, x: number) => easeInOut(clamp01((x-lo)/(hi-lo)));

/* ── Build n-gon polygon from one base edge ── */
function ngonFromEdge(n: number, a: number, x0: number, y0: number, upward: boolean): V2[] {
  const inR = a/(2*Math.tan(Math.PI/n));
  const R   = a/(2*Math.sin(Math.PI/n));
  const cx  = x0+a/2;
  const cyC = upward ? y0-inR : y0+inR;
  const angle0 = Math.atan2(y0-cyC, x0-cx);
  const step   = upward ? -2*Math.PI/n : 2*Math.PI/n;
  return Array.from({length:n}, (_,k) => [cx+R*Math.cos(angle0+k*step), cyC+R*Math.sin(angle0+k*step)] as V2);
}

/* ── Cascade hinge helpers ──
   Each rect face "folds" around its shared edge with its parent.
   foldRectRight: rect to the RIGHT of the hinge line x=hingeX
   foldRectLeft : rect to the LEFT  of the hinge line x=hingeX
   phi=0 → flat (net position), phi>0 → folded
*/
function foldRectRight(hingeX: number, y_top: number, y_bot: number, width: number, phi: number): V2[] {
  const dx = width*Math.cos(phi);
  return [[hingeX,y_bot],[hingeX+dx,y_bot],[hingeX+dx,y_top],[hingeX,y_top]];
}
function foldRectLeft(hingeX: number, y_top: number, y_bot: number, width: number, phi: number): V2[] {
  const dx = width*Math.cos(phi);
  return [[hingeX-dx,y_bot],[hingeX,y_bot],[hingeX,y_top],[hingeX-dx,y_top]];
}
/* Cap polygon folded around horizontal hinge y=hingeY */
function foldCapVerts(verts: V2[], hingeY: number, phi: number): V2[] {
  return verts.map(([vx,vy]) => [vx, hingeY+(vy-hingeY)*Math.cos(phi)] as V2);
}

const RECT_COLORS = ["#3b82f6","#8b5cf6","#22c55e","#f97316","#ec4899"];
const R3D=38, H3D=70, SVG_CX=170, SVG_CY=118;

function makeConfig(n: number) {
  const a    = 2*R3D*Math.sin(Math.PI/n);
  const inR  = a/(2*Math.tan(Math.PI/n));
  const capH = inR+R3D;
  const netCY= 22+capH+H3D/2;
  const label= n===3?"Segitiga":n===4?"Segiempat":"Segilima";
  /* dihedral fold angle between adjacent lateral faces of a regular n-gon prism = 360°/n */
  const dihedralRad = (2*Math.PI)/n;
  return {a, h:H3D, netCY, label, dihedralRad};
}

/*
  Per-face unfolding schedule in cascade-progress space [0,1].
  Center rect → nearest side rects → further side rects → caps (last).
*/
function faceSchedule(k: number, midK: number, n: number): [number,number] {
  if (k >= n) return k===n ? [0.44,0.74] : [0.56,0.86]; // bottom / top cap
  const dist = Math.abs(k-midK);
  const s    = dist*0.22;
  return [s, s+0.44];
}

/* Local fold angle for face k at cascade progress p (0=fully assembled, 1=fully flat) */
function localPhi(k: number, midK: number, n: number, maxPhi: number, cascadeP: number): number {
  if (k === midK) return 0; // centre rect never folds
  const [s,e] = faceSchedule(k, midK, n);
  const t = easeOut(smoothstep(s,e,cascadeP));
  return maxPhi*(1-t);
}

/* ─────────────────────────────────────────────────────────── */
export default function JaringPrismaInteraktif() {
  const [activeN,     setActiveN]     = useState(3);
  const [rotX,        setRotX]        = useState(-22);
  const [rotY,        setRotY]        = useState(32);
  const [progress,    setProgress]    = useState(0); // 0=assembled 1=net
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging,  setIsDragging]  = useState(false);

  /* Camera angles are frozen when animation starts so the cross-fade is stable */
  const frozenCam = useRef({x:-22, y:32});
  const dragRef   = useRef({sx:0, sy:0, bx:-22, by:32});
  const animRef   = useRef<number|null>(null);
  const progressRef= useRef(0);

  useEffect(()=>{ progressRef.current=progress; },[progress]);

  /* ── Geometry ── */
  const cfg  = makeConfig(activeN);
  const {a, h, netCY, dihedralRad} = cfg;
  const stripLeft  = SVG_CX-(activeN*a)/2;
  const y0 = netCY-h/2;   // top of rect strip  (SVG y, smaller)
  const y1 = netCY+h/2;   // bottom of rect strip(SVG y, larger)
  const midK = Math.floor(activeN/2);
  const midRL = stripLeft+midK*a;      // centre rect left  x
  const midRR = midRL+a;               // centre rect right x

  /* 3-D prism vertices */
  const bot3D: V3[] = Array.from({length:activeN},(_,k)=>{
    const ang=-Math.PI/2+(2*Math.PI*k)/activeN;
    return [R3D*Math.cos(ang), H3D/2, R3D*Math.sin(ang)];
  });
  const top3D: V3[] = bot3D.map(([x,,z])=>[x,-H3D/2,z] as V3);

  /* Cap net vertices (attached to centre rect top/bottom) */
  const botNgon = ngonFromEdge(activeN, a, midRL, y1, false);
  const topNgon = ngonFromEdge(activeN, a, midRL, y0, true);
  const botCapNet: V2[] = new Array(activeN);
  const topCapNet: V2[] = new Array(activeN);
  for (let i=0;i<activeN;i++) {
    botCapNet[(midK+i)%activeN] = botNgon[i];
    topCapNet[(midK+i)%activeN] = topNgon[i];
  }

  /* ── Camera: smoothly rotates toward front-view as animation starts ── */
  const FADE_END    = 0.10;  // progress at which 3-D view fully fades out
  const CASCADE_START= 0.06; // cascade kicks in (overlapping with crossfade)

  const camAlignT = smoothstep(0, CASCADE_START, progress); // 0→1 as animation starts
  const camRx = lerp(frozenCam.current.x, -6, camAlignT)*Math.PI/180;
  const camRy = lerp(frozenCam.current.y,  0, camAlignT)*Math.PI/180;

  const proj3d = (v: V3): V2 => {
    const rv = rotXv(rotYv(v, camRy), camRx);
    const [px,py] = project3D(rv);
    return [SVG_CX+px, SVG_CY+py];
  };

  /* cascade-phase progress: 0 when global=CASCADE_START, 1 when global=1 */
  const cascadeP = smoothstep(CASCADE_START, 1.0, progress);

  /* ── Cascade vertex computation ──
     All faces computed from the anchor (centre rect) outward.
     Each face's hinge position depends on the current position of its parent's edge
     → adjacent faces stay perfectly joined throughout the animation.
  */
  function cascadeVerts(k: number): V2[] {
    /* Centre rect: always flat at net position */
    if (k===midK)
      return [[midRL,y1],[midRR,y1],[midRR,y0],[midRL,y0]];

    if (k<activeN) {
      if (k>midK) {
        /* Right side: cascade outward */
        let hx = midRR;
        for (let j=1; j<=k-midK; j++) {
          const kk = midK+j;
          const phi = localPhi(kk, midK, activeN, dihedralRad, cascadeP);
          const v = foldRectRight(hx, y0, y1, a, phi);
          if (kk===k) return v;
          hx = v[1][0]; // right-edge x for next iteration
        }
      } else {
        /* Left side: cascade outward */
        let hx = midRL;
        for (let j=1; j<=midK-k; j++) {
          const kk = midK-j;
          const phi = localPhi(kk, midK, activeN, dihedralRad, cascadeP);
          const v = foldRectLeft(hx, y0, y1, a, phi);
          if (kk===k) return v;
          hx = v[0][0]; // left-edge x for next iteration
        }
      }
    }

    /* Cap faces */
    const isBot = k===activeN;
    const capNet= isBot ? botCapNet : topCapNet;
    const hingeY= isBot ? y1 : y0;
    const phi   = localPhi(k, midK, activeN, Math.PI/2, cascadeP);
    return foldCapVerts(capNet, hingeY, phi);
  }

  /* ── Build all face objects ── */
  const allFaces = Array.from({length:activeN+2},(_,k) => ({
    k,
    fill : k<activeN ? RECT_COLORS[k%RECT_COLORS.length] : k===activeN ? "#ef4444" : "#eab308",
    label: k<activeN ? `Sisi ${k+1}` : k===activeN ? "Alas" : "Tutup",
    v3d  : k<activeN
      ? [bot3D[k], bot3D[(k+1)%activeN], top3D[(k+1)%activeN], top3D[k]] as V3[]
      : (k===activeN ? bot3D : top3D),
  }));

  /* Depth-sort by 3-D z for painter's algorithm */
  const sorted = allFaces.map(f => {
    const avgZ = f.v3d.reduce((s,v)=>s+rotXv(rotYv(v,camRy),camRx)[2],0)/f.v3d.length;
    return {
      ...f,
      avgZ,
      poly3d : f.v3d.map(proj3d),
      polyC  : cascadeVerts(f.k),
    };
  }).sort((a,b)=>b.avgZ-a.avgZ);

  /* ── Crossfade opacities ──
     alpha3D  : 3-D view opacity  (1 at p=0, fades to 0 at p=FADE_END, same on reverse)
     alphaC   : cascade view opacity (0 at p=0, rises to 1 at p=FADE_END)
  */
  const alpha3D= smoothstep(FADE_END, 0,       progress); // 1→0
  const alphaC = smoothstep(0,       FADE_END, progress); // 0→1

  /* ── Animate ── */
  const animateTo = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    frozenCam.current = {x:rotX, y:rotY};
    const startP = progressRef.current;
    const startT = performance.now();
    const dur    = 1600;
    setIsAnimating(true);

    const tick = (now: number) => {
      const raw  = Math.min((now-startT)/dur, 1);
      const eased= easeInOut(raw);
      const newP = startP+(target-startP)*eased;
      setProgress(newP);
      progressRef.current = newP;
      if (raw<1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(target);
        progressRef.current = target;
        setIsAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  /* ── Drag (3-D rotation) handlers ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (progress>0.05||isAnimating) return;
    setIsDragging(true);
    dragRef.current={sx:e.clientX, sy:e.clientY, bx:rotX, by:rotY};
  };
  const onMouseMove = useCallback((e: MouseEvent)=>{
    if (!isDragging) return;
    setRotY(dragRef.current.by+(e.clientX-dragRef.current.sx)*0.55);
    setRotX(dragRef.current.bx-(e.clientY-dragRef.current.sy)*0.55);
  },[isDragging]);
  const onMouseUp = useCallback(()=>setIsDragging(false),[]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (progress>0.05||isAnimating) return;
    const t=e.touches[0];
    setIsDragging(true);
    dragRef.current={sx:t.clientX, sy:t.clientY, bx:rotX, by:rotY};
  };
  const onTouchMove = useCallback((e: TouchEvent)=>{
    if (!isDragging) return;
    const t=e.touches[0];
    setRotY(dragRef.current.by+(t.clientX-dragRef.current.sx)*0.55);
    setRotX(dragRef.current.bx-(t.clientY-dragRef.current.sy)*0.55);
  },[isDragging]);
  const onTouchEnd = useCallback(()=>setIsDragging(false),[]);

  useEffect(()=>{
    window.addEventListener("mousemove",onMouseMove);
    window.addEventListener("mouseup",  onMouseUp);
    window.addEventListener("touchmove",onTouchMove,{passive:true});
    window.addEventListener("touchend", onTouchEnd);
    return ()=>{
      window.removeEventListener("mousemove",onMouseMove);
      window.removeEventListener("mouseup",  onMouseUp);
      window.removeEventListener("touchmove",onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  },[onMouseMove,onMouseUp,onTouchMove,onTouchEnd]);

  useEffect(()=>{
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setProgress(0); progressRef.current=0;
    setRotX(-22); setRotY(32);
    frozenCam.current={x:-22, y:32};
    setIsAnimating(false);
  },[activeN]);

  useEffect(()=>{ return()=>{ if(animRef.current) cancelAnimationFrame(animRef.current); }; },[]);

  const isAssembled = progress<0.05;
  const isFlatNet   = progress>0.95;

  /* ── Hinge marker: vertical dashed lines at fold boundaries ── */
  const hingeAlpha = Math.min(1, progress*8, (1-progress)*8)*0.35;

  return (
    <div className="space-y-3">

      {/* Prism type selector */}
      <div className="flex gap-2 justify-center">
        {[3,4,5].map(n=>{
          const c=makeConfig(n);
          return (
            <button key={n} onClick={()=>setActiveN(n)} disabled={isAnimating}
              className="text-xs font-bold py-1.5 px-3 rounded-lg border transition-all duration-200 font-body"
              style={{
                borderColor:"#6366f1",
                color:activeN===n?"#0f172a":"#818cf8",
                backgroundColor:activeN===n?"#6366f1":"transparent",
                opacity:isAnimating?0.45:activeN===n?1:0.65,
              }}>{c.label}</button>
          );
        })}
      </div>

      {/* SVG canvas */}
      <div
        className="bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden select-none"
        style={{cursor:isAssembled&&!isAnimating?(isDragging?"grabbing":"grab"):"default"}}
        onMouseDown={onMouseDown} onTouchStart={onTouchStart}
      >
        <svg viewBox="0 0 340 245" className="w-full" style={{maxHeight:265}}>

          {/* ── 3-D assembled view ── */}
          {alpha3D>0.01&&(
            <g opacity={alpha3D}>
              {sorted.map((f,fi)=>{
                const pts=f.poly3d.map(([x,y])=>`${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
                return <polygon key={`3d-${fi}`} points={pts}
                  fill={f.fill} fillOpacity={0.86}
                  stroke="rgba(255,255,255,0.80)" strokeWidth={1.4} strokeLinejoin="round"/>;
              })}
            </g>
          )}

          {/* ── Cascade hinge unfolding view ── */}
          {alphaC>0.01&&(
            <g opacity={alphaC}>
              {sorted.map((f,fi)=>{
                const pts=f.polyC.map(([x,y])=>`${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
                const mx=f.polyC.reduce((s,p)=>s+p[0],0)/f.polyC.length;
                const my=f.polyC.reduce((s,p)=>s+p[1],0)/f.polyC.length;
                const lAlpha=Math.max(0,(progress-0.76)/0.24);
                return (
                  <g key={`c-${fi}`}>
                    <polygon points={pts} fill={f.fill} fillOpacity={0.88}
                      stroke="rgba(255,255,255,0.82)" strokeWidth={1.4} strokeLinejoin="round"/>
                    {isFlatNet&&(
                      <text x={mx.toFixed(1)} y={my.toFixed(1)}
                        textAnchor="middle" dominantBaseline="middle"
                        fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold"
                        style={{pointerEvents:"none",opacity:lAlpha}}>{f.label}</text>
                    )}
                  </g>
                );
              })}

              {/* Hinge indicator lines */}
              {hingeAlpha>0.01&&(
                <g opacity={hingeAlpha}>
                  {/* Vertical hinges between rect faces */}
                  {Array.from({length:activeN-1},(_,i)=>{
                    const hx=(stripLeft+(i+1)*a).toFixed(1);
                    return <line key={`hv-${i}`} x1={hx} y1={y0.toFixed(1)} x2={hx} y2={y1.toFixed(1)}
                      stroke="white" strokeWidth={1.2} strokeDasharray="4,3"/>;
                  })}
                  {/* Horizontal hinges for caps */}
                  <line x1={midRL.toFixed(1)} y1={y1.toFixed(1)} x2={midRR.toFixed(1)} y2={y1.toFixed(1)}
                    stroke="white" strokeWidth={1.2} strokeDasharray="4,3"/>
                  <line x1={midRL.toFixed(1)} y1={y0.toFixed(1)} x2={midRR.toFixed(1)} y2={y0.toFixed(1)}
                    stroke="white" strokeWidth={1.2} strokeDasharray="4,3"/>
                </g>
              )}
            </g>
          )}

          {/* Status hint */}
          {isAssembled&&(
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">
              Drag untuk memutar · tekan Bongkar untuk melihat jaring-jaring
            </text>
          )}
          {isFlatNet&&(
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#facc15" fontFamily="monospace">
              Jaring-jaring Prisma {cfg.label.toLowerCase()} — {activeN+2} bidang
            </text>
          )}
          {!isAssembled&&!isFlatNet&&(
            <text x="170" y="237" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace">
              {progress<0.5?"Membongkar…":"Menyatukan…"}
            </text>
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button onClick={()=>animateTo(1)} disabled={isFlatNet||isAnimating}
          className="text-xs font-bold py-1.5 px-4 rounded-lg border transition-all duration-200 font-body"
          style={{borderColor:"#f97316",color:"#f97316",backgroundColor:"transparent",
                  opacity:(isFlatNet||isAnimating)?0.35:1}}>
          📤 Bongkar
        </button>
        <button onClick={()=>{setRotX(-22);setRotY(32);}} disabled={!isAssembled||isAnimating}
          className="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-600 text-slate-400 transition-all duration-200 font-body"
          style={{opacity:(!isAssembled||isAnimating)?0.35:1}}>
          ↺ Reset Rotasi
        </button>
        <button onClick={()=>animateTo(0)} disabled={isAssembled||isAnimating}
          className="text-xs font-bold py-1.5 px-4 rounded-lg border transition-all duration-200 font-body"
          style={{borderColor:"#22d3ee",color:"#22d3ee",backgroundColor:"transparent",
                  opacity:(isAssembled||isAnimating)?0.35:1}}>
          📥 Satukan
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-3 justify-center flex-wrap">
        {[
          {c:"#ef4444",l:"Alas"},
          {c:"#eab308",l:"Tutup"},
          ...RECT_COLORS.slice(0,activeN).map((c,i)=>({c,l:`Sisi ${i+1}`})),
        ].map(x=>(
          <div key={x.l} className="flex items-center gap-1 text-xs font-body">
            <div className="w-3 h-3 rounded-sm opacity-85" style={{backgroundColor:x.c}}/>
            <span style={{color:x.c}}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
