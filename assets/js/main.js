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
      heroVideo.play().catch(() => { });
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

    const typeSpeed = 120;     // smooth, slow typing speed (ms per char)
    const deleteSpeed = 55;    // calm deleting speed (ms per char)
    const pauseEnd = 3500;     // relaxed pause after completing sentence (ms)
    const pauseStart = 1000;   // brief pause before retyping (ms)

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
     04. SERVICES INTERACTIVE HOVER IMAGE REVEAL (THE SOCIAL AGENCY DNA)
     -------------------------------------------------------------------------- */
  const serviceNavRows = document.querySelectorAll('.service-nav-row');
  const servicePreviewItems = document.querySelectorAll('.services-preview-item');

  if (serviceNavRows.length && servicePreviewItems.length) {
    serviceNavRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const serviceIndex = parseInt(row.getAttribute('data-service'), 10);

        serviceNavRows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');

        servicePreviewItems.forEach((img, idx) => {
          if (idx === serviceIndex) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     04B. SERVICES BANNER MULTI-LINE SEQUENTIAL TYPEWRITER
     -------------------------------------------------------------------------- */
  const servicesTypewriter = document.getElementById('servicesTypewriterContainer');
  if (servicesTypewriter) {
    const lines = [
      "FIVE YEARS OF WORKING WITH LUXURY E-COMMERCE",
      "SHOOTING IN THE HEART OF NYC.",
      "CREATIVE, PRODUCTION & STRATEGY IN-HOUSE",
      "100% USAGE RIGHTS, ALWAYS."
    ];

    const lineElements = servicesTypewriter.querySelectorAll('.typewriter-line');
    let lineIdx = 0;
    let charIdx = 0;
    let typeTimer = null;

    const charSpeed = 45;   // smooth typing ms per char
    const linePause = 350;  // pause between lines
    const endPause = 4500;  // reading pause with all 4 lines visible together

    const typeNextChar = () => {
      if (lineIdx >= lines.length) return;

      const currentTarget = lines[lineIdx];
      const currentEl = lineElements[lineIdx];
      const textSpan = currentEl.querySelector('.line-text');
      const cursorSpan = currentEl.querySelector('.line-cursor');

      if (cursorSpan && !cursorSpan.classList.contains('active')) {
        cursorSpan.classList.add('active');
      }

      charIdx++;
      if (textSpan) {
        textSpan.textContent = currentTarget.substring(0, charIdx);
      }

      if (charIdx < currentTarget.length) {
        typeTimer = setTimeout(typeNextChar, charSpeed);
      } else {
        // Line completed
        if (lineIdx < lines.length - 1) {
          if (cursorSpan) cursorSpan.classList.remove('active');
          lineIdx++;
          charIdx = 0;
          const nextCursor = lineElements[lineIdx].querySelector('.line-cursor');
          if (nextCursor) nextCursor.classList.add('active');
          typeTimer = setTimeout(typeNextChar, linePause);
        } else {
          // All 4 lines completed and visible together!
          typeTimer = setTimeout(() => {
            lineElements.forEach((el) => {
              const t = el.querySelector('.line-text');
              const c = el.querySelector('.line-cursor');
              if (t) t.textContent = '';
              if (c) c.classList.remove('active');
            });
            lineIdx = 0;
            charIdx = 0;
            const firstCursor = lineElements[0].querySelector('.line-cursor');
            if (firstCursor) firstCursor.classList.add('active');
            typeTimer = setTimeout(typeNextChar, linePause);
          }, endPause);
        }
      }
    };

    setTimeout(typeNextChar, 500);
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

  /* --------------------------------------------------------------------------
     11. EDITORIAL TESTIMONIALS 5-SLIDE CAROUSEL (AUTOMATIC 5-SECOND CONTINUOUS ROTATION)
     -------------------------------------------------------------------------- */
  const testimonialsSection = document.getElementById('testimonials');
  if (testimonialsSection) {
    const slides = testimonialsSection.querySelectorAll('.testimonial-slide');
    const dots = testimonialsSection.querySelectorAll('.testimonial-dot');
    const counter = document.getElementById('testimonialsCounter');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoRotateTimer = null;
    const ROTATION_INTERVAL = 5000; // 5000 milliseconds = 5 seconds

    const showSlide = (index) => {
      // Loop continuously: slide 5 -> slide 1
      currentIndex = (index + totalSlides) % totalSlides;

      // Update slides
      slides.forEach((slide, i) => {
        const isActive = i === currentIndex;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', !isActive);
      });

      // Update dots
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      // Update counter in .01/5 format
      if (counter) {
        const formattedIndex = String(currentIndex + 1).padStart(2, '0');
        counter.textContent = `.${formattedIndex}/${totalSlides}`;
      }
    };

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const startAutoRotate = () => {
      if (autoRotateTimer) {
        clearInterval(autoRotateTimer);
      }
      if (totalSlides > 1) {
        autoRotateTimer = setInterval(nextSlide, ROTATION_INTERVAL);
      }
    };

    // Manual navigation dot clicks
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
        if (!isNaN(targetIndex)) {
          showSlide(targetIndex);
          startAutoRotate(); // Immediately reset 5s interval on manual selection
        }
      });
    });

    // Handle tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (autoRotateTimer) {
          clearInterval(autoRotateTimer);
          autoRotateTimer = null;
        }
      } else {
        startAutoRotate();
      }
    });

    // Touch swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsSection.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    testimonialsSection.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          nextSlide();
          startAutoRotate();
        } else if (touchEndX - touchStartX > swipeThreshold) {
          showSlide(currentIndex - 1);
          startAutoRotate();
        }
      }
    }, { passive: true });

    // Initial render & immediate start of automatic continuous rotation
    showSlide(0);
    startAutoRotate();
  }

  console.log('LUCCI MEDIA LUXURY EDITORIAL HOMEPAGE INITIALIZED.');
});
