const btnGetLink = document.querySelector('.btn');
const counter = document.querySelector('.counter');
btnGetLink.disabled = true;
let count = 30;
let start = performance.now();
let done = false;
window.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    done = true;
  }
  if (document.visibilityState === 'visible') {
    done = false;
  }
});
function counterFunc(timeStamp) {
  if (count > 0 && !done) {
    const elapsed = timeStamp - start;
    if (elapsed >= 1000) {
      count--;
      counter.textContent = count;
      start = timeStamp;
    }
  }
  if (count === 0) {
    done = true;
    btnGetLink.disabled = false;
    btnGetLink.classList.add('active');
    btnGetLink.addEventListener('click', function () {
      window.location.href = 'https://fullstack.edu.vn';
    });
  }
  window.requestAnimationFrame(counterFunc);
}
window.requestAnimationFrame(counterFunc);
