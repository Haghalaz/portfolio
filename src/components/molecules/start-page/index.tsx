import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ArrowRight } from 'lucide-react';

import profilePic from '@assets/imgs/profilePic.jpeg';

import useDateTime from '@hooks/useDateTime.tsx';

import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar.tsx';
import { Button } from '@atoms/button.tsx';

const LockPage = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const { time, date } = useDateTime();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CSSTransition in={open} timeout={300} classNames="fade" unmountOnExit>
      <div className="absolute z-[99] grid size-full place-items-center text-white backdrop-blur-2xl">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <h1 className="font-sans text-9xl font-bold">{time}</h1>
            <h4 className="font-sans text-xl font-light">{date}</h4>
          </div>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={profilePic} alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h5 className="text-lg font-semibold ">{t('Dev')}</h5>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => setOpen(false)}>
            {t('Enter')}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default LockPage;
