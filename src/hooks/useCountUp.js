import { useEffect, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function useCountUp(target, duration = 2000, shouldStart = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    if (!shouldStart) {
      setValue(0)
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setValue(target)
      return undefined
    }

    let frameId = 0
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1)
      const eased = easeOutCubic(elapsed)
      setValue(Math.round(target * eased))

      if (elapsed < 1) frameId = window.requestAnimationFrame(step)
    }

    frameId = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(frameId)
  }, [target, duration, shouldStart])

  return value
}
