// Simple interactions: menu, lesson button and optional decorative background.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? (currentLanguage === 'es' ? 'Cerrar menú' : 'Close menu') : (currentLanguage === 'es' ? 'Abrir menú' : 'Open menu'));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const message = document.getElementById('message');
function sayHello() {
  message.textContent = currentLanguage === 'es' ? '¡Hola, futuro programador!' : 'Hello, future developer!';
}
document.getElementById('hello-button').addEventListener('click', sayHello);
document.getElementById('reset-button').addEventListener('click', () => {
  message.textContent = currentLanguage === 'es' ? 'Esperando tu clic...' : 'Waiting for your click...';
});

// Visual rain of code characters. This effect does not collect any information.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let drops = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = 780;
    drops = Array.from({ length: Math.ceil(canvas.width / 23) }, () => Math.random() * -25);
  }
  resize();
  window.addEventListener('resize', resize);
  let lastFrame = 0;
  function draw(time) {
    if (time - lastFrame > 65) {
      lastFrame = time;
      ctx.fillStyle = 'rgba(6, 11, 12, 0.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#93fb66';
      ctx.font = '13px monospace';
      drops.forEach((y, i) => {
        const char = '01{}<>/[]'[Math.floor(Math.random() * 8)];
        ctx.fillText(char, i * 23, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.48;
      });
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// Language switch: preserves the original design and works offline.
let currentLanguage = 'en';
const languageButtons = document.querySelectorAll('.lang-btn');
function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const entry = translations[el.dataset.i18n];
    if (entry) el.innerHTML = entry[lang];
  });
  languageButtons.forEach(btn => {
    const selected = btn.dataset.lang === lang;
    btn.classList.toggle('active', selected);
    btn.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('.menu-toggle').setAttribute('aria-label', lang === 'es' ? 'Abrir menú' : 'Open menu');
  message.textContent = lang === 'es' ? 'Esperando tu clic...' : 'Waiting for your click...';
  document.querySelector('meta[name="description"]').content = lang === 'es' ? 'Aprende programación desde cero con ejemplos claros y pequeños proyectos.' : 'Learn programming from zero with clear examples and small projects.';
  document.title = lang === 'es' ? 'CodeLab // Aprende a programar' : 'CodeLab // Learn to Code';
  try { localStorage.setItem('codelab-language', lang); } catch (e) {}
}
languageButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('codelab-language') === 'es' ? 'es' : 'en'; } catch (e) {}
setLanguage(savedLanguage);

// =====================================
// REPRODUCTOR DE AUDIO - PRESENTACIÓN
// =====================================

// Obtenemos los elementos del HTML
const audio = document.getElementById("intro-audio");
const botonAudio = document.getElementById("audio-play");
const estadoAudio = document.getElementById("audio-status");

// Cuando pulsamos el botón
botonAudio.addEventListener("click", () => {

    // Si el audio está pausado, lo reproducimos
    if (audio.paused) {

        audio.play().then(() => {
            botonAudio.textContent = "⏸ PAUSE AUDIO";
            botonAudio.classList.add("playing");
            estadoAudio.textContent = "▶ Playing...";
        }).catch(() => {
            estadoAudio.textContent = "✖ Audio could not be played";
        });

    } else {

        // Si está sonando, lo pausamos
        audio.pause();

        botonAudio.textContent = "▶ PLAY AUDIO";
        botonAudio.classList.remove("playing");
        estadoAudio.textContent = "⏸ Paused";
    }

});

// Cuando termina la grabación
audio.addEventListener("ended", () => {

    botonAudio.textContent = "▶ PLAY AUDIO";
    botonAudio.classList.remove("playing");
    estadoAudio.textContent = "✓ Audio finished";

});
