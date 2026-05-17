import React from 'react';
import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import useWallpaperStore from '#store/wallpaper';

import { Check } from 'lucide-react';
import { wallpapers } from '#utils/wallpapers';

const Wallpaper = () => {
  const { current, setWallpaper } = useWallpaperStore();

  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header">
        <WindowControls target="wallpaper" />
        <h2 className='font-bold text-sm text-center flex-1'>
          Change Wallpaper
        </h2>
      </div>

      {/* ── 2. Content ── */}
      <div className='p-4 bg-white dark:bg-zinc-900
                      overflow-y-auto max-h-[calc(100dvh-56px)] md:max-h-150'>

        <p className='text-xs text-gray-400 dark:text-zinc-500 mb-3'>
          Select a wallpaper
        </p>

        {/* Thumbnail grid */}
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {wallpapers.map(({ id, src, thumb }) => {
            const isActive = current === src;
            return (
              <li
                key={id}
                onClick={() => setWallpaper(src)}
                className={`relative rounded-lg overflow-hidden cursor-pointer
                             border-2 transition-all duration-200 
                            ${isActive
                              ? 'border-blue-500 scale-[0.97]'
                              : 'border-transparent hover:border-gray-300 dark:hover:border-zinc-600'
                            }`}
              >
                <img
                  src={thumb}
                  alt={`wallpaper-${id}`}
                  className='w-full h-60 object-cover '
                />

                {/* Active checkmark */}
                {isActive && (
                  <div className='absolute inset-0 bg-blue-500/20
                                  flex items-center justify-center'>
                    <div className='bg-blue-500 rounded-full p-1'>
                      <Check size={12} className='text-white' />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </>
  );
};

const WallpaperWindow = WindowWrapper(Wallpaper, 'wallpaper');
export default WallpaperWindow;