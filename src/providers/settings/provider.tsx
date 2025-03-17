import { ReactNode, useCallback, useMemo } from 'react'
import { DEFAULT_SETTINGS, SETTINGS_VERSION, Settings, SettingsContext } from './context'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface Props {
  children: ReactNode
}

export function SettingsProvider({ children }: Props) {
  const [savedSettings, setSettings] = useLocalStorage<Settings>(SETTINGS_VERSION, DEFAULT_SETTINGS)

  const settings: Settings = useMemo<Settings>(
    () => ({
      ...DEFAULT_SETTINGS,
      ...(savedSettings ?? {}),
    }),
    [savedSettings],
  )

  const restoreDefaults = useCallback(() => setSettings(DEFAULT_SETTINGS), [setSettings])

  const value = useMemo(() => ({ settings, setSettings, restoreDefaults }), [settings, restoreDefaults, setSettings])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
