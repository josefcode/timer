import { useEffect, useState } from 'react'
import { HandPalm, Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  FormContainer,
  HomeContainer,
  StartCountButton,
  ListItem,
  Separator,
  TaskInput,
  MinuteAmountInput,
  StopCountButton,
} from './styles'
import { differenceInSeconds } from 'date-fns'

const newCycleFromValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod.number().min(5).max(60),
})

type FormSubmitProps = zod.infer<typeof newCycleFromValidationSchema>

interface Cycle {
  id: string | undefined
  task: string
  minutesAmounts: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<FormSubmitProps>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmounts * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: NodeJS.Timeout // Declare the interval variable with type annotation

    if (activeCycle) {
      interval = setInterval((): void => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycle((state) =>
            state.map((cycle: Cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, setCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleFormSubmit = (data: FormSubmitProps) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmount,
      startDate: new Date(),
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const handleInterrupteCycle = () => {
    setCycle((state) =>
      state.map((cycle: Cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <section>
        <FormContainer onSubmit={handleSubmit(handleFormSubmit)} action="">
          <nav>
            <label htmlFor="task">I will work in</label>
            <TaskInput
              id="task"
              placeholder="add a task"
              list="task-suggestions"
              disabled={!!activeCycle}
              {...register('task')}
            />

            <datalist id="task-suggestions">
              <option value="Project 1" />
              <option value="Project 2" />
              <option value="Project 3" />
              <option value="Project 4" />
              <option value="Project 5" />
            </datalist>
            <label htmlFor="minutesAmount">durante</label>
            <MinuteAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              step={5}
              min={5}
              disabled={!!activeCycle}
              {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>minutes.</span>
          </nav>
          <ul>
            <ListItem>{minutes[0]}</ListItem>
            <ListItem>{minutes[1]}</ListItem>
            <Separator>: </Separator>
            <ListItem>{seconds[0]}</ListItem>
            <ListItem>{seconds[1]}</ListItem>
          </ul>
          {activeCycle ? (
            <StopCountButton type="button" onClick={handleInterrupteCycle}>
              <HandPalm size={24} />
              stop
            </StopCountButton>
          ) : (
            <StartCountButton type="submit" disabled={isSubmitDisabled}>
              <Play />
              Start
            </StartCountButton>
          )}
        </FormContainer>
      </section>
    </HomeContainer>
  )
}
