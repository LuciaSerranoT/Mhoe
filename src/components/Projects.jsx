import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Proyecto 1',
      description: 'Descripción breve del proyecto. Incluye tecnologías utilizadas y el impacto que tuvo.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Proyecto 2',
      description: 'Descripción breve del proyecto. Incluye tecnologías utilizadas y el impacto que tuvo.',
      technologies: ['Vue.js', 'Python', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Proyecto 3',
      description: 'Descripción breve del proyecto. Incluye tecnologías utilizadas y el impacto que tuvo.',
      technologies: ['Java', 'Spring Boot', 'MySQL'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <section id="proyectos" className="projects">
      <div className="container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div
                className="project-image"
                style={{ background: project.gradient }}
              ></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <button className="btn btn-secondary">Ver proyecto</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;