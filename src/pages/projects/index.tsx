import { Avatar, Button, Drawer, Typography } from '@material-tailwind/react';
import { PageProps } from '@src/data/pages';
import PROJECTS from '@src/data/projects';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { GiTwirlyFlower } from 'react-icons/gi';

export default function Projects({ t }: PageProps) {
  const [projects] = useState(PROJECTS);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [openDetails, setOpenDetails] = useState(false);

  const handleDetails = () => setOpenDetails((prev) => !prev);

  const handleCurrentProject = (index: number) => () => {
    setCurrentProject(projects[index]);
    handleDetails();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex w-full flex-col items-start gap-4 bg-[#f1f1f1] bg-clip-border p-2 dark:bg-gray-900/90 dark:text-white ">
        <div className="relative flex h-24 w-full items-center justify-center rounded-xl bg-cover">
          <div className="absolute z-10 flex items-center justify-center gap-2">
            <GiTwirlyFlower className="h-6 w-6 fill-white" />
            <Typography className="text-2xl font-bold text-white" placeholder={undefined}>
              {t('ProjectsGallery')}
            </Typography>
          </div>
          <div className="absolute flex h-24 w-full rounded-xl bg-[url(https://free4kwallpapers.com/uploads/originals/2016/05/14/acer-predator-%7C-multi-color--wallpaper.jpg)] bg-cover bg-center bg-no-repeat opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        {projects.map(({ id, title, src, skills }, index) => (
          <div key={id} onClick={handleCurrentProject(index)}>
            <div className="flex w-full cursor-pointer flex-col gap-4 rounded-md bg-white p-3 opacity-80 hover:opacity-100 dark:bg-gray-900/70">
              <img className="h-52 w-full rounded-sm object-cover" src={src} />

              <div className="flex items-center justify-between gap-2">
                <Typography className="truncate text-lg font-medium" placeholder={undefined}>
                  {t(title)}
                </Typography>

                <div className="flex gap-2">
                  {skills.map((skill) => (
                    <Avatar key={skill} src={`https://skillicons.dev/icons?i=${skill}`} size="xs" alt="avatar" variant="rounded" placeholder={undefined} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Drawer
          placement="bottom"
          open={openDetails}
          onClose={handleDetails}
          size={400}
          className="bg-[#f1f1f1] px-4 py-6 dark:bg-gray-900"
          placeholder={undefined}
        >
          <div className=" grid h-full w-full grid-flow-row grid-cols-1 grid-rows-2 gap-y-8 overflow-auto lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-1 lg:gap-8">
            <img
              className="h-full w-full rounded-xl bg-clip-border object-cover shadow-lg shadow-blue-gray-500/40 lg:col-span-2 lg:block"
              src={currentProject.src}
            />

            <div className="col-span-4 flex h-full flex-col justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-sans text-xl font-medium ">{t(currentProject.title)}</h5>
                </div>
                <Typography className="line-clamp-3 font-sans text-base font-light leading-relaxed lg:line-clamp-[8]" placeholder={undefined}>
                  {t(currentProject.description)}
                </Typography>
              </div>

              <div className="space-y-2">
                <Typography className="text-center font-sans text-sm font-medium lg:text-start" placeholder={undefined}>
                  {t('TechnologiesUsed')}
                </Typography>
                <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
                  <div className="group inline-flex flex-wrap items-center gap-3">
                    {currentProject.skills.map((skill) => (
                      <Avatar key={skill} src={`https://skillicons.dev/icons?i=${skill}`} size="sm" alt="avatar" variant="rounded" placeholder={undefined} />
                    ))}
                  </div>
                  <a href={currentProject.repo} target="_blank">
                    <Button className="flex items-center gap-2 bg-black" placeholder={undefined}>
                      <BsGithub className="h-4 w-4" />
                      Github
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
