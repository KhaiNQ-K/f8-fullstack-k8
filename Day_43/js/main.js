import { authApi } from './api/auth-api.js';
import { blogApi } from './api/blog-api.js';
import { ACCESS_TOKEN } from './utils.js';
let params = {
  page: 1,
  limit: 10,
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
  blogWrap.innerHTML = `
    <div class="card mx-auto" style="color: #fff">
      <div class="d-flex justify-content-between align-items-center">
        <div class="user-info d-flex gap-4">
          <div class="img-wrap">
            <img
              class=""
              src="https://pixner.net/circlehub/main/assets/images/avatar-1.png"
              alt=""
            />
          </div>
          <div class="d-flex flex-wrap">
            <span class="username d-block w-100 fs-3">${escapeHTML(userInfo.name)}</span>
            <span class="user-status text-success">Online</span>
          </div>
        </div>
        <div class="other">
          <button><i class="fa-solid fa-ellipsis"></i></button>
        </div>
      </div>
      <div class="content fs-2 mt-4">
        <div class="post-content line-clamp mb-4">
          ${escapeHTML(blog.content)}
        </div>
        <div class="post-media">
          <img
            class="img-fluid"
            style="width: 100%; object-fit: cover"
            src="https://pixner.net/circlehub/main/assets/images/post-img-1.png"
            alt=""
          />
        </div>
      </div>
      <div class="footer">
        <div class="d-flex justify-content-between align-items-center">
          <div class="other">
            <button><i class="fa-solid fa-thumbs-up"></i></button>
            <button><i class="fa-regular fa-comment"></i></button>
            <button><i class="fa-solid fa-share"></i></button>
          </div>
          <div class="time-create">
            <span class="fs-9">${formatDate(blog.createdAt)}</span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="like-info d-flex align-items-center gap-3">
            <span class="like-count">1.2k</span>
            <span class="like-text">Likes</span>
          </div>
          <div class="like-info d-flex align-items-center gap-3">
            <span class="like-count">1.2k</span>
            <span class="like-text">Comments</span>
          </div>
        </div>
      </div>
    </div>
  `;
  return blogWrap;
};
const renderHasToken = async () => {
  await renderBlogForm();
  renderProfile();
};
const renderBlogForm = async () => {
  const blogFormWrapEl = document.querySelector('.blog-form-wrapper');
  try {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    if (accessToken) {
      blogFormWrapEl.innerHTML = `
        <form action="" class="blog-form">
          <div class="row gap-4">
          <label for="title" class="form-label fs-2">Title</label>
            <input
              type="text"
              class="form-control fs-3"
              id="title"
              name="title"
              placeholder="Enter title"
            />
            <label for="content" class="form-label fs-2">Content</label>
            <textarea
              id="content"
              name="content"
              class="form-control fs-3"
              placeholder="Leave a content here"
              rows="4"
            ></textarea>
            <div class="mb-3 input-form">
              <input class="form-control" type="file" id="formFile" name="formFile" accept="image/*" />
            </div>
          </div>
          <div class="row">
            <button type="submit" class="btn btn-primary fs-3 d-block btn-submit">
              Submit
            </button>
          </div>
      </form>`;
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
    actionEl.innerHTML = `
      <a class="btn btn-outline-primary rounded-pill btn-login fs-4" href="./sign-in.html">Login</a>
      <a class="btn btn-outline-primary rounded-pill btn-login fs-4"  href="./sign-up.html">
        Register
      </a>
    `;
  }
};
const handleAddBlog = async (e) => {
  e.preventDefault();
  try {
    const blogForm = e.target;
    const data = Object.fromEntries(new FormData(blogForm));
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    if (!accessToken) {
      return;
    }
    const blog = {
      title: data.title,
      content: data.content,
    };
    await blogApi.create(blog);
    blogForm.reset();
  } catch (e) {
    localStorage.removeItem(ACCESS_TOKEN);
  }
  renderBlogs();
};
function escapeHTML(str) {
  return str.replace(/[&<>"'\/]/g, function (char) {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      case '/':
        return '&#x2F;';
      default:
        return char;
    }
  });
}
function formatDate(time) {
  const currentDate = new Date();
  const date = new Date(time);
  const diff = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) {
    return seconds + ' seconds ago';
  } else if (minutes < 60) {
    return minutes + ' minutes ago';
  } else if (hours < 24) {
    return hours + ' hours ago';
  } else {
    return days + ' days ago';
  }
}
const addInfinityScrollEvent = () => {
  const blogListElEnd = document.querySelector('.blog-list-end');
  const loadingEl = document.querySelector('.loader');
  let isFetching = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      async (entry) => {
        debugger;
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
renderHasToken();

addInfinityScrollEvent();
await renderBlogs();
