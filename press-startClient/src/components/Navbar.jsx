import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from './UserContext'

function Navbar() {
     const {user} = useContext(UserContext)
  return (
            <>
            <header className='navContainer, p-4 , h-20 bg-slate-100 , flex , items-center , justify-between'>
                <Link to={'/'} className='navLeft,  flex ml-4 '>
                    <img className='logo, w-10 , ' src='https://cdn3.iconfinder.com/data/icons/miscellaneous-222-line/128/button_press_push_start_on_power_play_switch-512.png'/>
                    <h1 className='text-2xl'>Press Start</h1>
                    
                </Link>
                
                <div className='navMiddle, flex , justify-between , w-1/2 , mb-1 , border , border-gray-300 , rounded-full , p-1 , shadow-md , items-center' > 
                    <div>article </div>
                    <div>created</div>
                    <div>updates</div>
                    <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
</svg>
</button>
                   
                </div>

                <Link to={user?'/account':'/login'} className='navRight, flex, mb-1 , border , border-gray-300 , rounded-full , p-3 , shadow-md'>
                    <div>
                        
                        {!!user && (
                            <div>
                                {user.userName}
                            </div>
                        ) || <p>Login/Register</p>
                        }
                    </div>

                </Link>

            </header>
            
            </>
  )
}

export default Navbar