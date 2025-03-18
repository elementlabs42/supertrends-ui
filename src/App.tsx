import { Route, Routes } from 'react-router-dom'
import GloablList from './pages/list/GlobalList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GloablList />} />
    </Routes>
  )
}

export default App
