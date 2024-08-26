import fetchClient from './fetchClient.js';

export const blogApi = {
  getAll: (params) => {
    const queryParams = new URLSearchParams(params);
    const url = `/blogs?${queryParams}`;
    return fetchClient.get(url);
  },
  getDetail: (id) => {
    const url = `/blogs/${id}`;
    return fetchClient.get(url);
  },
  create: (payload) => {
    const url = '/blogs';
    return fetchClient.post(url, payload);
  },
};
