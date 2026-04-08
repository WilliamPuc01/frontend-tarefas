import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'    // ✅ L maiúsculo
import Tarefas from './pages/Tarefas' // ✅ T maiúsculo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tarefas" element={<Tarefas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App