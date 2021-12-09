import React, { useState, createContext, useContext } from 'react'
import type { Theme } from '../types/types'
import { themes } from '../data/themes'

const ThemeContext = createContext(themes[0])
const SetThemeContext = createContext<
  React.Dispatch<React.SetStateAction<Theme>>
>(null!)

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
