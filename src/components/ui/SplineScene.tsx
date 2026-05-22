import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /** 超时时间(ms),超时后隐藏 loading 显示 fallback 背景 */
  timeout?: number
}

export function SplineScene({ scene, className, timeout = 12000 }: SplineSceneProps) {
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  // 延迟 300ms 再开始加载,确保页面主内容先渲染
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(t)
  }, [])

  // 超时机制
  useEffect(() => {
    if (loaded) return
    const t = setTimeout(() => setTimedOut(true), timeout)
    return () => clearTimeout(t)
  }, [loaded, timeout])

  // 超时或不显示时,渲染一个静态渐变背景
  if (timedOut && !loaded) {
    return (
      <div className="h-full w-full rounded-2xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/10 to-transparent" />
    )
  }

  if (!show) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        </div>
      }
    >
      <div
        className={`h-full w-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </Suspense>
  )
}
