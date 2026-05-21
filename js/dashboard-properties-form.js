/**
 * Dashboard Properties Form - Gestión del formulario de propiedades
 * Maneja carga y vista previa de imágenes
 */

document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('propImages');
  const previewGrid = document.getElementById('imagePreviewGrid');
  const propertyForm = document.getElementById('propertyForm');

  if (!imageInput) return;

  // Almacenar imágenes seleccionadas
  let selectedImages = [];

  /**
   * Manejar cambio en el input de imágenes
   */
  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    // Validar límite de 10 imágenes
    if (files.length + selectedImages.length > 10) {
      alert('Máximo 10 imágenes permitidas. Ya tienes ' + selectedImages.length);
      e.target.value = '';
      return;
    }

    // Agregar nuevas imágenes
    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        selectedImages.push({
          name: file.name,
          data: event.target.result,
        });
        console.log('✅ Imagen cargada:', file.name, 'Total:', selectedImages.length);
        renderPreview();
      };

      reader.readAsDataURL(file);
    });
  });

  /**
   * Renderizar vista previa de imágenes
   */
  function renderPreview() {
    console.log('📸 Renderizando previsualizacion. Total imágenes:', selectedImages.length);
    previewGrid.innerHTML = '';

    selectedImages.forEach((image, index) => {
      const previewItem = document.createElement('div');
      previewItem.className = 'image-preview-item';
      previewItem.innerHTML = `
        <div class="preview-image-wrapper">
          <img src="${image.data}" alt="Preview ${index + 1}" loading="lazy" />
          <button type="button" class="remove-image-btn" title="Eliminar imagen" data-index="${index}">
            ✕
          </button>
        </div>
        <p class="preview-filename" title="${image.name}">${image.name}</p>
      `;

      previewGrid.appendChild(previewItem);
    });

    // Agregar eventos a botones de eliminar
    document.querySelectorAll('.remove-image-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        console.log('🗑️ Eliminando imagen:', selectedImages[index].name);
        selectedImages.splice(index, 1);
        renderPreview();
      });
    });

    // Mostrar/ocultar grid según haya imágenes
    previewGrid.style.display = selectedImages.length > 0 ? 'grid' : 'none';
    console.log('✅ Preview renderizado. Display:', previewGrid.style.display);
  }

  /**
   * Manejar envío del formulario
   */
  propertyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Recolectar datos del formulario
    const formData = new FormData(propertyForm);

    // Agregar imágenes seleccionadas
    selectedImages.forEach((image, index) => {
      // Convertir data URL a Blob para enviar al servidor
      const arr = image.data.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      formData.append('images', blob, image.name);
    });

    // Recolectar opciones seleccionadas
    const features = Array.from(
      propertyForm.querySelectorAll('input[name="feature"]:checked')
    ).map((checkbox) => checkbox.value);
    formData.append('features', JSON.stringify(features));

    // Aquí iría la lógica de envío al servidor
    console.log('Datos a enviar:', Object.fromEntries(formData));
    console.log('Imágenes:', selectedImages.length);
    console.log('Opciones:', features);

    // Por ahora, mostrar confirmación
    alert(
      `Propiedad guardada:\n- Imágenes: ${selectedImages.length}\n- Opciones: ${features.length}`
    );

    // Limpiar formulario
    propertyForm.reset();
    selectedImages = [];
    renderPreview();
  });
});
