import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { laserTreatments } from '../../data/laserTreatments'

const laserRouteMap = {
  'laser-hair-removal': '/treatments/laser/laser-hair-removal',
  'carbon-laser-facial': '/treatments/laser/carbon-laser-facial',
  'q-switch-laser': '/treatments/laser/q-switch-laser',
  'fractional-co2': '/treatments/laser/fractional-co2',
  'ipl-treatment': '/treatments/laser/ipl-treatment',
}

const fallbackImageDataUri =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f1f3f5'/%3E%3Cstop offset='1' stop-color='%23e9ecef'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%235a6578' font-size='34' font-family='Inter, Arial, sans-serif'%3ELaser service image%3C/text%3E%3C/svg%3E"

const handleImageError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImageDataUri
}

const smoothEase = [0.16, 1, 0.3, 1]

const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function LaserServices() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <section className="section-padding bg-gradient-to-br from-brand-section to-brand-bg">
        <div className="container-max">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStagger}
          >
            <motion.p
              variants={heroItem}
              transition={{ duration: 0.72, ease: smoothEase }}
              className="text-brand-gold font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
            >
              View All Laser Services
            </motion.p>
            <motion.h1
              variants={heroItem}
              transition={{ duration: 0.88, ease: smoothEase }}
              className="mt-3 text-3xl md:text-5xl font-serif font-bold text-brand-heading max-w-4xl leading-tight"
            >
              Advanced Laser Treatments at Dr. Kapure&apos;s Clinic
            </motion.h1>
            <motion.p
              variants={heroItem}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="mt-4 text-brand-text text-base md:text-lg leading-relaxed max-w-3xl"
            >
              Explore our focused laser portfolio for hair reduction, pigmentation control,
              resurfacing, and non-invasive rejuvenation protocols.
            </motion.p>
            <motion.div
              variants={heroItem}
              transition={{ duration: 0.75, ease: smoothEase }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-primary">
                Book Consultation <ArrowRight size={16} />
              </Link>
              <a href="tel:+918329467612" className="btn-outline">
                Call Clinic
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {laserTreatments.map((service) => {
              const to = laserRouteMap[service.id]

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: smoothEase }}
                  className="group glass-card p-4 sm:p-5 flex flex-col h-full hover:-translate-y-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-brand-section/80 mb-4">
                    <img
                      src={service.heroImages?.[0] || 'https://images.pexels.com/photos/7446683/pexels-photo-7446683.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop'}
                      alt={`${service.title} preview`}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-44 object-cover transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-brand-bg/90 text-brand-gold flex items-center justify-center shadow-sm">
                      <Sparkles size={16} />
                    </div>
                  </div>

                  <h2 className="text-xl font-serif font-bold text-brand-heading leading-snug transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-brand-gold group-hover:translate-x-0.5">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-base text-brand-text leading-relaxed flex-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-brand-heading/90 group-hover:translate-x-0.5">
                    {service.subtitle}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {service.concerns.slice(0, 3).map((item) => (
                      <li key={item} className="text-sm text-brand-text flex items-start gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-brand-heading/85">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <Link to={to} className="btn-outline w-full justify-center text-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.01em]">
                      View Treatment Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
