import { SectionHeading } from '../SectionHeading/SectionHeading'
import { ContactForm } from '../ContactForm/ContactForm'
import styles from './Contact.module.scss'
import { useInView } from 'react-intersection-observer'

export const Contact = () => {
  const [ref, inView] = useInView()
  return (
    <div id='contact' className={styles.base}>
      <SectionHeading>Contact</SectionHeading>
      <div className={styles.formContainer} ref={ref}>
        {/* Only render the form when it is scrolled in to view */}
        {inView && <ContactForm />}
      </div>
    </div>
  )
}
