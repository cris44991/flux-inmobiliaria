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
  ['ownerForm','managerForm','loginForm','recoverForm','signupForm'].forEach(id => {
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

      // Login
      if (form.id === 'loginForm') {
        alert('Inicio de sesión simulado.');
        window.location.href = '/dashboard/dashboard.html';
        return;
      }

      // Recover
      if (form.id === 'recoverForm') {
        alert('Se enviaron las instrucciones al correo.');
        return;
      }

      // Helpers para almacenar usuarios simulados
      function saveUser(obj) {
        try {
          const raw = localStorage.getItem('flux_users');
          const users = raw ? JSON.parse(raw) : [];
          users.push(obj);
          localStorage.setItem('flux_users', JSON.stringify(users));
        } catch (e) { console.warn('storage error', e); }
      }

      // Owner registration: activa inmediatamente
      if (form.id === 'ownerForm') {
        const data = {
          role: 'owner',
          nombre: form.nombre?.value || '',
          email: form.email?.value || '',
          rut: form.rut?.value || '',
          telefono: form.telefono?.value || '',
          direccion: form.direccion?.value || '',
          propiedades: form.npropiedad?.value || '0',
          status: 'active',
          createdAt: Date.now()
        };
        saveUser(data);
        if (feedbackEl) feedbackEl.textContent = 'Registro exitoso. Ya puedes iniciar sesión.';
        form.reset();
        return;
      }

      // Signup (usuario normal)
      if (form.id === 'signupForm') {
        const data = {
          role: 'user',
          nombre: form.nombre?.value || '',
          email: form.email?.value || '',
          telefono: form.telefono?.value || '',
          status: 'active',
          createdAt: Date.now()
        };
        saveUser(data);
        if (feedbackEl) feedbackEl.textContent = 'Registro completado. Ya puedes iniciar sesión.';
        form.reset();
        return;
      }

      // Manager registration: queda en estado pendiente
      if (form.id === 'managerForm') {
        const fileInput = form.querySelector('#antecedentes');
        const fileName = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0].name : '';
        const data = {
          role: 'manager',
          nombre: form.nombre_g?.value || '',
          email: form.email_g?.value || '',
          rut: form.rut_g?.value || '',
          telefono: form.telefono_g?.value || '',
          antecedentesFile: fileName,
          status: 'pending',
          createdAt: Date.now()
        };
        saveUser(data);
        if (feedbackEl) feedbackEl.textContent = 'Registro recibido. Tu cuenta quedará pendiente de verificación.';
        form.reset();
        return;
      }
    });
  });
});
