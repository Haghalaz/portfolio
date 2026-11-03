import { TECH } from '@data/tech.ts';
import { techIcon } from '@utils/asset';

/** Pill with a technology's icon (when it has one) and name. */
export const TechChip = ({ id }: { id: string }) => {
  const tech = TECH[id] ?? { label: id };

  return (
    <li className="flex items-center gap-2 rounded-full border border-white/20 py-1 pl-1 pr-3 text-xs">
      {tech.local && <img className="size-5 rounded" src={techIcon(id)} alt="" />}
      {tech.simple && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5 rounded p-0.5">
          <path d={tech.simple.path} />
        </svg>
      )}
      {!tech.local && !tech.simple && <span aria-hidden className="ml-2 size-1.5 rounded-full bg-white/40" />}
      {tech.label}
    </li>
  );
};
