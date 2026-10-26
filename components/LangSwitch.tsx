'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`
  const other = locale === 'en' ? 'ar' : 'en'
  const href = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`)
  return (
    <Link href={href} hrefLang={other} className="lang-switch" lang={other}>
      {label}
    </Link>
  )
}
