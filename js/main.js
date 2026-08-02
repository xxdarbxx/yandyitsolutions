(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    if (window.lucide) lucide.createIcons();

    setupHeader();
    setupMobileNav();
    setupScrollReveal();
    setupCounters();
    setupHeroSlideshow();
    setupFaqAccordion();
    setupPortfolioModal();
    setupRipple();
    setupContactForm();
    setupServiceLearnMore();
    setupMessengerSdk();

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Sticky header ----------
  function setupHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Mobile nav ----------
  function setupMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    var icon = document.getElementById('menuIcon');
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      if (icon) icon.setAttribute('data-lucide', 'menu');
      if (window.lucide) lucide.createIcons();
    }

    toggle.addEventListener('click', function () {
      var isOpen = !menu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        menu.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        if (icon) icon.setAttribute('data-lucide', 'x');
        if (window.lucide) lucide.createIcons();
      }
    });

    menu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---------- Scroll reveal ----------
  function setupScrollReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Animated counters ----------
  function setupCounters() {
    var counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var duration = 1400;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Hero slideshow crossfade ----------
  function setupHeroSlideshow() {
    var slides = document.querySelectorAll('#heroSlideshow .hero-slide');
    var mobileSlides = document.querySelectorAll('#heroSlideshowMobile .hero-slide-mobile');
    if (!slides.length) return;

    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      current = (current + 1) % slides.length;
      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
    }, 3200);

    if (mobileSlides.length) {
      var mCurrent = 0;
      setInterval(function () {
        mobileSlides[mCurrent].classList.remove('opacity-100');
        mobileSlides[mCurrent].classList.add('opacity-0');
        mCurrent = (mCurrent + 1) % mobileSlides.length;
        mobileSlides[mCurrent].classList.remove('opacity-0');
        mobileSlides[mCurrent].classList.add('opacity-100');
      }, 4200);
    }
  }

  // ---------- FAQ accordion ----------
  function setupFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ---------- Portfolio modal ----------
  function setupPortfolioModal() {
    var modal = document.getElementById('portfolioModal');
    if (!modal) return;
    var backdrop = document.getElementById('modalBackdrop');
    var closeBtn = document.getElementById('modalClose');
    var titleEl = document.getElementById('modalTitle');
    var categoryEl = document.getElementById('modalCategory');
    var descEl = document.getElementById('modalDesc');
    var techEl = document.getElementById('modalTech');
    var imgDesktop = document.getElementById('modalImgDesktop');
    var imgMobile = document.getElementById('modalImgMobile');

    function openModal(card) {
      titleEl.textContent = card.getAttribute('data-title') || '';
      categoryEl.textContent = card.getAttribute('data-category') || '';
      descEl.textContent = card.getAttribute('data-desc') || '';
      imgDesktop.src = card.getAttribute('data-desktop') || '';
      imgDesktop.alt = (card.getAttribute('data-title') || '') + ' desktop preview';
      imgMobile.src = card.getAttribute('data-mobile') || '';
      imgMobile.alt = (card.getAttribute('data-title') || '') + ' mobile preview';

      var tech = (card.getAttribute('data-tech') || '').split(',').filter(Boolean);
      techEl.innerHTML = '';
      tech.forEach(function (t) {
        var span = document.createElement('span');
        span.className = 'text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full';
        span.textContent = t.trim();
        techEl.appendChild(span);
      });

      modal.classList.remove('hidden');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-card').forEach(function (card) {
      card.querySelectorAll('.portfolio-view-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          openModal(card);
        });
      });
    });

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ---------- Button ripple ----------
  function setupRipple() {
    document.querySelectorAll('.btn-ripple').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var ripple = document.createElement('span');
        ripple.className = 'ripple-el';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 650);
      });
    });
  }

  // ---------- Contact form ----------
  function setupContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var note = document.getElementById('formNote');
    var noteDefault = note ? note.textContent : '';
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitBtnDefault = submitBtn ? submitBtn.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (note) {
            note.textContent = "Thanks! Your quote request has been sent — we'll get back to you within one business day.";
            note.classList.add('text-emerald-600', 'font-semibold');
          }
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        if (note) {
          note.textContent = 'Something went wrong sending your message. Please call or message us on Facebook instead.';
          note.classList.add('text-red-600', 'font-semibold');
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnDefault;
          if (window.lucide) lucide.createIcons();
        }
      });
    });
  }

  // ---------- Service "Learn More" -> prefill contact form ----------
  function setupServiceLearnMore() {
    document.querySelectorAll('.service-learn-more').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var service = btn.getAttribute('data-service');
        var select = document.getElementById('service');
        if (!select || !service) return;
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].text === service) {
            select.selectedIndex = i;
            break;
          }
        }
      });
    });
  }

  // ---------- Facebook Messenger Chat Plugin ----------
  function setupMessengerSdk() {
    var chatEl = document.getElementById('fb-customer-chat');
    if (!chatEl || !chatEl.getAttribute('page_id')) return;

    window.fbAsyncInit = function () {
      FB.init({ xfbml: true, version: 'v19.0' });
    };

    var script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }
})();
