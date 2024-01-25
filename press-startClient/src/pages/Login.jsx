import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../components/UserContext';
function Login() {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)

  const handleSubmit=async (event)=>{
    event.preventDefault();

    try{
     const response = await axios.post('/login',{userName,password})
     setUser(response.data)
    alert('Login Successful')
    setRedirect(true);
    }catch (e){
      alert('Login Failed')

    }
  }


if (redirect){
  return <Navigate to={'/'}/>
}

  return (
    <>

        <div className='mt-4, w-max , mx-auto , grow , flex , items-center , justify-around '>
            <div className='mt-36'>


            <h1 className='text-4xl , mx-1 '>Login</h1>
          <form className="w-max , border-b-8 , shadow-md , flex-wrap , text-center , p-2" onSubmit={handleSubmit} >
            
            <div className='w-full , border , rounded-full , px-3 , py-2 , my-3 ' >
                <label htmlFor="username"> UserName:</label>
                <input required type="text" id="username" placeholder=' Username'value={userName} onChange={(event)=> setUserName(event.target.value)} />
            </div>
    
            <div className='w-full , border , rounded-full , px-3 , py-2 , my-3' >
                <label htmlFor="password"> Password:</label>
                <input required type="text" id="password" placeholder=' Password' value={password} onChange={(event)=> setPassword(event.target.value)} />
            </div>
            
            <button className=' bg-slate-300 rounded-md m-2 p-1' type="submit">Login</button>

            <div className='flex , justify-between , items-center , mt-1'>
                <p className='text-xs'>No Account? Sign-Up</p>
                <Link to={'/register'} className='text-blue-400 mb-1 text-sm'>Register</Link>
            </div>
          </form>


            </div>

        </div>
    
    </>
  )
}

export default Login