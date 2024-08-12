import Api from './api-instance.js';
const todoApi = {
  getAll(params = {}) {
    const url = '/todos';
    return Api.get(url, params);
  },
  getById(id) {
    const url = `/todos/${id}`;
    return Api.get(url);
  },
  add(todo) {
    const url = '/todos';
    return Api.post(url, todo);
  },
  update(id, todo) {
    const url = `/todos/${id}`;
    return Api.put(url, todo);
  },
  delete(id) {
    const url = `/todos/${id}`;
    return Api.remove(url);
  },
};
export default todoApi;
