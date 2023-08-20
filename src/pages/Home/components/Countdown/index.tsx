import { differenceInSeconds } from 'date-fns'
import { ListItem, Separator, CountDownContainer } from './styles'
import { useEffect, useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmounts * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: NodeJS.Timeout // Declare the interval variable with type annotation

    if (activeCycle) {
      interval = setInterval((): void => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
  ])

  return (
    <CountDownContainer>
      <ListItem>{minutes[0]}</ListItem>
      <ListItem>{minutes[1]}</ListItem>
      <Separator>: </Separator>
      <ListItem>{seconds[0]}</ListItem>
      <ListItem>{seconds[1]}</ListItem>
    </CountDownContainer>
  )
}
