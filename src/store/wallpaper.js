
import { create } from "zustand";
import { defaultWallpaper } from '#utils/wallpapers';
const useWallpaperStore = create((set)=>({
 
    current:defaultWallpaper,
    setWallpaper:(path)=>set({current:path}),

}));
export default useWallpaperStore;