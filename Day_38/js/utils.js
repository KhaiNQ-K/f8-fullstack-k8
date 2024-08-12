export function replaceCsrf(str) {
  return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
export function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}
