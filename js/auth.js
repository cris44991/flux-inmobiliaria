// auth.js - validaciones y manejo simple de formularios (cliente)
document.addEventListener('DOMContentLoaded', function () {
  const report = (el, msg) => {
    if (!el) return;
    const feed = el.querySelector('.form-hint') || document.getElementById(el.id + 'Feedback');
    if (feed) feed.textContent = msg;
  };

  function simpleValidate(form) {
    const inputs = Array.from(form.querySelectorAll('input,select,textarea'));
    let ok = true;
    inputs.forEach(i => {
      i.removeAttribute('aria-invalid');
      if (i.hasAttribute('required') && !i.value) {
        i.setAttribute('aria-invalid','true');
        ok = false;
      }
      if (i.type === 'email' && i.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(i.value)) { i.setAttribute('aria-invalid','true'); ok = false; }
      }
      if (i.type === 'password' && i.value && i.minLength>0) {
        if (i.value.length < i.minLength) { i.setAttribute('aria-invalid','true'); ok = false; }
      }
    });
    return ok;
  }

  // Handler genérico para formularios de registro/login/recuperar
  ['ownerForm','managerForm','loginForm','recoverForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const ok = simpleValidate(form);
      const feedbackEl = form.querySelector('.form-hint') || document.getElementById((form.id==='ownerForm')?'ownerFormFeedback':(form.id==='managerForm')?'managerFormFeedback':'');
      if (!ok) {
        if (feedbackEl) feedbackEl.textContent = 'Por favor completa los campos requeridos correctamente.';
        return;
      }
      if (feedbackEl) feedbackEl.textContent = '';
      // Simular envío y éxito
      if (form.id === 'loginForm') {
        alert('Inicio de sesión simulado.');
        window.location.href = '/dashboard/dashboard.html';
        return;
      }
      if (form.id === 'recoverForm') {
        alert('Se enviaron las instrucciones al correo.');
        return;
      }
      alert('Formulario enviado (simulado).');
      form.reset();
    });
  });
});
