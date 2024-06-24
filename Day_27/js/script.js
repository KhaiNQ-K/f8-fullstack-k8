// var audioEL = document.querySelector("#audio");
// var playBtnEL = document.querySelector(".play-btn");
// var progressBarEL = document.querySelector(".progress-bar");
// var progressEL = document.querySelector(".progress");
// var pointEL = document.querySelector(".point");
// var timerEL = document.querySelector(".timer");
// var currentTimeEL = document.querySelector(".current-time");
// var endTimeEL = document.querySelector(".end-time");
// var isPlay = false;
// var timeline = 0;
// var isDrag = false;
// var initialClientX = 0;
// var initialRate = 0;
// var rate = 0;
// currentTimeEL.innerHTML = toMinutes(timeline);
// document.addEventListener("mousemove", function (e) {
//   if (isDrag) {
//     var space = e.clientX - initialClientX;
//     // console.log(space);
//     rate = (space * 100) / progressBarEL.clientWidth + initialRate;
//     if (rate < 0) {
//       rate = 0;
//     }

//     if (rate > 100) {
//       rate = 100;
//     }

//     progressEL.style.width = `${rate}%`;

//     var currentTime = (audio.duration * rate) / 100;
//     currentTimeEL.innerText = toMinutes(currentTime);
//   }
// });

// document.addEventListener("mouseup", function () {
//   isDrag = false;
//   initialRate = rate;
//   var currentTime = (audio.duration * rate) / 100;
//   currentTimeEL.innerText = toMinutes(currentTime);

//   audio.currentTime = currentTime;
// });

// playBtnEL.addEventListener("click", function (e) {
//   e.stopPropagation();
//   audioEL.paused
//     ? (audioEL.play(),
//       (playBtnEL.innerHTML = `<i class="fa-solid fa-pause"></i>`))
//     : (audioEL.pause(),
//       (playBtnEL.innerHTML = `<i class="fa-solid fa-play"></i>`));
// });
// function toMinutes(timer) {
//   var minute = Math.floor(timer / 60);
//   var second = Math.floor(timer - minute * 60);
//   return `${minute < 10 ? "0" + minute : minute}:${
//     second < 10 ? "0" + second : second
//   }`;
// }
// audioEL.addEventListener("loadeddata", function () {
//   endTimeEL.innerHTML = toMinutes(audioEL.duration);
// });
// audioEL.addEventListener("timeupdate", function () {
//   if (!isDrag) {
//     currentTimeEL.innerText = toMinutes(this.currentTime);
//     timeline = (this.currentTime / this.duration) * 100;
//     progressEL.style.width = `${timeline}%`;
//   }
// });
// audioEL.addEventListener("ended", function () {
//   rate = 0;
//   this.currentTime = 0;
//   progressEL.style.width = 0;
//   playBtnEL.innerHTML = playIcon;
// });
// progressBarEL.addEventListener("mousemove", function (e) {
//   e.stopPropagation();
//   isDrag = true;
//   timerEL.style.display = "block";
//   timerEL.style.left = `${e.offsetX}px`;

//   var currentTime =
//     (((e.offsetX * 100) / progressBarEL.clientWidth) * audioEL.duration) / 100;
//   timerEL.innerText = toMinutes(currentTime);
// });
// progressBarEL.addEventListener("mousedown", function (e) {
//   e.stopPropagation();
//   if (e.which === 1) {
//     isDrag = true;
//     rate = (e.offsetX / progressBarEL.offsetWidth) * 100;
//     initialRate = rate;
//     initialClientX = e.clientX;
//     var currentTime = (rate * audioEL.duration) / 100;
//     currentTimeEL.innerText = toMinutes(currentTime);
//     progressEL.style.width = `${timeline}%`;
//     audioEL.currentTime = currentTime;
//   }
// });
// progressBarEL.addEventListener("mouseout", function (e) {
//   e.stopPropagation();
//   timerEL.style.display = "none";
// });

// pointEL.addEventListener("mousedown", function (e) {
//   console.log(e.which);
//   if (e.which === 1) {
//     isDrag = true;
//     initialClientX = e.clientX;
//   }
// });

var progressBar = document.querySelector('.progress-bar');

var progress = progressBar.querySelector('.progress');

var progressDot = progress.querySelector('.point');

var progressBarWidth = progressBar.clientWidth;

var timer = progressBar.querySelector('.timer');

var isDrag = false;
var initialClientX = 0;
var initalRate = 0;
var rate = 0;

progressBar.addEventListener('mousedown', function (e) {
  if (e.which === 1) {
    //   console.log(e.offsetX, progressBarWidth);
    //Tính tỷ lệ phần trăm giữa vị trí click với chiều rộng
    rate = (e.offsetX * 100) / progressBarWidth;

    //Update CSS vào progress
    progress.style.width = `${rate}%`;

    initalRate = rate;

    isDrag = true;

    initialClientX = e.clientX;

    var currentTime = (audio.duration * rate) / 100;
    currentTimeEl.innerText = getTime(currentTime);

    audio.currentTime = currentTime;
  }
});

progressDot.addEventListener('mousedown', function (e) {
  e.stopPropagation();
  debugger;
  if (e.which === 1) {
    isDrag = true;
    initialClientX = e.clientX;
    //   console.log(initalRate);
    //   console.log("progress dot");
  }
});

document.addEventListener('mousemove', function (e) {
  if (isDrag) {
    var space = e.clientX - initialClientX;
    // console.log(space);
    rate = (space * 100) / progressBarWidth + initalRate;
    if (rate < 0) {
      rate = 0;
    }

    if (rate > 100) {
      rate = 100;
    }

    progress.style.width = `${rate}%`;

    var currentTime = (audio.duration * rate) / 100;
    currentTimeEl.innerText = getTime(currentTime);
  }
});

document.addEventListener('mouseup', function () {
  isDrag = false;
  initalRate = rate;
  var currentTime = (audio.duration * rate) / 100;
  currentTimeEl.innerText = getTime(currentTime);

  audio.currentTime = currentTime;
});

var audio = document.querySelector('#audio');
var currentTimeEl = progressBar.previousElementSibling;
var durationTimeEl = progressBar.nextElementSibling;
var playBtn = document.querySelector('.play-btn');

var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? '0' + mins : mins}:${seconds < 10 ? '0' + seconds : seconds}`;
};

audio.addEventListener('loadeddata', function () {
  //   console.log(audio.duration);
  durationTimeEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});

audio.addEventListener('timeupdate', function () {
  if (!isDrag) {
    //   console.log("đang chạy: ", this.currentTime);
    currentTimeEl.innerText = getTime(this.currentTime);

    //Tính tỷ lệ phần trăm
    rate = (this.currentTime / this.duration) * 100;

    //Update vào timer
    progress.style.width = `${rate}%`;
  }
});

audio.addEventListener('ended', function () {
  rate = 0;
  audio.currentTime = 0;
  progress.style.width = 0;
  playBtn.innerHTML = playIcon;
});

progressDot.addEventListener('mousemove', function (e) {
  e.stopPropagation();
});

progressBar.addEventListener('mousemove', function (e) {
  timer.style.display = 'block';
  timer.style.left = `${e.offsetX}px`;
  var rate = (e.offsetX * 100) / this.clientWidth;
  var currentTime = (audio.duration * rate) / 100;
  timer.innerText = getTime(currentTime);
});

progressBar.addEventListener('mouseout', function () {
  timer.style.display = 'none';
});
