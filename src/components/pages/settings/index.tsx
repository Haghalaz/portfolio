import { ReactNode, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { useSettings } from '@contexts/settingsContext.tsx';
import { STORAGE_KEYS } from '@utils/storageKeys';
import useReducedMotion from '@hooks/useReducedMotion.ts';
import useThemeInit from '@hooks/useThemeInit.ts';

import { Segmented } from '@atoms/segmented.tsx';
import { Switch } from '@atoms/switch.tsx';

type Theme = 'light' | 'dark';
type Language = 'en' | 'pt';

type PageProps = {
  t: TFunction<'translation', undefined>;
};

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

const Group = ({ title, children, at }: { title: string; children: ReactNode; at: number }) => (
  <section className="reveal space-y-2" style={delay(at)}>
    <h2 className="px-1 font-mono text-[10px] lowercase tracking-widest opacity-50">{title}</h2>
    <div className="divide-y divide-black/10 rounded-xl bg-white/60 dark:divide-white/10 dark:bg-white/5">{children}</div>
  </section>
);

const Row = ({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 px-4 py-3">
    <div className="min-w-0">
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-0.5 text-xs opacity-60">{hint}</p>}
    </div>
    {children}
  </div>
);

export default function Settings({ t }: PageProps) {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const reduced = useReducedMotion();
  const { settings, update } = useSettings();
  const [theme, setTheme] = useState<Theme>(useThemeInit());
  const [confirmClear, setConfirmClear] = useState(false);

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const switchLanguage = (newLanguage: Language) => {
    changeLanguage(newLanguage).then(() => (localStorage.language = newLanguage));
  };

  const clearSavedData = () => {
    if (!confirmClear) return setConfirmClear(true);

    STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <div className="min-h-full space-y-6 bg-[#f1f1f1]/80 p-5 dark:bg-stone-900/80 dark:text-white">
      <Group title={t('Appearance')} at={0}>
        <Row title={t('Theme')}>
          <Segmented<Theme>
            label={t('Theme')}
            value={theme}
            onChange={switchTheme}
            options={[
              { value: 'light', label: t('ThemeLight'), icon: <Sun className="size-3.5" /> },
              { value: 'dark', label: t('ThemeDark'), icon: <Moon className="size-3.5" /> },
            ]}
          />
        </Row>

        <Row title={t('Language')}>
          <Segmented<Language>
            label={t('Language')}
            value={language === 'pt' ? 'pt' : 'en'}
            onChange={switchLanguage}
            options={[
              { value: 'en', label: 'EN', icon: <CircleFlag className="size-3.5" countryCode="us" /> },
              { value: 'pt', label: 'PT', icon: <CircleFlag className="size-3.5" countryCode="br" /> },
            ]}
          />
        </Row>
      </Group>

      <Group title={t('Effects')} at={100}>
        <Row title={t('Parallax')} hint={reduced ? t('ParallaxDisabled') : t('ParallaxHint')}>
          <Switch label={t('Parallax')} checked={settings.parallax && !reduced} disabled={reduced} onChange={(parallax) => update({ parallax })} />
        </Row>

        <Row title={t('DemoVideo')} hint={t('DemoHint')}>
          <Switch label={t('DemoVideo')} checked={settings.demo} onChange={(demo) => update({ demo })} />
        </Row>
      </Group>

      <Group title={t('Data')} at={200}>
        <Row title={t('ClearData')} hint={t('DataHint')}>
          <button
            type="button"
            onClick={clearSavedData}
            onBlur={() => setConfirmClear(false)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              confirmClear ? 'bg-red-500 text-white' : 'bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20'
            }`}
          >
            <Trash2 className="size-3.5" aria-hidden />
            {confirmClear ? t('ClearDataConfirm') : t('ClearDataButton')}
          </button>
        </Row>
      </Group>
    </div>
  );
}
