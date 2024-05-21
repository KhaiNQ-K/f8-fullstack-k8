// Bài 1
var a = 10;
var b = 20;
a = a + b;
b = a - b;
a = a - b;
// Bài 2
var s = 10 + 20 + 5 ** 10 / 2;
// Bài 3
var c = 10,
  d = 80,
  e = 50;
var max = e;
if (max < c) max = c;
if (max < d) max = d;
// Bài 4
var f = 10;
var g = -80;
var result = f * g > 0 ? "Cùng dấu" : "Trái dấu";
// Bài 5
var i = 100,
  j = 26,
  k = 58;
var temp;
if (i > j) {
  temp = i;
  i = j;
  j = temp;
}
if (j > k) {
  temp = j;
  j = k;
  k = temp;
}
if (i > j) {
  temp = i;
  i = j;
  j = temp;
}
var htmlEntities = `
<div class="row">
  <div class="col-3">
  <h2 class="">Bài 1</h2>
  <pre>
  Thực hiện hoán vị hai số: a = 20; b = 10

    var a = 20, b = 10;
    a = a + b;
    b = a - b;
    a = a - b;
      <p>Kết quả: a = ${a}, b = ${b}</p>
    </pre>
  </div>
  <div class="col-3">
  <h2 class="">Bài 2</h2>
  Kết quả biểu thức: s = 10 + 20 + 5^10 / 2 = ${s}
  </div>
  <div class="col-3">
  <h2>Bài 3</h2>
  <p>Tìm số lớn nhất trong trong 3 số a = 10,b = 80, c = 40</p>
  <pre>
    var max = c;<br/>
    if(max < a) max = a;<br/>
    if(max < b) max = b;
    <p>Số lớn nhất là số ${max}</p>
  </pre>
  </div>
  <div class="col-3">
  <h2>Bài 4</h2>
  <p>Kiểm tra 2 số a = 10,b = -80 có cùng dấu không</p>
  <pre>
  var a = 10;
  var b = -80;
  var result = a * b > 0 ? 'Cùng dấu' : 'Trái dấu';
    
    <p>Hai số a và b ${result}</p>
  </pre>
  </div>
  <div class="col-3">
  <h2>Bài 5</h2>
    <p>Sắp xếp 3 số a = 100; b = 26; c = 58</p>
    <pre>
    var a = 100,b = 35,c = 120,temp;
    if (a > b) {
      temp = a;
      a = b;
      b = temp;
    }
    if (b > c) {
      temp = b;
      b = c;
      c = temp;
    }
    if (a > b) {
      temp = a;
      a = b;
      b = temp;
    }
    Kết quả a = ${i}, b = ${j}, c = ${k}
    </pre>
  </div>

</div>
  
  
`;
document.write(htmlEntities);
