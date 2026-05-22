export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-neutral-400">
      {children}
    </span>
  )
}
