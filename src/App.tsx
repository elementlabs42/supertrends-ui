import { Route, Routes } from 'react-router-dom'
import GloablList from './pages/list/GlobalList'
import { SubTrend } from './pages/list/SubTrend'
import { TokenProvider } from './providers/token/provider'

function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/" element={<GloablList />} />
        <Route path="/subtrend/:tokenAddress" element={<SubTrend />} />
      </Routes>
    </TokenProvider>
  )
}

export default App
