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
  const apiKey = JSON.parse(localStorage.getItem(STORAGE_KEY.API_KEY));
  if (apiKey) {
    config.headers['X-Api-Key'] = apiKey;
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
        localStorage.setItem(STORAGE_KEY.API_KEY, JSON.stringify(newApiKey));
        originalRequest.headers['X-Api-Key'] = newApiKey;
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const requestAPIKey = async () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY.USER_INFO));
    console.log(data);
    if (!data.email) return;
    const response = await axiosClient.get(`/api-key?email=${data.email}`);
    return response.data.apiKey;
  } catch (err) {
    console.log(err);
  }
};
export default axiosClient;
