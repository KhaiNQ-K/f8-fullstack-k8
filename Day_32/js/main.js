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
const karaokeBtn = $('.btn-karaoke');
const closeBtn = $('.close-btn');
const modalEl = $('.modal');
const contentEl = $('.content');
const firstLineEl = $('.firstLine');
const secondLineEl = $('.secondLine');
const app = {
  isPlaying: false,
  isDrag: false,
  progressBarWidth: progressBarEl.clientWidth,
  initialClientX: 0,
  lastMoveSpace: 0,
  moveSpace: 0,
  isShow: false,
  test: 0,
  isRenderLyric: false,
  songs: [
    {
      id: 1,
      path: './audio/thangnam.mp3',
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
    progressBarEl.onmousedown = function (e) {
      e.stopPropagation();
      if (e.which === 1) {
        _this.isDrag = true;
        _this.initialClientX = e.clientX;
        _this.moveSpace = e.offsetX;
        _this.lastMoveSpace = e.offsetX;
        var rate = (e.offsetX / _this.progressBarWidth) * 100;
        var currentTime = (rate / 100) * audio.duration;
        audio.currentTime = currentTime;
        progressEl.style.width = `${rate}%`;
      }
    };
    progressBarDot.onmousedown = function (e) {
      if (e.which === 1) {
        e.stopPropagation();
        _this.isDrag = true;
        _this.initialClientX = e.clientX;
      }
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
        _this.loadLyricByTime();
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

    // Karaoke
    karaokeBtn.onclick = function () {
      _this.toggleModal();
      _this.isShow = !_this.isShow;
    };
    // close
    closeBtn.onclick = function () {
      _this.toggleModal();
      _this.isShow = !_this.isShow;
    };
  },
  toggleModal() {
    if (this.isShow) {
      modalEl.classList.remove('show');
    } else {
      modalEl.classList.add('show');
    }
  },
  renderLyric(currentWords, nextWords) {
    if (currentWords) {
      firstLineEl.innerText = currentWords.map((x) => x.data).join(' ');
    } else {
      firstLineEl.innerText = '';
    }
    if (nextWords) {
      secondLineEl.innerText = nextWords.map((x) => x.data).join(' ');
    } else {
      secondLineEl.innerText = '';
    }
  },
  loadLyricByTime() {
    var time = Math.floor(audio.currentTime * 1000);
    const wordList = lyric.data.sentences.map(function (sentence) {
      return sentence.words;
    });
    let currentWords = [];
    let nextWords = [];
    for (let wordIdx = 0; wordIdx < wordList.length; wordIdx++) {
      var words = wordList[wordIdx];
      if (words.some((x) => x.startTime <= time && x.endTime >= time)) {
        this.isRenderLyric = true;
        if (wordIdx % 2 === 0) {
          currentWords = wordList[wordIdx];
          nextWords = wordList[wordIdx + 1];
        } else {
          currentWords = wordList[wordIdx - 1];
          nextWords = wordList[wordIdx];
        }
        if (this.isRenderLyric) {
          this.renderLyric(currentWords, nextWords);
        }
        if (wordIdx === wordList.length - 1) {
          this.isRenderLyric = false;
          setTimeout(() => {
            this.loadLyricInfo();
          }, 3000);
          break;
        }
        break;
      }
    }
  },
  loadSongInfo() {
    audio.src = this.currentSong.path;
    this.loadLyricInfo();
    currentTimeEl.innerHTML = this.getTime(0);
  },
  loadLyricInfo() {
    const songInfo = {
      author: 'Soobin Hoàng Sơn',
      name: 'Tháng năm',
    };
    firstLineEl.innerText = `Tên bài hát: ${songInfo.name}`;
    secondLineEl.innerText = `Tác giả: ${songInfo.author}`;
  },
  getCurrentSong() {
    this.currentSong = this.songs[0];
  },
  getTotalLyric() {
    this.test = lyric.data.sentences.length / 2;
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

const lyric = {
  data: {
    sentences: [
      {
        words: [
          {
            startTime: 38940,
            endTime: 39190,
            data: 'Đôi',
          },
          {
            startTime: 39190,
            endTime: 39440,
            data: 'khi',
          },
          {
            startTime: 39440,
            endTime: 39940,
            data: 'mây',
          },
          {
            startTime: 39940,
            endTime: 40180,
            data: 'quên',
          },
          {
            startTime: 40180,
            endTime: 40690,
            data: 'theo',
          },
          {
            startTime: 40690,
            endTime: 40940,
            data: 'gió',
          },
          {
            startTime: 40940,
            endTime: 42190,
            data: 'trôi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 42190,
            endTime: 42430,
            data: 'Đôi',
          },
          {
            startTime: 42430,
            endTime: 42690,
            data: 'khi',
          },
          {
            startTime: 42690,
            endTime: 42930,
            data: 'môi',
          },
          {
            startTime: 42930,
            endTime: 43430,
            data: 'quên',
          },
          {
            startTime: 43430,
            endTime: 43940,
            data: 'không',
          },
          {
            startTime: 43940,
            endTime: 44190,
            data: 'cất',
          },
          {
            startTime: 44190,
            endTime: 44940,
            data: 'lời',
          },
        ],
      },
      {
        words: [
          {
            startTime: 44940,
            endTime: 45190,
            data: 'Vội',
          },
          {
            startTime: 45190,
            endTime: 45440,
            data: 'tay',
          },
          {
            startTime: 45440,
            endTime: 45690,
            data: 'vuốt',
          },
          {
            startTime: 45690,
            endTime: 45940,
            data: 'làn',
          },
          {
            startTime: 45940,
            endTime: 46190,
            data: 'tóc',
          },
          {
            startTime: 46190,
            endTime: 46890,
            data: 'rối',
          },
          {
            startTime: 46890,
            endTime: 48140,
            data: 'bời',
          },
        ],
      },
      {
        words: [
          {
            startTime: 48140,
            endTime: 48390,
            data: 'Nhìn',
          },
          {
            startTime: 48390,
            endTime: 48640,
            data: 'theo',
          },
          {
            startTime: 48640,
            endTime: 48880,
            data: 'gió',
          },
          {
            startTime: 48880,
            endTime: 49140,
            data: 'về',
          },
          {
            startTime: 49140,
            endTime: 49380,
            data: 'nơi',
          },
          {
            startTime: 49380,
            endTime: 49880,
            data: 'cuối',
          },
          {
            startTime: 49880,
            endTime: 51890,
            data: 'trời',
          },
        ],
      },
      {
        words: [
          {
            startTime: 51890,
            endTime: 52140,
            data: 'Con',
          },
          {
            startTime: 52140,
            endTime: 52390,
            data: 'tim',
          },
          {
            startTime: 52390,
            endTime: 52850,
            data: 'anh',
          },
          {
            startTime: 52850,
            endTime: 53350,
            data: 'mang',
          },
          {
            startTime: 53350,
            endTime: 53590,
            data: 'bao',
          },
          {
            startTime: 53590,
            endTime: 54090,
            data: 'nhớ',
          },
          {
            startTime: 54090,
            endTime: 55100,
            data: 'thương',
          },
        ],
      },
      {
        words: [
          {
            startTime: 55100,
            endTime: 55600,
            data: 'Gửi',
          },
          {
            startTime: 55600,
            endTime: 55850,
            data: 'một',
          },
          {
            startTime: 55850,
            endTime: 56100,
            data: 'tình',
          },
          {
            startTime: 56100,
            endTime: 56600,
            data: 'yêu',
          },
          {
            startTime: 56600,
            endTime: 56850,
            data: 'xa',
          },
          {
            startTime: 56850,
            endTime: 57350,
            data: 'muôn',
          },
          {
            startTime: 57350,
            endTime: 58100,
            data: 'phương',
          },
        ],
      },
      {
        words: [
          {
            startTime: 58100,
            endTime: 58340,
            data: 'Giờ',
          },
          {
            startTime: 58340,
            endTime: 58600,
            data: 'em',
          },
          {
            startTime: 58600,
            endTime: 58840,
            data: 'như',
          },
          {
            startTime: 58840,
            endTime: 59100,
            data: 'một',
          },
          {
            startTime: 59100,
            endTime: 59350,
            data: 'cơn',
          },
          {
            startTime: 59350,
            endTime: 59600,
            data: 'mơ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 59600,
            endTime: 59850,
            data: 'Từng',
          },
          {
            startTime: 59850,
            endTime: 60100,
            data: 'đêm',
          },
          {
            startTime: 60100,
            endTime: 60350,
            data: 'anh',
          },
          {
            startTime: 60350,
            endTime: 61350,
            data: 'nhớ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 61350,
            endTime: 61590,
            data: 'Còn',
          },
          {
            startTime: 61590,
            endTime: 61590,
            data: 'yêu',
          },
          {
            startTime: 61590,
            endTime: 62110,
            data: 'em',
          },
          {
            startTime: 62110,
            endTime: 62350,
            data: 'còn',
          },
          {
            startTime: 62350,
            endTime: 62600,
            data: 'thương',
          },
          {
            startTime: 62600,
            endTime: 62850,
            data: 'em',
          },
          {
            startTime: 62850,
            endTime: 63310,
            data: 'mãi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 63310,
            endTime: 63810,
            data: 'Chợt',
          },
          {
            startTime: 63810,
            endTime: 64070,
            data: 'nhận',
          },
          {
            startTime: 64070,
            endTime: 64520,
            data: 'ra',
          },
          {
            startTime: 64520,
            endTime: 65020,
            data: 'anh',
          },
          {
            startTime: 65020,
            endTime: 65270,
            data: 'đã',
          },
          {
            startTime: 65270,
            endTime: 65770,
            data: 'đánh',
          },
          {
            startTime: 65770,
            endTime: 66710,
            data: 'mất',
          },
        ],
      },
      {
        words: [
          {
            startTime: 66710,
            endTime: 66840,
            data: 'Tìm',
          },
          {
            startTime: 66840,
            endTime: 67090,
            data: 'lại',
          },
          {
            startTime: 67090,
            endTime: 67340,
            data: 'sao',
          },
          {
            startTime: 67340,
            endTime: 67460,
            data: 'được',
          },
          {
            startTime: 67460,
            endTime: 67840,
            data: 'khi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 67840,
            endTime: 68340,
            data: 'Bước',
          },
          {
            startTime: 68340,
            endTime: 68720,
            data: 'chân',
          },
          {
            startTime: 68720,
            endTime: 69090,
            data: 'em',
          },
          {
            startTime: 69090,
            endTime: 69860,
            data: 'xa',
          },
        ],
      },
      {
        words: [
          {
            startTime: 69860,
            endTime: 70360,
            data: 'Tháng',
          },
          {
            startTime: 70360,
            endTime: 70860,
            data: 'năm',
          },
          {
            startTime: 70860,
            endTime: 71360,
            data: 'trôi',
          },
          {
            startTime: 71360,
            endTime: 71600,
            data: 'qua',
          },
          {
            startTime: 71600,
            endTime: 72110,
            data: 'nhanh',
          },
          {
            startTime: 72110,
            endTime: 73110,
            data: 'quá',
          },
        ],
      },
      {
        words: [
          {
            startTime: 73110,
            endTime: 73610,
            data: 'Giấc',
          },
          {
            startTime: 73610,
            endTime: 74110,
            data: 'mơ',
          },
          {
            startTime: 74110,
            endTime: 74360,
            data: 'kia',
          },
          {
            startTime: 74360,
            endTime: 74610,
            data: 'như',
          },
          {
            startTime: 74610,
            endTime: 75350,
            data: 'tan',
          },
          {
            startTime: 75350,
            endTime: 76330,
            data: 'vỡ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 76330,
            endTime: 76830,
            data: 'Còn',
          },
          {
            startTime: 76830,
            endTime: 77070,
            data: 'mình',
          },
          {
            startTime: 77070,
            endTime: 77570,
            data: 'anh',
          },
          {
            startTime: 77570,
            endTime: 78020,
            data: 'mang',
          },
          {
            startTime: 78020,
            endTime: 78520,
            data: 'những',
          },
          {
            startTime: 78520,
            endTime: 78770,
            data: 'nỗi',
          },
          {
            startTime: 78770,
            endTime: 79700,
            data: 'nhớ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 79700,
            endTime: 79820,
            data: 'Một',
          },
          {
            startTime: 79820,
            endTime: 80070,
            data: 'mình',
          },
          {
            startTime: 80070,
            endTime: 80190,
            data: 'anh',
          },
          {
            startTime: 80190,
            endTime: 80440,
            data: 'lạc',
          },
          {
            startTime: 80440,
            endTime: 80820,
            data: 'trong',
          },
        ],
      },
      {
        words: [
          {
            startTime: 80820,
            endTime: 81190,
            data: 'Giữa',
          },
          {
            startTime: 81190,
            endTime: 81690,
            data: 'đêm',
          },
          {
            startTime: 81690,
            endTime: 82070,
            data: 'chơ',
          },
          {
            startTime: 82070,
            endTime: 82740,
            data: 'vơ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 82740,
            endTime: 83490,
            data: 'Biết',
          },
          {
            startTime: 83490,
            endTime: 83990,
            data: 'em',
          },
          {
            startTime: 83990,
            endTime: 84230,
            data: 'đang',
          },
          {
            startTime: 84230,
            endTime: 84490,
            data: 'nơi',
          },
          {
            startTime: 84490,
            endTime: 85240,
            data: 'xa',
          },
          {
            startTime: 85240,
            endTime: 86240,
            data: 'lắm',
          },
        ],
      },
      {
        words: [
          {
            startTime: 86240,
            endTime: 86740,
            data: 'Vẫn',
          },
          {
            startTime: 86740,
            endTime: 87240,
            data: 'mong',
          },
          {
            startTime: 87240,
            endTime: 87480,
            data: 'em',
          },
          {
            startTime: 87480,
            endTime: 87740,
            data: 'bao',
          },
          {
            startTime: 87740,
            endTime: 88490,
            data: 'đêm',
          },
          {
            startTime: 88490,
            endTime: 90950,
            data: 'trắng',
          },
        ],
      },
      {
        words: [
          {
            startTime: 90950,
            endTime: 91200,
            data: 'Anh',
          },
          {
            startTime: 91200,
            endTime: 91940,
            data: 'ngồi',
          },
          {
            startTime: 91940,
            endTime: 92440,
            data: 'đây',
          },
          {
            startTime: 92440,
            endTime: 92700,
            data: 'nhìn',
          },
          {
            startTime: 92700,
            endTime: 92940,
            data: 'đêm',
          },
          {
            startTime: 92940,
            endTime: 93450,
            data: 'dài',
          },
          {
            startTime: 93450,
            endTime: 94450,
            data: 'qua',
          },
        ],
      },
      {
        words: [
          {
            startTime: 94450,
            endTime: 94700,
            data: '3',
          },
          {
            startTime: 94700,
            endTime: 95200,
            data: 'giờ',
          },
          {
            startTime: 95200,
            endTime: 95450,
            data: 'em',
          },
          {
            startTime: 95450,
            endTime: 95950,
            data: 'chờ',
          },
          {
            startTime: 95950,
            endTime: 96190,
            data: 'phone',
          },
          {
            startTime: 96190,
            endTime: 96690,
            data: 'người',
          },
          {
            startTime: 96690,
            endTime: 97410,
            data: 'ta',
          },
        ],
      },
      {
        words: [
          {
            startTime: 97410,
            endTime: 97660,
            data: 'Em',
          },
          {
            startTime: 97660,
            endTime: 97910,
            data: 'luôn',
          },
          {
            startTime: 97910,
            endTime: 98410,
            data: 'thế',
          },
          {
            startTime: 98410,
            endTime: 98660,
            data: 'luôn',
          },
          {
            startTime: 98660,
            endTime: 99380,
            data: 'nghĩ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 99380,
            endTime: 99510,
            data: 'Anh',
          },
          {
            startTime: 99510,
            endTime: 99640,
            data: 'là',
          },
          {
            startTime: 99640,
            endTime: 99760,
            data: 'người',
          },
          {
            startTime: 99760,
            endTime: 99890,
            data: 'khiến',
          },
          {
            startTime: 99890,
            endTime: 100260,
            data: 'em',
          },
          {
            startTime: 100260,
            endTime: 100390,
            data: 'phải',
          },
          {
            startTime: 100390,
            endTime: 100840,
            data: 'đau',
          },
        ],
      },
      {
        words: [
          {
            startTime: 100840,
            endTime: 101080,
            data: 'Anh',
          },
          {
            startTime: 101080,
            endTime: 101340,
            data: 'chưa',
          },
          {
            startTime: 101340,
            endTime: 101580,
            data: 'từng,',
          },
          {
            startTime: 101580,
            endTime: 101830,
            data: 'giải',
          },
          {
            startTime: 101830,
            endTime: 102690,
            data: 'thích',
          },
        ],
      },
      {
        words: [
          {
            startTime: 102690,
            endTime: 102810,
            data: 'Chưa',
          },
          {
            startTime: 102810,
            endTime: 102930,
            data: 'một',
          },
          {
            startTime: 102930,
            endTime: 103180,
            data: 'lần',
          },
          {
            startTime: 103180,
            endTime: 103310,
            data: 'muốn',
          },
          {
            startTime: 103310,
            endTime: 103560,
            data: 'ta',
          },
          {
            startTime: 103560,
            endTime: 103680,
            data: 'cãi',
          },
          {
            startTime: 103680,
            endTime: 104310,
            data: 'nhau',
          },
        ],
      },
      {
        words: [
          {
            startTime: 104310,
            endTime: 104570,
            data: 'Những',
          },
          {
            startTime: 104570,
            endTime: 104810,
            data: 'chiều',
          },
          {
            startTime: 104810,
            endTime: 105070,
            data: 'thu',
          },
          {
            startTime: 105070,
            endTime: 105070,
            data: 'man',
          },
          {
            startTime: 105070,
            endTime: 105310,
            data: 'mác',
          },
          {
            startTime: 105310,
            endTime: 105810,
            data: 'sầu',
          },
        ],
      },
      {
        words: [
          {
            startTime: 105810,
            endTime: 106070,
            data: 'Vẫn',
          },
          {
            startTime: 106070,
            endTime: 106310,
            data: 'anh',
          },
          {
            startTime: 106310,
            endTime: 106310,
            data: 'trong',
          },
          {
            startTime: 106310,
            endTime: 106570,
            data: 'căn',
          },
          {
            startTime: 106570,
            endTime: 106810,
            data: 'gác',
          },
          {
            startTime: 106810,
            endTime: 107260,
            data: 'nhỏ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 107260,
            endTime: 107520,
            data: 'Ngân',
          },
          {
            startTime: 107520,
            endTime: 107770,
            data: 'nga',
          },
          {
            startTime: 107770,
            endTime: 108010,
            data: 'đôi',
          },
          {
            startTime: 108010,
            endTime: 108260,
            data: 'câu',
          },
          {
            startTime: 108260,
            endTime: 108520,
            data: 'hát',
          },
          {
            startTime: 108520,
            endTime: 108960,
            data: 'đó',
          },
        ],
      },
      {
        words: [
          {
            startTime: 108960,
            endTime: 109210,
            data: 'Về',
          },
          {
            startTime: 109210,
            endTime: 109330,
            data: 'những',
          },
          {
            startTime: 109330,
            endTime: 109580,
            data: 'nỗi',
          },
          {
            startTime: 109580,
            endTime: 109710,
            data: 'buồn',
          },
          {
            startTime: 109710,
            endTime: 109960,
            data: 'không',
          },
          {
            startTime: 109960,
            endTime: 110210,
            data: 'đáng',
          },
          {
            startTime: 110210,
            endTime: 110930,
            data: 'có',
          },
        ],
      },
      {
        words: [
          {
            startTime: 110930,
            endTime: 111060,
            data: 'Tháng',
          },
          {
            startTime: 111060,
            endTime: 111180,
            data: 'năm',
          },
          {
            startTime: 111180,
            endTime: 111430,
            data: 'bên',
          },
          {
            startTime: 111430,
            endTime: 111560,
            data: 'cạnh',
          },
          {
            startTime: 111560,
            endTime: 112410,
            data: 'nhau',
          },
        ],
      },
      {
        words: [
          {
            startTime: 112410,
            endTime: 112540,
            data: 'Dễ',
          },
          {
            startTime: 112540,
            endTime: 112790,
            data: 'dàng',
          },
          {
            startTime: 112790,
            endTime: 113040,
            data: 'buông',
          },
          {
            startTime: 113040,
            endTime: 113160,
            data: 'lời',
          },
          {
            startTime: 113160,
            endTime: 113540,
            data: 'xa',
          },
          {
            startTime: 113540,
            endTime: 113910,
            data: 'vời',
          },
        ],
      },
      {
        words: [
          {
            startTime: 113910,
            endTime: 114160,
            data: 'Nước',
          },
          {
            startTime: 114160,
            endTime: 114410,
            data: 'mắt',
          },
          {
            startTime: 114410,
            endTime: 114660,
            data: 'ai',
          },
          {
            startTime: 114660,
            endTime: 114780,
            data: 'vội',
          },
          {
            startTime: 114780,
            endTime: 115010,
            data: 'lau',
          },
          {
            startTime: 115010,
            endTime: 115270,
            data: 'đành',
          },
          {
            startTime: 115270,
            endTime: 115390,
            data: 'thôi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 115390,
            endTime: 115640,
            data: 'Nhìn',
          },
          {
            startTime: 115640,
            endTime: 115890,
            data: 'em',
          },
          {
            startTime: 115890,
            endTime: 116010,
            data: 'vội',
          },
          {
            startTime: 116010,
            endTime: 116260,
            data: 'trao',
          },
          {
            startTime: 116260,
            endTime: 116390,
            data: 'người',
          },
          {
            startTime: 116390,
            endTime: 117080,
            data: 'sau',
          },
        ],
      },
      {
        words: [
          {
            startTime: 117080,
            endTime: 117580,
            data: 'Thương',
          },
          {
            startTime: 117580,
            endTime: 117840,
            data: 'nhau',
          },
          {
            startTime: 117840,
            endTime: 118090,
            data: 'khi',
          },
          {
            startTime: 118090,
            endTime: 118590,
            data: 'ánh',
          },
          {
            startTime: 118590,
            endTime: 118830,
            data: 'nắng',
          },
          {
            startTime: 118830,
            endTime: 119330,
            data: 'sáng',
          },
          {
            startTime: 119330,
            endTime: 120330,
            data: 'ngời',
          },
        ],
      },
      {
        words: [
          {
            startTime: 120330,
            endTime: 120840,
            data: 'Xa',
          },
          {
            startTime: 120840,
            endTime: 121090,
            data: 'nhau',
          },
          {
            startTime: 121090,
            endTime: 121340,
            data: 'khi',
          },
          {
            startTime: 121340,
            endTime: 121840,
            data: 'mưa',
          },
          {
            startTime: 121840,
            endTime: 122090,
            data: 'giăng',
          },
          {
            startTime: 122090,
            endTime: 122590,
            data: 'khắp',
          },
          {
            startTime: 122590,
            endTime: 123280,
            data: 'lối',
          },
        ],
      },
      {
        words: [
          {
            startTime: 123280,
            endTime: 123540,
            data: 'Điều',
          },
          {
            startTime: 123540,
            endTime: 123780,
            data: 'này',
          },
          {
            startTime: 123780,
            endTime: 124040,
            data: 'đúng',
          },
          {
            startTime: 124040,
            endTime: 124280,
            data: 'hay',
          },
          {
            startTime: 124280,
            endTime: 124540,
            data: 'là',
          },
          {
            startTime: 124540,
            endTime: 125230,
            data: 'sai',
          },
        ],
      },
      {
        words: [
          {
            startTime: 125230,
            endTime: 125480,
            data: 'Là',
          },
          {
            startTime: 125480,
            endTime: 125730,
            data: 'tốt',
          },
          {
            startTime: 125730,
            endTime: 125990,
            data: 'cho',
          },
          {
            startTime: 125990,
            endTime: 126230,
            data: 'cả',
          },
          {
            startTime: 126230,
            endTime: 126830,
            data: 'hai',
          },
        ],
      },
      {
        words: [
          {
            startTime: 126830,
            endTime: 127080,
            data: 'Chỉ',
          },
          {
            startTime: 127080,
            endTime: 127330,
            data: 'biết',
          },
          {
            startTime: 127330,
            endTime: 127580,
            data: 'ta',
          },
          {
            startTime: 127580,
            endTime: 127580,
            data: 'đã',
          },
        ],
      },
      {
        words: [
          {
            startTime: 127580,
            endTime: 127840,
            data: 'Vô',
          },
          {
            startTime: 127840,
            endTime: 128080,
            data: 'tình',
          },
          {
            startTime: 128080,
            endTime: 128580,
            data: 'đến',
          },
          {
            startTime: 128580,
            endTime: 128630,
            data: 'thế',
          },
        ],
      },
      {
        words: [
          {
            startTime: 128630,
            endTime: 129130,
            data: 'Chợt',
          },
          {
            startTime: 129130,
            endTime: 129380,
            data: 'nhận',
          },
          {
            startTime: 129380,
            endTime: 129880,
            data: 'ra',
          },
          {
            startTime: 129880,
            endTime: 130380,
            data: 'anh',
          },
          {
            startTime: 130380,
            endTime: 130640,
            data: 'đã',
          },
          {
            startTime: 130640,
            endTime: 131140,
            data: 'đánh',
          },
          {
            startTime: 131140,
            endTime: 131930,
            data: 'mất',
          },
        ],
      },
      {
        words: [
          {
            startTime: 131930,
            endTime: 132180,
            data: 'Tìm',
          },
          {
            startTime: 132180,
            endTime: 132430,
            data: 'lại',
          },
          {
            startTime: 132430,
            endTime: 132560,
            data: 'sao',
          },
          {
            startTime: 132560,
            endTime: 132810,
            data: 'được',
          },
          {
            startTime: 132810,
            endTime: 133180,
            data: 'khi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 133180,
            endTime: 133560,
            data: 'Bước',
          },
          {
            startTime: 133560,
            endTime: 133930,
            data: 'chân',
          },
          {
            startTime: 133930,
            endTime: 134310,
            data: 'em',
          },
          {
            startTime: 134310,
            endTime: 135140,
            data: 'xa',
          },
        ],
      },
      {
        words: [
          {
            startTime: 135140,
            endTime: 135640,
            data: 'Tháng',
          },
          {
            startTime: 135640,
            endTime: 136140,
            data: 'năm',
          },
          {
            startTime: 136140,
            endTime: 136380,
            data: 'trôi',
          },
          {
            startTime: 136380,
            endTime: 136640,
            data: 'qua',
          },
          {
            startTime: 136640,
            endTime: 137390,
            data: 'nhanh',
          },
          {
            startTime: 137390,
            endTime: 138390,
            data: 'quá',
          },
        ],
      },
      {
        words: [
          {
            startTime: 138390,
            endTime: 138880,
            data: 'Giấc',
          },
          {
            startTime: 138880,
            endTime: 139380,
            data: 'mơ',
          },
          {
            startTime: 139380,
            endTime: 139630,
            data: 'kia',
          },
          {
            startTime: 139630,
            endTime: 139880,
            data: 'như',
          },
          {
            startTime: 139880,
            endTime: 140630,
            data: 'tan',
          },
          {
            startTime: 140630,
            endTime: 141630,
            data: 'vỡ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 141630,
            endTime: 142070,
            data: 'Còn',
          },
          {
            startTime: 142070,
            endTime: 142320,
            data: 'mình',
          },
          {
            startTime: 142320,
            endTime: 142820,
            data: 'anh',
          },
          {
            startTime: 142820,
            endTime: 143320,
            data: 'mang',
          },
          {
            startTime: 143320,
            endTime: 143560,
            data: 'những',
          },
          {
            startTime: 143560,
            endTime: 144060,
            data: 'nỗi',
          },
          {
            startTime: 144060,
            endTime: 144980,
            data: 'nhớ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 144980,
            endTime: 145230,
            data: 'Một',
          },
          {
            startTime: 145230,
            endTime: 145480,
            data: 'mình',
          },
          {
            startTime: 145480,
            endTime: 145610,
            data: 'anh',
          },
          {
            startTime: 145610,
            endTime: 145860,
            data: 'lạc',
          },
          {
            startTime: 145860,
            endTime: 146230,
            data: 'trong',
          },
        ],
      },
      {
        words: [
          {
            startTime: 146230,
            endTime: 146610,
            data: 'Giữa',
          },
          {
            startTime: 146610,
            endTime: 146980,
            data: 'đêm',
          },
          {
            startTime: 146980,
            endTime: 147490,
            data: 'chơ',
          },
          {
            startTime: 147490,
            endTime: 148190,
            data: 'vơ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 148190,
            endTime: 148690,
            data: 'Biết',
          },
          {
            startTime: 148690,
            endTime: 149190,
            data: 'em',
          },
          {
            startTime: 149190,
            endTime: 149430,
            data: 'đang',
          },
          {
            startTime: 149430,
            endTime: 149700,
            data: 'nơi',
          },
          {
            startTime: 149700,
            endTime: 150690,
            data: 'xa',
          },
          {
            startTime: 150690,
            endTime: 151440,
            data: 'lắm',
          },
        ],
      },
      {
        words: [
          {
            startTime: 151440,
            endTime: 151940,
            data: 'Vẫn',
          },
          {
            startTime: 151940,
            endTime: 152440,
            data: 'mong',
          },
          {
            startTime: 152440,
            endTime: 152680,
            data: 'em',
          },
          {
            startTime: 152680,
            endTime: 152940,
            data: 'bao',
          },
          {
            startTime: 152940,
            endTime: 153680,
            data: 'đêm',
          },
          {
            startTime: 153680,
            endTime: 156680,
            data: 'trắng',
          },
        ],
      },
      {
        words: [
          {
            startTime: 157620,
            endTime: 157880,
            data: 'Làm',
          },
          {
            startTime: 157880,
            endTime: 158120,
            data: 'sao',
          },
          {
            startTime: 158120,
            endTime: 158380,
            data: 'giấu',
          },
          {
            startTime: 158380,
            endTime: 158620,
            data: 'đi',
          },
          {
            startTime: 158620,
            endTime: 158880,
            data: 'đôi',
          },
          {
            startTime: 158880,
            endTime: 159380,
            data: 'mắt',
          },
          {
            startTime: 159380,
            endTime: 159610,
            data: 'nhòe',
          },
        ],
      },
      {
        words: [
          {
            startTime: 159610,
            endTime: 159870,
            data: 'Kể',
          },
          {
            startTime: 159870,
            endTime: 160370,
            data: 'từ',
          },
          {
            startTime: 160370,
            endTime: 160620,
            data: 'ngày',
          },
          {
            startTime: 160620,
            endTime: 160870,
            data: 'em',
          },
          {
            startTime: 160870,
            endTime: 161810,
            data: 'đi',
          },
        ],
      },
      {
        words: [
          {
            startTime: 161810,
            endTime: 162060,
            data: 'Ở',
          },
          {
            startTime: 162060,
            endTime: 162320,
            data: 'trong',
          },
          {
            startTime: 162320,
            endTime: 162560,
            data: 'mắt',
          },
          {
            startTime: 162560,
            endTime: 165560,
            data: 'anh',
          },
        ],
      },
      {
        words: [
          {
            startTime: 165750,
            endTime: 166010,
            data: 'Chạm',
          },
          {
            startTime: 166010,
            endTime: 166250,
            data: 'từng',
          },
          {
            startTime: 166250,
            endTime: 166510,
            data: 'chút',
          },
          {
            startTime: 166510,
            endTime: 167010,
            data: 'đau',
          },
          {
            startTime: 167010,
            endTime: 167250,
            data: 'thương',
          },
        ],
      },
      {
        words: [
          {
            startTime: 167250,
            endTime: 167750,
            data: 'Nén',
          },
          {
            startTime: 167750,
            endTime: 168220,
            data: 'lại',
          },
          {
            startTime: 168220,
            endTime: 168460,
            data: 'càng',
          },
          {
            startTime: 168460,
            endTime: 168720,
            data: 'thêm',
          },
          {
            startTime: 168720,
            endTime: 169440,
            data: 'xót',
          },
          {
            startTime: 169440,
            endTime: 172140,
            data: 'xa',
          },
        ],
      },
      {
        words: [
          {
            startTime: 172140,
            endTime: 172980,
            data: 'Có',
          },
          {
            startTime: 172980,
            endTime: 173110,
            data: 'khi',
          },
          {
            startTime: 173110,
            endTime: 173840,
            data: 'nào',
          },
          {
            startTime: 173840,
            endTime: 174090,
            data: 'có',
          },
          {
            startTime: 174090,
            endTime: 174340,
            data: 'khi',
          },
          {
            startTime: 174340,
            endTime: 175540,
            data: 'nào',
          },
        ],
      },
      {
        words: [
          {
            startTime: 175540,
            endTime: 175780,
            data: 'Ở',
          },
          {
            startTime: 175780,
            endTime: 175780,
            data: 'nơi',
          },
          {
            startTime: 175780,
            endTime: 176040,
            data: 'đâu',
          },
          {
            startTime: 176040,
            endTime: 176530,
            data: 'đó',
          },
          {
            startTime: 176530,
            endTime: 176780,
            data: 'nhìn',
          },
          {
            startTime: 176780,
            endTime: 177490,
            data: 'về',
          },
        ],
      },
      {
        words: [
          {
            startTime: 177490,
            endTime: 177990,
            data: 'Quá',
          },
          {
            startTime: 177990,
            endTime: 178480,
            data: 'khứ',
          },
          {
            startTime: 178480,
            endTime: 178990,
            data: 'của',
          },
          {
            startTime: 178990,
            endTime: 179740,
            data: 'hai',
          },
          {
            startTime: 179740,
            endTime: 180240,
            data: 'ta',
          },
          {
            startTime: 180240,
            endTime: 180740,
            data: 'em',
          },
          {
            startTime: 180740,
            endTime: 181490,
            data: 'có',
          },
          {
            startTime: 181490,
            endTime: 181680,
            data: 'tiếc',
          },
        ],
      },
      {
        words: [
          {
            startTime: 181680,
            endTime: 181920,
            data: 'Chợt',
          },
          {
            startTime: 181920,
            endTime: 182420,
            data: 'nhận',
          },
          {
            startTime: 182420,
            endTime: 182680,
            data: 'ra',
          },
          {
            startTime: 182680,
            endTime: 182930,
            data: 'anh',
          },
          {
            startTime: 182930,
            endTime: 183180,
            data: 'đã',
          },
          {
            startTime: 183180,
            endTime: 183440,
            data: 'đánh',
          },
          {
            startTime: 183440,
            endTime: 184120,
            data: 'mất',
          },
        ],
      },
      {
        words: [
          {
            startTime: 184120,
            endTime: 184370,
            data: 'Tìm',
          },
          {
            startTime: 184370,
            endTime: 184610,
            data: 'lại',
          },
          {
            startTime: 184610,
            endTime: 184610,
            data: 'sao',
          },
          {
            startTime: 184610,
            endTime: 184870,
            data: 'được',
          },
        ],
      },
      {
        words: [
          {
            startTime: 184870,
            endTime: 185370,
            data: 'Khi',
          },
          {
            startTime: 185370,
            endTime: 185610,
            data: 'bước',
          },
          {
            startTime: 185610,
            endTime: 186110,
            data: 'chân',
          },
          {
            startTime: 186110,
            endTime: 186610,
            data: 'em',
          },
          {
            startTime: 186610,
            endTime: 187310,
            data: 'xa',
          },
        ],
      },
      {
        words: [
          {
            startTime: 187310,
            endTime: 187810,
            data: 'Tháng',
          },
          {
            startTime: 187810,
            endTime: 188300,
            data: 'năm',
          },
          {
            startTime: 188300,
            endTime: 188800,
            data: 'trôi',
          },
          {
            startTime: 188800,
            endTime: 189050,
            data: 'qua',
          },
          {
            startTime: 189050,
            endTime: 189800,
            data: 'nhanh',
          },
          {
            startTime: 189800,
            endTime: 190750,
            data: 'quá',
          },
        ],
      },
      {
        words: [
          {
            startTime: 190750,
            endTime: 191000,
            data: 'Giấc',
          },
          {
            startTime: 191000,
            endTime: 191250,
            data: 'mơ',
          },
          {
            startTime: 191250,
            endTime: 191500,
            data: 'kia',
          },
          {
            startTime: 191500,
            endTime: 191750,
            data: 'như',
          },
        ],
      },
      {
        words: [
          {
            startTime: 191750,
            endTime: 192000,
            data: 'Đang',
          },
          {
            startTime: 192000,
            endTime: 192240,
            data: 'dần',
          },
          {
            startTime: 192240,
            endTime: 193000,
            data: 'tan',
          },
          {
            startTime: 193000,
            endTime: 193950,
            data: 'vỡ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 193950,
            endTime: 194450,
            data: 'Còn',
          },
          {
            startTime: 194450,
            endTime: 194690,
            data: 'mình',
          },
          {
            startTime: 194690,
            endTime: 195190,
            data: 'anh',
          },
          {
            startTime: 195190,
            endTime: 195450,
            data: 'mang',
          },
          {
            startTime: 195450,
            endTime: 195950,
            data: 'những',
          },
          {
            startTime: 195950,
            endTime: 196200,
            data: 'nỗi',
          },
          {
            startTime: 196200,
            endTime: 197260,
            data: 'nhớ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 197260,
            endTime: 197520,
            data: 'Một',
          },
          {
            startTime: 197520,
            endTime: 197640,
            data: 'mình',
          },
          {
            startTime: 197640,
            endTime: 197890,
            data: 'anh',
          },
          {
            startTime: 197890,
            endTime: 198110,
            data: 'lạc',
          },
          {
            startTime: 198110,
            endTime: 198230,
            data: 'trong',
          },
        ],
      },
      {
        words: [
          {
            startTime: 198230,
            endTime: 198860,
            data: 'Giữa',
          },
          {
            startTime: 198860,
            endTime: 199230,
            data: 'đêm',
          },
          {
            startTime: 199230,
            endTime: 199610,
            data: 'chơ',
          },
          {
            startTime: 199610,
            endTime: 200580,
            data: 'vơ',
          },
        ],
      },
      {
        words: [
          {
            startTime: 200580,
            endTime: 201060,
            data: 'Biết',
          },
          {
            startTime: 201060,
            endTime: 201560,
            data: 'em',
          },
          {
            startTime: 201560,
            endTime: 201940,
            data: 'đang',
          },
          {
            startTime: 201940,
            endTime: 202060,
            data: 'nơi',
          },
          {
            startTime: 202060,
            endTime: 203060,
            data: 'xa',
          },
          {
            startTime: 203060,
            endTime: 203770,
            data: 'lắm',
          },
        ],
      },
      {
        words: [
          {
            startTime: 203770,
            endTime: 204270,
            data: 'Vẫn',
          },
          {
            startTime: 204270,
            endTime: 204770,
            data: 'mong',
          },
          {
            startTime: 204770,
            endTime: 205020,
            data: 'em',
          },
          {
            startTime: 205020,
            endTime: 205270,
            data: 'bao',
          },
          {
            startTime: 205270,
            endTime: 206030,
            data: 'đêm',
          },
          {
            startTime: 206030,
            endTime: 207480,
            data: 'trắng',
          },
        ],
      },
      {
        words: [
          {
            startTime: 207480,
            endTime: 207670,
            data: 'Never',
          },
          {
            startTime: 207670,
            endTime: 208420,
            data: 'wanna',
          },
          {
            startTime: 208420,
            endTime: 208920,
            data: 'let',
          },
          {
            startTime: 208920,
            endTime: 209170,
            data: 'you',
          },
          {
            startTime: 209170,
            endTime: 210920,
            data: 'go',
          },
        ],
      },
      {
        words: [
          {
            startTime: 210920,
            endTime: 211180,
            data: 'Never',
          },
          {
            startTime: 211180,
            endTime: 211870,
            data: 'wanna',
          },
          {
            startTime: 211870,
            endTime: 212370,
            data: 'let',
          },
          {
            startTime: 212370,
            endTime: 212610,
            data: 'you',
          },
          {
            startTime: 212610,
            endTime: 213120,
            data: 'go',
          },
          {
            startTime: 213120,
            endTime: 214380,
            data: 'bae',
          },
        ],
      },
      {
        words: [
          {
            startTime: 214380,
            endTime: 215380,
            data: 'Never',
          },
        ],
      },
    ],
  },
};
