import { sampleEntries, sampleProducts } from '@/content/sample'
import { client } from '@/sanity/client'
import { sanityConfigured } from '@/sanity/env'
import { entryQuery, entrySlugsQuery, latestQuery, productsQuery } from '@/sanity/queries'
import type { Localized } from './i18n'
import type { WaterSample } from './signature'

// Body arrays are Sanity Portable Text; typed loosely because the renderer validates them.
type Blocks = Record<string, unknown>[]

export type Entry = {
  _id: string
  _type: 'article' | 'video'
  slug: string
  title: Localized
  excerpt?: Localized
  publishedAt: string
  category?: string
  audience?: string
  readMinutes?: number
  duration?: string
  youtubeUrl?: string
  cover?: string
  sample?: Partial<WaterSample>
  body?: Localized<Blocks>
  notes?: Localized<Blocks>
}

export type Product = {
  _id: string
  slug: string
  name: Localized
  category?: string
  audience?: string
  summary?: Localized
  specs?: { label: Localized; value: string }[]
  priceEGP?: number
  inStore?: boolean
  image?: string
  sample?: Partial<WaterSample>
}

// Published entries refresh within an hour, or immediately through the /api/revalidate webhook.
const revalidate = 3600

export async function getLatest(limit = 12): Promise<Entry[]> {
  if (!sanityConfigured) return [...sampleEntries].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit)
  return client.fetch(latestQuery, { limit }, { next: { revalidate } })
}

export async function getEntry(slug: string): Promise<Entry | null> {
  if (!sanityConfigured) return sampleEntries.find((e) => e.slug === slug) ?? null
  return client.fetch(entryQuery, { slug }, { next: { revalidate } })
}

export async function getEntrySlugs(): Promise<string[]> {
  if (!sanityConfigured) return sampleEntries.map((e) => e.slug)
  return client.fetch(entrySlugsQuery, {}, { next: { revalidate } })
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityConfigured) return sampleProducts
  return client.fetch(productsQuery, {}, { next: { revalidate } })
}

/** Fills missing analysis values so a partial sample still draws a signature. */
export function completeSample(s?: Partial<WaterSample>): WaterSample | null {
  if (!s || s.tds == null) return null
  return { tds: s.tds, ntu: s.ntu ?? 1, hard: s.hard ?? 150, ph: s.ph ?? 7.2 }
}

export function youtubeId(url?: string) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : null
}
