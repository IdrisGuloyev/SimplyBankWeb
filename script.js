'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

// for (let i = 0; i < btnsOpenModalWindow.length; i++)
//   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// Scroll to

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();

  console.log(section1Coords);
  // window.scrollTo(
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.top + window.pageYOffset
  // );

  // Old method

  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // New method
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth page navigation

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//New method of Smooth page navigation

// 1. ?????????????????? event listener ?????? ???????????? ????????????????
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. ???????????????????? Target element
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// ??????????????
const tabs = document.querySelectorAll('.operations__tab');
const tabConteiner = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabConteiner.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause -?????????? ????????????
  if (!clickedButton) return;

  // ???????????????? ??????????????
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // ???????????????? ??????????????
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ?????????????????? ???????????? ??????????????????

const navLinksHoverAnimation = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');

// ???????????? ?? ?????????????????????? ?????? ???????????? bind() / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky Navigation
// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky nav - Intersection Observer API

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {});
// };

// const observerOptions = {
//   root: null,
//   threshhold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// ?????????? ?????????????????? ?????? ??????????????????????????
const allSections = document.querySelectorAll('.section');

const appearanceSection = function (enteries, observer) {
  const entry = enteries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading for Img
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;

  // ???????????? ???? ?????????????????????? ?? ?????????????? ??????????????????????
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
});
lazyImages.forEach(image => lazyImagesObserver.observe(image));

// ???????????????? ????????????????
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(1300px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
