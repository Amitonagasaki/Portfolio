import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import {immer} from 'zustand/middleware/immer';
import { create } from "zustand";


const useWindowsStore=create(
    immer((set)=>({
    windows:  WINDOW_CONFIG,
    nextZINdex:INITIAL_Z_INDEX,

    openWindow: (windowKey,data=null)=> set((state)=>{
     const win = state.windows[windowKey];
        if(!win) return;
     win.isOpen= true;
     win.zIndex=state.nextZINdex;
     win.data= data??win.data;
     state.nextZINdex++;
    }),
      closeWindow: (windowKey)=> set((state)=>{
          const win = state.windows[windowKey];
          if(!win) return;
     win.isOpen= false;
     win.zIndex=INITIAL_Z_INDEX;
     win.data= null;
    }),
      focusWindow: (windowKey)=> set((state)=>{
       const win = state.windows[windowKey];
          if(!win) return;
   
     win.zIndex=state.nextZINdex++;
    }),
})))

export default useWindowsStore;