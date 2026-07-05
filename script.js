/* =========================================================
   DANCE FUSION — SCRIPT.JS (multi-page site)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* =========================================================
     DYNAMIC GREETING + LIVE CLOCK
     ========================================================= */
  const greetingEl = document.getElementById('greeting');
  const clockEl = document.getElementById('liveClock');

  function updateGreetingAndClock() {
    const now = new Date();
    const hour = now.getHours();

    if (greetingEl) {
      let greeting;
      if (hour < 12) greeting = 'Good Morning! Ready to dance?';
      else if (hour < 17) greeting = 'Good Afternoon! Ready to dance?';
      else if (hour < 21) greeting = 'Good Evening! Ready to dance?';
      else greeting = 'Good Night! See you at class tomorrow.';
      greetingEl.textContent = greeting;
    }

    if (clockEl) {
      const dateStr = now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      clockEl.textContent = `${dateStr}  |  ${timeStr}`;
    }
  }
  updateGreetingAndClock();
  setInterval(updateGreetingAndClock, 1000);

  /* =========================================================
     GALLERY LIGHTBOX (gallery.html)
     ========================================================= */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* =========================================================
     VALIDATION HELPERS
     ========================================================= */
  function showError(inputEl, errorEl, message) {
    inputEl.closest('.form-group')?.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }
  function clearError(inputEl, errorEl) {
    inputEl.closest('.form-group')?.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }
  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  /* =========================================================
     CONTACT FORM VALIDATION (contact.html)
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('cName');
      const email = document.getElementById('cEmail');
      const subject = document.getElementById('cSubject');
      const message = document.getElementById('cMessage');

      if (name.value.trim().length < 3) {
        showError(name, document.getElementById('err-cName'), 'Please enter your full name (min 3 characters).');
        valid = false;
      } else clearError(name, document.getElementById('err-cName'));

      if (!isValidEmail(email.value)) {
        showError(email, document.getElementById('err-cEmail'), 'Please enter a valid email address.');
        valid = false;
      } else clearError(email, document.getElementById('err-cEmail'));

      if (subject.value.trim().length < 3) {
        showError(subject, document.getElementById('err-cSubject'), 'Please enter a subject.');
        valid = false;
      } else clearError(subject, document.getElementById('err-cSubject'));

      if (message.value.trim().length < 10) {
        showError(message, document.getElementById('err-cMessage'), 'Message should be at least 10 characters.');
        valid = false;
      } else clearError(message, document.getElementById('err-cMessage'));

      const successBox = document.getElementById('contactSuccess');
      if (valid) {
        successBox.classList.add('show');
        contactForm.reset();
      } else {
        successBox.classList.remove('show');
      }
    });
  }

  /* =========================================================
     REVIEW FORM VALIDATION (testimonials.html)
     ========================================================= */
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('revName');
      const rating = document.getElementById('revRating');
      const text = document.getElementById('revText');

      if (name.value.trim().length < 2) {
        showError(name, document.getElementById('err-revName'), 'Please enter your name.');
        valid = false;
      } else clearError(name, document.getElementById('err-revName'));

      if (!rating.value) {
        showError(rating, document.getElementById('err-revRating'), 'Please select a rating.');
        valid = false;
      } else clearError(rating, document.getElementById('err-revRating'));

      if (text.value.trim().length < 10) {
        showError(text, document.getElementById('err-revText'), 'Review should be at least 10 characters.');
        valid = false;
      } else clearError(text, document.getElementById('err-revText'));

      const successBox = document.getElementById('reviewSuccess');
      if (valid) {
        successBox.classList.add('show');
        reviewForm.reset();
      } else {
        successBox.classList.remove('show');
      }
    });
  }

  /* =========================================================
     LOGIN PAGE VALIDATION (login.html)
     ========================================================= */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('loginEmail');
      const password = document.getElementById('loginPassword');

      if (!isValidEmail(email.value)) {
        showError(email, document.getElementById('err-loginEmail'), 'Please enter a valid email address.');
        valid = false;
      } else clearError(email, document.getElementById('err-loginEmail'));

      if (password.value.length < 6) {
        showError(password, document.getElementById('err-loginPassword'), 'Password must be at least 6 characters.');
        valid = false;
      } else clearError(password, document.getElementById('err-loginPassword'));

      const successBox = document.getElementById('loginSuccess');
      if (valid) {
        successBox.classList.add('show');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
      } else {
        successBox.classList.remove('show');
      }
    });
  }

  /* =========================================================
     SIGNUP PAGE VALIDATION (signup.html)
     ========================================================= */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('suName');
      const email = document.getElementById('suEmail');
      const password = document.getElementById('suPassword');
      const confirm = document.getElementById('suConfirm');
      const style = document.getElementById('suStyle');
      const terms = document.getElementById('suTerms');

      if (name.value.trim().length < 3) {
        showError(name, document.getElementById('err-suName'), 'Please enter your full name.');
        valid = false;
      } else clearError(name, document.getElementById('err-suName'));

      if (!isValidEmail(email.value)) {
        showError(email, document.getElementById('err-suEmail'), 'Please enter a valid email address.');
        valid = false;
      } else clearError(email, document.getElementById('err-suEmail'));

      if (password.value.length < 6) {
        showError(password, document.getElementById('err-suPassword'), 'Password must be at least 6 characters.');
        valid = false;
      } else clearError(password, document.getElementById('err-suPassword'));

      if (confirm.value !== password.value || confirm.value === '') {
        showError(confirm, document.getElementById('err-suConfirm'), 'Passwords do not match.');
        valid = false;
      } else clearError(confirm, document.getElementById('err-suConfirm'));

      if (!style.value) {
        showError(style, document.getElementById('err-suStyle'), 'Please select a dance style.');
        valid = false;
      } else clearError(style, document.getElementById('err-suStyle'));

      const termsError = document.getElementById('err-suTerms');
      if (!terms.checked) {
        termsError.textContent = 'You must agree to the terms to continue.';
        valid = false;
      } else {
        termsError.textContent = '';
      }

      const successBox = document.getElementById('signupSuccess');
      if (valid) {
        successBox.classList.add('show');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
      } else {
        successBox.classList.remove('show');
      }
    });
  }

});
