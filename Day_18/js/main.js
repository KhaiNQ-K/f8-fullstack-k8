// Tinh tien Taxi
let FIRST_NKM = 1;
let SECOND_NKM = 5;
let THIRD_NKM = 120;
let SALE_KM = 10;
let FIRST_PRICE = 15000;
let SECOND_PRICE = 13500;
let THIRD_PRICE = 11000;
function chargeTaxi(nKm) {
  let totalPrice = 0;
  if (nKm < 0) return;
  if (nKm <= FIRST_NKM) {
    totalPrice += nKm * FIRST_PRICE;
  } else if (FIRST_NKM <= nKm && nKm <= SECOND_NKM) {
    totalPrice = SECOND_PRICE * (nKm - FIRST_NKM) + FIRST_NKM * FIRST_PRICE;
  } else if (nKm >= SECOND_NKM) {
    totalPrice =
      THIRD_PRICE * (nKm - SECOND_NKM) +
      SECOND_PRICE * (SECOND_NKM - FIRST_NKM) +
      FIRST_NKM * FIRST_PRICE;
    if (nKm > THIRD_NKM) {
      totalPrice = totalPrice * (1 - SALE_KM / 100);
    }
  }
  return totalPrice;
}
let taxiBtn = document.querySelector('.taxi-btn');
taxiBtn.addEventListener('click', function () {
  let nKm = document.querySelector('.nKm').value;
  const totalPrice = chargeTaxi(nKm);
  let resultElement = document.querySelector('.taxi-result');
  resultElement.innerHTML = totalPrice;
});
// Bài 2

let FIRST_NPOWER = 50;
let SECOND_NPOWER = 100;
let THIRD_NPOWER = 200;
let FOURTH_NPOWER = 300;
let FIFTH_NPOWER = 400;
let FIRST_EPRICE = 1678;
let SECOND_EPRICE = 1734;
let THIRD_EPRICE = 2014;
let FOURTH_EPRICE = 2536;
let FIFTH_EPRICE = 2834;
let SIXTH_EPRICE = 2927;
function electricCost(nPower) {
  let totalCost = 0;
  if (nPower < 0) return;
  else if (nPower <= FIRST_NPOWER) {
    totalCost = FIRST_EPRICE * nPower;
  } else if (nPower > FIRST_NPOWER && nPower <= SECOND_NPOWER) {
    totalCost = SECOND_EPRICE * (nPower - FIRST_NPOWER) + FIRST_EPRICE * FIRST_NPOWER;
  } else if (nPower >= SECOND_NPOWER && nPower <= THIRD_NPOWER) {
    totalCost =
      THIRD_EPRICE * (nPower - SECOND_NPOWER) +
      SECOND_EPRICE * (SECOND_NPOWER - FIRST_NPOWER) +
      FIRST_EPRICE * FIRST_NPOWER;
  } else if (nPower >= THIRD_NPOWER && nPower <= FOURTH_NPOWER) {
    totalCost =
      FOURTH_EPRICE * (nPower - THIRD_EPRICE) +
      THIRD_EPRICE * (THIRD_NPOWER - SECOND_NPOWER) +
      SECOND_EPRICE * (SECOND_NPOWER - FIRST_NPOWER) +
      FIRST_NPOWER * FIRST_NPOWER;
  } else if (nPower >= FOURTH_NPOWER && nPower <= FIFTH_NPOWER) {
    totalCost =
      FIFTH_EPRICE * (nPower - FOURTH_NPOWER) +
      FOURTH_EPRICE * (FOURTH_NPOWER - THIRD_EPRICE) +
      THIRD_EPRICE * (THIRD_NPOWER - SECOND_NPOWER) +
      SECOND_EPRICE * (SECOND_NPOWER - FIRST_NPOWER) +
      FIRST_NPOWER * FIRST_NPOWER;
  } else {
    totalCost =
      SIXTH_EPRICE * (nPower - FIFTH_NPOWER) +
      FIFTH_EPRICE * (FIFTH_NPOWER - FOURTH_NPOWER) +
      FOURTH_EPRICE * (FOURTH_NPOWER - THIRD_EPRICE) +
      THIRD_EPRICE * (THIRD_NPOWER - SECOND_NPOWER) +
      SECOND_EPRICE * (SECOND_NPOWER - FIRST_NPOWER) +
      FIRST_NPOWER * FIRST_NPOWER;
  }
  return totalCost;
}
let electric = document.querySelector('.power-btn');
electric.addEventListener('click', function () {
  let nPower = document.querySelector('.nPower').value;
  const totalPrice = electricCost(nPower);
  let resultElement = document.querySelector('.power-result');
  resultElement.innerHTML = totalPrice;
});
// Bài 3: Tính giá trị biểu thức
function calculateExpression(n) {
  if (n <= 0) return;
  var total = 0;
  let prevNumb = 1;
  for (let i = 2; i <= n + 1; i++) {
    total += prevNumb * i;
    prevNumb = i;
  }
  return total;
}
let n = document.querySelector('.expression-btn');
n.addEventListener('click', function () {
  let nExpression = Number(document.querySelector('.nExpression').value);
  const resultExpress = calculateExpression(nExpression);
  let resultElement = document.querySelector('.expression-result');
  resultElement.innerHTML = resultExpress;
});

function isPrime(number) {
  let isPrime = true;
  if (number < 2) return false;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}
let isPrimeBtn = document.querySelector('.isPrime-btn');
isPrimeBtn.addEventListener('click', function () {
  let isPrimeNumber = Number(document.querySelector('.isPrime').value);
  let texInner = `Số ${isPrimeNumber} ${
    isPrime(isPrimeNumber) ? 'là số nguyên tố' : 'không phải là số nguyên tố'
  }`;
  let resultElement = document.querySelector('.isPrime-result');
  resultElement.innerHTML = texInner;
});

function paintNumberTriangle(rowNumber) {
  var triagle = '';
  var countNumber = 1;
  for (let i = 1; i <= rowNumber; i++) {
    for (let j = 1; j <= i; j++) {
      triagle += countNumber + ' ';
      countNumber++;
    }
    triagle += '<br>';
  }
  return triagle;
}
let rowNumberBtn = document.querySelector('.row-btn');
rowNumberBtn.addEventListener('click', function () {
  let rowNumber = Number(document.querySelector('.row').value);
  var result = paintNumberTriangle(rowNumber);
  let resultRowNum = document.querySelector('.row-result');
  resultRowNum.innerHTML = result;
});
// Bài 6: Vẽ bàn cờ vua
function generateChess() {
  var row = 8;
  var column = 8;
  var chess = '';
  for (let i = 1; i <= row; i++) {
    var currentValue = i;
    for (j = 1; j <= column; j++) {
      if ((j + i) % 2 !== 0) {
        chess += `<span class="black"></span>`;
      } else {
        chess += `<span class="white"></span>`;
      }
      currentValue++;
    }
    chess += '<br>';
  }
  return chess;
}
let resultChess = document.querySelector('.chess-result');
resultChess.innerHTML = generateChess();
// Bài 7: Bảng cứu chương
function generateMultiplicationTable(n) {
  var result = '';
  for (let i = 1; i <= n; i++) {
    result += '<div class="column">';
    for (let j = 1; j <= n; j++) {
      result += `<span>${i}  x   ${j}  =  ${i * j}</span>`;
      result += '<br>';
    }
    result += '</div>';
  }
  return result;
}
let resultMultipliecationTalbe = document.querySelector('.multipleTable-result');
resultMultipliecationTalbe.innerHTML = generateMultiplicationTable(10);
