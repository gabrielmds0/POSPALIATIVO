import { content } from '../../content/contentLoader'
import { Button } from '../ui/Button'

/**
 * Hero section with responsive media for faster LCP on mobile.
 */
export function Hero({ onOpenModal }) {
  const { hero } = content

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

  return (
    <section className="relative bg-black" aria-labelledby="hero-headline">
      <div className="relative overflow-hidden lg:absolute lg:inset-0 lg:h-full">
        <picture>
          <source type="image/avif" srcSet={avifSrcSet} sizes="100vw" />
          <source type="image/webp" srcSet={webpSrcSet} sizes="100vw" />
          <img
            src={hero.image.desktop.webp}
            alt={hero.image.alt}
            width="1400"
            height="1050"
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className={[
              'w-full object-cover lg:h-full lg:origin-right',
              '[object-position:62%_12%]',
              'sm:[object-position:58%_14%]',
              'md:[object-position:56%_16%]',
              'lg:[object-position:100%_18%]',
              'xl:[object-position:100%_20%]',
              '2xl:[object-position:100%_22%]',
              'lg:scale-[1.12] lg:translate-x-[10%]',
            ].join(' ')}
            style={{ aspectRatio: '4/3', display: 'block' }}
          />
        </picture>

        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000 10%, transparent 100%)' }}
          aria-hidden="true"
        />

        <div className="absolute top-4 left-4 lg:hidden">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(46,82,235,0.45)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            <span className="text-label uppercase tracking-[0.2em] text-accent font-semibold">
              Ao vivo
            </span>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(94deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.62) 44%, rgba(0,0,0,0.24) 58%, rgba(0,0,0,0.05) 72%, rgba(0,0,0,0) 84%)',
        }}
        aria-hidden="true"
      />

      <div
        className={[
          'relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-none lg:px-10 xl:px-14 2xl:px-20',
          'pt-8 pb-16 lg:flex lg:min-h-screen lg:items-center lg:pt-28 lg:pb-20',
        ].join(' ')}
      >
        <div className="max-w-xl lg:max-w-[560px] xl:max-w-[620px]">
          <div className="hidden lg:inline-flex mb-6 items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            <span className="text-label uppercase tracking-[0.2em] text-accent font-semibold">
              Ao vivo
            </span>
          </div>

          <h1 id="hero-headline" className="text-hero font-bold text-white leading-tight mb-5">
            {hero.headline}
          </h1>

          <div className="w-10 h-0.5 bg-accent mb-5 rounded-full" aria-hidden="true" />

          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">{hero.subtitle}</p>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">{hero.description}</p>

          <ul className="flex flex-wrap gap-2 mb-9" aria-label="Caracteristicas do evento">
            {hero.badges.map((badge) => (
              <li
                key={badge.id}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                {badge.text}
              </li>
            ))}
          </ul>

          <Button variant="solid" size="lg" onClick={onOpenModal} aria-label={hero.cta.ariaLabel}>
            {hero.cta.text}
          </Button>
        </div>
      </div>
    </section>
  )
}
