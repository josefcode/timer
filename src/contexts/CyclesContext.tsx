import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string | undefined
  task: string
  minutesAmounts: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextProps {
  cycle: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondPassed: (second: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptedNewCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextProps)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const setSecondPassed = (second: number) => setAmountSecondsPassed(second)

  const markCurrentCycleAsFinished = () => {
    setCycle((state) =>
      state.map((cycle: Cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const createNewCycle = (data: CreateCycleData) => {
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
  }

  const interruptedNewCycle = () => {
    setCycle((state) =>
      state.map((cycle: Cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycle,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondPassed,
        createNewCycle,
        interruptedNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
