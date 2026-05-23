import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Section } from './Section'
import { projects } from '../data/resume'
import { RichText } from './RichText'
import { MediaGallery } from './MediaGallery'
import { ProofList } from './ProofList'
import { Carousel } from './Carousel'

export function ProjectsSection() {
  return (
    <Section id="projects" title="项目经历">
      <div className="space-y-6">
        {projects.map((p, i) => {
          const slides =
            p.gallery && p.gallery.length > 0
              ? p.gallery
              : p.cover
                ? [{ src: p.cover, caption: p.name }]
                : []

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 overflow-visible rounded-3xl border border-ink-100 bg-white shadow-soft transition hover:shadow-soft-lg md:grid-cols-2"
            >
              {/* 右侧（桌面）/ 上方（手机）：文字内容 */}
              <div className="flex flex-col justify-center p-6 md:order-2 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">
                    {p.name}
                  </h3>
                  <span className="rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-medium text-brand-blue">
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
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-purple" />
                      <span>
                        <RichText paragraph={h} />
                      </span>
                    </li>
                  ))}
                </ul>

                {p.tags && p.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {p.links && p.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:border-brand-blue hover:text-brand-blue"
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

              {/* 左侧（桌面）/ 下方（手机）：轮播图 */}
              {slides.length > 0 && (
                <div className="relative flex items-center justify-center overflow-visible p-6 md:order-1 md:p-8">
                  <div className="aspect-square w-full">
                    <Carousel slides={slides} className="h-full" />
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
