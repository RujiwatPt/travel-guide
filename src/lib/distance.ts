// Haversine — kilometers between two lat/lng points.
const R_KM = 6371

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng
  return 2 * R_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}
