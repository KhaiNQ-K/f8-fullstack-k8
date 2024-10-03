import axiosClient from './axiosClient';

export const userApi = {
  url: '/users',
  getProfile: () => {
    return axiosClient.get(`${userApi.url}/profile`);
  },
};
