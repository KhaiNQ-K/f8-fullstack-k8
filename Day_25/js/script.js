function ex01() {
  function totalExpress(...rest) {
    var idx = rest.findIndex((x) => !Number(x));
    if (idx > -1) {
      alert('Có phần tử không phải là số');
      return;
    } else {
      return rest.reduce((acc, number) => acc + +number);
    }
  }
  var rs = totalExpress(1, '2', 3, 4, 5);
  var ex01 = document.getElementById('ex01');
  ex01.innerHTML = rs;
}
ex01();
// Bài 2
function ex02() {
  var price = '12000000';
  Number.prototype.getCurrency = function (unit) {
    if (!unit) {
      console.log('Enter the currency unit ');
      return;
    }
    var numberStr = this.toString();
    var length = numberStr.length;
    var result = '';
    var count = 0;
    for (var i = length - 1; i >= 0; i--) {
      result = numberStr[i] + result;
      count++;
      if (count % 3 === 0 && i !== 0) {
        result = ',' + result;
      }
    }
    return result + ' ' + unit;
  };
  var price = '12000000';
  if (Number(price)) {
    var rs = Number(price).getCurrency('đ');
    var ex02 = document.getElementById('ex02');
    ex02.innerHTML = rs;
  }
}
ex02();
// Bài 3
function ex03() {
  var array = [
    {
      id: 1,
      name: 'Chuyên mục 1',
      parent: 0,
    },
    {
      id: 2,
      name: 'Chuyên mục 2',
      parent: 0,
    },
    {
      id: 3,
      name: 'Chuyên mục 3',
      parent: 0,
    },
    {
      id: 4,
      name: 'Chuyên mục 2.1',
      parent: 2,
    },
    {
      id: 5,
      name: 'Chuyên mục 2.2',
      parent: 2,
    },
    {
      id: 6,
      name: 'Chuyên mục 2.3',
      parent: 2,
    },
    {
      id: 7,
      name: 'Chuyên mục 3.1',
      parent: 3,
    },
    {
      id: 8,
      name: 'Chuyên mục 3.2',
      parent: 3,
    },
    {
      id: 9,
      name: 'Chuyên mục 3.3',
      parent: 3,
    },
    {
      id: 10,
      name: 'Chuyên mục 2.2.1',
      parent: 5,
    },
    {
      id: 11,
      name: 'Chuyên mục 2.2.2',
      parent: 5,
    },
  ];
  var ex03Input = document.querySelector('#ex03-input');
  ex03Input.innerHTML = JSON.stringify(array, undefined, 2);
  function buildTree(array) {
    if (!Array.isArray(array)) return;
    var finalTree = [];
    var rootTree = array.filter((x) => x.parent === 0);

    for (var i = 0; i < rootTree.length; i++) {
      var element = rootTree[i];
      finalTree.push(rootTree[i]);
      var nextNode = element;

      var currentNode = {};
      var parentNode = {};
      while (nextNode != null) {
        nextNode.children = [];
        nextNode.parentArr = [];
        currentNode = nextNode;
        nextNode = null;
        var children = array.filter((x) => x.parent === currentNode.id);
        if (children.length > 0) {
          children.forEach((x) => {
            x = { ...x, parentArr: currentNode };
          });
          currentNode.children.push(...children);
        }
        if (currentNode.children.length > 0) {
          nextNode = currentNode.children[0];
        } else {
          while (currentNode.parentArr.length > 0 && currentNode.parentArr != null) {
            parentNode = currentNode.parentArr;
            var idx = parentNode.children.indexOf(currentNode);
            if (idx < parentNode.children.count - 1) {
              nextNode = parentNode.children[idx + 1];
              break;
            } else {
              currentNode = parentNode;
            }
          }
        }
      }
    }
    return finalTree;
  }
  var rs = buildTree(array);
  var ex03 = document.querySelector('#ex03');
  ex03.innerHTML = JSON.stringify(rs, undefined, 2);
}
ex03();
// Bài 4

Array.prototype.myReduce = function (callback, initialValue) {
  if (!Array.isArray(this)) return;
  if (typeof callback !== 'function') return;
  if (!this.length) return initialValue;
  var startIdx = 0;
  if (!initialValue) {
    initialValue = this[0];
    startIdx = 1;
  }

  var result = initialValue;
  for (var i = startIdx; i < this.length; i++) {
    var current = this[i];
    result = callback(result, current);
  }
  return result;
};
var array = [1, 2, 3, 4, 5];
var result = array.myReduce(function (acc, number) {
  return acc + number;
});
var ex04 = document.querySelector('#ex04');
ex04.innerHTML = result;
