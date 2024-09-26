import axios from 'axios';
import { STORAGE_KEY } from '../constants/storage-key';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use((config) => {
  try {
    const apiKey = JSON.parse(localStorage.getItem('apiKey'));
    config.headers['X-Api-Key'] = apiKey;
  } catch (err) {
    console.log(err);
    requestAPIKey();
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error?.config;
    if (error?.response.status === 401 && !config?.sent) {
      config.sent = true;
      await requestAPIKey();
      return axiosClient(config);
    }
    return Promise.reject(error);
  }
);

export const requestAPIKey = async () => {
  try {
    const { email } = JSON.parse(localStorage.getItem('userInfo'));
    if (!email) return;
    const response = await axiosClient.get(`/api-key?email=${email}`);
    if (response.data) {
      localStorage.setItem(STORAGE_KEY.API_KEY, JSON.stringify(response.data.apiKey));
    }
  } catch (err) {
    console.log(err);
  }
};
export default axiosClient;
