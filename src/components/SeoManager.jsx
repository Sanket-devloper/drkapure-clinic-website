import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'Dr. Smita Kapure Hair, Skin & Laser Clinic'
const DEFAULT_DESCRIPTION =
  'Trusted hair treatment solutions for hair fall and scalp concerns by Dr. Smita Kapure, combined with customized skin care and modern laser procedures for clear, healthy-looking skin.'
const DEFAULT_IMAGE_WEBP = `${import.meta.env.BASE_URL}logo.webp`
const DEFAULT_IMAGE_PNG = `${import.meta.env.BASE_URL}logo.png`

const routeMeta = {
  '/': {
    title: 'Dr. Smita Kapure Hair, Skin & Laser Clinic | Advanced Treatment Care',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `About | ${SITE_NAME}`,
    description:
      'Learn about Dr. Kapure clinic approach, treatment philosophy, and patient-focused dermatology care in Pune.',
  },
  '/gallery': {
    title: `Gallery | ${SITE_NAME}`,
    description:
      'Explore clinic visuals and treatment environment at Dr. Kapure Hair Skin Laser Clinic in Pune.',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description:
      'Contact Dr. Kapure Hair Skin Laser Clinic in Pune to book skin, hair, or laser consultation.',
  },
  '/services/skin': {
    title: `Skin Treatments in Pune | ${SITE_NAME}`,
    description:
      'Dermatologist-guided skin treatments for acne, pigmentation, scars, anti-aging, and glow restoration.',
  },
  '/services/hair': {
    title: `Hair Treatments in Pune | ${SITE_NAME}`,
    description:
      'Hair fall solutions including PRP, GFC, mesotherapy, and transplant planning with personalized scalp evaluation.',
  },
  '/services/laser': {
    title: `Laser Treatments in Pune | ${SITE_NAME}`,
    description:
      'Safe laser treatments for hair removal, pigmentation, rejuvenation, and scar support tailored for Indian skin.',
  },
}

function resolveMeta(pathname) {
  if (routeMeta[pathname]) {
    return routeMeta[pathname]
  }

  if (pathname.startsWith('/treatments/skin/')) {
    return {
      title: `Skin Treatment Details | ${SITE_NAME}`,
      description:
        'Detailed skin treatment information, candidacy, process, and consultation guidance at Dr. Kapure clinic in Pune.',
    }
  }

  if (pathname.startsWith('/treatments/hair/')) {
    return {
      title: `Hair Treatment Details | ${SITE_NAME}`,
      description:
        'Detailed hair treatment options including PRP, GFC, mesotherapy, and regrowth support at Dr. Kapure clinic.',
    }
  }

  if (pathname.startsWith('/treatments/laser/')) {
    return {
      title: `Laser Treatment Details | ${SITE_NAME}`,
      description:
        'Detailed laser treatment information for hair reduction, pigmentation, and rejuvenation under dermatologist care.',
    }
  }

  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  }
}

export default function SeoManager() {
  const location = useLocation()
  const meta = resolveMeta(location.pathname)
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const canonical = `${siteUrl}${location.pathname}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}${DEFAULT_IMAGE_PNG}`,
    image: `${siteUrl}${DEFAULT_IMAGE_PNG}`,
    telephone: '+91 83294 67612',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shivaji Park Trail, Sambhajinagar, Chinchwad, Pune, Vitthal Nagar',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411019',
      addressCountry: 'IN',
    },
    areaServed: 'Pune',
    medicalSpecialty: ['Dermatology'],
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}${DEFAULT_IMAGE_WEBP}`} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image" content={`${siteUrl}${DEFAULT_IMAGE_PNG}`} />
      <meta property="og:image:type" content="image/png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={`${siteUrl}${DEFAULT_IMAGE_WEBP}`} />
      <meta name="twitter:image:src" content={`${siteUrl}${DEFAULT_IMAGE_PNG}`} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}