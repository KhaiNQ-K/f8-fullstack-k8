const $ = document.querySelector.bind(document);

const app = {
  songs: [
    {
      id: 1,
      path: './assets/audio/anh-tha.mp3',
      imageUrl: './assets/img/img-1.jpg',
    },
  ],
  currentSong: {},
  render() {},
  handleEvents() {},
  start() {
    // load song
    this.loadSongInfo();
    // handle events
    this.handleEvents();
  },
  getCurrentSong() {
    this.currentSong = this.songs[0];
  },
  loadSongInfo() {
    audio.src = this.song.path;
    currentTimeEl.innerHTML = this.getTime(0);
  },
};
