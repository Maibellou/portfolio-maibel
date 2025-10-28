// scriptServicios.js (reemplazar por completo)

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const spans = menuButton.querySelectorAll('span');

  // fallback safety
  if (!menuButton || !mobileMenu || spans.length < 2) {
    console.warn('menuButton / mobileMenu / spans missing');
    return;
  }

  // Aseguramos clases iniciales (por si las tocaste)
  mobileMenu.classList.add('opacity-0', 'pointer-events-none');

  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    spans[0].classList.add('rotate-45', 'translate-y-[5px]');
    spans[1].classList.add('-rotate-45', '-translate-y-[5px]');
    mobileMenu.classList.remove('opacity-0', 'pointer-events-center');
    mobileMenu.classList.add('opacity-100');
  }

  function closeMenu() {
    menuOpen = false;
    spans[0].classList.remove('rotate-45', 'translate-y-[5px]');
    spans[1].classList.remove('-rotate-45', '-translate-y-[5px]');
    mobileMenu.classList.add('opacity-0', 'pointer-events-center');
    mobileMenu.classList.remove('opacity-100');
  }

  menuButton.addEventListener('click', () => {
    if (menuOpen) closeMenu();
    else openMenu();
  });

  // Cerrar menú al hacer click en cualquier link del menú
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar menú con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Evitar que clicks dentro del menú cierren por bubbling (si más adelante agregás overlay)
  mobileMenu.addEventListener('click', (e) => {
    // si clickeás el overlay (el propio mobileMenu) cerrá; si clickeás un link o su hijo, no.
    if (e.target === mobileMenu) closeMenu();
  });
});

// HERO MENU: lo dejamos afuera del DOMContentLoaded para que arranque igual,
// pero por seguridad, comprobamos que el elemento exista.
const heroMenu = document.getElementById('hero-menu');
if (heroMenu) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      heroMenu.classList.add('fixed', 'top-4', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50', 'mt-0');
    } else {
      heroMenu.classList.remove('fixed', 'top-4', 'z-50', 'mt-0');
    }
  });
}

//Swiper
const swiperPlanes = new Swiper('.swiper', {
  loop: false,
  spaceBetween: 16,
  centeredSlides: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// FORMULARIO 
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert('Mensaje enviado con éxito 🎉');
      form.reset();
    } else {
      alert('Hubo un error al enviar el mensaje 😕');
    }
  } catch (err) {
    console.error('Error en la solicitud:', err);
    alert('Error al conectar con el servidor.');
  }
});
