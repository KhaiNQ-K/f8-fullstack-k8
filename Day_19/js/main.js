// Bài 1

var fiboResult = '';
function getFibonacci(n, a = 1, b = 1, count = 0) {
  if (count === n) {
    return;
  }
  if (count < n) {
    fiboResult += a + ' ';
    return getFibonacci(n, b, a + b, count + 1);
  }
  if (n <= 0 && n % 1 !== 0) fiboResult = 'Vui lòng nhập số nguyên dương!';
}

let fiboBtn = document.querySelector('.fibo-btn');
fiboBtn.addEventListener('click', function () {
  fiboResult = '';
  let n = document.querySelector('.quantity').value;
  getFibonacci(Number(n));
  let rs = fiboResult;
  fiboResult = document.querySelector('.fibo-result');
  fiboResult.innerHTML = rs;
});
// Bài 2
var reverseNumb = '';
function reverseNumber(number) {
  if (number < 0) {
    reverseNumb += '-';
    number = Math.abs(number);
  }
  if (number % 1 !== 0) return 'Vui lòng nhập số nguyên!';
  if (number % 10 === 0) return number;
  reverseNumb += number % 10;
  return reverseNumber(Math.floor(number / 10));
}
let reverseBtn = document.querySelector('.reverse-btn');
reverseBtn.addEventListener('click', function () {
  reverseNumb = '';
  let n = document.querySelector('.reverse-quantity').value;
  reverseNumber(n);
  let rs = reverseNumb;
  reverseResult = document.querySelector('.reverse-result');
  reverseResult.innerHTML = rs;
});
// Bài 3
function numberToString(num) {
  let number = Number(num);
  if (number === 0) {
    return 'Không';
  }
  if (number === 1) {
    return 'Một';
  }
  if (number === 2) {
    return 'Hai';
  }
  if (number === 3) {
    return 'Ba';
  }
  if (number === 4) {
    return 'Bốn';
  }
  if (number === 5) {
    return 'Năm';
  }
  if (number === 6) {
    return 'Sáu';
  }
  if (number === 7) {
    return 'Bảy';
  }
  if (number === 8) {
    return 'Tám';
  }
  if (number === 9) {
    return 'Chín';
  }
}
var convertNumberStr = '';
function generateNumberString(number) {
  if (!Number(number)) return (convertNumberStr = 'Vui lòng nhập số');
  if (number < 0 || number > 9999)
    return (convertNumberStr = 'Vui lòng nhập số trong khoảng từ 0 đến 9999!');
  if (number % 1 !== 0) return (convertNumberStr = 'Vui lòng nhập sô nguyên');
  if (number / 1000 > 1) {
    convertNumberStr += numberToString(Math.floor(number / 1000)) + ' Nghìn ';
    return generateNumberString(number % 1000);
  }
  if (number / 100 > 1) {
    convertNumberStr += numberToString(Math.floor(number / 100)) + ' Trăm ';
    return generateNumberString(number % 100);
  }

  if (number / 10 > 1) {
    console.log(Math.floor(number / 10));
    convertNumberStr += numberToString(Math.floor(number / 10)) + '  ';
    return generateNumberString(number % 10);
  }
  if (number < 10 && number > 0) {
    convertNumberStr += numberToString(number);
    return;
  }
}
let convertNumBtn = document.querySelector('.convert-btn');
convertNumBtn.addEventListener('click', function () {
  convertNumberStr = '';
  let n = document.querySelector('.number').value;
  generateNumberString(Number(n));
  let rs = convertNumberStr;
  convertRs = document.querySelector('.convert-result');
  convertRs.innerHTML = rs;
});
