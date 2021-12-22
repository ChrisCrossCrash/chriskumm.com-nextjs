import { useSetTheme } from '../../contexts/ThemeContext'
import { themes } from '../../data/themes'
import styles from './ThemePicker.module.scss'

// TODO: Make this pretty.

export const ThemePicker = () => {
  const setTheme = useSetTheme()
  return (
    <div className={styles.base}>
      <div>Theme:</div>
      {themes.map((theme) => (
        <button
          className={styles.themeBtn}
          style={{ backgroundColor: theme.btnColor }}
          key={theme.name}
          onClick={() => setTheme(theme)}
        ></button>
      ))}
    </div>
  )
}
