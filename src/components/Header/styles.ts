import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
`
export const NavContainer = styled.nav`
display: flex;
gap: 0.5rem;
margin-left: auto;

a {
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme['gray-100']};
  border-block: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme['green-500']};
  }

  &.active {
    color: ${(props) => props.theme['green-500']};
  }
}
`