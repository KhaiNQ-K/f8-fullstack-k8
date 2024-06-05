var arrayNumber = [];
var numberOfElements = prompt('Nhập số lượng phần tử của mảng');
for (var i = 0; i < numberOfElements; i++) {
  var element = prompt('Nhập phần tử thứ ' + (i + 1));
  while (!Number(+element)) {
    alert('Giá trị của phần tử phải là số');
    element = prompt('Nhập phần tử thứ ' + (i + 1));
  }
  arrayNumber[i] = +element;
}

var sumPrimeNumber = 0;
var flagIsPrime = false;
function sumPrime(arrayNumber) {
  if (!Array.isArray(arrayNumber)) return;
  for (var idx in arrayNumber) {
    var element = +arrayNumber[+idx];
    if (Number.isNaN(element)) continue;
    var isPrime = isNumberPrime(element);
    if (element == 3 || element == 5 || element == 7) isPrime = true;
    console.log(isPrime);
    if (isPrime) {
      flagIsPrime = true;
      sumPrimeNumber += element;
    }
  }
}
function isNumberPrime(number) {
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
sumPrime(arrayNumber);
if (arrayNumber.length == 0 || !flagIsPrime) {
  alert('Không có số nguyên tố');
} else {
  alert('Tổng các số nguyên tố là ' + sumPrimeNumber);
}
