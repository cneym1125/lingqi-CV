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
      <div className="space-y-10">
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
              className="grid grid-cols-1 overflow-visible rounded-3xl border border-white/[0.06] bg-[#141416] shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]-lg md:grid-cols-2"
            >
              {/* 左侧：3D 轮播（正方形） */}
              {slides.length > 0 && (
                <div className="relative flex items-center justify-center overflow-visible p-6 md:p-8">
                  <div className="aspect-square w-3/4">
                    <Carousel slides={slides} className="h-full" />
                  </div>
                </div>
              )}

              {/* 右侧：文字内容 */}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-neutral-100 md:text-2xl">
                    {p.name}
                  </h3>
                  <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">
                    {p.period}
                  </span>
                </div>
                <div className="mt-1 text-sm text-neutral-400">{p.role}</div>

                <p className="mt-4 leading-relaxed text-neutral-300">
                  <RichText paragraph={p.description} />
                </p>

                <ul className="mt-3 space-y-2">
                  {p.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-neutral-300"
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
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-neutral-400"
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
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-brand-blue hover:text-brand-blue"
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
          )
        })}
      </div>
    </Section>
  )
}
