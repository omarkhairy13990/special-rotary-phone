export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2025-06-01'
/** True once a Sanity project is connected; until then the site shows the sample content in /content. */
export const sanityConfigured = Boolean(projectId)
