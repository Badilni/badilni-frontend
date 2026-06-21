import { getMeRequest, updateMe } from '../../api/authApi'

export const getProfile = () => getMeRequest()

export const updateProfile = (formData) => updateMe(formData)
