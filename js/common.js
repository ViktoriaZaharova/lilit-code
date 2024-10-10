// slick slider
$('.intensive-give-slider').slick({
  infinite: false,
  slidesToShow: 1,
  variableWidth: true,
  swipeToSlide: true,
  prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow-right.svg" alt=""></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-right.svg" alt=""></button>',
  appendArrows: '.intensive-give-slider__nav',
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
      }
    }
  ]
});

// модальные окна (несколько)
$(function () {
  let overlay = $('.overlay'),    
      open_modal = $('.open_modal'),
      close = $('.modal__close, .overlay'),
      modal = $('.modal__div');

  open_modal.on('click',function (event) {
      event.preventDefault();

      modal.css('display', 'none').animate({
          opacity: 0,
          top: '45%'
      }, 200);

      let div = $(this).attr('href');
      overlay.fadeIn(400,
          function () {
              $(div)
                  .css('display', 'flex')
                  .animate({
                      opacity: 1,
                      top: '50%'
                  }, 200);
          });
  });

  close.on('click', function () {
      modal
          .animate({
                  opacity: 0,
                  top: '45%'
              }, 200,
              function () {
                  $(this).css('display', 'none');
                  overlay.fadeOut(400);
              }
          );
  });
});
//end

// bg animation
"use strict";

console.clear();

class Grain {
  constructor(el) {
    /**
     * Options
     * Increase the pattern size if visible pattern
     */
    this.patternSize = 150;
    this.patternScaleX = 1;
    this.patternScaleY = 1;
    this.patternRefreshInterval = 3; // 8
    this.patternAlpha = 15; // int between 0 and 255,

    /**
     * Create canvas
     */
    this.canvas = el;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(this.patternScaleX, this.patternScaleY);

    /**
     * Create a canvas that will be used to generate grain and used as a
     * pattern on the main canvas.
     */
    this.patternCanvas = document.createElement("canvas");
    this.patternCanvas.width = this.patternSize;
    this.patternCanvas.height = this.patternSize;
    this.patternCtx = this.patternCanvas.getContext("2d");
    this.patternData = this.patternCtx.createImageData(
      this.patternSize,
      this.patternSize
    );
    this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4

    /**
     * Prebind prototype function, so later its easier to user
     */
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);

    this.frame = 0;

    window.addEventListener("resize", this.resize);
    this.resize();

    window.requestAnimationFrame(this.loop);
  }

  resize() {
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
  }

  update() {
    const {
      patternPixelDataLength,
      patternData,
      patternAlpha,
      patternCtx
    } = this;

    // put a random shade of gray into every pixel of the pattern
    for (let i = 0; i < patternPixelDataLength; i += 4) {
      // const value = (Math.random() * 255) | 0;
      const value = Math.random() * 255;

      patternData.data[i] = value;
      patternData.data[i + 1] = value;
      patternData.data[i + 2] = value;
      patternData.data[i + 3] = patternAlpha;
    }

    patternCtx.putImageData(patternData, 0, 0);
  }

  draw() {
    const { ctx, patternCanvas, canvas, viewHeight } = this;
    const { width, height } = canvas;

    // clear canvas
    ctx.clearRect(0, 0, width, height);

    // fill the canvas using the pattern
    ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
    ctx.fillRect(0, 0, width, height);
  }

  loop() {
    // only update grain every n frames
    const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
    if (shouldDraw) {
      this.update();
      this.draw();
    }

    window.requestAnimationFrame(this.loop);
  }
}

/**
 * Initiate Grain
 */
const el = document.querySelector(".grain");
const grain = new Grain(el);



// animation
// new WOW().init(); 