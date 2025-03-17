import { Logo } from '../../icons/Logo'
import { NavLink } from 'react-router-dom'

interface Props {
  href: string
  className?: string
}

export function LinkedLogo({ href, className }: Props) {
  return (
    <NavLink to={href} className={className}>
      <Logo />
      Supertrends
    </NavLink>
  )
}
