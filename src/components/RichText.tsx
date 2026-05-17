import type { LinkText, RichParagraph } from '../data/resume'

export function RichText({ paragraph }: { paragraph: RichParagraph }) {
  return (
    <>
      {paragraph.map((seg, i) => <Segment key={i} seg={seg} />)}
    </>
  )
}

function Segment({ seg }: { seg: LinkText }) {
  if (seg.type === 'link') {
    return (
      <a
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="prose-link"
      >
        {seg.content}
      </a>
    )
  }
  return <span>{seg.content}</span>
}
