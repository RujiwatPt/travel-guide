import type { ComputedStatus } from './status'

export const STATUS_COLOR: Record<ComputedStatus, string> = {
  OPEN: '#2ea84a',           // --status-open
  CLOSING_SOON: '#ffc20d',   // --status-closing
  CLOSED_TODAY: '#9ca3af',   // --status-closed
  SOLD_OUT: '#9ca3af',       // grey, like closed
  TEMPORARILY_CLOSED: '#b16060', // muted red
}

export const STATUS_LABEL: Record<ComputedStatus, string> = {
  OPEN: 'OPEN',
  CLOSING_SOON: 'CLOSING SOON',
  CLOSED_TODAY: 'CLOSED TODAY',
  SOLD_OUT: 'SOLD OUT',
  TEMPORARILY_CLOSED: 'TEMPORARILY CLOSED',
}
