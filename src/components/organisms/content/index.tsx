import Window from '@organisms/window';
import { PageType } from '@data/pages.ts';
import { TFunction } from 'i18next';

type ContentProps = {
  pages: PageType[];
  windows: string[];
  t: TFunction<'translation', undefined>;
  handleWindows: (page: string) => void;
  handleWindowsPriority: (page: string) => void;
};

function Content({ pages, windows, t, handleWindows, handleWindowsPriority }: ContentProps) {
  return (
    <div className="absolute grid h-full w-full place-items-center">
      {pages.map(
        ({ page: Page, name, size }) =>
          Page && (
            <Window key={name} windows={windows} handleOpen={handleWindows} handlePriority={handleWindowsPriority} variant={size} name={name}>
              <Page t={t}></Page>
            </Window>
          )
      )}
    </div>
  );
}

export default Content;
