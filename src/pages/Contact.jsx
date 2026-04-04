import ContactHero from '../components/contact/ContactHero'
import ContactInfoForm from '../components/contact/ContactInfoForm'
import MapEmbed from '../components/contact/MapEmbed'
import FAQAccordion from '../components/contact/FAQAccordion'
import styles from '../components/contact/ContactPage.module.css'
import { theme } from '../theme'

const tokenVars = {
  '--color-primary': theme.colors.primary,
  '--color-secondary': theme.colors.secondary,
  '--color-background': theme.colors.background,
  '--color-surface': theme.colors.surface,
  '--color-text-primary': theme.colors.textPrimary,
  '--color-text-muted': theme.colors.secondary,
  '--color-accent': theme.colors.accent,
  '--font-heading': theme.typography.fontFamily.heading,
  '--font-body': theme.typography.fontFamily.body,
  '--font-size-xs': theme.typography.fontSize.xs,
  '--font-size-sm': theme.typography.fontSize.sm,
  '--font-size-md': theme.typography.fontSize.md,
  '--font-size-lg': theme.typography.fontSize.lg,
  '--font-size-xl': theme.typography.fontSize.xl,
  '--font-size-2xl': theme.typography.fontSize['2xl'],
  '--font-weight-regular': theme.typography.fontWeight.regular,
  '--font-weight-medium': theme.typography.fontWeight.medium,
  '--font-weight-bold': theme.typography.fontWeight.bold,
  '--line-height-tight': theme.typography.lineHeight.tight,
  '--line-height-normal': theme.typography.lineHeight.normal,
  '--line-height-relaxed': theme.typography.lineHeight.relaxed,
  '--space-xs': theme.spacing.xs,
  '--space-sm': theme.spacing.sm,
  '--space-md': theme.spacing.md,
  '--space-lg': theme.spacing.lg,
  '--space-xl': theme.spacing.xl,
  '--space-2xl': theme.spacing['2xl'],
  '--space-3xl': theme.spacing['3xl'],
  '--radius-sm': theme.radius.sm,
  '--radius-md': theme.radius.md,
  '--radius-lg': theme.radius.lg,
  '--radius-full': theme.radius.full,
  '--shadow-sm': theme.shadows.sm,
  '--shadow-md': theme.shadows.md,
  '--shadow-lg': theme.shadows.lg,
  '--h1-size': `calc(${theme.typography.fontSize['2xl']} * 2)`,
}

export default function Contact() {
  return (
    <main className={styles.contactPage} style={tokenVars}>
      <ContactHero />
      <ContactInfoForm />
      <MapEmbed />
      <FAQAccordion />
    </main>
  )
}
