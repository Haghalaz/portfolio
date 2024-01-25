import profilePic from '@assets/imgs/profilePic.jpeg';
import { Avatar } from '@material-tailwind/react';
import { PageProps } from '@src/data/pages';
import { BsWhatsapp } from 'react-icons/bs';

export default function About({ t }: PageProps) {
  return (
    <div className="grid h-full">
      <div className="relative flex w-full flex-col items-center bg-[#f1f1f1] bg-clip-border  p-4 dark:bg-gray-900/90 dark:text-white dark:!shadow-none">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <div className="absolute flex h-32 w-full justify-center rounded-xl bg-[url(https://e1.pxfuel.com/desktop-wallpaper/847/151/desktop-wallpaper-fondos-de-pantalla-de-programacion-y-desarrollo-web-reactjs.jpg)] bg-cover bg-center bg-no-repeat" />

          <Avatar
            className="absolute -bottom-12 flex h-32  w-32 items-center justify-center rounded-full border-4 border-[#f1f1f1]  contrast-100 saturate-50"
            src={profilePic}
            placeholder={undefined}
          />
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-2xl font-bold ">{t('Dev')}</h2>
          <small className="text text-sm font-normal dark:text-secondary ">{t('ShortDescription')}</small>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-4 py-6">
        <div className="relative col-span-2 flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#f1f1f1] bg-clip-border p-4 dark:bg-gray-900/90 dark:text-white dark:!shadow-none">
          <div className="h-full space-y-4">
            <h2 className="self-start text-2xl font-bold">{t('AboutMe')}</h2>
            <p className="text text-justify text-base font-thin tracking-wide">{t('Description')}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="relative flex w-full grow flex-col items-center justify-between  rounded-md bg-[#f1f1f1]/70 bg-clip-border p-4 dark:bg-gray-900/70 dark:text-white dark:!shadow-none">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=haghalaz&layout=compact&locale=${t(
                'locale'
              )}&hide_border=true&title_color=61DBFB&text_color=fefefe&bg_color=0d1117`}
            />
          </div>

          <div className="relative flex w-full grow flex-row items-center justify-center gap-8 rounded-md bg-[#f1f1f1]/70 bg-clip-border px-12 py-4 transition-shadow dark:bg-gray-900/70 dark:text-white dark:!shadow-none">
            <a href="https://github.com/Haghalaz" target="_blank">
              <Avatar
                src="https://skillicons.dev/icons?i=github"
                className="shadow-lg hover:shadow-gray-500/70"
                size="sm"
                alt="avatar"
                variant="rounded"
                placeholder={undefined}
              />
            </a>

            <a href="https://br.linkedin.com/in/luiz-coelho-neto" target="_blank">
              <Avatar
                src="https://skillicons.dev/icons?i=linkedin"
                className="shadow-lg hover:shadow-blue-500/70"
                size="sm"
                alt="avatar"
                variant="rounded"
                placeholder={undefined}
              />
            </a>

            <a href="https://wa.me/5541995573573" target="_blank">
              <div className=" rounded-md bg-green-600 p-1.5 shadow-lg hover:shadow-green-500">
                <BsWhatsapp className="h-6 w-6 fill-white"></BsWhatsapp>
              </div>
            </a>
          </div>

          <div className="relative flex w-full flex-col items-center rounded-md bg-[#f1f1f1]/70 bg-clip-border p-4 dark:bg-gray-900/70 dark:text-white dark:!shadow-none">
            <a href="https://www.codewars.com/users/Haghalaz" target="_blank">
              <img className="shadow-lg hover:shadow-gray-800/20" src="https://www.codewars.com/users/Haghalaz/badges/large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
