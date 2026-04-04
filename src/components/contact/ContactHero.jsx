import styles from './ContactPage.module.css'

export default function ContactHero() {
  return (
    <section className={styles.section}>
      <div className={styles.narrowContainer}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Contact Our Clinic</h1>
          <h2 className={styles.heroSubheading}>We are here to guide your treatment journey</h2>
          <p className={styles.heroText}>
            Connect with our team to discuss your concerns, explore suitable services,
            and schedule a consultation at your convenience.
          </p>
        </header>
      </div>
    </section>
  )
}
