import { content } from '../../content/contentLoader'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { FadeIn } from '../ui/FadeIn'

/**
 * Professor — apresentação do Dr. Gutembergue.
 * Layout 2 colunas no desktop: foto à esquerda, bio à direita.
 */
export function Professor() {
  const { professor } = content

  return (
    <Section className="bg-surface-2" aria-labelledby="professor-name">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Foto */}
          <FadeIn className="flex justify-center">
            <img
              src={professor.image.src}
              alt={professor.image.alt}
              width="800"
              height="533"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(min-width: 1024px) 384px, 90vw"
              className="rounded-2xl w-full max-w-sm object-cover shadow-xl border border-white/10"
            />
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={80}>
            <SectionLabel>{professor.sectionLabel}</SectionLabel>
            <h2 id="professor-name" className="text-section font-bold text-white mb-6">
              {professor.name}
            </h2>

            {professor.bio && (
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {professor.bio}
              </p>
            )}

            <ul className="space-y-3">
              {professor.credentials.map((cred, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <span
                    className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {cred}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
