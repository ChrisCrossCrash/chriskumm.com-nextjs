import { PortfolioSiteData } from '../types/types'
import mlkMockup from '../public/images/mockup_mlk.png'
import instaArtMockup from '../public/images/mockup_instaart.png'
import ckMockup from '../public/images/mockup_ck.png'

export const portfolioSites: PortfolioSiteData[] = [
  {
    title: 'MLK Seminars',
    subtitle: 'Commercial website',
    description:
      'A single page app (SPA) where electrical industry professionals sign up for in-person training seminars',
    features:
      'Google Maps, Stripe Elements, admin page, email sending/receiving, email notifications, SMS notifications, mass email, custom email template, automatic database backups',
    technologies:
      'React, React Router, React Bootstrap, Django REST Framework, SCSS, Bootstrap, Django, Stripe API, Nginx, AWS EC2, AWS SES, AWS Route 53, AWS SNS, AWS Lambda, AWS S3',
    screenshot: mlkMockup,
    url: 'https://www.mlkseminars.com',
  },
  {
    title: 'InstaArt',
    subtitle: 'Art blog',
    description: 'An online art museum.',
    features: 'admin page, dynamic background, pagination, full-screen modals',
    technologies:
      'React, React Router, React Bootstrap, Django REST Framework, Nginx, AWS Lightsail',
    screenshot: instaArtMockup,
    url: 'https://www.chriskumm.com/art',
  },
  {
    title: 'ChrisKumm.com',
    subtitle: 'Portfolio website',
    description: 'This is where I showcase my work.',
    features: 'Animations, custom Telegram API, reCAPTCHA, Optimized images',
    technologies:
      'Typescript (strict), Next JS, GreenSock, SCSS modules, Cypress, Vercel, AWS Route 53, Formik',
    screenshot: ckMockup,
  },
]
