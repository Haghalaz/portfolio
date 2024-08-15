import { useState } from 'react';

import { X } from 'lucide-react';

import DemoVideo from '@assets/videos/PortfolioDemo.mp4';

const Demo = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 right-0 m-6 hidden aspect-video w-[24rem] select-none rounded-md bg-white ring-2 ring-white lg:block">
          <button className="absolute right-2 top-2 z-10 rounded-md bg-gray-800 p-1" aria-label="Close video" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5 fill-white" />
          </button>
          <video className="h-full w-full rounded-md" autoPlay loop muted>
            <source src={DemoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

export default Demo;
