import { useState } from 'react';
import { TFunction } from 'i18next';

import PROJECTS from '@data/projects.ts';

import { Flower, Github, X } from 'lucide-react';

import { Button } from '@atoms/button.tsx';

type PageProps = {
  t: TFunction<'translation', undefined>;
};

export default function Projects({ t }: PageProps) {
  const [currentProject, setCurrentProject] = useState(PROJECTS[0]);
  const [open, setOpen] = useState(false);

  const handleCurrentProject = (index: number) => () => {
    setCurrentProject(PROJECTS[index]);
    setOpen(true);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="pattern-light dark:pattern-dark flex w-full flex-col items-start gap-4 bg-[#f1f1f1] bg-clip-border p-2 dark:bg-stone-900/90 dark:text-white">
        <div className="relative flex h-24 w-full items-center justify-center rounded-xl bg-cover">
          <div className="absolute z-10 flex items-center justify-center gap-2">
            <Flower className="h-6 w-6" />
            <p className="text-2xl font-bold">{t('ProjectsGallery')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        {PROJECTS.map(({ id, title, src, skills }, index) => (
          <div key={id} onClick={handleCurrentProject(index)}>
            <div className="flex w-full cursor-pointer flex-col gap-4 rounded-md bg-stone-50/70 p-3 opacity-80 hover:opacity-100 dark:bg-stone-900/70">
              <img className="h-52 w-full rounded-sm object-cover" src={src} alt={`${title} Cover`} loading="lazy" />

              <div className="grid w-full grid-cols-2 items-center justify-between gap-2">
                <p className="max-w-1/3 truncate text-lg font-medium">{t(title)}</p>

                <div className="flex justify-end gap-2">
                  {skills.map((skill) => (
                    <img key={skill} className="size-6" src={`https://skillicons.dev/icons?i=${skill}`} alt={`${skill} logo`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="absolute bottom-0 left-0 z-50 grid size-full animate-fade-in place-content-center bg-stone-950/70 p-6 backdrop-blur backdrop-filter md:p-12">
          <div className="relative grid size-full grid-flow-row grid-cols-1 grid-rows-2 gap-y-6 overflow-hidden rounded-md bg-stone-50 p-3 backdrop-blur backdrop-filter md:p-6 lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-1 lg:gap-8 dark:bg-stone-900/90">
            <img
              className="shadow-blue-stone-500/40 h-full w-full rounded-md bg-clip-border object-cover shadow-lg lg:col-span-2 lg:block"
              src={currentProject.src}
              alt={`${currentProject.title} Cover`}
              loading="lazy"
            />

            <Button className="absolute right-4 top-4 h-max p-3" onClick={() => setOpen(false)} aria-label="See project on GitHub">
              <X className="size-4" />
            </Button>

            <div className="col-span-4 flex h-full flex-col justify-between gap-8 overflow-auto">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-sans text-xl font-medium ">{t(currentProject.title)}</h5>
                </div>
                <p className="font-sans text-base font-light leading-relaxed">{t(currentProject.description)}</p>
              </div>

              <div className="space-y-2">
                <p className="text-center font-sans text-sm font-medium lg:text-start">{t('TechnologiesUsed')}</p>
                <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
                  <div className="group inline-flex flex-wrap items-center gap-3">
                    {currentProject.skills.map((skill) => (
                      <img key={skill} className="size-8" src={`https://skillicons.dev/icons?i=${skill}`} alt={`${skill} logo`} />
                    ))}
                  </div>

                  <a href={currentProject.repo} target="_blank">
                    <Button className="flex items-center gap-2 bg-black" aria-label="See project on GitHub">
                      <Github className="h-4 w-4" />
                      Github
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
