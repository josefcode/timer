import { useContext } from 'react'
import { HandPalm, Play } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountButton,
  StopCountButton,
  FormContainer,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFromValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod.number().min(5).max(60),
})

type FormSubmitProps = zod.infer<typeof newCycleFromValidationSchema>

export const Home = () => {
  const { interruptedNewCycle, createNewCycle, activeCycle } =
    useContext(CyclesContext)

  const cycleForm = useForm<FormSubmitProps>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { reset, watch, handleSubmit } = cycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: FormSubmitProps) => {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <section>
        <FormContainer onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormProvider {...cycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activeCycle ? (
            <StopCountButton type="button" onClick={interruptedNewCycle}>
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
