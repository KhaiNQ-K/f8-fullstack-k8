// Bài 2
var arrayNumber = [];
var arrayNumber1 = [];
var middleFirst = 0;
var middleLast = 0;
var result = 0;
var numberOfElements = prompt('Nhập số lượng phần tử của mảng 1');
for (var i = 0; i < numberOfElements; i++) {
  var element = prompt('Nhập phần tử thứ ' + (i + 1));
  while (!Number(+element)) {
    alert('Giá trị của phần tử phải là số');
    element = prompt('Nhập phần tử thứ ' + (i + 1));
  }
  arrayNumber[i] = +element;
}
var numberOfElements2 = prompt('Nhập số lượng phần tử của mảng 2');
for (var i = 0; i < numberOfElements2; i++) {
  var element = prompt('Nhập phần tử thứ ' + (i + 1));
  while (!Number(+element)) {
    alert('Giá trị của phần tử phải là số');
    element = prompt('Nhập phần tử thứ ' + (i + 1));
  }
  arrayNumber1[i] = +element;
}
function concatArray(arr1, arr2) {
  return arr1.concat(arr2);
}
var newArray = concatArray(arrayNumber, arrayNumber1).sort(function (a, b) {
  return a - b;
});
if (newArray.length % 2 === 0) {
  middleFirst = newArray[newArray.length / 2 - 1];
  middleLast = newArray[newArray.length / 2];
  result = (middleFirst + middleLast) / 2;
} else {
  var middle = (newArray.length - 1) / 2;
  result = newArray[middle];
}
console.log(newArray);

alert('Trung vị của mảng là: ' + result);
//
