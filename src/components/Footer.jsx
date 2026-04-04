import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react'

function openExternal(event, url) {
  event.preventDefault()
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="container-max px-4 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Dr. Kapure's Hair Skin Laser Clinic"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-heading font-semibold text-lg md:text-xl leading-none tracking-[0.02em]">Dr. Kapure's</p>
                <p className="text-brand-label text-[11px] md:text-xs uppercase tracking-[0.12em] mt-0.5">Hair Skin Laser Clinic</p>
              </div>
            </div>
            <p className="text-brand-label text-sm leading-relaxed">
              Where science meets beauty. Advanced hair, skin and laser treatments
              with personalized care for every patient.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/dr_smita_kapure_/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={(event) => openExternal(event, 'https://www.instagram.com/dr_smita_kapure_/')} className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white text-brand-gold transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/amrita.heda/reels/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" onClick={(event) => openExternal(event, 'https://www.facebook.com/amrita.heda/reels/')} className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white text-brand-gold transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="https://www.youtube.com/@smitakapure" aria-label="YouTube" target="_blank" rel="noopener noreferrer" onClick={(event) => openExternal(event, 'https://www.youtube.com/@smitakapure')} className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white text-brand-gold transition-all duration-300">
                <Youtube size={16} />
              </a>
              <a href="https://wa.me/918329467612" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" onClick={(event) => openExternal(event, 'https://wa.me/918329467612')} className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white text-brand-gold transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Quick Links</h3>
            <div className="space-y-2">
              {[
                { day: 'Morning', time: '10:00 AM – 2:00 PM' },
                { day: 'Evening', time: '5:00 PM – 9:00 PM' },
                { label: 'Skin Treatments', to: '/services/skin' },
                { label: 'Hair Treatments', to: '/services/hair' },
                { label: 'Laser Treatments', to: '/services/laser' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact Us', to: '/contact' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-brand-label hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+918329467612" className="flex items-center gap-3 group">
                <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-brand-gold transition-colors shrink-0">
                  <Phone size={15} className="text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-brand-label group-hover:text-white transition-colors">+91 8329467612</span>
              </a>
              <a href="mailto:drkapuresclinic1@gmail.com" className="flex items-center gap-3 group">
                <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-brand-gold transition-colors shrink-0">
                  <Mail size={15} className="text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-brand-label group-hover:text-white transition-colors">drkapuresclinic1@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/place/Dr.KAPURE%E2%80%99S+HAIR+%7C+SKIN+%7C+LASER+CLINIC/@18.663708,73.8012567,17z/data=!4m15!1m8!3m7!1s0x3bc2b829bf0797a1:0x91685ac641bef6aa!2sShivaji+Park+Trail,+Sector+No.+18,+Chinchwad,+Pimpri-Chinchwad,+Maharashtra+411019!3b1!8m2!3d18.663708!4d73.8012567!16s%2Fg%2F11kxgwcwn5!3m5!1s0x3bc2b96dfb491fe9:0xe7698368afb94c59!8m2!3d18.6647085!4d73.7990569!16s%2Fg%2F11vqh4lsxj?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
                aria-label="Open clinic location on map"
              >
                <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-brand-gold transition-colors shrink-0">
                  <MapPin size={15} className="text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-brand-label leading-relaxed group-hover:text-white transition-colors">Shivaji Park Trail, Sambhajinagar,<br />Chinchwad, Pune, Vitthal Nagar, Maharashtra 411019, India</span>
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Opening Hours</h3>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={15} className="text-brand-gold" />
              <span className="text-sm text-brand-label font-medium">Clinic Timings</span>
            </div>
            <div className="space-y-2">
              {[
                { day: 'Morning', time: '10:00 AM – 2:00 PM' },
                { day: 'Evening', time: '5:00 PM – 9:00 PM' },
                { day: 'Sunday', time: 'By Appointment' },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-brand-label">{day}</span>
                  <span className="text-brand-label font-medium">{time}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary text-sm py-2.5 w-full justify-center">
              Book Appointment
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-brand-label/70">
          <p>© 2025 Dr. Kapure's Hair Skin Laser Clinic. All rights reserved.</p>
          <p>Designed with care for better skin &amp; hair health</p>
        </div>
      </div>
    </footer>
  )
}
