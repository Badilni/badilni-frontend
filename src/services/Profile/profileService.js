import { getMeRequest, updateMe, getUserProfileRequest } from '../../api/authApi'

export const getProfile = () => getMeRequest()

export const updateProfile = (formData) => updateMe(formData)

export const getUserProfile = (userId) => getUserProfileRequest(userId)