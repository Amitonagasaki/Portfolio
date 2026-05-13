import React from 'react'

import dayjs from 'dayjs'
import { navIcons, navIconsMoblie, navLinks } from '#constants'
import useWindowsStore from '#store/window'
import useThemeStore from '#store/theme'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {
    const {openWindow}= useWindowsStore();
      const { isDark, toggleTheme } = useThemeStore();
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
            {navIcons.map(({id ,img})=> id===4?(
                <li key={id} onClick={toggleTheme} className='cursor-pointer'>
                    {isDark? <Moon className='icon-hover w-4 h-4 filter brightness-0 invert '/>
                    :<Sun className='icon-hover w-4 h-4'/>
                } 
                </li>) :(
                    <li key={id}>

                <img src={img} className='icon-hover filter brightness-0 dark:invert' alt={`icon-${id }`}/>
                </li>
            ))}
        </ul>
        <time className='hidden md:block'>{dayjs().format("ddd MMM D h:mm A")}</time>
       </div>
    
  </nav>

  <nav className='flex justify-between md:hidden p-3 px-5 sticky z-100000'>
    <div>
         <time className='md:hidden'>{dayjs().format("h:mm A")}</time>
    </div>
     
      <div className='bg-black w-46 h-10 rounded-3xl'>

      </div>
      <div>
   <ul className='flex items-center  '>
            {/* {navIconsMoblie.map(({id ,img})=>(
                <li key={id}>
                <img src={img} className=' icon-hover filter brightness-0 dark:brightness-0 dark:invert' alt={`icon-${id }`}/>
                </li>
            ))} */}

            {navIconsMoblie.map(({id ,img})=> id===2?(
                <li key={id} onClick={toggleTheme} className='cursor-pointer'>
                    {isDark? <Moon className='icon-hover w-4 h-4 filter brightness-0 invert '/>
                    :<Sun className='icon-hover w-4 h-4'/>
                } 
                </li>) :(
                    <li key={id}>

                <img src={img} className='icon-hover filter brightness-0 dark:invert' alt={`icon-${id }`}/>
                </li>
            ))}
        </ul>
      </div>

  </nav>
    </>
 
  
  )
}

export default Navbar