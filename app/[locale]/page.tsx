import Link from 'next/link'
import { EntryCard } from '@/components/EntryCard'
import { Signature } from '@/components/Signature'
import { getLatest } from '@/lib/content'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'
import { PRESETS, signatureId } from '@/lib/signature'

const sections = ['solutions', 'products', 'lab', 'learn', 'store'] as const

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const latest = await getLatest(3)
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">{t.home.eyebrow}</span>
          <h1>{t.home.title}</h1>
          <p className="lead muted">{t.home.lead}</p>
          <div className="btns">
            <Link className="btn btn-primary" href={`/${locale}/lab`}>{t.home.ctaPrimary}</Link>
            <Link className="btn btn-ghost" href={`/${locale}/solutions`}>{t.home.ctaSecondary}</Link>
          </div>
        </div>
        <div className="hero-plate band">
          <Signature sample={PRESETS.sea} label="Water signature: Red Sea feed water" className="hero-sig" />
          <div className="plate-row ltr mono"><span>{signatureId(PRESETS.sea)} · RED SEA FEED</span><span>TDS 41,000 ppm</span></div>
        </div>
      </section>

      <section className="wrap doors">
        <Link href={`/${locale}/solutions`} className="door band">
          <span className="eyebrow">01</span>
          <h2>{t.home.business}</h2>
          <p>{t.home.businessText}</p>
        </Link>
        <Link href={`/${locale}/store`} className="door surface">
          <span className="eyebrow">02</span>
          <h2>{t.home.homeDoor}</h2>
          <p className="muted">{t.home.homeText}</p>
        </Link>
      </section>

      <section className="wrap block">
        <h2 className="section-title">{t.home.sections}</h2>
        <div className="sections-grid">
          {sections.map((s) => (
            <Link key={s} href={`/${locale}/${s}`} className="section-tile">
              <span className="path ltr mono">/{s}</span>
              <b>{t.nav[s]}</b>
              <span className="muted">{t.sectionText[s]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap block">
        <div className="section-head-row">
          <h2 className="section-title">{t.home.latest}</h2>
          <Link href={`/${locale}/learn`} className="link">{t.home.allArticles}</Link>
        </div>
        <div className="entries">
          {latest.map((e) => <EntryCard key={e._id} entry={e} locale={locale} />)}
        </div>
      </section>
    </>
  )
}
