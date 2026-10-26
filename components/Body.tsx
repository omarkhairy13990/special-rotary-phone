import { PortableText, type PortableTextComponents } from 'next-sanity'
import { youtubeId } from '@/lib/content'
import { urlFor } from '@/sanity/image'

const components: PortableTextComponents = {
  types: {
    youtube: ({ value }: { value: { url?: string } }) => {
      const id = youtubeId(value.url)
      return id ? <VideoEmbed id={id} /> : null
    },
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) =>
      value.asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={urlFor(value).width(1200).fit('max').url()} alt={value.alt || ''} loading="lazy" />
      ) : null,
  },
}

export function VideoEmbed({ id, title = 'Video' }: { id: string; title?: string }) {
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export function Body({ value }: { value?: Record<string, unknown>[] }) {
  if (!value?.length) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div className="prose"><PortableText value={value as any} components={components} /></div>
}
