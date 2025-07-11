document.addEventListener("DOMContentLoaded", function () {
  const words = ["Web Developer", "Web Designer", "Frontend Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;

  function type() {
      if (charIndex < words[wordIndex].length) {
          currentWord += words[wordIndex].charAt(charIndex);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex++;
          setTimeout(type, typingSpeed);
      } else {
          setTimeout(erase, newWordDelay);
      }
  }

  function erase() {
      if (charIndex > 0) {
          currentWord = currentWord.slice(0, -1);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex--;
          setTimeout(erase, erasingSpeed);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, typingSpeed + 1100);
      }
  }

  type();

  // Navigation menu
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section');

  // Toggle mobile menu
  if (navToggle) {
      navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
      });
  }

  // Close mobile menu when clicking on a nav link
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('active');
      });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navMenu.classList.remove('active');
      }
  });

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });

  // Add active class to current section in viewport
  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - 60) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(item => {
          item.classList.remove('active-link');
          if (item.getAttribute('href').slice(1) === current) {
              item.classList.add('active-link');
          }
      });
  });
});

// Animate progress bars
const progressBars = document.querySelectorAll('.progress-done');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        requestAnimationFrame(() => {
            bar.style.width = bar.getAttribute('data-done') + '%';
            bar.style.opacity = 1;
        });
    });
};

// Delay animation start
setTimeout(animateProgressBars, 500);

// Animate circular skills
const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {
    let percent = circle.getAttribute('data-percent');
    circle.style.setProperty('--percent', percent);
});

// Theme change 
const themeButton = document.getElementById('theme-button');

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeButton.classList.toggle('uil-sun');
    });
}

// Keep track of currently open modal
let currentOpenModal = null;

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }

    if (!modal.style.display) {
        modal.style.display = "none";
    }
    
    if (currentOpenModal && currentOpenModal !== modal) {
        currentOpenModal.style.display = "none";
    }
    
    if (modal.style.display === "block") {
        modal.style.display = "none";
        currentOpenModal = null;
    } else {
        modal.style.display = "block";
        currentOpenModal = modal;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (currentOpenModal && !event.target.closest('.modal-content') && !event.target.closest('.btn-view-more')) {
        currentOpenModal.style.display = "none";
        currentOpenModal = null;
    }
});

// Add click event listeners to all view more buttons
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreButtons = document.querySelectorAll('.btn-view-more');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const modalId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            toggleModal(modalId);
        });
    });
});

// Prevent modal content clicks from closing the modal
document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

function toggleDetails(id) {
    const details = document.getElementById(id);
    const button = details.previousElementSibling.querySelector('.qualification__button');
    const icon = button.querySelector('i');
    
    document.querySelectorAll('.qualification__details').forEach(detail => {
        if (detail.id !== id && detail.classList.contains('active')) {
            detail.classList.remove('active');
            const otherButton = detail.previousElementSibling.querySelector('.qualification__button');
            const otherIcon = otherButton.querySelector('i');
            otherButton.innerHTML = `View More <i class="uil uil-angle-down"></i>`;
        }
    });

    details.classList.toggle('active');
    
    if (details.classList.contains('active')) {
        button.innerHTML = `View Less <i class="uil uil-angle-up"></i>`;
    } else {
        button.innerHTML = `View More <i class="uil uil-angle-down"></i>`;
    }
}

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTop');

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
