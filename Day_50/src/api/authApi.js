import axiosClient from './axiosClient';

export const authApi = {
  login: (payload) => {
    return axiosClient.get(`/api-key?email=${payload}`);
  },
};
