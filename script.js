document.addEventListener('DOMContentLoaded', function() {
  // Reveal elements on scroll
  window.addEventListener('scroll', function() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  });
  // Back to Top functionality
  var backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };
    backToTopButton.onclick = function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
  }
  // Dark Mode Toggle
  var darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.onclick = function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    };
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
  // Smooth Scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  // Comment System (if you decide to implement it)
  var commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.onsubmit = function(e) {
      e.preventDefault();
      var name = document.getElementById('commentName').value.trim();
      var comment = document.getElementById('commentText').value.trim();
      if (name === '' || comment === '') {
        alert('Please fill out both fields.');
        return false;
      }
      var newComment = document.createElement('li');
      newComment.innerHTML = '<strong>' + name + ':</strong> ' + comment;
      document.getElementById('commentsUl').prepend(newComment);
      document.getElementById('commentName').value = '';
      document.getElementById('commentText').value = '';
    };
  }
  // Image Lazy Loading
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazyload");
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    let script = document.createElement("script");
    script.async = true;
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }
  // Simple form validation
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // New Accessibility Functions start here
  // Font Size Adjustment
  window.changeFontSize = function(direction) {
    let currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    if (direction === 'increase') {
      document.body.style.fontSize = (currentSize * 1.1) + 'px';
    } else {
      document.body.style.fontSize = (currentSize / 1.1) + 'px';
    }
  };

  // Theme Change
  window.changeTheme = function(theme) {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
  };

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    changeTheme(savedTheme);
  }

  // Dyslexia-Friendly Font Toggle
  window.toggleDyslexiaFont = function() {
    document.body.classList.toggle('dyslexia-font');
    localStorage.setItem('dyslexiaFont', document.body.classList.contains('dyslexia-font'));
  };

  // Check for saved dyslexia font preference
  if (localStorage.getItem('dyslexiaFont') === 'true') {
    document.body.classList.add('dyslexia-font');
  }

  // Text Spacing Adjustment
  window.adjustSpacing = function(property, value) {
    if (property === 'lineHeight') {
      document.body.style.lineHeight = value;
    } else if (property === 'letterSpacing') {
      document.body.style.letterSpacing = value + 'px';
    }
    localStorage.setItem(property, value);
  };

  // Check for saved spacing preferences
  const savedLineHeight = localStorage.getItem('lineHeight');
  const savedLetterSpacing = localStorage.getItem('letterSpacing');
  if (savedLineHeight) document.body.style.lineHeight = savedLineHeight;
  if (savedLetterSpacing) document.body.style.letterSpacing = savedLetterSpacing + 'px';

  // Initialize range inputs
  const lineHeightInput = document.getElementById('lineHeight');
  const letterSpacingInput = document.getElementById('letterSpacing');
  if (lineHeightInput) lineHeightInput.value = savedLineHeight || 1.5;
  if (letterSpacingInput) letterSpacingInput.value = savedLetterSpacing || 0;

  // End of new Accessibility Functions
});
