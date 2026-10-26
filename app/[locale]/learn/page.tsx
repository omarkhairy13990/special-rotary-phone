import type { Metadata } from 'next'
import { EntryCard } from '@/components/EntryCard'
import { getLatest } from '@/lib/content'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: getDictionary(isLocale(locale) ? locale : 'en').learn.title }
}

export default async function Learn({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ type?: string }> }) {
  const { locale: raw } = await params
  const { type } = await searchParams
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const all = await getLatest(60)
  const entries = type === 'article' || type === 'video' ? all.filter((e) => e._type === type) : all
  const tabs: [string | undefined, string][] = [[undefined, t.learn.all], ['article', t.learn.articles], ['video', t.learn.videos]]
  return (
    <div className="wrap page">
      <header className="page-head">
        <span className="eyebrow ltr">/learn</span>
        <h1>{t.learn.title}</h1>
        <p className="lead muted">{t.learn.lead}</p>
      </header>
      <nav className="tabs" aria-label={t.learn.title}>
        {tabs.map(([key, label]) => (
          <a key={label} href={key ? `?type=${key}` : '?'} aria-current={type === key ? 'page' : undefined}>{label}</a>
        ))}
      </nav>
      <div className="entries">
        {entries.map((e) => <EntryCard key={e._id} entry={e} locale={locale} />)}
      </div>
    </div>
  )
}
