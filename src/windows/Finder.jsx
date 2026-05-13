import WindowControls from '#components/WindowControls'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location'
import useWindowsStore from '#store/window'
import clsx from 'clsx'
import { ChevronRight, ChevronLeft, Folder } from 'lucide-react'
import React, { useState } from 'react'

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowsStore();
  const [mobileView, setMobileView] = useState('sidebar');

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") {
      setActiveLocation(item);
      setMobileView('content');
      return;
    }
    if (['fig', 'url'].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
    if (item.fileType === "txt") {
      openWindow("txtfile", {
        name: item.name.replace(/\.txt$/i, ""),
        subtitle: item.subtitle || undefined,
        image: item.image || undefined,
        description: item.description || [],
      });
      return;
    }
    if (item.fileType === "img") {
      openWindow("imgfile", {
        name: item.name,
        imageUrl: item.imageUrl || item.src || "",
      });
      return;
    }
    console.warn(`No handler for file type: ${item.fileType}`);
  };

  const handleSidebarSelect = (item) => {
    setActiveLocation(item);
    setMobileView('content');
  };

  const renderSidebarList = (items) =>
    items.map((item, index) => (
      <li
        key={`sidebar-${item.id}-${index}`}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors',
          item.id === activeLocation?.id ? 'active' : 'not-active'
        )}
        onClick={() => handleSidebarSelect(item)}
      >
        <img src={item.icon} className='w-4 shrink-0' alt={item.name} />
        <p className='text-sm font-medium truncate flex-1'>{item.name}</p>
        <ChevronRight className='w-3 h-3 text-gray-400 md:hidden shrink-0' />
      </li>
    ));

  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header">
        <WindowControls target="finder" />
      </div>

      {/* ── 2. Breadcrumb Bar ── */}
      <div className='flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-white dark:bg-zinc-800 dark:text-white'>
        <div className='flex md:hidden items-center gap-2 flex-1 min-w-0'>
          {mobileView === 'content' ? (
            <>
              <button
                className='flex items-center gap-1 text-blue-500 text-sm shrink-0'
                onClick={() => setMobileView('sidebar')}
              >
                <ChevronLeft className='w-4 h-4' />
                <span>Back</span>
              </button>
              <ChevronRight className='w-3 h-3 text-gray-300 shrink-0' />
              <span className='truncate text-sm font-medium text-gray-800 dark:text-gray-200'>
                {activeLocation?.name}
              </span>
            </>
          ) : (
            <span></span>
          )}
        </div>

        {/* Desktop breadcrumb */}
        <div className='hidden md:flex items-center gap-1 text-sm text-gray-500 flex-1 min-w-0 dark:bg-zinc-800 dark:text-white'>
          <span>Finder</span>
          {activeLocation && (
            <>
              <ChevronRight className='w-3 h-3 shrink-0 ' />
              <span className='truncate font-medium text-gray-800 dark:bg-gray-800 dark:text-white'>
                {activeLocation?.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── 3. Body ── */}
      <div className='flex h-full overflow-hidden bg-white'>

        {/* ── Sidebar ── */}
        <div className={clsx(
          'sidebar flex-col overflow-y-auto w-full md:w-48',
          mobileView === 'sidebar' ? 'flex' : 'hidden md:flex'
        )}>
          <div className='p-4 space-y-4'>
            <div>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 px-1'>
                Favorites
              </h3>
              <ul className='space-y-0.5'>
                {renderSidebarList(Object.values(locations))}
              </ul>
            </div>
            <div>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 px-1'>
                Work
              </h3>
              <ul className='space-y-0.5'>
                {renderSidebarList(locations.work.children)}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className={clsx(
          'flex-1 overflow-y-auto bg-white md:border-l dark:bg-zinc-800 md:border-gray-100',
          mobileView === 'content' ? 'block' : 'hidden md:block'
        )}>
          {!activeLocation || activeLocation.children?.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-2 p-8'>
              <Folder className='w-10 h-10 opacity-30' />
              <p className='text-sm'>This folder is empty</p>
            </div>
          ) : (
            <>
              {/* Mobile: list view */}
              <ul className='md:hidden divide-y divide-gray-100 '>
                {activeLocation.children.map((item, index) => (
                  <li
                    key={`${activeLocation.id}-${item.id}-${index}`}
                    className='flex items-center gap-3 px-4 py-3 active:bg-gray-50 cursor-pointer'
                    onClick={() => openItem(item)}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className='w-9 h-9 object-contain shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-800 dark:text-white truncate'>{item.name}</p>
                      {item.fileType && (
                        <p className='text-xs text-gray-400 uppercase'>{item.fileType}</p>
                      )}
                    </div>
                    <ChevronRight className='w-4 h-4 text-gray-300 shrink-0' />
                  </li>
                ))}
              </ul>

              {/* Desktop: absolute icon grid */}
              <div className='hidden md:block relative w-full h-full dark:bg-zinc-800'>
                {activeLocation.children.map((item, index) => (
                  <li
                    key={`${activeLocation.id}-${item.id}-${index}`}
                    className={clsx(
                      'absolute flex items-center flex-col gap-3 group cursor-pointer dark:text-white',
                      item.position
                    )}
                    onClick={() => openItem(item)}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className='object-contain object-center size-16 group-hover:scale-105 transition-transform'
                    />
                    <p className='text-sm text-center font-medium w-40 truncate'>{item.name}</p>
                  </li>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;