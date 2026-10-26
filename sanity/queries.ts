import { groq } from 'next-sanity'

const listFields = `_id, _type, title, "slug": slug.current, publishedAt, category, audience, excerpt, readMinutes, duration, youtubeUrl, sample, "cover": cover.asset->url`

export const latestQuery = groq`*[_type in ["article","video"] && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...$limit]{${listFields}}`
export const entryQuery = groq`*[_type in ["article","video"] && slug.current == $slug][0]{${listFields}, body, notes}`
export const entrySlugsQuery = groq`*[_type in ["article","video"] && defined(slug.current)].slug.current`
export const productsQuery = groq`*[_type == "product"] | order(name.en asc){_id, name, "slug": slug.current, category, audience, summary, specs, priceEGP, inStore, sample, "image": image.asset->url}`
