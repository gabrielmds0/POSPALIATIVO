/**
 * SectionLabel — label uppercase contextualizado, exibido acima dos H2.
 * Segue o padrão tipográfico do guia visual: 12px, uppercase, tracking 0.2em, gray-400.
 */
export function SectionLabel({ children }) {
  return (
    <p className="text-label uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
      {children}
    </p>
  )
}
