import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <h1>LST 
Lucía Serrano Trigo <br />
Software Developer</h1>
        </div>
        <ul className="nav-menu">
          <li><button onClick={() => scrollToSection('inicio')}>Inicio</button></li>
          <li><button onClick={() => scrollToSection('sobre-mi')}>Sobre Mí</button></li>
          <li><button onClick={() => scrollToSection('habilidades')}>Habilidades</button></li>
          <li><button onClick={() => scrollToSection('proyectos')}>Proyectos</button></li>
          <li><button onClick={() => scrollToSection('contacto')}>Contacto</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;