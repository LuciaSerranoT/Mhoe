import React from 'react';
import './Hero.css';

const Hero = React.memo(() => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>INGENIERA INFORMÁTICA</h1>
          <h2>Software Developer</h2>
          <p>Desarrollo soluciones digitales modernas e innovadoras</p>

          <button
            className="btn btn-primary"
            onClick={() => scrollToSection('contacto')}
          >
            Ponte en contacto
          </button>
        </div>
      </div>
    </section>
  );
});

export default Hero;