import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from './useAppStore'
import { ENTRIES, STATUS_LOG } from '../data/seed'

// Reset store to a fresh seed snapshot before each test — Zustand singleton state
// would otherwise leak across tests.
function resetStore() {
  useAppStore.setState((prev) => ({
    ...prev,
    entries: ENTRIES.map((e) => ({ ...e })),
    statusLog: [...STATUS_LOG],
  }))
}

describe('useAppStore', () => {
  describe('updateEntryStatus', () => {
    beforeEach(resetStore)

    it('mutates live_status on the target Activity', () => {
      useAppStore.getState().updateEntryStatus('pho-sawan', { live_status: 'sold_out' })
      expect(useAppStore.getState().getEntryById('pho-sawan')?.live_status).toBe('sold_out')
    })

    it('appends a log row to entry_status_log when live_status changes', () => {
      const before = useAppStore.getState().statusLog.length
      useAppStore.getState().updateEntryStatus('pho-sawan', { live_status: 'sold_out' })
      const after = useAppStore.getState().statusLog
      expect(after.length).toBe(before + 1)
      const head = after[0]
      expect(head.entry_id).toBe('pho-sawan')
      expect(head.field).toBe('live_status')
      expect(head.new_value).toBe('sold_out')
    })

    it('appends a log row when status_note changes', () => {
      const before = useAppStore.getState().statusLog.length
      useAppStore.getState().updateEntryStatus('pho-sawan', { status_note: 'closed for renovation' })
      expect(useAppStore.getState().statusLog.length).toBe(before + 1)
      expect(useAppStore.getState().statusLog[0].field).toBe('status_note')
    })

    it('appends two log rows when both fields change in one call', () => {
      const before = useAppStore.getState().statusLog.length
      useAppStore.getState().updateEntryStatus('pho-sawan', {
        live_status: 'sold_out',
        status_note: 'back tomorrow 9am',
      })
      expect(useAppStore.getState().statusLog.length).toBe(before + 2)
    })

    it('does NOT append a log row when the live_status value is unchanged', () => {
      const sameValue = useAppStore.getState().getEntryById('pho-sawan')?.live_status
      const before = useAppStore.getState().statusLog.length
      useAppStore.getState().updateEntryStatus('pho-sawan', { live_status: sameValue })
      expect(useAppStore.getState().statusLog.length).toBe(before)
    })

    it('is a no-op for Places (owner_id null) — entry unchanged, no log written', () => {
      const before = useAppStore.getState().statusLog.length
      const placeBefore = useAppStore.getState().getEntryById('naga-statue')
      useAppStore.getState().updateEntryStatus('naga-statue', { live_status: 'sold_out' })
      const placeAfter = useAppStore.getState().getEntryById('naga-statue')
      expect(useAppStore.getState().statusLog.length).toBe(before)
      // Reference equality: Place was not re-built in the entries.map
      expect(placeAfter).toBe(placeBefore)
    })

    it('bumps status_updated even when no log row is written (touch-to-refresh)', async () => {
      const before = useAppStore.getState().getEntryById('pho-sawan')?.status_updated
      await new Promise((r) => setTimeout(r, 5))
      const sameValue = useAppStore.getState().getEntryById('pho-sawan')?.live_status
      useAppStore.getState().updateEntryStatus('pho-sawan', { live_status: sameValue })
      const after = useAppStore.getState().getEntryById('pho-sawan')?.status_updated
      expect(after).not.toBe(before)
    })

    it('getRecentUpdates returns rows for the right entry, sorted newest first', () => {
      useAppStore.getState().updateEntryStatus('pho-sawan', { live_status: 'sold_out' })
      const rows = useAppStore.getState().getRecentUpdates('pho-sawan', 5)
      expect(rows.length).toBeGreaterThanOrEqual(1)
      expect(rows[0].new_value).toBe('sold_out')
      // Sorted descending by updated_at
      for (let i = 1; i < rows.length; i++) {
        expect(new Date(rows[i - 1].updated_at).getTime()).toBeGreaterThanOrEqual(
          new Date(rows[i].updated_at).getTime(),
        )
      }
    })
  })
})
