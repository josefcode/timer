import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;

  nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${(props) => props.theme['gray-100']};
    flex-wrap: wrap;
    font-size: 1.125rem;
    font-weight: bold;
  }
  ul {
    list-style: none;
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${(props) => props.theme['gray-100']};
    display: flex;
    gap: 1rem;
  }
`
export const ListItem = styled.li`
  background-color: ${(props) => props.theme['gray-700']};
  padding: 2rem 1rem;
  border-radius: 8px;
`

export const Separator = styled.li`
  background-color: transparent !important;
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  display: flex;
  overflow: hidden;
  justify-content: center;
`
const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: unset;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`
export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinuteAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const StartCountButton = styled.button`
  width: 100%;
  border: unset;
  padding: 1rem;
  border-radius: 8px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
