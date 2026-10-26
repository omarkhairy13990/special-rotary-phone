export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr')

/** A value stored in both languages, as Sanity's localeString/localeText objects hold it. */
export type Localized<T = string> = { en?: T; ar?: T }

/** Picks the requested language and falls back to the other one, so a missing translation never shows an empty slot. */
export function pick<T>(value: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined
  return value[locale] ?? value[locale === 'en' ? 'ar' : 'en']
}

const dictionaries = {
  en: {
    nav: { solutions: 'Solutions', products: 'Products', lab: 'Lab', learn: 'Learn', store: 'Store' },
    switchTo: 'عربي',
    tagline: 'Clear water, engineered.',
    home: {
      eyebrow: 'Water treatment & environmental systems',
      title: 'Every water has a signature.',
      lead: 'We test your water, design the system, build it and keep it running. Read your water in four numbers and get a plain answer.',
      ctaPrimary: 'Read my water',
      ctaSecondary: 'Request a quote',
      business: 'For business',
      businessText: 'Plants for factories, hotels, farms and municipalities: design, build and O&M contracts.',
      homeDoor: 'For home',
      homeText: 'Home filters, replacement cartridges and installation, matched to your water.',
      latest: 'Latest from Learn',
      allArticles: 'All articles and videos',
      sections: 'Explore MASAM',
    },
    sectionText: {
      solutions: 'Design, build and maintenance by industry and by need',
      products: 'Technical catalogue with full specifications',
      lab: 'Water signature and engineering calculators',
      learn: 'Weekly guides, engineering notes and videos',
      store: 'Cartridges, systems and spare parts',
    },
    learn: {
      title: 'Learn',
      lead: 'New guides, engineering notes and explainer videos every week.',
      all: 'All',
      articles: 'Articles',
      videos: 'Videos',
      min: 'min read',
      watch: 'Watch',
      back: 'Back to Learn',
    },
    categories: { guide: 'Guide', engineering: 'Engineering note', 'case-study': 'Case study', news: 'News' } as Record<string, string>,
    audience: { business: 'Business', home: 'Home', both: 'Business & home' } as Record<string, string>,
    products: { title: 'Products', lead: 'Every product shows the water it is built to treat.', treats: 'Built for this water' },
    store: { title: 'Store', lead: 'Online checkout opens soon. Until then, order on WhatsApp or request a quote.', order: 'Order', price: 'Price' },
    solutions: { title: 'Solutions', lead: 'Start from your industry or from the problem in your water.', byIndustry: 'By industry', byNeed: 'By need', services: 'Services' },
    lab: { title: 'Lab', lead: 'Free tools for engineers and homeowners. Results are estimates; our engineers confirm them on site.' },
    footer: { rights: 'MASAM. All rights reserved.' },
  },
  ar: {
    nav: { solutions: 'الحلول', products: 'المنتجات', lab: 'المختبر', learn: 'تعلّم', store: 'المتجر' },
    switchTo: 'English',
    tagline: 'هندسة الماء بوضوح.',
    home: {
      eyebrow: 'معالجة المياه والأنظمة البيئية',
      title: 'لكل ماءٍ بصمة.',
      lead: 'نحلل مياهك، ونصمم النظام، وننفذه، ونحافظ على تشغيله. اقرأ مياهك من أربعة أرقام واحصل على إجابة واضحة.',
      ctaPrimary: 'اقرأ مياهي',
      ctaSecondary: 'اطلب عرض سعر',
      business: 'للشركات',
      businessText: 'محطات للمصانع والفنادق والمزارع والبلديات: تصميم وتنفيذ وعقود تشغيل وصيانة.',
      homeDoor: 'للمنازل',
      homeText: 'فلاتر منزلية وشمعات استبدال وتركيب، مناسبة لمياهك.',
      latest: 'أحدث ما في تعلّم',
      allArticles: 'كل المقالات والفيديوهات',
      sections: 'تصفح مسام',
    },
    sectionText: {
      solutions: 'تصميم وتنفيذ وصيانة حسب القطاع والحاجة',
      products: 'كتالوج فني بالمواصفات الكاملة',
      lab: 'بصمة الماء والحاسبات الهندسية',
      learn: 'أدلة وملاحظات هندسية وفيديوهات كل أسبوع',
      store: 'شمعات وأنظمة وقطع غيار',
    },
    learn: {
      title: 'تعلّم',
      lead: 'أدلة جديدة وملاحظات هندسية وفيديوهات توضيحية كل أسبوع.',
      all: 'الكل',
      articles: 'مقالات',
      videos: 'فيديوهات',
      min: 'دقائق قراءة',
      watch: 'شاهد',
      back: 'العودة إلى تعلّم',
    },
    categories: { guide: 'دليل', engineering: 'ملاحظة هندسية', 'case-study': 'دراسة حالة', news: 'أخبار' } as Record<string, string>,
    audience: { business: 'شركات', home: 'منازل', both: 'شركات ومنازل' } as Record<string, string>,
    products: { title: 'المنتجات', lead: 'كل منتج يعرض بصمة الماء الذي صُمم لمعالجته.', treats: 'مصمم لهذا الماء' },
    store: { title: 'المتجر', lead: 'الدفع الإلكتروني قريباً. حتى ذلك الحين اطلب عبر واتساب أو اطلب عرض سعر.', order: 'اطلب', price: 'السعر' },
    solutions: { title: 'الحلول', lead: 'ابدأ من قطاعك أو من المشكلة في مياهك.', byIndustry: 'حسب القطاع', byNeed: 'حسب الحاجة', services: 'الخدمات' },
    lab: { title: 'المختبر', lead: 'أدوات مجانية للمهندسين وأصحاب المنازل. النتائج تقديرية، ويؤكدها مهندسونا في الموقع.' },
    footer: { rights: 'مسام. جميع الحقوق محفوظة.' },
  },
}

export type Dictionary = (typeof dictionaries)['en']
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
