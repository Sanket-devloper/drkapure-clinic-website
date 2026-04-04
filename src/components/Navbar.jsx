import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const skinLinks = [
  { label: 'Acne Treatment', to: '/treatments/skin/acne-treatment' },
  { label: 'Anti-Aging', to: '/treatments/skin/anti-aging' },
  { label: 'Pigmentation', to: '/treatments/skin/pigmentation' },
  { label: 'HydraFacial', to: '/treatments/skin/hydrafacial' },
  { label: 'OxyGeneo Medi-Facial', to: '/treatments/skin/medi-facial' },
  { label: 'Skin Tightening', to: '/treatments/skin/skin-tightening' },
  { label: 'Glutathione IV', to: '/treatments/skin/glutathione-iv' },
  { label: 'Vampire Facial', to: '/treatments/skin/vampire-facial' },
  { label: 'Skin Brightening', to: '/treatments/skin/skin-brightening' },
  { label: 'Scar Treatment', to: '/treatments/skin/scar-treatment' },
]
const hairLinks = [
  { label: 'PRP Therapy', to: '/treatments/hair/prp-therapy' },
  { label: 'GFC Therapy', to: '/treatments/hair/gfc-therapy' },
  { label: 'Mesotherapy', to: '/treatments/hair/mesotherapy' },
  { label: 'Micro Needling', to: '/treatments/hair/micro-needling' },
  { label: 'Low Light Laser Treatment', to: '/treatments/hair/low-light-laser-treatment' },
  { label: 'Hair Transplant', to: '/treatments/hair/hair-transplant' },
  { label: 'Exosome Hair Regrowth', to: '/treatments/hair/hair-regrowth' },
]
const laserLinks = [
  { label: 'Laser Hair Removal', to: '/treatments/laser/laser-hair-removal' },
  { label: 'Carbon Laser Facial', to: '/treatments/laser/carbon-laser-facial' },
  { label: 'Q-Switch Laser', to: '/treatments/laser/q-switch-laser' },
  { label: 'Fractional CO2', to: '/treatments/laser/fractional-co2' },
  { label: 'IPL Treatment', to: '/treatments/laser/ipl-treatment' },
]

