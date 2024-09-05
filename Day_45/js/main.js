import { authApi } from './api/auth-api.js';
import { blogApi } from './api/blog-api.js';
import { ACCESS_TOKEN, pattern, templateString } from './utils.js';
let params = {
  page: 1,
  limit: 10,
};
const renderBlogList = async () => {
  const appEl = document.querySelector('.app');
  appEl.innerHTML = templateString.blogListTemplate;
  renderHasToken();
  await renderBlogs();
  handleShowBlogDetail();
};
const renderBlogs = async () => {
  try {
    // const requestData = await requestGetBlogs(params);
    const blogListEl = document.querySelector('.blog-list');

    const requestData = await blogApi.getAll(params);
    if (!requestData) {
      blogListEl.innerHTML = 'No blog found';
    }
    const { data: blogs } = requestData.data;
    blogs
      .map((blog) => {
        const { userId: userInfo } = blog;
        return createBlogTemplate(blog, userInfo);
      })
      .forEach((el) => {
        blogListEl.appendChild(el);
      });
  } catch (e) {}
};

const createBlogTemplate = (blog, userInfo) => {
  const blogWrap = document.createElement('div');
  blogWrap.classList.add('blog-item');
  blogWrap.innerHTML = templateString.blogTemplateItem(blog, userInfo);
  return blogWrap;
};
const handleShowBlogDetail = () => {
  const blogListEl = document.querySelector('.blog-list');
  const blogTitleEls = blogListEl.querySelectorAll('.blog-title');
  blogTitleEls.forEach((el) => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const blogId = el.dataset.id;
      await renderBlogDetail(blogId);
    });
  });
};
const renderBlogDetail = async (blogId) => {
  const appEl = document.querySelector('.app');
  const blogDetailEl = document.createElement('div');
  blogDetailEl.classList.add('blog-detail', 'mt-5');
  blogDetailEl.innerHTML = `
        <b-row>
          <b-col>
            <a class="btn btn-primary btn-back fs-4">Back to Home</a>
          </b-col>
        </b-row>
  `;
  const {
    data: { data: blogDetail },
  } = await blogApi.getDetail(blogId);
  blogDetailEl.innerHTML += templateString.blogTemplateItem(blogDetail, blogDetail.userId, true);
  appEl.innerHTML = '';
  appEl.appendChild(blogDetailEl);
  const backToHome = blogDetailEl.querySelector('.btn-back');
  backToHome.addEventListener('click', () => {
    renderBlogList();
  });
};
const renderHasToken = async () => {
  await renderBlogForm();
  renderProfile();
};
const renderBlogForm = async () => {
  let currentDate = new Date();
  currentDate.setHours(6);
  const blogFormWrapEl = document.querySelector('.blog-form-wrapper');
  try {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    if (accessToken) {
      blogFormWrapEl.innerHTML = templateString.blogFormTemplate;
      const blogForm = blogFormWrapEl.querySelector('.blog-form');
      blogForm.querySelector('#createdAt').value = `${currentDate.toISOString().substring(0, 16)}`;
      blogFormWrapEl.querySelector('.blog-form').addEventListener('submit', handleAddBlog);
    }
  } catch (e) {
    blogFormWrapEl.innerHTML = ``;
    console.log(e);
  }
};
const renderProfile = () => {
  const actionEl = document.querySelector('.actions');
  try {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    let isToggle = false;
    if (accessToken) {
      actionEl.innerHTML = `
      <div class="dropdown">
          <a
            href="#"
            class="nav-link dropdown-toggle"
            aria-expanded="false"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-user"></i>
          </a>
          <ul
            class="dropdown-menu "
            id="navbarNavDarkDropdown"
          >
            <li>
              <a
                class="dropdown-item d-flex gap-3 align-items-center justify-content-between"
                href="#"
              >
                Profile
                <i class="fa-solid fa-user"></i>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item d-flex gap-3 logout align-items-center justify-content-between"
                href="#"
              >
                Logout
                <i class="fa-solid fa-power-off"></i>
              </a>
            </li>
          </ul>
        </div>`;
      actionEl
        .querySelector('a[data-bs-target="#navbarNavDarkDropdown"]')
        .addEventListener('click', (e) => {
          isToggle = !isToggle;
          e.preventDefault();
          actionEl.querySelector('.dropdown-menu').classList.toggle('active', isToggle);
          actionEl.querySelector('.dropdown-menu').style.display = isToggle ? 'none' : 'block';
          if (isToggle) {
          }
        });
      const logoutEl = actionEl.querySelector('.logout');
      logoutEl.addEventListener('click', handleLogout);
    }
  } catch (e) {
    handleAuthAction();
  }
};
const renderLoginForm = () => {
  const appEl = document.querySelector('.app');
  appEl.innerHTML = templateString.loginTemplate;
  signIn();
};
const renderRegisterForm = () => {
  const appEl = document.querySelector('.app');
  appEl.innerHTML = templateString.registerTemplate;
  signUp();
};
const handleAuthAction = () => {
  const actionEl = document.querySelector('.actions');
  actionEl.innerHTML = `
      <a class="btn btn-outline-primary rounded-pill btn-login fs-4">Sign In</a>
      <a class="btn btn-outline-primary rounded-pill btn-register fs-4">
        Sign Up
      </a>
    `;
  actionEl.querySelector('.btn-login').addEventListener('click', (e) => {
    e.preventDefault();
    renderLoginForm();
  });
  actionEl.querySelector('.btn-register').addEventListener('click', (e) => {
    e.preventDefault();
    renderRegisterForm();
  });
};
const handleAddBlog = async (e) => {
  e.preventDefault();
  try {
    const blogForm = e.target;
    const data = Object.fromEntries(new FormData(blogForm));
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    const blog = {
      title: data.title,
      content: data.content,
    };
    await blogApi.create(blog);
    blogForm.reset();
  } catch (e) {
    console.log(e);
  }
  renderBlogs();
};

