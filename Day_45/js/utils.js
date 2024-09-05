export const ACCESS_TOKEN = 'access_token';
function escapeHTML(str) {
  return str.replaceAll(/[&<>"'\/]/g, function (char) {
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
export const STATUS_CODE = {
  OK: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};
export const pattern = {
  emailPattern:
    /\w(?=[^@]{3,29}@)((\.|-)\w+|\w+)*@[a-zA-Z0-9](-[a-zA-Z0-9]|[a-zA-Z0-9])+(\.[a-zA-Z0-9](-[a-zA-Z0-9]|[a-zA-Z0-9])+){1,2}/g,
  youtubeUrlPattern: /(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/g,
  phoneNumberPattern: /^0[0-9]{9,10}/g,
  imageUrlPattern:
    /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+\.(jpg|jpeg|png|gif)/g,
  linkUrlPattern: /https?:\/\/(www\.|ww2\.)?([\w-]+(\.[\w-]+)+)[^\s]*/g,
};
export const templateString = {
  loginTemplate: `
  <div class="auth-form">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-body">
              <h4 class="text-center">Sign in</h4>
              <form id="sign-in-form" method="POST">
                <div class="msg"></div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    required
                    placeholder="Password"
                  />
                </div>
                <button type="submit" class="btn btn-primary w-100">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading">
      <div class="loader"></div>
    </div>
  </div>
  `,
  registerTemplate: ` 
  <div class="auth-form">
    <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="card">
              <div class="card-body">
                <h4 class="text-center">Sign Up</h4>
                <form id="sign-up-form" method="POST">
                  <div class="msg"></div>
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      required
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <div class="loading">
        <div class="loader"></div>
      </div>
    </div>
  `,
  blogFormTemplate: `
    <form action="" class="blog-form">
      <div class="row gap-4">
      <label for="title" class="form-label fs-2">Title</label>
        <input
          type="text"
          class="form-control fs-3"
          id="title"
          name="title"
          placeholder="Enter title"
          required
        />
        <label for="content" class="form-label fs-2">Content</label>
        <label for="content" class="form-label fs-2">Create date</label>
        <input
          type="datetime-local"
          class="form-control fs-3"
          id="createdAt"
          name="createdAt"
          placeholder="Enter create date"
          required
        />
        <textarea
          id="content"
          name="content"
          class="form-control fs-3"
          placeholder="Leave a content here"
          rows="4"
          required
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
    </form>
  `,
  blogListTemplate: `
    <header class="header p-4">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-3">
              <div class="d-flex gap-4">
                <img src="https://pixner.net/circlehub/main/assets/images/logo.png" alt="Feed" />
                <div class="search-input position-relative">
                  <input type="search" class="form-control" placeholder="Search..." />
                  <span class="position-absolute search-icon-wrapper"
                    ><i class="fa-solid fa-magnifying-glass search-icon"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex align-items-center justify-content-evenly gap-6">
                <a href="#" class="nav-link active">
                  <i class="fa-solid fa-house"></i>
                </a>
                <a href="#" class="nav-link">
                  <i class="fa-solid fa-newspaper"></i>
                </a>
                <a href="#" class="nav-link">
                  <i class="fa-solid fa-user"></i>
                </a>
                <a href="#" class="nav-link">
                  <i class="fa-solid fa-gamepad"></i>
                </a>
              </div>
            </div>
            <div class="col-3">
              <div class="d-flex justify-content-end gap-5 align-items-center">
                <a href="#" class="nav-link mx-3 position-relative">
                  <span class="badge rounded-pill bg-danger position-absolute fs-5 count">5</span>
                  <i class="fa-solid fa-message"></i>
                </a>
                <a href="#" class="nav-link mx-3 position-relative">
                  <span class="badge rounded-pill bg-danger position-absolute fs-5 count">5</span>
                  <i class="fa-solid fa-bell"></i>
                </a>
                <!-- Profile dropdown -->
                <div class="actions">
                  <!--  -->
                  <!-- Login button -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main class="main">
        <div class="container">
          <div class="row gap-4">
            <div class="col-3">
              <div class="side-bar">
                <div class="row flex-nowrap">
                  <div class="img-wrap">
                    <img
                      class=""
                      src="https://pixner.net/circlehub/main/assets/images/avatar-1.png"
                      alt=""
                    />
                  </div>
                  <div class="user-info d-flex flex-wrap">
                    <span class="username d-block w-100 fs-3">Lerio Mao</span>
                    <span class="tagname">@maolion</span>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="nav-list">
                  <div class="row gap-4">
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-house"></i>
                        </span>
                        Home
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-2 d-block">
                          <i class="fa-solid fa-user"></i>
                        </span>
                        People
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-store"></i>
                        </span>
                        Market place
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-2 d-block">
                          <i class="fa-solid fa-bookmark"></i>
                        </span>
                        Favorites
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-gear"></i>
                        </span>
                        Settings
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-clock"></i>
                        </span>
                        Aniversary
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-save"></i>
                        </span>
                        Save
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-image"></i>
                        </span>
                        Picture
                      </a>
                    </div>

                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-trophy"></i>
                        </span>
                        Event
                      </a>
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="nav-list">
                  <div class="row gap-4">
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-circle-question"></i>
                        </span>
                        Help
                      </a>
                    </div>
                    <div class="nav-item">
                      <a href="#" class="d-flex align-items-center gap-4 nav-link active fs-2">
                        <span class="w-20 p-1 d-block">
                          <i class="fa-solid fa-circle-info"></i>
                        </span>
                        About
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="blog-form-wrapper"></div>
              <div class="blog-list mb-4"></div>
            </div>
          </div>
        </div>
      </main>
      <!--End new feed -->
      <div class="blog-list-end">
        <div class="loader"></div>
      </div>
  `,
  blogTemplateItem: (blog, userInfo, isDetail = false) => `
    <b-row>
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
              <span class="blog-username d-block w-100 fs-3">${escapeHTML(userInfo.name)}</span>
              <span class="user-status text-success">Online</span>
            </div>
          </div>
          <div class="other">
            <button><i class="fa-solid fa-ellipsis"></i></button>
          </div>
        </div>
        <div class="content fs-2 mt-4">
          <div class="blog-content mb-4">
            <a href="" class="blog-title ${isDetail ? '' : 'line-clamp'}" 
                data-id="${blog._id}"
            >
              ${blog.title}
            </a>
          </div>
          <div class="divider"></div>
          <div class="blog-media ${isDetail ? '' : 'line-clamp'}"">
            ${replaceLink(blog.content)}
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
              <span class="fs-9 text-createdAt">${formatDate(blog.createdAt)}</span>
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
    </b-row>
  `,
  profileTemplate: ``,
  logoutTemplate: ``,
};
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
const replaceLink = (inputStr) => {
  try {
    inputStr = inputStr.replaceAll(pattern.emailPattern, (match) => {
      return replaceRegex('emailPattern', match);
    });

    inputStr = inputStr.replaceAll(pattern.phoneNumberPattern, (match) => {
      return replaceRegex('phoneNumberPattern', match);
    });

    inputStr = inputStr.replaceAll(pattern.imageUrlPattern, (match) => {
      return replaceRegex('imageUrlPattern', match);
    });
    inputStr = inputStr.replaceAll(pattern.linkUrlPattern, (match) => {
      if (match.match(pattern.youtubeUrlPattern)) {
        return replaceRegex('youtubeUrlPattern', match);
      }
      return replaceRegex('linkUrlPattern', match);
    });
  } catch (err) {
    console.log(err);
  }

  return inputStr;
};
const getYtbUrl = (youtubeUrl) => {
  let videoYoutubeId = youtubeUrl.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2];
  if (videoYoutubeId) {
    return (videoYoutubeId = videoYoutubeId.split(/[^0-9a-z_-]/i)[0]);
  }
};
const replaceRegex = (key, match) => {
  const regexReplace = {
    emailPattern: `<a href="mailto:${match}">${match}</a>`,
    youtubeUrlPattern: `
    <iframe
          class='my-2'
          width='400'
          height='250'
          src='https://www.youtube.com/embed/${getYtbUrl(match)}'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen></iframe>
      `,
    linkUrlPattern: `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`,
    phoneNumberPattern: `<a href="tel:${match}">${match}</a>`,
    imageUrlPattern: `<img src="${match}" />`,
  };
  return regexReplace[key];
};
