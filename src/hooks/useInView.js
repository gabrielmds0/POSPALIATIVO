import { useEffect, useRef, useState } from 'react'

/**
 * Hook que detecta quando um elemento entra na viewport.
 * Útil para acionar animações de fade-in on scroll.
 *
 * @param {IntersectionObserverInit} options - Opções do IntersectionObserver
 * @returns {[React.RefObject, boolean]} - [ref para o elemento, booleano se está visível]
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options },
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // options estabilizado na chamada — FadeIn não repassa objetos voláteis

  return [ref, inView]
}
