/**
 * Container — largura máxima centralizada com padding lateral responsivo.
 * Uso: envolva o conteúdo de cada seção para manter alinhamento consistente.
 */
export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
