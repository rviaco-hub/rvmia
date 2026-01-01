/* MENU */
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

toggle.onclick = () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
};

/* SLIDER */
let index = 0;
const slides = document.querySelectorAll('.slides');

setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 5000);

/* REVEAL */
const reveal = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('active'));
});
reveal.forEach(r => obs.observe(r));