const addInfinityScrollEvent = () => {
  const blogListElEnd = document.querySelector('.blog-list-end');
  const loadingEl = document.querySelector('.loader');
  let isFetching = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      async (entry) => {
        if (entry.isIntersecting) {
          if (isFetching) return;
          try {
            params.page++;
            loadingEl.classList.add('loading');
            await renderBlogs();
          } catch (e) {
            console.log(e);
            observer.observe(blogListElEnd);
          } finally {
            loadingEl.classList.remove('loading');
            isFetching = false;
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      }
    );
  });
  observer.observe(blogListElEnd);
};

const handleSignIn = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const msgEl = e.target.querySelector('.auth-form .msg');
  const loadingEl = document.querySelector('.auth-form .loading');
  msgEl.innerHTML = '';
  try {
    loadingEl.classList.add('active');
    const response = await authApi.login(data);
    if (response) {
      localStorage.setItem('access_token', JSON.stringify(response.data.data));
      renderBlogList();
    }
  } catch (e) {
    console.log(e.message);
    msgEl.innerHTML = `<div class="alert alert-danger text-center fs-Day_44">${e.message}</div>`;
  } finally {
    loadingEl.classList.remove('active');
  }
};
const signIn = () => {
  const signInFormEl = document.querySelector('#sign-in-form');
  signInFormEl.addEventListener('submit', handleSignIn);
};
const handleSignUp = async (e) => {
  e.preventDefault();
  const msgEl = e.target.querySelector('.auth-form .msg');
  const loadingEl = document.querySelector('.auth-form .loading');
  try {
    const payload = Object.fromEntries(new FormData(e.target));
    loadingEl.classList.add('active');
    const response = await authApi.register(payload);
    msgEl.innerHTML = '';
    if (response) {
      msgEl.innerHTML = `<div class="alert alert-success text-center fs-4">${response.message}</div>`;
      renderLoginForm();
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

const handleLogout = async (e) => {
  console.log('handleLogout');
  e.preventDefault();
  try {
    await authApi.logout();
    localStorage.removeItem(ACCESS_TOKEN);
    renderHasToken();
  } catch (e) {
    console.log(e);
  }
};

await renderBlogList();

addInfinityScrollEvent();
