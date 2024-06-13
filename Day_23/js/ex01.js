// Bài 1:
var arrayNumber = [];
var numberOfElements = prompt('Nhập số n');
while (!Number(numberOfElements)) {
  numberOfElements = prompt('Nhập số n');
}
function isPrime(num) {
  if (num == 2) return true;
  if (num < 3) return false;
  if (num > 3) {
    for (let i = 2; i < num / 2; i++) {
      if (num % i == 0) return false;
    }
    return true;
  }
}
function reverseNum(n) {
  return n.toString().split('').reverse().join('');
}
function checkSymmetry(n) {
  if (Number(reverseNum(n)) === n) return true;
  return false;
}

function getSymmetryPrime(n) {
  var rs = 0;
  for (let i = n; ; i++) {
    if (isPrime(i) && checkSymmetry(i)) {
      rs = i;
      break;
    }
    if (!isPrime(i)) continue;
  }
  alert(`Số nguyên tố đối xứng gần nhất với số ${n} là: ${rs}`);
}
getSymmetryPrime(numberOfElements);
