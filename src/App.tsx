import './i18n.js';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PAGES from '@data/pages.js';

import useLanguageInit from '@hooks/useLanguageInit';
import useThemeInit from '@hooks/useThemeInit';

import { SongProvider } from '@contexts/songContext';

import CurrentSong from '@molecules/currentSong';
import Toolbar from '@molecules/toolbar/';
import Demo from '@molecules/demo/';

import Content from '@organisms/content/';

function App() {
  useThemeInit();
  useLanguageInit();

  const { t } = useTranslation();
  const [windows, setWindows] = useState<string[]>([]);

  const handleWindows = (page: string) => {
    setWindows((currentPages) => (currentPages.includes(page) ? currentPages.filter((item) => item !== page) : [page, ...currentPages]));
  };

  const handleWindowsPriority = (page: string) => {
    if (windows.includes(page)) setWindows([page, ...windows.filter((str) => str !== page)]);
  };

  return (
    <main className="relative h-dvh w-dvw select-none overflow-hidden transition-all">
      <SongProvider>
        <>
          <Content pages={PAGES} windows={windows} t={t} handleWindows={handleWindows} handleWindowsPriority={handleWindowsPriority} />
          <CurrentSong />
        </>
      </SongProvider>

      <Toolbar pages={PAGES} handler={handleWindows} />
      <Demo />
    </main>
  );
}

export default App;
