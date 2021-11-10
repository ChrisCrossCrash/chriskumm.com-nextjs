import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { KatoButton } from '../KatoButton/KatoButton'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PortfolioSiteData } from '../../types/types'
import styles from './PortfolioSite.module.scss'

gsap.registerPlugin(ScrollTrigger)

type PortfolioSiteProps = {
  project: PortfolioSiteData
}

export const PortfolioSite = (props: PortfolioSiteProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textIsOnRightHalf =
      textRef.current &&
      textRef.current.getBoundingClientRect().left > window.innerWidth / 2

    // Text fades in from outer side
    gsap.from(textRef.current, {
      opacity: 0,
      x: textIsOnRightHalf ? 200 : -200,
      scrollTrigger: textRef.current,
      duration: 1,
    })

    // Image fades in from top
    gsap.from(imageRef.current, {
      opacity: 0,
      y: 200,
      scrollTrigger: imageRef.current,
      duration: 1,
    })
  }, [])

  return (
    <div className={styles.base}>
      {/* Mockup */}
      <div ref={imageRef} className={styles.screenshotHolder}>
        <Image
          src={props.project.screenshot}
          alt={props.project.title}
          className={styles.screenshot}
          placeholder='blur'
        />
      </div>

      {/* Spacer element */}
      <div className={styles.spacer} />

      {/* Info Text */}
      <div ref={textRef} className={styles.infoText}>
        <h1>
          {/* If there's a URL for the project, render a link. Otherwise, render a string. */}
          {props.project.url ? (
            <a
              className={styles.title}
              href={props.project.url}
              rel='noreferrer'
            >
              {props.project.title}
            </a>
          ) : (
            props.project.title
          )}
        </h1>
        <p className={styles.subtitle}>{props.project.subtitle}</p>
        <p className={styles.description}>{props.project.description}</p>
        <p className={styles.features}>
          <strong>Features:</strong> {props.project.features}
        </p>
        <p className={styles.technologies}>
          <strong>Key technologies:</strong> {props.project.technologies}
        </p>
        {props.project.url && (
          <KatoButton url={props.project.url}>visit site</KatoButton>
        )}
      </div>
    </div>
  )
}
