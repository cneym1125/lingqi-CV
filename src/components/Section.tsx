import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  id: string
  /** @deprecated 已不渲染,保留以兼容现有调用 */
  eyebrow?: string
  title: string
  /** @deprecated 已不渲染,保留以兼容现有调用 */
  description?: string
  children: ReactNode
}

export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-3xl font-semibold text-ink-900 md:text-4xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
