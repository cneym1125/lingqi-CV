import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Section } from './Section'
import { projects } from '../data/resume'
import { RichText } from './RichText'
import { MediaGallery } from './MediaGallery'
import { ProofList } from './ProofList'
import { Tag } from './Tag'

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="PROJECTS"
      title="代表作品"
      description="把抽象能力变成可点击、可观看的具体证据。"
    >
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-feishu transition hover:shadow-feishu-lg md:grid-cols-[1.1fr_1fr]"
          >
            {p.cover && (
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-50 md:aspect-auto">
                <motion.img
                  src={p.cover}
                  alt={p.name}
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {p.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/85 px-2 py-0.5 text-xs font-medium text-ink-700 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">
                  {p.name}
                </h3>
                <span className="rounded-full bg-feishu-blue-soft px-3 py-1 text-xs font-medium text-feishu-blue">
                  {p.period}
                </span>
              </div>
              <div className="mt-1 text-sm text-ink-500">{p.role}</div>
              <p className="mt-4 leading-relaxed text-ink-700">
                <RichText paragraph={p.description} />
              </p>
              <ul className="mt-3 space-y-2">
                {p.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700"
                  >
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-feishu-purple" />
                    <span>
                      <RichText paragraph={h} />
                    </span>
                  </li>
                ))}
              </ul>

              {p.links && p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:border-feishu-blue hover:text-feishu-blue"
                    >
                      {l.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}

              {p.media && p.media.length > 0 && (
                <div className="mt-6">
                  <MediaGallery items={p.media} />
                </div>
              )}

              <ProofList proofs={p.proofs} />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
