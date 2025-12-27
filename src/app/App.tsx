import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'projects', 'skills', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // consider a section visible when its midpoint crosses the viewport
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main">
        <section id="home" className="section">
          <Hero />
        </section>
        
        <section id="projects" className="projectsSection">
          <Projects />
        </section>
        
        <section id="skills" className="skillsSection">
          <Skills />
        </section>
        
        <section id="contact" className="contactSection">
          <Contact />
        </section>
      </main>
      
      <footer className="footer">
        <div className="footerContent">
          <p className="footerText">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
