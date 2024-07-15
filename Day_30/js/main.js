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
  progressBarWidth: progressBarEl.clientWidth,
  initialClientX: 0,
  lastMoveSpace: 0,
  moveSpace: 0,
  songs: [
    {
      id: 1,
      path: './assets/audio/anh-tha.mp3',
      imageUrl: '',
    },
  ],
  currentSong: {},
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
    // scroll timeline
    document.onmousemove = function (e) {
      if (_this.isDrag) {
        _this.moveSpace = e.clientX - _this.initialClientX + _this.lastMoveSpace;
        var rate = (_this.moveSpace / _this.progressBarWidth) * 100;

        if (rate < 0) {
          rate = 0;
        }
        if (rate > 100) {
          rate = 100;
        }
        var currentTime = (rate / 100) * audio.duration;
        progressEl.style.width = `${rate}%`;
        currentTimeEl.innerText = _this.getTime(currentTime);
      }
    };

    document.onmouseup = function (e) {
      if (_this.isDrag) {
        _this.isDrag = false;
        _this.lastMoveSpace = _this.moveSpace;
        var rate = (_this.moveSpace / _this.progressBarWidth) * 100;
        var currentTime = (rate / 100) * audio.duration;
        audio.currentTime = currentTime;
      }
    };
    // play/pause song
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // seeking
    // show timeline seek
    progressBarEl.onmouseout = function (e) {
      e.stopPropagation();
      timerEl.style.display = 'none';
    };
    progressBarEl.onmousemove = function (e) {
      var progressBarPercent = (e.offsetX / _this.progressBarWidth) * 100;
      var currentTime = (progressBarPercent / 100) * audio.duration;
      timerEl.style.display = 'block';
      timerEl.style.left = e.offsetX + 'px';
      timerEl.innerText = _this.getTime(currentTime);
    };
    // change time
    (progressBarEl.onclick = function (e) {
      e.stopPropagation();
    }),
      (progressBarEl.onmousedown = function (e) {
        e.stopPropagation();
        if (e.which === 1) {
          _this.isDrag = true;
          _this.initialClientX = e.clientX;
          _this.moveSpace = e.offsetX;
          _this.lastMoveSpace = e.offsetX;
          var rate = (e.offsetX / _this.progressBarWidth) * 100;
          var currentTime = (rate / 100) * audio.duration;
          // audio.currentTime = currentTime;
          progressEl.style.width = `${rate}%`;
        }
      });
    progressBarDot.onmousedown = function (e) {
      if (e.which === 1) {
        e.stopPropagation();
        _this.isDrag = true;
        _this.initialClientX = e.clientX;
      }
    };
    progressBarDot.onmousemove = function (e) {
      e.stopPropagation();
      var progressBarPercent = (e.clientX / _this.progressBarWidth) * 100;
      var currentTime = (progressBarPercent / 100) * audio.duration;
      timerEl.style.display = 'block';
      timerEl.style.left = e.clientX - _this.initialClientX + _this.lastMoveSpace + 'px';
      timerEl.innerText = _this.getTime(currentTime);
    };
    // audio event handler
    // listen play/pause
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.innerHTML = pauseIcon;
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.innerHTML = playIcon;
    };

    audio.ontimeupdate = function () {
      if (audio.duration && !_this.isDrag) {
        var progressBarPercent = (audio.currentTime / audio.duration) * 100;
        progressEl.style.width = `${progressBarPercent}%`;
        currentTimeEl.innerText = _this.getTime(audio.currentTime);
      }
    };
    //audio ended
    audio.onended = function (e) {
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
    audio.src = this.currentSong.path;
    currentTimeEl.innerHTML = this.getTime(0);
  },
  getCurrentSong() {
    this.currentSong = this.songs[0];
  },
  start() {
    // load song
    this.getCurrentSong();
    this.loadSongInfo();
    // handle events
    this.handleEvents();
  },
};
app.start();
