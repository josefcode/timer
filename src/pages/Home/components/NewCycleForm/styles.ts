import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
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

export const ButtonBase = styled.button`
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

export const StartCountButton = styled(ButtonBase)``

export const StopCountButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
