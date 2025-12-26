import { useState } from 'react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

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
