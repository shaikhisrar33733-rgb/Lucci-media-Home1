/**
 * LUCCI MEDIA — LUXURY EDITORIAL AGENCY HOMEPAGE SCRIPT
 * Strict Tech Stack: Vanilla JavaScript (ES6+)
 * High-End Animations, Micro-Interactions & Sliders
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     01. LUXURY PRELOADER
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('luxuryPreloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const preloaderCounter = document.getElementById('preloaderCounter');

  if (preloader && preloaderProgress && preloaderCounter) {
    let progress = 0;
    const intervalTime = 16; // ~60fps step
    const increment = 2.5;

    const timer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        preloaderProgress.style.width = '100%';
        preloaderCounter.textContent = '100%';

        setTimeout(() => {
          preloader.classList.add('fade-out');
          document.body.classList.add('is-loaded');
        }, 300);
      } else {
        const rounded = Math.floor(progress);
        const formatted = rounded < 10 ? `0${rounded}%` : `${rounded}%`;
        preloaderProgress.style.width = `${progress}%`;
        preloaderCounter.textContent = formatted;
      }
    }, intervalTime);
  }

  /* --------------------------------------------------------------------------
     01B. HERO BACKGROUND VIDEO AUTOPLAY ASSURANCE
     -------------------------------------------------------------------------- */
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    heroVideo.muted = true;
    const playVideo = () => {
      heroVideo.play().catch(() => {});
    };
    playVideo();
    window.addEventListener('touchstart', playVideo, { once: true, passive: true });
    window.addEventListener('click', playVideo, { once: true, passive: true });
  }

  /* --------------------------------------------------------------------------
     01C. HERO TYPEWRITER ANIMATION (CONTINUOUS TYPE & ERASE LOOP)
     -------------------------------------------------------------------------- */
  const typewriterContent = document.getElementById('typewriterContent');
  if (typewriterContent) {
    const textToType = "INDEPENDENT CREATIVE & DIGITAL AGENCY";
    let charIndex = 0;
    let isDeleting = false;
    let hasStarted = false;

    const typeSpeed = 65;      // typing speed (ms per char)
    const deleteSpeed = 30;    // erasing speed (ms per char)
    const pauseEnd = 2200;     // pause after completing sentence
    const pauseStart = 600;    // pause before retyping

    const tick = () => {
      if (!isDeleting) {
        charIndex++;
        typewriterContent.textContent = textToType.substring(0, charIndex);

        if (charIndex === textToType.length) {
          isDeleting = true;
          setTimeout(tick, pauseEnd);
          return;
        }

        setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        typewriterContent.textContent = textToType.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          setTimeout(tick, pauseStart);
          return;
        }

        setTimeout(tick, deleteSpeed);
      }
    };

    // Trigger after preloader completes or immediately if already loaded
    const startTypewriter = () => {
      if (hasStarted) return;
      hasStarted = true;
      setTimeout(tick, 350);
    };

    if (document.body.classList.contains('is-loaded')) {
      startTypewriter();
    } else {
      let waitTime = 0;
      const waitPreloader = setInterval(() => {
        waitTime += 50;
        if (document.body.classList.contains('is-loaded') || waitTime >= 1800) {
          clearInterval(waitPreloader);
          startTypewriter();
        }
      }, 50);
    }
  }

  /* --------------------------------------------------------------------------
     02. STICKY NAVBAR & ACTIVE SCROLL SPY
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main > section[id]');

  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 50) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }

    // Scroll spy for active link
    let currentId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     03. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add('is-active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove('is-active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('is-active')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     04. SIGNATURE SERVICES DYNAMIC HOVER PREVIEW
     -------------------------------------------------------------------------- */
  const serviceRows = document.querySelectorAll('.service-row-item');
  const servicePreviewImg = document.getElementById('servicePreviewImg');
  const previewTag = document.getElementById('previewTag');

  if (serviceRows.length && servicePreviewImg && previewTag) {
    serviceRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const previewUrl = row.getAttribute('data-preview');
        const tagText = row.getAttribute('data-tag');

        if (previewUrl && servicePreviewImg.src !== previewUrl) {
          servicePreviewImg.style.opacity = '0.4';
          setTimeout(() => {
            servicePreviewImg.src = previewUrl;
            servicePreviewImg.style.opacity = '1';
          }, 150);
        }

        if (tagText) {
          previewTag.textContent = tagText;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     05. INTERSECTION OBSERVER SCROLL ANIMATIONS
     -------------------------------------------------------------------------- */
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && scrollElements.length) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    scrollElements.forEach((el) => scrollObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    scrollElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     09. SMOOTH SCROLL WITH OFFSET
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     10. SOCIAL HAUS STUDIO CARD IMAGE SLIDER (CROSSFADE AUTOPLAY)
     -------------------------------------------------------------------------- */
  const studioSliderViewport = document.getElementById('studioCardSlider');
  if (studioSliderViewport) {
    const slides = studioSliderViewport.querySelectorAll('.studio-slide-img');
    let currentSlideIndex = 0;
    let studioSliderTimer = null;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    const nextStudioSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(currentSlideIndex);
    };

    const startStudioAutoplay = () => {
      if (!studioSliderTimer && slides.length > 1) {
        studioSliderTimer = setInterval(nextStudioSlide, 3500);
      }
    };

    const stopStudioAutoplay = () => {
      if (studioSliderTimer) {
        clearInterval(studioSliderTimer);
        studioSliderTimer = null;
      }
    };

    studioSliderViewport.addEventListener('mouseenter', stopStudioAutoplay);
    studioSliderViewport.addEventListener('mouseleave', startStudioAutoplay);

    // Pause when tab is inactive to prevent burst transitions
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopStudioAutoplay();
      } else {
        startStudioAutoplay();
      }
    });

    startStudioAutoplay();
  }

  console.log('LUCCI MEDIA LUXURY EDITORIAL HOMEPAGE INITIALIZED.');
});
