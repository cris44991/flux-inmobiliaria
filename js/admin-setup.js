/**
 * admin-setup.js
 * Script para crear credenciales de admin en el navegador
 * Ejecutar en consola del navegador para crear acceso admin
 */

function setupAdminAccount() {
  // Crear cuenta admin con rol "admin"
  const adminUser = {
    email: 'admin@fluxinmobiliaria.cl',
    nombre: 'Administrador',
    role: 'admin',
    loggedAt: Date.now()
  };

  // Guardar en localStorage
  localStorage.setItem('flux_session', JSON.stringify(adminUser));

  console.log('✅ Cuenta Admin creada exitosamente');
  console.log('📧 Email: admin@fluxinmobiliaria.cl');
  console.log('🔑 Rol: Administrador');
  console.log('📍 Redirigiendo al dashboard...');

  // Redirigir al dashboard
  setTimeout(() => {
    window.location.href = '../dashboard/dashboard.html';
  }, 1500);
}

// También proporcionar una función para listar usuarios
function listAllUsers() {
  const session = localStorage.getItem('flux_session');
  const users = localStorage.getItem('flux_users');

  console.log('=== SESIÓN ACTUAL ===');
  if (session) {
    console.log(JSON.parse(session));
  } else {
    console.log('No hay sesión activa');
  }

  console.log('\n=== USUARIOS REGISTRADOS ===');
  if (users) {
    JSON.parse(users).forEach((user, idx) => {
      console.log(`${idx + 1}. ${user.nombre} (${user.email}) - Rol: ${user.role}`);
    });
  } else {
    console.log('No hay usuarios registrados');
  }
}

// Función para logout
function logout() {
  localStorage.removeItem('flux_session');
  console.log('✅ Sesión cerrada');
  window.location.href = '../login/login.html';
}

// Mostrar mensaje de ayuda
console.log(`
╔════════════════════════════════════════════════════════════╗
║     FLUX INMOBILIARIA - HERRAMIENTAS DE DESARROLLO        ║
╚════════════════════════════════════════════════════════════╝

📝 COMANDOS DISPONIBLES:

1️⃣  setupAdminAccount()
   → Crea cuenta admin y accede al dashboard

2️⃣  listAllUsers()
   → Muestra sesión actual y usuarios registrados

3️⃣  logout()
   → Cierra sesión actual

EJEMPLO:
  setupAdminAccount()
`);
