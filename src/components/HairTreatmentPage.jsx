import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedTextReveal from './AnimatedTextReveal'

const defaultHeroImages = [
  'https://images.pexels.com/photos/10600180/pexels-photo-10600180.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/5069508/pexels-photo-5069508.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/29648642/pexels-photo-29648642.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/8834074/pexels-photo-8834074.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
]

const defaultGalleryImages = [
  'https://images.pexels.com/photos/23349902/pexels-photo-23349902.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/28994388/pexels-photo-28994388.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/13899821/pexels-photo-13899821.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/23349910/pexels-photo-23349910.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
]

const defaultTransformations = [
  {
    title: 'Density and Volume Progress',
    before: 'https://images.pexels.com/photos/28994390/pexels-photo-28994390.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
    after: 'https://images.pexels.com/photos/4783290/pexels-photo-4783290.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  },
  {
    title: 'Scalp and Hair Quality Improvement',
    before: 'https://images.pexels.com/photos/8834067/pexels-photo-8834067.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
    after: 'https://images.pexels.com/photos/33448217/pexels-photo-33448217.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  },
]

const defaultStats = [
  { label: 'Session Time', value: '30-75 min' },
  { label: 'Downtime', value: 'Low' },
  { label: 'Plan Type', value: 'Series-Based' },
]

const textStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const smoothEase = [0.2, 0.9, 0.2, 1]

const fallbackImageDataUri =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f1f3f5'/%3E%3Cstop offset='1' stop-color='%23e9ecef'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%235a6578' font-size='36' font-family='Inter, Arial, sans-serif'%3EHair treatment image%3C/text%3E%3C/svg%3E"

const handleImageError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImageDataUri
}

export default function HairTreatmentPage({ treatment }) {
  if (!treatment) {
    return (
      <section className="section-padding bg-brand-bg min-h-screen">
        <div className="container-max text-center">
          <h1 className="text-3xl font-serif font-bold text-brand-heading">Treatment Not Found</h1>
          <p className="text-brand-text mt-3">The requested treatment page could not be loaded.</p>
          <Link to="/services/hair" className="btn-primary mt-6 inline-flex">
            Back to Hair Services <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    )
  }

  const heroImages = treatment.heroImages?.length ? treatment.heroImages.slice(0, 3) : defaultHeroImages.slice(0, 3)
  const galleryImages = treatment.galleryImages?.length ? treatment.galleryImages.slice(0, 4) : defaultGalleryImages
  const transformations = treatment.transformations?.length
    ? treatment.transformations.slice(0, 2)
    : defaultTransformations
  const treatmentStats = treatment.treatmentStats?.length
    ? treatment.treatmentStats.slice(0, 3)
    : defaultStats
  const quickTimeline = treatment.process?.length
    ? treatment.process.slice(0, 4)
    : [
      'Consultation and clinical assessment',
      'Early response monitoring sessions',
      'Visible progress review and plan adjustment',
      'Maintenance and follow-up strategy',
    ]

  return (
    <main className="bg-brand-bg">
      <section className="pt-10 md:pt-14 pb-10 md:pb-12 px-4 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-brand-section via-brand-bg to-brand-section/70 overflow-hidden">
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-stretch">
          <motion.div
            className="lg:col-span-6 lg:h-full lg:flex lg:flex-col lg:justify-center"
            initial="hidden"
            animate="show"
            variants={textStagger}
          >
            <motion.p
              variants={textItem}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="text-brand-gold font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
            >
              Advanced Hair Treatment
            </motion.p>
            <motion.h1
              variants={textItem}
              transition={{ duration: 0.62, ease: smoothEase }}
              className="mt-3 text-3xl md:text-5xl font-serif font-bold text-brand-heading leading-[1.08] max-w-4xl"
            >
              {treatment.title}
            </motion.h1>
            <motion.p
              variants={textItem}
              transition={{ duration: 0.55, ease: smoothEase }}
              className="mt-4 text-brand-text text-base md:text-lg leading-relaxed max-w-3xl"
            >
              {treatment.subtitle}
            </motion.p>
            <motion.div
              variants={textItem}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-primary">
                {treatment.heroCta} <ArrowRight size={16} />
              </Link>
              <Link to="/services/hair" className="btn-outline">
                View All Hair Services
              </Link>
            </motion.div>
            <motion.div
              variants={textItem}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {treatmentStats.map((item) => (
                <div key={item.label} className="glass-card px-4 py-3.5 text-center rounded-2xl">
                  <p className="text-2xl font-serif font-bold text-brand-heading leading-none">{item.value}</p>
                  <p className="text-xs text-brand-text uppercase tracking-[0.12em] mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: smoothEase }}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {heroImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`relative overflow-hidden rounded-2xl border border-brand-section/80 shadow-sm ${
                    index === 0 ? 'col-span-2 aspect-[16/8]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${treatment.title} visual ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="py-12 md:py-14 px-4 md:px-8 lg:px-16 xl:px-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max grid grid-cols-1 xl:grid-cols-3 gap-7 md:gap-8 items-start">
          <article className="xl:col-span-2 rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9">
            <AnimatedTextReveal
              text={treatment.overviewTitle}
              as="h2"
              className="text-4xl md:text-[2.7rem] font-serif font-bold text-brand-heading leading-[1.08]"
            />
            <p className="mt-5 text-base md:text-[1.12rem] text-brand-text leading-[1.7]">
              {treatment.overview}
            </p>

            <div className="mt-5 rounded-xl border border-brand-card/80 bg-brand-bg/70 p-3.5">
              <p className="text-xs uppercase tracking-[0.12em] text-brand-gold font-semibold">Clinical Progress Plan</p>
              <ul className="mt-2 space-y-1.5">
                {quickTimeline.map((item) => (
                  <li key={`time-${item}`} className="text-sm text-brand-heading leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9">
            <AnimatedTextReveal
              text="Best For"
              as="h3"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-[1.08]"
            />
            <ul className="mt-5 space-y-3">
              {treatment.concerns.map((item) => (
                <li key={item} className="group flex items-start gap-3 rounded-xl border border-brand-card/80 bg-brand-bg/70 px-3.5 py-3.5 transition-colors duration-500 ease-out hover:bg-brand-section/55">
                  <CheckCircle size={18} className="text-brand-gold mt-1 shrink-0 transition-transform duration-500 ease-out group-hover:scale-105" />
                  <span className="text-base md:text-[1.08rem] text-brand-heading leading-relaxed transition-all duration-500 ease-out group-hover:translate-x-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </motion.section>

      <motion.section
        className="py-14 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-brand-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-serif font-bold text-brand-heading">Before and After Transformations</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {transformations.map((item) => (
              <article key={item.title} className="glass-card p-4 md:p-5">
                <p className="text-base font-semibold text-brand-heading mb-3">{item.title}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-brand-section/80">
                    <img
                      src={item.before}
                      alt={`${item.title} before`}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-44 md:h-56 object-cover"
                    />
                    <p className="text-center text-xs font-medium text-brand-heading bg-brand-bg py-2">Before</p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-brand-section/80">
                    <img
                      src={item.after}
                      alt={`${item.title} after`}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-44 md:h-56 object-cover"
                    />
                    <p className="text-center text-xs font-medium text-brand-heading bg-brand-bg py-2">After</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-14 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-brand-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-9">
          <article className="rounded-[28px] border border-brand-section/80 bg-brand-card/70 p-7 md:p-9 shadow-sm">
            <AnimatedTextReveal
              text="Why Choose Dr. Kapure"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-7 gap-y-4 md:gap-y-5">
              {treatment.whyChoose.map((item) => (
                <div
                  key={item}
                  className="group flex items-start gap-2.5 sm:gap-3.5 rounded-xl p-1.5 transition-all duration-500 ease-out hover:translate-x-0.5"
                >
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={16} className="transition-transform duration-500 ease-out group-hover:rotate-12" />
                  </span>
                  <p className="text-mobile-safe text-mobile-fluid sm:text-base md:text-[1.06rem] text-brand-heading leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-brand-section/80 bg-brand-card/70 p-7 md:p-9 shadow-sm">
            <AnimatedTextReveal
              text="How Treatment Works"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <ol className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-7 gap-y-5 md:gap-y-6">
              {treatment.process.map((step, index) => (
                <li
                  key={step}
                  className="group flex items-start gap-2.5 sm:gap-3.5 min-h-[96px]"
                >
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-gold/25 text-brand-gold text-sm sm:text-lg font-semibold flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 ease-out group-hover:scale-105">
                    {index + 1}
                  </span>
                  <p className="text-mobile-safe text-mobile-fluid sm:text-base md:text-[1.06rem] text-brand-heading leading-[1.6]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </motion.section>

      <motion.section
        className="py-14 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <article className="rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9 self-start">
            <AnimatedTextReveal
              text="Treatment Options"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {treatment.types.map((item, index) => (
                <li
                  key={item}
                  className="group rounded-2xl border border-brand-section bg-brand-bg/80 p-4 sm:p-5 md:p-6 min-h-[120px] sm:min-h-[138px] flex items-center justify-center text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-mobile-safe text-mobile-fluid sm:text-base md:text-[1.16rem] font-medium text-brand-heading leading-snug transition-all duration-500 ease-out group-hover:text-brand-gold">
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-brand-section/80">
              <p className="text-sm uppercase tracking-[0.12em] text-brand-text">Also Helps With</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {treatment.concerns.slice(0, 3).map((item) => (
                  <span
                    key={`option-help-${item}`}
                    className="px-3.5 py-1.5 rounded-full bg-brand-section text-base text-brand-heading transition-colors duration-500 ease-out hover:bg-brand-gold/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9 self-start">
            <AnimatedTextReveal
              text="Pre and Post Care"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <h3 className="mt-5 text-xl md:text-[1.55rem] font-semibold text-brand-heading">Pre-Care</h3>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatment.preCare.map((item) => (
                <li key={item} className="group flex items-start gap-3 rounded-xl border border-brand-card/80 bg-brand-bg/70 p-3.5 transition-colors duration-500 ease-out hover:bg-brand-section/55">
                  <CheckCircle size={16} className="text-brand-gold mt-1 shrink-0" />
                  <span className="text-mobile-safe text-mobile-fluid sm:text-base md:text-[1.04rem] text-brand-heading transition-all duration-500 ease-out group-hover:translate-x-0.5">{item}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-xl md:text-[1.55rem] font-semibold text-brand-heading">Post-Care</h3>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatment.postCare.map((item) => (
                <li key={item} className="group flex items-start gap-3 rounded-xl border border-brand-card/80 bg-brand-bg/70 p-3.5 transition-colors duration-500 ease-out hover:bg-brand-section/55">
                  <CheckCircle size={16} className="text-brand-gold mt-1 shrink-0" />
                  <span className="text-mobile-safe text-mobile-fluid sm:text-base md:text-[1.04rem] text-brand-heading transition-all duration-500 ease-out group-hover:translate-x-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </motion.section>

      <motion.section
        className="py-14 md:py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-brand-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9">
            <AnimatedTextReveal
              text="Frequently Asked Questions"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <div className="mt-5 space-y-4">
              {treatment.faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-brand-card/80 bg-brand-bg/70 p-4 md:p-5">
                  <p className="text-mobile-safe text-mobile-fluid sm:text-base md:text-lg font-semibold text-brand-heading leading-snug">Q: {faq.q}</p>
                  <p className="text-mobile-safe text-mobile-fluid sm:text-base mt-2 md:text-[1.05rem] text-brand-text leading-relaxed">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-brand-card/70 bg-brand-section/35 p-7 md:p-9">
            <AnimatedTextReveal
              text="Patient Feedback"
              as="h2"
              className="text-3xl md:text-[2.2rem] font-serif font-bold text-brand-heading leading-tight"
            />
            <div className="mt-5 space-y-5">
              {treatment.testimonials.map((item) => (
                <blockquote key={item.name} className="rounded-xl border border-brand-card/80 bg-brand-bg/70 p-4 md:p-5 border-l-2 border-l-brand-gold">
                  <p className="text-mobile-safe text-mobile-fluid sm:text-base md:text-lg text-brand-text italic leading-relaxed">"{item.text}"</p>
                  <footer className="mt-3 text-base font-semibold text-brand-heading">- {item.name}</footer>
                </blockquote>
              ))}
            </div>
          </article>
        </div>
      </motion.section>

      <motion.section
        className="py-12 md:py-14 px-4 md:px-8 lg:px-16 xl:px-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <h2 className="text-3xl font-serif font-bold text-brand-heading">Treatment Gallery</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={`${image}-${index}`} className="rounded-2xl overflow-hidden border border-brand-section/80 shadow-sm">
                <img
                  src={image}
                  alt={`${treatment.title} gallery ${index + 1}`}
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-40 md:h-56 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-12 md:py-14 px-4 md:px-8 lg:px-16 xl:px-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.62, ease: smoothEase }}
      >
        <div className="container-max">
          <div className="glass-card p-9 md:p-14 text-center bg-gradient-to-br from-brand-gold/10 to-brand-section rounded-3xl">
            <h2 className="text-3xl font-serif font-bold text-brand-heading">{treatment.finalCtaTitle}</h2>
            <p className="mt-3 text-brand-text max-w-2xl mx-auto">{treatment.finalCtaText}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Book Consultation <ArrowRight size={16} />
              </Link>
              <a href="tel:+918329467612" className="btn-outline">Call Clinic</a>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}