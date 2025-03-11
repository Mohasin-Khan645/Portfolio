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

// Navigation menu toggle
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Show menu
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// Hide menu
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// Theme change 
const themeButton = document.getElementById('theme-button')

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
    themeButton.classList.toggle('uil-sun')
})

// Keep track of currently open modal
let currentOpenModal = null;

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    
    // Ensure modal exists
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }

    // Force display style initialization
    if (!modal.style.display) {
        modal.style.display = "none";
    }
    
    // If there's already an open modal and it's different from the one being opened
    if (currentOpenModal && currentOpenModal !== modal) {
        currentOpenModal.style.display = "none";
    }
    
    // Toggle the clicked modal
    if (modal.style.display === "block") {
        modal.style.display = "none";
        currentOpenModal = null;
    } else {
        modal.style.display = "block";
        currentOpenModal = modal;
    }

    // Debug log
    console.log('Toggle modal:', modalId, 'Display:', modal.style.display);
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
    
    // Close all other details first
    document.querySelectorAll('.qualification__details').forEach(detail => {
        if (detail.id !== id && detail.classList.contains('active')) {
            detail.classList.remove('active');
            const otherButton = detail.previousElementSibling.querySelector('.qualification__button');
            const otherIcon = otherButton.querySelector('i');
            otherButton.innerHTML = `View More <i class="uil uil-angle-down"></i>`;
        }
    });

    // Toggle current details
    details.classList.toggle('active');
    
    // Update button text and icon
    if (details.classList.contains('active')) {
        button.innerHTML = `View Less <i class="uil uil-angle-up"></i>`;
    } else {
        button.innerHTML = `View More <i class="uil uil-angle-down"></i>`;
    }
}
  