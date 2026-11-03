import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { X } from 'lucide-react';

import { useSettings } from '@contexts/settingsContext.tsx';
import useReducedMotion from '@hooks/useReducedMotion.ts';
import { asset } from '@utils/asset';

/** Small picture-in-picture clip of the portfolio in use. Mounted only after the lock screen is dismissed. */
const Demo = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const { settings, update } = useSettings();
  const [isLoading, setIsLoading] = useState(true);

  if (!settings.demo) return null;

  return (
    <div className="absolute bottom-6 right-6 z-[60] hidden aspect-video w-[22rem] animate-pop select-none overflow-hidden rounded-lg bg-stone-900 shadow-2xl ring-1 ring-white/60 2xl:block">
      <button
        aria-label={t('Close')}
        className="absolute right-2 top-2 z-10 rounded-md bg-stone-200 p-1 transition-transform hover:scale-110 dark:bg-stone-800"
        onClick={() => update({ demo: false })}
      >
        <X className="size-4" />
      </button>

      <video
        className="size-full object-cover"
        autoPlay={!reduced}
        controls={reduced}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={t('DemoLabel')}
        onLoadedData={() => setIsLoading(false)}
      >
        <source src={asset('assets/videos/PortfolioDemo.mp4')} type="video/mp4" />
      </video>

      {isLoading && <div className="absolute top-0 size-full animate-pulse bg-stone-300" />}
    </div>
  );
};

export default Demo;
