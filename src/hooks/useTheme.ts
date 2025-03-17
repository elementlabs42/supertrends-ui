import { DarkTheme, LightTheme } from '@/constants/themes'
import { useSettings } from '@/providers/settings/context'

export function useTheme() {
  const { settings, setSettings } = useSettings()
  const theme = settings.useLightTheme ? LightTheme : DarkTheme

  function toggleTheme() {
    if (settings.useLightTheme) {
      setSettings({ ...settings, useLightTheme: false })
    } else {
      setSettings({ ...settings, useLightTheme: true })
    }
  }

  return { theme, useLightTheme: settings.useLightTheme, toggleTheme }
}
