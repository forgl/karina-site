const openButton = document.querySelector('#open-button');
const hero = document.querySelector('#hero');
const mainContent = document.querySelector('#main-content');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const comfortButton = document.querySelector('#comfort-button');
const comfortAnswer = document.querySelector('#comfort-answer');
const comfortMessage = document.querySelector('#comfort-message');
const comfortPhoto = document.querySelector('#comfort-photo');
const musicToggle = document.querySelector('#music-toggle');
const musicPlayer = document.querySelector('.music-player');
const musicStatus = document.querySelector('#music-status');
const futureNotice = document.querySelector('#future-notice');
const chocolateButton = document.querySelector('#chocolate-button');

const comfortMoments = [
  { message: 'Иди сюда, я тебя обниму. Даже если пока только вот так.', photo: 'photo_2026-07-30_23-21-09.jpg' },
  { message: 'Ты всё ещё моя любимая Лися. Ничего с этим не поделать.', photo: 'photo_2025-07-27_01-27-40.jpg' },
  { message: 'Ты справишься. А потом я украду тебя на прогулку.', photo: 'photo_2026-09-08_01-07-13.jpg' }
];

function openLetter() { hero.classList.add('is-closing'); window.setTimeout(() => { hero.hidden = true; mainContent.hidden = false; requestAnimationFrame(() => mainContent.classList.add('is-open')); document.querySelector('#intro').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 500); }
function toggleMenu() { const isOpen = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!isOpen)); mobileMenu.hidden = isOpen; }
function showComfortMoment() { const moment = comfortMoments[Math.floor(Math.random() * comfortMoments.length)]; comfortMessage.textContent = moment.message; comfortPhoto.src = moment.photo; comfortAnswer.hidden = false; comfortButton.setAttribute('aria-expanded', 'true'); }
function toggleMusicInterface() { const isOn = musicToggle.getAttribute('aria-pressed') === 'true'; musicToggle.setAttribute('aria-pressed', String(!isOn)); musicToggle.setAttribute('aria-label', isOn ? 'Включить музыку' : 'Выключить музыку'); musicPlayer.classList.toggle('is-on', !isOn); musicStatus.textContent = isOn ? 'нажми, когда захочешь' : 'музыка появится здесь позже'; }
function revealOnScroll() { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .14 }); document.querySelectorAll('.reveal').forEach((element) => observer.observe(element)); }
openButton.addEventListener('click', openLetter); menuButton.addEventListener('click', toggleMenu); comfortButton.addEventListener('click', showComfortMoment); musicToggle.addEventListener('click', toggleMusicInterface); chocolateButton.addEventListener('click', () => { futureNotice.textContent = 'Вы сказали это одновременно. С тебя шоколадка 🍫'; futureNotice.hidden = false; window.setTimeout(() => { futureNotice.hidden = true; }, 3400); }); document.querySelectorAll('.mobile-menu a[href="#intro"]').forEach((link) => link.addEventListener('click', () => { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); })); revealOnScroll();
