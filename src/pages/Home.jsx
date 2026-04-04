import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ShieldCheck, Sparkles, UserCheck, Award, Star, ArrowRight,
  CheckCircle, Heart, Zap, Scissors, Sun, Phone, ChevronDown,
  Droplets, TrendingUp, Cpu, Play, Quote, Camera
} from 'lucide-react'
import doctorHomeHeroImg from '../assets/doctor/doctor-home-hero.webp'
import doctorHomeMeetExpertImg from '../assets/doctor/doctor-home-meet-expert.webp'
import skinTreatmentImg from '../assets/home/skin-treatment.webp'
import hairTreatmentImg from '../assets/home/hair-treatment.webp'
import laserTreatmentImg from '../assets/home/laser-treatment.webp'

/* ─── Reusable: scroll-triggered animation wrapper ─── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Reusable: animated number counter ─── */
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Data: Section 2 – What's Special ─── */
const specialFeatures = [
  { icon: UserCheck, title: 'Expert Dermatologist', desc: 'Treatments guided by a highly qualified dermatologist with years of hands-on clinical experience.' },
  { icon: Cpu, title: 'Advanced Technology', desc: 'US-FDA approved lasers and cutting-edge devices for safe, effective procedures.' },
  { icon: Heart, title: 'Personalized Care', desc: 'Every treatment plan is custom-designed around your unique skin type, concerns, and goals.' },
  { icon: TrendingUp, title: 'Proven Results', desc: 'Thousands of happy patients with visible, lasting transformations they love.' },
]

/* ─── Data: Section 3 – What We Offer (6 cards) ─── */
const offerCards = [
  { icon: ShieldCheck, title: 'Acne & Scar Treatment', desc: 'Medical-grade solutions for stubborn acne and scar reduction with minimal downtime.', to: '/services/skin' },
  { icon: Sparkles, title: 'Anti-Aging & Rejuvenation', desc: 'Turn back the clock with advanced anti-aging therapies for youthful, radiant skin.', to: '/services/skin' },
  { icon: Scissors, title: 'Hair Fall & PRP Therapy', desc: 'Comprehensive hair restoration including platelet-rich plasma therapy for thicker growth.', to: '/services/hair' },
  { icon: Zap, title: 'Laser Hair Removal', desc: 'Permanent hair reduction with safe, painless diode and Nd:YAG laser technology.', to: '/services/laser' },
  { icon: Sun, title: 'Pigmentation Correction', desc: 'Targeted treatments for melasma, dark spots, and uneven skin tone using peels and lasers.', to: '/services/skin' },
  { icon: Droplets, title: 'HydraFacial & Medi-Facials', desc: 'Deep-cleansing, hydrating facials that restore your skin\u2019s natural glow instantly.', to: '/services/skin' },
]

/* ─── Data: Section 4 – Signature Treatments ─── */
const signatureTreatments = [
  {
    title: 'Skin Treatments',
    desc: 'Advanced dermatological solutions for acne, pigmentation, anti-aging, and more.',
    to: '/services/skin',
    gradient: 'from-brand-bg/34 to-brand-section/52',
    icon: Sparkles,
    image: skinTreatmentImg,
    imagePosition: '50% 42%',
  },
  {
    title: 'Hair Treatments',
    desc: 'Comprehensive hair care including PRP therapy, transplant consultation, and hair fall solutions.',
    to: '/services/hair',
    gradient: 'from-brand-section/34 to-brand-card/52',
    icon: Scissors,
    image: hairTreatmentImg,
    imagePosition: '50% 32%',
  },
  {
    title: 'Laser Treatments',
    desc: 'State-of-the-art laser procedures for hair removal, skin rejuvenation, and more.',
    to: '/services/laser',
    gradient: 'from-brand-bg/34 to-brand-section/52',
    icon: Zap,
    image: laserTreatmentImg,
    imagePosition: '54% 44%',
  },
]

