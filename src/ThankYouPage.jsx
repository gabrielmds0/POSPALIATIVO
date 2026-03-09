import { useEffect, useMemo } from 'react'
import { content } from './content/contentLoader'
import { trackEvent } from './lib/tracking'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/L6cTiMmXsbf1Gi59ZuiEfD?mode=hq2tcli'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function buildWhatsappUrl() {
  const sourceUrl = new URL(window.location.href)
  const destinationUrl = new URL(WHATSAPP_GROUP_URL)

  for (const key of UTM_PARAMS) {
    const value = sourceUrl.searchParams.get(key)
    if (value) {
      destinationUrl.searchParams.set(key, value)
    }
  }

  return destinationUrl.toString()
}

/**
 * Pagina de obrigado com acesso ao grupo do WhatsApp.
 */
export default function ThankYouPage() {
  const { hero, institution } = content
  const whatsappGroupUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return WHATSAPP_GROUP_URL
    }
    return buildWhatsappUrl()
  }, [])

  const avifSrcSet = [
    `${hero.image.mobile.avif} 640w`,
    `${hero.image.tablet.avif} 960w`,
    `${hero.image.desktop.avif} 1400w`,
  ].join(', ')

  const webpSrcSet = [
    `${hero.image.mobile.webp} 640w`,
    `${hero.image.tablet.webp} 960w`,
    `${hero.image.desktop.webp} 1400w`,
  ].join(', ')

  useEffect(() => {
    document.title = 'Obrigado pela inscricao | Entre no grupo exclusivo do WhatsApp'

    trackEvent('thankyou_page_view', {
      page_type: 'obrigado',
      destination: 'whatsapp_group',
    })
  }, [])

  const handleWhatsappClick = (buttonLocation = 'primary_cta') => {
    trackEvent('whatsapp_click', {
      button_location: buttonLocation,
      destination: 'whatsapp_group',
    })
    window.location.assign(whatsappGroupUrl)
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-12 text-white md:py-20">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-card border border-white/10 bg-gradient-to-b from-surface-slate to-surface p-8 shadow-card-hover md:p-12">
        {/* Barra de progresso 90% */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-ghost">
              Progresso
            </span>
            <span className="text-xs font-semibold text-accent">90%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
              style={{ width: '90%' }}
            />
          </div>
        </div>

        <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
          Falta só mais um passo para ter acesso a essa oportunidade
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
          Clique no botão abaixo e entre para o grupo exclusivo de whatsapp
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleWhatsappClick}
            className="inline-flex min-h-[52px] items-center justify-center rounded-btn bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover"
          >
            Entrar para o Grupo VIP
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-card border border-white/15 bg-black/30">
          <picture>
            <source type="image/avif" srcSet={avifSrcSet} sizes="(max-width: 1024px) 100vw, 896px" />
            <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 1024px) 100vw, 896px" />
            <img
              src={hero.image.desktop.webp}
              alt={hero.image.alt}
              width="1400"
              height="1050"
              loading="eager"
              decoding="async"
              className="w-full object-cover object-top"
              style={{ aspectRatio: '4/3', display: 'block' }}
            />
          </picture>
        </div>

        <section className="mt-12 border-t border-white/10 pt-10">
          <p className="text-base leading-relaxed text-white/85 md:text-lg">
            {institution.description}
          </p>

          <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
            {institution.detail}
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => handleWhatsappClick('bottom_cta')}
              className="inline-flex min-h-[52px] items-center justify-center rounded-btn bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover"
            >
              Entrar para o Grupo VIP
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
