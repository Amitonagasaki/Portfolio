
import { create } from "zustand";
const useWallpaperStore = create((set)=>({
 
    current:'/public/wallpapers/wallpaper-1.webp',
    setWallpaper:(path)=>set({current:path}),

}));
export default useWallpaperStore;