import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";
import "./styles/global.css";

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.45,
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".project-card, .info-item, .skill-category"
    );

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Background3D activeSection={activeSection} />

      <Navbar />

      <section data-section="hero">
        <Hero />
      </section>

      <section data-section="about">
        <About />
      </section>

      <section data-section="skills">
        <Skills />
      </section>

      <section data-section="projects">
        <Projects />
      </section>

      <section data-section="contact">
        <Contact />
      </section>

      <section data-section="footer">
        <Footer />
      </section>
    </div>
  );
}

export default App;