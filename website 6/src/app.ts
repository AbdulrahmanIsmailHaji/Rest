// PRELOAD

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader?.classList.add("loaded");
  document.body?.classList.add("loaded");
});

// Event listener utility function

const addEventOnElement = function (
  elements: HTMLElement[],
  eventType: string,
  callback: EventListenerOrEventListenerObject
) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

// NAVBAR

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggle]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavber = function () {
  navbar?.classList.toggle("active");
  overlay?.classList.toggle("active");
  document.body?.classList.toggle("nav-active");
};

// Convert NodeList to HTMLElement array
const navTogglersArray = Array.from(navTogglers) as HTMLElement[];

// Add event listener to navTogglers
addEventOnElement(navTogglersArray, "click", toggleNavber);

// HEADER SCROLL & back to btn

const header = document.querySelector("[data-header]");
const backToTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header?.classList.add("hide");
  } else {
    header?.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header?.classList.add("active");
    backToTopBtn?.classList.add("active");
    hideHeader();
  } else {
    header?.classList.remove("active");
    backToTopBtn?.classList.remove("active");
  }
});

// HERO SLIDER

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector(
  "[data-prev-btn]"
) as HTMLElement;
const heroSliderNextBtn = document.querySelector(
  "[data-next-btn]"
) as HTMLElement;

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0] as HTMLElement;

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos] as HTMLElement;
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

heroSliderNextBtn?.addEventListener("click", slideNext);
heroSliderPrevBtn?.addEventListener("click", slidePrev);

let autoSlideInterval: number;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

addEventOnElement(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseover",
  function () {
    clearInterval(autoSlideInterval);
  }
);

addEventOnElement(
  [heroSliderNextBtn, heroSliderPrevBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

// Parallex Effect

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x: number, y: number;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  x = x - x * 2;
  y = y - y * 2;

  parallaxItems.forEach((para) => {
    x = x * Number(para.getAttribute("data-parallax-speed"));
    y = y * Number(para.getAttribute("data-parallax-speed"));

    const element = para as HTMLElement; // Type cast to HTMLElement
    element.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});
