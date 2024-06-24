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
