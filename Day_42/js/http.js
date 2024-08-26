import { SERVER_API } from './config.js';
import { httpClient } from './http-client.js';
import { ACCESS_TOKEN, STATUS_CODE } from './utils.js';

let refreshPromise = null;
export const requestGetBlogs = async (params) => {
  try {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${SERVER_API}/blogs?${queryParams}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (e) {
    return false;
  }
};
export const requestRegister = async (payload) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (e) {
    throw new Error(e.message);
  }
};
export const requestLogin = async (payload) => {
  try {
    const response = await fetch(`${SERVER_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (e) {
    throw new Error(e.message);
  }
};
export const requestRefreshToken = async () => {
  try {
    const { refreshToken } = JSON.parse(localStorage.getItem('access_token'));
    const response = await fetch(`${SERVER_API}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const {
      data: { token: accessToken },
    } = await response.json();
    localStorage.setItem('access_token', JSON.stringify(accessToken));
    return accessToken;
  } catch (e) {
    return false;
  }
};
export const requestGetProfiles = async () => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem('access_token'));
    const response = await fetch(`${SERVER_API}/profiles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        await handleRefreshToken();
        return await requestGetProfiles(); // Retry the request after refreshing the token
      }
      throw new Error('Failed to fetch profiles');
    }
    return await response.json();
  } catch (e) {
    return false;
  }
};
export const requestAddBlog = async () => {
  try {
    const { accessToken } = JSON.parse(localStorage.getItem('access_token'));
    const response = await fetch(`${SERVER_API}/blogs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        await handleRefreshToken();
        return await requestAddBlog(); // Retry the request after refreshing the token
      }
      throw new Error('Failed to add blog');
    }
    return await response.json();
  } catch (e) {
    return false;
  }
};
function handleRefreshToken() {
  if (!refreshPromise) {
    refreshPromise = requestRefreshToken();
  }
  return refreshPromise;
}
