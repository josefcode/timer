import { ReactNode, createContext, useState, useReducer, useEffect } from 'react'
import {  cycleReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptedNewCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'


interface CreateCycleData {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string | undefined
  task: string
  activeCycleId?: string | null
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

export interface CycleState {
  cycle: Cycle[]
  activeCycleId: string | null
}
export const CyclesContext = createContext({} as CyclesContextProps)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycleState, dispatch] = useReducer(cycleReducer, {
    cycle: [],
    activeCycleId: null
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem("@timer:cycle-state-1.0.0")
    console.log(storedStateAsJSON)
    if(storedStateAsJSON){
      return JSON.parse(storedStateAsJSON)
    }

    return initialState
  })

  const {cycle, activeCycleId} = cycleState
  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle){
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )
    }
    return 0
  })

  useEffect(()=> {
  const stateJSON = JSON.stringify(cycleState)

  localStorage.setItem("@timer:cycle-state-1.0.0", stateJSON)
  }, [cycleState])
  const setSecondPassed = (second: number) => setAmountSecondsPassed(second)

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }
  
  const interruptedNewCycle = () => {
    dispatch(interruptedNewCycleAction())
  }
  
  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
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
