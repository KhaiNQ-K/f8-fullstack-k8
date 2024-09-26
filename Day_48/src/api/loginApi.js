import axiosClient from './axiosClient';

export const loginApi = {
  login: (payload) => {
    return axiosClient.get(`/api-key?email=${payload}`);
  },
};
