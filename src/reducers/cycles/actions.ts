import { Cycle } from "../../contexts/CyclesContext"

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_FINISHED = 'MARK_CURRENT_CYCLE_FINISHED'
}

export const addNewCycleAction = (newCycle : Cycle) => {
   return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
          newCycle,
        }
      }
}

export const interruptedNewCycleAction = () => {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE
      }
 }

 export const markCurrentCycleAsFinishedAction = () => {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_FINISHED,
      }
 }