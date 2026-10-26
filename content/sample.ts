import type { Entry, Product } from '@/lib/content'

/**
 * Sample content shown until a Sanity project is connected.
 * Replace it by publishing real entries in /studio; nothing here is read once Sanity is configured.
 */
let key = 0
const p = (text: string) => ({ _type: 'block', _key: `b${key++}`, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's', text, marks: [] }] })
const h = (text: string) => ({ ...p(text), style: 'h2' })

export const sampleEntries: Entry[] = [
  {
    _id: 'sample-tds',
    _type: 'article',
    slug: 'what-tds-means',
    title: { en: 'What TDS on your water report actually means', ar: 'ماذا يعني رقم TDS في تقرير تحليل مياهك' },
    excerpt: {
      en: 'Total dissolved solids in plain words, the WHO taste ranges, and when a home RO system is worth it.',
      ar: 'الأملاح الذائبة الكلية بكلمات بسيطة، ونطاقات منظمة الصحة العالمية، ومتى يستحق نظام التناضح المنزلي.',
    },
    publishedAt: '2026-10-20T08:00:00Z',
    category: 'guide',
    audience: 'home',
    readMinutes: 5,
    sample: { tds: 1150, ntu: 1, hard: 320, ph: 7.6 },
    body: {
      en: [
        p('TDS (total dissolved solids) is the weight of everything dissolved in a litre of water: mostly salts such as calcium, magnesium, sodium, chloride and sulphate. It is reported in ppm, which is the same as mg/L.'),
        h('The ranges that matter'),
        p('The WHO rates water under 300 ppm as excellent to drink, 300 to 600 as good, 600 to 900 as fair, and 900 to 1,200 as poor. Above 1,200 ppm most people find the taste unacceptable.'),
        p('High TDS is usually a taste and scaling problem rather than a health emergency, but it can hide specific contaminants. A full analysis tells you which.'),
      ],
      ar: [
        p('رقم TDS (الأملاح الذائبة الكلية) هو وزن كل ما هو ذائب في لتر الماء، وأغلبه أملاح مثل الكالسيوم والمغنيسيوم والصوديوم والكلوريد والكبريتات. يُقاس بوحدة ppm، وهي نفسها ملليجرام لكل لتر.'),
        h('النطاقات المهمة'),
        p('تصنف منظمة الصحة العالمية الماء الأقل من ٣٠٠ ppm بأنه ممتاز للشرب، ومن ٣٠٠ إلى ٦٠٠ جيد، ومن ٦٠٠ إلى ٩٠٠ مقبول، ومن ٩٠٠ إلى ١٢٠٠ ضعيف. وفوق ١٢٠٠ يجد أغلب الناس الطعم غير مقبول.'),
        p('ارتفاع TDS غالباً مشكلة طعم وترسبات أكثر منه خطراً صحياً، لكنه قد يخفي ملوثات معينة. التحليل الكامل يوضح ذلك.'),
      ],
    },
  },
  {
    _id: 'sample-recovery',
    _type: 'article',
    slug: 'ro-recovery-rate',
    title: { en: 'RO recovery rate: why 75% is not always better than 60%', ar: 'نسبة الاسترداد في التناضح العكسي: لماذا ليست ٧٥٪ أفضل دائماً من ٦٠٪' },
    excerpt: {
      en: 'Higher recovery saves feed water but raises scaling risk. How to choose for brackish wells.',
      ar: 'الاسترداد الأعلى يوفر ماء التغذية لكنه يرفع خطر الترسيب. كيف تختار لآبار المياه المسوسة.',
    },
    publishedAt: '2026-10-13T08:00:00Z',
    category: 'engineering',
    audience: 'business',
    readMinutes: 8,
    sample: { tds: 2350, ntu: 3, hard: 420, ph: 7.3 },
    body: {
      en: [p('Recovery is permeate flow divided by feed flow. At 75% recovery the concentrate is four times as salty as the feed, which pushes calcium carbonate and calcium sulphate toward saturation on the last membranes.')],
      ar: [p('الاسترداد هو تدفق الماء المنتج مقسوماً على تدفق ماء التغذية. عند ٧٥٪ يصبح الماء المرفوض أكثر ملوحة بأربع مرات من ماء التغذية، مما يقرّب كربونات وكبريتات الكالسيوم من التشبع على الأغشية الأخيرة.')],
    },
  },
  {
    _id: 'sample-cartridge-video',
    _type: 'video',
    slug: 'change-sediment-cartridge',
    title: { en: 'How to change a sediment cartridge in 4 minutes', ar: 'كيف تغيّر شمعة الرواسب في ٤ دقائق' },
    excerpt: { en: 'Tools, steps and the one mistake that causes leaks.', ar: 'الأدوات والخطوات، والخطأ الوحيد الذي يسبب التسريب.' },
    publishedAt: '2026-10-16T08:00:00Z',
    category: 'guide',
    audience: 'home',
    duration: '4:10',
  },
  {
    _id: 'sample-hotel',
    _type: 'article',
    slug: 'hotel-ro-plant-red-sea',
    title: { en: 'Case study: a 500 m³/day seawater plant for a Red Sea hotel', ar: 'دراسة حالة: محطة تحلية ٥٠٠ م³/يوم لفندق على البحر الأحمر' },
    excerpt: { en: 'Feed at 41,000 ppm, product under 300 ppm, and what we changed after the first summer.', ar: 'ماء تغذية ٤١٠٠٠ ppm، ومنتج أقل من ٣٠٠ ppm، وما غيّرناه بعد أول صيف.' },
    publishedAt: '2026-10-06T08:00:00Z',
    category: 'case-study',
    audience: 'business',
    readMinutes: 6,
    sample: { tds: 41000, ntu: 2, hard: 6600, ph: 8.2 },
    body: { en: [p('Sample case study. Replace with a real project from the Studio.')], ar: [p('دراسة حالة تجريبية. استبدلها بمشروع حقيقي من لوحة التحكم.')] },
  },
]

