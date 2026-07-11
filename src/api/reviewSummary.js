import api from './axios';

export const getUserReviewSummary = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}/review-summary`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch summary');
  }
};
