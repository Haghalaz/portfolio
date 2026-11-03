import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

import usePersistentState from '@hooks/usePersistentState.ts';

export type Settings = {
  /** Wallpaper drifts with the pointer. */
  parallax: boolean;
  /** Show the picture-in-picture demo clip. */
  demo: boolean;
};

const DEFAULTS: Settings = { parallax: true, demo: true };

type SettingsContextType = {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType>({ settings: DEFAULTS, update: () => {} });

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [stored, setStored] = usePersistentState<Partial<Settings>>('settings', {});

  const update = useCallback((patch: Partial<Settings>) => setStored((current) => ({ ...current, ...patch })), [setStored]);
  const value = useMemo(() => ({ settings: { ...DEFAULTS, ...stored }, update }), [stored, update]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
