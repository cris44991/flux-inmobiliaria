// properties-list.js — Maneja listado de propiedades y botón de cargar más

(function() {
  const allProperties = [
    { id: 'las-condes-casa', tipo: 'casa', title: 'Casa en Las Condes', price: 285000000, priceUF: '7.200', location: 'Las Condes, Santiago', beds: 4, baths: 3, area: '228 m²', image: '../img/propiedades/casalascondes.jpg', badge: 'Destacada', description: 'Hermosa casa con jardín, piscina y estacionamiento en Las Condes. Perfecta para una familia grande.' },
    { id: 'depa-vina', tipo: 'departamento', title: 'Departamento Viña del Mar', price: 138000000, priceUF: '3.520', location: 'Viña del Mar, Valparaíso', beds: 3, baths: 2, area: '79 m²', image: '../img/propiedades/viña1.jpg', badge: 'Nueva', description: 'Departamento moderno con vista al mar en Viña del Mar. Ideal para inversión.' },
    { id: 'terreno-concepcion', tipo: 'terreno', title: 'Terreno 720 m²', price: 95000000, priceUF: '2.400', location: 'Concepción, Biobío', beds: 0, baths: 0, area: '720 m²', image: '../img/propiedades/terrenoconce.jpg', badge: null, description: 'Terreno amplio y plano, ideal para proyecto inmobiliario de gran escala.' },
    { id: 'casa-nunoa', tipo: 'casa', title: 'Casa 3D / 2B', price: 195000000, priceUF: '4.900', location: 'Ñuñoa, Santiago', beds: 3, baths: 2, area: '160 m²', image: '../img/propiedades/casañuñoa.jpg', badge: null, description: 'Casa cómoda en sector tranquilo de Ñuñoa, cerca de servicios.' },
    { id: 'depa-serena', tipo: 'departamento', title: 'Departamento 2D / 1B', price: 85000000, priceUF: '2.100', location: 'La Serena, Coquimbo', beds: 2, baths: 1, area: '65 m²', image: '../img/propiedades/departamento2d.jpg', badge: null, description: 'Departamento económico en La Serena, cerca del centro comercial.' },
    { id: 'casa-providencia', tipo: 'casa', title: 'Casa en Providencia', price: 420000000, priceUF: '10.800', location: 'Providencia, Santiago', beds: 4, baths: 3, area: '280 m²', image: '../img/propiedades/Casaprovidencia.jpg', badge: null, description: 'Residencia de lujo en zona exclusiva de Providencia, con acceso a parques.' },
    { id: 'depa-estacion', tipo: 'departamento', title: 'Departamento Centro', price: 120000000, priceUF: '3.050', location: 'Centro, Santiago', beds: 2, baths: 1, area: '72 m²', image: '../img/propiedades/depa.jpg', badge: null, description: 'Departamento céntrico, ideal para inversión o vivir cerca de todo.' },
    { id: 'terreno-macul', tipo: 'terreno', title: 'Terreno en Macul', price: 75000000, priceUF: '1.900', location: 'Macul, Santiago', beds: 0, baths: 0, area: '500 m²', image: '../img/propiedades/terrenoja.jpg', badge: null, description: 'Terreno en zona de desarrollo inmobiliario, con buen acceso.' }
  ];

  let currentIndex = 5;
  const propertiesGrid = document.querySelector('.properties-grid');
  const loadMoreBtn = document.querySelector('.btn-load-more');

  function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
  }

  function createPropertyCard(property) {
    const article = document.createElement('article');
    article.className = 'property-card';
    article.dataset.id = property.id;
    
    const badgeHTML = property.badge ? `<div class="property-badge">${property.badge}</div>` : '';
    const bedsHTML = property.beds > 0 ? `<span>${property.beds} 🛏️</span>` : '';
    const bathsHTML = property.baths > 0 ? `<span>${property.baths} 🚿</span>` : '';

    article.innerHTML = `
      <div class="property-image">
        <img src="${property.image}" alt="${property.title}" loading="lazy" />
        ${badgeHTML}
      </div>
      <div class="property-content">
        <h3>${property.title}</h3>
        <p class="property-price">${formatPrice(property.price)} <span class="price-uf">≈ ${property.priceUF} UF</span></p>
        <p class="property-location"><span class="location-icon">📍</span>${property.location}</p>
        <div class="property-features">${bedsHTML}${bathsHTML}<span>${property.area} 📐</span></div>
        <a href="detalle.html?id=${property.id}" class="btn-view-more">Quiero saber más</a>
      </div>
    `;
    
    return article;
  }

  function loadMoreProperties() {
    if (currentIndex >= allProperties.length) {
      loadMoreBtn.textContent = '✓ No hay más propiedades';
      loadMoreBtn.disabled = true;
      return;
    }

    const itemsToLoad = Math.min(3, allProperties.length - currentIndex);
    for (let i = 0; i < itemsToLoad; i++) {
      const property = allProperties[currentIndex];
      const card = createPropertyCard(property);
      propertiesGrid.appendChild(card);
      currentIndex++;
    }

    if (currentIndex >= allProperties.length) {
      loadMoreBtn.textContent = '✓ No hay más propiedades';
      loadMoreBtn.disabled = true;
    }
  }

  // Event listener para el botón
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreProperties);
  }

  // Guardar propiedades en window para acceso desde detalle
  window.propertiesData = allProperties;
})();

