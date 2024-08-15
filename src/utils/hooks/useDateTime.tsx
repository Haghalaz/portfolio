import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useDateTime = () => {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(() => new Date().toLocaleDateString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long' }));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long' }));
    }, 1000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  return { time, date };
};

export default useDateTime;
