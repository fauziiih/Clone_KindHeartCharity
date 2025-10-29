// ==========================================
// WAIT FOR DOM TO LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {

// ==========================================
// 1. MOBILE NAVIGATION TOGGLE
// ==========================================
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu');

// Create toggle button
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="bi bi-list"></i>';
menuToggle.setAttribute('aria-label', 'Toggle menu');

// Create overlay
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay';
document.body.appendChild(menuOverlay);

// Insert toggle button into nav (after logo, before menu)
if (nav && menu) {
  nav.insertBefore(menuToggle, menu);

  // Toggle menu visibility
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isActive = menu.classList.contains('active');
    
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Function to open menu
  function openMenu() {
    menu.classList.add('active');
    menuOverlay.classList.add('active');
    menuToggle.querySelector('i').className = 'bi bi-x';
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }

  // Function to close menu
  function closeMenu() {
    menu.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.querySelector('i').className = 'bi bi-list';
    document.body.style.overflow = ''; // Restore body scroll
  }

  // Close menu when clicking menu items
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close menu when clicking overlay
  menuOverlay.addEventListener('click', function() {
    closeMenu();
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu when resizing to desktop view
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && menu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// ==========================================
// 2. BACK TO TOP BUTTON
// ==========================================
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Smooth scroll to top
backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ==========================================
// 3. THEME SWITCHER (Light/Dark Mode)
// ==========================================
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle theme');
document.body.appendChild(themeToggle);

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }
}

updateThemeIcon(savedTheme);

// Toggle theme
themeToggle.addEventListener('click', function() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  updateThemeIcon(newTheme);
});

// ==========================================
// 4. IMAGE SLIDER AUTO-SCROLL
// ==========================================
const slider = document.querySelector('.slider');
if (slider) {
  const slides = slider.querySelectorAll('.slide');
  let currentSlide = 0;
  let sliderInterval;
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    slider.scrollTo({
      left: slider.clientWidth * currentSlide,
      behavior: 'smooth'
    });
  }
  
  // Auto-advance every 5 seconds
  function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
  }
  
  function stopSlider() {
    clearInterval(sliderInterval);
  }
  
  startSlider();
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);
  
  // Manual navigation on scroll
  slider.addEventListener('scroll', function() {
    const scrollPosition = slider.scrollLeft;
    const slideWidth = slider.clientWidth;
    currentSlide = Math.round(scrollPosition / slideWidth);
  });
}

// ==========================================
// 5. TESTIMONIAL CAROUSEL
// ==========================================
const profiles = document.querySelectorAll('.profile');
const testimonialText = document.getElementById('testimonial-text');
const testimonialAuthor = document.getElementById('testimonial-author');

if (profiles.length > 0 && testimonialText && testimonialAuthor) {
  profiles.forEach(profile => {
    profile.addEventListener('click', function() {
      // Remove active class from all profiles
      profiles.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked profile
      this.classList.add('active');
      
      // Update testimonial content
      const name = this.getAttribute('data-name');
      const text = this.getAttribute('data-text');
      
      testimonialText.textContent = text;
      testimonialAuthor.textContent = name;
    });
  });
}

// ==========================================
// 6. SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// 7. FORM VALIDATION
// ==========================================
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all required fields
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.border = '2px solid #ff6b6b';
        
        // Reset border after 2 seconds
        setTimeout(() => {
          field.style.border = '';
        }, 2000);
      }
    });
    
    // Remove any existing messages
    const existingMessages = this.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    if (isValid) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Form submitted successfully! Thank you.';
      this.appendChild(successMsg);
      
      // Reset form
      setTimeout(() => {
        this.reset();
        successMsg.remove();
      }, 3000);
    } else {
      // Show error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.textContent = 'Please fill in all required fields.';
      this.appendChild(errorMsg);
      
      setTimeout(() => {
        errorMsg.remove();
      }, 3000);
    }
  });
});

// ==========================================
// 8. NAVBAR BACKGROUND ON SCROLL
// ==========================================
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  
  if (navbar) {
    if (window.pageYOffset > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ==========================================
// 9. ANIMATE ELEMENTS ON SCROLL
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe elements
const animatedElements = document.querySelectorAll('.cause-card, .news-card, .about-card');
animatedElements.forEach(el => observer.observe(el));

console.log('Interactive features loaded successfully!');

}); // End of DOMContentLoaded