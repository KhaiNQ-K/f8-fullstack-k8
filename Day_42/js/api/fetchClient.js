import { SERVER_API } from '../config.js';
import { httpClient } from '../http-client.js';
import { ACCESS_TOKEN, STATUS_CODE } from '../utils.js';

const fetchClient = httpClient.create({ baseURL: SERVER_API });
console.log(fetchClient);
fetchClient.addRequestInterceptor(
  (config) => {
    try {
      const storage = localStorage.getItem(ACCESS_TOKEN);
      if (storage) {
        const { accessToken } = JSON.parse(storage);
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    } catch (e) {
      console.log(e);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);
fetchClient.addResponseInterceptor(
  async (response) => {
    if (
      response.status === STATUS_CODE.UNAUTHORIZED &&
      !response.url.includes('auth/refresh-token')
    ) {
      try {
        const storage = localStorage.getItem(ACCESS_TOKEN);
        if (storage) {
          const { refreshToken } = JSON.parse(storage);
          const { data } = await requestRefreshToken(refreshToken);
          if (data) {
            localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data.token));
            console.log(fetchClient);
            return fetchClient;
          } else {
            throw new Error('Unauthorize');
          }
        }
      } catch (e) {
        //Handle logout
        localStorage.removeItem(ACCESS_TOKEN);
        return false;
      }

      //handle refresh token
    }
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Request failed';
      throw new Error(errorMessage); // Throw a new error with the message
    }
    return response;
  },
  (error) => {
    console.error('Request Error:', error);

    return Promise.reject(error);
  }
);

const requestRefreshToken = async (refreshToken) => {
  const response = await fetchClient.post('/auth/refresh-token', {
    refreshToken,
  });
  if (response.ok) {
    return response.data;
  }
  return false;
};
export default fetchClient;
