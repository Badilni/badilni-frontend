import axios from 'axios';
import { serverBaseUrl } from '../../../utils/constants';

export const fetchUsersService = async ({ keyword, page = 1, limit = 10, sort = 'averageRating' }) => {
  try {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append('keyword', keyword);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (sort) queryParams.append('sort', sort);

    const token = localStorage.getItem('token');

    const response = await axios.get(`${serverBaseUrl}/users?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error inside fetchUsersService:', error.response?.data || error.message);
    throw error;
  }
};
