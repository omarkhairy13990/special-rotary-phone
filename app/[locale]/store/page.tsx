import type { Metadata } from 'next'
import { ProductCard } from '@/components/ProductCard'
import { getProducts } from '@/lib/content'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: getDictionary(isLocale(locale) ? locale : 'en').store.title }
}

export default async function Store({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const products = (await getProducts()).filter((p) => p.inStore && p.priceEGP)
  return (
    <div className="wrap page">
      <header className="page-head">
        <span className="eyebrow ltr">/store</span>
        <h1>{t.store.title}</h1>
        <p className="lead muted">{t.store.lead}</p>
      </header>
      <div className="products">
        {products.map((p) => <ProductCard key={p._id} product={p} locale={locale} showPrice />)}
      </div>
    </div>
  )
}
