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
function sortAscending(arrayNumber) {
  let min;
  for (let i = 0; i < arrayNumber.length - 1; i++) {
    min = i;
    for (let j = i + 1; j < arrayNumber.length; j++) {
      if (arrayNumber[j] < arrayNumber[min]) {
        min = j;
      }
    }
    swap(arrayNumber, min, i);
  }
}
function swap(array, minIndex, idx) {
  var temp = array[minIndex];
  array[minIndex] = array[idx];
  array[idx] = temp;
}
sortAscending(arrayNumber);
alert('Mảng sau khi sắp xếp' + arrayNumber);
var element = prompt('Nhập số muốn chèn');
while (!Number(+element)) {
  alert('Vui lòng nhập số');
  element = prompt('Nhập số muốn chèn');
}

var newArray = [];
var flag = false;
for (var idx in arrayNumber) {
  var currentElement = arrayNumber[idx];

  if (arrayNumber[idx] > +element && !flag) {
    flag = true;
    newArray[newArray.length] = +element;
    newArray[newArray.length] = currentElement;
  } else {
    newArray[newArray.length] = currentElement;
  }
}
alert('Mảng được sắp xếp sau khi chèn' + newArray);
