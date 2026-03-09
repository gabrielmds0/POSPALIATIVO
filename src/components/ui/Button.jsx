/**
 * Button — componente de botão reutilizável.
 *
 * Variantes:
 *   - solid: fundo azul sólido (CTA principal)
 *   - ghost: borda azul, fundo transparente
 *
 * Tamanhos:
 *   - sm: compacto (header)
 *   - md: padrão
 *   - lg: destaque máximo (hero, CTA final)
 */
const variants = {
  solid: [
    'bg-accent text-white',
    'hover:bg-accent-dark',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'active:scale-95',
    'shadow-btn hover:shadow-btn-hover',
  ].join(' '),

  ghost: [
    'bg-transparent text-accent border border-accent',
    'hover:bg-accent/10',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'active:scale-95',
  ].join(' '),
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base font-semibold',
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-btn font-medium',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
