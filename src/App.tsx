import { Route, Routes } from 'react-router-dom'
import EntryDetailPage from './pages/EntryDetailPage'
import MapPage from './pages/MapPage'
import NineMobileScreens from './pages/NineMobileScreens'
import OwnerEditPage from './pages/OwnerEditPage'

export default function App() {
  return (
    <Routes>
      <Route path="/figma-9-screens" element={<NineMobileScreens />} />
      <Route
        path="*"
        element={
          <div className="phone-frame">
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/entry/:id" element={<EntryDetailPage />} />
              <Route path="/owner/edit" element={<OwnerEditPage />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  )
}
