const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-red-500 to-rose-600',
]

/**
 * Deterministic accent gradient derived from a category name. Shared by
 * RequestCard and OfferCard — RequestCard currently has its own local copy
 * of this exact function; point it at this file too and delete the local
 * one to remove the duplication.
 */
export const getAccentColor = (categoryName) => {
  const index = categoryName ? categoryName.length % GRADIENTS.length : 0
  return GRADIENTS[index]
}
