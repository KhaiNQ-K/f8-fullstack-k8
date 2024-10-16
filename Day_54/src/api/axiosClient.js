import axios from 'axios';
import { STORAGE_KEY } from '../utils/storage-key';
const { VITE_APP_API_URL } = import.meta.env;
const axiosClient = axios.create({
  baseURL: VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_INFO));
  if (authData) {
    const { apiKey } = authData;
    if (apiKey) {
      config.headers['X-Api-Key'] = apiKey;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response.status === 401 && !originalRequest?._retry) {
      originalRequest.sent = true;
      originalRequest._retry = true;
      const newApiKey = await requestAPIKey();
      if (newApiKey) {
        const { email } = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_INFO));
        const newAuthData = { apiKey: newApiKey, email };
        localStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify(newAuthData));
        originalRequest.headers['X-Api-Key'] = newApiKey;
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const requestAPIKey = async () => {
  try {
    const { userInfo } = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_INFO));
    if (!userInfo.email) return;
    const response = await axiosClient.get(`/api-key?email=${userInfo.email}`);
    return response.data.apiKey;
  } catch (err) {
    console.log(err);
  }
};
