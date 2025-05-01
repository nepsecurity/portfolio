document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (document.body.classList.contains('mobile-menu-open')) {
            toggleMobileMenu();
          }
        }
      });
    });
    
    // Intersection Observer for animations
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.animate-fade-in');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });
    
    // Print button functionality (optional)
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print mr-2"></i> Print Resume';
    printButton.className = 'fixed bottom-8 left-8 bg-gray-800 text-white px-4 py-2 rounded-full hidden md:flex items-center shadow-lg hover:bg-gray-900 transition';
    printButton.addEventListener('click', () => window.print());
    document.body.appendChild(printButton);
    
    // Theme switcher (optional)
    const themeSwitcher = document.createElement('button');
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    themeSwitcher.className = 'fixed bottom-24 left-8 bg-gray-800 text-white w-12 h-12 rounded-full hidden md:flex items-center justify-center shadow-lg hover:bg-gray-900 transition';
    themeSwitcher.setAttribute('aria-label', 'Toggle dark mode');
    themeSwitcher.setAttribute('title', 'Toggle dark mode');
    
    let darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
      themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeSwitcher.addEventListener('click', () => {
      darkMode = !darkMode;
      document.documentElement.classList.toggle('dark');
      themeSwitcher.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', darkMode);
    });
    
    document.body.appendChild(themeSwitcher);
    
    // Add dark mode styles if needed
    const styleElement = document.createElement('style');
    styleElement.id = 'dark-mode-styles';
    styleElement.textContent = `
      .dark {
        --text-color: #f3f4f6;
        --light-bg: #111827;
        --white: #1f2937;
        --gray-light: #374151;
      }
      
      .dark body {
        background-color: #111827;
        color: #f3f4f6;
      }
      
      .dark .bg-white {
        background-color: #1f2937;
      }
      
      .dark .bg-gray-50 {
        background-color: #111827;
      }
      
      .dark .text-gray-600 {
        color: #d1d5db;
      }
      
      .dark .text-gray-800 {
        color: #f3f4f6;
      }
    `;
    
    if (darkMode) {
      document.head.appendChild(styleElement);
    }
  });