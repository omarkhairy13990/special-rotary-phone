'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const copy = {
  en: { title: 'Tank sizing', people: 'People', lpd: 'Use per person', days: 'Storage days', margin: 'Safety margin', result: 'Suggested capacity', fits: (l: string) => `A ${l} L tank is enough`, more: 'You need more than one tank. Talk to our team.' },
  ar: { title: 'سعة الخزان', people: 'عدد الأفراد', lpd: 'استهلاك الفرد', days: 'أيام التخزين', margin: 'هامش أمان', result: 'السعة المقترحة', fits: (l: string) => `خزان ${l} لتر يكفي`, more: 'تحتاج أكثر من خزان. تواصل مع فريقنا.' },
}

const SIZES = [500, 1000, 1500, 2250, 3000, 5000, 7500, 10000, 20000]

export function TankCalculator({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [v, setV] = useState({ people: 6, lpd: 150, days: 2, margin: 20 })
  const liters = v.people * v.lpd * v.days * (1 + v.margin / 100)
  const size = SIZES.find((x) => x >= liters)
  const field = (key: keyof typeof v, label: string, unit: string) => (
    <label htmlFor={`tank-${key}`} className="field-label">
      {label}
      <span className="field">
        <input id={`tank-${key}`} type="number" min={0} inputMode="numeric" value={v[key]} onChange={(e) => setV({ ...v, [key]: Math.max(0, Number(e.target.value) || 0) })} />
        <span>{unit}</span>
      </span>
    </label>
  )
  return (
    <div className="card calc">
      <h3>{t.title}</h3>
      <div className="calc-grid">
        {field('people', t.people, '×')}
        {field('lpd', t.lpd, 'L/day')}
        {field('days', t.days, 'd')}
        {field('margin', t.margin, '%')}
      </div>
      <div className="readout band">
        <div>
          <small>{t.result}</small>
          <div className="num ltr">
            {(liters / 1000).toFixed(2)} <small>m³</small>
          </div>
        </div>
        <small>{size ? t.fits(size.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')) : t.more}</small>
      </div>
    </div>
  )
}
