import { Player, PlayerDirection } from '@lottiefiles/react-lottie-player';
import { IconButton, Typography } from '@material-tailwind/react';
import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import useThemeInit from '@hooks/useThemeInit';

import { PageProps } from '@src/data/pages';
type Theme = 'light' | 'dark';

export default function Config({ t }: PageProps) {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [theme, setTheme] = useState<Theme>(useThemeInit());
  const animation = useRef<Player>();

  const [springs, api] = useSpring(() => ({ from: { opacity: 1, rotate: 0, scale: 1 } }));

  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    localStorage.language = newLanguage;
    changeLanguage(newLanguage);
  };

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const newDirection: PlayerDirection = theme === 'light' ? -1 : 1;

    animation.current?.setPlayerDirection(newDirection);
    animation.current?.play();

    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const triggerAnimation = () => {
    api.start({
      from: { scale: 1.2, opacity: 0.5, rotate: 0 },
      to: { scale: 1, opacity: 1, rotate: 360 },
    });
  };

  return (
    <div className="flex h-full w-full select-none flex-col justify-between overflow-hidden px-4 py-3">
      <div className="text-start" onClick={switchTheme}>
        <Typography variant="small" placeholder={t('ThemeDscr')} className="font-extrathin dark:text-secondary">
          {t('Theme')}
        </Typography>

        <div className="flex cursor-pointer items-center gap-2">
          <IconButton aria-label="Change theme" className="h-8 w-8 rounded-full p-2" variant={theme === 'light' ? 'filled' : 'text'} ripple={false}>
            <Player
              ref={animation as React.LegacyRef<Player>}
              keepLastFrame={true}
              speed={2}
              src="https://lottie.host/08cb9f05-4ade-42f5-a853-fc39159926b6/DSeqTEo6ka.json"
              style={{ height: '20px', width: '20px' }}
            />
          </IconButton>
          <Typography variant="small" className="font-bold" placeholder={t(theme)}>
            {t(theme)}
          </Typography>
        </div>
      </div>

      <div
        className="text-start"
        onClick={() => {
          triggerAnimation();
          handleChangeLanguage();
        }}
      >
        <Typography variant="small" placeholder={t('ThemeDscr')} className="font-extrathin dark:text-secondary">
          {t('Language')}
        </Typography>

        <div className="flex cursor-pointer items-center gap-2">
          <animated.div style={{ ...springs }}>
            <IconButton aria-label="Change language" className="h-8 w-8 rounded-full p-4" variant="text" ripple={false}>
              <CircleFlag className="h-full w-full" countryCode={language === 'en' ? 'us' : 'br'} />
            </IconButton>
          </animated.div>
          <Typography variant="small" className="font-bold" placeholder={t(language)}>
            {t(language)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
