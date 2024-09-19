import axiosClient from './axiosClient';

const todoApi = {
  getTodos: (params) => {
    let url = 'todos';
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url = `${url}?${queryParams}`;
    }
    return axiosClient.get(url);
  },
  addTodo: (payload) => {
    return axiosClient.post('todos', payload);
  },
  getById: (id) => {
    return axiosClient.get(`todos/${id}`);
  },
  updateTodo: (id, payload) => {
    return axiosClient.patch(`todos/${id}`, payload);
  },
  deleteTodo: (id) => {
    return axiosClient.delete(`todos/${id}`);
  },
};
export default todoApi;
