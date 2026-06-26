/**
 * Mutates `params`, adding `field[gte]` / `field[lte]` entries only when a
 * value is actually provided. Extracted because both fetchServiceRequests
 * and fetchSkillListings had identical inline logic for this (creditsOffered,
 * hourlyRate, createdAt, averageRating ranges) — confirmed query shape from
 * img 4 / img 9: creditsOffered[gte], creditsOffered[lte], createdAt[gte], etc.
 */
export function applyRangeFilter(params, field, gte, lte) {
  if (gte !== undefined && gte !== null && gte !== '')
    params[`${field}[gte]`] = gte
  if (lte !== undefined && lte !== null && lte !== '')
    params[`${field}[lte]`] = lte
}
