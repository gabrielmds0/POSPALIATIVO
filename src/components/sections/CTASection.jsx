import { content } from '../../content/contentLoader'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'

/**
 * CTASection — seção de chamada final para ação.
 * Centralizada, com glow radial azul no fundo.
 */
export function CTASection({ onOpenModal }) {
  const { cta } = content

  return (
    <Section
      className="bg-surface-1 relative overflow-hidden"
      aria-labelledby="cta-headline"
    >
      {/* Glow radial de fundo */}
      <div
        className="absolute inset-0 bg-radial-accent pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <FadeIn className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <SectionLabel>{cta.sectionLabel}</SectionLabel>

          <h2 id="cta-headline" className="text-section font-bold text-white mb-4">
            {cta.headline}
          </h2>

          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            {cta.description}
          </p>

          <Button
            variant="solid"
            size="lg"
            onClick={onOpenModal}
            aria-label={cta.button.ariaLabel}
          >
            {cta.button.text}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  )
}
