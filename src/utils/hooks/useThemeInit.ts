import { useEffect } from 'react';

/**
 * Initialize the theme of the web page.
 */
const useThemeInit = () => {
  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.theme = isDarkMode ? 'dark' : 'light';
  }, []);

  return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
};

export default useThemeInit;
