import './i18n.js';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PAGES from '@data/pages.js';

import useLanguageInit from '@hooks/useLanguageInit';
import useThemeInit from '@hooks/useThemeInit';

import { SettingsProvider } from '@contexts/settingsContext';
import { SongProvider } from '@contexts/songContext';

import LockPage from '@molecules/start-page';
import MenuBar from '@molecules/menu-bar';
import Wallpaper from '@molecules/wallpaper';
import Demo from '@molecules/demo';

import Toolbar from '@organisms/toolbar';
import Content from '@organisms/content';

function App() {
  useThemeInit();
  useLanguageInit();

  const { t } = useTranslation();

  const [locked, setLocked] = useState(true);
  const [windows, setWindows] = useState<string[]>([]);

  const handleWindows = (page: string) => {
    setWindows((currentPages) => (currentPages.includes(page) ? currentPages.filter((item) => item !== page) : [page, ...currentPages]));
  };

  // Dock click: open it, bring it forward if it is buried, minimize it only when it is already on top.
  const handleDock = (page: string) => {
    if (windows.includes(page) && windows[0] !== page) handleWindowsPriority(page);
    else handleWindows(page);
  };

  const handleWindowsPriority = (page: string) => {
    setWindows((currentPages) =>
      currentPages.includes(page) && currentPages[0] !== page ? [page, ...currentPages.filter((str) => str !== page)] : currentPages
    );
  };

  const unlock = useCallback(() => setLocked(false), []);

  return (
    <SettingsProvider>
      <main className="relative h-dvh w-dvw select-none overflow-hidden">
        <Wallpaper />

        <SongProvider>
          <>
            <MenuBar activeWindow={windows[0]} onLock={() => setLocked(true)} />
            <Content pages={PAGES} windows={windows} t={t} handleWindows={handleWindows} handleWindowsPriority={handleWindowsPriority} />
          </>
        </SongProvider>

        {!locked && <Demo />}
        <Toolbar pages={PAGES} windows={windows} handler={handleDock} />
        <LockPage locked={locked} onUnlock={unlock} />
      </main>
    </SettingsProvider>
  );
}

export default App;
