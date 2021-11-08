import { SectionHeading } from '../SectionHeading/SectionHeading'
import { ContactForm } from '../ContactForm/ContactForm'
import styles from './Contact.module.scss'

export const Contact = () => (
  <div id='contact' className={styles.base}>
    <SectionHeading>Contact</SectionHeading>
    <div className={styles.formContainer}>
      <ContactForm />
    </div>
  </div>
)
