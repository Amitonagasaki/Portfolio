import useWindowsStore from '#store/window'
import { useGSAP } from '@gsap/react';
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable';

const isMobile = () => window.innerWidth < 768; // matches your md: breakpoint

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowsStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Animation on open/close
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = isMobile() ? "flex" : "block";
        gsap.fromTo(el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.to(el, {
          scale: 0.8, opacity: 0, y: 40, duration: 0.25, ease: "power3.in",
          onComplete: () => { el.style.display = "none"; }
        });
      }
    }, [isOpen]);

    // Draggable — desktop only
    useGSAP(() => {
      const el = ref.current;
      if (!el || isMobile()) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey)
      });

      return () => instance.kill();
    }, []);

    // Initial display state
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen
        ? (isMobile() ? "flex" : "block")
        : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`
          absolute
          ${isMobile()
            ? "fixed! inset-0! w-full! h-full! top-0! left-0! flex-col overflow-y-auto"
            : ""}
        `}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;