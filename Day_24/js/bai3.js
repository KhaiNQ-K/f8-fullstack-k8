var loginBtn = document.querySelector(".btn-login");
loginBtn.addEventListener("click", function () {
  var email = document.getElementsByName("email")[1].value;
  var password = document.getElementsByName("password")[1].value;
  var { data, status, message } = handleLogin(email, password);
  if (status == 200) {
    alert(`${message} ${data}`);
  } else {
    alert(`${message}`);
  }
});
var registerBtn = document.querySelector(".btn-register");
registerBtn.addEventListener("click", function () {
  var email = document.getElementsByName("email")[0].value;
  var name = document.getElementsByName("name")[0].value;
  var password = document.getElementsByName("password")[0].value;

  var { data, status, message } = handleRegister(email, name, password);
  if (status == 200) {
    alert(`${message} ${data}`);
  } else {
    alert(`${message}`);
  }
});
var users = [];
var errorMessage = {
  email: {
    required: "Vui lòng nhập email",
    unique: "Email đã đăng ký",
    email: "Định dạng email phải hợp lệ",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    min: "Mật khẩu phải ít nhất 5 ký tự",
  },
  name: {
    required: "Vui lòng nhập tên",
    min: "Tên phải ít nhất 5 ký tự",
  },
};
function addUser(email, name, password) {
  return {
    email,
    name,
    password,
  };
}
function validateRegister(user) {
  var error = {
    invalid: false,
    message: "",
  };

  var exists = users.find(function (user) {
    return user.email === user.email;
  });
  if (exists) {
    error.invalid = true;
    error.message = getError(errorMessage, "email.unique");
  } else if (!user.email) {
    error.invalid = true;
    error.message = getError(errorMessage, "email.required");
  } else if (!user.email.includes("@")) {
    error.invalid = true;
    error.message = getError(errorMessage, "email.email");
  } else if (!user.name) {
    error.invalid = true;
    error.message = getError(errorMessage, "name.required");
  } else if (user.name.length < 5) {
    error.invalid = true;
    error.message = getError(errorMessage, "name.min");
  } else if (!user.password) {
    error.invalid = true;
    error.message = getError(errorMessage, "password.required");
  } else if (user.password.length < 5) {
    error.invalid = true;
    error.message = getError(errorMessage, "password.min");
  }
  return error;
}
function handleRegister(email, name, password) {
  //create user
  var user = addUser(email, name, password);

  //add role
  user.role = "user";
  //check valid
  var { invalid, message } = validateRegister(user);

  if (!invalid) {
    users.push(user);
    return {
      data: JSON.stringify(users),
      status: 200,
      message: "Đăng ký thành công",
    };
  } else {
    return {
      data: null,
      status: 500,
      message: message,
    };
  }
}
function handleLogin(email, password) {
  var user = users.find(function (user) {
    return user.email === email && user.password === password;
  });
  if (user)
    return {
      data: JSON.stringify(user),
      status: 200,
      message: "Đăng nhập thành công",
    };
  return {
    data: [],
    status: 500,
    message: "Email hoặc mật khẩu không chính xác",
  };
}

function getError(error, keyStr) {
  var errorField = keyStr.split(".");
  for (var idx in errorField) {
    var field = errorField[idx];
    if (field in error) {
      error = error[field];
    } else {
      return;
    }
  }
  return error;
}
