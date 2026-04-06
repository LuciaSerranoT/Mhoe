import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="sobre-mi" className="about">
      <div className="container">

        <div className="about-layout">

          {/* IZQUIERDA (vacía para la L) */}
          <div className="about-left"></div>

          {/* DERECHA (tu contenido) */}
          <div className="about-right">
            <h2 className="section-title">Un poco sobre mí</h2>

            <div className="about-content">
              <div className="about-text">
                <p>Ingeniera informática en formación y desarrolladora Full-Stack. Transformo tus ideas en código eficiente</p>
                <p>Me especializo en crear soluciones prácticas y ajustadas al cliente, siempre buscando el próximo proyecto para seguir aprendiendo y aportando valor a quien usa mi trabajo</p>
              </div>

              <div className="about-info">
                <div className="info-item">
                  <h3>Experiencia</h3>
                  <p>Diseño y desarrollo de soluciones web personalizadas para clientes particulares y pequeños negocios, optimizando su presencia digital y experiencia de usuario</p>
                </div>


                <div className="info-item">
                  <h3>Universidad</h3>
                  <p>Universidad de Jaén (UJA)</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;