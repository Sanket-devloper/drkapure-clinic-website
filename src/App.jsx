import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ScrollToTop from './components/ScrollToTop'
import SeoManager from './components/SeoManager'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SkinServices = lazy(() => import('./pages/services/SkinServices'))
const HairServices = lazy(() => import('./pages/services/HairServices'))
const LaserServices = lazy(() => import('./pages/services/LaserServices'))

const AcneTreatment = lazy(() => import('./treatments/skin/AcneTreatment'))
const AntiAging = lazy(() => import('./treatments/skin/AntiAging'))
const Pigmentation = lazy(() => import('./treatments/skin/Pigmentation'))
const HydraFacial = lazy(() => import('./treatments/skin/HydraFacial'))
const MediFacial = lazy(() => import('./treatments/skin/MediFacial'))
const SkinTightening = lazy(() => import('./treatments/skin/SkinTightening'))
const GlutathioneIV = lazy(() => import('./treatments/skin/GlutathioneIV'))
const VampireFacial = lazy(() => import('./treatments/skin/VampireFacial'))
const SkinBrightening = lazy(() => import('./treatments/skin/SkinBrightening'))
const ScarTreatment = lazy(() => import('./treatments/skin/ScarTreatment'))

const PRPTherapy = lazy(() => import('./treatments/hair/PRPTherapy'))
const GFCTherapy = lazy(() => import('./treatments/hair/GFCTherapy'))
const Mesotherapy = lazy(() => import('./treatments/hair/Mesotherapy'))
const HairTransplant = lazy(() => import('./treatments/hair/HairTransplant'))
const HairRegrowth = lazy(() => import('./treatments/hair/HairRegrowth'))
const LowLightLaserTreatment = lazy(() => import('./treatments/hair/LowLightLaserTreatment'))
const MicroNeedling = lazy(() => import('./treatments/hair/MicroNeedling'))

const LaserHairRemoval = lazy(() => import('./treatments/laser/LaserHairRemoval'))
const CarbonLaserFacial = lazy(() => import('./treatments/laser/CarbonLaserFacial'))
const QSwitchLaser = lazy(() => import('./treatments/laser/QSwitchLaser'))
const FractionalCO2 = lazy(() => import('./treatments/laser/FractionalCO2'))
const IPLTreatment = lazy(() => import('./treatments/laser/IPLTreatment'))

function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <ScrollToTop />
      <Navbar />
      <FloatingButtons />
      <Suspense fallback={<main className="min-h-[40vh]" />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/skin" element={<SkinServices />} />
          <Route path="/services/hair" element={<HairServices />} />
          <Route path="/services/laser" element={<LaserServices />} />

          {/* Skin Treatments */}
          <Route path="/treatments/skin/acne-treatment" element={<AcneTreatment />} />
          <Route path="/treatments/skin/anti-aging" element={<AntiAging />} />
          <Route path="/treatments/skin/pigmentation" element={<Pigmentation />} />
          <Route path="/treatments/skin/hydrafacial" element={<HydraFacial />} />
          <Route path="/treatments/skin/medi-facial" element={<MediFacial />} />
          <Route path="/treatments/skin/skin-tightening" element={<SkinTightening />} />
          <Route path="/treatments/skin/glutathione-iv" element={<GlutathioneIV />} />
          <Route path="/treatments/skin/vampire-facial" element={<VampireFacial />} />
          <Route path="/treatments/skin/skin-brightening" element={<SkinBrightening />} />
          <Route path="/treatments/skin/scar-treatment" element={<ScarTreatment />} />

          {/* Hair Treatments */}
          <Route path="/treatments/hair/prp-therapy" element={<PRPTherapy />} />
          <Route path="/treatments/hair/gfc-therapy" element={<GFCTherapy />} />
          <Route path="/treatments/hair/mesotherapy" element={<Mesotherapy />} />
          <Route path="/treatments/hair/hair-transplant" element={<HairTransplant />} />
          <Route path="/treatments/hair/hair-regrowth" element={<HairRegrowth />} />
          <Route path="/treatments/hair/low-light-laser-treatment" element={<LowLightLaserTreatment />} />
          <Route path="/treatments/hair/micro-needling" element={<MicroNeedling />} />

          {/* Laser Treatments */}
          <Route path="/treatments/laser/laser-hair-removal" element={<LaserHairRemoval />} />
          <Route path="/treatments/laser/carbon-laser-facial" element={<CarbonLaserFacial />} />
          <Route path="/treatments/laser/q-switch-laser" element={<QSwitchLaser />} />
          <Route path="/treatments/laser/fractional-co2" element={<FractionalCO2 />} />
          <Route path="/treatments/laser/ipl-treatment" element={<IPLTreatment />} />

          {/* Route Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
