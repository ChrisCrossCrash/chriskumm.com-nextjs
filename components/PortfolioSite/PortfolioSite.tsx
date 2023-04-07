import { useEffect, useRef } from 'react'
import Image from "next/legacy/image"
import { KatoButton } from '../KatoButton/KatoButton'
import { PortfolioSiteData } from '../../types/types'
import styles from './PortfolioSite.module.scss'

type PortfolioSiteProps = {
  project: PortfolioSiteData
}

export const PortfolioSite = (props: PortfolioSiteProps) => {
  const textRef = useRef<HTMLDivElement>(null!)
  const imageRef = useRef<HTMLDivElement>(null!)

  // Animations
  useEffect(() => {
    const textIsOnRightHalf =
      textRef.current &&
      textRef.current.getBoundingClientRect().left > window.innerWidth / 2

    const infoTextObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // FIXME: The from right or from left classes don't change if the screen
        // is resized.
        entry.target.classList.toggle(
          textIsOnRightHalf ? 'fadeInFromRight' : 'fadeInFromLeft',
          !entry.isIntersecting
        )
      }
    })
    infoTextObserver.observe(textRef.current)

    const screenshotHolderObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('fadeInFromAbove', !entry.isIntersecting)
      }
    })
    screenshotHolderObserver.observe(imageRef.current)
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
          // Start loading when the bottom of the viewport is within 500px of the image.
          lazyBoundary='500px'
        />
      </div>

      {/* Spacer element */}
      <div className={styles.spacer} />

      {/* Info Text */}
      <div ref={textRef} className={styles.infoText}>
        {/* If there's a URL for the project, render a link. Otherwise, render a string. */}
        {props.project.url ? (
          <a
            className={styles.titleLink}
            href={props.project.url}
            rel='noreferrer'
          >
            <h1 className={styles.title}>{props.project.title}</h1>
          </a>
        ) : (
          <h1 className={styles.title}>{props.project.title}</h1>
        )}
        <p className={styles.subtitle}>{props.project.subtitle}</p>
        <p>{props.project.description}</p>
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
