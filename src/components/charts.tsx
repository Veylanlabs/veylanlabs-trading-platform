import React from "react";

export function Candles({ c, n, vol, seed = 5, tr = 0, w = 560, h = 240 }: any) {
  let p = h * 0.55;
  let currentSeed = seed; 
  const pad = 10, gw = (w - pad * 2) / n, cw = gw * 0.5, els = [];
  
  for (let i = 0; i < n; i++) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280; 
    const randomVal = currentSeed / 233280;
    
    const o = p; 
    p = Math.max(18, Math.min(h - 18, p + (randomVal - 0.5) * vol - tr));
    const cl = p, x = pad + i * gw + gw / 2, up = cl < o, col = up ? c.up : c.dn;
    const hi = Math.min(o, cl) - randomVal * 8 - 2, lo = Math.max(o, cl) + randomVal * 8 + 2;
    
    els.push(<line key={"l" + i} x1={x} y1={hi} x2={x} y2={lo} stroke={col} strokeWidth="1.3" opacity=".6" />);
    els.push(<rect key={"r" + i} x={x - cw / 2} y={Math.min(o, cl)} width={cw} height={Math.max(2, Math.abs(cl - o))} fill={col} rx="1" />);
  }
  
  return <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>{els}</svg>;
}

export function LineChart({ c, data, w = 520, h = 220, area }: any) {
  const pad = 24, mx = Math.max(...data), mn = Math.min(...data);
  const X = (i: number) => pad + i * (w - pad * 2) / (data.length - 1);
  const Y = (v: number) => h - pad - (v - mn) / ((mx - mn) || 1) * (h - pad * 2);
  const d = data.map((v: number, i: number) => (i ? "L" : "M") + X(i) + " " + Y(v)).join(" ");
  
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
      {[0, 1, 2, 3].map(i => { 
        const y = pad + i * (h - pad * 2) / 3; 
        return <line key={i} x1={pad} y1={y} x2={w - pad} y2={y} stroke={c.grid} strokeWidth="1" />; 
      })}
      {area && <path d={`${d} L${X(data.length - 1)} ${h - pad} L${pad} ${h - pad} Z`} fill={c.accent} opacity=".08" />}
      <path d={d} fill="none" stroke={c.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={X(data.length - 1)} cy={Y(data[data.length - 1])} r="3.5" fill={c.accent} />
    </svg>
  );
}

export function Bars({ c, data, w = 520, h = 220 }: any) {
  const pad = 20, bw = (w - pad * 2) / data.length * 0.6, gap = (w - pad * 2) / data.length, mx = Math.max(...data);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
      {data.map((v: number, i: number) => { 
        const bh = (v / mx) * (h - pad * 2);
        const x = pad + i * gap + (gap - bw) / 2;
        const y = h - pad - bh;
        const last = i === data.length - 1; 
        return <rect key={i} x={x} y={y} width={bw} height={bh} rx="3" fill={last ? c.accent : c.bar} />; 
      })}
    </svg>
  );
}

export function Donut({ c, segs }: any) {
  const cx = 60, cy = 60, r = 44, C = 2 * Math.PI * r; 
  const cols = [c.accent, c.t3, c.bar];
  
  return (
    <svg viewBox="0 0 120 120" style={{ width: 120 }}>
      {segs.reduce((acc: { off: number; els: React.ReactNode[] }, v: number, i: number) => { 
        const len = v / 100 * C; 
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={cols[i]} strokeWidth="14" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc.off} transform={`rotate(-90 ${cx} ${cy})`} />; 
        acc.off += len; 
        acc.els.push(el);
        return acc; 
      }, { off: 0, els: [] }).els}
    </svg>
  );
}
