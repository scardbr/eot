document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.resources-hero-filters-item');
  
    // Restablecer todas las clases para mostrar contenido
    function resetAllContent() {
      const allItems = document.querySelectorAll('.resources-content-item-wrapper');
      allItems.forEach(item => {
        item.classList.remove('hidden'); // Mostrar todos los ítems
      });
      const allSections = document.querySelectorAll('.resources-content_section');
      allSections.forEach(section => {
        section.classList.remove('hidden'); // Mostrar todas las secciones
      });
    }
  
    // Función para verificar la visibilidad de la sección
    function checkSectionVisibility() {
      const sections = document.querySelectorAll('.resources-content_section');
      sections.forEach(section => {
        const contentItems = section.querySelectorAll('.resources-content-item-wrapper');
        const allHidden = Array.from(contentItems).every(item => item.classList.contains('hidden'));
        if (allHidden) {
          section.classList.add('hidden'); // Ocultar la sección si todos los ítems están ocultos
        } else {
          section.classList.remove('hidden'); // Mostrar la sección si al menos un ítem es visible
        }
      });
    }
  
    // Función para filtrar el contenido según el texto seleccionado
    function filterContent(selectedText) {
      const sections = document.querySelectorAll('.resources-content_section');
  
      sections.forEach(section => {
        const contentItems = section.querySelectorAll('.resources-content-item-wrapper');
  
        contentItems.forEach(item => {
          const categoryText = item.querySelector('.resources-content-item-category').innerText.trim();
          if (selectedText === 'All' || selectedText === categoryText) {
            item.classList.remove('hidden'); // Mostrar ítem que coincida
          } else {
            item.classList.add('hidden'); // Ocultar ítem que no coincida
          }
        });
  
        // Verificar si la sección debe ser visible o no
        checkSectionVisibility();
      });
    }
  
    // Asignar clase activa y manejar el filtrado
    function setActiveClass(clickedItem) {
      filterItems.forEach(item => {
        item.classList.remove('is-active');
      });
      clickedItem.classList.add('is-active');
    }
  
    // Añadir evento de clic a los filtros
    filterItems.forEach((filterItem, index) => {
      if (index === 0) {
        filterItem.classList.add('is-active');
      }
  
      filterItem.addEventListener('click', function() {
        const selectedText = filterItem.innerText.trim();
  
        // Restablecer todo antes de aplicar el nuevo filtro
        resetAllContent();
  
        // Aplicar el filtro
        setActiveClass(filterItem);
  
        // Si se selecciona "All", mostrar todo
        if (index === 0) {
          filterContent('All');
        } else {
          filterContent(selectedText);
        }
  
        window.scrollTo({
          top: 0,
        });
      });
    });
  });