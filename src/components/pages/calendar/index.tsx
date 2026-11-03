import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Building2, Home, MapPin } from 'lucide-react';

import CAREER, { CompanyType, RoleType } from '@data/career.ts';

import { CompanyLogo } from '@atoms/company-logo.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@atoms/tooltip.tsx';
import { AppLayout, SidebarSection } from '@molecules/app-layout';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

/** Absolute month index (year * 12 + month) so ranges can be compared and sliced per year. */
const monthIndex = (value: string) => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

const NOW = new Date();
const NOW_INDEX = NOW.getFullYear() * 12 + NOW.getMonth();

/** [start, end) in month indexes; the current role runs through the current month. */
const rangeOf = ({ start, end }: { start: string; end?: string }) => [monthIndex(start), end ? monthIndex(end) : NOW_INDEX + 1] as const;

/** Every stretch of a role, [start, end) in month indexes (a role without breaks has exactly one). */
const rangesOf = (role: RoleType) => (role.periods ? role.periods.map(rangeOf) : [rangeOf(role)]);

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

const ALL_IDS = CAREER.map(({ id }) => id);
const FIRST_YEAR = Math.floor(Math.min(...CAREER.flatMap(({ roles }) => roles.map((role) => rangeOf(role)[0]))) / 12);
const YEARS = Array.from({ length: NOW.getFullYear() - FIRST_YEAR + 1 }, (_, index) => NOW.getFullYear() - index);

