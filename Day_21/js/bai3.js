var arrayNumber = [];
var numberOfElements = prompt('Nhập số lượng phần tử của mảng');
for (var i = 0; i < numberOfElements; i++) {
  arrayNumber[i] = prompt('Nhập phần tử thứ ' + (i + 1));
}
var newArray = filterArray(filterSameElement, arrayNumber);

function filterArray(callback, currentArray) {
  if (!Array.isArray(currentArray)) return;
  var newArray = [];
  for (var idx in currentArray) {
    // console.log(currentArray[idx], idx, currentArray, callback(currentArray[idx], currentArray));
    if (callback(currentArray[idx], idx, currentArray)) {
      var element = currentArray[+idx];
      if (!Number(element)) {
        newArray.push(currentArray[idx]);
      } else {
        newArray.push(+currentArray[idx]);
      }
    }
  }
  return newArray;
}
function filterSameElement(element, idx, array) {
  return array.indexOf(element) == idx;
}
alert('Danh sách phần tử sau khi lọc: ' + newArray);
