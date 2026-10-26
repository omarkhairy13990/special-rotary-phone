'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { PRESETS, signatureId, tdsBand, type WaterSample } from '@/lib/signature'
import { Signature } from './Signature'

const copy = {
  en: {
    presets: { nile: 'Nile river', well: 'Desert well', sea: 'Red Sea', ro: 'After RO' } as Record<string, string>,
    tds: 'Dissolved salts (TDS)',
    ntu: 'Turbidity',
    hard: 'Hardness',
    ph: 'pH',
    band: ['Excellent to drink', 'Good to drink', 'Fair: taste noticeable', 'Poor: treatment advised', 'Brackish: needs RO', 'Seawater: needs desalination'],
    hardText: (h: number) => (h < 60 ? 'soft' : h < 120 ? 'moderately hard' : h < 180 ? 'hard' : 'very hard'),
    ntuText: (n: number) => (n <= 1 ? 'clear (≤1 NTU)' : n <= 5 ? 'slightly cloudy' : 'cloudy: filter first'),
    phText: (p: number) => (p < 6.5 ? 'acidic' : p > 8.5 ? 'alkaline' : 'in range 6.5–8.5'),
    basis: 'Based on WHO guideline ranges',
  },
  ar: {
    presets: { nile: 'نهر النيل', well: 'بئر صحراوي', sea: 'البحر الأحمر', ro: 'بعد التناضح العكسي' } as Record<string, string>,
    tds: 'الأملاح الذائبة (TDS)',
    ntu: 'العكارة',
    hard: 'العسر',
    ph: 'الأس الهيدروجيني',
    band: ['ممتازة للشرب', 'جيدة للشرب', 'مقبولة: الطعم ملحوظ', 'ضعيفة: يُنصح بالمعالجة', 'مسوس: تحتاج تناضح عكسي', 'مياه بحر: تحتاج تحلية'],
    hardText: (h: number) => (h < 60 ? 'يسر' : h < 120 ? 'عسر متوسط' : h < 180 ? 'عسر' : 'عسر شديد'),
    ntuText: (n: number) => (n <= 1 ? 'صافية (١ NTU أو أقل)' : n <= 5 ? 'عكارة خفيفة' : 'عكرة: تحتاج ترشيحاً أولاً'),
    phText: (p: number) => (p < 6.5 ? 'حمضية' : p > 8.5 ? 'قلوية' : 'ضمن النطاق ٦٫٥–٨٫٥'),
    basis: 'مبني على حدود منظمة الصحة العالمية',
  },
}

// TDS spans 10 to 45,000 ppm, so its slider is logarithmic.
const toTds = (v: number) => Math.round(10 * Math.pow(4500, v / 100))
const fromTds = (t: number) => Math.round((Math.log(Math.max(10, t) / 10) / Math.log(4500)) * 100)

export function SignatureLab({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [s, setS] = useState<WaterSample>(PRESETS.well)
  const [active, setActive] = useState<string | null>('well')
  const set = (patch: Partial<WaterSample>) => {
    setActive(null)
    setS((prev) => ({ ...prev, ...patch }))
  }
  const fmt = (n: number) => n.toLocaleString('en-US')
  const rows: [string, string][] = [
    [t.tds, `${fmt(s.tds)} ppm`],
    [t.ntu, t.ntuText(s.ntu)],
    [t.hard, t.hardText(s.hard)],
    [t.ph, `${s.ph.toFixed(1)} · ${t.phText(s.ph)}`],
  ]

  return (
    <div className="lab">
      <div className="lab-controls">
        <div className="presets">
          {Object.keys(PRESETS).map((k) => (
            <button
              key={k}
              type="button"
              className={active === k ? 'on' : undefined}
              onClick={() => {
                setActive(k)
                setS(PRESETS[k])
              }}
            >
              {t.presets[k]}
            </button>
          ))}
        </div>
        <Slider id="lab-tds" label={t.tds} value={fromTds(s.tds)} min={0} max={100} out={`${fmt(s.tds)} ppm`} hint="10 – 45,000 ppm · log" onChange={(v) => set({ tds: toTds(v) })} />
        <Slider id="lab-ntu" label={t.ntu} value={Math.min(100, Math.round(s.ntu))} min={0} max={100} out={`${s.ntu} NTU`} hint="0 – 100 NTU" onChange={(v) => set({ ntu: v })} />
        <Slider id="lab-hard" label={t.hard} value={Math.min(800, s.hard)} min={0} max={800} out={`${s.hard} mg/L`} hint="0 – 800 mg/L as CaCO₃" onChange={(v) => set({ hard: v })} />
        <Slider id="lab-ph" label={t.ph} value={Math.round(s.ph * 10)} min={40} max={100} out={s.ph.toFixed(1)} hint="4.0 – 10.0" onChange={(v) => set({ ph: v / 10 })} />
      </div>
      <div className="lab-out band">
        <Signature sample={s} label="Water signature" className="lab-sig" />
        <div className="report">
          <span className="sig-id ltr">{signatureId(s)}</span>
          <div className="verdict">
            {t.band[tdsBand(s.tds)]}
            <small>{t.basis}</small>
          </div>
          <dl>
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function Slider(props: { id: string; label: string; value: number; min: number; max: number; out: string; hint: string; onChange: (v: number) => void }) {
  return (
    <div className="slider">
      <div className="slider-row">
        <label htmlFor={props.id}>{props.label}</label>
        <output htmlFor={props.id} className="ltr mono">{props.out}</output>
      </div>
      <input id={props.id} type="range" min={props.min} max={props.max} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))} />
      <small className="ltr muted">{props.hint}</small>
    </div>
  )
}
