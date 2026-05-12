import Navbar from '#components/Navbar'
import Welcome from '#components/Welcome'
import Dock from '#components/Dock'
import Loader from '#components/Loading'
import React from 'react'
import { useState } from 'react';
import Home from '#components/Home';

import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { Finder, Resume, Safari, Terminal,Text,Image, Contact, Photo } from '#windows'
import useThemeStore from '#store/theme'



gsap.registerPlugin(Draggable);
const App = () => {
    const [loading, setLoading] = useState(true);
    const {isDark}=useThemeStore();
  return (
    <>
    {loading && <Loader onComplete={() => setLoading(false)} />}
   <main  className={isDark ? 'dark' : ''}  style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
    <Navbar/>
    <Welcome/>
    <Dock/>
  
  <Terminal/>
  <Safari/>
  <Resume/>
  <Finder/>
  <Photo/>
  <Text/>
  <Image/>
  <Contact/>
  <Home/>
   </main>
   </>
  )
}

export default App