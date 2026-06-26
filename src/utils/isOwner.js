/**
 * Shared ownership check — handles the _id/id inconsistency seen across the
 * auth store and API responses. RequestCard previously duplicated this
 * logic inline; both RequestCard and OfferCard should use this instead.
 */
export function isOwner(currentUser, resourceOwner) {
  if (!currentUser || !resourceOwner) return false
  const userId = currentUser._id ?? currentUser.id
  const ownerId = resourceOwner._id ?? resourceOwner.id
  return Boolean(userId && ownerId && userId === ownerId)
}
