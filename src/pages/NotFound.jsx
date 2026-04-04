import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-brand-bg px-4 py-16 md:px-8 lg:px-16">
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <section className="container-max rounded-3xl border border-brand-card/80 bg-brand-section/35 p-8 text-center shadow-sm md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-brand-gold">404 Error</p>
        <h1 className="mt-3 text-4xl font-serif font-bold text-brand-heading md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-text md:text-lg">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Clinic
          </Link>
        </div>
      </section>
    </main>
  )
}
