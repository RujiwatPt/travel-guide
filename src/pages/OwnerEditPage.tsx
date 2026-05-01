import { useSearchParams } from 'react-router-dom'
import { entryByToken } from '../data/seed'

export default function OwnerEditPage() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const entry = token ? entryByToken(token) : undefined

  if (!entry) {
    return (
      <div className="p-8 text-center text-muted">
        <h1 className="text-xl font-bold text-ink mb-2">This link is no longer valid</h1>
        <p>Ask your contact for an updated edit link.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-ink">{entry.name_en}</h1>
      <p className="text-muted mt-1">Owner edit screen — full UI lands in Slice 7.</p>
      <p className="text-xs text-muted mt-4">Token resolved to: {entry.id}</p>
    </div>
  )
}
