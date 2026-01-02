import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'DeepFake Detection Platform',
    description: 'A full-stack deepfake detection platform utilizing a fusion of deep learning algorithms to identify manipulated media content.',
    image: 'https://s24806.pcdn.co/wp-content/uploads/2024/07/TrendMicro-Deepfake-videostill2-970-copy.jpg',
    tags: ['Python', 'PyTorch', 'Flask'],
    github: 'https://github.com/McMasterAI-Society/DeepFakeDetector',
  },
  {
    id: 2,
    title: 'NutriSafe',
    description: 'A personalized AI-based food safety recommendation system backed by barcode entry and personal health data.',
    image: 'https://normex.ca/crm.normex.ca/public/uploads/web/news/nr_how_ai_is_transforming_the_food_industryjpg_07092220240930.jpg',
    tags: ['Python', 'Streamlit', 'Cohere API'],
    github: 'https://github.com/nkaruna09/NutriSafe',
  },
  {
    id: 3,
    title: 'WANKI',
    description: 'A fully functional flashcard application scripted exclusively in Bash, a text-based alternative to the popular flashcard app Anki.',
    image: 'https://speak-and-play-english.com/wp-content/uploads/2018/07/classroom-objects-free-ESL-Flashcards-and-Printable-Picture-Cards-for-Classroom-.jpg',
    tags: ['Bash', 'CI/CD'],
    github: 'https://github.com/ZuhairQureshi/Wanki',
  },
  {
    id: 4,
    title: 'Autonomouse',
    description: 'An application that grants users hands-free mouse control with head movements and blinks.',
    image: 'images/project/faceDetectTest.jpg',
    tags: ['PyAutoGUI', 'MediaPipe', 'OpenCV'],
    github: 'https://github.com/ZuhairQureshi/autonomouse',
  },
  {
    id: 5,
    title: 'Library Scraper',
    description: 'A parser script for upcoming Toronto Public Library programs. Emails results in PDF.',
    image: 'images/project/libraryScrapePDFimg.png',
    tags: ['BeautifulSoup', 'Selenium WebDriver', 'FPDF'],
    github: 'https://github.com/ZuhairQureshi/Toronto-Public-Library-Event-Catalogue-Service',
  },
  {
    id: 6,
    title: 'Clash of Swords',
    description: 'A 2-player platform game modeled after the Super Smash Bros series. Multiple maps, players, and round options.',
    image: 'images/project/clashOfSwordsOpenScreen.png',
    tags: ['Java', 'Swing', 'JFrame'],
    github: 'https://github.com/ZuhairQureshi/clash-of-swords',
  },
  {
    id: 7,
    title: 'Body and Oral Language Learning Decoder (BOLLD)',
    description: 'A reinforcement learning model fusing outputs from a body language decoder and a lip reader to predict threat level.',
    image: 'https://ik.imagekit.io/edtechdigit/uscsi/Content/images/articles/computer-vision-in-cybersecurity-threat-hunting-beyond-the-obvious.jpeg',
    tags: ['Streamlit', 'MediaPipe', 'OpenCV'],
    github: 'https://github.com/NicoleSorokin/LipReading-AI-RL',
  },
  {
    id: 8,
    title: 'Resuscitron',
    description: 'A design for an automated cardiopulmonary resuscitation device with adjustable depth settings to facilitate use on children. ',
    image: 'images/project/resuscitronDiagram.png',
    tags: ['Python', 'Raspberry Pi'],
    demo: '#',
  },
];

export function Projects() {
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
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            A selection of my recent work showcasing various technologies and problem-solving approaches.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.projectCard}
            >
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  {project.github && (
                    <a href={project.github} className={styles.link}>
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} className={`${styles.link} ${styles.demo}`}>
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
