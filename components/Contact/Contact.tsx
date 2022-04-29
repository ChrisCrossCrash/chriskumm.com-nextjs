import { SectionHeading } from '../SectionHeading/SectionHeading'
import { ContactForm } from '../ContactForm/ContactForm'
import styles from './Contact.module.scss'
import { InView } from 'react-intersection-observer'

export const Contact = () => (
  <div id='contact' className={styles.base}>
    <SectionHeading>Contact</SectionHeading>
    <div className={styles.formContainer}>
      {/* Only render the form when it is scrolled in to view */}
      <InView>
        <ContactForm />
      </InView>
    </div>
  </div>
)
