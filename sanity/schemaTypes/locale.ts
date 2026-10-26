import { defineType } from 'sanity'

const languages = [
  { id: 'en', title: 'English' },
  { id: 'ar', title: 'العربية' },
]

export const localeString = defineType({
  name: 'localeString',
  title: 'Text (EN / AR)',
  type: 'object',
  fields: languages.map((l) => ({ name: l.id, title: l.title, type: 'string' })),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph (EN / AR)',
  type: 'object',
  fields: languages.map((l) => ({ name: l.id, title: l.title, type: 'text', rows: 3 })),
})

export const localeBody = defineType({
  name: 'localeBody',
  title: 'Body (EN / AR)',
  type: 'object',
  fields: languages.map((l) => ({
    name: l.id,
    title: l.title,
    type: 'array',
    of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
      { type: 'youtube' },
    ],
  })),
})

export const youtube = defineType({
  name: 'youtube',
  title: 'YouTube video',
  type: 'object',
  fields: [{ name: 'url', type: 'url', title: 'YouTube link' }],
  preview: { select: { title: 'url' } },
})
