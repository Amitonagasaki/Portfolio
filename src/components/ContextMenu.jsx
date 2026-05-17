import React, { useEffect,  useState } from 'react';
import useThemeStore from '#store/theme';
import { Sun, Moon, RefreshCw,Images } from 'lucide-react';
import useWindowsStore from '#store/window';


const ContextMenu = ({ children }) => {
  const { openWindow } = useWindowsStore();
  const { isDark, toggleTheme } = useThemeStore();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const close = () => setVisible(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const onContextMenu = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  return (
    <div className='w-full h-full' onContextMenu={onContextMenu}>
      {children}

      {visible && (
        <div
          className='fixed z-99999 min-w-44 rounded-xl overflow-hidden
                     bg-white/80 dark:bg-zinc-800/90 backdrop-blur-xl
                     shadow-2xl border border-gray-200/50 dark:border-zinc-700/50 py-1'
          style={{ left: pos.x, top: pos.y }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className='w-full flex items-center gap-2.5 px-3 py-1.5 text-xs
                       text-gray-700 dark:text-zinc-200
                       hover:bg-blue-500 hover:text-white transition-colors'
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
  className='w-full flex items-center gap-2.5 px-3 py-1.5 text-xs
             text-gray-700 dark:text-zinc-200
             hover:bg-blue-500 hover:text-white transition-colors'
  onClick={() => {
    openWindow('wallpaper');
    setVisible(false);
  }}
>
  <Images size={13} />
  Change Wallpaper
</button>

          <div className='my-1 border-t border-gray-200 dark:border-zinc-700' />

          <button
            className='w-full flex items-center gap-2.5 px-3 py-1.5 text-xs
                       text-gray-700 dark:text-zinc-200
                       hover:bg-blue-500 hover:text-white transition-colors'
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;