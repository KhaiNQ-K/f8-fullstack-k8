import axiosClient from './axiosClient';

export const taskApi = {
  getTask() {
    return axiosClient.get('/tasks');
  },
  upsertTask(payload) {
    return axiosClient.post('/tasks', payload);
  },
};
