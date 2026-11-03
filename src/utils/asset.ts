/** Resolves a path inside /public honoring the Vite `base` (the site is served from /portfolio/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const techIcon = (id: string) => asset(`assets/icons/${id}.svg`);
