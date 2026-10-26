import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Body, VideoEmbed } from '@/components/Body'
import { Signature } from '@/components/Signature'
import { completeSample, getEntry, getEntrySlugs, youtubeId } from '@/lib/content'
import { getDictionary, isLocale, locales, pick, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  const slugs = await getEntrySlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const entry = await getEntry(slug)
  const l = (isLocale(locale) ? locale : 'en') as Locale
  return entry ? { title: pick(entry.title, l), description: pick(entry.excerpt, l) } : {}
}

export default async function EntryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const entry = await getEntry(slug)
  if (!entry) notFound()
  const sample = completeSample(entry.sample)
  const vid = youtubeId(entry.youtubeUrl)
  const date = new Date(entry.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <article className="wrap page article">
      <Link href={`/${locale}/learn`} className="link small">{t.learn.back}</Link>
      <header className="article-head">
        <div>
          <span className="eyebrow">{entry.category ? t.categories[entry.category] : ''}{entry.audience ? ` · ${t.audience[entry.audience]}` : ''}</span>
          <h1>{pick(entry.title, locale)}</h1>
          {entry.excerpt && <p className="lead muted">{pick(entry.excerpt, locale)}</p>}
          <span className="small muted">{date}{entry.readMinutes ? ` · ${entry.readMinutes} ${t.learn.min}` : ''}{entry.duration ? ` · ${entry.duration}` : ''}</span>
        </div>
        {sample && !vid && (
          <div className="article-sig band"><Signature sample={sample} label="Water signature" /></div>
        )}
      </header>
      {entry._type === 'video' && (vid ? <VideoEmbed id={vid} title={pick(entry.title, locale)} /> : <div className="video video-empty band"><span>▶</span></div>)}
      <Body value={pick(entry.body, locale)} />
      <Body value={pick(entry.notes, locale)} />
    </article>
  )
}
