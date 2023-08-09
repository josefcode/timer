import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'
import { DevToLogo, Timer, Scroll } from '@phosphor-icons/react'

export const Header = () => {
  return (
    <HeaderContainer>
      <figure>
        <DevToLogo size={40} weight="fill" />
      </figure>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
