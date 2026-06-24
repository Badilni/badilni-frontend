/**
 * None of the 10 Postman screenshots show a GET response body, so we can't
 * confirm whether `category` comes back populated (`{ _id, name }`) or as a
 * raw ObjectId string on list/detail endpoints. This resolves either shape
 * against a known categories list so the UI doesn't break either way.
 */
//  @param {string | {_id: string, name: string} | undefined} category
//  @param {Array<{_id: string, name: string}>} categoriesList
//  @returns {{ id: string|undefined, name: string }}
export function resolveCategory(category, categoriesList = []) {
  if (!category) return { id: undefined, name: 'General' }
  if (typeof category === 'object') {
    return { id: category._id, name: category.name || 'General' }
  }
  const match = categoriesList.find((c) => c._id === category)
  return { id: category, name: match?.name || 'General' }
}
