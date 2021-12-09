import type { Theme } from '../types/types'
import DesertBackground from '../public/images/Windows11DesertTheme.png'
import desertStyles from './themeStyles/desert.module.scss'

export const themes: Theme[] = [
  {
    name: 'desert',
    heroSectionBackground: DesertBackground,
    cssModule: desertStyles,
  },
]
