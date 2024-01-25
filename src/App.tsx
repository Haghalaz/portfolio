import './i18n.js';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useLanguageInit from '@hooks/useLanguageInit';
import useThemeInit from '@hooks/useThemeInit';

import PAGES from '@data/pages.js';

import Toolbar from '@components/toolbar/';
import Content from '@components/content/';

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
    <main className="relative h-screen w-screen select-none overflow-hidden transition-all">
      <Content pages={PAGES} windows={windows} t={t} handleWindows={handleWindows} handleWindowsPriority={handleWindowsPriority} />
      <Toolbar pages={PAGES} handler={handleWindows} />
    </main>
  );
}

export default App;
