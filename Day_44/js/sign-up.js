import { authApi } from './api/auth-api.js';

const handleRedirect = () => {
  debugger;
  try {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    window.location.href = '/Day_44/index.html';
  } catch (e) {
    console.log('sign-up');
  }
};
const handleSignUp = async (e) => {
  e.preventDefault();
  const msgEl = e.target.querySelector('.msg');
  const loadingEl = document.querySelector('.loading');
  try {
    const payload = Object.fromEntries(new FormData(e.target));
    loadingEl.classList.add('active');
    const response = await authApi.register(payload);
    msgEl.innerHTML = '';
    if (response) {
      msgEl.innerHTML = `<div class="alert alert-success text-center fs-4">${response.message}</div>`;
      setTimeout(() => {
        window.location.href = '/Day_44/sign-in.html';
      }, 1000);
    }
  } catch (e) {
    console.log(e.message);
    msgEl.innerHTML = `<div class="alert alert-danger text-center fs-Day_44">${e.message}</div>`;
  } finally {
    loadingEl.classList.remove('active');
  }
};
const signUp = () => {
  const signUpFormEl = document.querySelector('#sign-up-form');
  signUpFormEl.addEventListener('submit', handleSignUp);
};
signUp();
