import type { Metadata } from 'next'
import { SignatureLab } from '@/components/SignatureLab'
import { TankCalculator } from '@/components/TankCalculator'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: getDictionary(isLocale(locale) ? locale : 'en').lab.title }
}

export default async function Lab({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  return (
    <div className="wrap page">
      <header className="page-head">
        <span className="eyebrow ltr">/lab</span>
        <h1>{t.lab.title}</h1>
        <p className="lead muted">{t.lab.lead}</p>
      </header>
      <SignatureLab locale={locale} />
      <div className="tools-grid">
        <TankCalculator locale={locale} />
      </div>
    </div>
  )
}
