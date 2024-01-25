import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Initialize the i18n of the web page.
 */
const useLanguageInit = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(storedLanguage);
    localStorage.setItem('language', storedLanguage);
  }, [i18n]);

  return;
};

export default useLanguageInit;
