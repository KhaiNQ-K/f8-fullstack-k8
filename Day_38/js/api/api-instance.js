const apiURL = 'https://r4w46v-8080.csb.app';
async function request(url, params, method = 'GET', options = {}) {
  let defaultOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params); // body should match Content-Type in headers option
    }
  }
  defaultOptions = Object.assign(defaultOptions, options);
  const response = await fetch(apiURL + url, defaultOptions);
  if (response.status === 500) {
    return handlingError('The server responded with an unexpected status.');
  }
  const result = await response.json();
  return result;
}
function handlingError(message) {
  return {
    status: 500,
    message,
  };
}
function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

function get(url, params) {
  return request(url, params);
}
function post(url, params, options) {
  return request(url, params, 'POST', options);
}
function put(url, params, options) {
  return request(url, params, 'PUT', options);
}
function remove(url, params, options) {
  return request(url, params, 'DELETE', options);
}

export default { get, post, put, remove };
