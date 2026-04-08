// Importar configuración de Three.js
import './setup.js';

// Importar luces y materiales
import './lighting.js';
import './materials.js';

// Importar modelos
import { loadModels } from './models.js';

// Importar interacciones y animación
import { setupInteractions } from './interactions.js';
import { startAnimation, setupResizeListener } from './animation.js';

// Importar formulario y navegación
import { setupContactForm } from './form.js';
import { setupNavigation } from './navigation.js';

// Inicializar todo
loadModels();
setupInteractions();
startAnimation();
setupResizeListener();
setupContactForm();
setupNavigation();
