const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const aShowModel = $('.login-link');
const modalEl = $('.modal');
const overlayEl = $('.overlay');
const closeBtnEl = $('.close-icon');
const emailInputEl = $('input[name="email"]');
const passwordInputEl = $('input[name="password"]');
let nameInputEl = null;
const loadingEl = $('.loading');
const toastEl = $('.toast');
const formGroupEl = $$('.form-group');
const submitForm = $('.form-login');
const passwordIconEl = $('.icon-password');
const loginSwitch = $('.login-switch');
const registerSwitch = $('.register-switch');
const loginFormEl = $$('.login-wrap');
const registerFormEl = $$('.register-wrap');
var isShow = false;
const CLASS_INVALID = {
  EMAIL_INVALID: 'email-invalid',
  PASSWORD_REQUIRED: 'password-required',
  NAME_REQUIRED: 'name-required',
  EMAIL_REQUIRED: 'email-required',
};
const PASSWORD_ICON = {
  EYE: '<i class="fa-solid fa-eye"></i>',
  EYE_SLASH: '<i class="fa-solid fa-eye-slash"></i>',
};
const app = {
  users: [],
  isShow: false,
  showPassword: false,
  isLogin: true,
  inputBlur: {
    email: false,
    password: false,
    name: false,
  },
  methods: {
    showModal() {
      app.isShow = true;
      this.toggleModal();
    },
    toggleModal: function () {
      modalEl.classList.toggle('show', app.isShow);
    },
    hideModal: function () {
      app.isShow = false;
      this.toggleModal();
    },
    togglePassword: function () {
      if (!app.showPassword) {
        passwordInputEl.type = 'password';
        app.showPassword = false;
        passwordIconEl.innerHTML = PASSWORD_ICON.EYE;
      } else {
        passwordInputEl.type = 'text';
        app.showPassword = true;
        passwordIconEl.innerHTML = PASSWORD_ICON.EYE_SLASH;
      }
    },
    handleLogin: function () {
      // validation
      var invalid = this.handleValidation();
      if (invalid) return;
      const user = {
        email: emailInputEl.value,
        password: passwordInputEl.value,
      };

      loadingEl.classList.add('active');
      setTimeout(() => {
        const exists = app.users.some((x) => x.email == user.email && x.password == user.password);
        if (!exists) {
          toastEl.classList.add('error');
          toastEl.innerText = 'Email hoặc mật khẩu không chính xác';
          loadingEl.classList.remove('active');
          return;
        }
        toastEl.innerText = 'Đăng nhận thành công';
        toastEl.classList.add('success');
        loadingEl.classList.remove('active');
      }, 3000);
    },
    handleRegister: function () {
      // validation
      var invalid = this.handleValidation();
      if (invalid) return;
      const user = {
        email: emailInputEl.value,
        password: passwordInputEl.value,
        name: nameInputEl.value,
      };
      loadingEl.classList.add('active');
      setTimeout(() => {
        const exists = app.users.some((x) => x.email == user.email);
        if (exists) {
          toastEl.classList.add('error');
          toastEl.innerText = 'Email được đăng ký';
          loadingEl.classList.remove('active');
          return;
        }
        app.users.push(user);
        loadingEl.classList.add('active');
        toastEl.classList.add('success');
        loadingEl.classList.remove('active');
        toastEl.innerText = 'Đăng ký thành công';
      }, 3000);
    },
    emailInvalid: function () {
      const regex = '^[^@]+@[^@]+.[^@]+$';
      // check email format
      const email = emailInputEl.value;
      let data = {
        invalid: false,
        required: false,
        class: [CLASS_INVALID.EMAIL_REQUIRED, CLASS_INVALID.EMAIL_INVALID],
      };
      if (!email) {
        data.invalid = false;
        data.required = true;
      } else if (!email.match(regex)) {
        data.invalid = true;
        data.required = false;
      }
      return data;
    },
    passwordInvalid() {
      const password = passwordInputEl.value;
      if (!password) {
        return {
          required: true,
          class: CLASS_INVALID.PASSWORD_REQUIRED,
        };
      } else {
        return {
          required: false,
          class: CLASS_INVALID.PASSWORD_REQUIRED,
        };
      }
    },
    nameInvalid() {
      const name = nameInputEl.value;
      if (!name) {
        return {
          required: true,
          class: CLASS_INVALID.NAME_REQUIRED,
        };
      } else {
        return {
          required: false,
          class: CLASS_INVALID.NAME_REQUIRED,
        };
      }
    },
    handleValidation: function (type, isBlur) {
      const emailInvalid = this.emailInvalid();
      const passwordInvalid = this.passwordInvalid();
      if (!app.isLogin) {
        const nameInvalid = this.nameInvalid();
        formGroupEl[0].classList.toggle(
          CLASS_INVALID.NAME_REQUIRED,
          type === 'name' || app.inputBlur.name ? nameInvalid.required : false
        );
      }
      if (emailInvalid.class.includes(CLASS_INVALID.EMAIL_REQUIRED)) {
        formGroupEl[1].classList.toggle(
          CLASS_INVALID.EMAIL_REQUIRED,
          type === 'email' || app.inputBlur.email ? emailInvalid.required : false
        );
      }
      if (emailInvalid.class.includes(CLASS_INVALID.EMAIL_INVALID)) {
        formGroupEl[1].classList.toggle(CLASS_INVALID.EMAIL_INVALID, emailInvalid.invalid);
      }
      formGroupEl[2].classList.toggle(
        passwordInvalid.class,
        type === 'password' || app.inputBlur.password ? passwordInvalid.required : false
      );
      if (!emailInvalid.required && !emailInvalid.invalid && !passwordInvalid.required) {
        return false;
      } else {
        return true;
      }
    },
    clearData: function () {
      emailInputEl.value = '';
      passwordInputEl.value = '';
      if (nameInputEl) {
        nameInputEl.value = '';
      }
      app.inputBlur = {
        email: false,
        password: false,
        name: false,
      };
      toastEl.innerText = '';
      toastEl.classList.remove('success', 'error');
      app.showPassword = false;
      this.togglePassword();
      formGroupEl[0].classList.remove(CLASS_INVALID.NAME_REQUIRED);
      formGroupEl[1].classList.remove(CLASS_INVALID.EMAIL_INVALID);
      formGroupEl[1].classList.remove(CLASS_INVALID.EMAIL_REQUIRED);
      formGroupEl[2].classList.remove(CLASS_INVALID.PASSWORD_REQUIRED);
    },
    handleSwitchForm: function () {
      debugger;
      this.clearData();
      loginSwitch.classList.toggle('active', app.isLogin);
      registerSwitch.classList.toggle('active', !app.isLogin);
      loginFormEl.forEach((el) => {
        el.style.display = app.isLogin ? 'block' : 'none';
      });
      registerFormEl.forEach((el) => {
        el.style.display = !app.isLogin ? 'block' : 'none';
      });
    },
  },
  handleEvents: function () {
    const _this = this;
    // Switch form
    loginSwitch.onclick = function () {
      _this.isLogin = true;
      _this.methods.handleSwitchForm();
    };
    registerSwitch.onclick = function () {
      _this.isLogin = false;
      _this.methods.handleSwitchForm();
      nameInputEl = $('input[name="fullname"]');
      nameInputEl.onblur = function () {
        _this.inputBlur.name = true;
        _this.methods.handleValidation('name');
      };
      nameInputEl.oninput = function () {
        _this.methods.handleValidation('name');
      };
    };

    // Sumit form
    submitForm.onsubmit = function (e) {
      e.preventDefault();
      if (_this.isLogin) {
        _this.methods.handleLogin();
      } else {
        _this.methods.handleRegister();
      }
    };

    // Show hide modal
    aShowModel.onclick = function () {
      _this.methods.showModal();
    };

    overlayEl.onclick = function (e) {
      e.stopPropagation();
      _this.methods.hideModal();
      _this.methods.clearData();
    };
    closeBtnEl.onclick = function () {
      _this.methods.hideModal();
      _this.methods.clearData();
    };
    // Input value login
    emailInputEl.oninput = function () {
      _this.methods.handleValidation('email');
    };
    emailInputEl.onblur = function () {
      _this.inputBlur.email = true;
      _this.methods.handleValidation('email');
    };
    passwordInputEl.oninput = function () {
      _this.methods.handleValidation('password');
    };
    passwordInputEl.onblur = function () {
      _this.inputBlur.password = true;
      _this.methods.handleValidation('password');
    };
    // show/hide password
    passwordIconEl.onclick = function () {
      _this.methods.togglePassword();
    };
  },
  run() {
    this.users = [];
    this.render();
    this.handleEvents();
  },
  render() {
    debugger;
    this.isLogin = true;
    this.methods.handleSwitchForm();
  },
};
app.run();
