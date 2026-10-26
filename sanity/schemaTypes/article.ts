import { defineField, defineType } from 'sanity'
import { audienceField, categoryField, sampleField } from './shared'

export const article = defineType({
  name: 'article',
  title: 'Article / مقال',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Link', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Publish date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField(categoryField),
    defineField(audienceField),
    defineField({ name: 'excerpt', title: 'Summary', type: 'localeText' }),
    defineField({ name: 'cover', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'readMinutes', title: 'Reading time (minutes)', type: 'number', initialValue: 5 }),
    defineField({ name: 'body', title: 'Body', type: 'localeBody' }),
    defineField(sampleField),
  ],
  orderings: [{ title: 'Newest', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'title.ar', media: 'cover' } },
})
