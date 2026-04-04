import { Fragment } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedTextReveal({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  once = true,
}) {
  const words = text.trim().split(/\s+/)

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.7 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.018,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.34, ease: [0.2, 0.9, 0.2, 1] }}
              className="inline-block whitespace-nowrap"
            >
              {word}
            </motion.span>
            {index < words.length - 1 && <span aria-hidden="true"> </span>}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
