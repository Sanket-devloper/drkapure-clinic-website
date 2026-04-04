import { useRef } from 'react'
import { Star } from 'lucide-react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './AboutSections.module.css'

const reviews = [
  {
    text: 'Dr. Kapure provided wonderful treatment for my face acne, and the results have been excellent. My skin feels much softer and healthier now. She is professional, knowledgeable, and made the treatment comfortable and effective, even for men\'s skin concerns. Highly recommended!',
    name: 'Mayur Kachale',
    location: 'Google Review',
  },
  {
    text: 'Excellent and madam is giving very much perfectly treatment, highly recommended and specially for those who suffering for hair loss. And all the treatments are pocket friendly.',
    name: 'Dilip Singh',
    location: 'Google Review',
  },
  {
    text: 'Good clinic for dermatology and good treatment guidance for skincare routine.',
    name: 'Abhijeet Shende',
    location: 'Google Review',
  },
  {
    text: 'Excellent experience! Recently visited because of hair loss problem and recovery is very fast. Happy with the treatment.',
    name: 'Maithili Khadke',
    location: 'Google Review',
  },
]

const cardDelay = ['delay0', 'delay012', 'delay024', 'delay036']
const loopingReviews = [...reviews, ...reviews]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isVisible = useScrollReveal(sectionRef, { threshold: 0.15, once: true })

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.centeredHeader}>
          <h2 className={styles.sectionTitle}>What Patients Say</h2>
        </div>

        <div className="testimonials-marquee">
          <div className={`testimonials-marquee-track ${styles.aboutTestimonialsTrack}`}>
            {loopingReviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className={`${styles.marqueeReviewCard} ${styles.reviewRevealTransition} ${styles.hiddenBottom20} ${styles[cardDelay[index % cardDelay.length] || 'delay0']} ${isVisible ? styles.revealVisible : ''}`}
            >
              <div className={styles.ratingRow}>
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} size={16} className={styles.starIcon} />
                ))}
              </div>

              <p className={styles.reviewText}>{review.text}</p>

              <div className={styles.marqueeReviewerRow}>
                <span className={styles.avatar}>{review.name.charAt(0)}</span>
                <div>
                  <p className={styles.reviewerName}>{review.name}</p>
                  <p className={styles.reviewerLocation}>{review.location}</p>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
