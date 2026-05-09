// dashboard-properties.js — CRUD simulado de propiedades
(function(){
  const sample = [
    {id:1,title:'Departamento céntrico',tipo:'Departamento',price:4500,bed:3,bath:2,area:85,location:'Providencia, Santiago',features:['Estacionamiento'],images:[],desc:'Departamento luminoso cerca del metro.'},
    {id:2,title:'Casa familiar',tipo:'Casa',price:7800,bed:4,bath:3,area:200,location:'La Reina, Santiago',features:['Patio','Bodega'],images:[],desc:'Casa con jardín amplio.'}
  ];

  let properties = JSON.parse(localStorage.getItem('properties')) || sample.slice();
  let editingId = null;

  const listEl = document.getElementById('dashboardProperties');
  const newBtn = document.getElementById('newPropertyBtn');
  const modal = document.getElementById('propertyModal');
  const closeBtn = document.getElementById('closePropertyModal');
  const cancelBtn = document.getElementById('cancelProperty');
  const form = document.getElementById('propertyForm');

  function saveStore(){ localStorage.setItem('properties', JSON.stringify(properties)); }

  function render(){
    if(!listEl) return;
    listEl.innerHTML = '';
    properties.forEach(p=>{
      const card = document.createElement('article'); card.className='card';
      card.innerHTML = `<h3>${p.title}</h3><p class="muted">${p.tipo} • ${p.location}</p><p><strong>UF ${p.price}</strong> • ${p.bed}d • ${p.bath}b • ${p.area}m²</p>
        <div style="display:flex;gap:.4rem;margin-top:.6rem">
          <button class="btn btn-outline" data-id="${p.id}" data-action="edit">Editar</button>
          <button class="btn btn-danger" data-id="${p.id}" data-action="delete">Eliminar</button>
        </div>`;
      listEl.appendChild(card);
    });
  }

  function openModal(){ modal.setAttribute('aria-hidden','false'); modal.style.display='block'; document.getElementById('p_title').focus(); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modal.style.display='none'; form.reset(); editingId=null; document.getElementById('propertyModalTitle').textContent='Nueva propiedad'; }

  function onListClick(e){
    const btn = e.target.closest('button'); if(!btn) return;
    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;
    if(action==='edit'){ const p = properties.find(x=>x.id===id); if(!p) return; fillForm(p); openModal(); document.getElementById('propertyModalTitle').textContent='Editar propiedad'; editingId=id; }
    if(action==='delete'){ if(!confirm('Eliminar propiedad?')) return; properties = properties.filter(x=>x.id!==id); saveStore(); render(); }
  }

  function fillForm(p){ document.getElementById('p_title').value=p.title; document.getElementById('p_tipo').value=p.tipo; document.getElementById('p_price').value=p.price; document.getElementById('p_uf').value=p.uf||''; document.getElementById('p_bed').value=p.bed||''; document.getElementById('p_bath').value=p.bath||''; document.getElementById('p_area').value=p.area||''; document.getElementById('p_location').value=p.location||''; document.getElementById('p_desc').value=p.desc||''; // features
    const feats = new Set(p.features||[]);
    document.querySelectorAll('input[name="p_features"]').forEach(ch=>ch.checked = feats.has(ch.value));
  }

  form.addEventListener('submit', function(ev){ ev.preventDefault(); const fd = new FormData(form); const data = {
    title: fd.get('p_title'), tipo: fd.get('p_tipo'), price: Number(fd.get('p_price')||0), uf: fd.get('p_uf'), bed: Number(fd.get('p_bed')||0), bath: Number(fd.get('p_bath')||0), area: fd.get('p_area'), location: fd.get('p_location'), desc: fd.get('p_desc'), features: []
  };
    form.querySelectorAll('input[name="p_features"]:checked').forEach(c=>data.features.push(c.value));
    // images: simulate by names
    const files = form.querySelector('#p_images').files; if(files.length){ data.images = Array.from(files).map(f=>f.name); }
    if(editingId){ const idx = properties.findIndex(x=>x.id===editingId); if(idx>-1){ properties[idx] = Object.assign({id:editingId}, properties[idx], data); } }
    else { const nid = Date.now(); properties.push(Object.assign({id:nid}, data)); }
    saveStore(); render(); closeModal();
  });

  newBtn && newBtn.addEventListener('click', ()=>{ openModal(); });
  closeBtn && closeBtn.addEventListener('click', closeModal);
  cancelBtn && cancelBtn.addEventListener('click', closeModal);
  listEl && listEl.addEventListener('click', onListClick);

  // Inicializar
  document.addEventListener('DOMContentLoaded', render);
  render();
})();
