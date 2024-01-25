import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
function Register() {
  const [name,setName] =useState('');
  const [userName,setUserName] =useState('');
  const [password,setPassword] =useState('');

 async function submitHandler(event){
  event.preventDefault();
  try{
      await axios.post ("/register",{
        name,
        userName,
        password,
      })
      alert('You Can Login Now')

    } catch(e){
      alert('Registration failed.Try again later')
    }
  }

  return (

    <>
         <div className='mt-4, w-max , mx-auto , grow , flex , items-center , justify-around '>
            <div className='mt-36'>

            <h1 className='text-4xl , mx-1 '>Register</h1>
          
          <form className="w-max , border-b-8 , shadow-md , flex-wrap , text-center , p-2" onSubmit={submitHandler}>
            
            <div className='w-full , border , rounded-full , px-3 , py-2 , my-3 ' >
                <label htmlFor="name" className='mr-8'>Name:</label>
                <input required type="text" id="name" placeholder=' Sky Walker ' value={name} onChange={(event) => setName(event.target.value)}/>
            </div>

           <div className='w-full , border , rounded-full , px-3 , py-2 , my-3 ' >
                <label htmlFor="userName"> UserName:</label>
                <input required type="text" id="userName" placeholder=' Username'value={userName} onChange={(event) => setUserName(event.target.value)} />
            </div>
    
            <div className='w-full , border , rounded-full , px-3 , py-2 , my-3' >
                <label htmlFor="password"> Password:</label>
                <input required type="text" id="password" placeholder=' Password' value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            
            <button className=' bg-slate-300 rounded-md m-2 p-1' type="submit">Register</button>

            <div className='flex , justify-between , items-center , mt-1'>
                <p className='text-xs'>Already a member?</p>
                <Link to={'/login'} className='text-blue-400 mb-1 text-sm'>Login</Link>
            </div>
          </form>


            </div>

        </div>

    </>
  )
}

export default Register