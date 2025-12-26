import { motion } from 'motion/react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import styles from './Contact.module.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c03c20df/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      setSubmitStatus('success');
      reset();
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.formCard}
        >
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Your Name
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <User size={20} />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={styles.input}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Your Email
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={styles.input}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            {/* Subject Field */}
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <MessageSquare size={20} />
                </div>
                <input
                  id="subject"
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  className={styles.input}
                  placeholder="Project Inquiry"
                />
              </div>
              {errors.subject && (
                <p className={styles.error}>{errors.subject.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                })}
                className={styles.textarea}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className={styles.error}>{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.statusMessage} ${styles.successMessage}`}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.statusMessage} ${styles.errorMessage}`}
              >
                {errorMessage}
              </motion.div>
            )}
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Or email me directly at{' '}
              <a
                href="mailto:zuhair.q01@gmail.com"
                className={styles.emailLink}
              >
                zuhair.q01@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
