// Signature derivation — per CONTEXT.md.
// MVP: an Entry is a Signature iff its vibe_tags includes 'iconic'.
// Future: dedicated `is_signature` field; this helper's interface stays the same.

import type { Entry } from '../types'

export function isSignature(entry: Entry): boolean {
  return entry.vibe_tags.includes('iconic')
}
