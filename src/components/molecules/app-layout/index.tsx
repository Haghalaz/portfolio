import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export type SidebarItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** CSS color for a calendar-style dot. */
  dot?: string;
  count?: number;
};

export type SidebarSection = {
  heading?: string;
  items: SidebarItem[];
};

type AppLayoutProps = {
  label: string;
  sections: SidebarSection[];
  /** Ids that are currently selected (a single one for "select" mode, any number for "toggle"). */
  activeIds: string[];
  /** "toggle" behaves like Calendar's checkboxes; "select" like a Finder/Photos/Music sidebar. */
  mode?: 'select' | 'toggle';
  onSelect: (id: string) => void;
  children: ReactNode;
};

/** macOS-style app chrome: a minimal source list on the left (a tab strip on phones) and the content on the right. Styles live in index.css (.sidebar*). */
export const AppLayout = ({ label, sections, activeIds, mode = 'select', onSelect, children }: AppLayoutProps) => (
  <div className="flex h-full flex-col sm:flex-row">
    <nav aria-label={label} className="sidebar">
      {sections.map((section, index) => (
        <div key={section.heading ?? index} className="sidebar-group">
          {section.heading && <p className="sidebar-heading">{section.heading}</p>}

          {section.items.map(({ id, label: itemLabel, icon: Icon, dot, count }) => {
            const active = activeIds.includes(id);

            return (
              <button key={id} type="button" onClick={() => onSelect(id)} className="sidebar-item" {...(mode === 'toggle' ? { 'aria-pressed': active } : { 'aria-current': active })}>
                {Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
                {dot && <span aria-hidden className="size-2.5 shrink-0 rounded-full border-[1.5px] transition-colors" style={{ borderColor: dot, backgroundColor: active ? dot : 'transparent' }} />}
                <span className="grow truncate">{itemLabel}</span>
                {count !== undefined && <span className="sidebar-count">{count}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </nav>

    <div className="min-h-0 min-w-0 grow">{children}</div>
  </div>
);
