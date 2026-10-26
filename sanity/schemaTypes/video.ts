import { defineField, defineType } from 'sanity'
import { audienceField, categoryField } from './shared'

export const video = defineType({
  name: 'video',
  title: 'Video / فيديو',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Link', type: 'slug', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({ name: 'youtubeUrl', title: 'YouTube link', type: 'url', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Publish date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'duration', title: 'Duration (e.g. 6:40)', type: 'string' }),
    defineField(categoryField),
    defineField(audienceField),
    defineField({ name: 'excerpt', title: 'Description', type: 'localeText' }),
    defineField({ name: 'notes', title: 'Notes under the video', type: 'localeBody' }),
  ],
  orderings: [{ title: 'Newest', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'youtubeUrl' } },
})
