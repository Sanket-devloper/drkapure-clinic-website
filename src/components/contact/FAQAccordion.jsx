import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './ContactPage.module.css'

const faqs = [
  {
    question: 'How do I schedule my first consultation?',
    answer: 'You can submit the appointment form or call our clinic number, and our team will confirm the earliest available slot.',
  },
  {
    question: 'Can I choose a preferred consultation time?',
    answer: 'Yes. Share your preferred day and time in the form, and we will try to accommodate based on availability.',
  },
  {
    question: 'Do I need to carry previous reports?',
    answer: 'If available, please bring previous prescriptions, reports, and current medication details for a better assessment.',
  },
  {
    question: 'Is online follow-up available?',
    answer: 'For suitable cases, online follow-up can be arranged after your initial in-clinic assessment.',
  },
  {
    question: 'How long does a consultation usually take?',
    answer: 'Most consultations take around 20 to 30 minutes depending on the complexity of your concern.',
  },
  {
    question: 'Are walk-ins accepted?',
    answer: 'Walk-ins are accepted when slots are open, but scheduled appointments are given priority.',
  },
  {
    question: 'Will I receive a treatment plan on the same day?',
    answer: 'In most cases, you will receive a clear plan during your consultation along with recommended next steps.',
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const onToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className={styles.section}>
      <div className={styles.narrowContainer}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">GOT QUESTIONS?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div key={item.question} className="glass-card overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => onToggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-brand-heading font-semibold pr-4">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-brand-gold" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-brand-text text-sm leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
