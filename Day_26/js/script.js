// Bài 1
Array.prototype.push2 = function (item) {
  this[this.length] = item;
  return this.length;
};
Array.prototype.filter2 = function (callback) {
  if (typeof callback !== 'function') throw new Error('callback is not a function');
  const result = [];
  for (var idx in this) {
    if (callback(this[idx], idx, this)) {
      result.push(this[idx]);
    }
  }
  return result;
};
// Bài 3
const app = {
  categories: [
    {
      id: 1,
      name: 'Chuyên mục 1',
    },
    {
      id: 2,
      name: 'Chuyên mục 2',
      children: [
        {
          id: 4,
          name: 'Chuyên mục 2.1',
        },
        {
          id: 5,
          name: 'Chuyên mục 2.2',
          children: [
            {
              id: 10,
              name: 'Chuyên mục 2.2.1',
            },
            {
              id: 11,
              name: 'Chuyên mục 2.2.2',
            },
            {
              id: 12,
              name: 'Chuyên mục 2.2.3',
            },
          ],
        },
        {
          id: 6,
          name: 'Chuyên mục 2.3',
        },
      ],
    },
    {
      id: 3,
      name: 'Chuyên mục 3',
      children: [
        {
          id: 7,
          name: 'Chuyên mục 3.1',
        },
        {
          id: 8,
          name: 'Chuyên mục 3.2',
        },
        {
          id: 9,
          name: 'Chuyên mục 3.3',
        },
      ],
    },
  ],
  result: [],
  mapData(categories) {},
  generateOption(category, prefix = '') {
    return `<option value="${category.id}">${prefix} ${category.name}</option>`;
  },
  generateOptions(categories, prefix = '') {
    return categories
      .map((category) => {
        if (category.children && category.children.length > 0) {
          return (
            this.generateOption(category, prefix) +
            this.generateOptions(category.children, prefix + '---|')
          );
        } else {
          return this.generateOption(category, prefix);
        }
      })
      .join('');
  },
  run() {
    this.result = this.generateOptions(this.categories);
  },
};
app.run();
var select = document.querySelector('#select');
select.innerHTML = app.result;
