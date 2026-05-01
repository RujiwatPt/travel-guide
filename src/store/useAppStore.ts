import { create } from 'zustand'
import { ENTRIES, OWNERS, STATUS_LOG } from '../data/seed'
import { fetchEntries } from '../lib/api'
import type { Entry, LiveStatus, Owner, StatusLogEntry } from '../types'

type State = {
  entries: Entry[]
  owners: Owner[]
  statusLog: StatusLogEntry[]

  getEntryById: (id: string) => Entry | undefined
  getEntryByToken: (token: string) => Entry | undefined
  getOwnerById: (id: string) => Owner | undefined
  getEntriesForOwner: (ownerId: string) => Entry[]
  getRecentUpdates: (entryId: string, limit?: number) => StatusLogEntry[]
  hydrateEntriesFromApi: (city?: string) => Promise<void>

  updateEntryStatus: (
    entryId: string,
    update: { live_status?: LiveStatus | null; status_note?: string | null },
  ) => void
}

let logIdCounter = STATUS_LOG.length + 1

export const useAppStore = create<State>((set, get) => ({
  entries: ENTRIES,
  owners: OWNERS,
  statusLog: STATUS_LOG,

  getEntryById: (id) => get().entries.find((e) => e.id === id),
  getEntryByToken: (token) => get().entries.find((e) => e.owner_edit_token === token),
  getOwnerById: (id) => get().owners.find((o) => o.id === id),
  getEntriesForOwner: (ownerId) => get().entries.filter((e) => e.owner_id === ownerId),
  getRecentUpdates: (entryId, limit = 3) =>
    get()
      .statusLog
      .filter((row) => row.entry_id === entryId)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, limit),

  hydrateEntriesFromApi: async (city = 'nkp') => {
    try {
      const remoteEntries = await fetchEntries(city)
      if (!Array.isArray(remoteEntries) || remoteEntries.length === 0) return
      set((state) => {
        const byId = new Map(state.entries.map((e) => [e.id, e]))
        const merged = remoteEntries.map((r) => {
          const local = byId.get(r.id)
          if (!local) return r
          return {
            ...local,
            ...r,
            data_source: 'imported' as const,
          }
        })
        return { entries: merged, statusLog: state.statusLog }
      })
    } catch {
      // Keep local seed fallback for demo reliability when API is unavailable.
    }
  },

  updateEntryStatus: (entryId, update) => {
    const now = new Date().toISOString()
    set((state) => {
      const newLogRows: StatusLogEntry[] = []
      const newEntries = state.entries.map((e) => {
        if (e.id !== entryId) return e
        if (!e.owner_id) return e
        if ('live_status' in update && update.live_status !== e.live_status) {
          newLogRows.push({ id: `log-${logIdCounter++}`, entry_id: entryId, owner_id: e.owner_id, field: 'live_status', old_value: e.live_status, new_value: update.live_status ?? null, updated_at: now })
        }
        if ('status_note' in update && update.status_note !== e.status_note) {
          newLogRows.push({ id: `log-${logIdCounter++}`, entry_id: entryId, owner_id: e.owner_id, field: 'status_note', old_value: e.status_note, new_value: update.status_note ?? null, updated_at: now })
        }
        return { ...e, ...update, status_updated: now }
      })
      return { entries: newEntries, statusLog: [...newLogRows, ...state.statusLog] }
    })
  },
}))
