import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

/** True on phone-sized viewports, where windows go full-screen and dragging is off. */
const useIsMobile = () => {
  const [mobile, setMobile] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setMobile(media.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return mobile;
};

export default useIsMobile;
