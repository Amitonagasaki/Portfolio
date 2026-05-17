import { useState, useEffect } from 'react';
import gsap from 'gsap';

const BOOT_MESSAGES = [
  'Initializing kernel...',
  'Loading system resources...',
  'Mounting file system...',
  'Starting window manager...',
  'Loading portfolio assets...',
  'Applying preferences...',
  'Welcome.',
];

const DURATION = 500; // total loader time in ms

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(Math.floor(p));

      const msgIndex = Math.min(
        Math.floor((p / 100) * (BOOT_MESSAGES.length - 1)),
        BOOT_MESSAGES.length - 1
      );
      setMessageIndex(msgIndex);

      if (p >= 100) {
        clearInterval(tick);
        setTimeout(() => setDone(true), 300);
      }
    }, 30);

    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!done) return;
    gsap.to('#loader', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [done,onComplete]);

  return (
    <div
      id="loader"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black select-none"
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>

        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-white/40 text-xs font-mono tracking-widest mt-6">
        {BOOT_MESSAGES[messageIndex]}
      </p>
    </div>
  );
};

export default Loader;