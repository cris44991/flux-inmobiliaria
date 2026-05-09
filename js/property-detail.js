// property-detail.js — carga datos de propiedad (localStorage o dataset) y renderiza galería
(function(){
  const params = new URLSearchParams(window.location.search);
  const rawId = params.get('id');
  const propsRaw = localStorage.getItem('properties');
  let properties = [];
  try{ properties = propsRaw ? JSON.parse(propsRaw) : []; }catch(e){ properties = []; }

  const fallbackData = window.__PROPERTY_DATA || null; // reserved hook

  function findById(id){
    if(!id) return null;
    // numeric ids
    const num = Number(id);
    if(!isNaN(num) && num>0){
      return properties.find(p=>p.id===num) || null;
    }
    // string keys: match title slug or id-like
    return properties.find(p => String(p.id) === id || slugify(p.title||'')===id) || null;
  }

  function slugify(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

  function useFallback(key){ if(!fallbackData) return null; return fallbackData[key] || null; }

  function getProperty(){
    let p = findById(rawId);
    if(p) return mapProperty(p);
    // fallback: try using fallbackData with rawId as key
    if(rawId){ const fb = useFallback(rawId); if(fb) return fb; }
    // else use first fallback or default
    if(fallbackData){ const keys = Object.keys(fallbackData); if(keys.length) return fallbackData[keys[0]]; }
    return {title:'Propiedad no encontrada', location:'-', priceCLP:'-', priceUF:'-', priceM2:'-', bedrooms:0, bathrooms:0, builtArea:'-', landArea:'-', date:'-', images:[], description:[], features:[], agent:{name:'-',phone:'-',email:'-'}, mapQuery:''};
  }

  function mapProperty(p){
    return {
      id:p.id || p.slug || null,
      title:p.title || p.titulo || 'Propiedad',
      location:p.location || p.comuna || '-',
      priceCLP:p.priceCLP || (p.price? ('$ '+String(p.price*100000) ): '-'),
      priceUF:p.price || 0,
      priceM2:p.priceM2 || '-',
      bedrooms:p.bed || p.bedrooms || 0,
      bathrooms:p.bath || p.bathrooms || 0,
      builtArea:p.area || p.builtArea || '-',
      landArea:p.landArea || '-',
      date:p.date || '-',
      images: (p.images && p.images.length)? p.images.map(n=> (n.startsWith('img/')? n : ('../img/propiedades/'+n)) ) : (p.img?[p.img]:[]),
      description: Array.isArray(p.desc)? p.desc : (p.desc?[p.desc]: (p.description || [])),
      features: p.features || [],
      agent: p.agent || {name:'Agente Flux', phone:'+56 9 1234 5678', email:'contacto@fluxinmobiliaria.cl'},
      mapQuery: p.location || p.mapQuery || ''
    };
  }

  function render(){
    const prop = getProperty();
    // Map if property came from local store
    const mapped = prop.id && typeof prop.id === 'number' ? mapProperty(prop) : prop;

    document.getElementById('detailTitle').textContent = mapped.title;
    document.getElementById('detailLocation').textContent = mapped.location;
    document.getElementById('priceClp').textContent = mapped.priceCLP;
    document.getElementById('priceUf').textContent = mapped.priceUF? ('≈ '+mapped.priceUF+' UF') : '-';
    document.getElementById('priceM2').textContent = mapped.priceM2;
    document.getElementById('detailBedrooms').textContent = mapped.bedrooms;
    document.getElementById('detailBathrooms').textContent = mapped.bathrooms;
    document.getElementById('detailBuiltArea').textContent = mapped.builtArea;
    document.getElementById('detailLandArea').textContent = mapped.landArea;
    document.getElementById('detailDate').textContent = mapped.date;

    const descEls = [document.getElementById('detailDescription1'), document.getElementById('detailDescription2'), document.getElementById('detailDescription3')];
    descEls.forEach((el,i)=> el.textContent = mapped.description[i] || '');

    const featuresGrid = document.getElementById('featuresGrid');
    featuresGrid.innerHTML = '';
    (mapped.features||[]).forEach(f=>{ const d=document.createElement('div'); d.className='feature-item'; d.innerHTML = `<span class="feature-icon">•</span><span>${f}</span>`; featuresGrid.appendChild(d); });

    const agent = mapped.agent || {};
    document.getElementById('agentName').textContent = agent.name || '-';
    document.getElementById('agentPhone').textContent = agent.phone || '-';
    document.getElementById('agentEmail').textContent = agent.email || '-';

    const mainImage = document.getElementById('mainImage');
    const thumbGrid = document.getElementById('thumbnailGrid');
    thumbGrid.innerHTML = '';
    if(mapped.images && mapped.images.length){
      mainImage.src = mapped.images[0];
      mapped.images.forEach((src, idx)=>{
        const img = document.createElement('img'); img.src = src; img.alt = mapped.title + ' ' + (idx+1); img.className = 'thumbnail' + (idx===0?' active':''); img.addEventListener('click', ()=>{ changeImage(img); }); thumbGrid.appendChild(img);
      });
    } else { mainImage.src = '../img/propiedades/placeholder.jpg'; }

    // map
    const mapFrame = document.getElementById('mapFrame');
    if(mapped.mapQuery){ mapFrame.src = 'https://www.google.com/maps?q='+encodeURIComponent(mapped.mapQuery)+'&output=embed'; }

    // link
    const linkInput = document.getElementById('propertyLink'); if(linkInput) linkInput.value = window.location.href;

    // copy
    const copyBtn = document.getElementById('copyLinkBtn'); if(copyBtn) copyBtn.addEventListener('click', ()=>{ linkInput.select(); document.execCommand('copy'); alert('Enlace copiado'); });

    document.title = mapped.title + ' | Flux Inmobiliaria';
  }

  function changeImage(el){
    const main = document.getElementById('mainImage'); if(!main) return; main.src = el.src;
    document.querySelectorAll('.thumbnail').forEach(t=>t.classList.remove('active')); el.classList.add('active');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
