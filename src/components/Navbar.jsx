import React from 'react'

import dayjs from 'dayjs'
import { navIcons, navIconsMoblie, navLinks } from '#constants'
import useWindowsStore from '#store/window'
const Navbar = () => {
    const {openWindow}= useWindowsStore();
  return (
    <>
     <nav>
    <div>
        <img src="/images/logo.svg" className='hidden md:block' alt='logo'/>
        <p className='hidden md:font-bold'>Amit Portfolio</p>

        <ul>
            {navLinks.map(({id,name, type})=>(
                    <li key={id} onClick={()=>openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))
            }
        </ul>
    </div>

    <div>
        <ul className=''>
            {navIcons.map(({id ,img})=>(
                <li key={id}>
                <img src={img} className='icon-hover' alt={`icon-${id }`}/>
                </li>
            ))}
        </ul>
        <time className='hidden md:block'>{dayjs().format("ddd MMM D h:mm A")}</time>
       </div>
    
  </nav>

  <nav className='flex justify-between md:hidden p-3 px-5 sticky z-100000 '>
    <div>
         <time className='text-black  md:hidden  '>{dayjs().format("h:mm A")}</time>
    </div>
     
      <div className='bg-black w-46 h-10 rounded-3xl '>

      </div>
      <div>
   <ul className='flex  '>
            {navIconsMoblie.map(({id ,img})=>(
                <li key={id}>
                <img src={img} className=' size-4 filter brightness-0' alt={`icon-${id }`}/>
                </li>
            ))}
        </ul>
      </div>

  </nav>
    </>
 
  
  )
}

export default Navbar