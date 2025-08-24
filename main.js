
const texts = [
  'It Student',
  'UI/UX Designer', 
  'Problem Solver',
  'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
  const currentText = texts[textIndex];
  const typedElement = document.getElementById('typed-text');
  
  if (!isDeleting) {
    typedElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
      }, pauseTime);
    }
  } else {
    typedElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }
  
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeText, speed);
}


const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');


navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      

      if (entry.target.id === 'about') {
        animateCounters();
      }
      
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
    }
  });
}, observerOptions);


function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

function updateParallax() {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px)`;
  });
}


function initAnimations() {

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  const leftElements = document.querySelectorAll('.about-text, .contact-info');
  leftElements.forEach(el => {
    el.classList.add('slide-in-left');
    observer.observe(el);
  });
  
  const rightElements = document.querySelectorAll('.experience-timeline, .contact-form-container');
  rightElements.forEach(el => {
    el.classList.add('slide-in-right');
    observer.observe(el);
  });
}


window.addEventListener('scroll', () => {
  updateActiveNav();
  updateParallax();
});

window.addEventListener('resize', () => {

  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  typeText();
  initAnimations();
});


window.addEventListener('load', () => {

  const hero = document.querySelector('.hero');
  hero.style.opacity = '0';
  hero.style.transform = 'translateY(50px)';
  
  setTimeout(() => {
    hero.style.transition = 'all 1s ease';
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }, 100);
});

window.openModal = openModal;
window.closeModal = closeModal;