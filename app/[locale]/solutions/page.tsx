import type { Metadata } from 'next'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

const groups = {
  en: {
    industry: ['Food & beverage', 'Pharma', 'Hospitality', 'Agriculture', 'Municipal', 'Oil & gas'],
    need: ['Desalination', 'Wastewater & reuse', 'Softening', 'Disinfection', 'Zero liquid discharge'],
    services: ['Site survey & water analysis', 'Design & build', 'Operation & maintenance contracts', 'Retrofit of existing plants'],
  },
  ar: {
    industry: ['الأغذية والمشروبات', 'الأدوية', 'الفنادق', 'الزراعة', 'البلديات', 'النفط والغاز'],
    need: ['التحلية', 'معالجة الصرف وإعادة الاستخدام', 'إزالة العسر', 'التطهير', 'التصريف الصفري للسوائل'],
    services: ['معاينة الموقع وتحليل المياه', 'التصميم والتنفيذ', 'عقود التشغيل والصيانة', 'تطوير المحطات القائمة'],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: getDictionary(isLocale(locale) ? locale : 'en').solutions.title }
}

export default async function Solutions({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : 'en') as Locale
  const t = getDictionary(locale)
  const g = groups[locale]
  const cols: [string, string[]][] = [[t.solutions.byIndustry, g.industry], [t.solutions.byNeed, g.need], [t.solutions.services, g.services]]
  return (
    <div className="wrap page">
      <header className="page-head">
        <span className="eyebrow ltr">/solutions</span>
        <h1>{t.solutions.title}</h1>
        <p className="lead muted">{t.solutions.lead}</p>
      </header>
      <div className="solution-cols">
        {cols.map(([title, items]) => (
          <div key={title} className="solution-col">
            <h2>{title}</h2>
            <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}
