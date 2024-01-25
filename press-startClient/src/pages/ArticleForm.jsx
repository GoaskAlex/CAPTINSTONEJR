import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AccountNav from '../components/AccountNav'
import {Navigate, useParams} from 'react-router-dom'

function ArticleForm() {
  const {id} = useParams()
  console.log(id);
    const [title, setTitle] = useState('')
    const [subtext, setSubText] = useState('')
    const [image, setImage] = useState([])
    const [imageLink, setImageLink] = useState('')
    const [story, setStory] = useState('')
    const [redirect, setRedirect]= useState(false)
   useEffect(()=>{
      if (!id){
        return;
      }
      axios.get('/createArticle/' + id).then(response =>{
        const {data} = response
        setTitle(data.title)
        setSubText(data.subtext)
        setImage(data.image)
        setStory(data.story)
      })
   },[id])
    

//------------------------------------------

//---------------------------------------------
async function addImageLink(event){
  event.preventDefault();
  const {data:filename} = await axios.post('/upload-by-link',{link:imageLink})
  setImage(prev =>{
    return [...prev,filename]
  })
  setImageLink('')
}

async function saveArticle(event){
    event.preventDefault()
    await axios.post('/createArticle',{title,
        subtext,
        image,
        story
    })
    setRedirect(true)
  }

  if(redirect){
    return <Navigate to={'/account/createArticle'}/>
  }
//---------------------------------------------------------------
 
    return (
    <>
    <AccountNav/>
    <div className='container w-5/6 , m-auto , flex-col ,'>
      <h2 className='mt-8 text-center text-2xl underline p-3'>New Article</h2>
      
      <form className=' shadow-lg bg-slate-200  pl-3 , pb-3 , pr-3 ' onSubmit={saveArticle}>
          <h2  className='text-xl , font-bold , '> Title</h2>
          <input className='border , rounded-lg , w-full shadow-sm, mb-2' type='text'placeholder='Title : Games Are Best! ' value={title} onChange={(event)=>setTitle(event.target.value)}></input>
          
          <h2  className='text-xl , font-bold , '>Sub-Text</h2>
          <input className='border , rounded-lg , w-full shadow-sm mb-2' type='text'placeholder='Sub :Remember the 90s'value={subtext} onChange={(event)=>setSubText(event.target.value)}></input>
          
          <div className=''>
          <h2  className='text-xl , font-bold ,'> ImageUrl</h2>
          <input className='border , rounded-lg , w-5/6 shadow-sm' type='text'placeholder='Nice Shot'value={imageLink} onChange={(event)=>setImageLink(event.target.value)}></input>
            <button className='border w-1/7 bg-slate-300 shadow-md rounded-full pl-3 pr-3 m-2' onClick={addImageLink}>Add Img</button>
         <div className='mt-2 grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-col-6'>
            {image.length > 0 && image.map(link =>(
                <div key={link}>
                    <img className=' rounded-2xl w-full h-32 position-center object-cover' src={'http://localhost:3001/uploads/'+link}alt=''/>
                </div>
            ))}
          </div>
         </div>
          <div className=' text-center'>
            <h2  className='text-xl , font-bold , mt-2 , mb-2 '> Story</h2>
            <textarea className='border , rounded-lg shadow-sm ,  w-4/5 , h-80 , indent-4' type='text'placeholder='Back in the 90s SEGA was the best....' value={story} onChange={(event)=>setStory(event.target.value)}></textarea>
         </div>
         
         <div className='text-center'>
            <button className='border  bg-slate-300 shadow-md rounded-full pl-3 pr-3 m-2'>Submit</button>
         </div>
      </form>
  
    </div>
    </>

  )
}

export default ArticleForm