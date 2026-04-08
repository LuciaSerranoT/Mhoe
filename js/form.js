export function setupContactForm() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos antes de enviar.');
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValido.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      alert('¡Gracias! Tu mensaje se ha enviado correctamente. Pronto nos pondremos en contacto contigo.');
      form.reset();
    });
  }
}
