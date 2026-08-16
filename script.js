/* =========================
   MOBILE MENU
========================= */

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-bar");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/* =========================
   HERO SLIDER
========================= */

const slides = document.querySelectorAll(".slides");

let currentSlide = 0;

setInterval(() => {

  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");

}, 5000);

/* =========================
   REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }

  });

});

revealElements.forEach(element => {
  observer.observe(element);
});

/* =========================
   ACCORDION
========================= */

const accordionButtons = document.querySelectorAll(".skill-header");

accordionButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".skill-card");

    document.querySelectorAll(".skill-card").forEach(item => {

      if (item !== card) {
        item.classList.remove("active");
      }

    });

    card.classList.toggle("active");

  });

});

/* =========================
   ABOUT ACCORDION
========================= */

const aboutButtons = document.querySelectorAll(".about-toggle");

aboutButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".about-card");

    document.querySelectorAll(".about-card").forEach(item => {

      if (item !== card) {
        item.classList.remove("active");
      }

    });

    card.classList.toggle("active");

  });

});

/* =========================
   SERVICE IMAGE SLIDERS
========================= */

const sliders = document.querySelectorAll(".service-slider");

sliders.forEach(slider => {

  const images = slider.querySelectorAll(".slide-img");

  let current = 0;

  setInterval(() => {

    images[current].classList.remove("active");

    current = (current + 1) % images.length;

    images[current].classList.add("active");

  }, 2000);

});

/* =========================================
COUNTERS
AGREGAR AL FINAL DE script.js
========================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);

    let current = 0;

    const step = Math.ceil(target / 60);

    const update = () => {

      current += step;

      if (current >= target) {
        counter.textContent = target;
        return;
      }

      counter.textContent = current;

      requestAnimationFrame(update);
    };

    update();

    counterObserver.unobserve(counter);

  });

}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* =========================================
AUTO CLOSE MENU MOBILE
========================================= */

document.querySelectorAll(".nav-bar a").forEach(link => {

  link.addEventListener("click", () => {

    if (window.innerWidth <= 768) {
      menu.classList.remove("active");
    }

  });

});

/* ==========================================
NAV SCROLL
========================================== */

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){
        nav.classList.add('scrolled');
    }else{
        nav.classList.remove('scrolled');
    }

});


/* ==========================================
MENU MOBILE
========================================== */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if(menuToggle){

    menuToggle.addEventListener('click', () => {

        navMenu.classList.toggle('active');

    });

}


/* ==========================================
AUTO CLOSE MOBILE
========================================== */

document.querySelectorAll('.nav-menu a').forEach(link => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('active');

    });

});


/* ==========================================
ACTIVE LINK
========================================== */

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ){
            current = section.getAttribute('id');
        }

    });

    document.querySelectorAll('.nav-menu a').forEach(link => {

        link.classList.remove('active');

        const href = link.getAttribute('href');

        if(href === '#' + current){
            link.classList.add('active');
        }

    });

});