"use strict";
// PRELOAD
const preloader = document.querySelector("[data-preload]");
window.addEventListener("load", function () {
    var _a;
    preloader === null || preloader === void 0 ? void 0 : preloader.classList.add("loaded");
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.classList.add("loaded");
});
// Event listener utility function
const addEventOnElement = function (elements, eventType, callback) {
    elements.forEach((element) => {
        element.addEventListener(eventType, callback);
    });
};
// NAVBAR
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggle]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavber = function () {
    var _a;
    navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle("active");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle("active");
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.classList.toggle("nav-active");
};
// Convert NodeList to HTMLElement array
const navTogglersArray = Array.from(navTogglers);
// Add event listener to navTogglers
addEventOnElement(navTogglersArray, "click", toggleNavber);
// HEADER SCROLL & back to btn
const header = document.querySelector("[data-header]");
const backToTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;
const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header === null || header === void 0 ? void 0 : header.classList.add("hide");
    }
    else {
        header === null || header === void 0 ? void 0 : header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
};
window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        header === null || header === void 0 ? void 0 : header.classList.add("active");
        backToTopBtn === null || backToTopBtn === void 0 ? void 0 : backToTopBtn.classList.add("active");
        hideHeader();
    }
    else {
        header === null || header === void 0 ? void 0 : header.classList.remove("active");
        backToTopBtn === null || backToTopBtn === void 0 ? void 0 : backToTopBtn.classList.remove("active");
    }
});
// HERO SLIDER
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];
const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};
const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    }
    else {
        currentSlidePos++;
    }
    updateSliderPos();
};
const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    }
    else {
        currentSlidePos--;
    }
    updateSliderPos();
};
heroSliderNextBtn === null || heroSliderNextBtn === void 0 ? void 0 : heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn === null || heroSliderPrevBtn === void 0 ? void 0 : heroSliderPrevBtn.addEventListener("click", slidePrev);
let autoSlideInterval;
const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
};
addEventOnElement([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});
addEventOnElement([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);
// Parallex Effect
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;
window.addEventListener("mousemove", function (event) {
    x = (event.clientX / window.innerWidth) * 10 - 5;
    y = (event.clientY / window.innerHeight) * 10 - 5;
    x = x - x * 2;
    y = y - y * 2;
    parallaxItems.forEach((para) => {
        x = x * Number(para.getAttribute("data-parallax-speed"));
        y = y * Number(para.getAttribute("data-parallax-speed"));
        const element = para; // Type cast to HTMLElement
        element.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    });
});
