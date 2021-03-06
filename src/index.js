('use strict');
import './sass/main.scss';
import './index.html';

///////////////////////////////////////
// Selectors

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Scrolling

btnScrollTo.addEventListener('click', (e) => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// page navigation

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link')) return;
  document
    .querySelector(e.target.getAttribute('href'))
    .scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// tabs

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach((btn) => btn.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const content = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  tabsContent.forEach((tab) =>
    tab.classList.remove('operations__content--active')
  );
  content.classList.add('operations__content--active');
});

///////////////////////////////////////
// menu fade

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// sticky nav

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const handleSticky = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};

const stickyNavObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(
  handleSticky,
  stickyNavObsOptions
);
headerObserver.observe(header);

///////////////////////////////////////
// reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

///////////////////////////////////////
// lazy img load

const allImages = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //entry.target.src = entry.target.dataset.src;
  // entry.target.addEventListener('load', () =>
  //   entry.target.classList.remove('lazy-img')
  // );

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
});

allImages.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////
// slider

const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  const makeDotActive = (dotPos) => {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${dotPos}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = (pos) =>
    slides.forEach(
      (slide, i) => (slide.style.transform = `translateX(${100 * (i - pos)}%)`)
    );

  const nextSlide = () => {
    if (curSlide === slides.length - 1) curSlide = -1;
    curSlide++;
    goToSlide(curSlide);
    makeDotActive(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) curSlide = slides.length;
    curSlide--;
    goToSlide(curSlide);
    makeDotActive(curSlide);
  };

  //starting position
  let curSlide = 0;
  goToSlide(curSlide);
  makeDotActive(curSlide);

  //right
  btnRight.addEventListener('click', nextSlide);

  //left
  btnLeft.addEventListener('click', prevSlide);

  //arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  document.querySelector('.dots').addEventListener('click', (e) => {
    const clicked = e.target.closest('.dots__dot');
    if (!clicked) return;

    clicked.classList.add('dots__dot--active');
    curSlide = clicked.dataset.slide;
    goToSlide(curSlide);
    makeDotActive(curSlide);
  });
};
slider();
