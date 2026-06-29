/**
 * ASSUMPTION (unconfirmed): the only real transaction shape seen in a
 * screenshot is a `welcome_bonus` — a one-sided credit with `toUser`
 * populated and no visible `fromUser`. Two-sided types like
 * `session_payment` have only been seen as a `type` filter *value*, never
 * a full response shape, so this assumes a mirrored `fromUser` field
 * exists and `amount` is always stored as a positive magnitude (direction
 * is derived from which side the current user is on, not the sign of
 * `amount`). If the backend actually signs `amount` itself, or uses a
 * `direction` field, only `getTransactionDirection` needs to change —
 * nothing else here depends on how direction is determined.
 */

const CREDIT_TYPES = new Set(['welcome_bonus', 'bonus_reward', 'session_payout', 'refund'])
const DEBIT_TYPES = new Set(['session_payment'])

export function getTransactionDirection(transaction, currentUserId) {
  const isRecipient =
    transaction.toUser?._id === currentUserId || transaction.toUser?.id === currentUserId
  const isSender =
    transaction.fromUser?._id === currentUserId || transaction.fromUser?.id === currentUserId

  if (isSender && !isRecipient) return 'debit'
  if (isRecipient && !isSender) return 'credit'

  // Can't tell from participants (e.g. fromUser isn't present on this
  // record) — fall back to the known one-sided bonus/payout types.
  if (CREDIT_TYPES.has(transaction.type)) return 'credit'
  if (DEBIT_TYPES.has(transaction.type)) return 'debit'
  return 'credit'
}

const TYPE_LABELS = {
  welcome_bonus: 'Welcome bonus',
  bonus_reward: 'Bonus reward',
  session_payment: 'Session payment',
  session_payout: 'Session payout',
  refund: 'Refund',
}

export function getTransactionLabel(transaction, currentUserId) {
  const direction = getTransactionDirection(transaction, currentUserId)
  const baseLabel = TYPE_LABELS[transaction.type] || transaction.type?.replace(/_/g, ' ') || 'Transaction'
  const counterparty = direction === 'credit' ? transaction.fromUser?.name : transaction.toUser?.name
  return counterparty ? `${baseLabel} — ${counterparty}` : baseLabel
}