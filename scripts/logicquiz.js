// Manejador para el botón de inicio en el step 0
document.getElementById('start-quiz').addEventListener('click', function(event) {
  event.preventDefault();  // Evitar el comportamiento por defecto del link
  transitionToNextStep(0, 1);  // Mover del step 0 al step 1
  showProgressBar(); // Mostrar la barra de progreso
  updateProgressBar(1); // Actualizar la barra de progreso al 1er paso
});

// Función para mostrar la barra de progreso con transición de opacidad
function showProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.opacity = 1;  // Mostrar la barra de progreso
  progressBar.style.transition = 'opacity 0.5s ease';  // Transición suave para la opacidad
}

// Función para actualizar la barra de progreso
function updateProgressBar(step) {
  const progressBarIndicator = document.querySelector('.progress-bar-indicator');
  const totalSteps = 6;  // Número total de pasos
  const progressPercentage = (step / totalSteps) * 100;  // Calcular porcentaje basado en el paso actual
  progressBarIndicator.style.width = `${progressPercentage}%`;
  progressBarIndicator.style.transition = 'width 0.5s ease';  // Transición suave para el ancho
}

// Función general para los radio buttons dentro de los elementos con clase btn-wrapper y quiz-form-list-wrapper
document.querySelectorAll('.btn-wrapper, .quiz-form-list-wrapper').forEach((wrapper) => {
  wrapper.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    const currentStep = parseInt(event.target.closest('.quiz-form-step').getAttribute('data-step'));
    
    // Step 1: Si se marca "Yes", se hace submit con data-filter "refused"
    if (currentStep === 1 && selectedValue === 'Yes') {
      showFilter('refused');
      showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
    }
    // Step 2: Si se marca "No", se hace submit con data-filter "refused"
    else if (currentStep === 2 && selectedValue === 'No') {
      showFilter('refused');
      showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
    }
    // Step 3: Si se marca "No", se hace submit con data-filter "refused"
    else if (currentStep === 3 && selectedValue === 'No') {
      showFilter('refused');
      showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
    }
    // Step 4: Manejar los tres valores del step 4
    else if (currentStep === 4) {
      if (selectedValue === 'Individual(s)') {
        transitionToNextStep(currentStep, currentStep + 1);  // Avanzar al siguiente step
        updateProgressBar(currentStep + 1);  // Actualizar barra de progreso
      } else if (selectedValue === 'Holding Company or Personal Trust') {
        showFilter('regular');  // Mostrar el filtro regular
        showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
      } else if (selectedValue === 'Another Company') {
        showFilter('refused');  // Mostrar el filtro refused
        showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
      }
    }
    // Step 5: Si se marca "Yes", avanzar al siguiente paso, si se marca "No", submit con filtro "refused"
    else if (currentStep === 5) {
      if (selectedValue === 'Yes') {
        transitionToNextStep(currentStep, currentStep + 1);  // Avanzar al siguiente step
        updateProgressBar(currentStep + 1);  // Actualizar barra de progreso
      } else if (selectedValue === 'No') {
        showFilter('refused');  // Mostrar el filtro "refused"
        showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
      }
    }
    // Última pregunta: "Yes" muestra el filtro "good", "No" muestra el filtro "refused"
    else if (currentStep === 6) {
      if (selectedValue === 'Yes') {
        showFilter('good');  // Mostrar el filtro "good"
        showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
      } else if (selectedValue === 'No') {
        showFilter('refused');  // Mostrar el filtro "refused"
        showSuccessMessage(); // Mostrar la pantalla de éxito sin enviar el formulario
      }
    }
    // En otros casos, avanzar al siguiente step
    else if (selectedValue === 'Yes' || selectedValue === 'No') {
      transitionToNextStep(currentStep, currentStep + 1);
      updateProgressBar(currentStep + 1);  // Actualizar barra de progreso
    }
  });
});

// Función para manejar la transición de un step a otro
function transitionToNextStep(currentStepNumber, nextStepNumber) {
  const currentStep = document.querySelector(`.quiz-form-step[data-step="${currentStepNumber}"]`);
  const nextStep = document.querySelector(`.quiz-form-step[data-step="${nextStepNumber}"]`);
  
  // Desvanecer el paso actual
  currentStep.style.opacity = 0;

  setTimeout(function() {
    currentStep.style.display = 'none';  // Ocultar el step actual después de la transición
    nextStep.style.display = 'flex';     // Mostrar el siguiente paso
    nextStep.style.opacity = 0;          // Iniciar el siguiente step con opacidad 0

    setTimeout(function() {
      nextStep.style.opacity = 1;  // Desvanecer el siguiente step
    }, 50);  // Pequeño delay para que el display:flex ocurra antes del cambio de opacidad
  }, 500);  // Duración de la transición del step actual
}

// Función para mostrar el mensaje correcto según el filtro
function showFilter(filterType) {
  // Ocultar todos los mensajes de éxito
  document.querySelectorAll('.quiz-form-success-option').forEach((element) => {
    element.style.display = 'none';
  });

  // Mostrar solo el filtro correspondiente y agregar la clase 'flex'
  const filterElement = document.querySelector(`.quiz-form-success-option[data-filter="${filterType}"]`);
  if (filterElement) {
    filterElement.style.display = 'flex';
    filterElement.style.justifyContent = 'center';
    filterElement.style.alignItems = 'center';
  }
}

// Función para mostrar la pantalla de éxito
function showSuccessMessage() {
  const formElement = document.getElementById('eligibility-quiz');
  const successScreen = document.querySelector('.quiz-form-success.w-form-done');

  // Ocultar el formulario con una transición de opacidad
  formElement.style.transition = 'opacity 0.5s ease';
  formElement.style.opacity = 0;

  setTimeout(() => {
    formElement.style.display = 'none';  // Ocultar el formulario después de la transición
    successScreen.style.display = 'block';  // Mostrar la pantalla de éxito
    successScreen.style.opacity = 0;

    setTimeout(() => {
      successScreen.style.opacity = 1;  // Mostrar el div de éxito con una transición suave
      successScreen.style.transition = 'opacity 0.5s ease';
    }, 50);
  }, 500);  // Esperar a que la opacidad llegue a 0 antes de ocultar el formulario
}

// Manejador para el botón de reset en el formulario
document.getElementById('quiz-reset').addEventListener('click', function(event) {
  event.preventDefault();  // Evitar el comportamiento por defecto del link

  // Reiniciar todos los pasos
  document.querySelectorAll('.quiz-form-step').forEach(step => {
    step.style.display = 'none';  // Ocultar todos los pasos
    step.style.opacity = 0;       // Restablecer la opacidad
  });

  // Volver al primer paso (step 0)
  const firstStep = document.querySelector('.quiz-form-step[data-step="0"]');
  firstStep.style.display = 'flex';  // Mostrar el step 0
  firstStep.style.opacity = 1;       // Restablecer la opacidad

  // Ocultar la pantalla de éxito
  const successScreen = document.querySelector('.quiz-form-success.w-form-done');
  successScreen.style.display = 'none';
  successScreen.style.opacity = 0;

  // Reiniciar la barra de progreso
  const progressBar = document.querySelector('.progress-bar-indicator');
  progressBar.style.width = '0%';  // Reiniciar la barra de progreso al 0%
  
  // Reiniciar otros elementos de radio y lógica si es necesario
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;  // Desmarcar todas las opciones de radio
  });

  // Lógica para reiniciar el formulario
  updateProgressBar(0);  // Volver a actualizar la barra de progreso al step 0
});

