import { Suspense, lazy, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { EventPlan } from './components/sections/EventPlan'
import { Professor } from './components/sections/Professor'
import { Institution } from './components/sections/Institution'
import { CTASection } from './components/sections/CTASection'
import { trackEvent } from './lib/tracking'

const RegisterModal = lazy(() =>
  import('./components/ui/RegisterModal').then((module) => ({
    default: module.RegisterModal,
  })),
)

/**
 * App - raiz da landing page.
 */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (section = 'unknown', buttonLocation = 'unknown') => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: `${section}_${buttonLocation}`,
      section,
      button_location: buttonLocation,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="min-h-screen bg-surface text-white">
      <Header onOpenModal={() => openModal('header', 'topbar')} />

      <main>
        <Hero onOpenModal={() => openModal('hero', 'primary')} />
        <EventPlan />
        <Professor />
        <Institution />
        <CTASection onOpenModal={() => openModal('final_cta', 'section')} />
      </main>

      <Footer />

      {isModalOpen && (
        <Suspense fallback={null}>
          <RegisterModal onClose={closeModal} />
        </Suspense>
      )}
    </div>
  )
}
