import useWindowsStore from '#store/window'
import React from 'react'

const WindowControls = ({target}) => {
    const {closeWindow}= useWindowsStore();
  return (
  <div id="window-controls">
    <div className='close'  onClick={()=>closeWindow(target)}/>
    <div className='minimize' onClick={() => closeWindow(target)} />
    <div className='maximize'/>
    

  </div>
  )
}

export default WindowControls