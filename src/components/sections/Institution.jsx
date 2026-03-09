import { content } from '../../content/contentLoader'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { FadeIn } from '../ui/FadeIn'

/**
 * Institution — apresentação da Liberdade Médica.
 */
export function Institution() {
  const { institution } = content

  return (
    <Section className="bg-surface" aria-labelledby="institution-name">
      <Container>
        {/* Cabeçalho */}
        <FadeIn className="mb-12">
          <SectionLabel>{institution.sectionLabel}</SectionLabel>
          <h2 id="institution-name" className="text-section font-bold text-white max-w-xl">
            {institution.name}
          </h2>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Textos */}
          <FadeIn>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              {institution.description}
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              {institution.detail}
            </p>
          </FadeIn>

          {/* Imagem */}
          <FadeIn delay={80}>
            <img
              src={institution.image.src}
              alt={institution.image.alt}
              width="720"
              height="720"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="rounded-2xl w-full object-cover max-h-72 border border-white/10 shadow-xl"
            />
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
