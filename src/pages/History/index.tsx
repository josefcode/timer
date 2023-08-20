import { useContext } from 'react'
import { ButtonContainer, HistoryContainer, HistorySection, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useNavigate } from "react-router-dom";


export const History = () => {
  const { cycle } = useContext(CyclesContext)

const navigate = useNavigate();

  const clearHistory = () => {
    localStorage.removeItem("@timer:cycle-state-1.0.0")
    navigate('/')
    window.location.reload()
  }

  return (
    <HistoryContainer>
      <HistorySection>
        <h1>History menu</h1>
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycle?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmounts}</td>
                  <td>
                    {formatDistanceToNow(new Date(item.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {item.finishedDate && (
                      <Status statuscolor="green">Finished</Status>
                    )}
                    {item.interruptedDate && (
                      <Status statuscolor="red">Interrupted</Status>
                    )}
                    {!item.finishedDate && !item.interruptedDate && (
                      <Status statuscolor="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ButtonContainer onClick = {clearHistory}>Clear all history</ButtonContainer>
      </HistorySection>
    </HistoryContainer>
  )
}
