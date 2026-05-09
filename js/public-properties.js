// public-properties.js — renderiza propiedades públicas desde localStorage
(function(){
  const container = document.getElementById('propertiesList');
  const yearEl = document.getElementById('year');

  const defaultProperties = [
    {id:1,title:'Departamento céntrico',tipo:'Departamento',priceCLP:'165.000.000',priceUF:4500,bed:3,bath:2,area:85,location:'Las Condes, Santiago',img:'img/propiedades/casalascondes.jpg',desc:'Departamento moderno, luminoso y cercano a servicios.'},
    {id:2,title:'Casa con jardín',tipo:'Casa',priceCLP:'285.000.000',priceUF:7800,bed:4,bath:3,area:200,location:'Viña del Mar, Valparaíso',img:'img/propiedades/departamentoviñadelmar.jpg',desc:'Amplia casa familiar con patio.'}
  ];

  function loadProperties(){
    try{
      const raw = localStorage.getItem('properties');
      if(!raw) return defaultProperties;
      const parsed = JSON.parse(raw);
      // Map simulated structure to public view
      return parsed.map(p=>({
        id:p.id,title:p.title || p.titulo || 'Propiedad', tipo:p.tipo || 'Propiedad', priceCLP:p.priceCLP || (p.price? (p.price*1000).toString() : ''), priceUF:p.price || 0, bed:p.bed||0, bath:p.bath||0, area:p.area||'', location:p.location||'', img:(p.images && p.images[0])? ('img/propiedades/'+p.images[0]) : (p.image || p.img || ''), desc:p.desc||''
      }));
    }catch(e){ return defaultProperties; }
  }

  function render(){
    if(yearEl) yearEl.textContent = new Date().getFullYear();
    if(!container) return;
    const props = loadProperties();
    container.innerHTML = '';
    props.slice(0,8).forEach(p=>{
      const art = document.createElement('article'); art.className='card';
      const imgSrc = p.img || 'img/propiedades/placeholder.jpg';
      art.innerHTML = `\n        <img src="${imgSrc}" alt="${p.title}" loading="lazy" />\n        <div class="card-body">\n          <h3>${p.title}</h3>\n          <p class="muted">${p.tipo} • ${p.location}</p>\n          <p class="price">UF ${p.priceUF} • ${p.bed}d • ${p.bath}b • ${p.area}m²</p>\n          <p class="card-desc">${p.desc}</p>\n          <a class="btn btn-card" href="propiedades/detalle.html?id=${p.id}">Ver detalle</a>\n        </div>\n      `;
      container.appendChild(art);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
