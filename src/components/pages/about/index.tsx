import profilePic from '@assets/imgs/profilePic.jpeg';

import { Avatar, AvatarImage } from '@atoms/avatar.tsx';
import { Phone } from 'lucide-react';
import { TFunction } from 'i18next';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

export default function About({ t }: PageProps) {
  return (
    <div className="grid h-full">
      <div className="relative flex w-full flex-col items-center bg-[#f1f1f1] bg-clip-border p-4 dark:bg-stone-900/90 dark:text-white dark:!shadow-none">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <div className="absolute flex h-32 w-full justify-center rounded-xl bg-[url(https://e1.pxfuel.com/desktop-wallpaper/847/151/desktop-wallpaper-fondos-de-pantalla-de-programacion-y-desarrollo-web-reactjs.jpg)] bg-cover bg-center bg-no-repeat" />

          <Avatar className="absolute -bottom-12 flex h-32 w-32  items-center justify-center rounded-full border-4 border-[#f1f1f1] contrast-100 saturate-50 dark:border-stone-900/90">
            <AvatarImage src={profilePic} alt={'Luiz Coelho profile pic'} />
          </Avatar>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-2xl font-bold ">{t('Dev')}</h2>
          <small className="text text-center text-sm font-normal dark:text-secondary ">{t('ShortDescription')}</small>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        <div className="relative col-span-2 flex w-full flex-row items-center justify-between gap-2 rounded-md bg-[#f1f1f1] bg-clip-border p-4 dark:bg-stone-900/90 dark:text-white dark:!shadow-none">
          <div className="h-full space-y-4">
            <h2 className="self-start text-2xl font-bold">{t('AboutMe')}</h2>
            <p className="text text-justify text-base font-thin tracking-wide">{t('Description')}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="relative flex w-full grow flex-col items-center justify-between  rounded-md bg-[#f1f1f1]/70 bg-clip-border p-4 dark:bg-stone-900/70 dark:text-white dark:!shadow-none">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=haghalaz&layout=compact&locale=${t('locale')}&hide_border=true&title_color=61DBFB&text_color=fefefe&bg_color=0d1117`}
              alt="GitHub language stats"
            />
          </div>

          <div className="relative flex w-full grow flex-row items-center justify-center gap-8 rounded-md bg-[#f1f1f1]/70 bg-clip-border px-12 py-4 transition-shadow dark:bg-stone-900/70 dark:text-white dark:!shadow-none">
            <a href="https://github.com/Haghalaz" target="_blank">
              <img className="h-8 w-8 shadow-lg hover:shadow-stone-500/70" src="https://skillicons.dev/icons?i=github" alt="GitHub logo" />
            </a>

            <a href="https://br.linkedin.com/in/luiz-coelho-neto" target="_blank">
              <img className="h-8 w-8 rounded-sm shadow-lg hover:shadow-blue-500/70" src="https://skillicons.dev/icons?i=linkedin" alt="Linkedin logo" />
            </a>

            <a href="https://wa.me/5541995573573" aria-label="Contact me using Whatsapp" target="_blank">
              <div className="rounded-md bg-green-600 p-1 shadow-lg hover:shadow-green-500">
                <Phone className="h-6 w-6 fill-white" />
              </div>
            </a>
          </div>

          <div className="relative flex w-full flex-col items-center rounded-md bg-[#f1f1f1]/70 bg-clip-border p-4 dark:bg-stone-900/70 dark:text-white dark:!shadow-none">
            <a href="https://www.codewars.com/users/Haghalaz" target="_blank">
              <img className="shadow-lg hover:shadow-stone-800/20" src="https://www.codewars.com/users/Haghalaz/badges/large" alt="Codewars badge" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
