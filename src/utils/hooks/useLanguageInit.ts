import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Initialize the i18n of the web page and keep <html lang> in sync with it.
 */
const useLanguageInit = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');
    i18n.changeLanguage(storedLanguage);
    localStorage.setItem('language', storedLanguage);
  }, [i18n]);

  useEffect(() => {
    const sync = (language: string) => (document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en');

    sync(i18n.language);
    i18n.on('languageChanged', sync);
    return () => i18n.off('languageChanged', sync);
  }, [i18n]);
};

export default useLanguageInit;