function DropdownMenu({
  label,
  links,
  to,
  menuKey,
  activeDesktopMenu,
  onOpen,
  onScheduleClose,
  onCloseImmediate,
}) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)
  const isOpen = activeDesktopMenu === menuKey

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpen(menuKey)}
      onMouseLeave={onScheduleClose}
    >
      <Link
        to={to}
        className={`flex items-center gap-1 py-1 transition-colors duration-200 text-base ${
          isActive ? 'text-brand-heading' : 'text-brand-heading/70 hover:text-brand-heading'
        }`}
      >
        {label}
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Link>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 w-56 pt-2 z-50"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => onOpen(menuKey)}
          onMouseLeave={onScheduleClose}
        >
          <div className="bg-brand-bg rounded-2xl shadow-xl border border-brand-card py-2">
            <Link
              to={to}
              className="block px-4 py-2 text-sm text-brand-heading font-semibold hover:bg-brand-section transition-colors"
              onClick={onCloseImmediate}
            >
              View All {label}
            </Link>
            <div className="border-t border-brand-card my-1" />
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2 text-sm text-brand-text hover:text-brand-heading hover:bg-brand-section transition-colors"
                onClick={onCloseImmediate}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const lastScrollY = useRef(0)
  const desktopCloseTimeoutRef = useRef(null)

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimeoutRef.current) {
      clearTimeout(desktopCloseTimeoutRef.current)
      desktopCloseTimeoutRef.current = null
    }
  }

  const openDesktopMenu = (menuKey) => {
    clearDesktopCloseTimer()
    setActiveDesktopMenu(menuKey)
  }

  const scheduleDesktopMenuClose = () => {
    clearDesktopCloseTimer()
    desktopCloseTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null)
    }, 180)
  }

  const closeDesktopMenu = () => {
    clearDesktopCloseTimer()
    setActiveDesktopMenu(null)
  }

  useEffect(() => {
    const SCROLL_HIDE_START = 80
    const SCROLL_DELTA = 2

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      setScrolled(y > 20)

      // Hide on downward scroll and show on upward scroll, including slow movement.
      if (mobileOpen) {
        setHidden(false)
      } else if (y <= SCROLL_HIDE_START) {
        setHidden(false)
      } else if (delta > SCROLL_DELTA) {
        setHidden(true)
      } else if (delta < -SCROLL_DELTA) {
        setHidden(false)
      } else {
        setHidden((prev) => prev)
      }

      lastScrollY.current = y
    }

    lastScrollY.current = window.scrollY
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDesktopMenu(null)
  }, [location])

  useEffect(() => () => clearDesktopCloseTimer(), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } transition-[transform,background-color,padding,box-shadow] ${
          scrolled ? 'bg-brand-bg shadow-md py-2.5' : 'bg-brand-bg/95 py-3.5'
        }`}
      >
        <div className="container-max px-4 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Dr. Kapure's Hair Skin Laser Clinic"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <div className="block">
              <p className="text-brand-heading font-heading font-semibold text-lg md:text-xl leading-none tracking-[0.02em]">Dr. Kapure's</p>
              <p className="text-brand-text text-[11px] md:text-xs uppercase tracking-[0.12em] mt-0.5">Hair Skin Laser Clinic</p>
            </div>
          </Link>

          {/* Desktop Links — right side with spacing */}
          <div className="hidden lg:flex items-center gap-8 text-brand-heading text-base font-sans mr-8">
            <Link
              to="/about"
              className={`transition-colors duration-200 ${
                location.pathname === '/about' ? 'text-brand-heading' : 'text-brand-heading/70 hover:text-brand-heading'
              }`}
            >
              About
            </Link>
            <DropdownMenu
              label="Skin"
              links={skinLinks}
              to="/services/skin"
              menuKey="skin"
              activeDesktopMenu={activeDesktopMenu}
              onOpen={openDesktopMenu}
              onScheduleClose={scheduleDesktopMenuClose}
              onCloseImmediate={closeDesktopMenu}
            />
            <DropdownMenu
              label="Hair"
              links={hairLinks}
              to="/services/hair"
              menuKey="hair"
              activeDesktopMenu={activeDesktopMenu}
              onOpen={openDesktopMenu}
              onScheduleClose={scheduleDesktopMenuClose}
              onCloseImmediate={closeDesktopMenu}
            />
            <DropdownMenu
              label="Laser"
              links={laserLinks}
              to="/services/laser"
              menuKey="laser"
              activeDesktopMenu={activeDesktopMenu}
              onOpen={openDesktopMenu}
              onScheduleClose={scheduleDesktopMenuClose}
              onCloseImmediate={closeDesktopMenu}
            />
            <Link
              to="/gallery"
              className={`transition-colors duration-200 ${
                location.pathname === '/gallery' ? 'text-brand-heading' : 'text-brand-heading/70 hover:text-brand-heading'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`transition-colors duration-200 ${
                location.pathname === '/contact' ? 'text-brand-heading' : 'text-brand-heading/70 hover:text-brand-heading'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="lg:hidden p-2 text-brand-heading ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </nav>

      {/* Mobile Menu — separate floating card outside nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-[76px] left-4 right-4 z-40 lg:hidden bg-brand-bg rounded-2xl shadow-xl border border-brand-section/60 overflow-hidden"
          >
            <motion.div
              className="px-5 py-5 space-y-1 font-sans"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.05
                  }
                }
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/about" className="block py-3 text-brand-heading text-base border-b border-brand-blush/30">About</Link>
              </motion.div>

              {[
                { key: 'skin', label: 'Skin', links: skinLinks, to: '/services/skin' },
                { key: 'hair', label: 'Hair', links: hairLinks, to: '/services/hair' },
                { key: 'laser', label: 'Laser', links: laserLinks, to: '/services/laser' },
              ].map(({ key, label, links, to }) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between py-3 text-brand-heading text-base border-b border-brand-blush/30"
                  >
                    {label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${mobileExpanded === key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-1">
                          <Link to={to} className="block py-1.5 text-sm text-brand-heading font-semibold">View All</Link>
                          {links.map(l => (
                            <Link key={l.to} to={l.to} className="block py-1.5 text-sm text-brand-text">{l.label}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/gallery" className="block py-3 text-brand-heading text-base border-b border-brand-blush/30">Gallery</Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link to="/contact" className="block py-3 text-brand-heading text-base">Contact</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-[76px] md:h-[84px]" />
    </>
  )
}
