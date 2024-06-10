// Bài 1
function ex01() {
  var arrA = [1, 4, 3, 2];
  var arrB = [5, 2, 6, 7, 1];
  function sameValue(arrA, arrB) {
    return arrA.filter((x) => arrB.includes(x));
  }
  var rs = sameValue(arrA, arrB);
  document.getElementById('ex01').innerHTML = `[${rs}]`;
}
function ex02() {
  //flat array but dont using flat();
  var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
  //dont using flat() method
  var rs = flattenArray(arr);
  document.getElementById('ex02').innerHTML = `[${rs}]`;
}

function flattenArray(arr) {
  var result = [];
  for (var i in arr) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
function ex03() {
  var arr = [
    ['a', 1, true],
    ['b', 2, false],
    ['c', undefined, true],
  ];
  function filterTypeArr(arr) {
    var arrayFlat = flattenArray(arr);
    var result = [];
    var typeArr = [];
    for (var idx in arrayFlat) {
      var element = arrayFlat[idx];
      var typeOfElement = typeof element;
      if (element === null) {
        typeOfElement = 'null';
      } else if (Array.isArray(element)) {
        typeOfElement = 'array';
      }
      var idx = typeArr.indexOf(typeOfElement);
      if (!typeArr.includes(typeOfElement)) {
        typeArr.push(typeOfElement);
        result.push([element]);
      } else {
        result[idx].push(element);
      }
    }
    return result;
  }
  var rs = JSON.stringify(filterTypeArr(arr));

  console.log(rs);
  document.getElementById('ex03').innerHTML = rs;
}

// Bài 4:
function ex04() {
  var arr = [
    [
      'https://plus.unsplash.com/premium_photo-1675805015392-28fd80c551ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww',
      'Tiêu đề bài viết 1',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora cumque, esse atque nulla sit quas expedita vitae in a veniam quae suscipit distinctio ullam iusto cum, ut eos autem.',
    ],
    [
      'https://plus.unsplash.com/premium_photo-1675805015392-28fd80c551ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww',
      'Tiêu đề bài viết 2',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora cumque, esse atque nulla sit quas expedita vitae in a veniam quae suscipit distinctio ullam iusto cum, ut eos autem.',
    ],
    [
      'https://plus.unsplash.com/premium_photo-1675805015392-28fd80c551ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww',
      'Tiêu đề bài viết 3',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora cumque, esse atque nulla sit quas expedita vitae in a veniam quae suscipit distinctio ullam iusto cum, ut eos autem.',
    ],
  ];

  function generateList(arr) {
    return arr
      .map(
        (item, idx) =>
          `<div class="${idx % 2 === 0 ? 'row' : 'row reverse'}">
          <div class="col-4">
             <img class="img-fluid" src="${item[0]}" alt="${item[1]}" />
          </div>
          <div class="col-8 pl-2">
            <h3 class="title">${item[1]}</h3>
            <p class="desc">${item[2]}</p>
          </div>
          <div class="col-12 sperator"></div>
        </div>`
      )
      .join('');
  }
  var rs = generateList(arr);
  document.getElementById('ex04').innerHTML = rs;
}
ex01();
ex02();
ex03();
ex04();
