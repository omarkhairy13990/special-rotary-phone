import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n'
import { LangSwitch } from './LangSwitch'
import { Mark } from './Mark'

const sections = ['solutions', 'products', 'lab', 'learn', 'store'] as const

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href={`/${locale}`} className="brand">
          <Mark rtl={locale === 'ar'} />
          <span>{locale === 'ar' ? 'مسام' : 'MASAM'}</span>
        </Link>
        <nav aria-label="Main">
          <ul>
            {sections.map((s) => (
              <li key={s}>
                <Link href={`/${locale}/${s}`}>{t.nav[s]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <LangSwitch locale={locale} label={t.switchTo} />
      </div>
    </header>
  )
}
