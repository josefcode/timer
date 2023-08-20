import styled from 'styled-components'

export const CountDownContainer = styled.ul`
  list-style: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;
`
export const ListItem = styled.li`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 2rem 1rem;
  border-radius: 8px;
  @media (max-width: 480px) {
    font-size: 3rem
    }
`
export const Separator = styled.li`
  background-color: transparent !important;
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  display: flex;
  overflow: hidden;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 3rem
    }
`
