import { ToolbarCardContent } from '@atoms/toolbar-card-content.tsx';
import { ToolbarContent } from '@molecules/toolbar-content';
import { ToolbarCard } from '@molecules/toolbar-card';
import { ToolbarDivider } from '@atoms/toolbar-divider.tsx';

import { PageType } from '@data/pages.ts';

type ToolbarProps = {
  pages: PageType[];
  handler: (page: string) => void;
};

const Toolbar = ({ pages, handler }: ToolbarProps) => {
  return (
    <ToolbarContent>
      {pages.map(({ name, src }, index) =>
        src ? (
          <ToolbarCard handler={handler} page={name} key={index}>
            <ToolbarCardContent page={name} src={src} />
          </ToolbarCard>
        ) : (
          <ToolbarDivider key={index} />
        )
      )}
    </ToolbarContent>
  );
};

export default Toolbar;
