import { motion } from 'framer-motion'
import { Section } from './Section'
import { experiences } from '../data/resume'
import { RichText } from './RichText'
import { ProofList } from './ProofList'
import { Tag } from './Tag'
import { InfoBadge } from './InfoBadge'
import { Carousel } from './Carousel'

export function ExperienceSection() {
  return (
    <Section id="experience" title="实习经历">
      <div className="space-y-6">
        {experiences.map((e, i) => {
          const slides = e.gallery && e.gallery.length > 0 ? e.gallery : []

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition hover:shadow-soft-lg md:grid-cols-2"
            >
              {/* 右侧（桌面）/ 上方（手机）：文字内容 */}
              <div className="flex flex-col justify-center p-6 md:order-2 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">
                    {e.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {e.product && (
                      <InfoBadge
                        name={e.product.name}
                        description={e.product.description}
                        href={e.product.href}
                        logo={e.product.logo}
                      />
                    )}
                    <span className="rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-medium text-brand-blue">
                      {e.period}
                    </span>
                  </div>
                </div>
                <div className="mt-1 text-sm text-ink-500">
                  {e.company}
                  {e.location && (
                    <span className="ml-2 text-ink-300">· {e.location}</span>
                  )}
                </div>

                <p className="mt-4 leading-relaxed text-ink-700">
                  <RichText paragraph={e.summary} />
                </p>

                <ul className="mt-3 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-ink-700"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-blue" />
                      <span>
                        <RichText paragraph={b} />
                      </span>
                    </li>
                  ))}
                </ul>

                {e.tags && e.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}

                <ProofList proofs={e.proofs} />
              </div>

              {/* 左侧（桌面）/ 下方（手机）：轮播图 */}
              {slides.length > 0 && (
                <div className="overflow-hidden rounded-b-3xl md:order-1 md:rounded-l-3xl md:rounded-br-none">
                  <Carousel slides={slides} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
