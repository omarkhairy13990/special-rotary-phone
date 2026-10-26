export const categoryField = {
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Guide / دليل', value: 'guide' },
      { title: 'Engineering note / ملاحظة هندسية', value: 'engineering' },
      { title: 'Case study / دراسة حالة', value: 'case-study' },
      { title: 'News / أخبار', value: 'news' },
    ],
    layout: 'radio',
  },
  initialValue: 'guide',
}

export const audienceField = {
  name: 'audience',
  title: 'Audience',
  type: 'string',
  options: {
    list: [
      { title: 'Business / شركات', value: 'business' },
      { title: 'Home / منازل', value: 'home' },
      { title: 'Both / الاثنان', value: 'both' },
    ],
    layout: 'radio',
  },
  initialValue: 'both',
}

/** Optional water analysis; the site draws a water signature from it. */
export const sampleField = {
  name: 'sample',
  title: 'Water signature (optional)',
  description: 'Analysis values used to draw the signature on cards and covers.',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    { name: 'tds', title: 'TDS (ppm)', type: 'number' },
    { name: 'ntu', title: 'Turbidity (NTU)', type: 'number' },
    { name: 'hard', title: 'Hardness (mg/L as CaCO3)', type: 'number' },
    { name: 'ph', title: 'pH', type: 'number' },
  ],
}
