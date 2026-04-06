# Portfolio de Ingeniera Informática

Este es un template profesional y moderno para crear tu portfolio como ingeniera informática.

## 📋 Contenido

El portfolio incluye las siguientes secciones:

- **Navegación**: Menú sticky con navegación suave entre secciones
- **Hero**: Bienvenida principal con llamada a contacto
- **Sobre Mí**: Información personal y estadísticas profesionales
- **Habilidades**: Categorías de skills organizadas (Frontend, Backend, Herramientas, Metodologías)
- **Proyectos**: Galería de proyectos destacados con tecnologías
- **Contacto**: Formulario de contacto y enlaces a redes sociales
- **Footer**: Pie de página

## 🎨 Personalización

### 1. Información Personal
Abre `index.html` y busca los siguientes elementos para personalizarlos:

- **Título del sitio**: Cambiar `Mi Portfolio` por tu nombre
- **Descripción de la sección Hero**: Personalizar la bienvenida
- **Sobre Mí**: Reescribir el párrafo con tu biografía y experiencia
- **Números de experiencia**: Actualizar los años y cantidad de proyectos

### 2. Habilidades
En la sección de habilidades, edita las categorías y sus skills:

```html
<div class="skill-category">
    <h3>Tu Categoría</h3>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
    </ul>
</div>
```

### 3. Proyectos
Reemplaza los proyectos de ejemplo con los tuyos:

```html
<div class="project-card">
    <div class="project-image" style="background: linear-gradient(...)"></div>
    <h3>Tu Proyecto</h3>
    <p>Descripción del proyecto</p>
    <div class="project-tech">
        <span class="tech-tag">Tecnología 1</span>
        <span class="tech-tag">Tecnología 2</span>
    </div>
    <a href="tu-link" class="btn btn-secondary">Ver proyecto</a>
</div>
```

### 4. Colores
Para cambiar la paleta de colores, edita las variables en `style.css`:

```css
:root {
    --color-primary: #667eea;      /* Color principal */
    --color-secondary: #764ba2;    /* Color secundario */
    --color-text: #333;            /* Texto oscuro */
    --color-bg: #f8f9fa;           /* Fondo claro */
}
```

### 5. Contacto
- Reemplaza el `href="#"` del botón "Ver proyecto" con URLs reales
- Configura el formulario para enviar emails (ver sección Deploy)
- Actualiza los enlaces a LinkedIn, GitHub y email en la sección de contacto

## 📱 Características

✅ **Responsive**: Diseño adaptable a todos los dispositivos
✅ **Moderno**: Gradientes, animaciones y efectos hover
✅ **Accesible**: Semántica HTML correcta y navegación intuitiva
✅ **Rápido**: Sin dependencias externas (HTML, CSS, vanilla JS)
✅ **SEO-friendly**: Meta tags y estructura semántica

## 🚀 Cómo Usar

1. **Descargar/Clonar** los archivos a tu carpeta de proyecto
2. **Abrir** `index.html` en tu navegador
3. **Editar** el contenido en `index.html`
4. **Personalizar** colores y estilos en `style.css`
5. **Subir** a tu servidor o plataforma de hosting

## 📤 Deploy (Hosting Gratuito)

### Opción 1: GitHub Pages
1. Crea un repositorio en GitHub
2. Sube tus archivos
3. Ve a Settings → Pages
4. Selecciona la rama `main` como fuente
5. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Opción 2: Netlify
1. Ve a netlify.com
2. Hacer drag & drop de tu carpeta
3. Tu sitio se publicará automáticamente

### Opción 3: Vercel
1. Ve a vercel.com
2. Importa tu repositorio de GitHub
3. Despliega con un clic

## 📧 Formulario de Contacto

Para que el formulario funcione, necesitas configurar un servicio:

### Opción 1: FormSubmit (Gratuito y sin configuración)
Cambia la línea en `index.html`:
```html
<form class="contact-form" action="https://formsubmit.co/tu-email@ejemplo.com" method="POST">
```

### Opción 2: EmailJS
1. Regístrate en emailjs.com
2. Configura tu servicio de email
3. Integra el código JavaScript en `script.js`

## 🔧 Estructura de Archivos

```
portfolio/
│
├── index.html          # Estructura HTML principal
├── style.css           # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este archivo
```

## 📌 Tips

- Usa imágenes de buena calidad en descripción de proyectos
- Añade links a GitHub, demo de proyectos
- Mantén el contenido actualizado
- Considera añadir un blog de artículos técnicos
- Usa Google Analytics para trackear visitantes

## 🎓 Próximas Mejoras Sugeridas

- [ ] Blog/Sección de artículos
- [ ] Galería de fotos/capturas
- [ ] Certificaciones y educación
- [ ] Sección de descargas (CV)
- [ ] Modo oscuro
- [ ] Integración con APIs de proyectos (GitHub)
- [ ] Animaciones más avanzadas
- [ ] Multilingual support

## 📝 Notas

- El formulario de contacto mostrada es un ejemplo. Configura el backend según necesites.
- Los iconos de checkmarks se generan con CSS (✓)
- Las imágenes de proyectos usan gradientes. Puedes reemplazarlas con imágenes reales

## 🎉 ¡Listo!

Tu portfolio está listo para ser personalizado. ¡Suerte con tu carrera profesional! 🚀

---

**Creado por**: Una solución moderna para ingeniera informática
**Última actualización**: 2024
