import { asset } from '@utils/asset';

export type RoleType = {
  /** i18n key of the job title. */
  title: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; omitted for the current role. */
  end?: string;
  /** Separate stretches of one role (e.g. a degree with a break): shown as one entry, drawn with gaps on the calendar. */
  periods?: { start: string; end: string }[];
  /** i18n key of the location, when known. */
  location?: string;
  /** i18n key of an extra remark shown under the dates. */
  note?: string;
};

export type CompanyType = {
  id: string;
  name: string;
  /** i18n key, e.g. "FullTime". */
  type: string;
  /** Defaults to a job; education gets its own icon and no work mode. */
  kind?: 'education';
  /** How the work was done (jobs only). */
  mode?: 'onsite' | 'remote';
  /** Calendar colour. */
  color: string;
  /** Falls back to an icon tile when there is no logo file yet. */
  logo?: string;
  roles: RoleType[];
};

/** Jobs most recent first, then education. */
const CAREER: CompanyType[] = [
  {
    id: 'squid',
    name: 'Squid Creators',
    type: 'FullTime',
    mode: 'remote',
    color: '#ec4899',
    logo: asset('assets/images/companies/squid.webp'),
    roles: [
      { title: 'RoleFrontEndII', start: '2026-10' },
      { title: 'RoleFrontEndI', start: '2024-09', end: '2026-10' },
    ],
  },
  {
    id: 'selettra',
    name: 'Selettra Automação e Robótica',
    type: 'FullTime',
    mode: 'onsite',
    color: '#dc2626',
    logo: asset('assets/images/companies/selettra.webp'),
    roles: [
      { title: 'RoleMid', start: '2023-05', end: '2024-09', location: 'LocationParana' },
      { title: 'RoleJunior', start: '2022-09', end: '2023-05', location: 'LocationParana' },
      { title: 'RoleTrainee', start: '2022-06', end: '2022-09' },
    ],
  },
  {
    id: 'positivo',
    name: 'Universidade Positivo',
    kind: 'education',
    type: 'Bachelor',
    color: '#3d62a8',
    logo: asset('assets/images/companies/positivo.webp'),
    // Studied from Jun 2021, paused in early 2024 and came back in Jun 2024.
    roles: [
      {
        title: 'DegreeSoftwareEngineering',
        start: '2021-06',
        end: '2026-06',
        periods: [
          { start: '2021-06', end: '2023-12' },
          { start: '2024-06', end: '2026-06' },
        ],
        note: 'NoteBreak',
      },
    ],
  },
];

export default CAREER;
