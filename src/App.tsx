import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/default'
import { GlobaleStyle } from './styles/globalStyle'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobaleStyle />
    </ThemeProvider>
  )
}

export default App
