import { content } from '../../content/contentLoader'
import { Button } from '../ui/Button'

/**
 * Header sticky com logo à esquerda e CTA à direita.
 */
export function Header({ onOpenModal }) {
  const { brand, header } = content

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(0,0,0,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" aria-label={`Página inicial — ${brand.name}`}>
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            width="300"
            height="129"
            fetchPriority="high"
            decoding="async"
            className="h-10 w-auto object-contain sm:h-11"
          />
        </a>

        {/* CTA */}
        <Button
          variant="solid"
          size="sm"
          onClick={onOpenModal}
          aria-label={header.cta.ariaLabel}
        >
          {header.cta.text}
        </Button>
      </div>
    </header>
  )
}
