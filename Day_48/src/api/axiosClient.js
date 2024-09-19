import axios from 'axios';

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
    const response = await axiosClient.get(`/api-key?email=${import.meta.env.VITE_APP_EMAIL}`);
    if (response.data) {
      localStorage.setItem('apiKey', JSON.stringify(response.data.apiKey));
    }
  } catch (err) {
    console.log(err);
  }
};
export default axiosClient;
