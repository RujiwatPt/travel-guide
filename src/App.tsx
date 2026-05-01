import { Route, Routes } from 'react-router-dom'
import MapPage from './pages/MapPage'
import OwnerEditPage from './pages/OwnerEditPage'

export default function App() {
  return (
    <div className="phone-frame">
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/owner/edit" element={<OwnerEditPage />} />
      </Routes>
    </div>
  )
}
