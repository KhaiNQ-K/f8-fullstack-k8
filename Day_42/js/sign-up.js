import { authApi } from './api/auth-api.js';

const handleSignUp = async (e) => {
  e.preventDefault();
  const msgEl = e.target.querySelector('.msg');
  try {
    const payload = Object.fromEntries(new FormData(e.target));
    const response = await authApi.register(payload);
    msgEl.innerHTML = '';
    if (response) {
      msgEl.innerHTML = `<div class="alert alert-success text-center fs-Day_42">${response.message}</div>`;
      setTimeout(() => {
        window.location.href = '/Day_42/sign-in.html';
      }, 1000);
    }
  } catch (e) {
    console.log(e.message);
    msgEl.innerHTML = `<div class="alert alert-danger text-center fs-Day_42">${e.message}</div>`;
  }
};
const signUp = () => {
  const signUpFormEl = document.querySelector('#sign-up-form');
  signUpFormEl.addEventListener('submit', handleSignUp);
};
signUp();
