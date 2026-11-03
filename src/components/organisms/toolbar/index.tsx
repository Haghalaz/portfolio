import { ToolbarCardContent } from '@atoms/toolbar-card-content.tsx';
import { ToolbarContent } from '@molecules/toolbar-content';
import { ToolbarCard } from '@molecules/toolbar-card';
import { ToolbarDivider } from '@atoms/toolbar-divider.tsx';

import { PageType } from '@data/pages.ts';

type ToolbarProps = {
  pages: PageType[];
  windows: string[];
  handler: (page: string) => void;
};

const Toolbar = ({ pages, windows, handler }: ToolbarProps) => {
  return (
    <ToolbarContent>
      {pages.map(({ name, icon, gradient }) =>
        icon && gradient ? (
          <ToolbarCard handler={handler} page={name} active={windows.includes(name)} key={name}>
            <ToolbarCardContent page={name} icon={icon} gradient={gradient} />
          </ToolbarCard>
        ) : (
          <ToolbarDivider key={name} />
        )
      )}
    </ToolbarContent>
  );
};

export default Toolbar;
