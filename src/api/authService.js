import axios from '@/utils/axiosInstance';

export const registerUser = async (payload) => {
  const response = await axios.post('/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post('/auth/login', payload);
  return response.data;
};