const bentoCards = [
  {
    id: 'aesthetic',
    icon: Sparkles,
    title: 'Aesthetic Procedures',
    desc: 'Advanced cosmetic treatments for a naturally refined look.',
    to: '/services/skin',
    image: 'https://images.pexels.com/photos/4586750/pexels-photo-4586750.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop',
    positionDesktop: '50% 34%',
    positionMobile: '50% 32%',
    desktopGradient: 'bg-gradient-to-b from-brand-section/62 via-brand-bg/42 to-brand-gold/55',
    mobileGradient: 'from-brand-section/62 to-brand-gold/52',
    contentVeilDesktop: 'bg-black/50',
    contentVeilMobile: 'bg-black/50',
  },
  {
    id: 'skin',
    icon: Scissors,
    title: 'Hair Fall & PRP Therapy',
    desc: 'PRP therapy, hair fall solutions, and scalp rejuvenation for healthier, stronger growth.',
    to: '/services/hair',
    image: 'https://images.pexels.com/photos/23349903/pexels-photo-23349903.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop',
    positionDesktop: '50% 36%',
    positionMobile: '50% 30%',
    desktopGradient: 'bg-gradient-to-b from-brand-section/62 via-brand-bg/42 to-brand-gold/55',
    mobileGradient: 'from-brand-section/62 to-brand-gold/52',
    contentVeilDesktop: 'bg-black/50',
    contentVeilMobile: 'bg-black/50',
  },
  {
    id: 'anti-aging',
    icon: TrendingUp,
    title: 'Hair Regrowth Treatment',
    desc: 'Targeted treatment plans for thinning hair, receding hairline, and visible regrowth support.',
    to: '/services/hair',
    image: 'https://images.pexels.com/photos/8834074/pexels-photo-8834074.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
    positionDesktop: '50% 32%',
    positionMobile: '50% 30%',
    desktopGradient: 'bg-gradient-to-b from-brand-section/62 via-brand-bg/42 to-brand-gold/55',
    mobileGradient: 'from-brand-section/62 to-brand-gold/52',
    contentVeilDesktop: 'bg-black/50',
    contentVeilMobile: 'bg-black/50',
  },
  {
    id: 'hair',
    icon: ShieldCheck,
    title: 'Skin Treatment',
    desc: 'Comprehensive dermatological solutions for acne, pigmentation, scars, and all skin concerns.',
    to: '/services/skin',
    image: 'https://images.pexels.com/photos/6476078/pexels-photo-6476078.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
    positionDesktop: '50% 36%',
    positionMobile: '50% 38%',
    desktopGradient: 'bg-gradient-to-b from-brand-section/62 via-brand-bg/42 to-brand-gold/55',
    mobileGradient: 'from-brand-section/62 to-brand-gold/52',
    contentVeilDesktop: 'bg-black/50',
    contentVeilMobile: 'bg-black/50',
  },
  {
    id: 'laser',
    icon: Zap,
    title: 'Laser Solutions',
    desc: 'State-of-the-art laser procedures for hair removal and skin toning.',
    to: '/services/laser',
    image: 'https://images.pexels.com/photos/5069506/pexels-photo-5069506.jpeg?auto=compress&cs=tinysrgb&w=1400&fit=crop',
    positionDesktop: '50% 38%',
    positionMobile: '50% 40%',
    desktopGradient: 'bg-gradient-to-b from-brand-section/62 via-brand-bg/42 to-brand-gold/55',
    mobileGradient: 'from-brand-section/62 to-brand-gold/52',
    contentVeilDesktop: 'bg-black/50',
    contentVeilMobile: 'bg-black/50',
  },
]

const marqueeItems = [
  'Chemical Peels', 'PRP Hair Therapy', 'Laser Hair Removal', 'HydraFacial',
  'Anti-Aging Botox', 'Dermal Fillers', 'Acne Scar Treatment', 'Pigmentation Correction',
]

/* ─── Data: Section 7 – Testimonials ─── */
const testimonials = [
  {
    name: 'Mayur Kachale',
    text: 'Dr. Kapure provided wonderful treatment for my face acne, and the results have been excellent. My skin feels much softer and healthier now. She is professional, knowledgeable, and made the treatment comfortable and effective, even for men\'s skin concerns. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Dilip Singh',
    text: 'Excellent and madam is giving very much perfectly treatment, highly recommended and specially for those who suffering for hair loss. And all the treatments are pocket friendly.',
    rating: 5,
  },
  {
    name: 'Abhijeet Shende',
    text: 'Good clinic for dermatology and good treatment guidance for skincare routine.',
    rating: 5,
  },
  {
    name: 'Maithili Khadke',
    text: 'Excellent experience! Recently visited because of hair loss problem and recovery is very fast. Happy with the treatment.',
    rating: 5,
  },
]

