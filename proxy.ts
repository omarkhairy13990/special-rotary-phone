import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n'

/** Sends visitors without a language prefix to English (the primary language), or Arabic when their browser prefers it. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()
  const prefersArabic = /^ar\b/i.test(request.headers.get('accept-language') || '')
  const locale = prefersArabic ? 'ar' : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|studio|_next|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
}
