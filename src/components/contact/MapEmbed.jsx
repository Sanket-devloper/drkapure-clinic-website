import styles from './ContactPage.module.css'

export default function MapEmbed() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.centeredHeader}>
          <h2 className={styles.formTitle}>Visit Our Clinic</h2>
          <p className={styles.mapText}>
            Find us at our clinic location and plan your visit with ease using the map below.
          </p>
        </div>

        <div className={styles.mapFrameWrap}>
          <iframe
            className={styles.mapFrame}
            title="Dr. Kapure's Hair Skin Laser Clinic location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4926840207147!2d73.7990569!3d18.6647085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b96dfb491fe9%3A0xe7698368afb94c59!2sDr.KAPURE'S%20HAIR%20%7C%20SKIN%20%7C%20LASER%20CLINIC!5e0!3m2!1sen!2sin!4v1710753600000"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
