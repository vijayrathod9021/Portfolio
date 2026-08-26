const popup = document.querySelector('.success-popup');

/* ── Typing effect ── */
const phrases = [
  "Learning & Building for the Web",
  "Exploring JavaScript & React",
  "Building Projects to Learn",
  "Improving One Project at a Time"
];
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
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  themeIcon.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";

  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
    themeIcon.textContent = "☼";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeIcon.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
});

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
