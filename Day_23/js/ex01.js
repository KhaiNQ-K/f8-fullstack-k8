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
    for (let i = 2; i < Math.sqrt(num); i++) {
      if (num % i == 0) return false;
    }
    return true;
  }
}
function reverseNum(n) {
  return Number(n.toString().split('').reverse().join(''));
}
function checkSymmetry(n) {
  if (Number(reverseNum(n)) == Number(n)) return true;
  return false;
}
//
function getSymmetryPrime(n) {
  var rs = 0;
  for (let i = n; ; i++) {
    console.log(i);
    if (isPrime(+i) && checkSymmetry(+i)) {
      rs = i;
      break;
    }
    console.log();
    if (+i === 100030001) break;
    if (!isPrime(i) || !checkSymmetry(i)) continue;
  }
  alert(`Số nguyên tố đối xứng gần nhất với số ${n} là: ${rs}`);
}
getSymmetryPrime(numberOfElements);
