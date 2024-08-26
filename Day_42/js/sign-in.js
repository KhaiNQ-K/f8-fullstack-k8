import { authApi } from './api/auth-api.js';
const handleSignIn = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const msgEl = e.target.querySelector('.msg');
  msgEl.innerHTML = '';
  try {
    const response = await authApi.login(data);
    if (response) {
      localStorage.setItem('access_token', JSON.stringify(response.data.data));
      window.location.href = '/Day_42/index.html';
    }
  } catch (e) {
    console.log(e.message);
    msgEl.innerHTML = `<div class="alert alert-danger text-center fs-Day_42">${e.message}</div>`;
  }
};

const signIn = () => {
  const signUpFormEl = document.querySelector('#sign-in-form');
  signUpFormEl.addEventListener('submit', handleSignIn);
};
signIn();
