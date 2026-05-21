// dashboard.js — Gestión del dashboard administrativo

(function() {
  // ===== USUARIOS =====
  function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    try {
      const raw = localStorage.getItem('flux_users');
      const users = raw ? JSON.parse(raw) : [];

      tbody.innerHTML = '';

      if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 1rem; text-align: center; color: #999;">No hay usuarios registrados</td></tr>';
        return;
      }

      users.forEach((user, idx) => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid rgba(15, 23, 42, 0.06)';
        row.innerHTML = `
          <td style="padding: 0.8rem; font-size: 0.9rem;">${user.rut || '—'}</td>
          <td style="padding: 0.8rem; font-weight: 500;">${user.nombre || user.email}</td>
          <td style="padding: 0.8rem; font-size: 0.9rem;">${user.email}</td>
          <td style="padding: 0.8rem; font-size: 0.9rem;">${user.telefono || '—'}</td>
          <td style="padding: 0.8rem;">
            <button class="btn-edit" data-idx="${idx}" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; margin-right: 0.4rem; cursor: pointer; border: 1px solid #0066cc; background: white; color: #0066cc; border-radius: 4px;">Editar</button>
            <button class="btn-delete" data-idx="${idx}" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; cursor: pointer; border: 1px solid #dc3545; background: white; color: #dc3545; border-radius: 4px;">Eliminar</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Event listeners para botones
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = this.dataset.idx;
          if (confirm('¿Eliminar este usuario?')) {
            users.splice(idx, 1);
            localStorage.setItem('flux_users', JSON.stringify(users));
            loadUsers();
          }
        });
      });

      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = this.dataset.idx;
          const user = users[idx];
          document.getElementById('u_rut').value = user.rut || '';
          document.getElementById('u_name').value = user.nombre || '';
          document.getElementById('u_email').value = user.email || '';
          document.getElementById('u_phone').value = user.telefono || '';
          document.getElementById('userModal').setAttribute('data-edit-idx', idx);
          document.getElementById('userModal').classList.add('modal-show');
        });
      });
    } catch (e) {
      console.error('Error loading users:', e);
    }
  }

  function setupUserModal() {
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    const newUserBtn = document.getElementById('newUserBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelUser = document.getElementById('cancelUser');

    if (!modal) return;

    // Abrir modal
    newUserBtn?.addEventListener('click', () => {
      form.reset();
      modal.removeAttribute('data-edit-idx');
      modal.classList.add('modal-show');
    });

    // Cerrar modal
    closeModal?.addEventListener('click', () => {
      modal.classList.remove('modal-show');
    });

    cancelUser?.addEventListener('click', () => {
      modal.classList.remove('modal-show');
    });

    // Guardar usuario
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const editIdx = modal.getAttribute('data-edit-idx');
      const userData = {
        rut: document.getElementById('u_rut').value,
        nombre: document.getElementById('u_name').value,
        email: document.getElementById('u_email').value,
        telefono: document.getElementById('u_phone').value,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString()
      };

      try {
        const raw = localStorage.getItem('flux_users');
        let users = raw ? JSON.parse(raw) : [];

        if (editIdx !== null) {
          // Editar
          users[editIdx] = { ...users[editIdx], ...userData };
        } else {
          // Crear
          users.push(userData);
        }

        localStorage.setItem('flux_users', JSON.stringify(users));
        modal.classList.remove('modal-show');
        loadUsers();
        alert('Usuario guardado');
      } catch (e) {
        alert('Error: ' + e.message);
      }
    });

    // Cerrar al hacer click fuera
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal-show');
      }
    });
  }

  function setupSearch() {
    const searchInput = document.getElementById('userSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#usersTableBody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar?.classList.toggle('collapsed');
      });
    }
  }

  // ===== PROPIEDADES =====
  function loadProperties() {
    const container = document.getElementById('dashboardProperties');
    if (!container) return;

    // Demo properties (usando imágenes reales)
    const properties = [
      { id: 1, title: 'Casa en Las Condes', price: 'UF 7.200', image: '../img/propiedades/casalascondes.jpg' },
      { id: 2, title: 'Departamento en Viña del Mar', price: 'UF 4.100', image: '../img/propiedades/departamentoviñadelmar.jpg' },
      { id: 3, title: 'Terreno en Concepción', price: 'UF 2.400', image: '../img/propiedades/terreno.jpg' }
    ];

    container.innerHTML = properties.map(prop => `
      <article style="border: 1px solid rgba(15,23,42,0.1); border-radius: 8px; overflow: hidden; background: white;">
        <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 150px; object-fit: cover;">
        <div style="padding: 1rem;">
          <h4 style="margin: 0 0 0.5rem; font-size: 1rem;">${prop.title}</h4>
          <p style="margin: 0 0 0.5rem; color: #666; font-size: 0.9rem;">${prop.price}</p>
          <a href="#" style="color: #0066cc; text-decoration: none; font-size: 0.9rem;">Ver detalles →</a>
        </div>
      </article>
    `).join('');
  }

  // ===== INICIALIZAR =====
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setupSidebar();
        loadUsers();
        setupUserModal();
        setupSearch();
        loadProperties();
      });
    } else {
      setupSidebar();
      loadUsers();
      setupUserModal();
      setupSearch();
      loadProperties();
    }
  }

  init();
})();
