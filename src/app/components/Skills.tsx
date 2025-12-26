import { motion } from 'motion/react';
import { Code, Palette, Database, Globe, Cpu, Briefcase, Github } from 'lucide-react';
import styles from './Skills.module.css';

interface Skill {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
}

const skills: Skill[] = [
  {
    id: 1,
    name: 'Frontend Development',
    icon: <Code size={32} />,
    description: 'React, Streamlit, HTML, CSS, JavaScript',
    colorClass: 'blue',
  },
  {
    id: 2,
    name: 'Backend Development',
    icon: <Database size={32} />,
    description: 'Meteor.js, Node.js, Python, SQL',
    colorClass: 'green',
  },
  {
    id: 3,
    name: 'UI/UX Design',
    icon: <Palette size={32} />,
    description: 'Figma',
    colorClass: 'purple',
  },
  {
    id: 4,
    name: 'Languages',
    icon: <Globe size={32} />,
    description: 'Python, C/C++, Java, Bash, MATLAB',
    colorClass: 'orange',
  },
  {
    id: 5,
    name: 'Machine Learning',
    icon: <Cpu size={32} />,
    description: 'TensorFlow, PyTorch, OpenCV, MediaPipe, Dlib',
    colorClass: 'indigo',
  },
  {
    id: 6,
    name: 'Version Control',
    icon: <Github size={32} />,
    description: 'Git, GitHub, GitLab',
    colorClass: 'gray',
  },
  {
    id: 7,
    name: '3D Modeling and Design',
    icon: <Briefcase size={32} />,
    description: 'PSpice, Altium, AutoDesk Inventor, SolidWorks',
    colorClass: 'yellow',
  },
];

export function Skills() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Skills & Expertise</h2>
          <p className={styles.subtitle}>
            The set of technical skills and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={styles.skillCard}
            >
              <div className={styles.skillCardInner}>
                <div className={`${styles.iconContainer} ${styles[skill.colorClass]}`}>
                  {skill.icon}
                </div>
                
                <h3 className={styles.skillTitle}>{skill.name}</h3>
                <p className={styles.skillDescription}>{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
