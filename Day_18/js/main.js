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
let taxiBtn = document.querySelector(".taxi-btn");
taxiBtn.addEventListener("click", function () {
  let nKm = document.querySelector(".nKm").value;
  const totalPrice = chargeTaxi(nKm);
  let resultElement = document.querySelector(".taxi-result");
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
    totalCost =
      SECOND_EPRICE * (nPower - FIRST_NPOWER) + FIRST_EPRICE * FIRST_NPOWER;
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
let electric = document.querySelector(".power-btn");
electric.addEventListener("click", function () {
  let nPower = document.querySelector(".nPower").value;
  const totalPrice = electricCost(nPower);
  let resultElement = document.querySelector(".power-result");
  resultElement.innerHTML = totalPrice;
});
