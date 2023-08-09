import { Play } from '@phosphor-icons/react'
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
} from './styles'

const newCycleFromValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task'),
  minutesAmount: zod.number().min(5).max(60),
})

type FormSubmitProps = zod.infer<typeof newCycleFromValidationSchema>

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormSubmitProps>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleFormSubmit = (data: FormSubmitProps) => {
    console.log(data)
    reset()
  }

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
              // max={60}
              {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>minutes.</span>
          </nav>
          <ul>
            <ListItem>0</ListItem>
            <ListItem>0</ListItem>
            <Separator>: </Separator>
            <ListItem>0</ListItem>
            <ListItem>0</ListItem>
          </ul>

          <StartCountButton type="submit" disabled={isSubmitDisabled}>
            <Play />
            Start
          </StartCountButton>
        </FormContainer>
      </section>
    </HomeContainer>
  )
}
