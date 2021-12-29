import React from 'react'

export type PortfolioSiteData = {
  title: string
  subtitle: string
  description: string
  features: string
  technologies: string
  screenshot: StaticImageData
  url?: string
}

export type SkillData = {
  title: string
  skills: string[]
  image: React.FC
}
