import { TFunction } from 'i18next';
import { ArrowUpRight, SquarePen } from 'lucide-react';

import LINKS, { EMAIL } from '@data/links.ts';
import { ExternalLink } from '@atoms/external-link.tsx';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

/** Mail-style app: a "new message" addressed to me; the send buttons are the real channels. */
export default function Mail({ t }: PageProps) {
  return (
    <div className="flex min-h-full flex-col bg-[#f1f1f1]/80 dark:bg-stone-900/80 dark:text-white">
      <div className="flex items-center gap-2 border-b border-black/10 px-5 py-3 font-mono text-xs opacity-70 dark:border-white/10">
        <SquarePen className="size-3.5" aria-hidden />
        {t('NewMessage')}
      </div>

      <dl className="divide-y divide-black/10 px-5 text-sm dark:divide-white/10">
        <div className="flex gap-3 py-2.5">
          <dt className="w-16 shrink-0 font-mono text-xs opacity-50">{t('MailTo')}</dt>
          <dd className="rounded-full bg-black/10 px-2.5 py-0.5 text-xs dark:bg-white/10">
            {t('Dev')} <span className="opacity-60">&lt;{EMAIL}&gt;</span>
          </dd>
        </div>
        <div className="flex gap-3 py-2.5">
          <dt className="w-16 shrink-0 font-mono text-xs opacity-50">{t('MailSubject')}</dt>
          <dd className="font-medium">{t('ContactTitle')}</dd>
        </div>
      </dl>

      <div className="flex grow flex-col justify-between gap-6 border-t border-black/10 p-5 dark:border-white/10">
        <p className="reveal max-w-sm text-sm leading-relaxed" style={delay(100)}>
          {t('ContactText')}
        </p>

        <ul className="space-y-2.5">
          {LINKS.map(({ id, label, href, icon: Icon, tone }, index) => (
            <li key={id} className="reveal" style={delay(200 + index * 90)}>
              <ExternalLink
                href={href}
                className="group flex items-center gap-4 rounded-xl border border-stone-900/10 bg-white/60 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <span
                  className={`grid size-11 place-items-center rounded-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${tone}`}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="grow text-lg font-semibold">{label}</span>
                <ArrowUpRight
                  className="size-5 opacity-40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  aria-hidden
                />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
