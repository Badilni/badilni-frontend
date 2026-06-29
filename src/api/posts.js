import api from './axios'

/**
 * API communication only — no UI logic, no formatting.
 * Endpoint paths/methods below are confirmed against Postman screenshots:
 *  - GET    /service-requests            (img 4)
 *  - GET    /service-requests/{id}       (img 1, 3)
 *  - POST   /service-requests            (img 5)
 *  - PATCH  /service-requests/{id}       (img 2)
 *  - DELETE /service-requests/{id}       (img 1)
 *  - GET    /skill-listings              (img 9)
 *  - GET    /skill-listings/{id}         (img 6, 8)
 *  - POST   /skill-listings              (img 10)
 *  - PATCH  /skill-listings/{id}         (img 7)
 *  - DELETE /skill-listings/{id}         (img 6)
 *
 * POST/PATCH on both resources are multipart/form-data (file fields:
 * referenceImages, sampleWork) — see buildServiceRequestFormData /
 * buildSkillListingFormData below. Do NOT set a Content-Type header
 * manually on these calls; the browser sets the multipart boundary
 * automatically when the body is a FormData instance.
 */

// ---------------------------------------------------------------------------
// Service Requests
// ---------------------------------------------------------------------------

export const getAllServiceRequests = (params) =>
  api.get('/service-requests', { params }).then((r) => r.data)

export const getServiceRequest = (serviceRequestId, params) =>
  // `params` lets callers send sparse fieldsets: ?fields=title,description,category (img 3)
  api.get(`/service-requests/${serviceRequestId}`, { params }).then((r) => r.data)

export const createServiceRequest = (payload) =>
  api.post('/service-requests', buildServiceRequestFormData(payload)).then((r) => r.data)

export const editServiceRequest = (serviceRequestId, payload) =>
  // Only include keys that actually changed — confirmed PATCH is a true
  // partial update; img 7 shows a real PATCH with a single field checked.
  api.patch(`/service-requests/${serviceRequestId}`, buildServiceRequestFormData(payload)).then((r) => r.data)

export const deleteServiceRequest = (serviceRequestId) =>
  api.delete(`/service-requests/${serviceRequestId}`).then((r) => r.data)

export const getUserServiceRequests = (userId, params) =>
  api
    .get(userId ? `/users/${userId}/service-requests` : '/users/me/service-requests', { params })
    .then((r) => r.data)

// ---------------------------------------------------------------------------
// Skill Listings ("Offers")
// ---------------------------------------------------------------------------

export const getAllSkillListings = (params) =>
  api.get('/skill-listings', { params }).then((r) => r.data)

export const getSkillListing = (skillId, params) =>
  api.get(`/skill-listings/${skillId}`, { params }).then((r) => r.data)

export const createSkillListing = (payload) =>
  api.post('/skill-listings', buildSkillListingFormData(payload)).then((r) => r.data)

export const editSkillListing = (skillId, payload) =>
  api.patch(`/skill-listings/${skillId}`, buildSkillListingFormData(payload)).then((r) => r.data)

export const deleteSkillListing = (skillId) =>
  api.delete(`/skill-listings/${skillId}`).then((r) => r.data)

export const getUserSkillListings = (userId, params) =>
  api
    .get(userId ? `/users/${userId}/skill-listings` : '/users/me/skill-listings', { params })
    .then((r) => r.data)

// ---------------------------------------------------------------------------
// form-data builders
// ---------------------------------------------------------------------------

function appendIfPresent(formData, key, value) {
  if (value === undefined || value === null || value === '') return
  formData.append(key, value)
}

function appendFiles(formData, key, files) {
  if (!files) return
  const list = Array.isArray(files) ? files : Array.from(files)
  list.forEach((file) => formData.append(key, file)) // img 10 shows multiple files under the same field name
}

// /**
//  * @param {{category?: string, title?: string, description?: string, creditsOffered?: number|string, deadline?: string, referenceImages?: File[]|FileList}} payload
//  *   `category` must be the category's _id (ObjectId string), not a name or slug — confirmed in every screenshot.
//  *   `deadline` must be an ISO 8601 string, e.g. new Date(...).toISOString() — confirmed format img 2/5: "2026-07-06T18:00:00.000Z"
//  */
export function buildServiceRequestFormData({
  category,
  title,
  description,
  creditsOffered,
  deadline,
  referenceImages,
  keepImageIds, // existing referenceImages _ids to retain (edit flow only) — see note on the skill-listing equivalent below
} = {}) {
  const fd = new FormData()
  appendIfPresent(fd, 'category', category)
  appendIfPresent(fd, 'title', title)
  appendIfPresent(fd, 'description', description)
  appendIfPresent(fd, 'creditsOffered', creditsOffered)
  appendIfPresent(fd, 'deadline', deadline)
  if (Array.isArray(keepImageIds)) keepImageIds.forEach((id) => fd.append('existingReferenceImages', id))
  appendFiles(fd, 'referenceImages', referenceImages)
  return fd
}

// /**
//  * @param {{
//  *   category?: string, title?: string, description?: string, hourlyRate?: number|string,
//  *   availabilityNotes?: string, tags?: string[], isActive?: boolean,
//  *   sampleWork?: File[]|FileList,      // newly selected files to upload
//  *   keepImageIds?: string[],           // existing sampleWork _ids to retain (edit flow only)
//  * }} payload
//  *
//  * NOTE on keepImageIds: no Postman screenshot covers partial-image removal
//  * on edit. Sending retained ids as repeated `existingSampleWork` fields
//  * mirrors the existing multi-file convention (one key, repeated), but is
//  * UNCONFIRMED — verify the real key name with the backend before shipping
//  * "remove individual existing image" in production. Worst case fallback:
//  * if the backend ignores it, edits will just additively upload new images
//  * without being able to drop old ones.
//  */
export function buildSkillListingFormData({
  category,
  title,
  description,
  hourlyRate,
  availabilityNotes,
  tags,
  isActive,
  sampleWork,
  keepImageIds,
} = {}) {
  const fd = new FormData()
  appendIfPresent(fd, 'category', category)
  appendIfPresent(fd, 'title', title)
  appendIfPresent(fd, 'description', description)
  appendIfPresent(fd, 'hourlyRate', hourlyRate)
  appendIfPresent(fd, 'availabilityNotes', availabilityNotes)
  if (isActive !== undefined) fd.append('isActive', String(isActive))
  if (Array.isArray(tags)) tags.forEach((tag) => fd.append('tags', tag))
  if (Array.isArray(keepImageIds)) keepImageIds.forEach((id) => fd.append('existingSampleWork', id))
  appendFiles(fd, 'sampleWork', sampleWork)
  return fd
}