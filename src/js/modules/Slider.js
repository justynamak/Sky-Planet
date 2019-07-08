import { Device } from "./Device";
export { Slider };

//6.glowna klasa obslugujaca slider, wyswietlaca
class Slider {
  constructor() {
    this.urlMobile = [
      "url(./assets/slide1.jpg)",
      "url(./assets/slide2.jpg)",
      "url(./assets/slide3.jpg)"
    ];
    this.urlDesctop = [
      "url(./assets/slide1-2x.jpg)",
      "url(./assets/slide2-2x.jpg)",
      "url(./assets/slide3-2x.jpg)"
    ];
    this.carusel = document.querySelector(".carousel__bg");
    this.slideNumber = document.querySelector(".carousel__slide");
    this.slide = new SlideNumber();
    this.number = new PrintNumber();
    this.device = new Device();
    this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
    this.arrowBack = document.querySelector(".carousel__arrow--back");
    this.arrowNext = document.querySelector(".carousel__arrow--next");
    this.arrowBack.addEventListener("click", this.changeSlideBack.bind(this));
    this.arrowNext.addEventListener("click", this.changeSlideNext.bind(this));

    this.dots = [...document.querySelectorAll(".carousel__dot")];
    this.dots.forEach(dot => {
      dot.addEventListener("click", this.changeSlidesWithDots.bind(this));
    }, this);

    this.slideEffect();
  }

  slideEffect() {
    if (this.carusel.classList.contains("carousel__effect")) {
      this.carusel.classList.remove("carousel__effect");
    }

    const that = this;

    setTimeout(() => {
      that.carusel.classList.add("carousel__effect");
    }, 500);
  }

  changeAppearanceDots(indexDot) {
    let indexActive = this.dots.findIndex(dot =>
      dot.classList.contains("carousel__dot--active")
    );

    this.dots[indexActive].classList.remove("carousel__dot--active");
    this.dots[indexDot].classList.add("carousel__dot--active");
  }

  changeSlideAuto() {
    this.slideEffect();
    let currentSlide = this.slide.slideNext();

    if (this.device.checkIfMobile()) {
      this.changeAppearanceDots(currentSlide);
      this.carusel.style.backgroundImage = this.urlMobile[currentSlide];
    } else {
      this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
    }
    this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
  }

  changeSlideBack() {
    this.slideEffect();

    clearInterval(this.indexInterval);

    let currentSlide = this.slide.slideBack();
    this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
    this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
    this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
  }

  changeSlideNext() {
    this.slideEffect();

    clearInterval(this.indexInterval);

    let currentSlide = this.slide.slideNext();
    this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
    this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
    this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
  }

  changeSlidesWithDots(e) {
    this.slideEffect();

    clearInterval(this.indexInterval);

    const indexDot = this.dots.indexOf(e.target);
    this.slide.active = indexDot;
    this.changeAppearanceDots(indexDot);
    this.carusel.style.backgroundImage = this.urlMobile[indexDot];
    this.slideNumber.innerHTML = this.number.numbers[indexDot] + " ";
    this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
  }
}

///1.klasa drukująca nr slajdu
class PrintNumber {
  constructor(activeIndex = 0) {
    this.numbers = [1, 2, 3];
    this.activeIndex = activeIndex;
  }

  printNumberNext() {
    this.activeIndex++;

    if (this.activeIndex >= this.numbers.length) {
      this.activeIndex = 0;
    }

    return this.numbers[this.activeIndex] + " ";
  }

  printNumberBack() {
    this.activeIndex--;

    if (this.activeIndex < 0) {
      this.activeIndex = this.numbers.length - 1;
    }

    return this.numbers[this.activeIndex] + " ";
  }
}

//nr aktywnego slajdu
class SlideNumber {
  constructor() {
    this.activeSlide = [0, 1, 2];
    this.active = 0;
  }

  slideNext() {
    this.active++;

    if (this.active >= this.activeSlide.length) {
      this.active = 0;
    }

    return this.activeSlide[this.active];
  }

  slideBack() {
    this.active--;

    if (this.active < 0) {
      this.active = this.activeSlide.length - 1;
    }

    return this.activeSlide[this.active];
  }
}
