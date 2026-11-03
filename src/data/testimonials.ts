export type TestimonialType = {
  id: string;
  /** Full name, as on LinkedIn. */
  name: string;
  /** i18n key of the person's title. */
  role: string;
  profile: string;
  /** "YYYY-MM-DD": the day they worked on the same team, as LinkedIn shows it. */
  date: string;
  /** Kept in the language it was written in; it is a quote, so it is never translated. */
  text: string;
};

/** Real LinkedIn recommendations only. */
const TESTIMONIALS: TestimonialType[] = [
  {
    id: 'joao-victor',
    name: 'João Victor de Souza Lima Santos',
    role: 'RoleTechLead',
    profile: 'https://www.linkedin.com/in/f-uba/',
    date: '2023-03-22',
    text: 'Sempre em busca de aprender a aberto a novas ideias. Grande diferencial é a busca pela melhoria contínua de seus projetos, gerando entregas de valor a empresa e ao time.',
  },
];

export default TESTIMONIALS;