/** Calendar-style app: each company is a calendar, each role an event on the timeline. */
export default function Calendar({ t }: PageProps) {
  const { i18n } = useTranslation();
  const [visibleIds, setVisibleIds] = useState<string[]>(ALL_IDS);
  // "company:role" currently hovered/focused (a bar's tooltip stays open while the pointer is on its card, so the highlight does too); every segment of that role (across years) stays lit, the rest fade.
  const [focused, setFocused] = useState<string | null>(null);
  const focusProps = (key: string) => ({
    onPointerEnter: () => setFocused(key),
    onPointerLeave: () => setFocused(null),
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(null),
  });

  const workMode = (company: CompanyType) => {
    const Icon = company.mode === 'remote' ? Home : Building2;
    return (
      <>
        <Icon className="size-3" aria-hidden />
        {t(company.mode === 'remote' ? 'WorkRemote' : 'WorkOnSite')}
      </>
    );
  };

  const companies = CAREER.filter(({ id }) => visibleIds.includes(id));

  // Jobs and education are separate groups in the sidebar, each with its own on/off toggles.
  const group = (heading: string, kind: CompanyType['kind']) => ({
    heading,
    items: CAREER.filter((company) => company.kind === kind).map(({ id, name, color }) => ({ id, label: name, dot: color })),
  });

  const sections: SidebarSection[] = [group(t('CalendarCareer'), undefined), group(t('CalendarEducation'), 'education')].filter(
    ({ items }) => items.length > 0
  );

  const toggle = (id: string) => setVisibleIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const monthLabels = useMemo(
    () => Array.from({ length: 12 }, (_, month) => new Date(2000, month, 1).toLocaleDateString(i18n.language, { month: 'narrow' })),
    [i18n.language]
  );

  const formatDate = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString(i18n.language, { month: 'short', year: 'numeric' });
  };

  const rangeLabel = (role: RoleType) => `${formatDate(role.start)} – ${role.end ? formatDate(role.end) : t('Present')}`;

  const duration = (role: RoleType) => {
    const total = Math.max(
      1,
      rangesOf(role).reduce((sum, [from, to]) => sum + (to - from), 0)
    );
    const years = Math.floor(total / 12);
    const months = total % 12;

    return [years > 0 && t('Year', { count: years }), months > 0 && t('Month', { count: months })].filter(Boolean).join(' ');
  };

  /** The slices of a role that fall inside `year`, as CSS grid columns (1-based, end exclusive). */
  const segmentsIn = (role: RoleType, year: number) =>
    rangesOf(role).flatMap(([from, rangeEnd]) => {
      // Explicit periods end on their last month, so the bar covers it; the duration still counts month differences.
      const to = role.periods ? rangeEnd + 1 : rangeEnd;
      const start = Math.max(from, year * 12);
      const end = Math.min(to, (year + 1) * 12);

      return start < end ? [{ columns: [start - year * 12 + 1, end - year * 12 + 1] as const, startsHere: Math.floor(from / 12) === year }] : [];
    });

  const roleBar = (company: CompanyType, role: RoleType, year: number) => {
    const current = !role.end;
    const key = `${company.id}:${role.title}`;
    const opacity = focused === null ? (current ? 1 : 0.8) : focused === key ? 1 : 0.18;

    return segmentsIn(role, year).map(({ columns, startsHere }) => (
      <Tooltip key={`${role.title}-${year}-${columns[0]}`} onOpenChange={(open) => setFocused((current) => (open ? key : current === key ? null : current))}>
        <TooltipTrigger asChild>
          <li
            tabIndex={0}
            className="flex cursor-default items-center overflow-hidden whitespace-nowrap rounded px-1.5 text-[10px] font-medium leading-none text-white outline-none transition-[filter,opacity] hover:z-10 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:brightness-110"
            style={{ gridRow: 1, gridColumn: `${columns[0]} / ${columns[1]}`, backgroundColor: company.color, opacity }}
          >
            {startsHere || columns[1] - columns[0] > 3 ? t(role.title) : ''}
          </li>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          sideOffset={8}
          className="w-72 animate-pop rounded-xl border border-black/10 bg-white p-3 text-stone-900 shadow-2xl dark:border-white/10 dark:bg-stone-900 dark:text-white"
        >
          <div className="flex items-center gap-3">
            <CompanyLogo company={company} className="size-10 rounded-lg" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">{company.name}</p>
              <p className="font-mono text-[11px] opacity-60">{t(company.type)}</p>
            </div>
          </div>

          <div className="mt-3 space-y-1 border-t border-black/10 pt-3 dark:border-white/10">
            <p className="flex items-center gap-2 text-sm font-medium">
              <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: company.color }} />
              {t(role.title)}
            </p>
            <p className="font-mono text-[11px] opacity-70">
              {rangeLabel(role)} · {duration(role)}
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] opacity-60">
              {company.mode && <span className="flex items-center gap-1">{workMode(company)}</span>}
              {role.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" aria-hidden />
                  {t(role.location)}
                </span>
              )}
            </p>
            {role.note && <p className="text-[11px] italic opacity-60">{t(role.note)}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    ));
  };

  return (
    <AppLayout label="Calendar" sections={sections} activeIds={visibleIds} mode="toggle" onSelect={toggle}>
      <div className="h-full overflow-auto bg-[#f1f1f1]/80 px-4 py-6 sm:px-8 dark:bg-stone-900/80 dark:text-white">
        <header className="mb-6 space-y-2">
          <h1 className="reveal font-display text-2xl leading-tight sm:text-4xl">{t('CareerTitle')}</h1>
          <p className="reveal text-sm opacity-70" style={delay(80)}>
            {t('CareerIntro')}
          </p>
        </header>

        <TooltipProvider delayDuration={60} skipDelayDuration={300}>
          <section aria-label={t('Timeline')} className="reveal space-y-1" style={delay(160)}>
            <div className="grid grid-cols-[2.5rem_1fr] gap-2" aria-hidden>
              <span />
              <div className="grid grid-cols-12 text-center font-mono text-[10px] opacity-50">
                {monthLabels.map((label, index) => (
                  <span key={index}>{label}</span>
                ))}
              </div>
            </div>

            {YEARS.map((year) => {
              const lanes = companies.filter((company) => company.roles.some((role) => segmentsIn(role, year).length > 0));

              return (
                <div key={year} className="grid grid-cols-[2.5rem_1fr] items-center gap-2">
                  <span className="font-mono text-xs opacity-60">{year}</span>

                  <div className="relative min-h-7 rounded bg-black/[0.04] py-0.5 dark:bg-white/[0.05]">
                    <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-12">
                      {monthLabels.map((_, index) => (
                        <span key={index} className="border-l border-black/5 first:border-l-0 dark:border-white/5" />
                      ))}
                    </div>

                    {lanes.map((company) => (
                      <ul key={company.id} className="relative grid h-5 grid-cols-12 gap-px py-px">
                        {company.roles.map((role) => roleBar(company, role, year))}
                      </ul>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </TooltipProvider>

        <section aria-label={t('Agenda')} className="mt-10 space-y-10">
          {companies.map((company, companyIndex) => (
            <div key={company.id} className="reveal" style={delay(240 + companyIndex * 120)}>
              <div className="mb-4 flex items-center gap-3">
                <CompanyLogo company={company} className="size-11 rounded-xl shadow-md" />
                <div className="leading-tight">
                  <h2 className="font-semibold">{company.name}</h2>
                  <p className="mt-0.5 font-mono text-xs opacity-60">{t(company.type)}</p>
                </div>
              </div>

              {/* The rail runs through the centre of the 44px logo (22px from the left); each 12px dot sits on that same line, and the text lines up with the company name. */}
              <ol
                className="relative space-y-1 before:absolute before:bottom-4 before:left-[21px] before:top-4 before:w-0.5 before:rounded-full before:bg-[var(--c)] before:opacity-30"
                style={{ '--c': company.color } as React.CSSProperties}
              >
                {company.roles.map((role) => {
                  const current = !role.end;

                  return (
                    <li key={`${role.title}-${role.start}`} className="relative pl-14">
                      <span
                        aria-hidden
                        className={`absolute left-4 top-4 size-3 rounded-full ${current ? 'animate-pulse' : ''}`}
                        style={{ backgroundColor: company.color, boxShadow: current ? `0 0 0 6px ${company.color}40` : undefined }}
                      />

                      <div
                        {...focusProps(`${company.id}:${role.title}`)}
                        className="rounded-lg px-3 py-2.5 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{t(role.title)}</h3>
                          {current && (
                            <span className="rounded-full px-2 py-0.5 font-mono text-[10px] text-white" style={{ backgroundColor: company.color }}>
                              {t('Present')}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 font-mono text-xs opacity-60">
                          {rangeLabel(role)} · {duration(role)}
                        </p>

                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-60">
                          {company.mode && <span className="flex items-center gap-1">{workMode(company)}</span>}
                          {role.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3" aria-hidden />
                              {t(role.location)}
                            </span>
                          )}
                        </p>

                        {role.note && <p className="mt-1 text-xs italic opacity-60">{t(role.note)}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
