import type { LinkText, RichParagraph } from '../data/resume'

export function RichText({ paragraph }: { paragraph: RichParagraph }) {
  return (
    <>
      {paragraph.map((seg, i) => <Segment key={i} seg={seg} isFirst={i === 0} />)}
    </>
  )
}

function Segment({ seg, isFirst }: { seg: LinkText; isFirst: boolean }) {
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

  // 第一段文字，如果包含「:」或「：」，把冒号前的部分加粗
  if (isFirst && seg.type === 'text') {
    const colonIdx = seg.content.search(/[:：]/)
    if (colonIdx > 0 && colonIdx < 12) {
      const label = seg.content.slice(0, colonIdx + 1)
      const rest = seg.content.slice(colonIdx + 1)
      return (
        <span>
          <span className="font-semibold text-ink-900">{label}</span>
          {rest}
        </span>
      )
    }
  }

  return <span>{seg.content}</span>
}
