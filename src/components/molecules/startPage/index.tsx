import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import profilePic from '@assets/imgs/profilePic.jpeg';

import { Avatar, Button } from '@material-tailwind/react';

import { AiOutlineArrowRight } from 'react-icons/ai';

const LockPage = () => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(new Date().toLocaleDateString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long' }));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            <Avatar src={profilePic} size="sm" alt="avatar" />
            <h5 className="text-lg font-semibold ">{t('Dev')}</h5>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button className="flex items-center gap-2" variant="outlined" color="white" onClick={() => setOpen(false)} fullWidth>
            {t('Enter')}
            <AiOutlineArrowRight />
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default LockPage;
