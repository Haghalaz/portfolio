import { Card } from './/components/Card/index.js';
import { Dock } from './/components/Dock/index.js';
import { DockCard } from './/components/DockCard/index.js';
import { DockDivider } from './/components/DockDivider/index.js';

import { PageType } from '@src/data/pages';

type ToolbarProps = {
  pages: PageType[];
  handler: (page: string) => void;
};

const Toolbar = ({ pages, handler }: ToolbarProps) => {
  return (
    <Dock>
      {pages.map(({ name, src }, index) =>
        src ? (
          <DockCard handler={handler} page={name} key={index}>
            <Card page={name} src={src} />
          </DockCard>
        ) : (
          <DockDivider key={index} />
        )
      )}
    </Dock>
  );
};

export default Toolbar;
