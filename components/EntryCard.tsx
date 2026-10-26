import Link from 'next/link'
import { completeSample, type Entry } from '@/lib/content'
import { getDictionary, pick, type Locale } from '@/lib/i18n'
import { Signature } from './Signature'

export function EntryCard({ entry, locale }: { entry: Entry; locale: Locale }) {
  const t = getDictionary(locale)
  const sample = completeSample(entry.sample)
  const date = new Date(entry.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <Link href={`/${locale}/learn/${entry.slug}`} className="entry-card">
      <div className={`entry-cover ${entry._type}`}>
        {entry.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${entry.cover}?w=640&h=400&fit=crop`} alt="" />
        ) : sample ? (
          <Signature sample={sample} />
        ) : (
          <span className="play" aria-hidden="true">▶</span>
        )}
        {entry._type === 'video' && <span className="badge">{t.learn.videos} · {entry.duration}</span>}
      </div>
      <div className="entry-meta">
        <span className="eyebrow">{entry.category ? t.categories[entry.category] : ''}</span>
        <h3>{pick(entry.title, locale)}</h3>
        {entry.excerpt && <p className="muted">{pick(entry.excerpt, locale)}</p>}
        <span className="small muted">
          {date}
          {entry._type === 'article' && entry.readMinutes ? ` · ${entry.readMinutes} ${t.learn.min}` : ''}
        </span>
      </div>
    </Link>
  )
}
