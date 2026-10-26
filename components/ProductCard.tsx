import { completeSample, type Product } from '@/lib/content'
import { getDictionary, pick, type Locale } from '@/lib/i18n'
import { Signature } from './Signature'

export function ProductCard({ product, locale, showPrice = false }: { product: Product; locale: Locale; showPrice?: boolean }) {
  const t = getDictionary(locale)
  const sample = completeSample(product.sample)
  return (
    <div className="card product">
      <div className="product-img">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${product.image}?w=600&h=450&fit=crop`} alt="" />
        ) : sample ? (
          <div className="product-sig band" title={t.products.treats}><Signature sample={sample} /></div>
        ) : null}
      </div>
      {product.audience && <span className="chip">{t.audience[product.audience]}</span>}
      <h3>{pick(product.name, locale)}</h3>
      {product.summary && <p className="muted small">{pick(product.summary, locale)}</p>}
      {product.specs?.length ? (
        <dl className="spec">
          {product.specs.map((s, i) => (
            <div key={i}>
              <dt>{pick(s.label, locale)}</dt>
              <dd className="mono ltr">{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {showPrice && product.priceEGP ? (
        <div className="price">
          <b className="mono ltr">EGP {product.priceEGP.toLocaleString('en-US')}</b>
        </div>
      ) : null}
    </div>
  )
}
