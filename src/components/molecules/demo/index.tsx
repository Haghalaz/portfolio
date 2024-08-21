import { useState } from 'react';

import { X } from 'lucide-react';

import DemoVideo from '@assets/videos/PortfolioDemo.mp4';

const Demo = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="absolute bottom-0 right-0 m-6 hidden aspect-video w-[24rem] select-none rounded-md bg-transparent bg-white ring-1 ring-white lg:block">
        <button aria-label="Close video" className="absolute right-2 top-2 z-10 rounded-md bg-stone-200 p-1 dark:bg-stone-800" onClick={() => setIsOpen(false)}>
          <X className="size-4" />
        </button>
        <video className="size-full rounded-md" autoPlay loop muted onLoadedData={() => setIsLoading(false)}>
          <source src={DemoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {isLoading && <div className="absolute top-0 size-full animate-pulse bg-stone-300" />}
      </div>
    </>
  );
};

export default Demo;