/* ─── Data: Section 9 – FAQ ─── */
const faqs = [
  { q: 'What skin conditions do you treat?', a: 'We treat a wide range of conditions including acne, pigmentation, eczema, psoriasis, melasma, rosacea, fungal infections, warts, and age-related skin concerns. Each condition is evaluated thoroughly before creating a personalized treatment plan.' },
  { q: 'Is laser treatment safe?', a: 'Yes, all our laser treatments use US-FDA approved equipment and are performed under the supervision of qualified dermatologists. We follow strict safety protocols and conduct a detailed skin assessment before every laser procedure.' },
  { q: 'How many sessions do I need?', a: 'The number of sessions varies based on the condition being treated, its severity, and your skin type. During your initial consultation, Dr. Kapure will provide a detailed treatment plan with an estimated number of sessions.' },
  { q: 'Do you offer consultation before treatment?', a: 'Absolutely. We always begin with a thorough one-on-one consultation to understand your concerns, assess your skin, and discuss the best treatment options before proceeding with any procedure.' },
  { q: 'What are your clinic timings?', a: 'Our clinic timings are Morning 10:00 AM to 2:00 PM and Evening 5:00 PM to 9:00 PM. Sunday consultations are available by prior appointment only. We recommend booking in advance to avoid wait times.' },
  { q: 'How do I book an appointment?', a: 'You can book an appointment by calling us directly, filling out the contact form on our website, or visiting the clinic in person. We also accept walk-ins, though prior appointments are given priority.' },
]

/* ─── Data: Section 8 – Gallery placeholders ─── */
const galleryItems = [
  {
    label: 'Acne Treatment',
    icon: Droplets,
    beforeImage: '/images/home/before-after/case-01-before.webp',
    afterImage: '/images/home/before-after/case-01-after.webp',
    beforePosition: '50% 40%',
    afterPosition: '50% 38%',
  },
  {
    label: 'Pigmentation Correction',
    icon: Sun,
    beforeImage: '/images/home/before-after/case-02-before.webp',
    afterImage: '/images/home/before-after/case-02-after.webp',
    beforePosition: '52% 34%',
    afterPosition: '50% 30%',
  },
  {
    label: 'Anti-Aging Therapy',
    icon: TrendingUp,
    beforeImage: '/images/home/before-after/case-03-before.webp',
    afterImage: '/images/home/before-after/case-03-after.webp',
    beforePosition: '48% 37%',
    afterPosition: '50% 36%',
  },
  {
    label: 'Laser Hair Removal',
    icon: Zap,
    beforeImage: '/images/home/before-after/case-04-before.webp',
    afterImage: '/images/home/before-after/case-04-after.webp',
    beforePosition: '52% 42%',
    afterPosition: '50% 45%',
  },
  {
    label: 'Hair Transplantation',
    icon: Scissors,
    beforeImage: '/images/home/before-after/case-05-before.webp',
    afterImage: '/images/home/before-after/case-05-after.webp',
    beforePosition: '50% 34%',
    afterPosition: '50% 36%',
  },
  {
    label: 'PRP Therapy',
    icon: ShieldCheck,
    beforeImage: '/images/home/before-after/case-06-before.webp',
    afterImage: '/images/home/before-after/case-06-after.webp',
    beforePosition: '53% 40%',
    afterPosition: '50% 38%',
  },
]

const fallbackImageDataUri =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f1f3f5'/%3E%3Cstop offset='1' stop-color='%23e9ecef'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='900' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%235a6578' font-size='36' font-family='Inter, Arial, sans-serif'%3ETreatment image%3C/text%3E%3C/svg%3E"

