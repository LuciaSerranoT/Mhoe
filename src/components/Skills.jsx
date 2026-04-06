import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="habilidades" className="skills">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>HTML5 & CSS3</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Vue.js</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>Python</li>
              <li>Java</li>
              <li>Node.js</li>
              <li>SQL</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Herramientas</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>VS Code</li>
              <li>Jira</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Metodologías</h3>
            <ul>
              <li>Agile</li>
              <li>Scrum</li>
              <li>TDD</li>
              <li>Clean Code</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;