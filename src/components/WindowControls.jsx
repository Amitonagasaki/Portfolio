import useWindowsStore from '#store/window'
import React from 'react'
import {  ChevronLeft } from 'lucide-react'
const WindowControls = ({target}) => {
    const {closeWindow}= useWindowsStore();
  return (
  <div id="window-controls">
    <div className='md:flex gap-2 hidden '>
    <div className='close'  onClick={()=>closeWindow(target)}/>
    <div className='minimize' onClick={() => closeWindow(target)} />
    <div className='maximize'/>
    </div>


   <div className='md:hidden '  onClick={()=>closeWindow(target)}>
   < div className='flex flex-row gap-1 text-blue-500 text-sm '>  
    <ChevronLeft className='w-4 h-4'/>
   Go back
   </div>
   </div>
  
    

  </div>
  )
}

export default WindowControls