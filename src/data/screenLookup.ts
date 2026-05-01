// Convenience lookups for the v4 pixel-faithful pages.
import { editableFigmaScreens, type EditableFigmaScreen } from '../figmaEditableData'

export function screenByName(name: string): EditableFigmaScreen | undefined {
  return editableFigmaScreens.find((s) => s.name === name)
}

export const HOME_SCREEN              = screenByName('Home')!
export const PROFILE_SCREEN           = screenByName('Profile')!
export const PLACE_DETAILS_SCREEN     = screenByName('Place Details Page')!
export const LOCAL_EXPERIENCES_SCREEN = screenByName('Local Experiences & Food- Explore')!
export const BOOKING_HUB_SCREEN       = screenByName('Booking Hub')!
export const NOTIFICATIONS_SCREEN     = screenByName('9. Notifications & Alerts')!
export const EXPLORE_VIBES_SCREEN     = screenByName('Explore new VIbes')!
export const TRIP_JOURNAL_SCREEN      = screenByName('Trip Journal')!
export const PLAN_A_TRIP_SCREEN       = screenByName('Plan A Trip')!
