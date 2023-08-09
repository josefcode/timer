import { HistoryContainer, HistorySection, Status } from './styles'

export const History = () => {
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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>3 months ago</td>
              <td>
                <Status statusColor="yellow">3 months ago</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>3 months ago</td>
              <td>
                <Status statusColor="red">3 months ago</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>3 months ago</td>
              <td>
                <Status statusColor="green">3 months ago</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>3 months ago</td>
              <td>
                <Status statusColor="yellow">3 months ago</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistorySection>
    </HistoryContainer>
  )
}
