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

  // Aseguramos clases iniciales (por  las tocaste)
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

// FORMULARIO - Validación dinámica según canal elegido
const radios = document.querySelectorAll("input[name='preferencia']");
const email = document.getElementById("email");
const whatsapp = document.getElementById("whatsapp");
const labels = {
  email: document.getElementById("label-email"),
  whatsapp: document.getElementById("label-whatsapp")
};

// Función para actualizar el campo obligatorio y el estilo del botón
function actualizarFormulario() {
  const seleccionado = document.querySelector("input[name='preferencia']:checked").value;

  // Validación: solo el canal elegido es obligatorio
  if (seleccionado === "email") {
    email.required = true;
    whatsapp.required = false;
  } else {
    email.required = false;
    whatsapp.required = true;
  }

  // Actualizar apariencia de los botones
  Object.values(labels).forEach(label => {
    label.classList.remove("border-teal", "text-white");
    label.classList.add("bg-grayDark/50", "border-gray-700", "text-white");
  });
  labels[seleccionado].classList.add("border-teal", "text-white");
  labels[seleccionado].classList.remove("bg-grayDark/50", "border-gray-700");
}

// Ejecutar al cargar y al cambiar selección
actualizarFormulario();
radios.forEach(radio => {
  radio.addEventListener("change", actualizarFormulario);
});

// Envío del formulario usando Resend
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recargar la página

  // Verificar que al menos el campo requerido según canal esté completo
  if (!email.checkValidity() && !whatsapp.checkValidity()) {
    alert("Por favor completá el campo según el canal elegido.");
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("✅ ¡Mensaje enviado con éxito!");
      form.reset();
      actualizarFormulario(); // restaura el estado visual
    } else {
      const errorData = await res.json();
      console.error("Error al enviar:", errorData);
      alert("❌ Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
    }
  } catch (error) {
    console.error("Error inesperado:", error);
    alert("⚠️ No se pudo enviar el mensaje. Verifica tu conexión o intenta más tarde.");
  }
});
