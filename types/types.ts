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
  image: {
    src: string
    alt: string
  }
}

export type Theme = {
  name: string
  heroSectionBackground: StaticImageData
  cssModule: {
    app: string
    btn: string
    btnOutline: string
    textColor: string
  }
}
