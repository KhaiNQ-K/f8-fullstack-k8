import { ACCESS_TOKEN } from '../utils.js';
import fetchClient from './fetchClient.js';

export const authApi = {
  login: (payload) => {
    const url = '/auth/login';
    return fetchClient.post(url, payload);
  },
  register: (payload) => {
    // const response = await fetchClient.post('/auth/register', payload);
    // if (response) {
    //   localStorage.setItem('access_token', JSON.stringify(response));
    // }
    // return response;
    const url = '/auth/register';
    return fetchClient.post(url, payload);
  },
  logout: () => {
    const url = '/auth/logout';
    return fetchClient.post(url);
  },
};
