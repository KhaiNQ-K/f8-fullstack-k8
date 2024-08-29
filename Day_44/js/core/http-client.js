export const httpClient = {
  baseURL: null,
  headers: null,
  requestInterceptors: [],
  responseInterceptors: [],
  name: 'HttpClient',
  create({ baseURL, headers }) {
    const newInstance = Object.assign({}, this);
    newInstance.baseURL = baseURL;
    newInstance.headers = headers;
    return newInstance;
  },
  addRequestInterceptor(onFulfilled, onRejected) {
    this.requestInterceptors.push({ onFulfilled, onRejected });
  },

  addResponseInterceptor(onFulfilled, onRejected) {
    this.responseInterceptors.push({ onFulfilled, onRejected });
  },

  send: async function (path, method = 'GET', body = null, options = {}) {
    let url = path;
    const defaultOptions = {
      method,
    };
    if (this.baseURL) {
      url = `${this.baseURL}${path}`;
    }
    const headers = { ...this.headers, ...options.headers };
    defaultOptions.headers = headers;
    if (method !== 'GET' && body) {
      defaultOptions.body = JSON.stringify(body);
      if (!defaultOptions.headers['Content-Type']) {
        defaultOptions.headers['Content-Type'] = 'application/json';
      }
    }
    //add interceptor
    let requestConfig = { ...defaultOptions };
    if (this.requestInterceptors.length) {
      for (const interceptor of this.requestInterceptors) {
        try {
          requestConfig = await interceptor.onFulfilled(requestConfig);
        } catch (err) {
          if (interceptor.onRejected) {
            interceptor.onRejected(err);
          }
          throw err;
        }
      }
    }
    let responseClone;
    let response;
    try {
      response = await fetch(url, requestConfig);
      responseClone = response.clone();
    } catch (err) {
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onRejected) {
          interceptor.onRejected(err);
        }
      }
    }
    if (this.responseInterceptors.length) {
      for (const interceptor of this.responseInterceptors) {
        try {
          responseClone = await interceptor.onFulfilled(responseClone);
          if (responseClone.name === 'HttpClient') {
            //Xử lý gọi lại
            return this.send(path, method, body, defaultOptions);
          }
        } catch (err) {
          if (interceptor.onRejected) {
            interceptor.onRejected(err);
          }
          throw err;
        }
      }
    }
    responseClone.data = await response.json();
    return responseClone;
  },

  get: function (path, options = {}) {
    return this.send(path, 'GET', null, options);
  },
  post: function (path, body, options = {}) {
    return this.send(path, 'POST', body, options);
  },
  put: function (path, body, options = {}) {
    return this.send(path, 'PUT', body, options);
  },
  patch: function (path, body, options = {}) {
    return this.send(path, 'PATCH', body, options);
  },
  delete: function (path, options = {}) {
    return this.send(path, 'DELETE', null, options);
  },
};
