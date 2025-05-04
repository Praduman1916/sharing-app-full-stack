import axios from '@/utils/axiosInstance';

export const getUserLinks = async (userId) => {
  const response = await axios.get(`/link?userId=${userId}`);
  return response.data;
};

export const addUserLink = async (linkData) => {
  const response = await axios.post('/link', linkData);
  return response.data;
};

export const updateUserLink = async (id, updateData) => {
  const response = await axios.put(`/link/${id}`, updateData);
  return response.data;
};

export const deleteUserLink = async (id) => {
  const response = await axios.delete(`/link/${id}`);
  return response.data;
};
