import { useContext } from 'react'
import { HistoryContainer, HistorySection, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'

export const History = () => {
  const { cycle } = useContext(CyclesContext)

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
            {cycle.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmounts}</td>
                  <td>
                    {formatDistanceToNow(item.startDate, {
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
      </HistorySection>
    </HistoryContainer>
  )
}
