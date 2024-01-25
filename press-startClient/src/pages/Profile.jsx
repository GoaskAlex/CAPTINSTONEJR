import React, { useContext, useState } from 'react'
import { UserContext } from '../components/UserContext'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
import CreateArticle from './CreateArticle'
import AccountNav from '../components/AccountNav'




function Profile() {

    const [redirect, setRedirect]= useState(null)
    const {ready,user,setUser} = useContext(UserContext)
    
    let{subpage} = useParams();
    if (subpage === undefined){
        subpage ='profile'
    }

    async function logout(){
       await axios.post('/logout')
       setRedirect('/')
       setUser(null)

    }
//----------------------------------------------------------------
    if(!ready){
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        return <Navigate to = {'/login'}/> 
    }

    if(redirect){
        return<Navigate to={redirect}/>
    }

return (
    <>

       <AccountNav/>
            {subpage === 'profile' &&(

        <div className='text-center , m-auto , mt-8 '>

            <h1 className='text-lg , font-bold'>Logged in as {user.userName}</h1>
            <button onClick={logout} className='border , w-72 , mx-auto , mt-3 , bg-emerald-800 text-white , rounded-full , p-2'>Log out</button>

        </div>
        )}


    {subpage === 'createArticle' && (
        <CreateArticle/>
    )}
    
    </>
  )
}

export default Profile

