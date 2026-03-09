import { useInView } from '../../hooks/useInView'

/**
 * FadeIn — fade-in leve ao entrar na viewport.
 * Duração curta (0.35s), translação mínima (10px) para máxima fluidez.
 */
export function FadeIn({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: inView
          ? `opacity 0.35s ease ${delay}ms, transform 0.35s ease ${delay}ms`
          : 'none',
      }}
    >
      {children}
    </div>
  )
}
