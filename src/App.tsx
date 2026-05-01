import { Route, Routes } from 'react-router-dom'
import BookingHubPage from './pages/BookingHubPage'
import EntryDetailPage from './pages/EntryDetailPage'
import ExploreVibesPage from './pages/ExploreVibesPage'
import HomePage from './pages/HomePage'
import LocalExperiencesPage from './pages/LocalExperiencesPage'
import MapPage from './pages/MapPage'
import NineMobileScreens from './pages/NineMobileScreens'
import NotificationsPage from './pages/NotificationsPage'
import OwnerEditPage from './pages/OwnerEditPage'
import ProfilePage from './pages/ProfilePage'
import TripJournalPage from './pages/TripJournalPage'

export default function App() {
  return (
    <Routes>
      <Route path="/figma-9-screens" element={<NineMobileScreens />} />
      <Route
        path="*"
        element={
          <div className="phone-frame">
            <Routes>
              {/* / — kit Home destination-card hub for NKP themes */}
              <Route path="/" element={<HomePage />} />
              {/* /app — the working interactive app (Leaflet + chatbot + sheet + sync) */}
              <Route path="/app" element={<MapPage />} />
              {/* Kit-faithful pages with NKP data */}
              <Route path="/explore" element={<ExploreVibesPage />} />
              <Route path="/local" element={<LocalExperiencesPage />} />
              <Route path="/booking" element={<BookingHubPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/journal" element={<TripJournalPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Existing */}
              <Route path="/entry/:id" element={<EntryDetailPage />} />
              <Route path="/owner/edit" element={<OwnerEditPage />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  )
}
