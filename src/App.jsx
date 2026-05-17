import Navbar from '#components/Navbar'
import Welcome from '#components/Welcome'
import Dock from '#components/Dock'
import Loader from '#components/Loading'
import { useState,Suspense  } from 'react';
import Home from '#components/Home';
import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { Finder, Resume, Safari, Terminal,Text,Image, Contact, Photo ,Wallpaper} from '#windows'
import useThemeStore from '#store/theme'
import ContextMenu from '#components/ContextMenu'
import useWallpaperStore from '#store/wallpaper'




gsap.registerPlugin(Draggable);
const App = () => {
    const [loading, setLoading] = useState(true);
    const {isDark}=useThemeStore();
    const {current} = useWallpaperStore();
   
  return (
    <>
    {loading && <Loader onComplete={() => setLoading(false)} />}
     
   <main  className={isDark ? 'dark' : ''}  style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
    <div style={{backgroundImage: `url(${current})` }}
  className='w-dvw h-dvh bg-cover bg-center bg-no-repeat '>
   <ContextMenu>
    <Navbar/>
    <Welcome/>
    <Dock/>
    <Suspense fallback={null}>
  <Terminal/>
  <Safari/>
  <Resume/>
  <Finder/>
  <Photo/>
  <Text/>
  <Image/>
  <Contact/>
  <Home/>
  <Wallpaper/>
  </Suspense>
   </ContextMenu>
    </div>
  
   </main>
  
   </>
  )
}

export default App