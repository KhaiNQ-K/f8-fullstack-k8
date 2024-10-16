import axios from 'axios';

export const authApi = {
  login(email) {
    return axios.get(`/api-key?email=${email}`);
  },
};
