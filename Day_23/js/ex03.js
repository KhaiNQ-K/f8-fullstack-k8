function ex03() {
  var arrayNumber = [];
  var numberOfElements = prompt('Nhập số lượng phần tử của mảng');
  for (var i = 0; i < numberOfElements; i++) {
    var element = prompt('Nhập phần tử thứ ' + (i + 1));
    // while (!Number(element)) {
    //   alert('Giá trị của phần tử phải là số');
    //   element = prompt('Nhập phần tử thứ ' + (i + 1));
    // }
    arrayNumber[i] = +element;
  }
  // Sort array
  var newArray = arrayNumber.sort(function (a, b) {
    return a - b;
  });
  console.log(newArray);
  // max element < 0
  if (newArray[length - 1] < 0 || newArray[0] > 1) return 1;
  var item = 0;
  for (let i = newArray[0]; ; i++) {
    if (!newArray.includes(i)) {
      item = i;
      break;
    }
    continue;
  }
  alert(
    `Số nguyên dương nhỏ nhât không thuộc mảng ${JSON.parse(JSON.stringify(newArray))} là ${item}`
  );
}
ex03();
