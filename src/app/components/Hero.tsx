import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={styles.photoContainer}
          >
            <div className={styles.photoWrapper}>
              <div className={styles.photoGlow}></div>
              <img
                src="/images/hero/linkedinPhoto.jpg"
                alt="Zuhair Qureshi"
                className={styles.photo}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.textContent}
          >

            
            <h1 className={styles.title}>
              Zuhair Qureshi
            </h1>
            
            <p className={styles.subtitle}>
              Electrical and Biomedical Engineering @ McMaster University
            </p>
            
            <p className={styles.description}>
              Passionate about the intersection of engineering technology, software, data analytics, and healthcare.
              <br />
              <br />
              1,000+ hours of professional machine learning + data analysis research experience.
            </p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/ZuhairQureshi"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.github}`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/zuhair-qureshi"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles.linkedin}`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:zuhair.q01@gmail.com"
                className={`${styles.socialLink} ${styles.email}`}
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
