import { SkillData } from '../types/types'
import { FrontEndSvg } from './FrontEndSvg'
import { BackEndSvg } from './BackEndSvg'

export const frontEnd: SkillData = {
  title: 'Front End',
  skills: [
    'Typescript | React',
    'Next JS | Gatsby',
    'Tailwind CSS | Formik',
    'Sass | GreenSock',
  ],
  image: FrontEndSvg,
}

export const backEnd: SkillData = {
  title: 'Back End / API',
  skills: [
    'Django | REST | VPS',
    'Ubuntu | uWSGI | NGINX',
    'AWS | Stripe',
    'Telegram API',
  ],
  image: BackEndSvg,
}
