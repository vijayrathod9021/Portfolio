
const popup = document.querySelector('.success-popup');

/* ── Typing effect ── */
const phrases = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Clean Code Writer'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typingEl.textContent = current.slice(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
  } else {
    typingEl.textContent = current.slice(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

/* ── Header scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  updateActiveNav();
});

/* ── Scroll to top ── */

document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Active nav ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav ul li a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

/* ── Filter tabs (visual only) ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

const copyMail = document.querySelector('.copyMail');
const copyNumber = document.querySelector('.copyNumber');
const copiedPopup = document.getElementById('copiedPopup');


copyMail.addEventListener('click', () => {
  navigator.clipboard.writeText('vijayra9021@gmail.com')
    .then(() => {
      copiedPopup.classList.add('copiedShow');

      setTimeout(() => {
        copiedPopup.classList.remove('copiedShow');
      }, 2400);

    })

    .catch((error) => {
      console.log(error);
      alert(error.text);
    });
});

copyNumber.addEventListener('click', () => {
  navigator.clipboard.writeText('+91 9021077103')

    .then(() => {
      copiedPopup.classList.add('copiedShow');
      setTimeout(() => {
        copiedPopup.classList.remove('copiedShow');
      }, 2400);
    });
});


emailjs.init("7qpll8kufveUS1JvJ");
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  emailjs.sendForm(
    'service_90jw87g',
    'template_cd24oal',
    form
  )

    .then(() => {
      popup.classList.add('show');
      setTimeout(() => {
        popup.classList.remove('show');

      }, 2500);

      form.reset();

    })

    .catch((error) => {
      console.log(error);
      alert(error.text);
    });

});



(function () {
  "use strict";

  /* ── Skip on touch/mobile devices ── */
  if (!window.matchMedia("(pointer: fine)").matches) return;

  /* ── Elements ── */
  const dot = document.querySelector(".c-cursor");
  const ring = document.querySelector(".c-cursor-trail");

  if (!dot || !ring) {
    console.warn("[cursor.js] Add .c-cursor and .c-cursor-trail divs to your HTML.");
    return;
  }

  /* ── State ── */
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;
  const LERP = 0.11;

  /* ── Track mouse ── */
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Snap dot instantly */
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

    dot.classList.remove("is-hidden");
    ring.classList.remove("is-hidden");
  });

  /* ── Smooth ring loop ── */
  function tick() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);

  /* ── Hide when mouse leaves the viewport ── */
  document.addEventListener("mouseleave", () => {
    dot.classList.add("is-hidden");
    ring.classList.add("is-hidden");
  });

  document.addEventListener("mouseenter", () => {
    dot.classList.remove("is-hidden");
    ring.classList.remove("is-hidden");
  });

  /* ── Click feedback ── */
  window.addEventListener("mousedown", () => {
    ring.classList.add("is-clicking");
  });

  window.addEventListener("mouseup", () => {
    ring.classList.remove("is-clicking");
  });

  /* ── Hover detection ── */
  const interactiveSelectors = [
    "a",
    "button",
    "[role='button']",
    "label",
    "select",
    ".card",
    ".project-card",
    "[data-cursor='hover']",
  ].join(", ");

  const textSelectors = [
    "input[type='text']",
    "input[type='email']",
    "input[type='search']",
    "input[type='password']",
    "textarea",
    "[contenteditable]",
    "[data-cursor='text']",
  ].join(", ");

  function attachHover(selector, enterFn, leaveFn) {
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(selector)) enterFn();
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(selector)) leaveFn();
    });
  }

  attachHover(
    interactiveSelectors,
    () => {
      dot.classList.add("is-hovering");
      ring.classList.add("is-hovering");
      ring.classList.remove("is-text");
    },
    () => {
      dot.classList.remove("is-hovering");
      ring.classList.remove("is-hovering");
    }
  );

  attachHover(
    textSelectors,
    () => {
      dot.classList.add("is-hovering");
      ring.classList.add("is-text");
      ring.classList.remove("is-hovering");
    },
    () => {
      dot.classList.remove("is-hovering");
      ring.classList.remove("is-text");
    }
  );

})();
