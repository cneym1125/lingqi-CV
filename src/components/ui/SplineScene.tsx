import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // 浏览器空闲时才加载 Spline，让首屏先渲染完成
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const trigger = () => setShouldLoad(true)

    // 优先用 requestIdleCallback，浏览器真正空闲时才加载
    let idleId: number | undefined
    let timeoutId: number | undefined

    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(trigger, { timeout: 3000 })
    } else {
      // 不支持 idle 的降级：1.5 秒后加载
      timeoutId = window.setTimeout(trigger, 1500)
    }

    return () => {
      if (idleId !== undefined) (window as any).cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div ref={wrapRef} className={className} style={{ minHeight: '200px' }}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <Spline scene={scene} className="h-full w-full" />
        </Suspense>
      )}
    </div>
  )
}
