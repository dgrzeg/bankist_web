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

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
