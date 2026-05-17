import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, Copy, Check, X, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/resume'

interface Props {
  open: boolean
  onClose: () => void
}

interface ContactRow {
  key: string
  icon: typeof Mail
  label: string
  value?: string
  href?: string
  hint?: string
  accent: string
}

/** 全局打开联系卡片 — 任意位置调用此函数即可弹出 */
export function openContactCard() {
  window.dispatchEvent(new CustomEvent('open-contact-card'))
}

/** 监听全局事件并自动控制开关的容器组件 */
export function ContactCardHost() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-contact-card', onOpen as EventListener)
    return () =>
      window.removeEventListener('open-contact-card', onOpen as EventListener)
  }, [])
  return <ContactCard open={open} onClose={() => setOpen(false)} />
}

export function ContactCard({ open, onClose }: Props) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // ESC 关闭 + 锁滚动
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const rows: ContactRow[] = [
    {
      key: 'wechat',
      icon: MessageCircle,
      label: '微信',
      value: profile.wechat,
      hint: '加好友请备注来意',
      accent: 'from-emerald-400 to-emerald-600',
    },
    {
      key: 'phone',
      icon: Phone,
      label: '手机',
      value: profile.phone,
      href: profile.phone ? `tel:${profile.phone}` : undefined,
      hint: '工作时间 9:00 - 22:00',
      accent: 'from-sky-400 to-sky-600',
    },
    {
      key: 'email',
      icon: Mail,
      label: '邮箱',
      value: profile.email,
      href: `mailto:${profile.email}`,
      hint: '24 小时内必回',
      accent: 'from-violet-400 to-violet-600',
    },
  ].filter((r) => !!r.value) as ContactRow[]

  const copy = async (key: string, text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* 顶部装饰条 */}
            <div className="relative h-16 overflow-hidden bg-gradient-to-br from-brand-blue via-[#5B7CFF] to-brand-purple">
              <div className="aurora opacity-40" />
              <button
                type="button"
                onClick={onClose}
                aria-label="关闭"
                className="absolute right-3 top-3 rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 头像 + 姓名 */}
            <div className="-mt-12 flex flex-col items-center px-6">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-br from-brand-blue to-brand-purple opacity-25 blur-md" />
                <div className="relative h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-soft-lg">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-xl font-semibold text-ink-900">
                  {profile.name}
                </div>
                <div className="mt-1 text-sm text-ink-500">{profile.title}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-xs text-ink-300">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </div>
              </div>
            </div>

            {/* 联系方式列表 */}
            <div className="px-5 pb-5 pt-5">
              <div className="space-y-2.5">
                {rows.map((r) => {
                  const Icon = r.icon
                  const copied = copiedKey === r.key
                  return (
                    <div
                      key={r.key}
                      className="group flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/40 p-3 transition hover:border-brand-blue/30 hover:bg-white"
                    >
                      <div
                        className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${r.accent} text-white shadow-soft`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-ink-500">
                          <span>{r.label}</span>
                          {r.hint && (
                            <span className="hidden text-ink-300 sm:inline">
                              · {r.hint}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 truncate font-mono text-sm font-medium text-ink-900">
                          {r.value}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(r.key, r.value!)}
                        className={`relative flex h-9 items-center gap-1 rounded-full px-3 text-xs font-medium transition ${
                          copied
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-white text-ink-700 hover:bg-brand-blue hover:text-white'
                        }`}
                        aria-label={`复制${r.label}`}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="inline-flex items-center gap-1"
                            >
                              <Check className="h-3.5 w-3.5" />
                              已复制
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="inline-flex items-center gap-1"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              复制
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  )
                })}
              </div>

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-blue-hover hover:shadow-soft-lg"
                >
                  <Mail className="h-4 w-4" />
                  打开邮箱客户端发送邮件
                </a>
              )}

              <p className="mt-3 text-center text-xs text-ink-300">
                按 Esc 关闭 · 点击任意复制按钮即可复制到剪贴板
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
