import type { Metadata } from 'next'
import { ProductCard } from '@/components/ProductCard'
import { getProducts } from '@/lib/content'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: getDictionary(isLocale(locale) ? locale : 'en').products.title }
}

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const products = await getProducts()
  return (
    <div className="wrap page">
      <header className="page-head">
        <span className="eyebrow ltr">/products</span>
        <h1>{t.products.title}</h1>
        <p className="lead muted">{t.products.lead}</p>
      </header>
      <div className="products">
        {products.map((p) => <ProductCard key={p._id} product={p} locale={locale} />)}
      </div>
    </div>
  )
}
