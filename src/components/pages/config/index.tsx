import { useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { CircleFlag } from 'react-circle-flags';
import { Player, PlayerDirection } from '@lottiefiles/react-lottie-player';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import useThemeInit from '@hooks/useThemeInit.ts';

import { Button } from '@atoms/button.tsx';

type Theme = 'light' | 'dark';

type PageProps = {
  t: TFunction<'translation', undefined>;
};

export default function Config({ t }: PageProps) {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [theme, setTheme] = useState<Theme>(useThemeInit());
  const animation = useRef<Player>(null);

  const [springs, api] = useSpring(() => ({ from: { opacity: 1, rotate: 0, scale: 1 } }));

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const newDirection: PlayerDirection = theme === 'light' ? -1 : 1;

    animation.current?.setPlayerDirection(newDirection);
    animation.current?.play();

    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    changeLanguage(newLanguage).then(() => (localStorage.language = newLanguage));

    api.start({ from: { scale: 1.2, opacity: 0.5, rotate: 0 }, to: { scale: 1, opacity: 1, rotate: 360 } });
  };

  return (
    <div className="flex h-full w-full select-none flex-col justify-between overflow-hidden px-4 py-3">
      <div className="text-start" onClick={switchTheme}>
        <small className="font-extrathin dark:text-secondary">{t('Theme')}</small>

        <div className="flex cursor-pointer items-center gap-2">
          <Button aria-label="Change theme" className="h-8 w-8 rounded-full p-2">
            <Player
              ref={animation}
              keepLastFrame={true}
              speed={2}
              src="https://lottie.host/08cb9f05-4ade-42f5-a853-fc39159926b6/DSeqTEo6ka.json"
              style={{ height: '20px', width: '20px' }}
            />
          </Button>
          <small className="font-bold">{t(theme)}</small>
        </div>
      </div>

      <div className="text-start" onClick={switchLanguage}>
        <small className="font-extrathin dark:text-secondary">{t('Language')}</small>

        <div className="flex cursor-pointer items-center gap-2">
          <Button aria-label="Change language" className="h-8 w-8 rounded-full p-1.5">
            <animated.div style={{ ...springs }}>
              <CircleFlag className="h-full w-full" countryCode={language === 'en' ? 'us' : 'br'} />
            </animated.div>
          </Button>

          <small className="font-bold">{t(language)}</small>
        </div>
      </div>
    </div>
  );
}
