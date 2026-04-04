import { useRef } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './AboutSections.module.css'

export default function BrandStory() {
  const sectionRef = useRef(null)
  const isSectionVisible = useScrollReveal(sectionRef, { threshold: 0.1, once: true })

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.brandStorySection} ${isSectionVisible ? styles.isVisible : ''}`}
    >
      <div className={styles.brandStoryContainer}>
        <h2 className={styles.brandStoryHeading}>Our Story</h2>
        <hr className={styles.brandStoryDivider} />
        
        <blockquote className={styles.brandStoryBlockquote}>
          "Transforming beauty through science and expertise"
        </blockquote>

        <div className={styles.brandStoryGrid}>
          <div className={styles.brandStoryColumn}>
            <p className={styles.brandStoryParagraph}>
              <strong>Dr. Kapure's Clinic</strong> was founded on the belief that beauty should be accessible and achieved through advanced scientific methods. Our commitment to excellence drives every treatment we offer.
            </p>
            <p className={styles.brandStoryParagraph}>
              With years of expertise in dermatology and aesthetic medicine, we have established ourselves as pioneers in innovative skin and hair treatments in the region.
            </p>
          </div>

          <div className={styles.brandStoryColumn}>
            <p className={styles.brandStoryParagraph}>
              We believe in delivering <strong>cutting-edge technology</strong> combined with personalized care for every patient. Our team of specialists are dedicated to understanding your unique needs.
            </p>
            <p className={styles.brandStoryParagraph}>
              From laser treatments to advanced therapeutics, we ensure that you receive <span className={styles.brandStoryHighlight}>results you deserve</span> with the highest standards of safety and efficacy.
            </p>
          </div>
        </div>

        <div className={styles.brandStoryTagline}>
          "Your skin and hair are reflections of your inner health — we help them shine"
        </div>
      </div>
    </section>
  )
}
