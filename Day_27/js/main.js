const $ = document.querySelector.bind(document);
const audio = $('#audio');
const endTimeEl = $('.end-time');
const currentTimeEl = $('.current-time');
const playBtn = $('.play-btn');
const playIcon = `<i class="fa-solid fa-play"></i>`;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const progressBarEl = $('.progress-bar');
const progressEl = $('.progress');
const timerEl = $('.timer');
const progressBarDot = $('.progress-dot');
const app = {
  isPlaying: false,
  isDrag: false,
  progressBarWidth: progressBarEl.offsetWidth,
  progressBarPercent: 0,
  currentWidth: 0,
  currentTimeline: 0,
  song: {
    path: './assets/audio/anh-tha.mp3',
  },
  getTime(second) {
    if (second) {
      const mins = Math.floor(second / 60);
      const seconds = Math.floor(second - mins * 60);
      return `${mins < 10 ? '0' + mins : mins}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
    if (second === 0) return '00:00';
  },
  handleEvents: function () {
    const _this = this;
    //document event

    // play/pause song
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // listen play/pause
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.innerHTML = pauseIcon;
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.innerHTML = playIcon;
    };
    // seeking
    // show timeline seek
    (progressBarEl.onmouseout = function (e) {
      e.stopPropagation();
      timerEl.style.display = 'none';
    }),
      (progressBarEl.onmousemove = function (e) {
        var progressBarPercent = (e.offsetX / _this.progressBarWidth) * 100;
        var currentTime = (progressBarPercent / 100) * audio.duration;
        timerEl.style.display = 'block';
        timerEl.style.left = e.offsetX + 'px';
        timerEl.innerText = _this.getTime(currentTime);
      });
    // change time
    progressBarEl.onmousedown = function (e) {
      if (e.which === 1) {
        _this.currentWidth = e.clientX;
        _this.progressBarPercent = (e.offsetX / _this.progressBarWidth) * 100;
        var currentTime = (_this.progressBarPercent / 100) * audio.duration;
        audio.currentTime = currentTime;
        progressEl.style.width = `${_this.progressBarPercent}%`;
      }
    };
    // scroll timeline
    document.onmousemove = function (e) {
      if (_this.isDrag) {
        debugger;
        var startScroll = e.clientX - _this.currentWidth;
        _this.currentTimeline =
          (startScroll / _this.progressBarWidth) * 100 + _this.progressBarPercent;
        if (_this.currentTimeline < 0) {
          _this.currentTimeline = 0;
        }
        if (_this.currentTimeline > 100) {
          _this.currentTimeline = 100;
        }
        var currentTime = (_this.currentTimeline / 100) * audio.duration;
        progressEl.style.width = `${_this.currentTimeline}%`;
        currentTimeEl.innerText = _this.getTime(currentTime);
        // audio.currentTime = currentTime;
      }
    };

    document.onmouseup = function (e) {
      if (_this.isDrag) {
        _this.isDrag = false;
        _this.progressBarPercent = _this.currentTimeline;
        var currentTime = (audio.duration * _this.currentTimeline) / 100;
        currentTimeEl.innerText = _this.getTime(currentTime);
        audio.currentTime = currentTime;
      }
    };
    progressBarDot.onmousedown = function (e) {
      e.stopPropagation();
      if (e.which === 1) {
        _this.isDrag = true;
        _this.currentWidth = e.clientX;
      }
    };

    // update timeline
    audio.ontimeupdate = function () {
      if (audio.duration) {
        var progressBarPercent = (audio.currentTime / audio.duration) * 100;
        progressEl.style.width = `${progressBarPercent}%`;
        currentTimeEl.innerText = _this.getTime(audio.currentTime);
      }
    };
    //audio ended
    audio.onended = function (e) {
      debugger;
      currentTimeEl.innerText = _this.getTime(0);
      playBtn.innerHTML = playIcon;
      _this.isPlaying = false;
      _this.progressBarPercent = 0;
      _this.currentTimeline = 0;
      progressEl.style.width = `0%`;
    };
    // handle show timer
    audio.onloadeddata = function (e) {
      endTimeEl.innerText = _this.getTime(e.target.duration);
    };
  },

  loadSongInfo() {
    audio.src = this.song.path;
    currentTimeEl.innerHTML = this.getTime(0);
  },
  start() {
    // load song
    this.loadSongInfo();
    // handle events
    this.handleEvents();
  },
};
app.start();
