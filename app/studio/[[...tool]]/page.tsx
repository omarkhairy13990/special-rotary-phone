import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

/** The content dashboard: write articles, add videos and products in English and Arabic. */
export default function StudioPage() {
  return <NextStudio config={config} />
}
