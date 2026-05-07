import { techStack } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper'
import { Check, Flag } from 'lucide-react';
import WindowControls from '#components/WindowControls';
import { useState, useEffect } from 'react';

const Terminal = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFootnote, setShowFootnote] = useState(false);
  const [typedHeader, setTypedHeader] = useState('');

  const headerText = 'show tech stack';

  // Type the command
  useEffect(() => {
    setVisibleCount(0);
    setShowFootnote(false);
    setTypedHeader('');

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedHeader(headerText.slice(0, i));
      if (i >= headerText.length) clearInterval(typeInterval);
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  // Reveal rows one by one after typing finishes
  useEffect(() => {
    if (typedHeader.length < headerText.length) return;

    let count = 0;
    const rowInterval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= techStack.length) {
        clearInterval(rowInterval);
        setTimeout(() => setShowFootnote(true), 1000);
      }
    },880);

    return () => clearInterval(rowInterval);
  }, [typedHeader]);

  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2 className='hidden md:block'>Tech Stack</h2>
      </div>

      {/* ── 2. Terminal Body ── */}
      <div className='techstack overflow-y-auto max-h-[calc(100dvh-56px)] md:max-h-none'>

        {/* Command line */}
        <p className='flex items-center gap-2 flex-wrap'>
          <span className='font-bold'>@Amit %</span>
          <span>
            {typedHeader}
            {typedHeader.length < headerText.length && (
              <span className='animate-pulse'>▋</span>
            )}
          </span>
        </p>

        {/* Column labels */}
        {typedHeader.length >= headerText.length && (
          <div className='label'>
            <p className='w-24 md:w-32 text-xs md:text-sm'>category</p>
            <p className='text-xs md:text-sm'>Technologies</p>
          </div>
        )}

        {/* Tech rows */}
        <ul className='content'>
          {techStack.slice(0, visibleCount).map(({ category, items }) => (
            <li
              key={category}
              className='flex items-start md:items-center gap-1 flex-wrap md:flex-nowrap'
              style={{
                animation: 'fadeSlideIn 1s ease forwards',
              }}
            >
              <Check className='check mt-0.5 md:mt-0 shrink-0' size={16} />
              <h3 className='w-24 md:w-32 shrink-0 text-xs md:text-sm'>{category}</h3>
              <ul className='flex items-center gap-1.5 flex-wrap'>
                {items.map((item, i) => (
                  <li key={i} className='text-xs md:text-sm'>
                    {item}{i < items.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Loading placeholder rows */}
          {visibleCount < techStack.length && typedHeader.length >= headerText.length && (
            <li className='flex items-center gap-2 opacity-40'>
              <span className='animate-pulse text-[#00A154] text-xs'>
                ▋ loading...
              </span>
            </li>
          )}
        </ul>

        {/* Footnote */}
        {showFootnote && (
          <div
            className='footnote'
            style={{ animation: 'fadeSlideIn 1s ease forwards' }}
          >
            <p className='flex items-center gap-2 text-xs md:text-sm flex-wrap'>
              <Check size={16} />
              {techStack.length} of {techStack.length} stacks loaded successfully (100%)
            </p>
            <p className='text-black flex items-center gap-2 text-xs md:text-sm'>
              <Flag size={13} fill="black" />
              Render Time: 6ms
            </p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;