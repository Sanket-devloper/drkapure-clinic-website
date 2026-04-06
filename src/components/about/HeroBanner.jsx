import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useCountUp from '../../hooks/useCountUp'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './AboutSections.module.css'

const stats = [
  { target: 2345, suffix: '+', label: 'Happy Clients' },
  { target: 6, suffix: '+', label: 'Years of Clinical Focus' },
  { target: 30, suffix: '+', label: 'Specialized Treatments' },
  { target: 50, suffix: '/5', label: 'Rating on Google', divisor: 10, href: 'https://google.com/maps?cid=16675003580963966041&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAEYASAB&hl=en-US&source=embed' },
]

function StatCounter({ target, suffix, shouldStart, divisor = 1 }) {
  const value = useCountUp(target, 2000, shouldStart)
  const displayValue = divisor === 1
    ? new Intl.NumberFormat('en-IN').format(value)
    : (value / divisor).toFixed(1)

  return <>{displayValue}{suffix}</>
}

export default function HeroBanner() {
  const [isReady, setIsReady] = useState(false)
  const statsRef = useRef(null)
  const statsVisible = useScrollReveal(statsRef, { threshold: 0.15, once: true })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsReady(true)
      return undefined
    }

    const frame = window.requestAnimationFrame(() => setIsReady(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const revealClass = (delayClass) => (
    `${styles.revealTransition} ${styles.hiddenBottom30} ${isReady ? styles.revealVisible : ''} ${delayClass}`
  )

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={`${styles.heroTitle} ${revealClass(styles.delay0)}`}>
            <span className={styles.heroTitlePrimary}>Science-Led Care for Skin &amp; Hair.</span>
            <span className={styles.heroTitleAccent}>Defined by excellence.</span>
          </h1>
          <p className={`${styles.heroSubtext} ${revealClass(styles.delay02)}`}>
            At <span className={styles.heroBrandInline}>Dr. Kapure&apos;s Hair | Skin | Laser Clinic</span>, we combine
            medical-grade technology with an <em>artistic understanding of beauty</em> to
            craft care plans that feel precise, personal, and results-driven.
          </p>
          <Link to="/services/hair" className={`${styles.heroCta} ${revealClass(styles.delay04)}`}>
            <span className={styles.heroCtaIcon} aria-hidden="true">✦</span>
            Explore Treatments
          </Link>

          <div ref={statsRef} className={`${styles.statsRow} ${revealClass(styles.delay06)}`}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <p className={styles.statNumber}>
                  <StatCounter
                    target={item.target}
                    suffix={item.suffix}
                    shouldStart={statsVisible}
                    divisor={item.divisor}
                  />
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.statLabelLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <p className={styles.statLabel}>{item.label}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
