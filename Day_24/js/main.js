//Bai 1
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};
Object.prototype.getError = function (key) {
  var self = this,
    a = key.split(".");
  for (var i = 0; i < a.length; i++) {
    var k = a[i];
    if (k in self) {
      self = self[k];
    } else {
      return;
    }
  }
  return self;
};
console.log(errors.getError("name.required"));
var ex01 = document.querySelector(".ex01");
ex01.innerHTML = errors.getError("email.required");
// Bai 2
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function getCustomer(name, age, address) {
  return {
    name,
    age,
    address,
  };
}
function createCustomers(customers) {
  if (!Array.isArray(customers)) return "The input is not an array";
  return customers
    .map(function (customer) {
      var shortName = getShortName(customer.name);
      var customer = getCustomer(customer.name, customer.age, customer.address);
      customer.shortName = shortName;
      return customer;
    })
    .sort(function (a, b) {
      return a.age - b.age;
    });
}
// console.log(createCustomer("John", 30, "123 Main St"));
function getShortName(name) {
  var arrName = name.trim().split(" ");
  console.log(arrName);
  if (String(name)) {
    return `${arrName[0]} ${arrName[arrName.length - 1]}`;
  }
}
console.log(createCustomers(customers));
var ex02 = document.querySelector(".ex02");
ex02.innerHTML = JSON.stringify(createCustomers(customers));
// Bai 3
