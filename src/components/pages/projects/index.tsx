import PROJECTS from '@data/projects.ts';
import { useState } from 'react';
import { Flower, Github } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@atoms/drawer.tsx';
import { Button } from '@atoms/button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar.tsx';
import { TFunction } from 'i18next';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

export default function Projects({ t }: PageProps) {
  const [projects] = useState(PROJECTS);
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const handleCurrentProject = (index: number) => () => {
    setCurrentProject(projects[index]);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex w-full flex-col items-start gap-4 bg-[#f1f1f1] bg-clip-border p-2 dark:bg-gray-900/90 dark:text-white ">
        <div className="relative flex h-24 w-full items-center justify-center rounded-xl bg-cover">
          <div className="absolute z-10 flex items-center justify-center gap-2">
            <Flower className="h-6 w-6 fill-white" />
            <p className="text-2xl font-bold text-white">{t('ProjectsGallery')}</p>
          </div>
          <div className="absolute flex h-24 w-full rounded-xl bg-[url(https://free4kwallpapers.com/uploads/originals/2016/05/14/acer-predator-%7C-multi-color--wallpaper.jpg)] bg-cover bg-center bg-no-repeat opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        {projects.map(({ id, title, src, skills }, index) => (
          <div key={id} onClick={handleCurrentProject(index)}>
            <div className="flex w-full cursor-pointer flex-col gap-4 rounded-md bg-white p-3 opacity-80 hover:opacity-100 dark:bg-gray-900/70">
              <img className="h-52 w-full rounded-sm object-cover" src={src} alt={`${title} Cover`} loading="lazy" />

              <div className="grid w-full grid-cols-2 items-center justify-between gap-2">
                <p className="max-w-1/3 truncate text-lg font-medium">{t(title)}</p>

                <div className="flex justify-end gap-2">
                  {skills.map((skill) => (
                    <Avatar key={skill}>
                      <AvatarImage src={`https://skillicons.dev/icons?i=${skill}`} alt={`${skill} logo`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <div className=" grid h-full w-full grid-flow-row grid-cols-1 grid-rows-2 gap-y-8 overflow-auto lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-1 lg:gap-8">
              <img
                className="shadow-blue-gray-500/40 h-full w-full rounded-xl bg-clip-border object-cover shadow-lg lg:col-span-2 lg:block"
                src={currentProject.src}
                alt={`${currentProject.title} Cover`}
                loading="lazy"
              />

              <div className="col-span-4 flex h-full flex-col justify-between gap-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-sans text-xl font-medium ">{t(currentProject.title)}</h5>
                  </div>
                  <p className="line-clamp-3 font-sans text-base font-light leading-relaxed lg:line-clamp-[8]">{t(currentProject.description)}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-center font-sans text-sm font-medium lg:text-start">{t('TechnologiesUsed')}</p>
                  <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
                    <div className="group inline-flex flex-wrap items-center gap-3">
                      {currentProject.skills.map((skill) => (
                        <Avatar key={skill}>
                          <AvatarImage src={`https://skillicons.dev/icons?i=${skill}`} alt={`${skill} logo`} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
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
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
