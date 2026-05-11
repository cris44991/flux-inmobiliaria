// dashboard-auth.js — Protege el acceso al dashboard

(function() {
  function checkAuthentication() {
    try {
      const session = localStorage.getItem('flux_session');
      if (!session) {
        // No hay sesión, redirigir a login
        window.location.href = '../login/login.html';
        return null;
      }
      
      const user = JSON.parse(session);
      return user;
    } catch (e) {
      // Error al leer sesión, redirigir a login
      window.location.href = '../login/login.html';
      return null;
    }
  }

  function displayUserInfo(user) {
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userNameEl) userNameEl.textContent = user.nombre || user.email;
    if (userRoleEl) {
      const roleText = {
        'owner': 'Propietario',
        'manager': 'Gestor Inmobiliario',
        'user': 'Usuario'
      };
      userRoleEl.textContent = roleText[user.role] || user.role;
    }
    
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('flux_session');
        window.location.href = '../login/login.html';
      });
    }
  }

  function init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const user = checkAuthentication();
        if (user) {
          displayUserInfo(user);
        }
      });
    } else {
      const user = checkAuthentication();
      if (user) {
        displayUserInfo(user);
      }
    }
  }

  init();
})();
