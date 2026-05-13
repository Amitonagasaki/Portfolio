import { techStack } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper'
import { Check, Flag } from 'lucide-react';
import WindowControls from '#components/WindowControls';

const Terminal = () => {
  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header" >
        <WindowControls target="terminal" />
        <h2 className='hidden md:block'>Tech Stack</h2>
      </div>

      {/* ── 2. Terminal Body ── */}
      <div className='techstack overflow-y-auto max-h-[calc(100dvh-56px)] md:max-h-none' >

        {/* Command line */}
        <p className='flex items-center gap-2 flex-wrap'>
          <span className='font-bold'>@Amit %</span>
          <span>show tech stack</span>
        </p>

        {/* Column labels */}
        <div className='label'>
          <p className='w-24 md:w-32 text-xs md:text-sm'>category</p>
          <p className='text-xs md:text-sm'>Technologies</p>
        </div>

        {/* Tech rows */}
        <ul className='content'>
          {techStack.map(({ category, items }, index) => (
            <li
              key={category}
              className='flex items-start md:items-center gap-1 flex-wrap md:flex-nowrap'
              style={{
                animation: 'fadeSlideIn 0.4s ease forwards',
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
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
        </ul>

        {/* Footnote */}
        <div
          className='footnote'
          style={{
            animation: 'fadeSlideIn 0.4s ease forwards',
            animationDelay: `${techStack.length * 0.08 + 0.1}s`,
            opacity: 0,
          }}
        >
          <p className='flex items-center gap-2 text-xs md:text-sm flex-wrap'>
            <Check size={16} />
            {techStack.length} of {techStack.length} stacks loaded successfully (100%)
          </p>
          <p className='text-black dark:text-gray-300 flex items-center gap-2 text-xs md:text-sm'>
            <Flag size={13} fill="black" />
            Render Time: 6ms
          </p>
        </div>

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