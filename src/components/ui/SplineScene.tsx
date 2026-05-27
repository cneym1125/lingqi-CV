import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const trigger = () => setShouldLoad(true)
    let idleId: number | undefined
    let timeoutId: number | undefined

    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(trigger, { timeout: 3000 })
    } else {
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