const handleImageError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImageDataUri
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const bentoCardMap = Object.fromEntries(bentoCards.map((card) => [card.id, card]))
  const antiAgingCard = bentoCardMap['anti-aging']
  const AntiAgingIcon = antiAgingCard.icon
  const loopingTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="bg-brand-bg overflow-x-hidden">

      {/* ═══════════ 1. HERO SECTION ═══════════ */}
      <section className="section-padding min-h-[85vh] flex items-center">
        <div className="container-max w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-gold/45 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-heading backdrop-blur-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-gold" aria-hidden="true" />
                Pimpri Chinchwad&apos;s Premier Skin Clinic
              </motion.div>

              <h1 className="font-serif tracking-tight text-brand-heading leading-[1.1]">
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="block text-4xl md:text-5xl lg:text-[3.5rem] font-semibold"
                >
                    Where Beauty Meets
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-brand-gold"
                >
                    Clinical Excellence
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-base text-brand-text max-w-lg leading-relaxed"
              >
                Experience advanced hair restoration and scalp care treatments at
                Dr.&nbsp;Kapure&apos;s Hair Skin Laser Clinic, led by expert specialist Dr.&nbsp;Kapure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-brand-gold to-brand-goldLight text-white px-7 py-3 rounded-full font-medium hover:from-brand-dark hover:to-brand-dark transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2 text-sm"
                >
                  Book Consultation <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services/hair"
                  className="border border-brand-gold/40 text-brand-heading px-7 py-3 rounded-full font-medium hover:bg-brand-gold/10 transition-all duration-300 inline-flex items-center gap-2 text-sm"
                >
                  Explore Services <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Right — Doctor Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-gold/20 to-brand-gold/5 border border-white/50 shadow-xl">
                <img
                  src={doctorHomeHeroImg}
                  alt="Dr. Smita Kapure - Hair, Skin and Laser Specialist"
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 28%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                {/* Floating certification badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 glass-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-gold/10 rounded-full">
                      <Award size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-heading">Certified Specialist</p>
                      <p className="text-xs font-semibold text-brand-heading">Advanced Trichologist &amp; Cosmetology</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. WHAT'S SPECIAL ═══════════ */}
      <section className="section-padding bg-[#f8f5f0] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,0.12),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(192,120,120,0.08),transparent_34%)]" />
        <div className="container-max">
          <AnimatedSection className="relative text-center max-w-4xl mx-auto mb-14 md:mb-16">
            <span className="text-[#9a8f82] font-medium text-xs md:text-sm uppercase tracking-[0.24em]">
              WHAT&apos;S SPECIAL AT DR. KAPURE&apos;S CLINIC
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-heading mt-3 font-heading md:whitespace-nowrap">
              What Makes Dr.&nbsp;Kapure&apos;s Clinic Exceptional
            </h2>
            <div className="mt-5 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
            <p className="mt-5 max-w-[700px] mx-auto text-[#74695f] text-sm md:text-base leading-relaxed font-sans">
              A carefully curated blend of clinical dermatology, advanced technology, and aesthetic precision
              designed to deliver safe care with visible, lasting outcomes.
            </p>
          </AnimatedSection>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-14">
            {specialFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <article className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.3)] bg-[#fffaf5] p-7 md:p-8 h-full text-center group transition-all duration-500 shadow-[0_14px_34px_-26px_rgba(54,38,24,0.38)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_48px_-24px_rgba(54,38,24,0.48)]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/70 via-transparent to-[#d4af37]/10" />
                  <div className="pointer-events-none absolute -inset-x-5 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 rounded-full border border-[rgba(212,175,55,0.35)] bg-[#f7eddf] flex items-center justify-center mx-auto mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <f.icon size={24} className="text-[#d4af37]" />
                  </div>
                  <h3 className="relative text-[#2f261f] font-semibold text-lg leading-snug mb-3 font-heading">{f.title}</h3>
                  <p className="relative text-[#756a5f] text-sm leading-relaxed font-sans">{f.desc}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats row */}
          <AnimatedSection>
            <div className="rounded-[22px] border border-[rgba(212,175,55,0.28)] bg-[#fffaf5] p-10 md:p-14 shadow-[0_14px_34px_-26px_rgba(54,38,24,0.34)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: 2345, suffix: '+', label: 'Happy Clients' },
                  { value: 6, suffix: '+', label: 'Years Experience' },
                  { value: 30, suffix: '+', label: 'Treatments' },
                  {
                    value: 5,
                    suffix: '.0/5',
                    label: 'Rating on Google',
                    href: 'https://google.com/maps?cid=16675003580963966041&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAEYASAB&hl=en-US&source=embed',
                  },
                ].map((s, i) => (
                  <AnimatedSection key={s.label} delay={i * 0.1}>
                    <p className="font-heading text-[clamp(32px,4vw,42px)] font-bold text-brand-heading leading-tight">
                      <CountUp target={s.value} suffix={s.suffix} />
                    </p>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-brand-text text-sm transition-colors duration-300 hover:text-brand-gold"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <p className="text-brand-text text-sm mt-2">{s.label}</p>
                    )}
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ 3. WHAT WE OFFER — Bento Grid ═══════════ */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">WHAT WE OFFER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif md:whitespace-nowrap">
              Comprehensive Skin, Hair &amp; Aesthetic Care
            </h2>
          </AnimatedSection>

          {/* Bento grid — desktop: 3 cols, center tall */}
          <div className="hidden md:grid grid-cols-3 gap-5 max-w-[1000px] mx-auto" style={{ gridTemplateRows: 'auto auto' }}>
            {/* Left top — Aesthetic Procedures */}
            <AnimatedSection delay={0}>
              <Link to={bentoCardMap.aesthetic.to} className="group block h-[240px] rounded-2xl overflow-hidden relative">
                <img
                  src={bentoCardMap.aesthetic.image}
                  alt="Aesthetic procedures"
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: bentoCardMap.aesthetic.positionDesktop }}
                />
                <div className={`absolute inset-0 ${bentoCardMap.aesthetic.desktopGradient}`} />
                <div className={`absolute inset-0 ${bentoCardMap.aesthetic.contentVeilDesktop} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5`}>
                  <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <bentoCardMap.aesthetic.icon size={26} className="text-brand-dark" />
                  </div>
                  <h3 className="text-white font-semibold text-lg font-serif">{bentoCardMap.aesthetic.title}</h3>
                  <p className="text-white/90 text-xs mt-1.5 leading-relaxed max-w-[220px]">{bentoCardMap.aesthetic.desc}</p>
                </div>
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* Center — Featured treatment (tall, spans 2 rows) */}
            <AnimatedSection delay={0.15} className="row-span-2">
              <Link to={bentoCardMap.skin.to} className="group block h-full min-h-[500px] rounded-2xl overflow-hidden relative">
                <img
                  src={bentoCardMap.skin.image}
                  alt={bentoCardMap.skin.title}
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: bentoCardMap.skin.positionDesktop }}
                />
                <div className={`absolute inset-0 ${bentoCardMap.skin.desktopGradient}`} />
                <div className={`absolute inset-0 ${bentoCardMap.skin.contentVeilDesktop} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6`}>
                  <div className="w-20 h-20 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <bentoCardMap.skin.icon size={36} className="text-brand-dark" />
                  </div>
                  <h3 className="text-white font-bold text-2xl font-serif">{bentoCardMap.skin.title}</h3>
                  <p className="text-white/90 text-sm mt-2 leading-relaxed max-w-[260px]">
                    {bentoCardMap.skin.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Treatments <ArrowRight size={16} />
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* Right top — Secondary treatment */}
            <AnimatedSection delay={0.1}>
              <Link to={antiAgingCard.to} className="group block h-[240px] rounded-2xl overflow-hidden relative">
                <img
                  src={antiAgingCard.image}
                  alt={antiAgingCard.title}
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: antiAgingCard.positionDesktop }}
                />
                <div className={`absolute inset-0 ${antiAgingCard.desktopGradient}`} />
                <div className={`absolute inset-0 ${antiAgingCard.contentVeilDesktop} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5`}>
                  <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <AntiAgingIcon size={26} className="text-brand-dark" />
                  </div>
                  <h3 className="text-white font-semibold text-lg font-serif">{antiAgingCard.title}</h3>
                  <p className="text-white/90 text-xs mt-1.5 leading-relaxed max-w-[220px]">{antiAgingCard.desc}</p>
                </div>
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* Left bottom — Additional treatment */}
            <AnimatedSection delay={0.2}>
              <Link to={bentoCardMap.hair.to} className="group block h-[240px] rounded-2xl overflow-hidden relative">
                <img
                  src={bentoCardMap.hair.image}
                  alt={bentoCardMap.hair.title}
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: bentoCardMap.hair.positionDesktop }}
                />
                <div className={`absolute inset-0 ${bentoCardMap.hair.desktopGradient}`} />
                <div className={`absolute inset-0 ${bentoCardMap.hair.contentVeilDesktop} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5`}>
                  <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <bentoCardMap.hair.icon size={26} className="text-brand-dark" />
                  </div>
                  <h3 className="text-white font-semibold text-lg font-serif">{bentoCardMap.hair.title}</h3>
                  <p className="text-white/90 text-xs mt-1.5 leading-relaxed max-w-[220px]">{bentoCardMap.hair.desc}</p>
                </div>
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>

            {/* Right bottom — Laser Solutions */}
            <AnimatedSection delay={0.25}>
              <Link to={bentoCardMap.laser.to} className="group block h-[240px] rounded-2xl overflow-hidden relative">
                <img
                  src={bentoCardMap.laser.image}
                  alt="Laser solutions"
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: bentoCardMap.laser.positionDesktop }}
                />
                <div className={`absolute inset-0 ${bentoCardMap.laser.desktopGradient}`} />
                <div className={`absolute inset-0 ${bentoCardMap.laser.contentVeilDesktop} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5`}>
                  <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <bentoCardMap.laser.icon size={26} className="text-brand-dark" />
                  </div>
                  <h3 className="text-white font-semibold text-lg font-serif">{bentoCardMap.laser.title}</h3>
                  <p className="text-white/90 text-xs mt-1.5 leading-relaxed max-w-[220px]">{bentoCardMap.laser.desc}</p>
                </div>
                <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </AnimatedSection>
          </div>

          {/* Mobile: stacked single column */}
          <div className="md:hidden flex flex-col gap-4">
            {bentoCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.08}>
                <Link to={card.to} className="group block rounded-2xl overflow-hidden relative h-[200px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: card.positionMobile || '50% 50%' }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.mobileGradient}`} />
                  <div className={`absolute inset-0 ${card.contentVeilMobile || 'bg-white/20'} backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5`}>
                    <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <card.icon size={26} className="text-brand-dark" />
                    </div>
                    <h3 className="text-white font-semibold text-lg font-serif">{card.title}</h3>
                    <p className="text-white/90 text-xs mt-1.5 leading-relaxed max-w-[280px]">{card.desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. OUR SIGNATURE TREATMENTS ═══════════ */}
      <section className="section-padding bg-[#f8f5f0]">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">OUR MAIN SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">
              Our Signature Treatments
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {signatureTreatments.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.15}>
                <Link to={s.to} className="block group">
                  <div className="glass-card overflow-hidden h-full">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={s.image}
                        alt={`${s.title} showcase`}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ objectPosition: s.imagePosition || '50% 50%' }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-100 group-hover:opacity-90 transition-opacity`} />
                      <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/75 backdrop-blur-sm flex items-center justify-center shadow-sm">
                        <s.icon size={22} className="text-brand-gold" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-brand-heading mb-2 group-hover:text-brand-gold transition-colors font-serif">
                        {s.title}
                      </h3>
                      <p className="text-brand-text text-sm leading-relaxed mb-4">{s.desc}</p>
                      <span className="inline-flex items-center gap-1 text-brand-gold text-sm font-medium group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Treatment marquee */}
          <div className="overflow-hidden relative py-4">
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="inline-block px-5 py-2 rounded-full border border-brand-gold/20 text-brand-heading text-sm font-medium bg-white/40"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. MEET THE EXPERT ═══════════ */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">MEET THE EXPERT</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">
              Meet Dr.&nbsp;Smita Kapure — Aesthetic Physician &amp; Hair Expert
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left — Doctor Image */}
            <AnimatedSection className="flex justify-center overflow-visible">
              <div className="relative p-8">
                {/* Synchronized smooth ripple waves - fade in together */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-brand-gold/40"
                  animate={{ 
                    scale: [1, 1.35],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', repeatType: 'loop' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-brand-gold/35"
                  animate={{ 
                    scale: [1, 1.35],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', repeatType: 'loop' }}
                />
                
                <div className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border-2 border-brand-gold/50 shadow-2xl">
                  <img
                    src={doctorHomeMeetExpertImg}
                    alt="Dr. Smita Kapure - Aesthetic Physician and Hair Expert"
                    loading="lazy"
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: '50% 24%' }}
                  />
                  {/* Smooth glow pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      boxShadow: [
                        'inset 0 0 25px rgba(192, 120, 120, 0.15)',
                        'inset 0 0 50px rgba(192, 120, 120, 0.25)',
                        'inset 0 0 25px rgba(192, 120, 120, 0.15)'
                      ]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Bio */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-brand-heading font-serif">Dr. Smita Kapure</h3>
                <p className="text-brand-gold font-medium">Aesthetic Physician &amp; Hair Expert</p>
                <p className="text-brand-text leading-relaxed">
                  Dr. Smita Kapure is known for her patient-centric approach and natural,
                  confidence-boosting results. With over 6 years of experience in
                  non-surgical aesthetic medicine and advanced hair treatments, she combines
                  advanced medical science with genuine care to deliver customized solutions
                  for every patient.
                </p>

                <ul className="space-y-3">
                  {[
                    'BAMS, MS — General Surgery',
                    'Fellowship in Trichology and Cosmetology',
                    'Training in Hair Transplant procedures at NIHTC Institute, Mumbai',
                    'Certified laser expert in advanced aesthetic and dermatological care',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={18} className="text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-brand-heading text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to="/contact" className="btn-primary mt-4 inline-flex">
                  Book Consultation <ArrowRight size={16} />
                </Link>

                <div className="glass-card p-5 mt-6">
                  <div className="flex gap-3">
                    <Quote size={20} className="text-brand-blush shrink-0 mt-1" />
                    <p className="text-brand-heading text-sm italic leading-relaxed">
                      &ldquo;Her philosophy centers on enhancing natural beauty while maintaining the
                      highest standards of safety and medical ethics.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. WHY CHOOSE US ═══════════ */}
      <section className="section-padding bg-[#f8f5f0]">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-[#9f9387] font-medium text-xs md:text-sm uppercase tracking-[0.26em]">
              THE SKIN FIRM DIFFERENCE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2a2018] mt-3 font-heading">Why Choose Us</h2>
            <p className="text-[#7a6c60] mt-5 leading-relaxed max-w-[700px] mx-auto font-sans text-[0.98rem] md:text-base">
              We blend clinical precision with aesthetic insight to deliver safe, personalized outcomes
              that look natural and feel right for your skin journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7 xl:gap-8 items-stretch">
            <AnimatedSection>
              <div className="h-full grid grid-rows-[1.6fr_1fr] gap-6">
                <article className="rounded-[22px] border border-[#d4b78f] bg-[#fdf7ef] p-6 md:p-7 shadow-[0_14px_34px_-28px_rgba(61,45,30,0.42)] hover:-translate-y-1.5 hover:shadow-[0_22px_42px_-28px_rgba(61,45,30,0.5)] transition-all duration-300">
                  <Quote size={22} className="text-[#9a7a54]" aria-label="Quote icon" />
                  <p className="mt-4 text-[#4c3c2f] italic leading-relaxed text-[0.98rem] font-sans">
                    &ldquo;With over a decade of dermatology experience, Dr. Kapure combines evidence-based
                    skin science with aesthetic precision to deliver safe, natural-looking, and lasting results.&rdquo;
                  </p>
                </article>

                <article className="h-full rounded-[22px] border border-[#d8be99] bg-[#fffbf6] p-6 shadow-[0_14px_34px_-28px_rgba(61,45,30,0.42)] hover:-translate-y-1.5 hover:shadow-[0_22px_42px_-28px_rgba(61,45,30,0.5)] transition-all duration-300 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f2e4d3] border border-[#d8be99] flex items-center justify-center">
                      <UserCheck size={18} className="text-[#8b6b48]" aria-label="Happy clients icon" />
                    </div>
                    <p className="text-[#2f261f] font-semibold leading-snug font-sans">Over 5,000+ Happy Clients</p>
                  </div>
                </article>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08} className="md:col-span-2 xl:col-span-1">
              <article className="h-full rounded-[24px] border border-[#c8a977] bg-gradient-to-br from-[#2f2722] via-[#43362d] to-[#5a4738] p-7 md:p-8 text-white shadow-[0_30px_62px_-34px_rgba(33,23,16,0.82)] hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-34px_rgba(33,23,16,0.88)] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#c9a46f]/20 border border-[#d9be93]/50 flex items-center justify-center">
                  <Sparkles size={20} className="text-[#f4dcb5]" aria-label="Excellence icon" />
                </div>

                <h3 className="mt-5 text-2xl font-heading font-semibold text-[#f7e3c3]">Excellence in Dermatology</h3>
                <p className="mt-3 text-[#f2e4d0]/90 leading-relaxed text-sm md:text-base font-sans">
                  A premium blend of medical dermatology and modern aesthetic protocols focused on
                  safe, visible, and consistent long-term results.
                </p>

                <ul className="mt-5 space-y-3" aria-label="Clinic strengths list">
                  {[
                    'US-FDA Approved Equipment',
                    'Personalized Consultations',
                    'Fellowship in hair transplant',
                    'Fellowship in aesthetic laser',
                    'Proven & Safe Results',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm md:text-[0.95rem] text-[#f8e8cf] font-sans">
                      <CheckCircle size={18} className="text-[#e5be86] shrink-0" aria-label="Check icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center w-full rounded-full border border-[#dcb886] text-[#f8e7c8] px-5 py-2.5 font-semibold font-sans hover:bg-[#d4b080] hover:text-[#2f2721] transition-all duration-300"
                    aria-label="Book now"
                  >
                    Book Now
                  </Link>
                </div>
              </article>
            </AnimatedSection>

            <AnimatedSection delay={0.16}>
              <div className="h-full grid grid-rows-[1fr_1.6fr] gap-6">
                <article className="h-full rounded-[22px] border border-[#d8be99] bg-[#fffbf6] p-6 shadow-[0_14px_34px_-28px_rgba(61,45,30,0.42)] hover:-translate-y-1.5 hover:shadow-[0_22px_42px_-28px_rgba(61,45,30,0.5)] transition-all duration-300 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f2e4d3] border border-[#d8be99] flex items-center justify-center">
                      <Star size={18} className="text-[#8b6b48]" aria-label="Expertise icon" />
                    </div>
                    <p className="text-[#2f261f] font-semibold leading-snug font-sans">Trained &amp; Certified Medical Experts</p>
                  </div>
                </article>

                <article className="rounded-[22px] border border-[#d4b78f] bg-[#fdf7ef] p-6 md:p-7 shadow-[0_14px_34px_-28px_rgba(61,45,30,0.42)] hover:-translate-y-1.5 hover:shadow-[0_22px_42px_-28px_rgba(61,45,30,0.5)] transition-all duration-300 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#f2e4d3] border border-[#d8be99] flex items-center justify-center">
                    <Heart size={24} className="text-[#8b6b48]" aria-label="Trust icon" />
                  </div>
                  <p className="mt-4 text-[#3a2e25] font-medium leading-relaxed max-w-[250px] font-sans">
                    Trusted by thousands for safe &amp; effective care.
                  </p>
                </article>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. SUCCESS STORIES ═══════════ */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">REAL STORIES FROM REAL CLIENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">Success Stories</h2>
          </AnimatedSection>

          <div className="testimonials-marquee">
            <div className="testimonials-marquee-track">
              {loopingTestimonials.map((t, i) => {
                return (
                  <article
                    key={`${t.name}-${i}`}
                    className="glass-card p-6 h-full flex flex-col w-[300px] sm:w-[340px] h-[320px]"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} className="text-[#f2c14e] fill-[#f2c14e]" />
                      ))}
                    </div>
                    <p className="review-text-clamp text-brand-heading text-sm leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-brand-blush/20">
                      <div className="w-10 h-10 rounded-full bg-brand-blush/40 flex items-center justify-center">
                        <span className="text-brand-gold font-bold text-sm">{t.name.charAt(0)}</span>
                      </div>
                      <p className="text-brand-heading font-semibold text-sm">{t.name}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 8. BEFORE & AFTER GALLERY ═══════════ */}
      <section className="section-padding bg-[#f8f5f0] overflow-hidden">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">BEFORE &amp; AFTER GALLERY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">
              Real Transformations. Real Confidence.
            </h2>
            <p className="text-brand-text mt-4 leading-relaxed">
              See the visible difference our treatments have made for real patients.
              Every result is achieved with safe, medically-supervised procedures.
            </p>
          </AnimatedSection>
        </div>

        {/* Single row — scrolls left continuously */}
        <div className="gallery-marquee mb-10">
          <div className="gallery-marquee-track">
            {[...galleryItems, ...galleryItems, ...galleryItems].map((item, i) => (
              <div key={`g-${i}`} className="gallery-card group">
                <div className="flex h-52 sm:h-56">
                  <div className="flex-1 border-r border-white/40 relative overflow-hidden">
                    <img
                      src={item.beforeImage}
                      alt={`${item.label} before`}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: item.beforePosition || '50% 50%' }}
                    />
                    <div className="absolute inset-0 bg-brand-bg/10" />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 text-[11px] text-brand-heading font-medium">
                      <Camera size={12} className="text-brand-gold" /> Before
                    </span>
                  </div>
                  <div className="flex-1 relative overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={`${item.label} after`}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: item.afterPosition || '50% 50%' }}
                    />
                    <div className="absolute inset-0 bg-brand-gold/10" />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 text-[11px] text-brand-heading font-semibold">
                      <Camera size={12} className="text-brand-gold" /> After
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center flex items-center justify-center gap-2">
                  <item.icon size={16} className="text-brand-gold" />
                  <p className="text-brand-heading font-semibold text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/gallery" className="btn-outline">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══════════ 9. FAQ ═══════════ */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-brand-gold font-medium text-sm uppercase tracking-[0.15em]">GOT QUESTIONS?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mt-3 font-serif">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-brand-heading font-semibold pr-4">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown size={20} className="text-brand-gold" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="faq-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-brand-text text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 10. CTA BANNER ═══════════ */}
      <section className="py-20 md:py-24 px-4 md:px-8 lg:px-16 xl:px-24 bg-[#F8F5F0]">
        <AnimatedSection>
          <div className="relative max-w-[900px] mx-auto">
            <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_64%)]" />
            <motion.div
              className="relative overflow-hidden rounded-[24px] glass-card px-6 md:px-10 py-10 md:py-12 text-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={hairTreatmentImg}
                alt="Skin treatment consultation"
                loading="lazy"
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(248,245,240,0.28),rgba(243,236,228,0.38))]" />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(243,236,228,0.1))]" />

              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold text-[#2F261F] mb-4 font-heading">
                  Ready to Begin Your Transformation?
                </h2>
                <p className="text-[#1F1711] font-semibold max-w-xl mx-auto mb-8 leading-relaxed font-sans">
                  Book a personalized consultation today. Let our experts create a treatment plan
                  tailored just for you.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Link
                    to="/contact"
                    className="btn-primary px-8 py-4"
                  >
                    Book Appointment <ArrowRight size={18} />
                  </Link>
                  <a
                    href="tel:+918329467612"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 border-[1.5px] border-[#8E5C4A] text-[#2F261F] bg-transparent hover:bg-[rgba(142,92,74,0.08)] hover:border-[#C58B6D] transition-all duration-300"
                  >
                    <Phone size={18} className="text-[#8E5C4A]" /> Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  )
}
