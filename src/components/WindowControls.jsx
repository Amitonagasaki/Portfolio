import useWindowsStore from '#store/window'
import React from 'react'

const WindowControls = ({target}) => {
    const {closeWindow}= useWindowsStore();
  return (
  <div id="window-controls">
    <div className='md:flex gap-2 hidden '>
    <div className='close'  onClick={()=>closeWindow(target)}/>
    <div className='minimize' onClick={() => closeWindow(target)} />
    <div className='maximize'/>
    </div>


   <div className='md:hidden'  onClick={()=>closeWindow(target)}>
   <p className='text-black  '> &lt; <span className='text-blue-500 '>Go back</span></p>
   </div>
  
    

  </div>
  )
}

export default WindowControls