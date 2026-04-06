// ========================================
// FUNCIONALIDADES INTERACTIVAS
// ========================================

// Validación del formulario de contacto
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validación simple
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Por favor, rellena todos los campos');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        // Mostrar confirmación
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        
        // Limpiar formulario
        this.reset();
    });
}

// Efecto de scroll activo en navegación
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Añadir clase active al elemento actual de navegación (estilos CSS)
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-primary);
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Animación de aparición de elementos al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador a tarjetas de proyectos e items de información
document.querySelectorAll('.project-card, .info-item, .skill-category').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Menu responsivo (preparado para futuro)
function setupResponsiveMenu() {
    const navBrand = document.querySelector('.nav-brand');
    const navMenu = document.querySelector('.nav-menu');
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            // Aquí irían acciones para cerrar menú en dispositivos móviles
        });
    });
}

setupResponsiveMenu();

// Log de confirmación
console.log('Portfolio cargado correctamente ✓');
