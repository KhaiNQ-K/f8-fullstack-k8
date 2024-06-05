// Bài 1:
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
var maxIndex = 0;
var maxElement = arrayNumber[0];
var minIndex = 1;
var minElement = arrayNumber[1];
if (arrayNumber.length == 0) alert('Mảng rỗng');
if (minElement > maxElement) {
  minIndex = 0;
  maxIndex = 1;
  minElement = arrayNumber[0];
  maxElement = arrayNumber[1];
}
for (let idx in arrayNumber) {
  if (idx == 0) continue;
  if (idx == 1) continue;
  if (arrayNumber[idx] > maxElement) {
    maxIndex = +idx;
    maxElement = arrayNumber[idx];
  }
  if (arrayNumber[idx] < minElement) {
    minIndex = +idx;
    minElement = arrayNumber[idx];
  }
}
alert(
  `Phần tử nhỏ nhất có giá trị là ${minElement} ở vị trí thứ ${minIndex}. Phần tử lớn nhất có giá trị là ${maxElement} ở vị trí thứ ${maxIndex}`
);
