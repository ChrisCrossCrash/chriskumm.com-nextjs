import { PortfolioSiteData } from '../types/types'
import mlkMockup from '../public/images/mockup_mlk.png'
import instaArtMockup from '../public/images/mockup_instaart.png'
import ckMockup from '../public/images/mockup_ck.png'
import blenderLogo from '../public/images/blender-logo.jpg'
import rPlaceGigapixel from '../public/images/mockup_rplacegiga.png'
import depthSectionMockup from '../public/images/mockup_depthsection.png'
import chatGptPromptDividerMockup from '../public/images/mockup_chatgpt-prompt-divider.png'

export const portfolioSites: PortfolioSiteData[] = [
  {
    title: 'ChatGPT Prompt Divider',
    subtitle: 'Website',
    description:
      'A website for dividing ChatGPT prompts into smaller chunks. This site was created in just a few hours using AI technologies like ChatGPT and Bing AI. It used my custom Next.js template as a starting point.',
    features: 'Simple UI, responsive design, AI-generated favicon',
    technologies:
      'ChatGPT (for generating a large portion of the code), Bing AI (for generating the favicon), React TypeScript, Next.js, Sass (SCSS modules), Vercel',
    screenshot: chatGptPromptDividerMockup,
    url: 'https://chatgpt-prompt-divider.vercel.app/',
  },
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
    subtitle: 'Open source 3D data visualization',
    description:
      'Tools for r/Place data visualization with Blender and Python.',
    features:
      'color and heat map generation, helpful guides, command line interface',
    technologies: 'Blender, Python, Pandas, NumPy, Jupyter Notebook, ImageIO',
    screenshot: blenderLogo,
    url: 'https://github.com/ChrisCrossCrash/r-place-blender',
  },
  {
    title: 'r/Place Gigapixel Explorer',
    subtitle: 'r/Place 2022 data visualization website',
    description:
      "A website for viewing a 3D isometric view of r/Place 2022 as a gigapixel image, and the tools used to create it. The gigapixel image has a total resolution of 36864 x 27648 pixels. That's over a billion pixels! This large image was separated into over 9000 smaller images which get loaded on demand as users pan and zoom around the image.",
    features:
      'Google Maps style image zooming, social sharing buttons, fullscreen mode',
    technologies:
      'HTML, Sass (SCSS), JavaScript, Snowpack, Microsoft Deep Zoom specification, OpenSeadragon, Sharp (JS image library), Poetry, ImageIO, Pandas, NumPy, Jupyter Notebook, NPM workspaces, Vercel',
    screenshot: rPlaceGigapixel,
    url: 'https://r-place-gigapixel.vercel.app/',
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
    title: 'Depth Section',
    subtitle: 'NPM package',
    description: 'Easy to use 3D parallax sections to add depth to your page.',
    features: 'Easy to use API, Storybook examples, responsive design',
    technologies:
      'Rollup, Three.js, React Three Fiber, React, TypeScript, Storybook, Vercel',
    screenshot: depthSectionMockup,
    // Don't forget to also change the redirect in next.config.js if this changes.
    url: 'https://www.npmjs.com/package/depth-section',
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
