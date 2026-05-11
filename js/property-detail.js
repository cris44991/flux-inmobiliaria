// property-detail.js — Carga y muestra los detalles de una propiedad

(function() {
  // Datos de propiedades (mismo que en properties-list.js)
  const allProperties = [
    { id: 'las-condes-casa', tipo: 'casa', title: 'Casa en Las Condes', price: 285000000, priceUF: '7.200', location: 'Las Condes, Santiago', beds: 4, baths: 3, area: '228 m²', builtArea: '180 m²', image: '../img/propiedades/casalascondes.jpg', badge: 'Destacada', description: 'Hermosa casa con jardín, piscina y estacionamiento en Las Condes. Perfecta para una familia grande.' },
    { id: 'depa-vina', tipo: 'departamento', title: 'Departamento Viña del Mar', price: 138000000, priceUF: '3.520', location: 'Viña del Mar, Valparaíso', beds: 3, baths: 2, area: '79 m²', builtArea: '72 m²', image: '../img/propiedades/viña1.jpg', badge: 'Nueva', description: 'Departamento moderno con vista al mar en Viña del Mar. Ideal para inversión.' },
    { id: 'terreno-concepcion', tipo: 'terreno', title: 'Terreno 720 m²', price: 95000000, priceUF: '2.400', location: 'Concepción, Biobío', beds: 0, baths: 0, area: '720 m²', builtArea: '0 m²', image: '../img/propiedades/terrenoconce.jpg', badge: null, description: 'Terreno amplio y plano, ideal para proyecto inmobiliario de gran escala.' },
    { id: 'casa-nunoa', tipo: 'casa', title: 'Casa 3D / 2B', price: 195000000, priceUF: '4.900', location: 'Ñuñoa, Santiago', beds: 3, baths: 2, area: '160 m²', builtArea: '140 m²', image: '../img/propiedades/casañuñoa.jpg', badge: null, description: 'Casa cómoda en sector tranquilo de Ñuñoa, cerca de servicios.' },
    { id: 'depa-serena', tipo: 'departamento', title: 'Departamento 2D / 1B', price: 85000000, priceUF: '2.100', location: 'La Serena, Coquimbo', beds: 2, baths: 1, area: '65 m²', builtArea: '60 m²', image: '../img/propiedades/departamento2d.jpg', badge: null, description: 'Departamento económico en La Serena, cerca del centro comercial.' },
    { id: 'casa-providencia', tipo: 'casa', title: 'Casa en Providencia', price: 420000000, priceUF: '10.800', location: 'Providencia, Santiago', beds: 4, baths: 3, area: '280 m²', builtArea: '250 m²', image: '../img/propiedades/Casaprovidencia.jpg', badge: null, description: 'Residencia de lujo en zona exclusiva de Providencia, con acceso a parques.' },
    { id: 'depa-estacion', tipo: 'departamento', title: 'Departamento Centro', price: 120000000, priceUF: '3.050', location: 'Centro, Santiago', beds: 2, baths: 1, area: '72 m²', builtArea: '68 m²', image: '../img/propiedades/depa.jpg', badge: null, description: 'Departamento céntrico, ideal para inversión o vivir cerca de todo.' },
    { id: 'terreno-macul', tipo: 'terreno', title: 'Terreno en Macul', price: 75000000, priceUF: '1.900', location: 'Macul, Santiago', beds: 0, baths: 0, area: '500 m²', builtArea: '0 m²', image: '../img/propiedades/terrenoja.jpg', badge: null, description: 'Terreno en zona de desarrollo inmobiliario, con buen acceso.' }
  ];

  function getPropertyIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function findPropertyById(id) {
    return allProperties.find(p => p.id === id);
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
  }

  function loadPropertyDetail() {
    const propertyId = getPropertyIdFromUrl();
    
    if (!propertyId) {
      document.body.innerHTML = '<div style="text-align: center; padding: 3rem;"><h1>Propiedad no encontrada</h1><p><a href="/propiedades/listado.html">Volver al listado</a></p></div>';
      return;
    }

    const property = findPropertyById(propertyId);

    if (!property) {
      document.body.innerHTML = '<div style="text-align: center; padding: 3rem;"><h1>Propiedad no encontrada</h1><p><a href="/propiedades/listado.html">Volver al listado</a></p></div>';
      return;
    }

    // Actualizar título y ubicación
    const titleEl = document.getElementById('detailTitle');
    const locationEl = document.getElementById('detailLocation');
    if (titleEl) titleEl.textContent = property.title;
    if (locationEl) locationEl.textContent = property.location;

    // Actualizar imagen principal
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.src = property.image;
      mainImage.alt = property.title;
    }

    // Actualizar precios
    const priceClpEl = document.getElementById('priceClp');
    const priceUfEl = document.getElementById('priceUf');
    if (priceClpEl) priceClpEl.textContent = formatPrice(property.price);
    if (priceUfEl) priceUfEl.textContent = `≈ ${property.priceUF} UF`;
    
    const pricePerM2 = Math.round(property.price / parseInt(property.area));
    const priceM2El = document.getElementById('priceM2');
    if (priceM2El) priceM2El.textContent = formatPrice(pricePerM2) + '/m²';

    // Actualizar detalles
    const bedsEl = document.getElementById('detailBedrooms');
    const bathsEl = document.getElementById('detailBathrooms');
    const builtAreaEl = document.getElementById('detailBuiltArea');
    const landAreaEl = document.getElementById('detailLandArea');
    
    if (bedsEl) bedsEl.textContent = property.beds || '—';
    if (bathsEl) bathsEl.textContent = property.baths || '—';
    if (builtAreaEl) builtAreaEl.textContent = property.builtArea || property.area;
    if (landAreaEl) landAreaEl.textContent = property.area;

    // Actualizar descripción
    const descSection = document.querySelector('[data-section="description"]');
    if (!descSection) {
      const descHtml = `
        <section class="property-description" data-section="description">
          <h3>Descripción</h3>
          <p>${property.description}</p>
        </section>
      `;
      const contentEl = document.querySelector('.property-content');
      if (contentEl) contentEl.insertAdjacentHTML('afterbegin', descHtml);
    }

    // Actualizar título de la página
    document.title = `${property.title} | Flux Inmobiliaria`;

    // Actualizar enlace de compartir
    const linkEl = document.getElementById('propertyLink');
    if (linkEl) linkEl.value = window.location.href;

    // Cargar ubicación en el mapa (si existe)
    const mapFrame = document.getElementById('mapFrame');
    if (mapFrame) {
      const encodedLocation = encodeURIComponent(property.location);
      mapFrame.src = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPropertyDetail);
  } else {
    loadPropertyDetail();
  }
})();
