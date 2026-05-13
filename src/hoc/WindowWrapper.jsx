import useWindowsStore from '#store/window'
import { useGSAP } from '@gsap/react';
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable); // ← this was the main issue

const isMobile = () => window.innerWidth < 768;

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowsStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";
      gsap.fromTo(el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // ← the only condition needed
      if (isMobile()) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey)
      });
      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }}  className={`
          absolute
          ${isMobile()
            ? "fixed! inset-0! w-full! h-full! top-0! left-0! flex-col overflow-y-auto"
            : ""}
        `}>
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;