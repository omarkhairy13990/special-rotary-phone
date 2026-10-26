/**
 * The MASAM "water signature": a 7x7 grid of pores drawn from a water analysis.
 * Turbidity scatters the dots, dissolved salts swell them, hardness turns them
 * into crystals, and pH colours the core. Pure function so server and client agree.
 */
export type WaterSample = { tds: number; ntu: number; hard: number; ph: number }

export type Shape =
  | { kind: 'circle'; cx: number; cy: number; r: number; core?: boolean }
  | { kind: 'rect'; x: number; y: number; size: number; rx: number; rotate: number; cx: number; cy: number }

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const BASE = (() => {
  const r = rng(7)
  return Array.from({ length: 49 }, () => [r() * 2 - 1, r() * 2 - 1, r() * 2 - 1, r()])
})()

export const signatureSeed = (s: WaterSample) =>
  (Math.round(s.tds) * 31 + Math.round(s.ntu) * 7 + Math.round(s.hard) * 13 + Math.round(s.ph * 10)) | 0

export const signatureId = (s: WaterSample) => 'MSM-' + String(Math.abs(signatureSeed(s)) % 10000).padStart(4, '0')

export function signatureShapes(s: WaterSample): { shapes: Shape[]; coreAlert: boolean } {
  const r = rng(signatureSeed(s))
  const turb = Math.min(1, s.ntu / 60)
  const salt = Math.min(1, Math.log10(Math.max(10, s.tds) / 10) / Math.log10(4500))
  const hard = Math.min(1, s.hard / 500)
  const shapes: Shape[] = []
  let k = 0
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 7; x++, k++) {
      const j = BASE[k]
      const a = r()
      const cx = 10 + x * 20 + j[0] * 9 * turb
      const cy = 10 + y * 20 + j[1] * 9 * turb
      const rad = 4.2 + salt * 3.2 + j[2] * 3.4 * salt * 0.9
      if (x === 3 && y === 3) {
        shapes.push({ kind: 'circle', cx: 70, cy: 70, r: rad + 1.5, core: true })
      } else if (hard > 0.25 && j[3] < hard * 0.8) {
        const size = rad * 1.7
        shapes.push({ kind: 'rect', x: cx - size / 2, y: cy - size / 2, size, rx: 1 + (1 - hard) * 2, rotate: Math.round(a * 90), cx, cy })
      } else {
        shapes.push({ kind: 'circle', cx, cy, r: Math.max(1.5, rad) })
      }
    }
  return { shapes, coreAlert: s.ph < 6.5 || s.ph > 8.5 }
}

/** WHO palatability bands for total dissolved solids. */
export function tdsBand(tds: number) {
  return tds < 300 ? 0 : tds < 600 ? 1 : tds < 900 ? 2 : tds < 1200 ? 3 : tds < 10000 ? 4 : 5
}

export const PRESETS: Record<string, WaterSample> = {
  nile: { tds: 220, ntu: 18, hard: 140, ph: 8.0 },
  well: { tds: 2350, ntu: 3, hard: 420, ph: 7.3 },
  sea: { tds: 41000, ntu: 2, hard: 6600, ph: 8.2 },
  ro: { tds: 38, ntu: 0.2, hard: 12, ph: 7.0 },
}

/** The fixed 5x5 master mark: scattered where reading starts, ordered where it ends. */
export function markShapes(rtl: boolean) {
  const out: { cx: number; cy: number; r: number; core: boolean }[] = []
  let k = 0
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++, k++) {
      let t = c / 4
      t = t * t
      const j = BASE[k]
      const core = r === 2 && c === 2
      let cx = core ? 50 : 10 + c * 20 + j[0] * 6 * t
      const cy = core ? 50 : 10 + r * 20 + j[1] * 6 * t
      const rad = core ? 7.4 : 6.2 + j[2] * 3.4 * t
      if (!rtl) cx = 100 - cx
      out.push({ cx, cy, r: rad, core })
    }
  return out
}
