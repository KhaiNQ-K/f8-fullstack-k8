const serverApi = 'https://fsdcjk-8080.csb.app';
const params = {
  _page: 1,
  _limit: 4,
  _sort: 'id',
  _order: 'desc',
};
let isLoading = false;
let prevPost = null;
const fetchPosts = async (params = {}, observer) => {
  try {
    showLoading(true);
    let queryStr = new URLSearchParams(params).toString();
    if (queryStr) {
      queryStr = `?${queryStr}`;
    }
    const response = await fetch(`${serverApi}/posts${queryStr}`);
    if (!response.ok) {
      throw new Error('Fetch to failed');
    }
    const { _page = 1, _limit = 4 } = params;
    const total = response.headers.get('X-Total-Count');
    const posts = await response.json();
    renderPosts(posts);
    showLoading(false);
    return { total };
  } catch (e) {
    showLoading(false);
    console.log(e);
  }
};
const showLoading = (isLoading) => {
  const loadingEl = document.querySelector('.loading-wrap');
  if (isLoading) {
    loadingEl.style.display = 'block';
  } else {
    loadingEl.style.display = 'none';
  }
};
const renderPosts = (posts = []) => {
  const postListEl = document.querySelector('.post-list');
  if (posts.length === 0) return;
  posts.map(createPostEl).forEach((postEl) => postListEl.append(postEl));
};
const createPostEl = ({ avatar, username, status, content, createDate }) => {
  const postEl = document.createElement('div');
  postEl.classList.add('row-12');
  postEl.innerHTML = `<div class="card mx-auto" style="max-width: 40rem; color: #fff">
        <div class="card-body">
          <div class="user-info d-flex gap-2">
            <div class="user-icon">
              <img
                src="${avatar}"
                alt=""
                class="rounded-circle"
              />
            </div>
            <div class="row flex-wrap">
              <span class="user-name">${username}</span>
              <span class="user-status ${
                status === 'active' ? 'text-success' : 'text-danger'
              } fs-9">${status === 'active' ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <p class="card-text mt-2">
            ${content}
          </p>
          <div class="text-end fs-8 text-secondary"></div>
            <span class="">${createDate}</span>
        </div>
      </div>`;
  return postEl;
};
const handleInfiniteScroll = async () => {
  const observer = new IntersectionObserver(intersecionCallback, {
    threshold: 1,
  });
  if (!getLastPost()) {
    debugger;
    fetchPosts(params).then(() => observer.observe(getLastPost()));
    return;
  }
};
const intersecionCallback = (entries, observer) => {
  entries.forEach(async (entry) => {
    if (!entry.isIntersecting) return;
    const lastPost = getLastPost();
    if (entry.isIntersecting) {
      const { total } = await fetchPosts(params);
      observer.unobserve(lastPost);
      if (total >= params._page * params._limit) {
        params._page += 1;
        observer.observe(getLastPost());
      } else {
        observer.unobserve(getLastPost());
      }
    }
  });
};

const getLastPost = () => {
  const postListEl = document.querySelector('.post-list');
  return postListEl.lastElementChild;
};

handleInfiniteScroll();
