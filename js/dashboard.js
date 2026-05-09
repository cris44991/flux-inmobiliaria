// dashboard.js - interacciones básicas del panel administrativo
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  toggle && toggle.addEventListener('click', () => { sidebar.classList.toggle('collapsed'); });

  // Datos de ejemplo para usuarios
  const sampleUsers = [
    {rut:'12.345.678-9', nombre:'María Pérez', email:'maria@ejemplo.cl', telefono:'+56 9 1111 1111'},
    {rut:'11.222.333-4', nombre:'Carlos Soto', email:'carlos@ejemplo.cl', telefono:'+56 9 2222 2222'},
  ];

  const usersBody = document.getElementById('usersTableBody');
  if (usersBody) {
    sampleUsers.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.rut}</td><td>${u.nombre}</td><td>${u.email}</td><td>${u.telefono}</td><td><button class="btn">Editar</button> <button class="btn">Eliminar</button></td>`;
      usersBody.appendChild(tr);
    });
  }

  // Propiedades de ejemplo
  const props = [
    {title:'Casa en Viña del Mar', price:'UF 2.500', img:'/img/propiedades/prop2.jpg'},
    {title:'Departamento en Providencia', price:'UF 3.000', img:'/img/propiedades/prop1.jpg'},
    {title:'Casa en Quilpué', price:'UF 1.800', img:'/img/propiedades/prop3.jpg'},
  ];

  const propsList = document.getElementById('dashboardProperties');
  if (propsList) {
    props.forEach(p => {
      const art = document.createElement('article'); art.className='card';
      art.innerHTML = `<img src="${p.img}" alt="${p.title}"><div class="card-body"><h3>${p.title}</h3><div class="price">${p.price}</div><div style="margin-top:.6rem"><a class="btn-card" href="/propiedades/detalle.html">Ver</a></div></div>`;
      propsList.appendChild(art);
    });
  }
});
