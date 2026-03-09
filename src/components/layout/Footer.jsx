import { content } from '../../content/contentLoader'
import { Container } from './Container'

/**
 * Footer com logo, tagline e copyright.
 */
export function Footer() {
  const { brand, footer } = content

  return (
    <footer className="bg-surface-1 py-12 border-t border-white/5">
      <Container className="text-center">
        <img
          src={brand.logo.src}
          alt={brand.logo.alt}
          width="300"
          height="129"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="h-10 w-auto object-contain mx-auto mb-4"
        />
        <p className="text-gray-400 text-sm mb-6 italic">{footer.tagline}</p>
        <p className="text-gray-500 text-label uppercase">{footer.copyright}</p>
      </Container>
    </footer>
  )
}
