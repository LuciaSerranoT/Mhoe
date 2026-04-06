import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (formData.name.trim() === '' || formData.email.trim() === '' || formData.message.trim() === '') {
      alert('Por favor, rellena todos los campos');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, ingresa un email válido');
      return;
    }

    // Mostrar confirmación
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');

    // Limpiar formulario
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <div className="contact-content">
          <p>¿Tienes un proyecto en mente? ¡Me encantaría colaborar contigo!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Tu mensaje"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>O conecta conmigo:</h3>
          <div className="social-links">
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">GitHub</a>
            <a href="mailto:" className="social-link">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;