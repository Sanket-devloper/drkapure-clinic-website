import { useEffect, useMemo, useState } from 'react'
import galleryManifest from '../data/galleryManifest'

const fallbackSquare =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200' viewBox='0 0 1200 1200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f3ece6'/%3E%3Cstop offset='1' stop-color='%23eaded3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='1200' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23806f62' font-size='42' font-family='Inter, Arial, sans-serif'%3EClinic Result%3C/text%3E%3C/svg%3E"

const sections = [
  { key: 'all', label: 'All' },
  { key: 'hair', label: 'Hair' },
  { key: 'skin', label: 'Skin' },
  { key: 'laser', label: 'Laser' },
]

const galleryImages = Object.entries(galleryManifest).flatMap(([section, images]) =>
  images.map((src, index) => ({
    id: `${section}-${index + 1}`,
    section,
    src,
    alt: `${section} clinic result ${index + 1}`,
  }))
)

export default function Gallery() {
  const [activeSection, setActiveSection] = useState('all')
  const [modalImages, setModalImages] = useState([])
  const [modalIndex, setModalIndex] = useState(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const visibleImages = useMemo(() => {
    if (activeSection === 'all') {
      return galleryImages
    }

    return galleryImages.filter((item) => item.section === activeSection)
  }, [activeSection])

  const activeCount = visibleImages.length
  const isModalOpen = modalIndex !== null
  const currentImage = isModalOpen ? modalImages[modalIndex] : null

  const closeModal = () => {
    setModalIndex(null)
    setModalImages([])
    setScale(1)
    setOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const openModal = (index) => {
    setModalImages(visibleImages)
    setModalIndex(index)
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const goNext = () => {
    if (!isModalOpen || !modalImages.length) return
    setModalIndex((prev) => (prev + 1) % modalImages.length)
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const goPrev = () => {
    if (!isModalOpen || !modalImages.length) return
    setModalIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length)
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(4, Number((prev + 0.25).toFixed(2))))
  }

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(1, Number((prev - 0.25).toFixed(2)))
      if (next === 1) {
        setOffset({ x: 0, y: 0 })
      }
      return next
    })
  }

  const resetZoom = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const onWheelZoom = (event) => {
    event.preventDefault()
    if (event.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  useEffect(() => {
    if (!isModalOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === '+') zoomIn()
      if (event.key === '-') zoomOut()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isModalOpen, modalImages.length])

  return (
    <main className="min-h-screen bg-[#f7f2ed] font-sans">
      <section className="px-6 pt-10 pb-12 md:pt-12 md:pb-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-[0.16em]">Clinic Gallery</p>

          <h1 className="mt-5 font-serif tracking-tight leading-[1.1] text-brand-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold">
            Real Transformations,
            <span className="block text-brand-gold"> Beautifully Presented</span>
          </h1>

          <p className="mt-5 max-w-[660px] text-base leading-relaxed text-brand-text sm:text-lg">
            Browse authentic before-and-after clinic results curated by category.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {sections.map((section) => {
              const isActive = activeSection === section.key
              const count =
                section.key === 'all'
                  ? galleryImages.length
                  : galleryImages.filter((item) => item.section === section.key).length

              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-transparent bg-gradient-to-r from-[#d68860] to-[#be6f4f] text-white shadow-lg'
                      : 'border-[#ded4ca] bg-white text-[#756b63] shadow-sm hover:shadow-md'
                  }`}
                >
                  <span>{section.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/25' : 'bg-[#f3ece6]'}`}>{count}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-5 text-sm text-[#9a8f86]">Showing {activeCount} images</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleImages.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#e7ddd3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <button
                  type="button"
                  onClick={() => openModal(index)}
                  className="relative block aspect-square w-full overflow-hidden bg-[#efe6dd] text-left"
                  aria-label={`Open full view for ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = fallbackSquare
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {item.section}
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && currentImage && (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 text-white md:px-6">
              <p className="text-sm font-medium uppercase tracking-wide">
                {currentImage.section} image {modalIndex + 1} / {modalImages.length}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={zoomOut} className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10">-</button>
                <button type="button" onClick={zoomIn} className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10">+</button>
                <button type="button" onClick={resetZoom} className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10">Reset</button>
                <button type="button" onClick={closeModal} className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10">Close</button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden" onWheel={onWheelZoom}>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-xl text-white hover:bg-black/70"
                aria-label="Previous image"
              >
                ‹
              </button>

              <div
                className="flex h-full items-center justify-center p-4 md:p-10"
                onMouseMove={(event) => {
                  if (!isDragging || scale <= 1) return
                  setOffset({
                    x: event.clientX - dragStart.x,
                    y: event.clientY - dragStart.y,
                  })
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  onError={(event) => {
                    event.currentTarget.src = fallbackSquare
                  }}
                  onDoubleClick={() => {
                    if (scale > 1) {
                      resetZoom()
                    } else {
                      setScale(2)
                    }
                  }}
                  onMouseDown={(event) => {
                    if (scale <= 1) return
                    setIsDragging(true)
                    setDragStart({
                      x: event.clientX - offset.x,
                      y: event.clientY - offset.y,
                    })
                  }}
                  draggable={false}
                  className="max-h-full max-w-full select-none rounded-xl shadow-2xl"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform 180ms ease',
                    cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                  }}
                />
              </div>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-xl text-white hover:bg-black/70"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
