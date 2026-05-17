import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  id: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, description, children }: Props) {
  return (
    <section id={id} className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-medium text-brand-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl font-semibold text-ink-900 md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-base text-ink-500 md:text-lg">
              {description}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
