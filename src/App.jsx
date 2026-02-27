import Navbar from '#components/Navbar'
import Welcome from '#components/Welcome'
import Dock from '#components/Dock'
import React from 'react'



import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { Finder, Resume, Safari, Terminal } from '#windows'



gsap.registerPlugin(Draggable);
const App = () => {
  return (
   <main>
    <Navbar/>
    <Welcome/>
    <Dock/>
  
  <Terminal/>
  <Safari/>
  <Resume/>
  <Finder/>
   </main>
  )
}

export default App