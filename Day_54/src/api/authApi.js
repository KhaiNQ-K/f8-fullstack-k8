import axiosClient from './axiosClient';

export const authApi = {
  login(email) {
    return axiosClient.get(`/api-key?email=${email}`);
  },
};
