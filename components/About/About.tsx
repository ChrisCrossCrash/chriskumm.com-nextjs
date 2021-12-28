import React, { useEffect, useRef } from 'react'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { SkillSection } from '../SkillSection/SkillSection'
import { frontEnd, backEnd } from '../../data/skills'
import styles from './About.module.scss'
import { aboutBg } from './aboutBg'

export const About = () => {
  const frontEndRef = useRef(null!)
  const backEndRef = useRef(null!)
  const mainContentRef = useRef(null!)

  useEffect(() => {
    const mainContentObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('fadeInFromAbove', !entry.isIntersecting)
      }
    })
    mainContentObserver.observe(mainContentRef.current)

    const frontEndObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('fadeInFromLeft', !entry.isIntersecting)
      }
    })
    frontEndObserver.observe(frontEndRef.current)

    const backEndObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('fadeInFromRight', !entry.isIntersecting)
      }
    })
    backEndObserver.observe(backEndRef.current)
  }, [])

  return (
    <div
      id='about'
      className={styles.base}
      style={{ backgroundImage: aboutBg }}
    >
      <div className={styles.contained}>
        <div ref={mainContentRef} className={styles.mainContent}>
          <SectionHeading>Full Stack Solutions</SectionHeading>
          <div className={styles.missionSection}>
            <p>
              When you bring your business online, It helps to have a smart and
              innovative partner at your side. I work collaboratively with my
              clients to make the products that they want, and I feel a sense of
              shared pride when I deliver on my promises. I value each and every
              one of my clients, and I provide them with the honesty, integrity,
              and respect that they deserve.
            </p>
            <p>
              Far from cookie cutter designs, my websites feature complex
              animations, custom database functionality, and online payments -
              but websites are just part of what I do. Custom email templates? I
              can do that. Maybe you want to send your clients an SMS message to
              remind them of that upcoming event they signed up for? I can do
              that too.
            </p>
          </div>
        </div>

        {/* skill cards */}
        <div className={styles.skillCards}>
          <div ref={frontEndRef} className={styles.frontEndContainer}>
            <SkillSection {...frontEnd} />
          </div>
          <div ref={backEndRef} className={styles.backEndContainer}>
            <SkillSection {...backEnd} />
          </div>
        </div>
      </div>
    </div>
  )
}
