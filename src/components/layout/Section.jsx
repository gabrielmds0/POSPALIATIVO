/**
 * Section — wrapper semântico com espaçamento vertical consistente entre seções.
 * Spreads props adicionais (ex: aria-labelledby) diretamente no elemento Tag.
 */
export function Section({ children, className = '', id, as: Tag = 'section', ...props }) {
  const style = {
    contentVisibility: 'auto',
    containIntrinsicSize: '1px 900px',
    ...props.style,
  }

  return (
    <Tag id={id} className={`py-20 lg:py-28 ${className}`} {...props} style={style}>
      {children}
    </Tag>
  )
}
