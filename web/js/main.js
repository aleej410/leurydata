/* ============================================
   DigitalData — main.js
   Compartido por las 10 páginas del sitio.
   ============================================ */

/* ─────────────────────────────────────────────
   CONFIGURACIÓN — cambia estos valores
   ───────────────────────────────────────────── */
const CONFIG = {
  // Número de WhatsApp con código de país, solo dígitos. Ej: '5215512345678'
  WHATSAPP_NUMBER: '000000000000',

  // Correo de contacto que se muestra en el footer
  EMAIL: 'CORREO@digitaldata.com',

  // (Opcional) Webhook para guardar el lead antes de abrir WhatsApp.
  // Déjalo vacío si aún no lo tienes.
  LEAD_WEBHOOK_URL: ''
};
/* ───────────────────────────────────────────── */


/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ---------- Resaltar la página activa en el menú ---------- */
(() => {
  const archivoActual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === archivoActual) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    }
  });
})();


/* ---------- Año del footer y correo (presentes en todas las páginas) ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const footerMail = document.getElementById('footerMail');
if (footerMail) {
  footerMail.textContent = CONFIG.EMAIL;
  footerMail.href = 'mailto:' + CONFIG.EMAIL;
}


/* ---------- Botón flotante de WhatsApp (presente en todas las páginas) ---------- */
const waFloat = document.getElementById('waFloat');
if (waFloat) {
  waFloat.href = 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER +
    '?text=' + encodeURIComponent('Hola, vengo de la página de DigitalData y quiero saber más sobre el diagnóstico.');
}


/* ---------- Animación al hacer scroll ---------- */
const revealTargets = document.querySelectorAll(
  '.card.plain, .pillar, .sem-card, .step, .plan, .contact-form, .hero-panel, ' +
  '.service-card, .callout, .ladder-step, .page-nav-link'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}


/* ---------- Formulario de contacto ----------
   Solo existe en contacto.html; en el resto de páginas
   este bloque no encuentra el formulario y no hace nada. */
const form = document.getElementById('leadForm');

if (form) {
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      const empty = !field.value.trim();
      const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value);
      const bad = empty || badEmail;
      field.classList.toggle('invalid', bad);
      if (bad) valid = false;
    });

    if (!valid) {
      formNote.textContent = 'Revisa los campos marcados en rojo.';
      formNote.className = 'form-note error';
      return;
    }

    const lead = {
      nombre:   form.nombre.value.trim(),
      empresa:  form.empresa.value.trim(),
      email:    form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      datos:    form.datos.value,
      reto:     form.reto.value.trim(),
      origen:   'web-digitaldata',
      fecha:    new Date().toISOString()
    };

    formNote.textContent = 'Enviando…';
    formNote.className = 'form-note';

    if (CONFIG.LEAD_WEBHOOK_URL) {
      try {
        await fetch(CONFIG.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead)
        });
      } catch (err) {
        console.warn('No se pudo enviar el lead al webhook:', err);
      }
    }

    const mensaje =
      `Hola, soy ${lead.nombre} de ${lead.empresa}.\n` +
      `Quiero solicitar el diagnóstico gratis de DigitalData.\n\n` +
      `Correo: ${lead.email}\n` +
      `Mis datos están en: ${lead.datos}` +
      (lead.reto ? `\nMi mayor reto hoy: ${lead.reto}` : '');

    window.open(
      'https://wa.me/' + CONFIG.WHATSAPP_NUMBER + '?text=' + encodeURIComponent(mensaje),
      '_blank'
    );

    form.reset();
    formNote.textContent = '¡Listo! Te respondemos en menos de 24 horas hábiles.';
    formNote.className = 'form-note ok';
  });

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('invalid'));
  });
}
