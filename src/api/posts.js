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

// ---------------------------------------------------------------------------
// Skill Listings
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
} = {}) {
  const fd = new FormData()
  appendIfPresent(fd, 'category', category)
  appendIfPresent(fd, 'title', title)
  appendIfPresent(fd, 'description', description)
  appendIfPresent(fd, 'creditsOffered', creditsOffered)
  appendIfPresent(fd, 'deadline', deadline)
  appendFiles(fd, 'referenceImages', referenceImages)
  return fd
}

// /**
//  * @param {{category?: string, title?: string, description?: string, hourlyRate?: number|string, availabilityNotes?: string, sampleWork?: File[]|FileList}} payload
//  */
export function buildSkillListingFormData({
  category,
  title,
  description,
  hourlyRate,
  availabilityNotes,
  sampleWork,
} = {}) {
  const fd = new FormData()
  appendIfPresent(fd, 'category', category)
  appendIfPresent(fd, 'title', title)
  appendIfPresent(fd, 'description', description)
  appendIfPresent(fd, 'hourlyRate', hourlyRate)
  appendIfPresent(fd, 'availabilityNotes', availabilityNotes)
  appendFiles(fd, 'sampleWork', sampleWork)
  return fd
}
