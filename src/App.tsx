import './i18n.js';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useLanguageInit from '@hooks/useLanguageInit';
import useThemeInit from '@hooks/useThemeInit';

import PAGES from '@data/pages.js';

import Toolbar from '@components/toolbar/';
import Content from '@components/content/';
import Demo from '@components/demo/';
import CurrentSong from '@components/currentSong';

import { SongProvider } from '@src/utils/contexts/songContext.tsx';

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
