import type { Theme } from '../types/types'

import desertStyles from './themeStyles/desert.module.scss'
import desertBackground from '../public/images/Windows11DesertTheme.png'

import candyRingsStyles from './themeStyles/candyRings.module.scss'
import candyRingsBackground from '../public/images/candyRings.png'

import redTentaclesStyles from './themeStyles/redTentacles.module.scss'
import redTentaclesBackground from '../public/images/redTentacles.png'

export const themes: Theme[] = [
  {
    name: 'desert',
    heroSectionBackground: desertBackground,
    cssModule: desertStyles,
    btnColor: '#5d1c99',
  },
  {
    name: 'candyRings',
    heroSectionBackground: candyRingsBackground,
    cssModule: candyRingsStyles,
    btnColor: '#3db2ff',
  },
  {
    name: 'redTentacles',
    heroSectionBackground: redTentaclesBackground,
    cssModule: redTentaclesStyles,
    btnColor: 'rgb(211, 48, 61)',
  },
]
