import { authApi } from './api/auth-api.js';
import { ACCESS_TOKEN } from './utils.js';
const handleRedirect = () => {
  debugger;
  try {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    window.location.href = '/Day_44/index.html';
  } catch (e) {
    console.log('sign-in');
  }
};
const handleSignIn = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const msgEl = e.target.querySelector('.msg');
  const loadingEl = document.querySelector('.loading');
  msgEl.innerHTML = '';
  try {
    loadingEl.classList.add('active');
    const response = await authApi.login(data);
    if (response) {
      localStorage.setItem('access_token', JSON.stringify(response.data.data));
      window.location.href = '/Day_44/index.html';
    }
  } catch (e) {
    console.log(e.message);
    msgEl.innerHTML = `<div class="alert alert-danger text-center fs-Day_44">${e.message}</div>`;
  } finally {
    loadingEl.classList.remove('active');
  }
};

const signIn = () => {
  const signUpFormEl = document.querySelector('#sign-in-form');
  signUpFormEl.addEventListener('submit', handleSignIn);
};
handleRedirect();
signIn();
