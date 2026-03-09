import { content } from '../../content/contentLoader'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { FadeIn } from '../ui/FadeIn'

/**
 * EventPlan — agenda da live em 3 tópicos.
 * Cards com glassmorphism, número em azul, lista de bullets.
 */
export function EventPlan() {
  const { eventPlan } = content

  return (
    <Section className="bg-surface-1" aria-labelledby="eventplan-headline">
      <Container>
        <FadeIn className="text-center mb-14">
          <SectionLabel>{eventPlan.sectionLabel}</SectionLabel>
          <h2 id="eventplan-headline" className="text-section font-bold text-white max-w-2xl mx-auto">
            {eventPlan.headline}
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {eventPlan.topics.map((topic, i) => (
            <FadeIn key={topic.id} delay={i * 60}>
              <article className="glass rounded-card p-8 hover-glow h-full flex flex-col">
                {/* Número */}
                <span
                  className="text-4xl font-bold text-accent mb-4 leading-none"
                  aria-hidden="true"
                >
                  {topic.number}
                </span>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                  {topic.title}
                </h3>

                {/* Intro opcional */}
                {topic.intro && (
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {topic.intro}
                  </p>
                )}

                {/* Lista */}
                <ul className="space-y-2 flex-1">
                  {topic.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Nota */}
                {topic.note && (
                  <p className="mt-6 text-xs text-accent-light leading-relaxed border-t border-white/5 pt-4">
                    {topic.note}
                  </p>
                )}
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
