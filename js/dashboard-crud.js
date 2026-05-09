// dashboard-crud.js - CRUD frontend para Usuarios (simulado)
document.addEventListener('DOMContentLoaded', function () {
  let users = [
    {rut:'12.345.678-9', nombre:'María Pérez', email:'maria@ejemplo.cl', telefono:'+56 9 1111 1111'},
    {rut:'11.222.333-4', nombre:'Carlos Soto', email:'carlos@ejemplo.cl', telefono:'+56 9 2222 2222'},
  ];

  const tbody = document.getElementById('usersTableBody');
  const search = document.getElementById('userSearch');
  const newBtn = document.getElementById('newUserBtn');
  const modal = document.getElementById('userModal');
  const closeModal = document.getElementById('closeModal');
  const cancelUser = document.getElementById('cancelUser');
  const userForm = document.getElementById('userForm');
  let editIndex = -1;

  function render(list) {
    if (!tbody) return;
    tbody.innerHTML = '';
    list.forEach((u, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.rut}</td><td>${u.nombre}</td><td>${u.email}</td><td>${u.telefono}</td><td><button class="btn" data-action="edit" data-i="${i}">Editar</button> <button class="btn" data-action="del" data-i="${i}">Eliminar</button></td>`;
      tbody.appendChild(tr);
    });
  }

  function openModal() { if (!modal) return; modal.setAttribute('aria-hidden','false'); document.getElementById('u_rut').focus(); }
  function closeModalFn() { if (!modal) return; modal.setAttribute('aria-hidden','true'); userForm.reset(); editIndex = -1; }

  // events
  search && search.addEventListener('input', function (e) {
    const q = e.target.value.toLowerCase().trim();
    render(users.filter(u => u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.rut.toLowerCase().includes(q)));
  });

  newBtn && newBtn.addEventListener('click', function () { editIndex = -1; document.getElementById('userModalTitle').textContent='Nuevo usuario'; openModal(); });
  closeModal && closeModal.addEventListener('click', closeModalFn);
  cancelUser && cancelUser.addEventListener('click', closeModalFn);

  tbody && tbody.addEventListener('click', function (e) {
    const btn = e.target.closest('button'); if (!btn) return; const action = btn.dataset.action, i = Number(btn.dataset.i);
    if (action === 'edit') { editIndex = i; const u = users[i]; document.getElementById('userModalTitle').textContent='Editar usuario'; document.getElementById('u_rut').value = u.rut; document.getElementById('u_name').value = u.nombre; document.getElementById('u_email').value = u.email; document.getElementById('u_phone').value = u.telefono; openModal(); }
    if (action === 'del') { if (confirm('¿Eliminar usuario?')) { users.splice(i,1); render(users); } }
  });

  userForm && userForm.addEventListener('submit', function (e) {
    e.preventDefault(); const u = { rut: document.getElementById('u_rut').value.trim(), nombre: document.getElementById('u_name').value.trim(), email: document.getElementById('u_email').value.trim(), telefono: document.getElementById('u_phone').value.trim() };
    if (!u.rut || !u.nombre || !u.email) { alert('Completa los campos obligatorios.'); return; }
    if (editIndex >= 0) { users[editIndex] = u; } else { users.push(u); }
    render(users); closeModalFn();
  });

  // inicial
  render(users);
});
