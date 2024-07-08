var carouselInnerEl = document.querySelector('.carousel-inner');
var nextEl = document.querySelector('.carousel-nav .next');
var prevEl = document.querySelector('.carousel-nav .prev');

// nextEl.addEventListener('click', function () {
//   console.log('click');
// });
// prevEl.addEventListener('click', function () {
//   console.log('click');
//   if (position === 0) {
//     position = -totalWidth + carouselWidth;
//     carouselInnerEl.style.translate = `${-totalWidth + carouselWidth}px`;
//     return;
//   }
//   position += carouselWidth;
//   carouselInnerEl.style.translate = `${position}px`;
// });

// handle event
const app = {
  totalWidth: 0,
  carouselWidth: 0,
  position: 0,
  positionDrag: 0,
  isDrag: false,
  currentPointX: 0,
  isNext: false,
  carouselItems: [
    {
      id: 1,
      name: 'Image 1',
      path: 'https://fastly.picsum.photos/id/450/1600/500.jpg?hmac=tuGbYs8ybCTcoW6hiv9Y08rCGNsP01ykdeMK6ROy2ik',
    },
    {
      id: 2,
      name: 'Image 2',
      path: 'https://fastly.picsum.photos/id/955/1600/500.jpg?hmac=le9a1mNWTzQ3TuGulY2l6xDna368AE30wZMhvPKT4yQ',
    },
    {
      id: 3,
      name: 'Image 3',
      path: 'https://fastly.picsum.photos/id/806/1600/500.jpg?hmac=1ijH1n9Z4Azdbadyg2xDgUYjwa2vPhRsNpSBp0kcWV4',
    },
  ],
  render() {
    var html = this.carouselItems.map(function (item) {
      return `<div class="item" data-id=${item.id}>
          <img
            src="${item.path}"
            alt="${item.name}"
          />
        </div>`;
    });
    carouselInnerEl.innerHTML = html;
  },
  handleEvents() {
    debugger;
    const _this = this;
    nextEl.onclick = function (e) {
      const nextWidth = Math.abs(_this.position) + _this.carouselWidth;
      if (nextWidth === _this.totalWidth) {
        // _this.position = 0;
        // carouselInnerEl.style.translate = `${_this.position}px`;
        return;
      }
      _this.position -= _this.carouselWidth;
      carouselInnerEl.style.translate = `${_this.position}px`;
    };
    prevEl.onclick = function (e) {
      debugger;
      if (_this.position === 0) {
        // _this.position = _this.carouselWidth - _this.totalWidth;
        // carouselInnerEl.style.translate = `${_this.carouselWidth - _this.totalWidth}px`;
        return;
      }
      _this.position += _this.carouselWidth;
      carouselInnerEl.style.translate = `${_this.position}px`;
    };
    carouselInnerEl.onmousedown = function (e) {
      e.preventDefault();
      if (e.which === 1) {
        _this.isDrag = true;
        _this.currentPointX = e.offsetX;
      }
    };
    document.onmousemove = function (e) {
      e.preventDefault();
      if (_this.isDrag) {
        _this.positionDrag = 0;
        _this.isNext = e.offsetX - _this.currentPointX < 0;
        console.log(_this.isNext);
        if (_this.isNext) {
          var countWidth = Math.abs(e.offsetX - _this.currentPointX);
          var currentPosition = 0;
          currentPosition = countWidth;
          _this.positionDrag = -currentPosition;
          carouselInnerEl.style.translate = `${_this.positionDrag - _this.position}px`;
          console.log((Math.abs(_this.positionDrag) / _this.carouselWidth) * 100);
          if ((Math.abs(_this.positionDrag) / _this.carouselWidth) * 100 >= 20) {
            _this.isDrag = false;
            nextEl.click();
          }
          if (Math.abs(_this.positionDrag - _this.position) > _this.totalWidth) {
            return;
          }
        }
      }
      if (!_this.isDrag) return;
      // _this.position -= e.offsetX - _this.currentPointX;
      // _this.currentPointX = e.offsetX;
      // carouselInnerEl.style.translate = `${_this.position}px`;
    };
    carouselInnerEl.onmouseup = function (e) {
      e.preventDefault();
      _this.isDrag = false;
    };
  },
  run() {
    this.render();
    this.carouselWidth = carouselInnerEl.clientWidth;
    this.totalWidth = carouselInnerEl.children.length * this.carouselWidth;
    this.handleEvents();
  },
};
app.run();
