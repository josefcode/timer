import { CycleState } from "../../contexts/CyclesContext"
import { produce } from "immer"
import { ActionTypes } from "./actions"

export const cycleReducer = (state: CycleState, action: any)=>{
    switch(action.type){
      case ActionTypes.ADD_NEW_CYCLE:
        // return {
        //   ...state,
        //   cycle: [...state.cycle, action.payload.newCycle],
        //   activeCycleId: action.payload.newCycle.id
        // }
        return produce(state, draft => {
          draft.cycle.push(action.payload.newCycle)
          draft.activeCycleId = action.payload.newCycle.id
        })
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
        // return {
        //   ...state,
        //   cycle: state.cycle.map((info: Cycle) => {
        //         if (info.id === state.activeCycleId) {
        //           return { ...info, interruptedDate: new Date() }
        //         } else {
        //           return info
        //         }
        //       }),
        //   activeCycleId: null
        // }

        const currentCycleIndex = state.cycle.findIndex((info) => {
          return info.id === state.activeCycleId
        })

        if(currentCycleIndex < 0) {
          return state
        }

        return produce(state, draft => {
          draft.cycle[currentCycleIndex].interruptedDate = new Date()
          draft.activeCycleId = null
        })
      }
      case ActionTypes.MARK_CURRENT_CYCLE_FINISHED: { 
      // return {
      //   ...state,
      //   cycle: state.cycle.map((info: Cycle) => {
      //         if (info.id === state.activeCycleId) {
      //           return { ...info, finishedDate: new Date() }
      //         } else {
      //           return info
      //         }
      //       }),
      //   activeCycleId: null
      // }
      const currentCycleIndex = state.cycle.findIndex((info) => {
        return info.id === state.activeCycleId
      })

      if(currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycle[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
    return state;
    }
  }