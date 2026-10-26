import { defineField, defineType } from 'sanity'
import { audienceField, sampleField } from './shared'

export const product = defineType({
  name: 'product',
  title: 'Product / منتج',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Link', type: 'slug', options: { source: 'name.en' }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['membranes', 'cartridges', 'dosing', 'pumps', 'sensors', 'home-systems'] },
    }),
    defineField(audienceField),
    defineField({ name: 'summary', title: 'Summary', type: 'localeText' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'localeString' }, { name: 'value', type: 'string' }], preview: { select: { title: 'label.en', subtitle: 'value' } } }],
    }),
    defineField({ name: 'priceEGP', title: 'Price (EGP)', type: 'number' }),
    defineField({ name: 'inStore', title: 'Show in store', type: 'boolean', initialValue: true }),
    defineField({ name: 'shopifyHandle', title: 'Shopify product handle (later)', type: 'string' }),
    defineField(sampleField),
  ],
  preview: { select: { title: 'name.en', subtitle: 'name.ar', media: 'image' } },
})
