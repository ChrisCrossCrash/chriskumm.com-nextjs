import React, { useState, createContext, useContext } from 'react'
import type { Theme } from '../types/types'
import { themes } from '../data/themes'

const ThemeContext = createContext(themes[0])
const SetThemeContext = createContext<
  React.Dispatch<React.SetStateAction<Theme>>
>(null!)

/*

Rules/Guidelines for This Context:

1. Whenever possible, you should favor CSS custom properties over calling useTheme.
   This will help performance and keep code simpler and easier to maintain.
2. Themes are here to stay, so there should be no need to have default values that are overridden.
   Again, this will keep code simpler and easier to maintain.
*/

// TODO: Go through every place where useTheme is called and see if it could be
//  changed over to use CSS custom properties.
export const useTheme = () => useContext(ThemeContext)

export const useSetTheme = () => useContext(SetThemeContext)

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState(themes[0])

  return (
    <ThemeContext.Provider value={activeTheme}>
      <SetThemeContext.Provider value={setActiveTheme}>
        <div className={activeTheme.cssModule.app}>{props.children}</div>
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}
