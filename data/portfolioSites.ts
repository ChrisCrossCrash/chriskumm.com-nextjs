import { PortfolioSiteData } from '../types/types'
import mlkMockup from '../public/images/mockup_mlk.png'
import instaArtMockup from '../public/images/mockup_instaart.png'
import ckMockup from '../public/images/mockup_ck.png'

export const portfolioSites: PortfolioSiteData[] = [
  {
    title: 'MLK Seminars',
    subtitle: 'Commercial website',
    description:
      'A place where electrical industry professionals sign up for in-person training seminars. The site has a Next.js front end and a Django Rest Framework back end.',
    features:
      '3D hero section element, Google Maps, Stripe Elements, admin page, email sending/receiving, email notifications, SMS notifications, mass email, custom email template, automatic database backups, advanced database features for managing class packages and sessions separately',
    technologies:
      'React (Next.js), TypeScript, Django, Django REST Framework, Sass (SCSS modules), Formik, Three.js, react-three-fiber, Google reCAPTCHA, React Testing Library, Cypress, Stripe API, Nginx, AWS EC2, AWS SES, AWS SNS, AWS Lambda, AWS Route 53, Vercel',
    screenshot: mlkMockup,
    url: 'https://www.mlkseminars.com',
  },
  {
    title: 'r/Place Data Visualization',
    subtitle: 'Open Source 3D Data Visualization',
    description:
      'Tools for r/Place data visualization with Blender and Python.',
    features:
      'color and heat map generation, helpful guides, command line interface',
    technologies: 'Blender, Python, Pandas, NumPy, Jupyter Notebook, ImageIO',
    screenshot: blenderLogo,
    url: 'https://github.com/ChrisCrossCrash/r-place-blender',
  },
  {
    title: 'InstaArt',
    subtitle: 'Art blog',
    description:
      'An online art museum. The site has a Next.js front end and a Django Rest Framework back end.',
    features:
      'admin page, dynamic background, pagination, full-screen modals, custom base-64 image optimization for user-uploaded images',
    technologies:
      'React (Next.js), TypeScript, Django, Django REST Framework, Sass (SCSS modules), Greensock (AKA GSAP), React Bootstrap, Amazon Lightsail',
    screenshot: instaArtMockup,
    // Don't forget to also change the redirect in next.config.js if this changes.
    url: 'https://insta-art-frontend.vercel.app',
  },
  {
    title: 'ChrisKumm.com',
    subtitle: 'Portfolio website',
    description:
      'This is where I showcase my work. The site has a Next.js front end and a custom Telegram integration for receiving contact form messages.',
    features: 'Animations, contact form, reCAPTCHA, optimized images',
    technologies:
      'TypeScript, Next JS, GreenSock (AKA GSAP), Sass (SCSS modules), Formik, Cypress, Vercel, AWS Route 53, Google reCAPTCHA, custom Telegram messaging integration',
    screenshot: ckMockup,
  },
]
