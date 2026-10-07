document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('bm-carbon-theme') || 'g100';
  htmlElement.setAttribute('data-theme', savedTheme);
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = (currentTheme === 'g100' || currentTheme === 'dark') ? 'white' : 'g100';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('bm-carbon-theme', newTheme);
      showCarbonToast(`Theme switched to Carbon ${newTheme === 'white' ? 'White' : 'Gray 100'}`, 'success');
    });
  }
  const menuTrigger = document.getElementById('menu-trigger');
  const mainNav = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');
  const navItems = document.querySelectorAll('.cds--header__menu-item');
  const toggleMobileNav = (forceClose = false) => {
    if (!mainNav || !menuTrigger) return;
    const isCurrentlyOpen = forceClose ? false : !mainNav.classList.contains('active');
    if (isCurrentlyOpen) {
      mainNav.classList.add('active');
      if (navOverlay) navOverlay.classList.add('active');
      menuTrigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mainNav.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      menuTrigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };
  if (menuTrigger) {
    menuTrigger.addEventListener('click', () => toggleMobileNav());
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleMobileNav(true));
  }
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMobileNav(true);
      }
    });
  });
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');
  const onScroll = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.cds--header__menu-item[href="#${id}"]`);
      if (activeLink && scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(el => el.classList.remove('active'));
        activeLink.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const typingEl = document.getElementById('typing-text');
  const roles = [
    '"Enterprise Web Applications"',
    '"Pure JavaScript Architecture"',
    '"Accessible Frontend Systems (WCAG)"',
    '"Modular Component Engineering"',
    '"High-Performance REST Clients"'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;
  function runTypingLoop() {
    if (!typingEl) return;
    const currentStr = roles[roleIdx];
    if (isDeleting) {
      typingEl.textContent = currentStr.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      typingEl.textContent = currentStr.substring(0, charIdx + 1);
      charIdx++;
      delay = 85;
    }
    if (!isDeleting && charIdx === currentStr.length) {
      delay = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 350;
    }
    setTimeout(runTypingLoop, delay);
  }
  runTypingLoop();
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  const animateCounters = () => {
    if (animated) return;
    statNumbers.forEach(elem => {
      const target = +elem.getAttribute('data-target');
      const duration = 1600;
      const start = performance.now();
      const step = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        elem.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          elem.textContent = target;
        }
      };
      requestAnimationFrame(step);
    });
    animated = true;
  };
  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    const statsGrid = document.querySelector('.stats-matrix');
    if (statsGrid) statsObserver.observe(statsGrid);
    const progressFills = document.querySelectorAll('.cds--progress-bar__fill');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFills.forEach(bar => {
            const pct = bar.style.getPropertyValue('--percent');
            if (pct) bar.style.width = pct;
          });
        }
      });
    }, { threshold: 0.15 });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillsObserver.observe(skillsSection);
  } else {
    animateCounters();
    document.querySelectorAll('.cds--progress-bar__fill').forEach(b => {
      b.style.width = b.style.getPropertyValue('--percent');
    });
  }
  const skillTabs = document.querySelectorAll('#skills .cds--tabs__nav-link');
  const skillCards = document.querySelectorAll('.skill-item');
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filterCat = tab.getAttribute('data-category');
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCat === 'all' || cardCat === filterCat) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.25s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  const projectTabs = document.querySelectorAll('.project-filter-tabs .cds--tabs__nav-link');
  const projectCols = document.querySelectorAll('.project-col');
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filterType = tab.getAttribute('data-filter');
      projectCols.forEach(col => {
        const categories = col.getAttribute('data-category').split(' ');
        if (filterType === 'all' || categories.includes(filterType)) {
          col.style.display = 'block';
          col.style.animation = 'fadeIn 0.25s ease forwards';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });
  const projectSpecs = {
    1: {
      id: 'PRJ_01',
      title: 'Interactive Telemetry & Metrics Dashboard',
      category: 'Pure JavaScript & Carbon Aesthetics',
      summary: 'High-frequency telemetry stream visualizer engineered with 100% vanilla JavaScript. Implements custom SVG chart plotting engines, zero dependencies, and local state persistence.',
      architecture: [
        'Pure DOM manipulation with SVG vector rendering for live charts',
        'Interval simulation mimicking WebSocket telemetry push streams',
        'Local state persistence for layout filters via window.localStorage',
        'Strict WCAG 2.1 AA keyboard navigability and focus management'
      ],
      technologies: ['Vanilla JavaScript', 'SVG Rendering', 'CSS Grid 2x', 'LocalStorage API'],
      repoUrl: 'https://github.com'
    },
    2: {
      id: 'PRJ_02',
      title: 'TaskFlow — Modular Agile Kanban System',
      category: 'Native HTML5 Drag & Drop Engine',
      summary: 'Agile team workflow board built directly on top of the native HTML5 Drag and Drop API. Supports drag ghosts, custom priority queues, inline editing, and bidirectional JSON state import/export.',
      architecture: [
        'Native Drag & Drop event lifecycle: dragstart, dragover, drop, dragend',
        'Dynamic task creation with contenteditable validation checks',
        'Bidirectional JSON import/export routines for state transport',
        'Touch polyfill handlers for cross-device mobile interactions'
      ],
      technologies: ['HTML5 Drag & Drop', 'JavaScript ES6+', 'JSON Serialization', 'CSS Tokens'],
      repoUrl: 'https://github.com'
    },
    3: {
      id: 'PRJ_03',
      title: 'SkyCast Atmospheric Forecast Client',
      category: 'Asynchronous REST Architecture',
      summary: 'Meteorological dashboard executing async Fetch API requests with exponential backoff retry logic, unit normalization (Celsius/Fahrenheit), and Geolocation coordinate detection.',
      architecture: [
        'Asynchronous data fetching with Promise.allSettled and timeout wrappers',
        'HTML5 Geolocation API fallback to user city search index',
        'Dynamic background color tokens mapped to meteorological status',
        'Zero external SDKs or third-party wrappers'
      ],
      technologies: ['Fetch API', 'Async/Await', 'Geolocation API', 'CSS Variables'],
      repoUrl: 'https://github.com'
    },
    4: {
      id: 'PRJ_04',
      title: 'NovaStore Scalable E-Commerce Frontend',
      category: 'Client-Side State Engine',
      summary: 'Full-featured online catalog with client-side shopping cart calculations, discount coupon engines, dynamic multi-attribute filters, and checkout verification sequence.',
      architecture: [
        'Immutable state management pattern implemented via vanilla JS closures',
        'Event delegation across product grids for optimal memory usage',
        'Local storage persistence ensuring cart continuity across reloads',
        'Interactive checkout modal with step-by-step form validation'
      ],
      technologies: ['Vanilla JS', 'State Machine', 'Event Delegation', 'CSS Grid'],
      repoUrl: 'https://github.com'
    },
    5: {
      id: 'PRJ_05',
      title: 'CSS Gradient & Box-Shadow Studio',
      category: 'Developer Tooling & Clipboard API',
      summary: 'Visual studio for designing layered box shadows and linear/radial CSS gradients. Features live canvas renderers and one-click code generation using the modern Navigator Clipboard API.',
      architecture: [
        'Interactive parameter sliders with debounced canvas redrawing',
        'Modern Navigator Clipboard API integration with fallback support',
        'Cross-browser vendor prefix code output formatter',
        'Zero runtime overhead with instant page loads'
      ],
      technologies: ['Clipboard API', 'Canvas API', 'CSS Custom Properties', 'Vanilla JS'],
      repoUrl: 'https://github.com'
    },
    6: {
      id: 'PRJ_06',
      title: 'Pulse Enterprise Chat Engine Interface',
      category: 'Real-time UI & Web Audio API',
      summary: 'Enterprise messenger interface prototype featuring simulated asynchronous bot replies, typing status telemetry, message timestamp formatting, and custom HTML5 Web Audio chime synthesis.',
      architecture: [
        'Synthesis of notification frequencies using HTML5 AudioContext (no audio files)',
        'Virtual message stream scrolling with auto-scroll lock detection',
        'Keyboard shortcut dispatchers (Cmd/Ctrl + Enter to send)',
        'Accessible live region ARIA attributes for screen readers'
      ],
      technologies: ['Web Audio API', 'DOM Virtualization', 'Keyboard Listeners', 'ARIA Live'],
      repoUrl: 'https://github.com'
    }
  };
  const projectModal = document.getElementById('project-modal');
  const modalLabel = document.getElementById('modal-project-label');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalCloseAction = document.getElementById('modal-close-action');
  const openModal = (id) => {
    const spec = projectSpecs[id];
    if (!spec || !projectModal) return;
    modalLabel.textContent = `${spec.id} // ${spec.category.toUpperCase()}`;
    modalTitle.textContent = spec.title;
    modalBody.innerHTML = `
      <p style="margin-bottom: 1.25rem; font-size: 1rem; color: var(--cds-text-primary); line-height: 1.6;">
        ${spec.summary}
      </p>
      <div style="margin-bottom: 1.25rem;">
        <span class="cds--label">APPLIED TECHNOLOGIES & TOKENS:</span>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
          ${spec.technologies.map(t => `<span class="cds--tag cds--tag--sm cds--tag--blue">${t}</span>`).join('')}
        </div>
      </div>
      <div>
        <span class="cds--label">TECHNICAL ARCHITECTURE SPECIFICATIONS:</span>
        <ul style="list-style: none; margin-top: 8px;">
          ${spec.architecture.map(a => `
            <li style="position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem; font-size: 0.875rem;">
              <span style="position: absolute; left: 0; color: var(--cds-interactive);">✔</span> ${a}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    modalDemoLink.href = spec.repoUrl;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.addEventListener('click', (e) => {
    const tile = e.target.closest('.project-tile');
    if (tile) {
      const id = tile.getAttribute('data-project');
      openModal(id);
    }
  });
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) closeModal();
      if (mainNav && mainNav.classList.contains('active')) toggleMobileNav(true);
    }
  });
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const setFormError = (fieldId, msg) => {
    const err = document.getElementById(`${fieldId}-error`);
    const input = document.getElementById(fieldId);
    if (err) err.textContent = msg;
    if (input) input.style.borderBottomColor = 'var(--cds-support-error)';
  };
  const clearFormError = (fieldId) => {
    const err = document.getElementById(`${fieldId}-error`);
    const input = document.getElementById(fieldId);
    if (err) err.textContent = '';
    if (input) input.style.borderBottomColor = '';
  };
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearFormError(id));
  });
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      let isValid = true;
      if (!name || name.length < 2) {
        setFormError('name', 'Invalid name. Enter at least 2 characters.');
        isValid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setFormError('email', 'Invalid email address format.');
        isValid = false;
      }
      if (!subject || subject.length < 3) {
        setFormError('subject', 'Specify a subject header.');
        isValid = false;
      }
      if (!message || message.length < 10) {
        setFormError('message', 'Message body must contain at least 10 characters.');
        isValid = false;
      }
      if (!isValid) {
        showCarbonToast('Validation error: please check required fields.', 'error');
        return;
      }
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Transmitting telemetry...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showCarbonToast('Transmission successful. Message dispatched to engineer.', 'success');
      }, 1100);
    });
  }
  function showCarbonToast(text, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `cds--toast cds--toast--${type}`;
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
    toast.innerHTML = `
      <i class="${iconClass} cds--toast__icon"></i>
      <span class="cds--toast__message">${text}</span>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCarbonToast('Engineer curriculum & technical spec generated.', 'success');
    });
  }
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  console.log('%c [IBM Design Language] Carbon Design System v11 Initialized ', 'background: #0f62fe; color: #fff; font-family: monospace; padding: 4px 8px;');
});
