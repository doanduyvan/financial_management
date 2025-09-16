import AppRoutes from '@/routes/AppRoutes'
import { BrowserRouter } from "react-router-dom"
import './App.css'
import { AppProvider } from './contexts/AppContext'
function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