export const sampleProducts: Product[] = [
  {
    _id: 'sample-ro5',
    slug: 'home-ro-5-stage',
    name: { en: '5-stage home RO system', ar: 'نظام تناضح عكسي منزلي ٥ مراحل' },
    category: 'home-systems',
    audience: 'home',
    summary: { en: 'Under-sink system for well or tap water up to 2,000 ppm.', ar: 'نظام تحت الحوض لمياه الآبار أو الصنبور حتى ٢٠٠٠ ppm.' },
    specs: [
      { label: { en: 'Output', ar: 'الإنتاج' }, value: '400 GPD' },
      { label: { en: 'Rejection', ar: 'نسبة الإزالة' }, value: '96–99%' },
      { label: { en: 'Max feed TDS', ar: 'أقصى TDS' }, value: '2,000 ppm' },
    ],
    priceEGP: 4850,
    inStore: true,
    sample: { tds: 1150, ntu: 1, hard: 320, ph: 7.6 },
  },
  {
    _id: 'sample-sediment',
    slug: 'sediment-cartridge-5um',
    name: { en: 'Sediment cartridge 5 µm, 10"', ar: 'شمعة رواسب ٥ ميكرون، ١٠ بوصة' },
    category: 'cartridges',
    audience: 'home',
    summary: { en: 'First stage for most home systems. Replace every 3 to 6 months.', ar: 'المرحلة الأولى لمعظم الأنظمة المنزلية. تُغير كل ٣ إلى ٦ أشهر.' },
    specs: [
      { label: { en: 'Rating', ar: 'درجة الترشيح' }, value: '5 µm' },
      { label: { en: 'Size', ar: 'المقاس' }, value: '10" × 2.5"' },
    ],
    priceEGP: 120,
    inStore: true,
    sample: { tds: 220, ntu: 18, hard: 140, ph: 8.0 },
  },
  {
    _id: 'sample-8040',
    slug: 'bw-membrane-8040',
    name: { en: 'Brackish water membrane 8040', ar: 'غشاء مياه مسوسة 8040' },
    category: 'membranes',
    audience: 'business',
    summary: { en: 'Industrial element for well water up to 10,000 ppm.', ar: 'غشاء صناعي لمياه الآبار حتى ١٠٠٠٠ ppm.' },
    specs: [
      { label: { en: 'Permeate flow', ar: 'تدفق المنتج' }, value: '42 m³/day' },
      { label: { en: 'Salt rejection', ar: 'إزالة الأملاح' }, value: '99.5%' },
      { label: { en: 'Active area', ar: 'المساحة الفعالة' }, value: '400 ft²' },
    ],
    inStore: false,
    sample: { tds: 2350, ntu: 3, hard: 420, ph: 7.3 },
  },
]
