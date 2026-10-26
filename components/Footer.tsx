import { getDictionary, type Locale } from '@/lib/i18n'
import { Mark } from './Mark'

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="brand">
          <Mark rtl={locale === 'ar'} />
          <span>{t.tagline}</span>
        </div>
        <small>
          © {new Date().getFullYear()} {t.footer.rights}
        </small>
      </div>
    </footer>
  )
}
