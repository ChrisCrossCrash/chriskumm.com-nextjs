import { SkillData } from '../types/types'

export const frontEnd: SkillData = {
  title: 'Front End',
  skills: [
    'Typescript | React',
    'Next JS | Gatsby',
    'Tailwind CSS | Formik',
    'Sass | GreenSock',
  ],
  image: {
    src: '/images/iconfinder_browser_2955254.svg',
    alt: 'Front End',
  },
}

export const backEnd: SkillData = {
  title: 'Back End',
  skills: ['Django | REST | VPS', 'Ubuntu | uWSGI | NGINX', 'AWS | Stripe'],
  image: {
    src: '/images/iconfinder_machines_2955248.svg',
    alt: 'back End',
  },
}
